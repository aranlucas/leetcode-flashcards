import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../../../server/client/db";

if (process.env.GITHUB_ID == null) {
  throw new Error(
    "Please define the GITHUB_ID environment variable inside .env.local"
  );
}

if (process.env.GITHUB_SECRET == null) {
  throw new Error(
    "Please define the GITHUB_SECRET environment variable inside .env.local"
  );
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
        // @ts-expect-error
        token.LEETCODE_SESSION = user.LEETCODE_SESSION;
        // @ts-expect-error
        token.LEETCODE_CSRF = user.LEETCODE_CSRF;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error
        session.user.id = token.id ?? "";
        // @ts-expect-error
        session.user.LEETCODE_SESSION = token.LEETCODE_SESSION ?? "";
        // @ts-expect-error
        session.user.LEETCODE_CSRF = token.LEETCODE_CSRF ?? "";
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
