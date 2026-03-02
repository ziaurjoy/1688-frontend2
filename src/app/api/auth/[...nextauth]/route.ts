import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

/* -------------------------------------------------------------------------- */
/*                                Type Extend                                 */
/* -------------------------------------------------------------------------- */

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    token_type?: string;
    api_credential?: any;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      is_active?: boolean;
    };
  }

  interface User {
    accessToken?: string;
    token_type?: string;
    api_credential?: any;
    user?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    token_type?: string;
    api_credential?: any;
    user?: any;
  }
}

/* -------------------------------------------------------------------------- */
/*                              NextAuth Options                              */
/* -------------------------------------------------------------------------- */

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    /* ======================== Credentials Login ======================== */
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

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/token`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!res.ok) return null;

        const data = await res.json();

        return {
          id: data.user?.id || data.user?.email || "1",
          accessToken: data.access_token,
          token_type: data.token_type,
          user: data.user,
          api_credential: data.api_credential,
        };
      },
    }),

    /* ======================== Google OAuth ======================== */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    /* ======================== JWT Callback ======================== */
    async jwt({ token, user, account }) {
      // Credentials login
      if (user) {
        token.accessToken = user.accessToken;
        token.token_type = user.token_type;
        token.user = user.user;
        token.api_credential = user.api_credential;
      }

      // Google login → exchange id_token with backend
      if (account?.provider === "google") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/google`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_token: account.id_token,
            }),
          },
        );

        const data = await res.json();

        token.accessToken = data.access_token;
        token.token_type = data.token_type;
        token.user = data.user;
        token.api_credential = data.api_credential;
      }

      return token;
    },

    /* ======================== Session Callback ======================== */
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.token_type = token.token_type;
      session.api_credential = token.api_credential;

      session.user = {
        ...session.user,
        ...token.user,
      };

      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

/* -------------------------------------------------------------------------- */
/*                                  Handler                                   */
/* -------------------------------------------------------------------------- */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
