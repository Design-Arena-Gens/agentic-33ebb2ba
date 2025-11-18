import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Sign in · Acme Control Center",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-zinc-200 px-6 py-16 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="flex w-full max-w-6xl flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-200"
          >
            ACME CONTROL CENTER
          </Link>

          <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Secure access for high-performing teams.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Authenticate with your issued credentials to access insights,
            configure integrations, and collaborate with your team.
          </p>
        </div>

        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
