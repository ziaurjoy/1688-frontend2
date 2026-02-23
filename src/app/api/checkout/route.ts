import { NextResponse } from "next/server";
import Stripe from "stripe";

// 1. Initialize Stripe once outside the handler
// Use the environment variable for security
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover", // Use the latest API version
});

export async function POST(req: Request) {
  try {
    // 1. Rename 'package' to 'selectedPackage' to avoid reserved word issues
    const { package: selectedPackage } = await req.json();

    if (!selectedPackage?.stripe_id) {
      return NextResponse.json({ error: "Missing stripe_id" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: selectedPackage.stripe_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: {
        package_id: selectedPackage._id, // Data stays on the session
      },
      // IMPORTANT: Add subscription_data to ensure metadata persists on the actual subscription
      subscription_data: {
        metadata: {
          package_id: selectedPackage._id,
        },
      },
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/package`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// app/api/get-session/route.ts

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json(session);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
