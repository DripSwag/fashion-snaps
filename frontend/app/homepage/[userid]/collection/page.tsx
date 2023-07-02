interface bookmark {
  id: number;
  post: {
    id: number;
    image: string;
    user: number;
  };
}

async function getBookmarks(userid: string) {
  const response = await fetch("http://127.0.0.1:8000/api/bookmark/" + userid, {
    cache: "no-store",
  });
  if (response.status === 200) {
    return await response.json();
  }
}

export default async function Collection({
  params,
}: {
  params: { userid: string };
}) {
  const bookmarks = await getBookmarks(params["userid"]);

  return (
    <div>
      {bookmarks &&
        bookmarks.map((data: bookmark) => {
          return <div>{data.post.id}</div>;
        })}
    </div>
  );
}
