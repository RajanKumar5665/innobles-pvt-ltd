import { Link } from "react-router-dom";
import AuthorAvatar from "./AuthorAvatar";
import BlogImage from "./BlogImage";
import { stripHtml } from "../../lib/richText";

/**
 * Large recent-blog card: image with category badge overlay,
 * then title, description and author metadata.
 */
const RecentBlogCard = ({ blog }) => {
  const href = `/blog/${blog.slug}`;

  return (
    <article className="blog-post-card group">
      <Link
        to={href}
        className="relative block h-[160px] w-full overflow-hidden bg-[#F8FAFC] sm:h-[180px] lg:h-[190px]"
        aria-label={`Read ${blog.title}`}
      >
        <BlogImage
          src={blog.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="blog-badge">{blog.category}</span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="blog-post-title">
          <Link to={href} className="transition-colors hover:text-[#F59E0B]">
            {blog.title}
          </Link>
        </h3>
        <p className="blog-post-desc">{stripHtml(blog.description)}</p>

        <div className="blog-post-meta">
          <AuthorAvatar author={blog.author} avatar={blog.authorAvatar} />
          <span>{blog.author}</span>
          <span className="text-[#94A3B8]" aria-hidden="true">
            •
          </span>
          <span>{blog.date}</span>
        </div>
      </div>
    </article>
  );
};

export default RecentBlogCard;