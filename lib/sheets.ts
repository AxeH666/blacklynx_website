export type WaitlistPayload = {
  email: string;
};

export type WaitlistResponse = {
  ok: boolean;
};

const GOOGLE_APPS_SCRIPT_URL = "";

export async function submitWaitlistEmail({
  email
}: WaitlistPayload): Promise<WaitlistResponse> {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    throw new Error("Google Apps Script URL is not configured.");
  }

  // TODO: Replace GOOGLE_APPS_SCRIPT_URL with actual deployed script URL
  const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      email
    })
  });

  if (!response.ok) {
    throw new Error("Waitlist submission failed.");
  }

  return { ok: true };
}
