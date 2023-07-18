const API_ORIGIN: string = process.env.API_ORIGIN ? process.env.API_ORIGIN : "";

export async function POST(request: Request) {
  const authToken = request.headers.get("sessionId");
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint, {
    method: "POST",
    body: await request.formData(),
    headers: {
      AuthToken: authToken !== null ? authToken : "",
    },
  });
  if (response.status === 401) {
    return NextResponse.redirect("http://localhost:3000" || "");
  }
  return response;
}
