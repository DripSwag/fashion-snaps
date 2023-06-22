import React from "react";
import Link from "next/link";

async function getPost(){
  const response = await fetch('http://127.0.0.1:8000/api/post/get', {
    cache: 'no-store'
  })
  const body: { id: number } = await response.json()
  return body['id'].toString()
}

export default async function HomepageLayout({ children, params }: { children: React.ReactNode, params: { userid: string } }){
  //Add middleware so I dont need to call get post because the cache is stored and not cleared because the nav is persistent
  return(
    <section className="h-screen w-full flex flex-col">
      <nav>
        <Link href={`/homepage/${params['userid']}?postId=${await getPost()}`}>Homepage</Link>
        <Link href={`/homepage/${params['userid']}/account`}>Account</Link>
      </nav>
      {children}
    </section>
  )
}
