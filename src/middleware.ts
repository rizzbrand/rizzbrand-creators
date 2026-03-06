import { NextResponse } from "next/server";

// Auth removed (Clerk commented out). Sign in / sign up coming soon.
// Previously: protected /app(.*), redirected to /auth/signin when unauthenticated.
export default function middleware() {
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
