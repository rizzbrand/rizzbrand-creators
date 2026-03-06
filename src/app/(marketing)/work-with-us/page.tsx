"use client";

import { Background, Container, Navbar, Wrapper } from "@/components";
import { SectionBadge } from "@/components/ui/section-bade";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

const applicantTypeOptions = [
  {
    value: "creator",
    label: "Creator",
    description: "I'm a creator looking to build or scale my brand",
  },
  {
    value: "agency_brand",
    label: "Agency / Brand",
    description: "We're an agency or brand looking for your services",
  },
] as const;

const creatorSchema = z.object({
  applicantType: z.literal("creator"),
  name: z.string().min(2, "Tell us who we're talking to."),
  email: z.string().email("Add a valid email so we can reply."),
  channelName: z.string().min(2, "Share your creator or channel name."),
  platform: z.string().optional(),
  website: z.string().optional(),
  whatToBuild: z.string().min(10, "Tell us what you want to build or scale."),
  audienceSize: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  details: z.string().optional(),
});

const agencyBrandSchema = z.object({
  applicantType: z.literal("agency_brand"),
  name: z.string().min(2, "Tell us who we're talking to."),
  email: z.string().email("Add a valid email so we can reply."),
  companyName: z.string().min(2, "Share your company or agency name."),
  website: z.string().optional(),
  servicesNeeded: z.string().min(10, "Describe the services or project you need."),
  projectScope: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  details: z.string().optional(),
});

const formSchema = z.discriminatedUnion("applicantType", [
  creatorSchema,
  agencyBrandSchema,
]);

type FormValues = z.infer<typeof formSchema>;

const getDefaultValues = (applicantType?: FormValues["applicantType"]): Partial<FormValues> => ({
  applicantType,
  name: "",
  email: "",
  ...(applicantType === "creator"
    ? {
        channelName: "",
        platform: "",
        website: "",
        whatToBuild: "",
        audienceSize: "",
        budget: "",
        timeline: "",
        details: "",
      }
    : applicantType === "agency_brand"
      ? {
          companyName: "",
          website: "",
          servicesNeeded: "",
          projectScope: "",
          budget: "",
          timeline: "",
          details: "",
        }
      : {}),
});

const WorkWithUsPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  const applicantType = form.watch("applicantType");

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch("/api/work-with-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      toast.success("Thanks — we've received your request.");
      form.reset(getDefaultValues());
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
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
                Tell us about yourself
              </h1>
              <p className="mt-4 text-base md:text-lg text-accent-foreground/75 max-w-2xl mx-auto">
                Choose your role, then fill out the form that fits you. We&apos;ll review and get
                back to you with next steps.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-border/60 bg-background/60 p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="applicantType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I am a</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {applicantTypeOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  field.onChange(opt.value);
                                  form.reset(getDefaultValues(opt.value));
                                }}
                                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-colors ${
                                  field.value === opt.value
                                    ? "border-primary bg-primary/10"
                                    : "border-border/60 bg-background hover:border-muted-foreground/30"
                                }`}
                              >
                                <span className="font-semibold">{opt.label}</span>
                                <span className="text-sm text-muted-foreground">
                                  {opt.description}
                                </span>
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!applicantType ? null : (
                    <>
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
                                <Input type="email" placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {applicantType === "creator" && (
                        <>
                          <FormField
                            control={form.control}
                            name="channelName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Creator / channel name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your handle or brand name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="platform"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Main platform (optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g. Instagram, YouTube, TikTok"
                                      {...field}
                                    />
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
                                  <FormLabel>Website or link (optional)</FormLabel>
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
                            name="whatToBuild"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>What do you want to build or scale?</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={3}
                                    placeholder="Product line, digital product, app, community, e‑commerce, content strategy…"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="audienceSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Audience size (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 50K followers, 10K email list" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      {applicantType === "agency_brand" && (
                        <>
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company / agency name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your company or agency name" {...field} />
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
                                <FormLabel>Website (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://…" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="servicesNeeded"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>What services or project do you need?</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={3}
                                    placeholder="Web & app development, AI automation, product design, full project, ongoing retainer…"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="projectScope"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project scope or deliverables (optional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={2}
                                    placeholder="High-level scope, key deliverables, or goals."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rough budget (optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="$10k–$50k, monthly retainer, etc."
                                  {...field}
                                />
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
                                <Input
                                  placeholder="ASAP, next 3 months, specific date…"
                                  {...field}
                                />
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
                            <FormLabel>Anything else we should know? (optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={3}
                                placeholder="Context, goals, links, or current challenges."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between gap-4 pt-2">
                        <p className="text-xs md:text-sm text-muted-foreground">
                          We typically reply within 1–2 business days with next steps and potential
                          fit.
                        </p>
                        <Button
                          type="submit"
                          size="lg"
                          disabled={form.formState.isSubmitting}
                        >
                          {form.formState.isSubmitting ? "Sending..." : "Submit request"}
                        </Button>
                      </div>
                    </>
                  )}
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
