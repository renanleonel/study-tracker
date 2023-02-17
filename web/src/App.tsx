import { Routes, Route } from 'react-router-dom'

import { Login } from './components/Login'
import { Home } from './components/Home'
import './styles/global.css'
import { Points } from './components/Points'

export function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/points' element={<Points/>}/>
      </Routes>
    </>
  )
}