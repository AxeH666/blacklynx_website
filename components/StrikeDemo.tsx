"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { JSX, ReactNode } from "react";

type DemoFileId = "payments/views.py" | "services.py" | "serializers.py";

type Phase =
  | "thinking"
  | "result"
  | "apply_fadeout"
  | "apply_snake"
  | "apply_success";

const WINDOW_H = 640;
const HIGHLIGHT_LINE = 87;
const COT_LINE_COUNT = 4;
const COT_STAGGER_MS = 400;
const COT_LAST_FADE_MS = 400;
const COT_POST_MS = 800;
const THINKING_TO_RESULT_MS =
  (COT_LINE_COUNT - 1) * COT_STAGGER_MS + COT_LAST_FADE_MS + COT_POST_MS;
const APPLY_FADE_MS = 500;
const APPLY_SNAKE_MS = 1500;
const LOOP_MS = 12_000;

const KEYWORDS = new Set([
  "def",
  "class",
  "return",
  "if",
  "else",
  "elif",
  "for",
  "while",
  "try",
  "except",
  "finally",
  "with",
  "as",
  "import",
  "from",
  "pass",
  "raise",
  "assert",
  "lambda",
  "yield",
  "async",
  "await",
  "and",
  "or",
  "not",
  "in",
  "is",
  "None",
  "True",
  "False",
  "break",
  "continue"
]);

const proseStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontSize: 13,
  lineHeight: 1.9,
  minHeight: 0
};

const monoStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  fontSize: 13,
  lineHeight: 1.9,
  minHeight: 0
};

const panelScroll: React.CSSProperties = {
  overflow: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  minHeight: 0
};

function buildLines(
  header: string[],
  criticalLine: string,
  footer: string[]
): string[] {
  const nBefore = HIGHLIGHT_LINE - 1;
  const head = header.slice(0, nBefore);
  while (head.length < nBefore) {
    head.push("");
  }
  return [...head, criticalLine, ...footer];
}

const FILE_META: Record<
  DemoFileId,
  {
    lines: string[];
    cotLines: string[];
    diff: string;
    tooltip: string;
    chat: { role: "user" | "strike"; text: string }[];
    appliedSnippet: string[];
  }
