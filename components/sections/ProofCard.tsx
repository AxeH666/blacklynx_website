// Honest, representative output for the real StrikeDemo payments scenario:
// a Celery task enqueued before commit, so the worker runs before the ledger row
// is committed → LedgerEntry.DoesNotExist. Fix: defer enqueue to on_commit().
const traceLines: string[] = [
  "Traceback (most recent call last):",
  '  File "payments/tasks.py", line 31, in notify_accounting',
  "LedgerEntry.DoesNotExist: matching query does not exist"
];

type DiffLine = {
  lineNo: number;
  sign: "-" | "+";
  code: string;
};

const diffLines: DiffLine[] = [
  { lineNo: 41, sign: "-", code: "  notify_accounting.delay(event_id)" },
  { lineNo: 41, sign: "+", code: "  transaction.on_commit(" },
  { lineNo: 42, sign: "+", code: "    lambda: notify_accounting.delay(event_id)" },
  { lineNo: 43, sign: "+", code: "  )" }
];

const VERIFIED_GLOW = "[text-shadow:0_0_12px_oklch(1_0_0_/_0.18)]";

export default function ProofCard(): React.JSX.Element {
  return (
    <div className="proof-artifact aspect-square w-full">
      <div
        className="proof-artifact__window"
        aria-label="Jericho debug result: located the exact function and proved the fix, verified against source with tests passing"
      >
        {/* App window title bar — captured-pane chrome */}
        <div className="proof-artifact__titlebar">
          <div className="proof-artifact__dots" aria-hidden="true">
            <span className="proof-artifact__dot" />
            <span className="proof-artifact__dot" />
            <span className="proof-artifact__dot" />
          </div>
          <span className="proof-artifact__title">process_payment · jericho</span>
        </div>

        {/* Window body — nested app panes */}
        <div className="proof-artifact__body font-mono">
          <section className="proof-artifact__panel">
            <header className="proof-artifact__panel-header">stack trace</header>
            <div className="proof-artifact__panel-body proof-artifact__scroll">
              {traceLines.map((line) => (
                <pre
                  key={line}
                  className="whitespace-pre text-[10px] leading-relaxed tracking-[0.02em] text-text-muted"
                >
                  {line}
                </pre>
              ))}
            </div>
          </section>

          <p className="flex flex-wrap items-baseline gap-x-space-2 px-space-1 text-[10px] leading-relaxed tracking-[0.02em]">
            <span className="text-text-muted">→ retrieved</span>
            <span className="text-foreground">
              payments/views.py<span className="tabular-nums">:42</span> · stripe_webhook()
            </span>
          </p>

          <section className="proof-artifact__panel">
            <header className="proof-artifact__panel-header">proposed fix</header>
            <div className="proof-artifact__diff proof-artifact__scroll">
              {diffLines.map((line, i) => (
                <div
                  key={`${line.sign}-${line.lineNo}-${i}`}
                  className={[
                    "proof-artifact__diff-line",
                    line.sign === "+"
                      ? "proof-artifact__diff-line--add"
                      : "proof-artifact__diff-line--remove"
                  ].join(" ")}
                >
                  <span className="proof-artifact__ln tabular-nums">{line.lineNo}</span>
                  <span className="proof-artifact__sign" aria-hidden="true">
                    {line.sign}
                  </span>
                  <pre className="proof-artifact__code whitespace-pre">{line.code}</pre>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* IDE-style status bar — proof stamp lives here */}
        <footer className="proof-artifact__statusbar font-mono">
          <p className="flex min-w-0 flex-1 flex-wrap items-center gap-x-space-3 gap-y-space-1 text-[10px] tracking-[0.02em] text-text-secondary">
            <span>grounded in source ✓</span>
            <span aria-hidden="true" className="text-text-muted">
              ·
            </span>
            <span>
              confidence <span className="tabular-nums">0.97</span>
            </span>
            <span aria-hidden="true" className="text-text-muted">
              ·
            </span>
            <span>
              tests <span className="tabular-nums">14/14</span> passed
            </span>
          </p>
          <p
            className={`shrink-0 text-sm font-medium tabular-nums tracking-[0.02em] text-foreground ${VERIFIED_GLOW}`}
          >
            verified=true
          </p>
        </footer>
      </div>
    </div>
  );
}
