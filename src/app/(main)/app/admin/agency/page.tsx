import { Container, Wrapper } from "@/components";
import { adminListAgencyApplications, isAdmin } from "@/lib/actions/agency-program";
import Link from "next/link";
import { redirect } from "next/navigation";

function statusLabel(status: string) {
  switch (status) {
    case "applied":
      return "Applied";
    case "in_review":
      return "In review";
    case "accepted":
      return "Accepted";
    case "rejected":
      return "Rejected";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

export default async function AdminAgencyPage() {
  const ok = await isAdmin();
  if (!ok) redirect("/app");

  const apps = await adminListAgencyApplications();

  return (
    <Wrapper className="min-h-screen py-8 md:py-12">
      <Container className="mx-auto max-w-5xl">
        <div className="mb-8 md:mb-12">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-4xl">
            Agency Program Admin
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Review applications, accept creators, and approve task submissions.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50">
          <div className="grid grid-cols-12 gap-3 border-b border-border px-5 py-3 text-xs font-medium text-muted-foreground">
            <div className="col-span-4">Applicant</div>
            <div className="col-span-4">Email</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Updated</div>
          </div>
          <div className="divide-y divide-border">
            {apps.map((a) => (
              <Link
                key={a.id}
                href={`/app/admin/agency/${a.id}`}
                className="grid grid-cols-12 gap-3 px-5 py-4 text-sm hover:bg-background/40 transition-colors"
              >
                <div className="col-span-4 font-medium text-foreground truncate">
                  {a.name}
                </div>
                <div className="col-span-4 text-muted-foreground truncate">
                  {a.email}
                </div>
                <div className="col-span-2 text-muted-foreground">
                  {statusLabel(a.status)}
                </div>
                <div className="col-span-2 text-right text-muted-foreground">
                  {new Date(a.updatedAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
            {apps.length === 0 && (
              <div className="px-5 py-10 text-sm text-muted-foreground">
                No applications yet.
              </div>
            )}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}

