import { get } from "./client";

export async function fetchProductCategory(): Promise<string[]> {
  return get<string[]>(`/products/categories/`, { revalidate: 60 });
}
