export default function Homepage({ params, searchParams }: { params: { userid: string }, searchParams: { postid: string } }){
  return(
    <div>
      <h1>Homepage</h1>
      <p>{ searchParams['postid'] }</p>
    </div>
  )
}
