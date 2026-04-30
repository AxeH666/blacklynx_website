export type WaitlistPayload = {
  email: string;
  timestamp: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(normalizeEmail(email));
}

export function buildWaitlistPayload(email: string): WaitlistPayload {
  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmail(normalizedEmail)) {
    throw new Error("Invalid email address.");
  }

  return {
    email: normalizedEmail,
    timestamp: new Date().toISOString()
  };
}
