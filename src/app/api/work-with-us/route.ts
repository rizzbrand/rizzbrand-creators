import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 },
      );
    }

    const body = await req.json();

    const {
      name,
      email,
      brand,
      website,
      services,
      budget,
      timeline,
      details,
    } = body as {
      name?: string;
      email?: string;
      brand?: string;
      website?: string;
      services?: string;
      budget?: string;
      timeline?: string;
      details?: string;
    };

    if (!name || !email || !services || !details) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const internalTo = process.env.WORK_WITH_US_TO_EMAIL || process.env.NEXT_PUBLIC_APP_DOMAIN || "";
    if (!internalTo) {
      return NextResponse.json(
        { error: "Destination email not configured." },
        { status: 500 },
      );
    }

    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "studio@your-domain.com";

    const internalText = [
      `New studio request from ${name}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      brand ? `Brand: ${brand}` : null,
      website ? `Website: ${website}` : null,
      services ? `Services: ${services}` : null,
      budget ? `Budget: ${budget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      "",
      "Details:",
      details,
    ]
      .filter(Boolean)
      .join("\n");

    await resend.emails.send({
      from: `Rizzbrand Studio <${fromAddress}>`,
      to: [internalTo],
      replyTo: email,
      subject: `New studio inquiry from ${name}`,
      text: internalText,
    });

    const confirmationText = [
      `Hey ${name},`,
      "",
      "Thanks for reaching out to Rizzbrand Studio. We just received your message and will review it shortly.",
      "",
      "Here’s a quick summary of what you shared:",
      services ? `What you're interested in: ${services}` : null,
      budget ? `Budget: ${budget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      "",
      "We’ll typically get back to you within 1–2 business days with next steps and potential fit.",
      "",
      "Talk soon,",
      "Rizzbrand Studio",
    ]
      .filter(Boolean)
      .join("\n");

    await resend.emails.send({
      from: `Rizzbrand Studio <${fromAddress}>`,
      to: [email],
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

