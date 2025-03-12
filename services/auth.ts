import NextAuth, { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { UserTable, accountsTable } from '@/db/schema';
import { loginSchema } from '@/features/auth/schema/auth-zod.schemas';
import { getUserByEmail } from '@/features/users/db/users.db';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, { usersTable: UserTable, accountsTable }),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/sign-in',
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);
          const user = await getUserByEmail(email);
          if (user == null || !user.password) return null;
          const pwHash = await bcrypt.compare(password, user.password);
          if (pwHash) return user;
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isAdmin = auth?.user?.role === 'admin';
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isAuthRoute = nextUrl.pathname.startsWith('/auth');

      if (isOnDashboard) {
        if (isAdmin) {
          return true;
        }
        return false;
      }

      if (isAuthRoute) {
        if (!isLoggedIn) {
          return true;
        }
        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
    redirect: ({ url, baseUrl }) => {
      const searchParams = url.split('?').pop();
      const callbackUrl = new URLSearchParams(searchParams).get('callbackUrl');
      if (callbackUrl != null) return callbackUrl;
      if (url.endsWith('auth/login')) return baseUrl;
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    jwt: ({ token, user }) => {
      if (user && user.id) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id || '';
      session.user.role = token.role;
      return session;
    },
  },
});
