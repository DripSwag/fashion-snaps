'use client'

import {AppRouterInstance} from "next/dist/shared/lib/app-router-context"
import {useRouter} from "next/navigation"
import {Dispatch, SetStateAction, useState} from "react"

async function clicked(username: string, password: string, router: AppRouterInstance, setIncorrect: Dispatch<SetStateAction<boolean>>){
  const response = await fetch('http://127.0.0.1:8000/api/login/' + username + '/' + password)
  response.status === 202 ? router.push('/homepage') : setIncorrect(true)
}

export default function LoginForm(){
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [incorrect, setIncorrect] = useState(false)
  const router = useRouter()

  return(
    <div>
      <form>
        <input placeholder='Username' type='text' onChange={(event) => { setUsername(event.target.value) }}></input>
        <input placeholder='Password' type='password' onChange={(event) => { setPassword(event.target.value) }}></input>
      </form>
      <button onClick={() => { clicked(username, password, router, setIncorrect) }}>Login</button>
      {
        incorrect && <p>Credentials inccorect</p>
      }
    </div>
  )
}
