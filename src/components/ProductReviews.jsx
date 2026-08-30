"use client";

import { useState, useEffect, useCallback } from "react";
import { PRODUCT_ID } from "@/lib/api";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://healdiway.bkarogyam.com/erp-api";

const STAR_LABELS = ["Terrible", "Poor", "Okay", "Good", "Excellent"];

/* ─── helpers ─── */

function StarDisplay({ value, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 20 20"
          fill={s <= value ? "#f59e0b" : "none"}
          stroke={s <= value ? "#f59e0b" : "#d6d3d1"}
          strokeWidth="1.5">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.062 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

/* ─── modal ─── */

function ReviewModal({ productId, onClose, onDone }) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [done, setDone] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!rating) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`${BASE_URL}/inv_product_review/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: author.trim(),
          text: text.trim(),
          rating,
          status: true,
          product_id: Number(productId),
        }),
      });
      if (!res.ok) throw new Error("Failed to submit. Try again.");
      setDone(true);
      onDone();
      setTimeout(onClose, 1800);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  const active = hover || rating;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h3 className="text-base font-semibold text-stone-900">Write a Review</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <svg width={18} height={18} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center gap-2 py-12">
            <span className="text-3xl">✅</span>
            <p className="font-semibold text-stone-800">Review submitted!</p>
            <p className="text-sm text-stone-500">Thank you for your feedback.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 py-5 space-y-4">
            {/* stars */}
            <div>
              <p className="text-sm font-medium text-stone-700 mb-2">Rating <span className="text-red-500">*</span></p>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} type="button"
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}>
                    <svg width={32} height={32} viewBox="0 0 20 20"
                      fill={s <= active ? "#f59e0b" : "none"}
                      stroke={s <= active ? "#f59e0b" : "#d6d3d1"}
                      strokeWidth="1.5">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.062 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                    </svg>
                  </button>
                ))}
                {active > 0 && (
                  <span className="ml-2 text-sm text-amber-600 font-medium">
                    {STAR_LABELS[active - 1]}
                  </span>
                )}
              </div>
            </div>

            {/* name */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Name <span className="text-red-500">*</span></label>
              <input required value={author} onChange={e => setAuthor(e.target.value)}
                placeholder="Your name"
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>

            {/* text */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Review <span className="text-red-500">*</span></label>
              <textarea required rows={4} value={text} onChange={e => setText(e.target.value)}
                placeholder="Share your experience…"
                className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
            </div>

            {err && <p className="text-red-600 text-sm">{err}</p>}

            <div className="flex gap-3">
              <button type="button" onClick={onClose}
                className="flex-1 py-2.5 rounded-lg border border-stone-200 text-sm font-semibold text-stone-600 hover:bg-stone-50">
                Cancel
              </button>
              <button type="submit" disabled={busy || !rating}
                className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
                {busy ? "Submitting…" : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─── cards ─── */

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-100 animate-pulse">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-stone-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-stone-200 rounded w-1/3" />
          <div className="h-3 bg-stone-200 rounded w-1/4" />
          <div className="h-3 bg-stone-200 rounded w-full" />
          <div className="h-3 bg-stone-200 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">
          {review.author?.[0]?.toUpperCase() ?? "?"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-semibold text-stone-900 text-sm">{review.author}</span>
            <span className="text-xs text-stone-400 shrink-0">{formatDate(review.created_at)}</span>
          </div>
          <div className="mb-2"><StarDisplay value={review.rating} size={13} /></div>
          <p className="text-stone-600 text-sm leading-relaxed">{review.text}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── main ─── */

export default function ProductReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/inv_product_review/?product_id=${PRODUCT_ID}`);
      if (!res.ok) throw new Error(`Failed: ${res.statusText}`);
      const data = await res.json();
      setReviews([...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (e) {
      setError(e.message || "Failed to load reviews.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <section id="reviews" className="py-16 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── header with always-visible button ── */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-amber-600 font-semibold text-xs uppercase tracking-wider">Customer Reviews</span>
            <h2 className="text-3xl font-bold text-stone-900 mt-1">What Our Customers Say</h2>
          </div>
          <button
            onClick={() => setModal(true)}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            + Write a Review
          </button>
        </div>

        {/* rating summary */}
        {!isLoading && reviews.length > 0 && (
          <div className="flex items-center gap-4 mb-8 bg-white rounded-2xl px-6 py-4 border border-stone-100 shadow-sm max-w-xs">
            <div className="text-5xl font-bold text-stone-900">{avg.toFixed(1)}</div>
            <div>
              <StarDisplay value={Math.round(avg)} size={20} />
              <p className="text-stone-500 text-sm mt-1">{reviews.length} reviews</p>
            </div>
          </div>
        )}

        {/* loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        )}

        {/* error */}
        {!isLoading && error && (
          <div className="flex flex-col items-center gap-3 py-10">
            <p className="text-red-600 text-sm">{error}</p>
            <button onClick={fetchReviews}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold">
              Try Again
            </button>
          </div>
        )}

        {/* empty */}
        {!isLoading && !error && reviews.length === 0 && (
          <p className="text-center text-stone-500 text-sm py-10">No reviews yet. Be the first!</p>
        )}

        {/* reviews grid */}
        {!isLoading && !error && reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        )}
      </div>

      {modal && (
        <ReviewModal
          productId={PRODUCT_ID}
          onClose={() => setModal(false)}
          onDone={fetchReviews}
        />
      )}
    </section>
  );
}
