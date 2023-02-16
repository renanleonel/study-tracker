import{ FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import {z} from "zod"
import dayjs from "dayjs"
// import { parseUserDto } from "./dto/indexDto"
import bcrypt from "bcrypt"

export async function appRoutes(app: FastifyInstance){
    app.post('/habits', async (request) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number()).min(0).max(6)
        })

        const {title, weekDays} = createHabitBody.parse(request.body)
        
        //startsOf('day') zera as horas do dia
        //ex: 2023-02-06:00:00:00
        const today = dayjs().startOf('day').toDate()

        //cria um novo hábito
        await prisma.habit.create({
            data: {
                title, 
                created_at: today,
                // cria vários registros na tabela HabitWeekDays
                // este hábito que está sendo criado vai estar disponível em X dia da semana
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay
                        }
                    })
                }
            }
        })
    })

    app.get('/day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        //busca do parâmetro da req no cabeçalho
        const {date} = getDayParams.parse(request.query)

        //resgatar todos os hábitos possíveis de serem completados
        //resgatar todos os hábitos que foram completados

        const possibleHabits = await prisma.habit.findMany({
            
        })
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

