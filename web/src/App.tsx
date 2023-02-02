import { Routes, Route } from 'react-router-dom'

import { Login } from './components/Login'
import { Home } from './components/Home'
import './styles/global.css'

export function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/test' element={<Home/>}/>
      </Routes>
    </>
  )
}