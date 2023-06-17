export default function Comment({ comment, username }: { comment:string, username: string }){
  return(
    <div>
      <h2>{username}</h2>
      <p>{comment}</p>
    </div>
  )
}
