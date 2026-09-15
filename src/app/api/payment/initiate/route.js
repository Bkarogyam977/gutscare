import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.arogyamission.com/erp-api";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { order_id, amount, email, mobile } = body;
  if (!order_id || !amount) {
    return NextResponse.json(
      { error: "Missing order_id or amount" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${BASE_URL}/payment-order-icici/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        TxnRefNo: `orderId${order_id}`,
        Amount: Math.round(amount),
        OrderInfo: order_id,
        Email: email || "",
        Phone: mobile || "",
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ success: true, ...data });
    }

    const errText = await res.text().catch(() => "");
    console.error("ICICI payment initiate error:", res.status, errText);
    return NextResponse.json(
      { error: "Failed to initiate payment. Please try again." },
      { status: 502 }
    );
  } catch (err) {
    console.error("Payment initiation error:", err);
    return NextResponse.json({ error: "Network error." }, { status: 500 });
  }
}
