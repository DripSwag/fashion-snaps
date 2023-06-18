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
  const [noComments, setNoComments] = useState(false)

  async function getComments(id: string){
    const response = await fetch('http://127.0.0.1:8000/api/comment/get/' + id)
    if(response.status === 200){
      const body = await response.json()
      setNoComments(true)
      setComments(body)
    }
    else if(response.status === 204){
      setNoComments(true)
    }
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
      <p className={noComments ? 'block' : 'hidden'}>No Comments</p>
      <button onClick={() => { getComments(commentId) }}>Refresh Comments</button>
    </div>
  )
}
