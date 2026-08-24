const badges = [
  { icon: "🌿", label: "100% Natural", sub: "No artificial additives" },
  { icon: "🏔️", label: "Himalayan Origin", sub: "Sourced from pure mountains" },
  { icon: "🧪", label: "Lab Tested", sub: "Quality verified" },
  { icon: "🚀", label: "Fast Delivery", sub: "Pan India shipping" },
  { icon: "🛡️", label: "Safe & Certified", sub: "Ayurvedic formulation" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-stone-100 bg-stone-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <div className="text-sm font-semibold text-stone-800">{b.label}</div>
                <div className="text-xs text-stone-500">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
