import { submit } from "./actions";

export default function Post() {
  return (
    <main>
      <h1>Post</h1>
      <form action={submit}>
        <input type="file" name="image" />
        <input type="submit" />
      </form>
    </main>
  );
}
