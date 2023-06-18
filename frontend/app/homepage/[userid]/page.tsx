import Comments from "./Comments"
import Review from "./Review"

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
    <div className="h-full">
      <div className='h-3/4 absolute w-max top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <img src={'http://127.0.0.1:8000' + post['image']} className='h-full'></img>
        <Review />
      </div>
      <Comments commentId={searchParams['postId']} />
    </div>
  )
}
