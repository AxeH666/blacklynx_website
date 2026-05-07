import Image from "next/image";
import Link from "next/link";
import StrikeDemo from "@/components/StrikeDemo";

const sectionClass = "border-b border-[#1A1A1A]";

export default function Home(): JSX.Element {
  return (
    <div className="bg-[#080808] text-[#F0F0F0]">
      <header className="sticky top-0 z-50 h-[72px] bg-transparent">
        <div className="grid h-full w-full grid-cols-[1fr_auto_1fr] items-center px-20">
          <Link href="/" className="justify-self-start flex items-center gap-3">
            <Image
              src="/images/logo-head.png"
              alt="Strike logo"
              width={50}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <p className="text-[25px] font-extrabold tracking-[0.18em]">STRIKE</p>
          </Link>
          <nav className="hidden justify-self-center items-center gap-9 text-[20px] leading-[1.9] font-normal text-[#888888] md:flex">
            <a href="#product">Product</a>
            <a href="#how">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
          <Link
            href="/waitlist"
            className="justify-self-end bg-[#C8102E] rounded-full px-7 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-white"
          >
            Request Early Access
          </Link>
        </div>
      </header>

      <main>
        <section id="product">
          <div className="w-full pl-[120px] pr-20 pt-[142px] pb-0">
            <div className="max-w-[640px] text-left">
              <h1 className="text-[56px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
                Finds the exact bug.
                <span className="block text-[#555555]">Never guesses.</span>
              </h1>
              <p className="mt-6 text-[20px] leading-[1.9] text-[#777777]">
                Stack trace in. Verified root cause + fix out. Under 5 seconds.
                <br />
                Code never leaves India. Open-weight models. No vendor lock-in.
              </p>
              <div className="mt-10 flex flex-row items-center justify-start gap-3">
                <Link
                  href="/waitlist"
                  className="bg-[#C8102E] rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
                >
                  Request Early Access
                </Link>
                <a
                  href="#how"
                  className="border border-[#2A2A2A] rounded-full px-5 py-3 text-[16px] font-semibold uppercase tracking-[0.08em] leading-[1.9] text-[#555555]"
                >
                  See How It Works ↓
                </a>
              </div>
              <p className="mt-12 text-[16px] leading-[1.9] text-[#555555]">
                Self-hosted · Privacy-first · Built for Indian engineering teams
              </p>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className="mx-auto w-full max-w-6xl px-20 pt-[40px] pb-[80px]">
            <StrikeDemo />
          </div>
        </section>

        <section className={sectionClass}>
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <p className="text-center font-mono text-[12px] uppercase leading-[1.9] tracking-[0.1em] text-[#444444]">
              SELF-HOSTED · OPEN-WEIGHT MODELS ONLY · CODE NEVER LEAVES YOUR SERVER · NO OPENAI · NO
              VENDOR LOCK-IN · MIT MANIPAL RESEARCH
            </p>
          </div>
        </section>

        <section id="how" className={sectionClass}>
          <div className="mx-auto w-full max-w-6xl px-4 py-12">
            <h2 className="mb-10 text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#F0F0F0]">
              Strike does the debugging. You make the decisions.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
            <article className="border-b border-[#1A1A1A] py-10 md:border-b-0 md:border-r md:pr-8">
              <h3 className="text-[20px] font-semibold leading-[1.3] text-[#F0F0F0]">
                01 —— Paste your stack trace
              </h3>
              <p className="mt-4 text-[16px] leading-[1.9] text-[#777777]">
                Drop any Django or Python exception. Nothing leaves your server — ever.
              </p>
              <p className="mt-5 inline-block border border-[#2A2A2A] px-2 py-1 font-mono text-[13px] leading-[1.9] text-[#444444]">
                POST /debug
              </p>
            </article>
            <article className="border-b border-[#1A1A1A] py-10 md:border-b-0 md:border-r md:px-8">
              <h3 className="text-[20px] font-semibold leading-[1.3] text-[#F0F0F0]">
                02 —— Strike retrieves and verifies
              </h3>
              <p className="mt-4 text-[16px] leading-[1.9] text-[#777777]">
                Finds the exact functions in your codebase. Verifies the fix is grounded before showing
                it.
              </p>
              <p className="mt-5 inline-block border border-[#2A2A2A] px-2 py-1 font-mono text-[13px] leading-[1.9] text-[#444444]">
                confidence_score · verified=true
              </p>
            </article>
            <article className="py-10 md:pl-8">
              <h3 className="text-[20px] font-semibold leading-[1.3] text-[#F0F0F0]">
                03 —— One-click patch
              </h3>
              <p className="mt-4 text-[16px] leading-[1.9] text-[#777777]">
                Root cause, fix, unified diff. Click apply. If it cannot verify — it stays silent.
              </p>
              <p className="mt-5 inline-block border border-[#2A2A2A] px-2 py-1 font-mono text-[13px] leading-[1.9] text-[#444444]">
                POST /apply · POST /rollback
              </p>
            </article>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 md:flex-row md:items-start">
            <div className="h-16 w-16 border border-[#7A0A1A] p-3">
              <div className="grid h-full grid-cols-3 gap-1">
                <span className="bg-[#C8102E]" />
                <span className="translate-y-1 bg-[#C8102E]" />
                <span className="translate-y-2 bg-[#C8102E]" />
              </div>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#C8102E]">
                THE ONLY RULE
              </p>
              <h2 className="mt-2 text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#F0F0F0]">
                Only shows what it can prove.
              </h2>
              <p className="mt-4 max-w-3xl text-[16px] leading-[1.9] text-[#777777]">
                Most AI tools hallucinate a fix and move on. Strike withholds the answer until it can
                verify the fix exists in your actual code. It only gives you the right fix.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className={sectionClass}>
          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <h2 className="mb-10 text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-[#F0F0F0]">
              Simple pricing. No per-token billing.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <article className="border-b border-[#1A1A1A] py-8 md:border-b-0 md:border-r md:pr-8">
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#555555]">
                  SELF-HOSTED FREE
                </p>
                <p className="mt-2 text-[36px] font-bold leading-[1.1] text-[#F0F0F0]">₹0</p>
                <p className="mt-3 text-[15px] leading-[1.9] text-[#666666]">
                  Run on your own GPU. MIT licensed.
                </p>
                <ul className="mt-5 space-y-2 text-[14px] leading-[1.9] text-[#666666]">
                  <li>Unlimited sessions</li>
                  <li>All open-weight models</li>
                  <li>Full API</li>
                </ul>
              </article>
              <article className="border-b border-[#1A1A1A] border-t-2 border-t-[#C8102E] py-8 md:border-b-0 md:border-r md:px-8">
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#555555]">HOSTED</p>
                <p className="mt-2 text-[36px] font-bold leading-[1.1] text-[#F0F0F0]">₹799/month</p>
                <p className="mt-3 text-[15px] leading-[1.9] text-[#666666]">
                  Hosted in India. Code never leaves Indian infrastructure.
                </p>
                <ul className="mt-5 space-y-2 text-[14px] leading-[1.9] text-[#666666]">
                  <li>Everything in Free</li>
                  <li>VS Code plugin</li>
                  <li>Priority support</li>
                </ul>
              </article>
              <article className="py-8 md:pl-8">
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#555555]">
                  ENTERPRISE
                </p>
                <p className="mt-2 text-[36px] font-bold leading-[1.1] text-[#F0F0F0]">Custom</p>
                <p className="mt-3 text-[15px] leading-[1.9] text-[#666666]">
                  On-prem, SLA, dedicated infra.
                </p>
                <ul className="mt-5 space-y-2 text-[14px] leading-[1.9] text-[#666666]">
                  <li>Everything in Hosted</li>
                  <li>On-prem deployment</li>
                  <li>Custom SLA</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
            <h2 className="text-[42px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#F0F0F0]">
              Your next bug is already waiting.
              <span className="mt-2 block text-[#555555]">Strike finds it first.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[18px] leading-[1.9] text-[#666666]">
              Join engineering teams across India on the waitlist.
            </p>
            <Link
              href="/waitlist"
              className="mt-8 inline-block rounded-full bg-[#C8102E] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
            >
              Request Early Access
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-b border-[#1A1A1A]">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-3 px-4 py-6 text-[13px] leading-[1.9] text-[#444444] md:flex-row md:items-center">
          <p>© 2026 BLACKKRAIT TECHNOLOGIES PVT. LTD. · MANIPAL, KARNATAKA</p>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="mailto:contact@blackkrait.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
