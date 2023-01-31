import { geraDatas } from "../utils/geraDatas"
import { Day } from "./Day"

const weekDays =  ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const tableDates = geraDatas()
const minimumDates = 18 * 7 // mostra 18 semanas
const amountOfDatesToFill = minimumDates - tableDates.length

export function Table(){
    return (
        <div className="w-full flex">
            {/* grid para os dias da semana */}
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {/* grid de 7 colunas, uma pra cada dia */}
                {/* grid-flow-row faz com que sejam adicionados novos items em linhas*/}

                {weekDays.map((weekDay, i) => {
                    return (
                        <div 
                            key={`${weekDay}-${i}`}
                            className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center"
                        >
                            {weekDay}
                        </div>
                    )
                })}
            </div>

            {/* grid pros quadradinhos */}
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {/* gera um quadrado pra cada dia */}
                {tableDates.map(date => {
                    return (
                        <Day key={date.toString()}/>
                    )
                })}

                {/* gera os quadrados adicionais de placeholder */}
                {amountOfDatesToFill > 0 && Array.from({length: amountOfDatesToFill}).map((_, i) => {
                    return (
                        <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/>
                    )
                })}
            </div>
        </div>
    )
}