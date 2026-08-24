const frequencyMap = {
  "once a day": "Once Daily",
  "twice a day": "Twice Daily",
  "three times a day": "Three Times Daily",
  "four times a day": "Four Times Daily",
};

export default function HowToUse({ product }) {
  const mealTime = product.after_food
    ? "After Meals"
    : product.before_food
    ? "Before Meals"
    : "Anytime";
  const freqLabel = frequencyMap[product.frequency] || product.frequency;

  const steps = [
    {
      step: "01",
      title: "Unbox Your Package",
      description:
        "Open the Gut Care 30-Day Package and read the included usage guide carefully.",
      icon: "📦",
    },
    {
      step: "02",
      title: `Take ${product.dosage} Dose`,
      description: `Take the prescribed ${product.dosage} dose as directed with a full glass of lukewarm water.`,
      icon: "💊",
    },
    {
      step: "03",
      title: "Consume After Food",
      description: `Take ${mealTime.toLowerCase()} for best absorption and to avoid any stomach discomfort.`,
      icon: "🍽️",
    },
    {
      step: "04",
      title: "Follow the Schedule",
      description: `Take ${freqLabel.toLowerCase()} for ${product.duration} ${product.duration_type} consistently for best results.`,
      icon: "📅",
    },
  ];

  return (
    <section id="how-to-use" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Usage Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-2 mb-4">
            How to Use
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto">
            Follow this simple daily routine to get the maximum benefits from
            the Gut Care Package.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, i) => (
            <div key={s.step} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-amber-200" />
              )}
              <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-4xl mb-4 relative z-10">
                {s.icon}
              </div>
              <div className="text-xs font-bold text-amber-600 mb-1">
                STEP {s.step}
              </div>
              <h3 className="font-bold text-stone-900 mb-2">{s.title}</h3>
              <p className="text-stone-500 text-sm">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Dosage summary card */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 sm:p-8 text-white">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: "Dosage", value: `${product.dosage} tbsp`, icon: "🥄" },
              { label: "Frequency", value: freqLabel, icon: "⏰" },
              {
                label: "Duration",
                value: `${product.duration} ${product.duration_type}`,
                icon: "📅",
              },
              { label: "Best Time", value: mealTime, icon: "🍽️" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-white/70 text-xs uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="font-bold text-base">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
