export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce">🌿</div>
        <div className="text-amber-600 font-semibold text-lg">Loading...</div>
        <div className="text-stone-400 text-sm mt-1">Fetching product details</div>
      </div>
    </div>
  );
}
