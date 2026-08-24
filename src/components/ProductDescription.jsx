import { getImageUrl } from "@/lib/utils";

const nutrients = [
  {
    label: "Triphala",
    sub: "Digestion & Cleanse",
    value: "Regulates bowel & detoxifies",
    icon: "🌿",
    color: "bg-green-50 border-green-200",
  },
  {
    label: "Ajwain & Hing",
    sub: "Gas & Bloating Relief",
    value: "Expels gas, eases cramps",
    icon: "💨",
    color: "bg-blue-50 border-blue-200",
  },
  {
    label: "Jeera & Pudina",
    sub: "Acidity & Appetite",
    value: "Cools acid, boosts appetite",
    icon: "🍃",
    color: "bg-amber-50 border-amber-200",
  },
  {
    label: "Natural Herbs",
    sub: "Gut Balance & Function",
    value: "Safe, effective, Ayurvedic",
    icon: "⚗️",
    color: "bg-purple-50 border-purple-200",
  },
];

export default function ProductDescription({ product }) {
  return (
    <section className="py-16 bg-amber-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
              About the Product
            </span>
            <h2 className="text-3xl font-bold text-stone-900 mt-2 mb-6">
              NUTRIVEDA GutCare — Ayurvedic Gut Balance & Function
            </h2>
            <div
              className="prose-description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            <div className="mt-6 space-y-3">
              {[
                {
                  label: "Key Herbs",
                  value: "Triphala, Mulethi, Shatavari, Haritaki",
                },
                { label: "Form", value: "30-Day Ayurvedic Package" },
                { label: "Preservation", value: "No artificial additives" },
                {
                  label: "Duration",
                  value: "30 Days Course",
                },
                {
                  label: "Manufacturer",
                  value: product.manufacturer_data?.name || "—",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="text-amber-700 font-semibold text-sm min-w-28">
                    {item.label}:
                  </span>
                  <span className="text-stone-700 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrient cards */}
          <div className="grid grid-cols-2 gap-4">
            {nutrients.map((item) => (
              <div
                key={item.label}
                className={`${item.color} border rounded-2xl p-5 flex flex-col gap-2`}
              >
                <div className="text-3xl">{item.icon}</div>
                <div className="font-bold text-stone-900 text-base">
                  {item.label}
                </div>
                <div className="text-xs text-stone-500">{item.sub}</div>
                <div className="text-xs font-semibold text-amber-700 mt-auto">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
