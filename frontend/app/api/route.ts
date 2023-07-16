const API_ORIGIN = "http://127.0.0.1:8000/api/";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint);
  return response;
}
