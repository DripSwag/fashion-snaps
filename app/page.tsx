import { createClient } from "@/utils/supabase/server";
import { getPosts } from "./_lib/post";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Home() {
  const supabase = await createClient();

  const postsResponse = getPosts(supabase);

  const { data, error } = await postsResponse;

  if (error) {
    throw error;
  }

  return (
    <main>
      {data.map((value) => (
        <section className="w-screen h-screen" key={value.id}>
          <div className="page">
            {value.ImageComponent.map((imageValue) => (
              <ImageComponent
                key={imageValue.id}
                supabase={supabase}
                //@ts-ignore NOTE: Supabase types are incorrect
                filePath={imageValue.objects["name"]}
                width={imageValue.width}
                height={imageValue.height}
                x={imageValue.x}
                y={imageValue.y}
              />
            ))}
            {value.TextComponent.map((textValue) => (
              <TextComponent
                value={textValue.value}
                key={textValue.id}
                width={textValue.width}
                height={textValue.height}
                x={textValue.x}
                y={textValue.y}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

interface TextInterface {
  value: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

function TextComponent({ value, width, height, x, y }: TextInterface) {
  return (
    <p
      className="whitespace-pre-line absolute"
      style={{ width, height, left: x, top: y }}
    >
      {value}
    </p>
  );
}

interface ImageParameter {
  filePath: string;
  supabase: SupabaseClient;
  height: number;
  width: number;
  x: number;
  y: number;
}

function ImageComponent({
  filePath,
  supabase,
  width,
  height,
  x,
  y,
}: ImageParameter) {
  const imageSrc = supabase.storage.from("PostImage").getPublicUrl(filePath);

  return (
    <img
      src={imageSrc.data.publicUrl}
      alt="Image"
      className="absolute"
      style={{ width, height, left: x, top: y }}
    />
  );
}
