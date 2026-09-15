import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.arogyamission.com/erp-api";

const ADDRESS_API_URL = "https://healdiway.bkarogyam.com/erp-api/inv_customeraddress/";

async function saveCustomerAddress({ name, mobile, building, street, city, state, pincode, customerId }) {
  try {
    const res = await fetch(ADDRESS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: name,
        mobile,
        country: 1,
        country_name: "India",
        state,
        city,
        pincode,
        building,
        street,
        customer_id: customerId,
        is_default: true,
      }),
    });
    const data = await res.json().catch(() => ({}));
    console.log("=== ADDRESS SAVE ===", res.status, JSON.stringify(data));
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Address save network error:", err);
    return { ok: false, data: {} };
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, mobile, email, building, street, city, state, pincode } = body;

  try {
    const res = await fetch(`${BASE_URL}/patients/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: `${building}, ${street}`,
        pincode,
        country: 1,
        file_enable: true,
        file_count: 10,
        user: {
          first_name: name,
          mobile,
          email: email || "",
        },
        practices: [{ practice: 5 }],
        is_age: false,
        is_active: true,
      }),
    });

    const data = await res.json().catch(() => ({}));

    console.log("=== PATIENT CREATE ===");
    console.log("Status:", res.status);
    console.log("Response:", JSON.stringify(data, null, 2));

    if (res.ok) {
      // Patient created — save address using the new patient's ID
      if (data.id) {
        await saveCustomerAddress({ name, mobile, building, street, city, state, pincode, customerId: data.id });
      }
      return NextResponse.json({ success: true, patient: data });
    }

    // 400 — check if it's "already exists" (treat as success) or a real error
    if (res.status === 400) {
      const errStr = JSON.stringify(data).toLowerCase();
      const alreadyExists = errStr.includes("already") || errStr.includes("exists") || errStr.includes("unique") || errStr.includes("duplicate");
      if (alreadyExists) {
        console.log("Patient already exists — continuing");
        // No customer_id available from error response; address save skipped
        return NextResponse.json({ success: true, patient: data });
      }
      console.error("Patient create validation error:", JSON.stringify(data));
      return NextResponse.json(
        { error: "Failed to save address. Please check your details.", debug: data },
        { status: 400 }
      );
    }

    console.error("Patient create error:", res.status, JSON.stringify(data));
    return NextResponse.json(
      { error: "Failed to save address. Please try again." },
      { status: 502 }
    );
  } catch (err) {
    console.error("Patient create network error:", err);
    return NextResponse.json({ error: "Network error. Please try again." }, { status: 500 });
  }
}
