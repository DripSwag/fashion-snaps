import Post from "./Post"
import NextPost from "./NextPost"
import Review from "./Review"

export default function Homepage({ params, searchParams }: { params: { postId: string }, searchParams: { userId: string } }){
  return(
    <div className="h-full">
      <Post postId={params['postId']} />
      <NextPost userId={searchParams['userId']} />
      <Review userId={searchParams['userId']} postId={params['postId']} />
    </div>
  )
}
