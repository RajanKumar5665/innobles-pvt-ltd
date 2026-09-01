import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Seo from "../components/seo/Seo";
import SectionHeading from "../components/common/SectionHeading";
import Loader from "../components/common/Loader";
import StaggerGroup, { StaggerItem } from "../components/common/StaggerGroup";
import ProductCard from "../components/product/ProductCard";
import BlogPagination from "../components/blog/BlogPagination";
import { useProducts } from "../hooks/useProducts";
import {
  PRODUCT_CATEGORIES,
  getCategoryById,
} from "../config/productCategories";

const PRODUCTS_PER_PAGE = 6;

// Sort choices. They only need fields the API already returns (title,
// createdAt), so nothing new is required from the backend.
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "az", label: "Name: A to Z" },
  { value: "za", label: "Name: Z to A" },
];

// Simple tag stripper so search can look inside rich-text descriptions.
const htmlToText = (html = "") => html.replace(/<[^>]*>/g, " ");

// One product passes the current category + search filters or not.
const matchesFilters = (product, activeCategoryLabel, term) => {
  if (activeCategoryLabel && product.category !== activeCategoryLabel) return false;
  if (term) {
    const haystack =
      `${product.title} ${htmlToText(product.description)} ${product.category}`.toLowerCase();
    if (!haystack.includes(term)) return false;
  }
  return true;
};

// Shown when the active filters/search match nothing on the Products page.
const NoResults = ({ onClear }) => (
  <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
    <p className="font-disp text-lg font-bold text-slate-800">No products found</p>
    <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-500">
      No products match your current selection. Try different keywords or another category.
    </p>
    <button type="button" onClick={onClear} className="btn-ghost mt-5">Clear filters</button>
  </div>
);

