"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-amber-50 px-4">
      <div className="text-5xl mb-2">⚠️</div>
      <h2 className="text-xl font-bold text-stone-900">Something went wrong</h2>
      <p className="text-stone-500 text-sm text-center max-w-sm">
        {error?.message || "Failed to load product. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
