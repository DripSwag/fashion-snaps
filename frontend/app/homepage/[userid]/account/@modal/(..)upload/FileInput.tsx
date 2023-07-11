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
    <form
      onSubmit={submit}
      className="h-full flex flex-col justify-center items-center"
    >
      <img
        src={preview}
        alt=" "
        className="w-full aspect-square max-w-[600px] border-0"
      ></img>
      <div className="flex py-4 py-2 px-4 border-2 rounded-lg">
        <input
          type="file"
          onChange={changeHandler}
          accept="image/png, image/jpeg"
          className="file:px-4 file:py-2 file:mr-4 text-neutral-800"
          required
        ></input>
        <button
          type="submit"
          className="bg-black px-4 py-2 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
