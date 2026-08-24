"use client";
import { Rate } from "antd";
import { formatDate } from "@/lib/utils";

function ReviewCard({ review }) {
  const initials = review.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-semibold text-stone-900 text-sm">
              {review.author}
            </span>
            <span className="text-xs text-stone-400 flex-shrink-0">
              {formatDate(review.created_at)}
            </span>
          </div>
          <Rate
            disabled
            value={review.rating}
            style={{ fontSize: 12 }}
            className="mb-2"
          />
          <p className="text-stone-600 text-sm leading-relaxed">{review.text}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection({ reviews, avgRating }) {
  const active = reviews.filter((r) => r.status);
  if (active.length === 0) return null;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: active.filter((r) => r.rating === star).length,
  }));
  const maxCount = Math.max(...ratingCounts.map((r) => r.count), 1);

  return (
    <section id="reviews" className="py-16 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-2 mb-4">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating summary */}
          <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm flex flex-col items-center justify-center gap-4">
            <div className="text-6xl font-bold text-stone-900">
              {avgRating.toFixed(1)}
            </div>
            <Rate disabled value={avgRating} allowHalf style={{ fontSize: 24 }} />
            <div className="text-stone-500 text-sm">
              {active.length} verified reviews
            </div>

            {/* Rating breakdown bars */}
            <div className="w-full space-y-2 mt-2">
              {ratingCounts.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="text-stone-500 w-3 text-right text-xs">
                    {star}
                  </span>
                  <span className="text-amber-400 text-xs">★</span>
                  <div className="flex-1 bg-stone-100 rounded-full h-2">
                    <div
                      className="bg-amber-400 h-2 rounded-full transition-all"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-stone-400 text-xs w-4">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {active.slice(0, 4).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
