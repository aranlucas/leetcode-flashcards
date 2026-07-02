import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      LEETCODE_SESSION: string;
      LEETCODE_CSRF: string;
    } & DefaultSession["user"];
  }

  interface User {
    LEETCODE_SESSION?: string;
    LEETCODE_CSRF?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    LEETCODE_SESSION: string;
    LEETCODE_CSRF: string;
  }
}
