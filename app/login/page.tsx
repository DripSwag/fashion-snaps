import { login, signup } from "./actions";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function LoginPage() {
  return (
    <form className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-sm flex flex-col gap-6 bg-white p-10 border border-black/10 shadow-2xl shadow-black/10">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
        <p className="text-sm text-black/60">
          Log in or create an account to start posting.
        </p>
      </header>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs uppercase tracking-[0.2em] text-black/70"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="border-b border-black/30 bg-transparent py-2 outline-none transition-colors focus:border-black"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-xs uppercase tracking-[0.2em] text-black/70"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="border-b border-black/30 bg-transparent py-2 outline-none transition-colors focus:border-black"
        />
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <button
          formAction={login}
          className="bg-black text-white py-3 text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-80 cursor-pointer"
        >
          Log in
        </button>
        <button
          formAction={signup}
          className="border border-black py-3 text-sm uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white cursor-pointer"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
