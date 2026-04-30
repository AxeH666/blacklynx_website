import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  email: string;
  name?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

function getSmtpConfig(): {
  host: string;
  port: number;
  user: string;
  pass: string;
} {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !portRaw || !user || !pass) {
    throw new Error("SMTP is not configured");
  }

  const port = Number(portRaw);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("Invalid SMTP_PORT");
  }

  return { host, port, user, pass };
}

function parsePayload(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request payload");
  }

  const maybePayload = body as Record<string, unknown>;
  const emailRaw = maybePayload.email;
  const nameRaw = maybePayload.name;

  if (typeof emailRaw !== "string") {
    throw new Error("Email is required");
  }

  const email = emailRaw.trim();
  if (!email) {
    throw new Error("Email is required");
  }

  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (nameRaw !== undefined && typeof nameRaw !== "string") {
    throw new Error("Invalid name");
  }

  const name = typeof nameRaw === "string" ? nameRaw.trim() : undefined;
  return { email, name };
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as unknown;
    const payload = parsePayload(body);
    const smtp = getSmtpConfig();

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: {
        user: smtp.user,
        pass: smtp.pass
      }
    });

    const fromAddress = smtp.user;
    const subject = "New Early Access Submission";
    const text = [
      "New contact submission received.",
      "",
      `Email: ${payload.email}`,
      `Name: ${payload.name || "Not provided"}`
    ].join("\n");

    await transporter.sendMail({
      from: fromAddress,
      to: "mohi@blacklynx.dev",
      subject,
      text
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send message";
    console.error("Contact API error:", message);

    if (message.toLowerCase().includes("auth")) {
      return NextResponse.json(
        { error: "Email delivery is temporarily unavailable. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
