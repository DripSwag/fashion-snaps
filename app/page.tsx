import { createClient } from "@/utils/supabase/server";
import { getPosts } from "./_lib/post";
import { SupabaseClient } from "@supabase/supabase-js";
import { StoredComponent } from "./_lib/post";
import { Database } from "@/database.types";
import { ShapeType } from "./post/_enum/ShapeType";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Home() {
  const supabase = await createClient();

  const posts = await getPosts(supabase);

  return (
    <main>
      {posts &&
        posts.map((post) => (
          <section
            className="w-screen h-screen"
            style={{ backgroundColor: post.backgroundColor }}
            key={post.id}
          >
            <div className="page" style={{ backgroundColor: post.pageColor }}>
              {post.components.map((component, i) => (
                <RenderComponent
                  key={i}
                  component={component}
                  supabase={supabase}
                />
              ))}
            </div>
          </section>
        ))}
    </main>
  );
}
function RenderComponent({
  component,
  supabase,
}: {
  component: StoredComponent;
  supabase: SupabaseClient<Database>;
}) {
  const { x, y, z, width, height } = component.body;
  const style = { width, height, left: x, top: y, zIndex: z };

  switch (component.component) {
    case "text":
      return (
        <p
          className="whitespace-pre-line absolute"
          style={{
            ...style,
            fontSize: component.body.size,
            fontFamily: component.body.font,
          }}
        >
          {component.body.value}
        </p>
      );
    case "image": {
      const { data } = supabase.storage
        .from("PostImage")
        .getPublicUrl(component.body.imagePath);
      return (
        <img
          src={data.publicUrl}
          alt="Image"
          className="absolute"
          style={style}
        />
      );
    }
    case "shape":
      return (
        <div
          className={`absolute ${component.body.type === ShapeType.Circle ? "rounded-full" : ""}`}
          style={{
            ...style,
            backgroundColor: component.body.color,
            clipPath:
              component.body.type === ShapeType.Triangle
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : undefined,
          }}
        />
      );
  }
}