> = {
  "payments/views.py": {
    lines: buildLines(
      [
        '"""Stripe webhook → ledger bridge."""',
        "from __future__ import annotations",
        "",
        "import hashlib",
        "import logging",
        "from typing import Any",
        "",
        "from django.conf import settings",
        "from django.db import transaction",
        "from django.http import HttpRequest, JsonResponse",
        "from django.utils import timezone",
        "from django.views.decorators.csrf import csrf_exempt",
        "",
        "from apps.billing import tasks",
        "from apps.billing.models import LedgerEntry, WebhookEvent",
        "from apps.billing.serializers import StripeEventSerializer",
        "from apps.core.metrics import increment",
        "",
        "logger = logging.getLogger(__name__)",
        "",
        "",
        "@csrf_exempt",
        "def stripe_webhook(request: HttpRequest) -> JsonResponse:",
        '    """Verify signature, persist idempotently, post ledger."""',
        "    raw = request.body",
        "    sig = request.headers.get('Stripe-Signature', '')",
        "",
        "    if not _verify_stripe_signature(raw, sig):",
        "        increment('stripe.webhook.bad_sig')",
        "        return JsonResponse({'ok': False}, status=400)",
        "",
        "    payload = StripeEventSerializer.parse(raw)",
        "    event_id = payload['id']",
        "",
        "    if WebhookEvent.objects.filter(stripe_id=event_id).exists():",
        "        return JsonResponse({'ok': True, 'duplicate': True})",
        "",
        "    WebhookEvent.objects.create(",
        "        stripe_id=event_id,",
        "        type=payload['type'],",
        "        received_at=timezone.now(),",
        "    )",
        "",
        "    if payload['type'] != 'charge.succeeded':",
        "        return JsonResponse({'ok': True})",
        "",
        "    amount_cents = int(payload['data']['object']['amount'])",
        "    currency = payload['data']['object']['currency']",
        "    customer_id = payload['data']['object'].get('customer')",
        "",
        "    metadata = {",
        "        'event_id': event_id,",
        "        'customer': customer_id or '',",
        "        'currency': currency,",
        "    }",
        "",
        "    def _post() -> None:",
        "        LedgerEntry.objects.create(",
        "            amount_cents=amount_cents,",
        "            metadata=metadata,",
        "            source='stripe_webhook',",
        "        )",
        "",
        "    with transaction.atomic():",
        "        _post()",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      "        tasks.notify_accounting.delay(event_id)  # BUG: before commit",
      [
        "",
        "    increment('stripe.webhook.posted')",
        "    return JsonResponse({'ok': True})",
        "",
        "",
        "def _verify_stripe_signature(raw: bytes, sig: str) -> bool:",
        "    import hmac",
        "    secret = settings.STRIPE_WEBHOOK_SECRET",
        "    digest = hmac.new(secret.encode(), raw, hashlib.sha256).hexdigest()",
        "    return hmac.compare_digest(digest, sig.split(',')[0])",
        "",
        "def replay_fixture(path: str) -> None:",
        '    """Dev-only helper for integration tests."""',
        "    with open(path, 'rb') as f:",
        "        body = f.read()",
        "    stripe_webhook(_fake_request(body))",
        "",
        "",
        "def _fake_request(body: bytes) -> HttpRequest:",
        "    req = HttpRequest()",
        "    req._body = body",
        "    return req"
      ]
    ),
    cotLines: [
      "Correlating stack frames with webhook handler entrypoints…",
      "Suspecting double-post: task enqueue is outside atomic block…",
      "Tracing LedgerEntry.create vs accounting notification ordering…",
      "Hypothesis: race between concurrent identical event retries."
    ],
    diff: `@@ def stripe_webhook
     with transaction.atomic():
-        _post()
-        tasks.notify_accounting.delay(event_id)
+        _post()
+        transaction.on_commit(
+            lambda: tasks.notify_accounting.delay(event_id)
+        )`,
    tooltip:
      "Notify runs after commit — prevents duplicate ledger rows on retry storms.",
    chat: [
      {
        role: "user",
        text: "502s on /billing/webhook — duplicate charges in ledger for same Stripe event id."
      },
      {
        role: "strike",
        text: "Root cause: notify_accounting.delay fires inside atomic() before commit; retry replays _post() while task already consumed partial state. Move delay to on_commit()."
      }
    ],
    appliedSnippet: [
      "    with transaction.atomic():",
      "        _post()",
      "        transaction.on_commit(",
      "            lambda: tasks.notify_accounting.delay(event_id)",
      "        )"
    ]
  },
  "services.py": {
    lines: buildLines(
      [
        '"""Domain services for order fulfillment."""',
        "from __future__ import annotations",
        "",
        "import logging",
        "from dataclasses import dataclass",
        "from decimal import Decimal",
        "from typing import Iterable",
        "",
        "from django.core.cache import cache",
        "from django.db import models, transaction",
        "",
        "from apps.catalog.models import Sku",
        "from apps.orders.models import Order, OrderLine",
        "from apps.payments.gateways import capture_payment",
        "",
        "logger = logging.getLogger(__name__)",
        "",
        "",
        "@dataclass(frozen=True)",
        "class Allocation:",
        "    sku_id: int",
        "    qty: int",
        "",
        "",
        "class OrderService:",
        '    """Public orchestration API for checkout."""',
        "",
        "    @staticmethod",
        "    def reserve_inventory(order_id: int) -> None:",
        "        lines = list(OrderLine.objects.filter(order_id=order_id))",
        "        for line in lines:",
        "            key = f'stock:{line.sku_id}'",
        "            cache.decr(key, line.quantity)",
        "",
        "    @staticmethod",
        "    def release_inventory(order_id: int) -> None:",
        "        lines = list(OrderLine.objects.filter(order_id=order_id))",
        "        for line in lines:",
        "            key = f'stock:{line.sku_id}'",
        "            cache.incr(key, line.quantity)",
        "",
        "    @staticmethod",
        "    def fulfill(order_id: int) -> None:",
        "        order = Order.objects.select_for_update().get(pk=order_id)",
        "        if order.status != Order.Status.PAID:",
        "            raise ValueError('order not paid')",
        "",
        "        allocations: list[Allocation] = []",
        "        for line in order.lines.all():",
        "            allocations.append(Allocation(line.sku_id, line.quantity))",
        "",
        "        OrderService._decrement_stock(allocations)",
        "        order.status = Order.Status.FULFILLED",
        "        order.save(update_fields=['status', 'updated_at'])",
        "",
        "    @staticmethod",
        "    def _decrement_stock(items: Iterable[Allocation]) -> None:",
        "        for a in items:",
        "            Sku.objects.filter(pk=a.sku_id).update(",
        "                stock=models.F('stock') - a.qty",
        "            )",
        "",
        "    @staticmethod",
        "    def _warm_routing(order_id: int) -> None:",
        "        cache.touch(f'route:{order_id}', timeout=15)",
        "",
        "    @staticmethod",
        "    def _mark_risk_review(order_id: int) -> None:",
        "        Order.objects.filter(pk=order_id).update(risk_hold=True)",
        "",
        "    @staticmethod",
        "    def _clear_risk_review(order_id: int) -> None:",
        "        Order.objects.filter(pk=order_id).update(risk_hold=False)",
        "",
        "    @staticmethod",
        "    def _attach_note(order_id: int, note: str) -> None:",
        "        Order.objects.filter(pk=order_id).update(internal_note=note[:200])",
        "",
        "    @staticmethod",
        "    def charge_and_mark_paid(order_id: int) -> None:",
        "        with transaction.atomic():",
        "            order = Order.objects.select_for_update().get(pk=order_id)",
        "            if order.payment_ref:",
        "                return",
        "            ref = capture_payment(order.total, order.currency)",
        "            order.payment_ref = ref",
        "            order.status = Order.Status.PAID",
        "            order.save()"
      ],
      "            cache.set(f'paid:{order_id}', True)  # BUG: cache before commit",
      [
        "",
        "    @staticmethod",
        "    def schedule_shipment(order_id: int) -> None:",
        "        order = Order.objects.get(pk=order_id)",
        "        tasks.enqueue_shipment.delay(order.id)",
        "",
        "    @staticmethod",
        "    def cancel(order_id: int) -> None:",
        "        with transaction.atomic():",
        "            order = Order.objects.select_for_update().get(pk=order_id)",
        "            if order.status == Order.Status.CANCELLED:",
        "                return",
        "            order.status = Order.Status.CANCELLED",
        "            order.save()",
        "        OrderService.release_inventory(order_id)",
        "",
        "class tasks:",
        "    @staticmethod",
        "    def enqueue_shipment(order_id: int) -> None:",
        "        pass"
      ]
    ),
    cotLines: [
      "Mapping fulfillment worker logs to OrderService.charge_and_mark_paid…",
      "Noticing cache.set runs inside atomic but readers see stale payment_ref…",
      "Checking race between webhook completion and shipment scheduler…",
      "Conclusion: visibility bug — readers must use DB, not ephemeral cache."
    ],
    diff: `@@ def charge_and_mark_paid
             order.payment_ref = ref
             order.status = Order.Status.PAID
             order.save()
-        cache.set(f'paid:{order_id}', True)
+        transaction.on_commit(
+            lambda: cache.set(f'paid:{order_id}', True, timeout=3600)
+        )`,
    tooltip: "Cache update after commit keeps workers from acting on uncommitted payment.",
    chat: [
      {
        role: "user",
        text: "Shipment tasks fire before payment_ref visible — intermittent unpaid orders shipping."
      },
      {
        role: "strike",
        text: "cache.set('paid:…') runs inside the same atomic block; Celery sees cache first while row still rolling back on conflict. Defer cache to on_commit()."
      }
    ],
    appliedSnippet: [
      "            order.save()",
      "        transaction.on_commit(",
      "            lambda: cache.set(f'paid:{order_id}', True, timeout=3600)",
      "        )"
    ]
  },
  "serializers.py": {
    lines: buildLines(
      [
        '"""API serializers — users & auth."""',
        "from __future__ import annotations",
        "",
        "import re",
        "from typing import Any",
        "",
        "from django.contrib.auth import get_user_model",
        "from django.utils.crypto import get_random_string",
        "from rest_framework import serializers",
        "",
        "User = get_user_model()",
        "",
        "",
        "class EmailField(serializers.EmailField):",
        "    def to_internal_value(self, data: Any) -> str:",
        "        v = super().to_internal_value(data)",
        "        return v.strip().lower()",
        "",
        "",
        "class UserSerializer(serializers.ModelSerializer):",
        "    email = EmailField()",
        "",
        "    class Meta:",
        "        model = User",
        "        fields = ('id', 'email', 'name', 'is_active', 'date_joined')",
        "        read_only_fields = ('id', 'date_joined')",
        "",
        "    def validate_email(self, value: str) -> str:",
        "        if not re.match(r'^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$', value):",
        "            raise serializers.ValidationError('invalid email')",
        "        return value",
        "",
        "    def validate_name(self, value: str) -> str:",
        "        if len(value) < 2:",
        "            raise serializers.ValidationError('too short')",
        "        return value.title()",
        "",
        "    def to_representation(self, instance: User) -> dict[str, Any]:",
        "        data = super().to_representation(instance)",
        "        data['name'] = (data.get('name') or '').strip()",
        "        return data",
        "",
        "    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:",
        "        if attrs.get('email', '').endswith('.invalid'):",
        "            raise serializers.ValidationError('blocked domain')",
        "        return attrs",
        "",
        "    def validate_employee_id(self, value: str) -> str:",
        "        return (value or '').upper()",
        "",
        "    def validate_cost_center(self, value: str) -> str:",
        "        return (value or 'cc-unknown')[:32]",
        "",
        "    def validate_region(self, value: str) -> str:",
        "        return (value or 'in').lower()",
        "",
        "    def validate_segment(self, value: str) -> str:",
        "        return (value or 'default').lower()",
        "",
        "    def validate_channel(self, value: str) -> str:",
        "        return (value or 'web').lower()",
        "",
        "    def validate_referrer(self, value: str) -> str:",
        "        return (value or '')[:512]",
        "",
        "    def validate_campaign(self, value: str) -> str:",
        "        return (value or '')[:128]",
        "",
        "    def validate_partner_code(self, value: str) -> str:",
        "        return (value or '').upper()[:16]",
        "",
        "    def validate_invite_token(self, value: str) -> str:",
        "        return (value or '').strip()",
        "",
        "    def validate_notes(self, value: str) -> str:",
        "        return (value or '').strip()[:2000]",
        "",
        "    def validate_tags(self, value: list[str]) -> list[str]:",
        "        return [t.strip().lower() for t in (value or [])][:20]",
        "",
        "    def validate_flags(self, value: dict[str, bool]) -> dict[str, bool]:",
        "        return {k: bool(v) for k, v in (value or {}).items()}",
        "    def validate_preferences(self, value: dict[str, Any]) -> dict[str, Any]:",
        "        return dict(value or {})",
        "    def create(self, validated: dict[str, Any]) -> User:",
        "        password = get_random_string(32)",
        "        user = User.objects.create_user(",
        "            email=validated['email'],",
        "            password=password,",
        "            name=validated['name'],",
        "        )"
      ],
      "        AuditLog.record('user.create', user.id, payload=validated)  # leaks password",
      [
        "",
        "        tasks.send_welcome_email.delay(user.id)",
        "        return user",
        "",
        "class AuditLog:",
        "    @staticmethod",
        "    def record(action: str, uid: int, payload: dict) -> None:",
        "        pass",
        "",
        "class tasks:",
        "    @staticmethod",
        "    def send_welcome_email(user_id: int) -> None:",
        "        pass",
        "    @staticmethod",
        "    def send_reset_sms(user_id: int, code: str) -> None:",
        "        pass",
        "",
        "class Invite:",
        "    objects: Any"
      ]
    ),
    cotLines: [
      "Inspecting UserSerializer.create audit trail in staging logs…",
      "Finding plaintext password material in structured log payloads…",
      "Tracing AuditLog.record caller — kwargs include validated dict…",
      "Fix: log only user id + email, never raw validated body."
    ],
    diff: `@@ def create
         user = User.objects.create_user(
             email=validated['email'],
             password=password,
             name=validated['name'],
         )
-        AuditLog.record('user.create', user.id, payload=validated)
+        AuditLog.record(
+            'user.create',
+            user.id,
+            payload={'email': validated['email']},
+        )`,
    tooltip: "Never persist or log serializer dicts that may contain credentials.",
    chat: [
      {
        role: "user",
        text: "Security audit flagged PII + password material in our audit_log table for signups."
      },
      {
        role: "strike",
        text: "UserSerializer.create passes full validated_data into AuditLog; password hash and fields leak. Redact to non-sensitive keys only."
      }
    ],
    appliedSnippet: [
      "        AuditLog.record(",
      "            'user.create',",
      "            user.id,",
      "            payload={'email': validated['email']},",
      "        )"
    ]
  }
};

function highlightPythonTokens(line: string): ReactNode {
  if (line.trimStart().startsWith("#")) {
    return <span style={{ color: "#8A8A8A" }}>{line}</span>;
  }

  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < line.length) {
    if (line[i] === "#") {
      out.push(
        <span key={key++} style={{ color: "#8A8A8A" }}>
          {line.slice(i)}
        </span>
      );
      break;
    }

    const ch = line[i];
    if (ch === '"' || ch === "'") {
      const q = ch;
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === "\\") {
          j += 2;
          continue;
        }
        if (line[j] === q) {
          j += 1;
          break;
        }
        j += 1;
      }
      out.push(
        <span key={key++} style={{ color: "#E89C6B" }}>
          {line.slice(i, j)}
        </span>
      );
      i = j;
      continue;
    }

    if (/\s/.test(ch)) {
      let j = i;
      while (j < line.length && /\s/.test(line[j])) {
        j += 1;
      }
      out.push(<span key={key++}>{line.slice(i, j)}</span>);
      i = j;
      continue;
    }

    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) {
        j += 1;
      }
      const word = line.slice(i, j);
      const rest = line.slice(j);
      if (KEYWORDS.has(word)) {
        out.push(
          <span key={key++} style={{ color: "#6BA3FF" }}>
            {word}
          </span>
        );
      } else if (/^\s*\(/.test(rest)) {
        out.push(
          <span key={key++} style={{ color: "#E6C066" }}>
            {word}
          </span>
        );
      } else {
        out.push(<span key={key++}>{word}</span>);
      }
      i = j;
      continue;
    }

    out.push(<span key={key++}>{line[i]}</span>);
    i += 1;
  }

  return <>{out}</>;
}

