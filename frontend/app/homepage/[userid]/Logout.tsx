"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  function clicked() {
    Cookies.remove("sessionId");
    router.push("/");
  }

  return <button onClick={clicked}>Logout</button>;
}
