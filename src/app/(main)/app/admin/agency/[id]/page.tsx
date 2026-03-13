import { Container, Wrapper } from "@/components";
import {
  adminGetAgencyApplication,
  adminReviewSubmission,
  adminUpdateAgencyStatus,
  isAdmin,
} from "@/lib/actions/agency-program";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

export default async function AdminAgencyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ok = await isAdmin();
  if (!ok) redirect("/app");

  const { id } = await params;
  const app = await adminGetAgencyApplication(id);
  if (!app) redirect("/app/admin/agency");
  const appId = app.id;

  async function setStatus(formData: FormData) {
    "use server";
    const next = String(formData.get("status") ?? "");
    if (
      next !== "applied" &&
      next !== "in_review" &&
      next !== "accepted" &&
      next !== "rejected"
    ) {
      return;
    }
    await adminUpdateAgencyStatus(appId, next);
  }

  async function reviewSubmission(formData: FormData) {
    "use server";
    const submissionId = String(formData.get("submissionId") ?? "");
    const decision = String(formData.get("decision") ?? "");
    const notes = String(formData.get("notes") ?? "");
    if (!submissionId) return;
    if (decision !== "approved" && decision !== "needs_changes") return;
    await adminReviewSubmission(submissionId, decision, notes);
  }

  return (
    <Wrapper className="min-h-screen py-8 md:py-12">
      <Container className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-4xl">
            {app.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {app.email} • Status:{" "}
            <span className="text-foreground font-medium">
              {statusLabel(app.status)}
            </span>
          </p>
        </div>

        <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
          <h2 className="text-lg font-medium">Review</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <form action={setStatus} className="flex flex-wrap gap-2">
              <Button name="status" value="applied" variant="outline">
                Set Applied
              </Button>
              <Button name="status" value="in_review" variant="outline">
                Set In Review
              </Button>
              <Button name="status" value="accepted">
                Accept (create tasks)
              </Button>
              <Button name="status" value="rejected" variant="destructive">
                Reject
              </Button>
            </form>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-card/50 p-6 md:p-8">
          <h2 className="text-lg font-medium">Tasks + submissions</h2>
          <div className="mt-6 space-y-4">
            {app.taskAssignments.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-border bg-background/40 p-5"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-foreground">{a.template.title}</p>
                  {a.template.description && (
                    <p className="text-sm text-muted-foreground">
                      {a.template.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Status:{" "}
                    <span className="text-foreground font-medium">
                      {statusLabel(a.status)}
                    </span>
                  </p>
                </div>

                {a.submissions.length === 0 ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No submissions yet.
                  </p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {a.submissions.map((s) => (
                      <div
                        key={s.id}
                        className="rounded-xl border border-border bg-card/40 p-4"
                      >
                        <p className="text-xs text-muted-foreground">
                          Submission • {new Date(s.createdAt).toLocaleString()} •{" "}
                          <span className="text-foreground font-medium">
                            {statusLabel(s.status)}
                          </span>
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
                          {s.content}
                        </p>

                        <form action={reviewSubmission} className="mt-4 space-y-3">
                          <input type="hidden" name="submissionId" value={s.id} />
                          <Textarea
                            name="notes"
                            rows={2}
                            placeholder="Feedback / changes requested (optional)"
                            className="text-sm"
                            defaultValue={s.reviewerNotes ?? ""}
                          />
                          <div className="flex flex-wrap justify-end gap-2">
                            <Button
                              type="submit"
                              name="decision"
                              value="needs_changes"
                              variant="outline"
                            >
                              Needs changes
                            </Button>
                            <Button type="submit" name="decision" value="approved">
                              Approve
                            </Button>
                          </div>
                        </form>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {app.taskAssignments.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No tasks yet. Accept the application to generate tasks.
              </p>
            )}
          </div>
        </section>
      </Container>
    </Wrapper>
  );
}

