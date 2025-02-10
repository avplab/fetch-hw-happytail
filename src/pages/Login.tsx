import { FormEventHandler, useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '@/components/Button'
import Logo from '@/components/Logo'

import { login } from '@/api/auth'
import { LoginCredentials } from '@/types'

export default function Login() {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    
    setError('')

    const credentials: LoginCredentials = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()) as unknown as LoginCredentials

    if (credentials.name && credentials.email.match(/[\w\d]+@[\w\d]+\.\w+/)) {
      login(credentials)
        .then(() => navigate('/'))
        .catch(() => setError('Unable to signin. Check your credentials'))
    } else {
      setError('Name and email are required')
    }
  }

  return (
    <div className="flex flex-col items-center h-full w-full">
      <Logo className="size-24 sm:size-48 my-10"/>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        { error && 
          <label className="-mt-8 h-8 text-red-400 text-xl font-bold pb-2">{error}</label> 
        }
        <div className="flex flex-col gap-3 items-center justify-stretch w-full px-3">
          <input name="name" required className="w-full sm:w-80 h-14 rounded-full text-2xl sm:text-xl text-center p-2 border-3 border-amber-500 outline-none" placeholder="Name"></input>
          <input name="email" required className="w-full sm:w-80 h-14 rounded-full text-2xl sm:text-xl text-center p-2 border-3 border-amber-500 outline-none" type="email" placeholder="E-mail"></input>
        </div>
        <Button
          className="
          h-16 w-48 mt-12 
          rounded-full!
          text-xl text-white font-bold
          hover:bg-cyan-800! active:bg-cyan-800! bg-cyan-700! outline-none
          ">Login
        </Button>
      </form>
    </div>
  )
}