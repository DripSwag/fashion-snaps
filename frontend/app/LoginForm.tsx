'use client'

import {AppRouterInstance} from "next/dist/shared/lib/app-router-context"
import {useRouter} from "next/navigation"
import {Dispatch, SetStateAction, useState} from "react"

interface login{
  id: number,
  token: Array<{ tokenId: string }>
}

interface post{
  id: number,
}

async function clicked(username: string, password: string, router: AppRouterInstance, setIncorrect: Dispatch<SetStateAction<boolean>>){
  const responseLogin = await fetch('http://127.0.0.1:8000/api/login/' + username + '/' + password + '/')
  if(responseLogin.status === 200){
    const bodyLogin: login = await responseLogin.json()
    const bodyPost: post = await fetch('http://127.0.0.1:8000/api/post/get').then((response) => response.json())
    router.push('/homepage/' + bodyLogin['id'] + '?postId=' + bodyPost['id'].toString())
  }
  else{
    setIncorrect(false)
  }
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
