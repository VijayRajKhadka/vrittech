"use server";

import { fetchProductCategory } from "../api/category";

export async function getProductCategories(): Promise<string[]> {
  return fetchProductCategory();
}
