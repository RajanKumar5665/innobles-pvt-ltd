import BlogCard from "./BlogCard";
import BlogPagination from "./BlogPagination";
import BlogShare from "./BlogShare";

/**
 * "All Blogs" — a single rounded container holding the paginated
 * "backend feed", a page indicator and circular pill pagination.
 * A social share strip appears beneath the pagination.
 */
const AllBlogs = ({ blogs = [], page = 1, totalPages = 1, onPageChange }) => {
  if (blogs.length === 0) {
    return (
      <section id="all-blogs" aria-labelledby="all-blogs-title" className="mt-12 md:mt-16">
        <div className="blog-empty-state">
          <p className="blog-empty-state-title">No articles published yet</p>
          <p className="blog-empty-state-desc">
            New posts are on the way — check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="all-blogs" aria-labelledby="all-blogs-title" className="mt-12 md:mt-16">
      <div className="blog-panel">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="blog-eyebrow">All Blogs</p>
            <h2 id="all-blogs-title" className="blog-section-title mt-2">
              Browse every article from the backend feed
            </h2>
          </div>
          <span className="blog-page-pill">
            Page {page} of {totalPages}
          </span>
        </div>

        {/* Top pagination — lets readers jump pages without scrolling to the bottom */}
        {totalPages > 1 && (
          <BlogPagination current={page} total={totalPages} onChange={onPageChange} />
        )}

        <div className="mt-8 flex flex-col gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {totalPages > 1 && (
          <BlogPagination current={page} total={totalPages} onChange={onPageChange} />
        )}

        {/* Social share strip — below the pagination */}
        <BlogShare className="mt-6" />
      </div>
    </section>
  );
};

export default AllBlogs;