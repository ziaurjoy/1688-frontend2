// app/success/page.tsx
import Stripe from "stripe";
import { redirect } from "next/navigation";

// Initialize Stripe (This runs only on the server)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  // In Next.js 15+, searchParams is a Promise
  const params = await searchParams;
  const sessionId = params.session_id as string;

  if (!sessionId) {
    redirect("/"); // Or show an error
  }

  try {
    // Fetch the full session details securely on the server
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return (
      <div className="mx-auto max-w-2xl p-10 text-center">
        <h1 className="mb-4 text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>

        <div className="rounded-lg border bg-gray-50 p-6 text-left">
          <p>
            <strong>Status:</strong> {session.payment_status}
          </p>
          <p>
            <strong>Transaction ID:</strong> {session.id}
          </p>
          <p>
            <strong>Customer Email:</strong> {session.customer_details?.email}
          </p>
          <p className="mt-4 text-xl font-semibold">
            Total Paid: {(session.amount_total! / 100).toFixed(2)}{" "}
            {session.currency?.toUpperCase()}
          </p>
        </div>

        <a
          href="/"
          className="mt-6 inline-block rounded bg-black px-6 py-2 text-white"
        >
          Return Home
        </a>
      </div>
    );
  } catch (error) {
    return <div>Error retrieving session.</div>;
  }
}
