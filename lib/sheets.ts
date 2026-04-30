export type WaitlistResponse = {
  ok: boolean;
};

export async function submitWaitlistEmail(payload: {
  email: string;
  timestamp: string;
}): Promise<WaitlistResponse> {
  const appsScriptUrl = process.env.WAITLIST_GOOGLE_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    throw new Error("WAITLIST_GOOGLE_APPS_SCRIPT_URL is not configured.");
  }

  const response = await fetch(appsScriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Waitlist submission failed.");
  }

  return { ok: true };
}
