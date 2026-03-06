 "use client";

import { Background, Container, Navbar, Wrapper } from "@/components";
import { SectionBadge } from "@/components/ui/section-bade";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Tell us who we’re talking to."),
  email: z.string().email("Add a valid email so we can reply."),
  brand: z.string().optional(),
  website: z.string().optional(),
  services: z.string().min(2, "Share what you’d like help with."),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  details: z.string().min(10, "Give us a bit more context."),
});

type FormValues = z.infer<typeof formSchema>;

const WorkWithUsPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      brand: "",
      website: "",
      services: "",
      budget: "",
      timeline: "",
      details: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch("/api/work-with-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      toast.success("Thanks — we’ve received your request.");
      form.reset();
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Background>
      <Navbar />
      <Wrapper className="py-32">
        <Container className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <SectionBadge title="Work with our studio" />
              <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-heading font-semibold !leading-snug">
                Tell us about your brand, product, or idea
              </h1>
              <p className="mt-4 text-base md:text-lg text-accent-foreground/75 max-w-2xl mx-auto">
                Share a bit about where you are now, what you&apos;re building, and how you think we can help. We&apos;ll
                review and get back to you with next steps.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-border/60 bg-background/60 p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your name</FormLabel>
                          <FormControl>
                            <Input placeholder="Alex Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@brand.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand / creator name</FormLabel>
                          <FormControl>
                            <Input placeholder="Brand or creator handle" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website / main link</FormLabel>
                          <FormControl>
                            <Input placeholder="https://…" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What are you interested in?</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            placeholder="Web & app development, AI automation, product development & design, software/AI, or something else…"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rough budget (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="$10k–$50k, monthly retainer, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeline (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="ASAP, next 3 months, specific date…" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anything else we should know?</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Share context, goals, links to examples, or current challenges."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <p className="text-xs md:text-sm text-muted-foreground">
                      We typically reply within 1–2 business days with next steps and potential fit.
                    </p>
                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Sending..." : "Submit request"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </Container>
      </Wrapper>
    </Background>
  );
};

export default WorkWithUsPage;

