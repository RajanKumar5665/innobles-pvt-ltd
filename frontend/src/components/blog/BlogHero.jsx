import { Sparkles } from "lucide-react";

/**
 * Blog hero — a single rounded card with an orange eyebrow,
 * headline (with the word "Team" highlighted) and description.
 */
const BlogHero = () => (
  <section className="blog-hero-card" aria-label="Innobles blog introduction">
    <p className="blog-eyebrow">
      <Sparkles size={13} className="mr-1.5" aria-hidden="true" />
      ACE BLOG
    </p>
    <h1 className="blog-hero-title">
      Insights, Stories, and Ideas from Our <span className="text-[#F59E0B]">Team</span>
    </h1>
    <p className="blog-hero-desc">
      Explore recent thinking, product updates, engineering lessons, and company stories from the Innobles team.
    </p>
  </section>
);

export default BlogHero;