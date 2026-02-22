// src/lib/actions/product-actions.ts
"use server";

import { Product } from "@/src/types/product";
import { fetchProductById, fetchProducts } from "../api/product";

export async function getProducts(sort?: "asc" | "desc"): Promise<Product[]> {
  return fetchProducts(sort);
}

export async function getProductById(id: number): Promise<Product> {
  return fetchProductById(id);
}