const Products = () => {
  const { list, status, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // The category lives in the URL (?category=collections) so footer links and
  // browser back/forward work without reloading the page.
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("category") || "";
  const activeCategory = getCategoryById(paramId); // null = All Products

  // Debounce the search box so typing does not refilter on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput.trim().toLowerCase()), 200);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // How many published products each category holds (for the counters).
  const categoryCounts = useMemo(() => {
    const counts = {};
    for (const cat of PRODUCT_CATEGORIES) {
      counts[cat.id] = list.filter((p) => p.category === cat.label).length;
    }
    return counts;
  }, [list]);

  // Filter + sort fully on the client. The full published set is already in
  // the Redux store (fetched once by useProducts), so no extra API calls.
  const filteredList = useMemo(() => {
    const matched = list.filter((p) =>
      matchesFilters(p, activeCategory ? activeCategory.label : "", debouncedSearch),
    );
    return [...matched].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "az":
          return (a.title || "").localeCompare(b.title || "");
        case "za":
          return (b.title || "").localeCompare(a.title || "");
        default: // newest
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });
  }, [list, activeCategory, debouncedSearch, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / PRODUCTS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const pageProducts = useMemo(
    () =>
      filteredList.slice(
        (activePage - 1) * PRODUCTS_PER_PAGE,
        activePage * PRODUCTS_PER_PAGE,
      ),
    [activePage, filteredList],
  );

  // Any filter change sends the user back to page 1 so nothing looks missing.
  useEffect(() => {
    // Intentionally re-syncs the page when filters change (derived-state clamp).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [activeCategory, debouncedSearch, sortBy]);

  // If the feed shrinks below the current page (e.g. after a refresh), fall
  // back to the last available page so the view is never empty or out of range.
  useEffect(() => {
    // Intentionally clamps the current page when the total shrinks (derived state).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  // Picking a category updates the URL param; "All Products" clears it.
  const selectCategory = (categoryId) => {
    if (!categoryId) {
      searchParams.delete("category");
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: categoryId }, { replace: true });
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
    document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Seo
        title="Products"
        description="Explore Innobles software products — CRM, HRMS, inventory, analytics, e-commerce and AI document automation."
        path="/products"
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="container-x relative py-20 text-center md:py-24">
          <p className="eyebrow mb-4 justify-center">Our Products</p>
          <h1 className="mx-auto max-w-3xl font-disp text-4xl font-bold leading-tight md:text-5xl">
            Software products built to <span className="text-gradient">run your operations</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/60 md:text-lg">
            Ready-to-deploy platforms for sales, operations, HR, analytics and more — with room to customise as you
            scale.
          </p>
        </div>
      </section>

      <section id="products-list" className="container-x scroll-mt-24 py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Product suite" title="What we offer" />
          {status === "success" && (
            <span className="blog-page-pill">
              Showing {filteredList.length} of {list.length} products
            </span>
          )}
        </div>

        {status === "loading" && (
          <div className="mt-12">
            <Loader className="!h-32" size="lg" />
          </div>
        )}

        {status === "error" && (
          <div className="mt-12 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-700" role="alert">
            {error || "Something went wrong while loading products. Please refresh."}
          </div>
        )}

        {status === "success" && (
          list.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
              <p className="text-slate-500">No products available at the moment. Check back soon.</p>
            </div>
          ) : (
            <>
              {/* Mobile / tablet category chips — horizontal scroll so small
                  screens never break. Hidden on desktop. */}
              <div className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:hidden">
                {[null, ...PRODUCT_CATEGORIES].map((cat) => {
                  const isActive = activeCategory?.id === (cat?.id || "");
                  return (
                    <button
                      key={cat?.id || "all"}
                      type="button"
                      onClick={() => selectCategory(cat?.id)}
                      aria-pressed={isActive}
                      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "border-brand-orange bg-brand-orange text-white"
                          : "border-line bg-white text-slate-600 hover:border-brand-orange hover:text-brand-orange"
                      }`}
                    >
                      {cat ? cat.label : "All Products"}
                    </button>
                  );
                })}
              </div>

              {/* Search + sort toolbar */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-10">
                <div className="relative flex-1">
                  <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search products by name, description or category..."
                    className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products"
                  className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-brand-orange focus:outline-none sm:w-48"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
                {/* Desktop category sidebar (mobile uses the chips above) */}
                <aside className="hidden self-start lg:block">
                  <nav aria-label="Product categories" className="sticky top-28 space-y-1 rounded-2xl border border-line bg-white p-3 shadow-sm">
                    <button type="button" onClick={() => selectCategory(null)} aria-current={!activeCategory ? "true" : undefined} className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${!activeCategory ? "bg-brand-orange/10 text-brand-orange" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`}>
                      All Products
                      <span className="ml-2 text-xs text-slate-400">{list.length}</span>
                    </button>
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const isActive = activeCategory?.id === cat.id;
                      return (
                        <button key={cat.id} type="button" onClick={() => selectCategory(cat.id)} aria-current={isActive ? "true" : undefined} className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${isActive ? "bg-brand-orange/10 text-brand-orange" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`}>
                          <span>{cat.label}</span>
                          <span className="ml-2 shrink-0 text-xs text-slate-400">{categoryCounts[cat.id]}</span>
                        </button>
                      );
                    })}
                  </nav>
                </aside>

                {/* Results */}
                <div id="products-grid" className="scroll-mt-28">
                  {pageProducts.length === 0 ? (
                    <NoResults
                      onClear={() => {
                        selectCategory(null);
                        setSearchInput("");
                      }}
                    />
                  ) : (
                    <>
                      <StaggerGroup
                        key={`${activeCategory?.id || "all"}-${debouncedSearch}-${sortBy}-${activePage}`}
                        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                      >
                      {pageProducts.map((p) => (
                        <StaggerItem key={p.id} className="h-full">
                          <ProductCard product={p} />
                        </StaggerItem>
                      ))}
                    </StaggerGroup>

                    {totalPages > 1 && (
                      <BlogPagination current={activePage} total={totalPages} onChange={changePage} />
                    )}
                    </>
                  )}
                </div>
              </div>
            </>
          )
        )}
      </section>
    </>
  );
};

export default Products;
