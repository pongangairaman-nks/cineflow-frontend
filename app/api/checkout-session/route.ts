import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia"
});

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "amazon_pay"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: body.name
            },
            unit_amount: body.price * 100
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${body.origin}/success`,
      cancel_url: `${body.origin}/cancel`
    });
    return NextResponse.json({ id: session.id });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}