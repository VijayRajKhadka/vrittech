"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const PriceRangeSelection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMin = searchParams.get("minPrice") ?? "";
  const initialMax = searchParams.get("maxPrice") ?? "";

  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        placeholder="Min"
        value={minPrice}
        min={0}
        onChange={(e) =>
          setMinPrice(Math.max(0, Number(e.target.value)).toString())
        }
        className="w-20 px-2 py-1 border rounded-lg"
      />
      <span className="text-gray-500">-</span>
      <input
        type="number"
        placeholder="Max"
        min={0}
        value={maxPrice}
        onChange={(e) =>
          setMaxPrice(Math.max(0, Number(e.target.value)).toString())
        }
        className="w-20 px-2 py-1 border rounded-lg"
      />
      <button
        onClick={handleApply}
        className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
};
