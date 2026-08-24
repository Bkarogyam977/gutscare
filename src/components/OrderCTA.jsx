"use client";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

export default function OrderCTA({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleOrderOnline = () => {
    addToCart(product, 1);
    router.push("/checkout");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-500 to-amber-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Ready to Experience the Difference?
        </h2>
        <p className="text-amber-100 text-base mb-2 font-medium">
          {product.name}
        </p>
        <p className="text-white/80 mb-10 max-w-xl mx-auto">
          Start your {product.duration}-{product.duration_type} wellness journey
          today. Just {formatPrice(product.retail_with_tax)} for a healthier,
          more energetic you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleOrderOnline}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-amber-600 hover:bg-amber-50 font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl text-lg"
          >
            <ShoppingCartOutlined style={{ fontSize: 24 }} />
            Order Online
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-amber-100 text-sm">
          <span>Cash on Delivery Available</span>
          <span>Free Shipping</span>
          <span>100% Authentic</span>
        </div>
      </div>
    </section>
  );
}

