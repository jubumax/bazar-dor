import type { Category, Product } from "@/types/product";

const API_BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

async function fetchApi<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>(
    `${API_BASE_URL}/categories`,
  );
}

export async function getProducts(
  category?: string,
): Promise<Product[]> {
  const url = category
    ? `${API_BASE_URL}/products?category=${category}`
    : `${API_BASE_URL}/products`;

  return fetchApi<Product[]>(url);
}

export async function getProduct(
  slug: string,
): Promise<Product | null> {
  try {
    const product = await fetchApi<Product>(
      `${API_BASE_URL}/products/${slug}`,
    );

    return product;
  } catch {
    return null;
  }
}