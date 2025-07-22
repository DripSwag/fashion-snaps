import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function getPost(id: number) {
  const TIME = 60 * 60;
  const supabase = await createClient();

  const postResponse = await supabase
    .from("Post")
    .select("color, title, body, user")
    .eq("id", id);

  if (postResponse.data === null) {
    return null;
  }

  const postData = postResponse.data.at(0);

  const signedURL = await supabase.storage
    .from("post")
    .createSignedUrl(`${postData?.user}/${id}/image.png`, TIME);

  if (signedURL.data === null) {
    return null;
  }

  return {
    color: postData?.color,
    title: postData?.title,
    body: postData?.body,
    signedURL: signedURL.data.signedUrl,
  };
}

interface Params {
  params: Promise<{ postID: string }>;
}

export default async function PostDetailed({ params }: Params) {
  const { postID } = await params;

  const postData = await getPost(parseInt(postID));

  if (postData === null) {
    redirect("/");
  }

  return (
    <main
      className="h-screen w-screen flex justify-center items-center"
      style={{ backgroundColor: postData.color }}
    >
      <div className="max-w-4/5 h-full flex justify-center items-center gap-32">
        <img src={postData.signedURL} className="h-3/4" />
        <div className="text-white flex flex-col gap-8">
          <h1 className="text-7xl font-bold">{postData.title}</h1>
          <p className="text-xl">{postData.body}</p>
        </div>
      </div>
    </main>
  );
}
