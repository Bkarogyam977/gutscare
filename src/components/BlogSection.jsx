import { getImageUrl, formatDate } from "@/lib/utils";

export default function BlogSection({ blogs }) {
  const blog = blogs[0];
  if (!blog) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Health Insights
          </span>
          <h2 className="text-3xl font-bold text-stone-900 mt-2">
            Related Articles
          </h2>
        </div>

        <div className="max-w-2xl mx-auto bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
          {blog.featured_image && (
            <div className="aspect-video overflow-hidden bg-stone-200">
              <img
                src={getImageUrl(blog.featured_image)}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="text-xs text-amber-600 font-medium mb-2">
              {formatDate(blog.created_on)}
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3 leading-tight">
              {blog.title}
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
              {blog.meta_description}
            </p>
            <a
              href={`https://bkarogyam.com/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4 text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
            >
              Read Full Article →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
