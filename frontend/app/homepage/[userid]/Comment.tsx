interface comment {
  id: number;
  comment: string;
  user: number;
  username: string;
}

interface post {
  id: number;
  image: string;
  user: number;
}

async function getComment(postId: string) {
  const response = await fetch("http://127.0.0.1:8000/api/comment/get/" + postId);
  if (response.status === 200) {
    return await response.json();
  } else {
    return { id: 1, comment: "", user: 1, username: "No Comments" };
  }
}

export default async function Comment({
  postId,
  post,
}: {
  postId: string;
  post: post;
}) {
  const comment: comment = await getComment(postId);

  return (
    <div className="w-1/2 absolute text-[10px] bottom-[5%] left-[5%] text-white">
      <h2 className="font-semibold text-xl">{comment["username"]}</h2>
      <p>{comment["comment"]}</p>
    </div>
  );
}
