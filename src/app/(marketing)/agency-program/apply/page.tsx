import { Container, Wrapper } from "@/components";
import { AgencyProgramApplyForm } from "@/components/agency-program/apply-form";

export default function AgencyProgramApplyPage() {
  return (
    <Wrapper className="py-20 md:py-24 min-h-screen">
      <Container className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-4xl">
            Apply to the Creator Agency Program
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Tell us about your brand and what you want to build. If accepted, you’ll complete tasks
            and unlock benefits after graduation.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
          <AgencyProgramApplyForm />
        </div>
      </Container>
    </Wrapper>
  );
}

