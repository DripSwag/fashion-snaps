import Post from "@/components/Post";
import { createClient } from "@/utils/supabase/server";

export async function getPosts() {
  const supabase = await createClient();
  const TIME = 60 * 60;
  var combinedData = [];

  const posts = await supabase.from("Post").select(`*`);

  console.log(posts);

  if (posts.error !== null) {
    return [];
  }

  var paths = posts.data?.map((value) => {
    return `${value.user}/${value.id}/image.png`;
  });

  const signedUrls = await supabase.storage
    .from("post")
    .createSignedUrls(paths, TIME);

  if (signedUrls.error !== null) {
    return [];
  }

  for (var i = 0; i < signedUrls.data?.length; i++) {
    combinedData.push({
      signedUrl: signedUrls.data[i].signedUrl,
      id: posts.data[i].id,
      bgColor: posts.data[i].color,
    });
  }

  return combinedData;
}

export default async function Home() {
  const posts = await getPosts();

  console.log(posts);

  return (
    <main className="min-h-screen">
      {posts?.map((value) => {
        return (
          <Post
            src={value.signedUrl}
            key={value.id}
            id={value.id}
            bgColor={value.bgColor}
          />
        );
      })}
    </main>
  );
}
