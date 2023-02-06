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
}

