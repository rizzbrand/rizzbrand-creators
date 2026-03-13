"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getMyAgencyProgram,
  submitAgencyTask,
} from "@/lib/actions/agency-program";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type Program = Awaited<ReturnType<typeof getMyAgencyProgram>>;

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

export function AgencyProgramDashboard({ initial }: { initial: Program }) {
  const [program, setProgram] = useState<Program>(initial);
  const [loading, setLoading] = useState(!initial);
  const [pendingAssignmentId, setPendingAssignmentId] = useState<string | null>(
    null
  );
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const entitlements = useMemo(() => program?.entitlements ?? [], [program]);

  async function refresh() {
    setLoading(true);
    try {
      const next = await getMyAgencyProgram();
      setProgram(next);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!initial) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  if (!program) {
    return (
      <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
        <h2 className="text-lg font-medium">No application found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Apply first using the same email as your account. Then come back here to
          track your progress.
        </p>
        <div className="mt-4">
          <Button asChild>
            <a href="/agency-program/apply">Apply now</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-medium">Your application</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Status:{" "}
              <span className="text-foreground font-medium">
                {statusLabel(program.status)}
              </span>
            </p>
          </div>
          <Button variant="outline" onClick={refresh}>
            Refresh
          </Button>
        </div>

        {program.status === "accepted" && program.taskAssignments.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            You’re accepted. Tasks are being prepared—check back shortly.
          </p>
        )}

        {program.status === "rejected" && (
          <p className="mt-4 text-sm text-muted-foreground">
            Not a fit right now. You can re-apply later with updated info.
          </p>
        )}
      </section>

      {program.status === "completed" && entitlements.length > 0 && (
        <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
          <h2 className="text-lg font-medium">Unlocked benefits</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {entitlements.map((e) => {
              let label = e.type;
              try {
                const parsed = e.metadata ? (JSON.parse(e.metadata) as { label?: string }) : null;
                if (parsed?.label) label = parsed.label;
              } catch {
                // ignore
              }
              return (
                <li key={e.id} className="rounded-xl border border-border bg-background/40 p-4">
                  <p className="text-foreground font-medium">{label}</p>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {program.taskAssignments.length > 0 && (
        <section className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
          <h2 className="text-lg font-medium">Tasks</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Submit your work for review. Once required tasks are approved, you graduate and
            benefits unlock.
          </p>

          <div className="mt-6 space-y-4">
            {program.taskAssignments.map((a) => {
              const latest = a.submissions?.[0];
              const draft = drafts[a.id] ?? "";
              return (
                <div
                  key={a.id}
                  className="rounded-2xl border border-border bg-background/40 p-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-foreground font-medium">{a.template.title}</p>
                      {a.template.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {a.template.description}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-muted-foreground">
                        Status:{" "}
                        <span className="text-foreground font-medium">
                          {statusLabel(a.status)}
                        </span>
                      </p>
                      {latest?.reviewerNotes && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          <span className="text-foreground font-medium">Feedback:</span>{" "}
                          {latest.reviewerNotes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div>
                      <Label htmlFor={`submission-${a.id}`}>
                        Submission (link or explanation)
                      </Label>
                      <Textarea
                        id={`submission-${a.id}`}
                        value={draft}
                        onChange={(e) =>
                          setDrafts((d) => ({ ...d, [a.id]: e.target.value }))
                        }
                        rows={3}
                        className="mt-1"
                        placeholder="Paste a link or describe what you shipped…"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={async () => {
                          setPendingAssignmentId(a.id);
                          try {
                            const trimmed = draft.trim();
                            const looksLikeUrl =
                              /^https?:\/\/\S+$/i.test(trimmed);
                            await submitAgencyTask(a.id, {
                              type: looksLikeUrl ? "link" : "text",
                              content: trimmed,
                            });
                            toast.success("Submitted for review");
                            setDrafts((d) => ({ ...d, [a.id]: "" }));
                            await refresh();
                          } catch (err) {
                            toast.error(
                              err instanceof Error ? err.message : "Failed to submit"
                            );
                          } finally {
                            setPendingAssignmentId(null);
                          }
                        }}
                        disabled={pendingAssignmentId === a.id || draft.trim().length < 3}
                      >
                        {pendingAssignmentId === a.id ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

