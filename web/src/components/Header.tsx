import {Plus, X} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import logoImage from '../assets/logo.svg'
import { NewHabitContent } from './NewHabitContent'

import { useLocation } from 'react-router-dom'

export function Header(){
  const location = useLocation();
  const isHomePage = location.pathname === '/home';
  const isPointstPage = location.pathname === '/points';

  return (
      <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>

        {/* NAVBAR */}
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-bold text-xl">study tracker</span>
        </div>

        <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="text-sm sm:flex-grow">
            <a
                href="/home"
                className="block mt-4 sm:inline-block sm:mt-0 text-white mr-4"
            >
                home
            </a>
            <a
                href="/points"
                className="block mt-4 sm:inline-block sm:mt-0 text-white"
            >
                pontuações
            </a>
          </div>
        </div>
        {/*  */}

        {isHomePage &&
          <Dialog.Root>
            <Dialog.Trigger 
              type='button'
              className='border text-white border-red-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-background'
            >
              <Plus size={20} className="text-red-500"/>
              Novo hábito
            </Dialog.Trigger>

            {/* modal de popover quando clica no dia */}
            <Dialog.Portal>
              <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0'/>
              <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Dialog.Close className='absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900'>
                  <X size={24} aria-label="Fechar"/>
                </Dialog.Close>

                <Dialog.Title className='text-3xl leading-tight font-extrabold text-white'>
                  Criar hábito
                </Dialog.Title>

                <NewHabitContent/>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        }
      </div>
  )
}