import { useEffect, useMemo, useState } from "react";
import Seo from "../components/seo/Seo";
import Loader from "../components/common/Loader";
import BlogHero from "../components/blog/BlogHero";
import RecentBlogs from "../components/blog/RecentBlogs";
import AllBlogs from "../components/blog/AllBlogs";
import { useBlogs } from "../hooks/useBlogs";

const POSTS_PER_PAGE = 6;

// Blog landing page — hero, recent blogs, then a paginated "all blogs" feed.
const Blog = () => {
  const { list, recent, status, error } = useBlogs();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(list.length / POSTS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const pageBlogs = useMemo(
    () => list.slice((activePage - 1) * POSTS_PER_PAGE, activePage * POSTS_PER_PAGE),
    [activePage, list],
  );

  // If the feed shrinks below the current page, go back to the last page.
  useEffect(() => {
    // Intentionally clamps the current page when the total shrinks (derived state).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const changePage = (page) => {
    setCurrentPage(page);
    // Scroll to the feed so the sticky header does not hide the heading.
    document.getElementById("all-blogs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Seo
        title="Blog"
        description="Engineering, product, AI, strategy and people insights from the Innobles team."
        path="/blog"
      />

      <div className="blog-frame">
        <div className="blog-container py-6 md:py-9">
          {status === "loading" && (
            <div className="py-24">
              <Loader className="!h-32" size="lg" />
            </div>
          )}

          {status === "error" && (
            <div role="alert" className="blog-error-state">
              {error || "Articles could not be loaded. Please refresh and try again."}
            </div>
          )}

          {status === "success" && (
            <>
              <BlogHero />
              <RecentBlogs blogs={recent} />
              <AllBlogs
                blogs={pageBlogs}
                page={activePage}
                totalPages={totalPages}
                onPageChange={changePage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;