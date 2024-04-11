'use server';
import { user } from '@/data/urls';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCookie } from 'cookies-next';
import { signOut } from 'next-auth/react';
import { UpgradedUserType } from '@/types';

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
                .split('refresh_token=')[1] || '';
          }

          const currentUser = await getCurrentUser(sessionId);
          const currentUserUpgraded = {
            ...currentUser,
            refreshToken: sessionId
          };
          return currentUserUpgraded;
        }
      })
    ],
    events: {
      signOut: () => {
        res.setHeader('Set-Cookie', [
          `refresh_token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
          `access_token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        ]);
      }
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        const refresh_token = getCookie('refresh_token', { req, res });

        token.refreshToken = refresh_token;
        if (user) {
          token.user = user;
        }

        const tokenUser = token.user as UpgradedUserType;
        if (token?.refreshToken !== tokenUser.refreshToken) {
          token.exp = token.iat;
        }
        console.log(token);

        return token;
      },
      async session({ session, token }) {
        const tokenUser = token.user as UpgradedUserType;

        if (tokenUser?.refreshToken !== token?.refreshToken) {
          token.exp = token.iat;
        }
        session.user = token?.user;

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

export default handler;
