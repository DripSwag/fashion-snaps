"use client";

import Cookies from "js-cookie";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface login {
  id: number;
  token: Array<{ tokenId: string }>;
}

interface post {
  id: number | null;
}

async function clicked(
  username: string,
  password: string,
  router: AppRouterInstance,
  setIncorrect: Dispatch<SetStateAction<boolean>>
) {
  const responseLogin = await fetch("http://127.0.0.1:8000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (responseLogin.status === 200) {
    const bodyLogin: login = await responseLogin.json();

    const responsePost = await fetch("http://127.0.0.1:8000/api/post/get", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: bodyLogin.id }),
    });

    const bodyPost: post = await responsePost.json();

    Cookies.set("sessionId", bodyLogin["token"][0]["tokenId"], {
      sameSite: "Strict",
    });

    const pathPostId =
      bodyPost["id"] !== undefined ? bodyPost.id?.toString() : "0";
    const path = "/homepage/" + bodyLogin.id + "?postId=" + pathPostId;
    router.push(path);
  } else {
    setIncorrect(true);
  }
}

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [incorrect, setIncorrect] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-4 items-center justify-center">
        {incorrect && (
          <p className="text-red-500 font-semibold">Credentials incorrect</p>
        )}
        <input
          placeholder="Username"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          className="p-4 border-b-2"
        ></input>
        <input
          placeholder="Password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="p-4 border-b-2"
        ></input>
      </form>
      <button
        onClick={() => {
          clicked(username, password, router, setIncorrect);
        }}
        className="px-4 py-2 my-4 bg-black text-white w-max rounded-lg"
      >
        Login
      </button>
    </div>
  );
}
