'use client'

import {useState} from "react"

const clicked = (e) => {
  console.log(e.currentTarget.innerText)
}

export default function Review(){
  const [text, setText] = useState('')

  return(
    <div onInput={clicked} contentEditable className='h-max w-1/2 absolute bottom-0 text-white textOverflow'></div>
  )
}
