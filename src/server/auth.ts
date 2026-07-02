import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "./client/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) token.accessToken = account.access_token;
      if (user) {
        token.id = user.id;
        (token as any).LEETCODE_SESSION = (user as any).LEETCODE_SESSION;
        (token as any).LEETCODE_CSRF = (user as any).LEETCODE_CSRF;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).id ?? "";
        (session.user as any).LEETCODE_SESSION =
          (token as any).LEETCODE_SESSION ?? "";
        (session.user as any).LEETCODE_CSRF =
          (token as any).LEETCODE_CSRF ?? "";
      }
      return session;
    },
  },
});
