# Innobles — Company Website (Frontend)

A modern, fully responsive marketing website for **Innobles Smart Technologies Pvt. Ltd.**, built with React 19, Vite, Tailwind CSS, React Router and Redux Toolkit.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 3** (custom design system + animations)
- **React Router 7** (`NavLink`, `Outlet`, nested layout routes)
- **Redux Toolkit** + React Redux (services & contact state with simulated async thunks)
- Custom scroll-reveal animations (IntersectionObserver) with reduced-motion support
- Dependency-free SEO component (title, meta, Open Graph, canonical per page)

## Getting Started

```bash
npm install     # install dependencies
npm run dev     # start dev server
npm run build   # production build to /dist
npm run preview # preview the production build
npm run lint    # run ESLint
```

## Project Structure

```
src/
├── app/                    # Redux store + hooks
├── components/
│   ├── common/             # Navbar, Footer, Button, Loader, Reveal, SectionHeading, ScrollToTop
│   ├── forms/              # ContactForm (validated, redux-dispatched)
│   ├── home/               # Hero, ServiceGrid, Projects, Blog, CTA, etc.
│   └── seo/                # Seo component (per-page meta tags)
├── config/                 # siteConfig.js — one place for brand/contact/nav data
├── data/                   # dummyData.js — services, projects, team, careers, blogs, FAQs
├── features/               # Redux slices + thunks + simulated APIs
├── hooks/                  # useScrollToTop, useReveal, useServices
├── layouts/                # MainLayout (Navbar + <Outlet /> + Footer)
├── pages/                  # Home, About, Services, Careers, Contact, NotFound
├── routes/                 # AppRoutes — central route map
└── main.jsx / App.jsx      # entry + router/redux wiring
```

## Architecture Notes

- **Single source of truth**: edit `src/config/siteConfig.js` and `src/data/dummyData.js` and the whole site updates.
- **Routing**: `MainLayout` wraps every route and renders `<Outlet />`, so the Navbar/Footer stay persistent and only the page body changes. `NavLink` gives automatic active-link styling.
- **SEO**: `Seo` components on each page set the document title, meta description, canonical URL and OG/Twitter tags.
- **State**: Redux Toolkit slices for `services` (fetched via a simulated async thunk with loading/error states) and `contact` (async form submission with success confirmation and a generated message id).
- **Animations**: CSS keyframes (float, marquee, glow) + an `IntersectionObserver`-based reveal hook. All animations disable under `prefers-reduced-motion`.

## Replacing Dummy Data

All placeholder content lives in `src/data/dummyData.js`. Swap the bodies of
`src/features/services/servicesApi.js` and `src/features/contact/contactApi.js`
for real `fetch()` calls to your backend.

