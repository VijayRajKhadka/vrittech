"use client";

import { Product } from "@/src/types/product";
import { Star } from "lucide-react";
import Image from "next/image";
type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition flex flex-col">
      <div className="h-48 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          fetchPriority="high"
          className="max-h-full object-contain"
        />
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="mt-3 font-semibold line-clamp-2">{product.title}</h3>

        <span className="text-sm text-gray-500 mt-1 capitalize">
          {product.category}
        </span>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="flex items-center gap-1">
              <Star size={16} fill="#FACA52" stroke="#FACA52" />{" "}
              {product.rating.rate}
            </span>
            <span className="text-gray-400">({product.rating.count})</span>
          </div>
          <p className=" my-1 font-bold text-lg">${product.price}</p>

          <button
            onClick={() => onAddToCart?.(product)}
            className=" w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
