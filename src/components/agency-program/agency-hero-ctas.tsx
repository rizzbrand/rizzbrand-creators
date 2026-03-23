"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function AgencyHeroCtas() {
  const { data: session } = authClient.useSession();
  const searchParams = useSearchParams();
  const enrolledParam = searchParams.get("enrolled") === "1";

  const isLoggedIn = !!session?.user;

  // Logged in: always show View progress (dashboard handles missing applications).
  if (isLoggedIn) {
    return (
      <Button asChild>
        <Link href="/app/agency-program">View progress</Link>
      </Button>
    );
  }

  // Not logged in, not yet enrolled: only Enroll now.
  if (!enrolledParam) {
    return (
      <Button asChild>
        <Link href="/agency-program/apply">Enroll now</Link>
      </Button>
    );
  }

  // Not logged in, just enrolled: View progress + Create account to go to dashboard.
  return (
    <>
      <Button asChild>
        <Link href="/agency-program/apply">View progress</Link>
      </Button>
      <Button
        asChild
        variant="outline"
      >
        <Link href="/auth/signup?callbackURL=/app/agency-program">
          Create account to view dashboard
        </Link>
      </Button>
    </>
  );
}

