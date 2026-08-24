const IMAGE_BASE =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
  "https://healdiway.bkarogyam.com/media/";

export function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // Encode each segment to handle spaces/colons in datetime folder names
  const encoded = path
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return IMAGE_BASE + encoded;
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
