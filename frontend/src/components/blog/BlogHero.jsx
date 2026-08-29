import { Sparkles } from "lucide-react";

// Blog hero — rounded card with an eyebrow, headline and description.
const BlogHero = () => (
  <section className="blog-hero-card" aria-label="Innobles blog introduction">
    <p className="blog-eyebrow">
      <Sparkles size={13} className="mr-1.5" aria-hidden="true" />
      INNOBLES BLOG
    </p>
    <h1 className="blog-hero-title">
      Insights, Stories, and Ideas from Our <span className="text-[#F59E0B]">Team</span>
    </h1>
    <p className="blog-hero-desc">
     Recent thinking, product updates, engineering lessons and company stories from
the Innobles team.
    </p>
  </section>
);

export default BlogHero;