"use server";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { URLS } from "@/data/urls";

async function getCurrentUser(refresh_token) {
  const headers = {
    Cookie: `refresh_token=${refresh_token}`,
    "Content-Type": "application/json",
  };

  const currentUser = await (
    await fetch(`${process.env.BACKEND_URL}${URLS.user.currentUser}`, {
      method: "GET",
      headers,
    })
  ).json();

  return {
    id: currentUser.user_id,
    email: currentUser.email,
    name: currentUser.username,
  };
}

const authOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      CredentialsProvider({
        id: "default",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "Email" },
          password: {
            label: "password",
            type: "password",
          },
          formType: { type: "string" },
        },
        authorize: async credentials => {
          const sessionId = req.cookies.refresh_token;

          const currentUser = await getCurrentUser(sessionId);

          /* const date = new Date();
          date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);

          res.setHeader("Set-Cookie", [
            `access_token=${credentials.accessToken}; expires=${date.toUTCString()}; path=/`,
          ]);
          */
          return currentUser;
        },
      }),
    ],

    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          token.user = user;
        }

        return token;
      },
      async session({ session, token }) {
        session.user = token?.user;

        return session;
      },
    },
    events: {
      signOut: () => {
        res.setHeader("Set-Cookie", [
          `refresh_token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        ]);
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 15 * 24 * 60 * 60,
      updateAge: 2 * 24 * 60 * 60,
    },
  } as AuthOptions;
};

const handler = (req, res) => {
  return NextAuth(req, res, authOptions(req, res));
};

export default handler;
