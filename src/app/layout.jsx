import { headers } from "next/headers";
import { Geist } from "next/font/google";
import "./globals.css";
import AntdProvider from "@/providers/AntdProvider";
import { TenantProvider } from "@/providers/TenantProvider";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import PixelScripts from "@/components/PixelScripts";
import { getTenantConfig } from "@/config/tenants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const baseMetadata = {
  title: "NUTRIVEDA GutCare Capsule | Ayurvedic Gut Health | BK Arogyam",
  description:
    "NUTRIVEDA GutCare Capsule – Ayurvedic herbal nutrition with Triphala, Ajwain, Jeera, Pudina, Hing & more. Supports healthy digestion, relieves gas, acidity, bloating & constipation. Order now.",
  keywords:
    "gutcare capsule, gut health, ayurvedic digestion, triphala ajwain jeera pudina hing, gas relief, acidity relief, constipation, bloating, nutriveda, BK Arogyam",
  openGraph: {
    title: "NUTRIVEDA GutCare Capsule | Ayurvedic Gut Health | BK Arogyam",
    description:
      "Ayurvedic herbal capsule with Triphala, Ajwain, Jeera, Pudina & Hing. Supports gut balance, digestion, and relieves gas, acidity & bloating.",
    type: "website",
  },
};

export async function generateMetadata() {
  const headersList = await headers();
  const slug = headersList.get("x-tenant-slug") || "default";
  const tenant = getTenantConfig(slug);

  return {
    ...baseMetadata,
    ...(tenant.facebook_domain_verification && {
      other: {
        "facebook-domain-verification": tenant.facebook_domain_verification,
      },
    }),
  };
}

export default async function RootLayout({ children }) {
  // Read subdomain slug injected by middleware
  const headersList = await headers();
  const slug = headersList.get("x-tenant-slug") || "default";
  const tenant = getTenantConfig(slug);

  return (
    <html lang="en" className={`${geistSans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <AntdProvider>
          <TenantProvider config={tenant}>
            <CartProvider>
              <PixelScripts pixels={tenant.pixels} />
              <CartDrawer />
              {children}
            </CartProvider>
          </TenantProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
