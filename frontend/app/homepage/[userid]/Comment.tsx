interface params {
  postId: string;
}

interface comment {
  id: number;
  comment: string;
  user: number;
  username: string;
}

async function getComment(postId: string) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/comment/get/" + postId
  );
  if (response.status === 200) {
    const body: comment = await response.json();
    return body;
  }
}

export default async function Comment({ postId }: params) {
  const comment = await getComment(postId);

  return (
    <div className="w-1/2 absolute text-[10px] bottom-[5%] left-[5%] text-white">
      <h2 className="font-semibold text-xl">
        {comment ? comment["username"] : "No Comments"}
      </h2>
      <p>{comment ? comment["comment"] : ""}</p>
    </div>
  );
}
