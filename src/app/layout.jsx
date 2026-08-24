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

export const metadata = {
  title: "KIDNEY RAKSHAK Package 30 Days | BK Arogyam",
  description:
    "Kidney Rakshak 30-Day Ayurvedic Package – Powerful blend of Punarnava, Gokshura, Varuna & more. Supports kidney detox, stone prevention, and improved kidney function. Order now.",
  keywords:
    "kidney rakshak, kidney health package, ayurvedic kidney treatment, kidney stone remedy, punarnava gokshura, kidney detox, BK Arogyam",
  openGraph: {
    title: "KIDNEY RAKSHAK Package 30 Days | BK Arogyam",
    description:
      "30-Day Ayurvedic Kidney Care Package. Detox, stone prevention & improved kidney function with powerful herbs.",
    type: "website",
  },
};

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
