import LoginForm from "./LoginForm";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="font-bold text-3xl">Fashion Snaps</h1>
      <LoginForm />
    </main>
  );
}
