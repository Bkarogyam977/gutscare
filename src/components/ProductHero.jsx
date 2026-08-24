"use client";
import { useState } from "react";
import { Rate, InputNumber } from "antd";
import {
  CheckCircleFilled,
  ShoppingCartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { getImageUrl, formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function ProductHero({ product, avgRating, reviewCount }) {
  // Combine thumbnail + image_data sorted by sort_order
  const images = [
    product.thumbnail,
    ...product.image_data
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img) => img.image),
  ].filter(Boolean);

  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    router.push("/checkout");
  };

  const taxDetails = product.hsn_data?.taxes_data
    ?.map((t) => `${t.name} ${t.tax_value}%`)
    .join(" + ");

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ---- Image Gallery ---- */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-amber-100">
              {product.new && (
                <div className="absolute top-4 left-4 z-10 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  NEW
                </div>
              )}
              {images[selectedImg] ? (
                <img
                  src={getImageUrl(images[selectedImg])}
                  alt={product.name}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-amber-50 text-amber-400">
                  <div className="text-center">
                    <div className="text-7xl mb-2">🌿</div>
                    <div className="text-sm">Product Image</div>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                      selectedImg === i
                        ? "border-amber-500 shadow-md scale-105"
                        : "border-stone-200 hover:border-amber-300"
                    }`}
                  >
                    {img ? (
                      <img
                        src={getImageUrl(img)}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl text-amber-300">
                        🌿
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---- Product Info ---- */}
          <div className="flex flex-col gap-5">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                <CheckCircleFilled /> 100% Natural
              </span>
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                🌿 30-Day Package
              </span>
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                ✓ Lab Tested
              </span>
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              {product.name}
            </h1>

            {/* Star rating */}
            {reviewCount > 0 && (
              <div className="flex items-center gap-2">
                <Rate disabled value={avgRating} allowHalf style={{ fontSize: 16 }} />
                <span className="text-stone-600 text-sm font-medium">
                  {avgRating.toFixed(1)} ({reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Short description */}
            <div
              className="prose-description text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />

            {/* Price block */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-amber-600">
                  {formatPrice(product.retail_with_tax)}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs">
                <span className="text-stone-500">
                  Incl. all taxes {taxDetails ? `(${taxDetails})` : ""}
                </span>
                <span className="text-green-600 font-medium">
                  Free Delivery on Prepaid
                </span>
              </div>
            </div>

            {/* Key nutrients */}
            <div className="flex flex-wrap gap-2">
              {["Triphala", "Mulethi", "Shatavari", "Haritaki", "Amla", "Digestive Herbs"].map(
                (n) => (
                  <span
                    key={n}
                    className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full font-medium"
                  >
                    {n}
                  </span>
                )
              )}
            </div>

            {/* Quantity + CTA */}
            <div id="order" className="flex flex-col gap-3 pt-1">
              {/* Quantity selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-stone-600">Qty:</span>
                <InputNumber
                  min={1}
                  max={10}
                  value={qty}
                  onChange={(val) => setQty(val || 1)}
                  style={{ width: 80 }}
                />
              </div>
              {/* Primary cart buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  <ShoppingCartOutlined style={{ fontSize: 20 }} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  <ThunderboltOutlined style={{ fontSize: 18 }} />
                  Buy Now
                </button>
              </div>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400 pt-1 border-t border-stone-100">
              <span>
                Manufacturer:{" "}
                <span className="text-stone-600 font-medium">
                  {product.manufacturer_data?.name}
                </span>
              </span>
              <span>
                SKU:{" "}
                <span className="font-mono text-stone-600">{product.id}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
