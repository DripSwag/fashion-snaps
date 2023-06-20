'use client'

import {useRouter} from "next/navigation"

interface post{
  id: number
}

export default function NextPost({ userId }: { userId: string }){
  const router = useRouter()

  const clicked = async () => {
    const body: post = await fetch('http://127.0.0.1:8000/api/post/get').then((response) => response.json())
    router.push(`/homepage/${body['id']}?userId=${userId}`)
  }

  return(
    <button className="font-bold text-2xl absolute bottom-[2%] left-1/2 -translate-x-1/2" onClick={() => { clicked() }}>˅</button>
  )
}
