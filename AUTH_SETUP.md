# Authentication Setup Guide

## Overview

Your Next.js application is configured with **next-auth** for authentication. The system handles:

- ✅ Automatic redirect to sign-in for unauthenticated users
- ✅ Session management with JWT tokens
- ✅ Google OAuth integration
- ✅ Credentials-based login
- ✅ Automatic redirect authenticated users away from auth pages

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Backend API
BACKEND_API_URL=http://localhost:8000

# Google OAuth (optional if using Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### How to generate NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

## How It Works

### 1. **Middleware** (`middleware.ts`)

- Intercepts all requests to protected routes (`/admin-dashboard`, `/dashboard`, `/profile`)
- Checks if user has valid JWT token
- Redirects unauthenticated users to `/sign-in`
- Redirects authenticated users away from auth pages (`/sign-in`, `/sign-up`)

### 2. **Session Provider** (`providers.tsx`)

- Wrapped the app with `SessionProvider` for client-side session access
- Makes session available to all client components

### 3. **Auth Routes** (`src/app/api/auth/[...nextauth]/route.ts`)

- Handles credential login via endpoint: `{BACKEND_API_URL}/users/token`
- Handles Google OAuth via endpoint: `{BACKEND_API_URL}/auth/google`
- Manages JWT token lifecycle

## Usage in Your Components

### Server Component - Check Session

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return <div>Welcome {session.user?.name}</div>;
}
```

### Client Component - Use useAuth Hook

```typescript
"use client";

import { useAuth } from "@/hooks/use-auth";

export default function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth({
    required: true,
    redirectTo: "/sign-in",
  });

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <div>Welcome {user?.name}</div>;
}
```

### Client Component - Use useSession Hook (Next-Auth)

```typescript
"use client";

import { useSession, signOut } from "next-auth/react";

export default function ProfileComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Not signed in</div>;

  return (
    <div>
      <p>Signed in as {session?.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### Protect Routes with Component Wrapper

```typescript
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function SensitiveData() {
  return (
    <ProtectedRoute fallback={<div>Loading...</div>}>
      <div>This is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}
```

## Protected Routes (Automatic via Middleware)

These routes are automatically protected and require authentication:

- `/admin-dashboard/*` - Admin dashboard and subpages
- `/dashboard/*` - Main dashboard
- `/profile/*` - User profile pages

## Public Routes

These routes are accessible to everyone:

- `/` - Home page
- `/sign-in` - Login page
- `/sign-up` - Registration page

## API Route Protection

To protect API routes, you can use:

```typescript
// src/app/api/protected/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Your protected logic here
  return new Response("Protected data", { status: 200 });
}
```

## Sign Out

```typescript
import { signOut } from "next-auth/react";

<button onClick={() => signOut({ callbackUrl: "/sign-in" })}>Logout</button>
```

## Troubleshooting

1. **Session not persisting**

   - Ensure `SessionProvider` is in `providers.tsx`
   - Check NEXTAUTH_SECRET is set

2. **Redirect loop**

   - Verify routes in middleware matcher
   - Check `authOptions` pages configuration

3. **Session undefined in client**

   - Make sure component is marked with "use client"
   - Check SessionProvider wraps component

4. **Backend authentication fails**
   - Verify BACKEND_API_URL is correct
   - Check credentials endpoint returns correct format

## References

- [NextAuth.js Documentation](https://next-auth.js.org)
- [Next.js Middleware Docs](https://nextjs.org/docs/advanced-features/middleware)
