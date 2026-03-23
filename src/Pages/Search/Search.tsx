import React, { useMemo, useState } from "react";
import type ISearch from "./ISearch";
import useSearchAction from "../../Services/Hooks/useSearchAction";
import ProductPresentation from "../../PresentationComponent/ProductPresentation/ProductPresentation";
import type ProductInterface from "../../Interface/ProductInterface";

type SortMode = "relevance" | "price_asc" | "price_desc" | "discount_desc";

const normalize = (s: string) => s.trim().toLowerCase();

const Search: React.FC<ISearch> = () => {
  // If your hook already returns loading/error, use them.
  // If it only returns { data }, these will just be undefined.
  const { data, isLoading, error } = useSearchAction() as {
    data?: ProductInterface[];
    isLoading?: boolean;
    error?: unknown;
  };

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("relevance");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  const filtered = useMemo(() => {
    const list = (data ?? []).slice();
    const q = normalize(query);

    let result = list.filter((p) => {
      if (onlyDiscounted && !p.IsDiscounted) return false;

      if (!q) return true;

      const name = normalize(p.Name ?? "");
      const desc = normalize(p.Description ?? "");
      const sub = normalize((p.SubCategory as any) ?? "");

      return name.includes(q) || desc.includes(q) || sub.includes(q);
    });

    if (sort === "price_asc") {
      result = result.sort((a, b) => (a.Price ?? 0) - (b.Price ?? 0));
    } else if (sort === "price_desc") {
      result = result.sort((a, b) => (b.Price ?? 0) - (a.Price ?? 0));
    } else if (sort === "discount_desc") {
      result = result.sort((a, b) => (b.DiscountPercentage ?? 0) - (a.DiscountPercentage ?? 0));
    } else {
      // relevance: keep natural order (API order)
    }

    return result;
  }, [data, query, sort, onlyDiscounted]);

  if (isLoading) {
    return (
      <div className="p-4">
        <p className="text-sm font-semibold text-slate-600">Searching products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-sm font-semibold text-red-600">Something went wrong while searching.</p>
        <p className="mt-1 text-xs text-slate-500">Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-4">
      {/* Controls */}
      <div className="sticky top-0 z-10 mb-4 rounded-2xl border border-slate-200 bg-white/80 p-3 backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-600">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: black shirt, jeans, levis..."
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
              />
              Only discounted
            </label>

            <div>
              <label className="block text-xs font-semibold text-slate-600">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
              >
                <option value="relevance">Relevance</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="discount_desc">Discount: High → Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <p>
            Showing <span className="font-semibold text-slate-700">{filtered.length}</span>{" "}
            result{filtered.length === 1 ? "" : "s"}
          </p>

          {(query || onlyDiscounted || sort !== "relevance") && (
            <button
              onClick={() => {
                setQuery("");
                setOnlyDiscounted(false);
                setSort("relevance");
              }}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm font-bold text-slate-800">No products found</p>
          <p className="mt-1 text-xs text-slate-500">
            Try a different keyword (e.g. “shirt”, “jeans”, “black”).
          </p>
        </div>
      ) : (
        /* Results Grid */
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item: ProductInterface) => (
            <ProductPresentation key={item.id} details={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;