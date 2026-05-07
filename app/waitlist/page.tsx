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

export default function WaitlistPage(): JSX.Element {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>(initialState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-4 text-[#F0F0F0]">
        <div className="w-full max-w-xl border border-[#1A1A1A] p-10 text-center">
          <h1 className="text-3xl font-bold">Request Early Access</h1>
          <p className="mt-4 text-[#B3B3B3]">
            You&apos;re on the list. We&apos;ll reach out within 48 hours.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-4 text-[#F0F0F0]">
      <div className="w-full max-w-xl border border-[#1A1A1A] p-8">
        <h1 className="text-3xl font-bold">Request Early Access</h1>
        <p className="mt-3 text-[#A8A8A8]">We&apos;re onboarding Indian engineering teams first.</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full border border-[#2A2A2A] bg-[#0c0c0c] px-3 py-2 text-sm outline-none"
          />
          <input
            required
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(event) => setForm({ ...form, company: event.target.value })}
            className="w-full border border-[#2A2A2A] bg-[#0c0c0c] px-3 py-2 text-sm outline-none"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full border border-[#2A2A2A] bg-[#0c0c0c] px-3 py-2 text-sm outline-none"
          />
          <select
            value={form.role}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
            className="w-full border border-[#2A2A2A] bg-[#0c0c0c] px-3 py-2 text-sm outline-none"
          >
            <option>Engineer</option>
            <option>Lead</option>
            <option>CTO</option>
            <option>Founder</option>
          </select>
          <select
            value={form.stack}
            onChange={(event) => setForm({ ...form, stack: event.target.value })}
            className="w-full border border-[#2A2A2A] bg-[#0c0c0c] px-3 py-2 text-sm outline-none"
          >
            <option>Django</option>
            <option>FastAPI</option>
            <option>Other</option>
          </select>
          <button
            type="submit"
            className="w-full rounded-full bg-[#C8102E] px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-white"
          >
            Request Early Access
          </button>
        </form>
      </div>
    </main>
  );
}
