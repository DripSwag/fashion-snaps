import React from "react";
import Link from "next/link";
import Logout from "./Logout";

export default async function HomepageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userid: string };
}) {
  //Add middleware so I dont need to call get post because the cache is stored and not cleared because the nav is persistent
  return (
    <section className="h-screen w-full flex flex-col">
      <nav className="w-full py-4 px-16 flex items-center gap-4">
        <h1 className="mx-16 font-bold text-xl">Fashion Snaps</h1>
        <Link href={`/homepage/${params["userid"]}`}>Homepage</Link>
        <Link href={`/homepage/${params["userid"]}/account`}>Account</Link>
        <a href={`/homepage/${params["userid"]}/collection`}>Collection</a>
        <Logout />
      </nav>
      {children}
    </section>
  );
}
