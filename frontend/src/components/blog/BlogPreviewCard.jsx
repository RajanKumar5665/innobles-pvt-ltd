import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import BlogImage from "./BlogImage";
import { stripHtml } from "../../lib/richText";

const BlogPreviewCard = ({ blog, showCategory = true }) => {
  const href = `/blog/${blog.slug}`;

  return (
    <article className="content-card group relative flex h-full flex-col">
      <Link
        to={href}
        aria-label={`Read ${blog.title}`}
        tabIndex={-1}
        className="content-card-media relative block aspect-[16/9] w-full shrink-0 overflow-hidden"
      >
        <BlogImage
          src={blog.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#172B3A]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {showCategory && blog.category ? (
          <span className="card-category-badge">{blog.category}</span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays size={13} className="text-brand-orange" aria-hidden="true" />
          <span>{blog.date}</span>
        </div>

        <h3 className="mt-2 font-disp text-[1.05rem] font-bold leading-snug tracking-tight text-ink break-words">
          <Link to={href} className="transition-colors duration-200 hover:text-brand-orange">
            {blog.title || "Untitled Article"}
          </Link>
        </h3>

        {blog.description ? (
          <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-2">{stripHtml(blog.description)}</p>
        ) : null}

        <div className="mt-auto border-t border-line/80 pt-4">
          <Link to={href} className="content-link">
            Read More <ArrowRight className="content-link-icon" size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPreviewCard;
