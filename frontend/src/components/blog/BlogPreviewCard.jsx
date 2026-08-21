import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import BlogImage from "./BlogImage";
import { stripHtml } from "../../lib/richText";

/**
 * Modern, consistent blog card — used on the homepage blog preview and the
 * blog detail "related reads". Matches the Service / Product card design
 * system (same surface, radius, image aspect, spacing, CTA). Entrance
 * staggering is applied by the parent StaggerGroup wrapper, never here, so the
 * CSS hover lift / image zoom on this card always work.
 */
const BlogPreviewCard = ({ blog, showCategory = true }) => {
  const href = `/blog/${blog.slug}`;

  return (
    <article className="content-card group relative flex h-full flex-col">
      <Link
        to={href}
        aria-label={`Read ${blog.title}`}
        tabIndex={-1}
        className="relative block aspect-[16/9] w-full shrink-0 overflow-hidden"
      >
        <BlogImage
          src={blog.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {showCategory && blog.category ? (
          <span className="card-category-badge">{blog.category}</span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays size={13} className="text-brand-orange" aria-hidden="true" />
          <span>{blog.date}</span>
        </div>

        <h3 className="mt-2 font-disp text-lg font-bold leading-snug tracking-tight text-ink break-words">
          <Link to={href} className="transition-colors hover:text-brand-orange">
            {blog.title || "Untitled Article"}
          </Link>
        </h3>

        {blog.description ? (
          <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-2">{stripHtml(blog.description)}</p>
        ) : null}

        <div className="mt-auto pt-4">
          <Link to={href} className="content-link">
            Read More <ArrowRight className="content-link-icon" size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPreviewCard;