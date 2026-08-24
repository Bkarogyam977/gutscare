import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://healdiway.bkarogyam.com/erp-api";

async function getOrderStatusId() {
  try {
    const res = await fetch(`${BASE_URL}/inv_order_status/`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const statuses = await res.json();
      const pending =
        statuses.find((s) => s.name?.toLowerCase().includes("pending")) ||
        statuses[0];
      return pending?.id || 1;
    }
  } catch {}
  return 1;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const required = [
    "name", "mobile", "building", "street",
    "city", "state", "pincode",
    "payment_method", "items", "total_amount", "delivery_charge",
  ];
  for (const field of required) {
    if (body[field] === undefined || body[field] === null || body[field] === "") {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  const orderStatusId = await getOrderStatusId();

  const addressdata = {
    fullname: body.name,
    mobile: body.mobile,
    building: body.building,
    street: body.street,
    city: body.city,
    state: body.state,
    pincode: body.pincode,
  };

  const cart_list = body.items.map((item) => ({
    id: item.product_id,
    name: item.product_name,
    price: Math.round(item.unit_price),
    mrp: Math.round(item.mrp ?? item.unit_price),
    quantity: item.qty,
  }));

  const order_data = {
    store_name: body.store_name || "Agency_seabuckthorn",
    first_name: body.name,
    email: body.email || "",
    mobile: body.mobile,
    total: Math.round(body.total_amount),
    deliverycharge: body.delivery_charge,
    order_status_id: orderStatusId,
    payment_method: body.payment_method,
    accept_language: "English",
    currency_code: "Rs",
    shipping_city: body.city,
    shipping_firstname: body.name,
    shipping_address1: `${body.building}, ${body.street}`,
    shipping_postcode: body.pincode,
    shipping_zone: body.state,
  };

  try {
    const res = await fetch(
      `${BASE_URL}/inv_order_product/bulkorderproductWithoutCart/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addressdata, cart_list, order_data }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        success: true,
        order_id: data.id ?? data.order_id,
        order: data,
      });
    }

    const errText = await res.text().catch(() => "");
    console.error("ERP order error:", res.status, errText);
    return NextResponse.json(
      { error: "Failed to place order. Please try again." },
      { status: 502 }
    );
  } catch (err) {
    console.error("Order submission error:", err);
    return NextResponse.json(
      { error: "Network error. Please try again." },
      { status: 500 }
    );
  }
}
