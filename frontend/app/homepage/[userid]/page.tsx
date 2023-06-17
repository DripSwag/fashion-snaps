import Comments from "./Comments"

interface post{
  id: number
  image: string
  user: number
}


async function getPost(postId: string){
  const response = await fetch('http://127.0.0.1:8000/api/post/get/' + postId)
  return response.json()
}

export default async function Homepage({ params, searchParams }: { params: { userid: string }, searchParams: { postId: string } }){

  const post = await getPost(searchParams['postId'])

  return(
    <div>
      <img src={'http://127.0.0.1:8000' + post['image']}></img>
      <Comments commentId={searchParams['postId']} />
    </div>
  )
}
