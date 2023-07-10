import Link from "next/link";

export default function Post({
  image,
  postId,
  userId,
}: {
  image: string;
  postId: string;
  userId: string;
}) {
  return (
    <Link href={"/homepage/" + userId + "?postId=" + postId} className="post">
      <img
        src={"http://127.0.0.1:8000/" + image}
        className="w-[80%] aspect-auto relative left-1/2 -translate-x-1/2"
      ></img>
    </Link>
  );
}
