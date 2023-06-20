'use client'

import {useEffect, useState} from "react"

interface comment{
  id: number,
  comment: string,
  user: number,
  username: string
}

export default function Comment({ postId }: { postId: string }){
  const [comment, setComment] = useState<comment>({ id: 1, comment: '', user: 1, username: '' })

  async function getComment(){
    const response = await fetch('http://127.0.0.1:8000/api/comment/get/' + postId)
    if(response.status === 200){
      const body: comment = await response.json()
      setComment(body)
    }
    else{
      setComment({ id: 1, comment: '', user: 1, username: 'No comments' })
    }
  }

  useEffect(() => {
    getComment()
  }, [])

  return(
    <div className="w-1/2 text-[60%] absolute bottom-[5%] left-[5%] text-white">
      <h2 className="font-semibold text-xl">{comment['username']}</h2>
      <p>{comment['comment']}</p>
    </div>
  )
}
