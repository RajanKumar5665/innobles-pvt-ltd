import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Loader from "../components/common/Loader";
import StaggerGroup, { StaggerItem } from "../components/common/StaggerGroup";
import BlogImage from "../components/blog/BlogImage";
import AuthorAvatar from "../components/blog/AuthorAvatar";
import BlogShare from "../components/blog/BlogShare";
import BlogPreviewCard from "../components/blog/BlogPreviewCard";
import { useBlogs } from "../hooks/useBlogs";
import { toRenderableHtml, stripHtml } from "../lib/richText";

// Public single-blog page. Description and content are stored as HTML from
// the admin editor, so we render them safely with dangerouslySetInnerHTML.
const BlogDetail = () => {
  const { slug } = useParams();
  const { list, status, error } = useBlogs();
  const blog = list.find((item) => item.slug === slug);

  if (status === "loading" || status === "idle") {
    return (
      <div className="blog-frame">
        <div className="blog-container py-20">
          <Loader className="!h-32" size="lg" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="blog-frame">
        <div className="blog-container py-20">
          <div role="alert" className="blog-error-state">
            {error || "Article could not be loaded. Please refresh and try again."}
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-frame">
        <main className="blog-container py-24 text-center">
          <span className="blog-eyebrow">Article not found</span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172033]">
            This article is unavailable.
          </h1>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F59E0B] hover:text-[#D97706]">
            <ArrowLeft size={16} aria-hidden="true" /> Back to all articles
          </Link>
        </main>
      </div>
    );
  }

  const related = list.filter((item) => item.id !== blog.id).slice(0, 3);
  const title = blog.title;
  const description = blog.description;
  const category = blog.category;
  const author = blog.author;
  const hasContent = Boolean(blog.content && blog.content.trim());
  const hasDescription = Boolean(description && description.trim());
  const seoDescription = stripHtml(description) || title;

  return (
    <>
      <Seo title={title} description={seoDescription} path={`/blog/${blog.slug}`} />

      <div className="blog-frame">
        <div className="blog-container py-8 md:py-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#64748B] transition-colors hover:text-[#F59E0B]"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to all blogs
          </Link>

          <section className="mt-6 max-w-4xl">
            <span className="blog-badge-static">{category}</span>
            <h1 className="mt-5 text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#172033] md:text-[42px]">
              {title}
            </h1>

            {hasDescription ? (
              <div
                className="mt-4 max-w-2xl blog-detail-description"
                dangerouslySetInnerHTML={{ __html: toRenderableHtml(description) }}
              />
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-[#64748B]">
              <span className="inline-flex items-center gap-2">
                <AuthorAvatar author={author} avatar={blog.authorAvatar} size={26} />
                <span className="font-semibold text-[#172033]">{author}</span>
              </span>
              <span className="text-[#94A3B8]" aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} className="text-[#F59E0B]" aria-hidden="true" /> {blog.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={14} className="text-[#F59E0B]" aria-hidden="true" /> {blog.readTime}
              </span>
            </div>
          </section>

          <div className="blog-hero-img mt-8">
            <BlogImage src={blog.image} alt={title} className="h-full w-full object-cover" />
          </div>

          <section className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,760px)_240px]">
            <div className="blog-article-card">
              <div className="blog-article-body">
                {hasContent ? (
                  <div dangerouslySetInnerHTML={{ __html: toRenderableHtml(blog.content) }} />
                ) : hasDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: toRenderableHtml(description) }} />
                ) : (
                  <p className="text-slate-500">No content available for this article yet.</p>
                )}
              </div>

              {/* Social share strip — inside the article column */}
              <BlogShare url={window.location.href} title={title} />
            </div>

            <aside className="h-fit rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 lg:sticky lg:top-24">
              <p className="blog-eyebrow">Article details</p>
              <p className="mt-3 text-sm font-bold text-[#172033]">{category}</p>
              <p className="mt-2 text-[13px] leading-6 text-[#64748B]">
                Written by {author}. Published {blog.date}. {blog.readTime}.
              </p>
            </aside>
          </section>

          {related.length > 0 && (
            <section className="mt-16 border-t border-[#E2E8F0] pt-10">
              <p className="blog-eyebrow">Keep reading</p>
              <h2 className="blog-section-title mt-2">More from the blog</h2>
              <StaggerGroup className="mt-7 grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <StaggerItem key={item.id} className="h-full">
                    <BlogPreviewCard blog={item} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetail;