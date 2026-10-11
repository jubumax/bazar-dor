import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  emailAndPassword: { enabled: true, autoSignIn: false },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET as string,
    },
  },
  database: mongodbAdapter(db, { client }),
  trustedOrigins: [
  process.env.BETTER_AUTH_URL as string,
  "http://localhost:3000",
  "https://bazar-dor-uit6.vercel.app",
  "https://*.vercel.app",
],
  plugins: [nextCookies()],
});