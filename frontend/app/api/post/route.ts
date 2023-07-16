const API_ORIGIN: string = process.env.API_ORIGIN ? process.env.API_ORIGIN : "";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint, {
    method: "POST",
    body: await request.formData(),
  });
  return response;
}
