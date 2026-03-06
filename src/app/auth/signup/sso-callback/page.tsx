import { redirect } from "next/navigation";

// SSO callback — Clerk removed. Sign in / sign up commented out.
// Previously: <AuthenticateWithRedirectCallback /> from @clerk/nextjs
export default function SSOCallback() {
    redirect("/app");
}
