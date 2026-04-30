import { NextResponse } from "next/server";
import { deliverWaitlist } from "@/lib/waitlist-delivery";
import { buildWaitlistPayload } from "@/lib/waitlist";

type WaitlistRequestBody = {
  email?: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as WaitlistRequestBody;
    const email = body.email ?? "";
    const payload = buildWaitlistPayload(email);

    await deliverWaitlist(payload);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Invalid email address.") {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    if (error instanceof Error && error.message.includes("configuration")) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { ok: false, error: "Failed to submit waitlist request." },
      { status: 500 }
    );
  }
}
