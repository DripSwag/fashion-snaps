import Link from "next/link";

export default function NewPost() {
  return (
    <Link href={"upload/"} className="post w-full h-full">
      <p className="font-bold text-4xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        +
      </p>
      <div className="w-16 aspect-square bg-transparent rounded-full border-4 border-black left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute"></div>
    </Link>
  );
}
