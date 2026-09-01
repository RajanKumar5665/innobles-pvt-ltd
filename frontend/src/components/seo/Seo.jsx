import { useEffect } from "react";
import { siteConfig } from "../../config/siteConfig";

// Updates the page title, meta tags and social (OG/Twitter) tags.
// Props: title, description, keywords, path, image.
const Seo = ({ title, description, keywords, path = "/", image = "/hero-image.png" }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const fullDescription = description || siteConfig.description;
    const url = `${siteConfig.url}${path}`;

    document.title = fullTitle;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", fullDescription);
    if (keywords) setMeta("name", "keywords", keywords);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", fullDescription);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", `${siteConfig.url}${image}`);

    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", fullDescription);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, keywords, path, image]);

  return null;
};

export default Seo;
