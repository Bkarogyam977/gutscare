const benefits = [
  {
    icon: "🌿",
    title: "Supports Healthy Digestion",
    description:
      "Triphala and Jeera stimulate digestive enzymes and promote smooth, efficient digestion after every meal.",
    color: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
  },
  {
    icon: "💨",
    title: "Relieves Gas & Bloating",
    description:
      "Hing (Asafoetida) and Ajwain quickly expel trapped gas and relieve uncomfortable bloating and heaviness.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: "🔥",
    title: "Helps with Acidity",
    description:
      "Pudina and cooling Ayurvedic herbs neutralise excess stomach acid and provide fast relief from heartburn.",
    color: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    icon: "🍽️",
    title: "Helps with Anorexia",
    description:
      "Jeera and digestive herbs stimulate appetite naturally, helping restore a healthy desire to eat.",
    color: "bg-pink-50 border-pink-100",
    iconBg: "bg-pink-100",
  },
  {
    icon: "🚿",
    title: "Helps Manage Constipation",
    description:
      "Triphala gently regulates bowel movements, softens stools, and keeps the colon clean without dependency.",
    color: "bg-red-50 border-red-100",
    iconBg: "bg-red-100",
  },
  {
    icon: "🛡️",
    title: "Safe & Effective Gut Support",
    description:
      "100% natural Ayurvedic herbal nutrition — no harsh chemicals, no side effects. Safe for daily long-term use.",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Why GutCare Capsule?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-2 mb-4">
            Supports Gut Balance & Function Naturally
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            NUTRIVEDA GutCare Capsule by BK AROGYAM combines time-tested
            Ayurvedic herbs — Triphala, Ajwain, Jeera, Pudina, Hing & more —
            to restore your digestive health from within.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className={`${benefit.color} border rounded-2xl p-6 hover:shadow-md transition-shadow`}
            >
              <div
                className={`${benefit.iconBg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4`}
              >
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
