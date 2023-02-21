import{ FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import {z} from "zod"
import dayjs from "dayjs"
import bcrypt from "bcrypt"

export async function appRoutes(app: FastifyInstance){
    app.post('/habits', async (request) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6) // de segunda a domingo
            )
        })

        const {title, weekDays} = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data:{
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {  
                        return{
                            week_day: weekDay,
                        }
                    })
                }
            }
        })
    }),

    app.delete('/habits/:id', async (request) => {
        const deleteHabitParams = z.object({
            id: z.string().uuid()
        })

        const {id} = deleteHabitParams.parse(request.params)

        await prisma.dayHabit.deleteMany({
            where: {
              habit: {
                id: id
              }
            }
        })
      
        await prisma.habitWeekDays.deleteMany({
            where: {
              habit: {
                id: id
              }
            }
        })
        
        await prisma.habit.delete({
            where: {
                id: id
            }
        })
    })

    app.get('/day', async(request) => {
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        //busca do parâmetro da req no cabeçalho
        const {date} = getDayParams.parse(request.query)

        const parsedDate = dayjs(date).startOf('day')
        const weekDay = parsedDate.get('day')

        //resgatar todos os hábitos possíveis de serem completados
        //resgatar todos os hábitos que foram completados
        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },

                weekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }
            }
        })

        //resgata o dia específico com suas props
        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate(),
            },
            //resgata os hábitos completados no dia
            include:{
                dayHabits: true
            }
        })

        //retorna o id dos hábitos completados no dia específico
        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        }) ?? []

        return {
            possibleHabits,
            completedHabits
        }
    })

    app.patch('/habits/:id/toggle', async (request) => {
        const toggleHabitParams = z.object({
            id: z.string().uuid()
        })

        const { id } = toggleHabitParams.parse(request.params)

        const today = dayjs().startOf('day').toDate()

        //verifica se já existe no banco algum dia com a data de hoje
        //se não houver significa que a pessoa ainda não cadastrou nenhum hábito naquele dia
        let day = await prisma.day.findUnique({
            where: {
                date: today,
            }
        })

        //se não tiver o dia, cria no banco
        if(!day){
            day = await prisma.day.create({
                data: {
                    date: today,
                }
            })
        }

        //busca um registro no banco na tabela dayHabit verificando se o usuário já 
        //tinha marcado o hábito como completo no dia
        const dayHabit= await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id,
                }
            }
        })

        // lógica de toggle habit
        // se dayHabit == true, tem que descompletar o hábito
        // se dayHabit == false, tem que completar o hábito
        if(dayHabit){
            // descompletar o hábito
            await prisma.dayHabit.delete({
                where: {
                    id:dayHabit.id
                }
            })
        } else {
            // completar o hábito em um dia específico
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id,
                }
            })
        }
    })

    app.get('/summary', async () => {
        // [{date: 17/08, habitosPossiveisDeSeremCompletados: 3, habitosCompletados: 1}, {}, {}]
        const summary = await prisma.$queryRaw`
            SELECT D.id, D.date,
            (
                SELECT cast(count(*) as float)
                FROM day_habits DH
                WHERE DH.day_id = D.id
            ) as completed,
            (
                SELECT cast(count(*) as float)
                FROM habit_week_days HWD
                JOIN habits H
                    ON H.id = HWD.habit_id
                WHERE 
                    HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch', 'localtime') as int)   
                    AND H.created_at <= D.date

            ) as amount

            FROM days D
        `

        return summary
    })

    app.get('/users', async (request) => {
        const users = await prisma.user.findMany()
        return users
    })

    app.get('/users/:id', async (request) => { 
        const getUserParams = z.object({
            id: z.string()
        })

        const {id} = getUserParams.parse(request.params)

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user
    })

    app.post('/users/signin', async (request, response) => {
        const userBody = z.object({
            email: z.string(),
            password: z.string()
        })

        try{
            const {email, password} = userBody.parse(request.body)

            if(!email || !password) {
                return response.status(400).send('Email e senha são obrigatórios')
            }

            const userExists = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (userExists) {
                return response.status(400).send('Usuário já cadastrado')
            }

            if (password.length < 5) {
                return response.status(400).send('A senha deve ter no mínimo 5 caracteres')
            }

            //hashing password
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)

            await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                }
            })

        } catch{
            return response.status(400).send('Erro ao cadastrar usuário')
        }

        
    })

    app.post('/users/login', async (request, response) => {
        const loginBody = z.object({
            email: z.string(),
            password: z.string()
        })

        const {email, password} = loginBody.parse(request.body)

        if (!email || !password) {
            return response.status(400).send('Email e senha são obrigatórios')
        }
 
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        try{
            if (email === user?.email && await bcrypt.compare(password, user?.password)) {
                return response.status(200).send({data: user, message: 'Usuário logado com sucesso'})
            }
            else{
                return response.status(400).send('Usuário ou senha inválidos')
            }
        } catch{
            return response.status(400).send('Usuário ou senha inválidos')
        }
    })
}

