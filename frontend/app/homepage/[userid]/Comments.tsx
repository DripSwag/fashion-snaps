'use client'

import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import Comment from "./Comment"

interface comment{
  id: number,
  comment: string,
  user: number,
  username: string
}


export default function Comments({ commentId }: { commentId: string }){
  const [comments, setComments] = useState<Array<comment>>()

  async function getComments(id: string){
    const response = await fetch('http://127.0.0.1:8000/api/comment/get/' + id)
    const body = await response.json()
    setComments(body)
  }

  useEffect(() => {
    getComments(commentId)
  }, [])

  return(
    <div>
      {
        comments && comments.map((data: comment, index: number) => {
          return <Comment username={data['username']} comment={data['comment']} key={data['id']} />
      })
      }
      <button onClick={() => { getComments(commentId) }}>Refresh Comments</button>
    </div>
  )
}
