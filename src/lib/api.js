const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://healdiway.bkarogyam.com/erp-api";

export const PRODUCT_ID = Number(process.env.NEXT_PUBLIC_PRODUCT_ID) || 15371;

export async function getProduct() {
  const res = await fetch(`${BASE_URL}/inventory_item/${PRODUCT_ID}/`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch product: ${res.statusText}`);
  return res.json();
}

export async function getReviews() {
  try {
    const res = await fetch(
      `${BASE_URL}/inv_product_review/?product_id=${PRODUCT_ID}`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
