// src/lib/api/products.ts
import { Product } from "@/src/types/product";
import { get } from "./client";

export async function fetchProducts(sort?: "asc" | "desc"): Promise<Product[]> {
  const query = sort ? `?sort=${sort}` : "";
  return get<Product[]>(`/products${query}`);
}

export async function fetchProductById(id: number): Promise<Product> {
  return get<Product>(`/products/${id}`);
}
