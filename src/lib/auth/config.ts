import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";

const credentialSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const fallbackUserEmail = "demo@acme.com";
export const fallbackPassword = "Password123!";
const fallbackPasswordHash =
  "$2b$12$hBUGDBNFk33c7QOMvtFgGeBPtuVQKP9LmxJafuVo68by3iW2pl2s6";

const allowedEmail = process.env.AUTH_USER_EMAIL ?? fallbackUserEmail;
const allowedPasswordHash =
  process.env.AUTH_USER_PASSWORD_HASH ?? fallbackPasswordHash;

type CredentialsShape = Record<"email" | "password", string>;

async function validateCredentials(credentials?: CredentialsShape) {
  const parsed = credentialSchema.safeParse({
    email: credentials?.email ?? "",
    password: credentials?.password ?? "",
  });
  if (!parsed.success) {
    return null;
  }

  const { email, password } = parsed.data;
  if (email !== allowedEmail) {
    return null;
  }

  const isValidPassword = await compare(password, allowedPasswordHash);
  if (!isValidPassword) {
    return null;
  }

  const user: User = {
    id: "demo-user",
    email,
  };

  return user;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: validateCredentials,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.email && session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET ?? "please-set-a-strong-secret",
};
