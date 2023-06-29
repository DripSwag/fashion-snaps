interface post {
  id: number;
  image: string;
  user: number;
}

async function getImage(postId: string) {
  try {
    const post: post = await fetch(
      "http://127.0.0.1:8000/api/post/get/" + postId
    ).then((response) => response.json());
    return "http://127.0.0.1:8000" + post["image"];
  } catch {
    return "";
  }
}

export default async function Post({ params }: { params: { postid: string } }) {
  const image = await getImage(params["postid"]);

  return (
    <div className="w-screen h-screen bg-[#61616199] fixed top-0 left-0">
      <img
        className="h-3/4 aspect-auto pb-24 pt-4 px-8 bg-[#F8F8FF] relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        src={image}
      ></img>
    </div>
  );
}
