import { user } from '@/data/urls';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function getCurrentUser(sessionId: string) {
  const headers = {
    'Content-Type': 'application/json',
    Cookie: `refresh_token=${sessionId}`
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
    username: currentUser.username,
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

          const apiRequest = await fetch(
            `${process.env.BACKEND_URL}${
              user[credentials?.formType as string]
            }`,
            {
              method: 'POST',
              headers,
              body: JSON.stringify(credentials)
            }
          );

          let sessionId = '';

          const setCookieHeader = apiRequest.headers.get('set-cookie');

          if (setCookieHeader) {
            sessionId =
              setCookieHeader
                .split(`;`)
                ?.find((item) => item.includes('refresh_token'))
                ?.replace('refresh_token=', '') || '';
          }

          const currentUser = await getCurrentUser(sessionId);

          return currentUser;
        }
      })
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          token.user = user;
        }

        return token;
      },
      async session({ session, user, token }) {
        session.user = token.user as Session['user'];
        return session;
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
      maxAge: 2 * 24 * 60 * 60,
      updateAge: 3 * 60 * 60
    }
  } as AuthOptions;
};

const handler = (req, res) => {
  return NextAuth(req, res, authOptions(req, res));
};

export { handler as GET, handler as POST, authOptions };
