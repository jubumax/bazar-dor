import { notFound } from "next/navigation";
import CategoryProducts from "@/src/components/category/CategoryProducts";
import { getCategories, getProducts } from "@/src/lib/api";
import { toBanglaNumber } from "@/src/lib/utils";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const products = await getProducts(slug);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="mb-6 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.icon}</span>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      <CategoryProducts products={products} />
    </main>
  );
}
