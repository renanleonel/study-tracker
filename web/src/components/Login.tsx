import test from '../assets/test.png'
import { Eye } from 'phosphor-react'

import {useNavigate} from 'react-router-dom' 
import { FormEvent, useState } from 'react'
import { api } from '../lib/axios'

export function Login(){
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        try {
          const response = await api.post('/users/login', {
            email,
            password,
          });

          if (response.status === 200) {
            navigate('/test');
          } else {
            // logica de login invalido
            console.log('error')
          }
        } catch (error) {
            console.log(error)
        }
      }

    return (
        <section className="bg-background min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">
                        Login
                    </h2>

                    <form 
                        action="" 
                        className="flex flex-col gap-4"
                    >
                        <input 
                            className="p-2 mt-8 rounded-xl border" 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className="relative">
                            <input 
                                className="p-2 rounded-xl border w-full" 
                                type="password" 
                                name="password" 
                                placeholder="Senha"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Eye 
                                className='absolute top-1/2 right-3 -translate-y-1/2' 
                                size={16} 
                                color="gray"
                            />
                        </div>
                        <button 
                            // onClick={handleLogin}
                            onClick={() => navigate('/home')}
                            className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                        <a href="#">Esqueci minha senha</a>
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                        <p>Não possui conta?</p>
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Criar conta</button>
                    </div>
                </div>

                <div className="md:block hidden w-1/2">
                    <img 
                        className="rounded-2xl" 
                        src={test}
                    />
                </div>
            </div>
        </section>
    )
}