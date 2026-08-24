"use client";
import { useState } from "react";
import { MenuOutlined, CloseOutlined, PhoneOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useCart } from "@/context/CartContext";
import { useTenant } from "@/providers/TenantProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems, setDrawerOpen } = useCart();
  const { phone, display_phone } = useTenant();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://bkarogyam.com/favicon.ico"
              alt="BK Arogyam"
              className="w-10 h-10 rounded-full object-cover shadow-md"
            />
            <div>
              <div className="font-bold text-stone-900 text-sm leading-tight">BK Arogyam</div>
              <div className="text-xs text-amber-600 leading-tight">Natural Health Store</div>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#benefits" className="text-stone-600 hover:text-amber-600 text-sm font-medium transition-colors">
              Benefits
            </a>
            <a href="#how-to-use" className="text-stone-600 hover:text-amber-600 text-sm font-medium transition-colors">
              How to Use
            </a>
            <a href="#reviews" className="text-stone-600 hover:text-amber-600 text-sm font-medium transition-colors">
              Reviews
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:+${phone}`}
              className="hidden sm:flex items-center gap-1.5 text-stone-600 hover:text-amber-600 text-sm transition-colors"
            >
              <PhoneOutlined />
              <span>Call Us</span>
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative p-2 text-stone-600 hover:text-amber-600 transition-colors"
              aria-label="Open cart"
            >
              <Badge count={totalItems} size="small" color="#d97706">
                <ShoppingCartOutlined style={{ fontSize: 22 }} />
              </Badge>
            </button>
            <a
              href="#order"
              className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              Order Now
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-stone-600 hover:text-amber-600 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <CloseOutlined style={{ fontSize: 18 }} /> : <MenuOutlined style={{ fontSize: 18 }} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-amber-100 bg-white px-4 py-3 space-y-1">
          <a href="#benefits" onClick={() => setOpen(false)} className="block py-2.5 text-stone-600 hover:text-amber-600 text-sm font-medium">
            Benefits
          </a>
          <a href="#how-to-use" onClick={() => setOpen(false)} className="block py-2.5 text-stone-600 hover:text-amber-600 text-sm font-medium">
            How to Use
          </a>
          <a href="#reviews" onClick={() => setOpen(false)} className="block py-2.5 text-stone-600 hover:text-amber-600 text-sm font-medium">
            Reviews
          </a>
          <a href="#order" onClick={() => setOpen(false)} className="block py-2.5 text-amber-600 font-semibold text-sm">
            Order Now →
          </a>
        </div>
      )}
    </nav>
  );
}
