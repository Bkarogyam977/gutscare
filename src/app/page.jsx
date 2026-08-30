import { getProduct, getReviews } from "@/lib/api";
import Navbar from "@/components/Navbar";
import ProductHero from "@/components/ProductHero";
import TrustBadges from "@/components/TrustBadges";
import BenefitsSection from "@/components/BenefitsSection";
import ProductDescription from "@/components/ProductDescription";
import HowToUse from "@/components/HowToUse";
import ProductReviews from "@/components/ProductReviews";
import BlogSection from "@/components/BlogSection";
import OrderCTA from "@/components/OrderCTA";
import Footer from "@/components/Footer";

export default async function HomePage() {
  const [product, reviews] = await Promise.all([getProduct(), getReviews()]);

  const activeReviews = reviews.filter((r) => r.status);
  const avgRating =
    activeReviews.length > 0
      ? activeReviews.reduce((sum, r) => sum + r.rating, 0) / activeReviews.length
      : 0;

  return (
    <main className="min-h-screen">
      <Navbar />
      <ProductHero
        product={product}
        avgRating={avgRating}
        reviewCount={activeReviews.length}
      />
      <TrustBadges />
      <BenefitsSection />
      <ProductDescription product={product} />
      <HowToUse product={product} />
      <ProductReviews />
      {product.blogs_data?.length > 0 && (
        <BlogSection blogs={product.blogs_data} />
      )}
      <OrderCTA product={product} />
      <Footer />
    </main>
  );
}
