## Acme Control Center – Authentication Portal

A credential-gated control center built with Next.js 16 (App Router), Tailwind CSS, and NextAuth. Users authenticate with email + password (hashed with bcrypt) and gain access to a session-aware dashboard experience.

### Project highlights

- NextAuth credential provider backed by environment-configurable demo credentials
- Secure session propagation via server-side session fetching and client-side provider
- Responsive login experience with validation powered by Zod
- Authenticated dashboard shell with sign-out controls and ready-to-extend content

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.local.example .env.local
   ```

   Update `AUTH_SECRET` with a strong random string. Optionally override the demo credentials.

3. Run the development server:

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` and sign in with the credentials defined in your env file (default: `demo@acme.com` / `Password123!`).

4. Validate before deployment:

   ```bash
   npm run lint
   npm run build
   ```

## Deployment

The project is optimized for Vercel. Deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-33ebb2ba
```

The production deployment lives at `https://agentic-33ebb2ba.vercel.app`.

## Tech stack

- Next.js 16 (App Router, TypeScript)
- NextAuth for authentication
- Tailwind CSS (v4) with the new `@import "tailwindcss"` pipeline
- Zod for runtime validation
- bcryptjs for password hashing
