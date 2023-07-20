"use client";

import { useRouter } from "next/navigation";

export default function Post({ img, id }: { img: string; id: number }) {
  const router = useRouter();

  function clicked() {
    router.push(
      process.env.NEXT_PUBLIC_URL_ORIGIN + "/homepage/1/account/post/" + id.toString()
    );
  }

  return (
    <div
      onClick={clicked}
      className="post col-span-1 w-full hover:cursor-pointer"
    >
      <img
        src={"http://127.0.0.1:8000" + img}
        className="aspect-auto w-[80%] relative left-1/2 -translate-x-1/2"
      ></img>
    </div>
  );
}
