import dayjs from 'dayjs'

export function geraDatas(){
    const firstDayOfTheYear = dayjs().startOf('year')
    const today = new Date()

    const dates = []
    let compareDate = firstDayOfTheYear

    while(compareDate.isBefore(today)){
        // adiciona no array de dias todos os dias que se passaram desde o começo do ano até o dia de hoje
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }

    return dates
}