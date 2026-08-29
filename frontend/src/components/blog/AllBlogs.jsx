import BlogPreviewCard from "./BlogPreviewCard";
import BlogPagination from "./BlogPagination";
import BlogShare from "./BlogShare";
import StaggerGroup, { StaggerItem } from "../common/StaggerGroup";

// "All Blogs" — a rounded container holding the paginated blog list,
// a page indicator, pagination and a social share strip.
const AllBlogs = ({ blogs = [], page = 1, totalPages = 1, onPageChange }) => {
  if (blogs.length === 0) {
    return (
      <section id="all-blogs" aria-labelledby="all-blogs-title" className="mt-12 scroll-mt-24 md:mt-16">
        <div className="blog-empty-state">
          <p className="blog-empty-state-title">No blogs available yet.</p>
          <p className="blog-empty-state-desc">
            There are no published articles right now. New posts will appear
            here as soon as they go live.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="all-blogs" aria-labelledby="all-blogs-title" className="mt-12 scroll-mt-24 md:mt-16">
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

        {/* Re-mount the grid on page changes so the stagger animation runs again. */}
        <StaggerGroup key={page} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <StaggerItem key={blog.id} className="h-full">
              <BlogPreviewCard blog={blog} />
            </StaggerItem>
          ))}
        </StaggerGroup>

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