import React from "react";
import Link from "next/link";
import Logout from "./Logout";

interface post {
  id: number | null;
}

async function getHomepageUrl(userId: string) {
  const body: post = await fetch("http://127.0.0.1:8000/api/post/get", {
    cache: "no-store",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: parseInt(userId) }),
  }).then((response) => response.json());

  const pathPostId = body.id !== undefined ? body.id?.toString() : "0";
  return "/homepage/" + userId + "?postId=" + pathPostId;
}

export default async function HomepageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userid: string };
}) {
  const homepageUrl: string = await getHomepageUrl(params.userid);

  return (
    <section className="h-screen w-full flex flex-col items-center">
      <nav className="w-full h-16 py-4 px-4 flex items-center gap-4 max-w-[1200px]">
        <a href={homepageUrl} className="mx-4 font-bold text-xl">
          Fashion Snaps
        </a>
        <a href={homepageUrl}>Homepage</a>
        <Link href={`/homepage/${params["userid"]}/account`}>Account</Link>
        <a href={`/homepage/${params["userid"]}/collection`}>Collection</a>
        <Logout />
      </nav>
      {children}
    </section>
  );
}
