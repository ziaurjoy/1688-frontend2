import NextAuth, { type Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id?: string;
  }
}

const handler = NextAuth({
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
      async authorize(credentials) {
        if (!credentials) return null;
        const formData = new FormData();
        formData.append("username", credentials.email);
        formData.append("password", credentials.password);

        const res = await fetch(`${process.env.BACKEND_API_URL}/users/token`, {
          method: "POST",
          body: formData, // no JSON.stringify
        });

        if (!res.ok) return null;

        const user = await res.json();
        console.log("===user", user.access_token);
        // user must contain id
        return {
          // id: user.id,
          // name: user.name,
          // email: user.email,
          accessToken: user.access_token, // backend JWT
        };
      },
    }),

    // 🌍 Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // 🔐 Store backend token in NextAuth JWT
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
      }

      // Google login → send token to backend
      if (account?.provider === "google") {
        const res = await fetch(`${process.env.BACKEND_API_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_token: account.id_token,
          }),
        });

        const data = await res.json();
        token.accessToken = data.access_token;
        token.id = data.user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
});

export { handler as GET, handler as POST };
