import StaggerGroup, { StaggerItem } from "../common/StaggerGroup";
import BlogPreviewCard from "./BlogPreviewCard";

/**
 * "Recent Blogs" — eyebrow + compact heading + the latest 3 articles.
 * Uses the same modern card (and staggered entrance) as the homepage preview.
 */
const RecentBlogs = ({ blogs = [] }) => {
  if (blogs.length === 0) return null;

  return (
    <section aria-labelledby="recent-blogs-title" className="mt-12 md:mt-16">
      <p className="blog-eyebrow">Recent Blogs</p>
      <h2 id="recent-blogs-title" className="blog-section-title mt-2">
        Fresh reads from our latest publishing cycle
      </h2>

      <StaggerGroup className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <StaggerItem key={blog.id} className="h-full">
            <BlogPreviewCard blog={blog} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
};

export default RecentBlogs;