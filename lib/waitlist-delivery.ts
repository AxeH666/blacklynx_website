import nodemailer from "nodemailer";
import { submitWaitlistEmail } from "@/lib/sheets";
import { WaitlistPayload } from "@/lib/waitlist";

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
};

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !portRaw || !user || !pass) {
    return null;
  }

  const port = Number(portRaw);
  if (!Number.isInteger(port) || port <= 0) {
    return null;
  }

  return { host, port, user, pass };
}

async function deliverViaSmtp(payload: WaitlistPayload): Promise<void> {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error("SMTP configuration is incomplete.");
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });

  const toAddress = process.env.WAITLIST_TO_EMAIL || config.user;
  const fromAddress = process.env.WAITLIST_FROM_EMAIL || config.user;

  await transporter.sendMail({
    from: fromAddress,
    to: toAddress,
    subject: "New waitlist request",
    text: `New waitlist submission:\n\nEmail: ${payload.email}\nTimestamp: ${payload.timestamp}`
  });
}

export async function deliverWaitlist(payload: WaitlistPayload): Promise<void> {
  if (process.env.WAITLIST_GOOGLE_APPS_SCRIPT_URL) {
    await submitWaitlistEmail(payload);
    return;
  }

  await deliverViaSmtp(payload);
}
