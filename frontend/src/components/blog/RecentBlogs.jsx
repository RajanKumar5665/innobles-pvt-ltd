import RecentBlogCard from "./RecentBlogCard";

/**
 * "Recent Blogs" — eyebrow + compact heading + the latest 3 articles.
 */
const RecentBlogs = ({ blogs = [] }) => {
  if (blogs.length === 0) return null;

  return (
    <section aria-labelledby="recent-blogs-title" className="mt-12 md:mt-16">
      <p className="blog-eyebrow">Recent Blogs</p>
      <h2 id="recent-blogs-title" className="blog-section-title mt-2">
        Fresh reads from our latest publishing cycle
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <RecentBlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;