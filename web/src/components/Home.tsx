import React from 'react'
import { Header } from './Header'
import { Navbar } from './Navbar'
import { Table } from './Table'

export function Home() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        {/* em dispositivos pequenos fica com 100%, em maiores fixa no máximo em 64rem */}
        {/* tailwind tem todas as medidas * 4*/}
        <Navbar/>
        <Header/>
        <Table/>
      </div>
    </div>
  )
}
