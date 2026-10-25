export async function simpleFetcher(url: string) {
  const response = await fetch(url);
  return response.json();
}
