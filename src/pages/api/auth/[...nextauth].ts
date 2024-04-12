'use server';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCookie } from 'cookies-next';

async function getCurrentUser(refresh_token) {
  const headers = {
    Cookie: `refresh_token=${refresh_token}`,
    'Content-Type': 'application/json'
  };

  const currentUser = await (
    await fetch(`${process.env.BACKEND_URL}/web/currentuser`, {
      method: 'GET',
      headers
    })
  ).json();

  return {
    id: currentUser.user_id,
    email: currentUser.email,
    name: currentUser.username,
    email_allowed: currentUser.email_allowed,
    eula_accepted: currentUser.eula_accepted,
    verified: currentUser.verified,
    date_joined: currentUser.date_joined
  };
}

const authOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      CredentialsProvider({
        id: 'default',
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email', placeholder: 'Email' },
          password: {
            label: 'password',
            type: 'password'
          },
          formType: { type: 'string' }
        },
        authorize: async (credentials) => {
          const headers: HeadersInit = new Headers();

          headers.set('Content-Type', 'application/json');
          headers.set('auth_token', `${process.env.AUTH_TOKEN}`);

          const sessionId = getCookie('refresh_token', { req, res });

          const currentUser = await getCurrentUser(sessionId);
          return currentUser;
        }
      })
    ],

    callbacks: {
      jwt: async ({ token, user, account }) => {
        if (user) {
          token.user = user;
        }

        return token;
      },
      async session({ session, token }) {
        session.user = token?.user;

        return session;
      }
    },
    events: {
      signOut: () => {
        res.setHeader('Set-Cookie', [
          `refresh_token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
          `access_token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        ]);
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
      maxAge: 15 * 24 * 60 * 60,
      updateAge: 3 * 60 * 60
    }
  } as AuthOptions;
};

const handler = (req, res) => {
  return NextAuth(req, res, authOptions(req, res));
};

export default handler;
