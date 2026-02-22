"use client";

import * as React from "react";
import { Product } from "@/src/types/product";
import { ProductCard } from "./product-card";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition, useState, useEffect } from "react";
import PaginationButton from "../../ui/button/PaginationButton";
import { Settings } from "lucide-react";

interface ProductsClientProps {
  initialProducts: Product[];
  itemsPerPage?: number; // default 8
}

export function ProductsClient({
  initialProducts,
  itemsPerPage = 8,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);

  const currentSort = searchParams.get("sort") ?? "";
  const currentCategory = decodeURIComponent(
    searchParams.get("category") ?? ""
  );
  const currentSearch = searchParams.get("search") ?? "";
  const minPriceParam = searchParams.get("minPrice") ?? "";
  const maxPriceParam = searchParams.get("maxPrice") ?? "";

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchesCategory = currentCategory
        ? p.category.toLowerCase() === currentCategory.toLowerCase()
        : true;
      const matchesSearch = currentSearch
        ? p.title.toLowerCase().includes(currentSearch.toLowerCase())
        : true;
      const matchesMin = minPriceParam
        ? p.price >= Number(minPriceParam)
        : true;
      const matchesMax = maxPriceParam
        ? p.price <= Number(maxPriceParam)
        : true;

      return matchesCategory && matchesSearch && matchesMin && matchesMax;
    });
  }, [
    initialProducts,
    currentCategory,
    currentSearch,
    minPriceParam,
    maxPriceParam,
  ]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory, currentSearch, minPriceParam, maxPriceParam]);

  const handleSort = (sort: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);

    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  };

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("search", value);
    else params.delete("search");

    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <input
          type="search"
          placeholder="Search..."
          defaultValue={currentSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleSearch((e.target as HTMLInputElement).value);
          }}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
        />

        <div className="flex items-center gap-3">
          {isPending && (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          )}

          <button
            onClick={() => handleSort("asc")}
            disabled={isPending}
            className={`px-4 py-2 border rounded-lg transition ${
              currentSort === "asc"
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`}
          >
            Price: Low to High
          </button>

          <button
            onClick={() => handleSort("desc")}
            disabled={isPending}
            className={`px-4 py-2 border rounded-lg transition ${
              currentSort === "desc"
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`}
          >
            Price: High to Low
          </button>

          <button
            className="px-4 py-2 flex items-center gap-2 border rounded-lg bg-black text-white"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("minPrice");
              params.delete("maxPrice");
              params.delete("category");
              params.delete("sort");
              params.delete("search");
              startTransition(() => {
                router.push(`/products?${params.toString()}`, {
                  scroll: false,
                });
              });
            }}
          >
            <Settings size={18} />
            RESET
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedProducts.length ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>

      {/* Pagination */}
      <PaginationButton
        totalCount={filteredProducts.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
