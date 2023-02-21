import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, X } from "phosphor-react";
import { Header } from "./Header";
import { ProgressBar } from "./ProgressBar";

export function Points(){
    return(
        <div className='w-screen h-screen flex flex-col justify-center gap-20 items-center'>
            <Header/>
            <div className='w-full max-w-3xl px-6 flex flex-col gap-16 pl-10'>
                {/* em dispositivos pequenos fica com 100%, em maiores fixa no máximo em 64rem */}
                {/* tailwind tem todas as medidas * 4*/}
                <form className="w-2/3 flex flex-col ">
                    <label htmlFor="title" className="font-semibold leading-tight text-white">
                        Qual a prova realizada?
                    </label>

                    <input
                        type='text'
                        id='title'
                        placeholder="ex: Vestibular de Inverno 2022"
                        autoFocus
                        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    />
                    {/* 
                    <div className="flex mt-4">
                        <Checkbox.Root 
                            // key={weekDay} 
                            className='flex items-center gap-3 group focus:outline-none'
                            // checked={weekDays.includes(index)}
                            // onCheckedChange={() => handleToggleWeekDay(index)}
                        >
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors '>
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white"/>
                                </Checkbox.Indicator>
                            </div>

                            <span className='text-white leading-tight'>Vestibular</span>
                        </Checkbox.Root>
                        <Checkbox.Root 
                            // key={weekDay} 
                            className='flex items-center gap-3 group focus:outline-none'
                            // checked={weekDays.includes(index)}
                            // onCheckedChange={() => handleToggleWeekDay(index)}
                        >
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors '>
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white"/>
                                </Checkbox.Indicator>
                            </div>

                            <span className='text-white leading-tight'>PAS</span>
                        </Checkbox.Root>

                    </div> */}
                    <div className="flex justify-between">
                        <div className="flex flex-col pr-2">
                            <label htmlFor="title" className="font-semibold leading-tight text-white mt-8">
                                Pontuação em questões
                            </label>

                            <input
                                type='text'
                                id='title'
                                placeholder="ex: 150"
                                autoFocus
                                className="w-4/5 p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                            />
                        </div>
                        <div className="flex flex-col">
                        
                            <label htmlFor="title" className="font-semibold leading-tight text-white mt-8">
                                Pontuação na redação
                            </label>

                            <input
                                type='text'
                                id='title'
                                placeholder="ex: 110"
                                autoFocus
                                className="w-4/5 p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                            />
                        </div>
                    </div>
                </form>
                
                <Dialog.Root>
                    <Dialog.Trigger 
                        type="submit" 
                        className="w-1/5 text-white mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    >
                        {/* <Check size={20} weight="bold"/> */}
                        Calcular
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0'/>
                        <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Dialog.Close className='absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900'>
                            <X size={24} aria-label="Fechar"/>
                        </Dialog.Close>

                        <Dialog.Title className='text-3xl leading-tight font-extrabold text-white'>
                            Pontuação
                        </Dialog.Title>
                        <ProgressBar progress={50}/>
                        <p className="text-white">Você acertou X% da prova!</p>
                        <p className="text-white">Para o curso pretendido, a nota de corte foi X</p>
                        <p className="text-white">Você ficou a X pontos do corte. X%</p>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </div>
    )
}