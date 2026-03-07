import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/signin?callbackURL=/app");
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardNavbar />
      <main className="pt-16 lg:pl-64">{children}</main>
    </div>
  );
}
