"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function FileInput({ userId }: { userId: string }) {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");
  const router = useRouter();

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      //No content type, idk why but I think its bad but its the only way it will work
      const response = await fetch(
        "http://127.0.0.1:8000/api/post/create/" + userId,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.status === 200) {
        router.back();
        router.refresh();
      }
    }
  }

  return (
    <form onSubmit={submit}>
      <input
        type="file"
        onChange={changeHandler}
        accept="image/png, image/jpeg"
        required
      ></input>
      <button type="submit">Submit</button>
      <img
        src={preview}
        alt=""
        className="w-full aspect-square max-w-[600px] border-0"
      ></img>
    </form>
  );
}
