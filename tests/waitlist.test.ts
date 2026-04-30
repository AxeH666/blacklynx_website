import test from "node:test";
import assert from "node:assert/strict";
import { buildWaitlistPayload, isValidEmail, normalizeEmail } from "../lib/waitlist";

test("normalizeEmail trims and lowercases input", (): void => {
  const normalized = normalizeEmail("  User.Name+Tag@Example.COM ");
  assert.equal(normalized, "user.name+tag@example.com");
});

test("isValidEmail accepts valid emails and rejects invalid ones", (): void => {
  assert.equal(isValidEmail("team@blacklynx.dev"), true);
  assert.equal(isValidEmail("not-an-email"), false);
});

test("buildWaitlistPayload returns normalized payload", (): void => {
  const payload = buildWaitlistPayload("  Team@BlackLynx.dev ");
  assert.equal(payload.email, "team@blacklynx.dev");
  assert.equal(typeof payload.timestamp, "string");
  assert.ok(payload.timestamp.length > 0);
});

test("buildWaitlistPayload throws for invalid email", (): void => {
  assert.throws(
    (): void => {
      buildWaitlistPayload("bad-email");
    },
    {
      message: "Invalid email address."
    }
  );
});
