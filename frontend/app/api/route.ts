const API_ORIGIN: string = process.env.API_ORIGIN ? process.env.API_ORIGIN : "";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint);
  return response;
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(await request.json()),
  });
  return response;
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(await request.json()),
  });
  return response;
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const response = await fetch(API_ORIGIN + endpoint, {
    method: "DELETE",
  });
  return response;
}
