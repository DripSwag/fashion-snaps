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
  var postdata: post

  const postResponse = getPost(searchParams['postId'])
  const [postData] = await Promise.all([postResponse])

  return(
    <div>
      <h1>Homepage</h1>
      <img src={'http://127.0.0.1:8000' + postData['image']}></img>
    </div>
  )
}
