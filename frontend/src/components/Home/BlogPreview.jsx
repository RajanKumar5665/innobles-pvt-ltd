import ContentShowcase from "./ContentShowcase";
import BlogPreviewCard from "../blog/BlogPreviewCard";
import { useRecentBlogs } from "../../hooks/useRecentBlogs";

const CARD_LIMIT = 3;

// Home page "Latest Insights" section — shows the 3 newest published blogs.
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