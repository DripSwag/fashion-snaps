"use client";

import {
  ChangeEvent,
  ChangeEventHandler,
  createRef,
  FormEvent,
  useState,
} from "react";

export default function FileInput({ userId }: { userId: string }) {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();

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
      const response = await fetch("http://127.0.0.1:8000/api/post/create/1", {
        method: "POST",
        body: formData,
      });
    }
  }

  return (
    <form onSubmit={submit}>
      <input
        type="file"
        onChange={changeHandler}
        accept="image/png"
        required
      ></input>
      <button type="submit">Submit</button>
      <img src={preview}></img>
    </form>
  );
}
