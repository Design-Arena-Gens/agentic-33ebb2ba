import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { authOptions } from "@/lib/auth/config";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white/70 backdrop-blur dark:border-zinc-900 dark:bg-zinc-900/70">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
              Acme Control Center
            </span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-200">
              {session.user.email}
            </div>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg shadow-zinc-200/50 dark:border-zinc-900 dark:bg-zinc-950 dark:shadow-zinc-950/60">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            Welcome back, {session.user.email}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            You are securely authenticated. Use the navigation to review system
            health, manage integrations, and collaborate with your teammates.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-900 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Activity stream
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Track the latest updates from your organization, including new
              deployments and access grants. Integrate with audit tooling to
              enrich this feed.
            </p>
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-900 dark:bg-zinc-950">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Security posture
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Review authentication success rates, MFA adoption, and
              configuration drift. Connect your identity provider to surface
              richer metrics here.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
