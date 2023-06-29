"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  function clicked() {
    Cookies.remove("sessionId");
    router.replace("/");
    router.refresh();
  }

  return (
    <button onClick={clicked} className="mx-8">
      Logout
    </button>
  );
}
