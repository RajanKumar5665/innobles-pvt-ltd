import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Seo from "../components/seo/Seo";
import PageHero from "../components/common/PageHero";
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

// Lookup category id from a product label without scanning the array per item.
const CATEGORY_ID_BY_LABEL = new Map(
  PRODUCT_CATEGORIES.map((c) => [c.label.toLowerCase(), c.id]),
);

// One product passes the current category + search filters or not.
const matchesFilters = (product, searchText, activeCategoryLabel, term) => {
  if (activeCategoryLabel && product.category !== activeCategoryLabel) return false;
  if (term && !searchText.includes(term)) return false;
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
    for (const cat of PRODUCT_CATEGORIES) counts[cat.id] = 0;
    for (const p of list) {
      const id = CATEGORY_ID_BY_LABEL.get(String(p.category || "").trim().toLowerCase());
      if (id) counts[id] += 1;
    }
    return counts;
  }, [list]);

  // The searchable text for each product is built once per fetch instead of
  // re-stripping the rich HTML on every keystroke while filtering.
  const searchTextById = useMemo(() => {
    const map = new Map();
    for (const p of list) {
      map.set(p.id, `${p.title} ${htmlToText(p.description)} ${p.category}`.toLowerCase());
    }
    return map;
  }, [list]);

  // Filter + sort fully on the client. The full published set is already in
  // the Redux store (fetched once by useProducts), so no extra API calls.
  const filteredList = useMemo(() => {
    const matched = list.filter((p) =>
      matchesFilters(p, searchTextById.get(p.id) || "", activeCategory ? activeCategory.label : "", debouncedSearch),
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
  }, [list, searchTextById, activeCategory, debouncedSearch, sortBy]);

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

      <PageHero
        eyebrow="Our Products"
        title="Software products built to"
        highlight="run your operations"
        description="Ready-to-deploy platforms for sales, operations, HR, analytics and more — with room to customise as you scale."
      />

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
                          ? "border-[#F0703F] bg-[#FFE9DE] text-[#172B3A]"
                          : "border-line bg-white text-slate-600 hover:border-[#FF9866] hover:bg-[#FFE9DE] hover:text-[#172B3A]"
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
                  <nav aria-label="Product categories" className="sticky top-28 space-y-1 rounded-2xl border border-line bg-white p-3">
                    <button type="button" onClick={() => selectCategory(null)} aria-current={!activeCategory ? "true" : undefined} className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${!activeCategory ? "bg-[#FFE9DE] text-[#172B3A]" : "text-slate-600 hover:bg-[#FFE9DE] hover:text-[#172B3A]"}`}>
                      All Products
                      <span className="ml-2 text-xs text-slate-400">{list.length}</span>
                    </button>
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const isActive = activeCategory?.id === cat.id;
                      return (
                        <button key={cat.id} type="button" onClick={() => selectCategory(cat.id)} aria-current={isActive ? "true" : undefined} className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${isActive ? "bg-[#FFE9DE] text-[#172B3A]" : "text-slate-600 hover:bg-[#FFE9DE] hover:text-[#172B3A]"}`}>
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
                      {pageProducts.map((p, index) => (
                        <StaggerItem key={p.id} className="h-full">
                          <ProductCard product={p} priority={index === 0} />
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
