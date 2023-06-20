'use client'

import {ChangeEvent, createRef, useState} from "react"

export default function Review({ userId, postId }: { userId: string, postId: string }){
  const [charactersUsed, setCharactersUsed] = useState(0)
  const ref = createRef<HTMLTextAreaElement>()

  function typing(event: ChangeEvent<HTMLTextAreaElement>){
    setCharactersUsed(event.target.textLength)
  }

  async function clicked(){
    if(ref.current?.value){
      const response = await fetch('http://127.0.0.1:8000/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: parseInt(userId), post: parseInt(postId), comment: ref.current.value })
      })
      console.log(await response.json())
    }
  }

  return(
    <div>
      <div>
        <textarea maxLength={500} ref={ref} onChange={typing} className="resize-none bg-neutral-200 rounded-lg"></textarea>
        <p>{`${charactersUsed}/500`}</p>
      </div>
      <button onClick={clicked}>Post</button>
    </div>
  )
}
