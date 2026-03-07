import { Container, Wrapper } from "@/components";

export default function EmailPage() {
  return (
    <Wrapper className="min-h-screen py-8 md:py-12">
      <Container className="mx-auto max-w-3xl">
        <h1 className="font-heading text-2xl font-semibold md:text-3xl">
          Email
        </h1>
        <p className="mt-2 text-muted-foreground">
          Grow and engage your list. Coming soon.
        </p>
        <div className="mt-12 rounded-xl border border-dashed border-border bg-muted/20 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            This tool is under development. Check back soon.
          </p>
        </div>
      </Container>
    </Wrapper>
  );
}
