import { Header } from './components/Header'
import { Login } from './components/Login'
import { Table } from './components/Table'
import './styles/global.css'

export function App() {
  return (
    // <div className='w-screen h-screen flex justify-center items-center'>
    //   <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
    //     {/* em dispositivos pequenos fica com 100%, em maiores fixa no máximo em 64rem */}
    //     {/* tailwind tem todas as medidas * 4*/}
    //     <Header/>
    //     <Table/>
    //   </div>
    // </div>
    <Login/>
  )
}