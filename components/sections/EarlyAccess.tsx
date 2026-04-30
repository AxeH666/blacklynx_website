"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";

type Status = "idle" | "success" | "error";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const subject = encodeURIComponent("Early Access Request");
      const body = encodeURIComponent(`Please add this email to early access:\n\n${email}`);
      window.location.href = `mailto:mohi@blacklynx.dev?subject=${subject}&body=${body}`;

      setStatus("success");
      setEmail("");
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Email us at mohi@blacklynx.dev"
      );
      setStatus("error");
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="early-access" className="section-shell">
      <div className="mx-auto max-w-[640px] border border-blacklynx-border bg-blacklynx-surface p-8 md:p-12">
        <h2 className="heading-tight text-[40px] text-blacklynx-text md:text-5xl">
          Get early access.
        </h2>
        <p className="mt-5 text-base leading-7 text-blacklynx-muted">
          We&apos;re onboarding the first 10 engineering teams in May 2026. Full setup support included. No commitment required.
        </p>
        <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="work@email.com"
            className="h-12 min-w-0 flex-1 border border-blacklynx-border bg-blacklynx-bg px-4 text-sm text-blacklynx-text outline-none transition-colors placeholder:text-blacklynx-muted focus:border-blacklynx-accent"
          />
          <Button type="submit" disabled={pending} className="sm:min-w-[180px]">
            {pending ? "Submitting" : "Request Access"}
          </Button>
        </form>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-5 text-sm text-blacklynx-accent"
            >
              You&apos;re in. We&apos;ll reach out within 48 hours.
            </motion.p>
          ) : null}
          {status === "error" ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-5 text-sm text-blacklynx-muted"
            >
              {errorMessage || "Something went wrong. Email us at mohi@blacklynx.dev"}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
