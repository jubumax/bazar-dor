import type { Category, Product } from "@/src/types/product";

const API_BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchApi<T>(path: string): Promise<T> {
  let lastError: unknown;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        throw new Error(`API request failed (${response.status})`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("API request failed");
}

export async function getCategories(): Promise<Category[]> {
  const categories = await fetchApi<Category[]>("/categories");

  return Array.isArray(categories) ? categories : [];
}

export async function getProducts(category?: string): Promise<Product[]> {
  const path = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";

  try {
    const products = await fetchApi<Product[]>(path);

    return Array.isArray(products) ? products : [];
  } catch (error) {
    if (category) {
      return [];
    }

    throw error;
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const product = await fetchApi<Product>(
      `/products/${encodeURIComponent(slug)}`,
    );

    if (!product || typeof product !== "object" || !("nameBn" in product)) {
      return null;
    }

    return product;
  } catch {
    return null;
  }
}
