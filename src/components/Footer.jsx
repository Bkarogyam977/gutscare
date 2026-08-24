"use client";
import { useTenant } from "@/providers/TenantProvider";

export default function Footer() {
  const { phone, whatsapp, display_phone } = useTenant();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://bkarogyam.com/favicon.ico"
                alt="BK Arogyam"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-white font-bold">BK Arogyam</div>
                <div className="text-xs text-amber-400">Natural Health Store</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Bringing the best of nature's healing wisdom to your doorstep.
              Authentic Ayurvedic products for a healthier life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#benefits" className="hover:text-amber-400 transition-colors">Benefits</a></li>
              <li><a href="#how-to-use" className="hover:text-amber-400 transition-colors">How to Use</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews</a></li>
              <li><a href="#order" className="hover:text-amber-400 transition-colors">Order Now</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:+${phone}`} className="hover:text-amber-400 transition-colors">
                  📞 {display_phone}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  💬 WhatsApp Us
                </a>
              </li>
              <li>
                <a href="https://bkarogyam.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  🌐 bkarogyam.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© {year} BK Arogyam. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
