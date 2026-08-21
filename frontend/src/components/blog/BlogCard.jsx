import { Link } from "react-router-dom";
import BlogImage from "./BlogImage";
import { stripHtml } from "../../lib/richText";

/**
 * All-blogs list card — full-width image with category badge overlay,
 * then title, description and "By Author • Date" metadata.
 */
const BlogCard = ({ blog }) => {
  const href = `/blog/${blog.slug}`;

  return (
    <article className="blog-all-card group">
      <Link
        to={href}
        className="relative flex h-[168px] w-full overflow-hidden bg-[#F8FAFC] sm:h-[200px] lg:h-[210px]"
        aria-label={`Read ${blog.title}`}
      >
        <BlogImage
          src={blog.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="blog-badge">{blog.category}</span>
      </Link>

      <div className="p-5 sm:p-6">
        <h3 className="blog-post-title">
          <Link to={href} className="transition-colors hover:text-[#F59E0B]">
            {blog.title}
          </Link>
        </h3>
        <p className="blog-post-desc">{stripHtml(blog.description)}</p>
        <div className="blog-post-meta">
          <span>
            By <span className="font-semibold text-[#172033]">{blog.author}</span>
          </span>
          <span className="text-[#94A3B8]" aria-hidden="true">
            •
          </span>
          <span>{blog.date}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
