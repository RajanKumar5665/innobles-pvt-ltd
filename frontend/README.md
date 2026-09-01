# Innobles — Company Website (Frontend)

A modern, fully responsive marketing website for **Innobles Smart Technologies Pvt. Ltd.**, built with React 19, Vite, Tailwind CSS, React Router and Redux Toolkit. All content (services, products, blogs, careers, about, home) is live from the backend API and managed through the `/admin` panel.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 3** (custom design system + animations)
- **React Router 7** (`NavLink`, `Outlet`, nested layout routes)
- **Redux Toolkit** + **React Redux** (auth, blogs, products, services, careers, contact, about, home)
- **TipTap** rich-text editor (admin blog / product descriptions)
- **Recharts** (admin dashboard charts)
- **Framer Motion** + a custom `IntersectionObserver` reveal hook (reduced-motion aware)
- Dependency-free **SEO** component (title, meta, Open Graph, canonical per page)

## Getting Started

```bash
npm install     # install dependencies
npm run dev     # start dev server (http://localhost:5173)
npm run build   # production build to /dist
npm run preview # preview the production build
npm run lint    # run ESLint
```

### Environment

Copy the example env and point `VITE_API_URL` at your backend before building:

```bash
VITE_API_URL=https://api.innobles.in/api
```

If not set, the app falls back to `http://localhost:5000/api`.

## Project Structure

```
src/
├── app/                    # Redux store + typed hooks
├── assets/                 # Static assets (SVG)
├── components/
│   ├── about/              # TeamCard + admin About sections (Team/Locations/Statistics)
│   ├── admin/              # Dashboard charts, stat cards, activity feed, RequireAdmin
│   ├── blog/               # Blog cards, hero, pagination, share, author avatar
│   ├── careers/            # Job cards, filters, pagination, application modal
│   ├── common/             # Navbar, Footer, Loader, Reveal, SectionHeading, ScrollToTop…
│   ├── forms/              # ContactForm (validated, redux-dispatched)
│   ├── Home/               # Hero, ServiceGrid, ProductsHighlight, BlogPreview, CTA, Contact
│   ├── product/            # ProductCard, ProductImage
│   ├── seo/                # Seo component (per-page meta tags)
│   └── service/            # ServiceCard, ServiceBanner
├── config/                 # siteConfig.js + productCategories.js (single source of truth)
├── features/               # Redux slices + thunks + API calls (one folder per domain)
├── hooks/                  # useReveal, useScrollToTop, useBlogs, useProducts, …
├── layouts/                # MainLayout (public) + AdminLayout
├── lib/                    # api.js (fetch wrapper) + richText.js (HTML helpers)
├── pages/                  # Public pages + admin/* pages
├── routes/                 # AppRoutes + AdminRoutes
└── main.jsx / App.jsx      # entry + router/redux wiring
```

## Architecture Notes

- **Single source of truth**: edit `src/config/siteConfig.js` (brand/contact/nav) and `src/config/productCategories.js` (categories) and the whole site updates.
- **Routing**: `MainLayout` wraps every public route and renders `<Outlet />`, so the Navbar/Footer stay persistent and only the page body changes. `/admin/*` is guarded by `RequireAdmin` and rendered inside `AdminLayout`.
- **SEO**: the `Seo` component on each page sets the document title, meta description, canonical URL and Open Graph/Twitter tags.
- **State**: each domain has an `Api → Thunks → Slice` trio. Public hooks (`useServices`, `useProducts`, `useBlogs`, `useAbout`, `useCareers`) fetch once and expose `{ list, status, error }`.
- **Data loading**: admin pages fetch with `load()` inside `useEffect` on mount. The `react-hooks/set-state-in-effect` rule is disabled per-line where this is intentional.

## Deployment

```bash
npm ci && npm run build
```

Upload the contents of `dist/` to any static host (Vercel, Netlify, Nginx, etc.) and configure SPA fallback so `/admin`, `/blog/:slug`, etc. all serve `index.html`. Set `VITE_API_URL` at build time to the deployed backend URL.

