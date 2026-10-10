import CategoryNav from "@/src/components/layout/CategoryNav";
import PriceTicker from "@/src/components/layout/PriceTicker";
import { getCategories, getProducts } from "@/src/lib/api";


export async function CategoryNavData() {
  try {
    const categories = await getCategories();

    return <CategoryNav categories={categories} />;
  } catch {
    return null;
  }
}

export async function PriceTickerData() {
  try {
    const products = await getProducts();

    return <PriceTicker products={products} />;
  } catch {
    return null;
  }
}
