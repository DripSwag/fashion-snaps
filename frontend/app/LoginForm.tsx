'use client'

import {useState} from "react"

async function clicked(username: string, password: string){
  const response = await fetch('http://127.0.0.1:8000/api/login/' + username + '/' + password)
  console.log(await response.json())
}

export default function LoginForm(){
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return(
    <div>
      <form>
        <input placeholder='Username' type='text' onChange={(event) => { setUsername(event.target.value) }}></input>
        <input placeholder='Password' type='password' onChange={(event) => { setPassword(event.target.value) }}></input>
      </form>
      <button onClick={() => { clicked(username, password) }}>Login</button>
    </div>
  )
}
