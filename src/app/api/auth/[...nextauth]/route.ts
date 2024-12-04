import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers"; // Next.js cookies utility
import { auth } from "@/data/urls";

async function getCurrentUser(access_token: string) {
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const currentUser = await (
    await fetch(`${process.env.BACKEND_URL}${auth.currentUser}`, {
      method: "GET",
      headers,
    })
  ).json();

  console.log(currentUser);

  return {
    id: currentUser.user_id,
    email: currentUser.email,
    name: currentUser.username,
  };
}

const COOKIE_NAME = "access_token";
const COOKIE_MAX_AGE = 15 * 24 * 60 * 60; // 15 days in seconds

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "default",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "enail" },
        password: { label: "password", type: "password" },
        formType: { label: "formType", type: "string" },
        accessToken: { label: "accessToken", type: "string" },
      },
      async authorize(credentials) {
        console.log(credentials);

        if (!credentials) return null;

        const { accessToken } = credentials;

        const user = await getCurrentUser(accessToken);

        if (user) {
          // Set cookie with a max age of 15 days
          cookies().set(COOKIE_NAME, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: COOKIE_MAX_AGE,
            path: "/",
          });

          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        name: token.name,
        email: token.email,
      };
      return session;
    },
  },
  events: {
    async signOut() {
      // Delete the cookie when signing out
      cookies().set(COOKIE_NAME, "", { path: "/", maxAge: -1 });
    },
  },
  pages: {},
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
