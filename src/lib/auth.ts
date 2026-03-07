import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

const globalForAuth = globalThis as unknown as { mongoClient: MongoClient | undefined };
const client = globalForAuth.mongoClient ?? new MongoClient(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalForAuth.mongoClient = client;
const db = client.db();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@rizzbrands.site";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",
  baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_DOMAIN ?? "http://localhost:3000",
  database: mongodbAdapter(db, {
    client,
    transaction: false, // Set true if using MongoDB replica set
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      if (resend) {
        void resend.emails.send({
          from: fromEmail,
          to: user.email,
          subject: "Reset your password",
          html: `<p>Click the link below to reset your password:</p><p><a href="${url}">Reset password</a></p><p>If you didn't request this, you can ignore this email.</p>`,
        });
      } else if (process.env.NODE_ENV === "development") {
        console.log("[Dev] Password reset URL:", url);
      }
    },
  },
  plugins: [nextCookies()],
});
