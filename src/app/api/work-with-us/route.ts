import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type CreatorPayload = {
  applicantType: "creator";
  name: string;
  email: string;
  channelName?: string;
  platform?: string;
  website?: string;
  whatToBuild?: string;
  audienceSize?: string;
  budget?: string;
  timeline?: string;
  details?: string;
};

type AgencyBrandPayload = {
  applicantType: "agency_brand";
  name: string;
  email: string;
  companyName?: string;
  website?: string;
  servicesNeeded?: string;
  projectScope?: string;
  budget?: string;
  timeline?: string;
  details?: string;
};

function isCreator(body: unknown): body is CreatorPayload {
  return (
    typeof body === "object" &&
    body !== null &&
    "applicantType" in body &&
    (body as { applicantType?: string }).applicantType === "creator"
  );
}

function isAgencyBrand(body: unknown): body is AgencyBrandPayload {
  return (
    typeof body === "object" &&
    body !== null &&
    "applicantType" in body &&
    (body as { applicantType?: string }).applicantType === "agency_brand"
  );
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 },
      );
    }

    const body = await req.json();

    if (!body?.applicantType || !body?.name || !body?.email) {
      return NextResponse.json(
        { error: "Missing required fields: applicantType, name, email." },
        { status: 400 },
      );
    }

    if (isCreator(body)) {
      if (!body.channelName?.trim() || !body.whatToBuild?.trim()) {
        return NextResponse.json(
          { error: "Creators: please provide channel name and what you want to build." },
          { status: 400 },
        );
      }
    } else if (isAgencyBrand(body)) {
      if (!body.companyName?.trim() || !body.servicesNeeded?.trim()) {
        return NextResponse.json(
          { error: "Agency/Brand: please provide company name and services needed." },
          { status: 400 },
        );
      }
    } else {
      return NextResponse.json(
        { error: "applicantType must be 'creator' or 'agency_brand'." },
        { status: 400 },
      );
    }

    const internalTo =
      process.env.WORK_WITH_US_TO_EMAIL || process.env.NEXT_PUBLIC_APP_DOMAIN || "";
    if (!internalTo) {
      return NextResponse.json(
        { error: "Destination email not configured." },
        { status: 500 },
      );
    }

    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "studio@your-domain.com";

    const applicantTypeLabel =
      body.applicantType === "agency_brand" ? "Agency / Brand" : "Creator";

    const internalLines = [
      `New studio request from ${body.name}`,
      "",
      `Type: ${applicantTypeLabel}`,
      `Name: ${body.name}`,
      `Email: ${body.email}`,
    ];

    if (isCreator(body)) {
      internalLines.push(
        "",
        "--- Creator ---",
        `Channel name: ${body.channelName}`,
        body.platform ? `Platform: ${body.platform}` : null,
        body.website ? `Website/link: ${body.website}` : null,
        body.whatToBuild ? `What they want to build: ${body.whatToBuild}` : null,
        body.audienceSize ? `Audience size: ${body.audienceSize}` : null,
      );
    } else if (isAgencyBrand(body)) {
      internalLines.push(
        "",
        "--- Agency / Brand ---",
        `Company: ${body.companyName}`,
        body.website ? `Website: ${body.website}` : null,
        body.servicesNeeded ? `Services needed: ${body.servicesNeeded}` : null,
        body.projectScope ? `Project scope: ${body.projectScope}` : null,
      );
    }

    internalLines.push(
      "",
      body.budget ? `Budget: ${body.budget}` : null,
      body.timeline ? `Timeline: ${body.timeline}` : null,
      body.details ? `\nDetails:\n${body.details}` : null,
    );

    const internalText = internalLines.filter(Boolean).join("\n");

    await resend.emails.send({
      from: `Rizzbrand Studio <${fromAddress}>`,
      to: [internalTo],
      replyTo: body.email,
      subject: `[${applicantTypeLabel}] Studio inquiry from ${body.name}`,
      text: internalText,
    });

    const confirmationLines = [
      `Hey ${body.name},`,
      "",
      "Thanks for reaching out to Rizzbrand Studio. We just received your message and will review it shortly.",
      "",
      "Here's a quick summary of what you shared:",
      `You're reaching out as: ${applicantTypeLabel}`,
    ];

    if (isCreator(body)) {
      confirmationLines.push(
        body.whatToBuild ? `What you want to build: ${body.whatToBuild}` : null,
      );
    } else if (isAgencyBrand(body)) {
      confirmationLines.push(
        body.servicesNeeded ? `Services you need: ${body.servicesNeeded}` : null,
      );
    }

    confirmationLines.push(
      body.budget ? `Budget: ${body.budget}` : null,
      body.timeline ? `Timeline: ${body.timeline}` : null,
      "",
      "We'll typically get back to you within 1–2 business days with next steps and potential fit.",
      "",
      "Talk soon,",
      "Rizzbrand Studio",
    );

    const confirmationText = confirmationLines.filter(Boolean).join("\n");

    await resend.emails.send({
      from: `Rizzbrand Studio <${fromAddress}>`,
      to: [body.email],
      subject: "We received your studio request",
      text: confirmationText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending work-with-us email", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
