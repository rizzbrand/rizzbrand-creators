import { Container, Wrapper } from "@/components";
import { AgencyProgramDashboard } from "@/components/agency-program/program-dashboard";
import { getMyAgencyProgram } from "@/lib/actions/agency-program";

export default async function AgencyProgramAppPage() {
  const program = await getMyAgencyProgram();

  return (
    <Wrapper className="min-h-screen py-8 md:py-12">
      <Container className="mx-auto max-w-5xl">
        <div className="mb-8 md:mb-12">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-4xl">
            Agency Program
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Track your application, complete tasks, and unlock benefits after graduation.
          </p>
        </div>

        <AgencyProgramDashboard initial={program} />
      </Container>
    </Wrapper>
  );
}

