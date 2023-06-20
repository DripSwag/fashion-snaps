import Comment from "./Comment"

interface post{
  id: number,
  image: string
  user: number
}

interface comment{
  id: number,
  comment: string,
  user: number,
  username: string,
}

async function getPost(postId: string){
  const response = await fetch('http://127.0.0.1:8000/api/post/get/' + postId)
  if(response.status === 200){
    return response.json()
  }
}

async function getComment(postId: string){
  const response = await fetch('http://127.0.0.1:8000/api/comment/get/' + postId, {
    cache: 'no-store'
  })
  if(response.status === 200){
    return response.json()
  }
  return { id: 1, comment: '', user: 1, username: 'No comments' }
}

export default async function Post({ postId }: { postId: string }){
  const postData: post = await getPost(postId)
  const commentData: comment = await getComment(postId)
  const [post, comment] = await Promise.all([postData, commentData])

  return(
    <div className="h-3/4 w-max absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <img src={"http://127.0.0.1:8000" + post['image']} className="h-full"></img>
      <Comment postId={postId} />
    </div>
  )
}
