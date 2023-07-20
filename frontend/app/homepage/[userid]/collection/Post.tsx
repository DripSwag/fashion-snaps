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
        src={process.env.API_ORIGIN + image}
        className="w-[80%] aspect-auto relative left-1/2 -translate-x-1/2"
      ></img>
    </Link>
  );
}