function SnakeGraphic(): JSX.Element {
  return (
    <div
      style={{
        width: 200,
        margin: "0 auto",
        animation: "strikeSlither 1.2s ease-in-out infinite alternate"
      }}
    >
      <svg
        width="200"
        height="100"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M 12 52 C 38 12, 62 92, 98 50 S 154 18, 188 48"
          stroke="#C8102E"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function StrikeDemo(): JSX.Element {
  const [fileId, setFileId] = useState<DemoFileId>("payments/views.py");
  const [phase, setPhase] = useState<Phase>("thinking");
  const [cotShown, setCotShown] = useState(0);
  const [mainTab, setMainTab] = useState<"review" | "apply">("review");
  const [loopTick, setLoopTick] = useState(0);
  const applyRunRef = useRef(0);
  const thinkingTimersRef = useRef<number[]>([]);

  const meta = FILE_META[fileId];

  const restartThinkingCycle = useCallback(() => {
    thinkingTimersRef.current.forEach(clearTimeout);
    thinkingTimersRef.current = [];
    setPhase("thinking");
    setCotShown(0);
    setMainTab("review");
  }, []);

  useEffect(() => {
    restartThinkingCycle();
  }, [fileId, loopTick, restartThinkingCycle]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLoopTick((t) => t + 1);
    }, LOOP_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (phase !== "thinking") {
      return;
    }
    thinkingTimersRef.current.forEach(clearTimeout);
    const timers: number[] = [];
    for (let k = 0; k < COT_LINE_COUNT; k += 1) {
      timers.push(
        window.setTimeout(() => {
          setCotShown(k + 1);
        }, k * COT_STAGGER_MS)
      );
    }
    timers.push(
      window.setTimeout(() => {
        setPhase("result");
      }, THINKING_TO_RESULT_MS)
    );
    thinkingTimersRef.current = timers;
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [phase, fileId, loopTick]);

  const beginApply = useCallback(() => {
    if (phase !== "result") {
      return;
    }
    const runId = applyRunRef.current + 1;
    applyRunRef.current = runId;
    setMainTab("apply");
    setPhase("apply_fadeout");
    window.setTimeout(() => {
      if (applyRunRef.current !== runId) {
        return;
      }
      setPhase("apply_snake");
    }, APPLY_FADE_MS);
    window.setTimeout(() => {
      if (applyRunRef.current !== runId) {
        return;
      }
      setPhase("apply_success");
    }, APPLY_FADE_MS + APPLY_SNAKE_MS);
  }, [phase]);

  const cancelApply = useCallback(() => {
    applyRunRef.current += 1;
    setPhase("result");
    setMainTab("review");
  }, []);

  const onReviewTab = useCallback(() => {
    applyRunRef.current += 1;
    setMainTab("review");
    if (
      phase === "apply_success" ||
      phase === "apply_snake" ||
      phase === "apply_fadeout"
    ) {
      setPhase("result");
    }
  }, [phase]);

  const resultLayerOpacity =
    phase === "result"
      ? 1
      : phase === "apply_fadeout"
        ? 0
        : phase === "apply_success"
          ? 0
          : 0;

  const successOpacity = phase === "apply_success" ? 1 : 0;

  return (
    <>
      <style>{`
        @keyframes strikeSlither {
          from { transform: translateX(-6px); }
          to { transform: translateX(6px); }
        }
        .strike-demo-hide-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        style={{
          background:
            "linear-gradient(135deg, #0F0F0F 0%, #141414 50%, #0A0A0A 100%)",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(135deg, #0F0F0F 0%, #141414 50%, #0A0A0A 100%)",
          backgroundSize: "32px 32px, 32px 32px, auto",
          boxShadow: "inset 0 0 120px rgba(200, 16, 46, 0.04)",
          border: "1px solid #1E1E1E",
          padding: 40,
          borderRadius: 24
        }}
      >
        <div
          style={{
            width: "calc(100% - 160px)",
            margin: "0 auto",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow:
              "0 0 0 1px #1A1A1A, 0 32px 64px rgba(0,0,0,0.5)",
            height: WINDOW_H,
            display: "flex",
            flexDirection: "column",
            background: "#0D0D0D",
            color: "#E8E8E8"
          }}
        >
        <div
          style={{
            flex: 1,
            display: "flex",
            minHeight: 0,
            borderBottom: "1px solid #1A1A1A"
          }}
        >
          {/* Left */}
          <aside
            style={{
              width: 220,
              flexShrink: 0,
              borderRight: "1px solid #1A1A1A",
              display: "flex",
              flexDirection: "column",
              ...proseStyle
            }}
          >
            <div
              style={{
                padding: "10px 12px",
                fontSize: 13,
                color: "#888",
                borderBottom: "1px solid #1A1A1A"
              }}
            >
              Explorer
            </div>
            <div
              className="strike-demo-hide-scroll"
              style={{ ...panelScroll, flex: 1, padding: "8px 0" }}
            >
              {(
                [
                  "payments/views.py",
                  "services.py",
                  "serializers.py"
                ] as DemoFileId[]
              ).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFileId(id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 12px",
                    border: "none",
                    background:
                      fileId === id ? "rgba(200,16,46,0.15)" : "transparent",
                    color: fileId === id ? "#F0F0F0" : "#B0B0B0",
                    cursor: "pointer",
                    fontSize: 13,
                    lineHeight: 1.9,
                    transition: "background 0.2s, color 0.2s"
                  }}
                >
                  {id}
                </button>
              ))}
            </div>
          </aside>

          {/* Center */}
          <div
            style={{
              width: 320,
              flexShrink: 0,
              borderRight: "1px solid #1A1A1A",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              ...proseStyle
            }}
          >
            <div
              style={{
                padding: "10px 12px",
                fontSize: 13,
                color: "#888",
                borderBottom: "1px solid #1A1A1A"
              }}
            >
              Strike
            </div>
            <div
              className="strike-demo-hide-scroll"
              style={{
                ...panelScroll,
                flex: 1,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 10
              }}
            >
              {meta.chat.map((m, idx) => (
                <div
                  key={`${idx}-${m.text.slice(0, 12)}`}
                  style={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "92%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    background:
                      m.role === "user" ? "#2A2A2A" : "rgba(200,16,46,0.12)",
                    border: "1px solid #2A2A2A",
                    fontSize: 13,
                    lineHeight: 1.9,
                    transition: "opacity 0.35s ease",
                    opacity: 1
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div
              style={{
                padding: 10,
                borderTop: "1px solid #1A1A1A",
                flexShrink: 0
              }}
            >
              <input
                readOnly
                placeholder="Describe the failure…"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #2A2A2A",
                  background: "#141414",
                  color: "#888",
                  fontSize: 13,
                  lineHeight: 1.9,
                  outline: "none"
                }}
              />
            </div>
          </div>

          {/* Right */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              minHeight: 0
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                padding: "8px 12px",
                borderBottom: "1px solid #1A1A1A",
                ...proseStyle
              }}
            >
              <button
                type="button"
                onClick={onReviewTab}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #2A2A2A",
                  background: mainTab === "review" ? "#2A2A2A" : "transparent",
                  color: "#E8E8E8",
                  cursor: "pointer",
                  fontSize: 13,
                  lineHeight: 1.9,
                  transition: "background 0.25s, opacity 0.25s"
                }}
              >
                Review
              </button>
              <button
                type="button"
                disabled={phase !== "result"}
                onClick={beginApply}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #2A2A2A",
                  background: mainTab === "apply" ? "#2A2A2A" : "transparent",
                  color: phase === "result" ? "#E8E8E8" : "#555",
                  cursor: phase === "result" ? "pointer" : "not-allowed",
                  fontSize: 13,
                  lineHeight: 1.9,
                  opacity: phase === "result" ? 1 : 0.55,
                  transition: "background 0.25s, opacity 0.25s"
                }}
              >
                Apply Fix
              </button>
            </div>

            <div
              style={{
                position: "relative",
                flex: 1,
                minHeight: 0,
                ...monoStyle
              }}
            >
              {/* Thinking + applying snake */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  justifyContent: "center",
                  padding: 16,
                  opacity:
                    phase === "thinking"
                      ? 1
                      : phase === "apply_fadeout"
                        ? 0
                        : phase === "apply_snake"
                          ? 1
                          : phase === "apply_success"
                            ? 0
                            : 0,
                  transition: "opacity 0.5s ease",
                  pointerEvents: "none"
                }}
              >
                {phase === "thinking" || phase === "apply_snake" ? (
                  <>
                    <SnakeGraphic />
                    <div
                      style={{
                        ...proseStyle,
                        textAlign: "center",
                        marginTop: 12,
                        color: "#A8A8A8",
                        minHeight: 28,
                        transition: "opacity 0.4s ease"
                      }}
                    >
                      {phase === "apply_snake" ? (
                        <>Applying patch to {fileId}…</>
                      ) : (
                        <>Analyzing {fileId}…</>
                      )}
                    </div>
                    {phase === "thinking" ? (
                      <div style={{ marginTop: 20, maxWidth: 420, marginInline: "auto" }}>
                        {meta.cotLines.map((line, idx) => (
                          <p
                            key={line}
                            style={{
                              margin: "0 0 8px 0",
                              fontSize: 13,
                              lineHeight: 1.9,
                              color: "#C8C8C8",
                              opacity: cotShown > idx ? 1 : 0,
                              transform: cotShown > idx ? "translateY(0)" : "translateY(6px)",
                              transition:
                                "opacity 0.4s ease, transform 0.4s ease"
                            }}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>

              {/* Result code + diff */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  opacity: resultLayerOpacity,
                  transition: "opacity 0.5s ease",
                  pointerEvents: phase === "result" ? "auto" : "none"
                }}
              >
                <div
                  className="strike-demo-hide-scroll"
                  style={{
                    ...panelScroll,
                    flex: 1,
                    padding: 12,
                    position: "relative"
                  }}
                >
                  <div style={{ position: "relative" }}>
                    {phase === "apply_success"
                      ? null
                      : meta.lines.map((line, idx) => {
                          const n = idx + 1;
                          const isBug = n === HIGHLIGHT_LINE;
                          return (
                            <div
                              key={`${n}-${line.slice(0, 8)}`}
                              style={{
                                position: isBug ? "relative" : undefined,
                                display: "flex",
                                flexWrap: "wrap",
                                fontSize: 13,
                                lineHeight: 1.9,
                                background: isBug
                                  ? "rgba(200,16,46,0.22)"
                                  : "transparent",
                                borderLeft: isBug
                                  ? "3px solid #C8102E"
                                  : "3px solid transparent",
                                paddingLeft: 6,
                                transition:
                                  "background 0.35s ease, border-color 0.35s ease"
                              }}
                            >
                              <span
                                style={{
                                  width: 36,
                                  flexShrink: 0,
                                  color: isBug ? "#FF6B6B" : "#666",
                                  userSelect: "none",
                                  textAlign: "right",
                                  paddingRight: 10
                                }}
                              >
                                {n}
                              </span>
                              <pre
                                style={{
                                  margin: 0,
                                  flex: 1,
                                  minWidth: 0,
                                  whiteSpace: "pre-wrap",
                                  wordBreak: "break-word",
                                  fontFamily: "inherit",
                                  fontSize: 13,
                                  lineHeight: 1.9
                                }}
                              >
                                {highlightPythonTokens(line)}
                              </pre>
                              {isBug && phase === "result" ? (
                                <div
                                  style={{
                                    flexBasis: "100%",
                                    marginTop: 8,
                                    marginLeft: 46,
                                    background: "#1E1E1E",
                                    border: "1px solid #C8102E",
                                    color: "#E8E8E8",
                                    padding: "8px 10px",
                                    borderRadius: 6,
                                    fontSize: 13,
                                    lineHeight: 1.9,
                                    maxWidth: "min(100%, 320px)",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                                    ...proseStyle,
                                    opacity: 1,
                                    transition: "opacity 0.5s ease"
                                  }}
                                >
                                  {meta.tooltip}
                                </div>
                              ) : null}
                            </div>
                          );
                        })}
                  </div>
                  {phase === "result" ? (
                    <pre
                      style={{
                        margin: "12px 0 0 0",
                        padding: 12,
                        background: "#111",
                        borderRadius: 8,
                        border: "1px solid #252525",
                        color: "#9AD59A",
                        whiteSpace: "pre-wrap",
                        fontSize: 13,
                        lineHeight: 1.9,
                        transition: "opacity 0.5s ease"
                      }}
                    >
                      {meta.diff}
                    </pre>
                  ) : null}
                </div>
              </div>

              {/* Success */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  opacity: successOpacity,
                  transition: "opacity 0.5s ease",
                  pointerEvents: phase === "apply_success" ? "auto" : "none",
                  background: "#0D0D0D"
                }}
              >
                {phase === "apply_success" ? (
                  <>
                    <p
                      style={{
                        ...proseStyle,
                        color: "#6FD996",
                        fontSize: 13,
                        lineHeight: 1.9,
                        margin: "0 0 16px 0",
                        textAlign: "center",
                        transition: "opacity 0.5s ease"
                      }}
                    >
                      ✓ Fix applied · backup saved
                    </p>
                    <button
                      type="button"
                      onClick={cancelApply}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "1px solid #2E5A3E",
                        background: "rgba(111,217,150,0.12)",
                        color: "#6FD996",
                        cursor: "pointer",
                        fontSize: 13,
                        lineHeight: 1.9,
                        transition: "opacity 0.25s, transform 0.2s"
                      }}
                    >
                      Undo
                    </button>
                    <div
                      className="strike-demo-hide-scroll"
                      style={{
                        ...panelScroll,
                        marginTop: 20,
                        width: "100%",
                        maxHeight: 200,
                        padding: 12,
                        background: "#0A0F0C",
                        borderRadius: 8,
                        border: "1px solid #1E3D2A"
                      }}
                    >
                      {meta.appliedSnippet.map((line) => (
                        <div
                          key={line}
                          style={{
                            fontSize: 13,
                            lineHeight: 1.9,
                            color: "#7DDA9A"
                          }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <footer
          style={{
            height: 28,
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            background: "#C8102E",
            color: "#F8F8F8",
            padding: "0 14px",
            fontSize: 12,
            lineHeight: 1.9,
            fontFamily: "var(--font-inter), system-ui, sans-serif"
          }}
        >
          Strike · verified patch · local workspace
        </footer>
      </div>
      </div>
    </>
  );
}
