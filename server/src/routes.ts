import{ FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import {z} from "zod"
import dayjs from "dayjs"

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
            id: z.number()
        })

        const {id} = getUserParams.parse(request.params)

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user
    })

    app.post('/users', async (request) => {
        const userBody = z.object({
            email: z.string(),
            password: z.string()
        })

        const {email, password} = userBody.parse(request.body)
        const today = dayjs().startOf('day').toDate()

        await prisma.user.create({
            data: {
                email,
                password,
            }
        })
    })

    app.put('/users/:id', async (request) => {
        const updateUserParams = z.object({
            id: z.number()
        })

        const updateUserBody = z.object({
            email: z.string(),
            password: z.string()
        })

        const {id} = updateUserParams.parse(request.params)
        const {email, password} = updateUserBody.parse(request.body)

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email,
                password
            }
        })
    })

    app.delete('/users/:id', async (request) => {
        const deleteUserParams = z.object({
            id: z.number()
        })

        const {id} = deleteUserParams.parse(request.params)

        await prisma.user.delete({
            where: {   
                id: id
            }
        })
    })
}

