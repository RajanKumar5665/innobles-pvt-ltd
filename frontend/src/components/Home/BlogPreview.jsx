import ContentShowcase from "./ContentShowcase";
import BlogPreviewCard from "../blog/BlogPreviewCard";
import { useRecentBlogs } from "../../hooks/useRecentBlogs";

const CARD_LIMIT = 3;

/**
 * Homepage "Latest Insights / Blog Preview" section.
 *
 * Shows the 3 most-recent published blogs from the existing /blogs API (same
 * data managed through the Admin panel) inside the shared `ContentShowcase`
 * shell (centered header + staggered 3-column grid + consistent CTA).
 * "View All Blogs" navigates to the existing blog listing page (/blog), and
 * each card opens the existing blog detail route (/blog/:slug).
 * No blog system is duplicated.
 */
const BlogPreview = () => {
  const { list, status, error } = useRecentBlogs(CARD_LIMIT);

  return (
    <ContentShowcase
      sectionClassName="bg-white"
      eyebrow="Insights & Updates"
      title="Latest Insights"
      subtitle="Explore our latest ideas, insights, and updates on technology, products, and digital innovation."
      list={list}
      status={status}
      errorMessage={error || "Something went wrong while loading articles. Please refresh."}
      emptyMessage="No articles available at the moment. Check back soon."
      renderCard={(b) => <BlogPreviewCard blog={b} />}
      cta={{ to: "/blog", label: "View All Blogs" }}
    />
  );
};

export default BlogPreview;