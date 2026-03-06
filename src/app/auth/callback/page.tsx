import { redirect } from "next/navigation";

// Auth callback — Clerk removed. Sign in / sign up commented out.
// Previously: synced Clerk user to DB then redirected to /app.
const AuthCallbackPage = async () => {
    redirect("/app");
};

export default AuthCallbackPage;
