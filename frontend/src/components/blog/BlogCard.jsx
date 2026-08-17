import { Link } from "react-router-dom";
import BlogImage from "./BlogImage";

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
        className="relative flex h-[168px] w-full overflow-hidden bg-[#fafafa] sm:h-[200px] lg:h-[210px]"
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
          <Link to={href} className="transition-colors hover:text-[#ff7200]">
            {blog.title}
          </Link>
        </h3>
        <p className="blog-post-desc">{blog.description || blog.excerpt}</p>
        <div className="blog-post-meta">
          <span>
            By <span className="font-semibold text-[#171717]">{blog.author}</span>
          </span>
          <span className="text-[#8a8a8a]" aria-hidden="true">
            •
          </span>
          <span>{blog.date}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
