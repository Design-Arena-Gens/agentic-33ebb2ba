"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { PropsWithChildren } from "react";

type SessionProviderProps = PropsWithChildren<{
  session: Session | null;
}>;

export function AuthSessionProvider({
  session,
  children,
}: SessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
