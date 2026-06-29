"use client";

import { type FormEvent, useState } from "react";

type FormState = {
  name: string;
  company: string;
  email: string;
  role: string;
  stack: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  role: "Engineer",
  stack: "Django"
};

export default function WaitlistPage(): React.JSX.Element {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>(initialState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-space-4 py-space-24">
        <div className="w-full max-w-xl border border-raised bg-surface p-space-12 text-center">
          <h1 className="font-display text-3xl font-semibold text-text">
            Request Early Access
          </h1>
          <p className="mt-space-4 text-text opacity-70">
            You&apos;re on the list. We&apos;ll reach out within 48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-space-4 py-space-24">
      <div className="w-full max-w-xl border border-raised bg-surface p-space-8">
        <h1 className="font-display text-3xl font-semibold text-text">
          Request Early Access
        </h1>
        <p className="mt-space-3 text-text opacity-70">
          We&apos;re onboarding Indian engineering teams first.
        </p>
        <form className="mt-space-8 space-y-space-4" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full border border-raised bg-canvas px-space-3 py-space-2 text-sm text-text outline-none"
          />
          <input
            required
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(event) =>
              setForm({ ...form, company: event.target.value })
            }
            className="w-full border border-raised bg-canvas px-space-3 py-space-2 text-sm text-text outline-none"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full border border-raised bg-canvas px-space-3 py-space-2 text-sm text-text outline-none"
          />
          <select
            value={form.role}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
            className="w-full border border-raised bg-canvas px-space-3 py-space-2 text-sm text-text outline-none"
          >
            <option>Engineer</option>
            <option>Lead</option>
            <option>CTO</option>
            <option>Founder</option>
          </select>
          <select
            value={form.stack}
            onChange={(event) =>
              setForm({ ...form, stack: event.target.value })
            }
            className="w-full border border-raised bg-canvas px-space-3 py-space-2 text-sm text-text outline-none"
          >
            <option>Django</option>
            <option>FastAPI</option>
            <option>Other</option>
          </select>
          <button
            type="submit"
            className="w-full rounded-md bg-accent px-space-4 py-space-2 font-display text-sm text-accent-fg"
          >
            Request Early Access
          </button>
        </form>
      </div>
    </div>
  );
}
