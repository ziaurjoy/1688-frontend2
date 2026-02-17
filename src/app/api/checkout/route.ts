import { NextResponse } from "next/server";
import Stripe from "stripe";

// 1. Initialize Stripe once outside the handler
// Use the environment variable for security
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia", // Use the latest API version
});

export async function POST(req: Request) {
  try {
    // 2. Extract priceId from the request body
    const { priceId } = await req.json();
    console.log("Received checkout request with priceId:", stripe);
    // 3. Create the session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Your recurring price ID
          quantity: 1,
        },
      ],
      mode: "subscription", // <--- CHANGE THIS FROM "payment"
      // success_url: `${req.headers.get("origin")}/success`,
      // cancel_url: `${req.headers.get("origin")}/cancel`,
      // success_url: `${req.headers.get("origin")}/package`,
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/package`,
    });

    console.log("Stripe session created successfully:", session.id);

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe API Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
