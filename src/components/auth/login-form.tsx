"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useMemo, useState, useTransition } from "react";
import { z } from "zod";

import { fallbackUserEmail, fallbackPassword } from "@/lib/auth/config";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({ email: "", password: "" });

  const hasErrors = useMemo(
    () => error !== null || Object.keys(formErrors).length > 0,
    [error, formErrors],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setFormErrors({});

    const parseResult = formSchema.safeParse(values);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parseResult.error.issues) {
        if (issue.path.length > 0) {
          const [field] = issue.path;
          if (typeof field === "string") {
            fieldErrors[field] = issue.message;
          }
        }
      }
      setFormErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      const response = await signIn("credentials", {
        email: parseResult.data.email,
        password: parseResult.data.password,
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      router.replace("/");
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-zinc-950/60"
    >
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Sign in with your credentials to access the control center.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Email address
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            autoComplete="email"
            placeholder="you@company.com"
            className="h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-base font-normal text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            disabled={isPending}
          />
          {formErrors.email ? (
            <span className="text-sm font-normal text-red-500">
              {formErrors.email}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Password
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-base font-normal text-zinc-900 outline-none transition focus:border-zinc-500 focus:bg-white focus:ring-2 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            disabled={isPending}
          />
          {formErrors.password ? (
            <span className="text-sm font-normal text-red-500">
              {formErrors.password}
            </span>
          ) : null}
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex h-12 items-center justify-center rounded-xl bg-zinc-900 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>

      {hasErrors ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          {error ?? Object.values(formErrors)[0]}
        </div>
      ) : null}

      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        Hint: email <span className="font-medium">{fallbackUserEmail}</span>{" "}
        with password <span className="font-medium">{fallbackPassword}</span>
      </p>
    </form>
  );
}
