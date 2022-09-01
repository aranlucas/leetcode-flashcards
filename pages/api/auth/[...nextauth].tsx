import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "../../../lib/mongodb";

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

export default NextAuth({
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
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
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account?.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token?.accessToken;

      return session;
    },
  },
});
