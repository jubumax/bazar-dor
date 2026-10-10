"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import type { Product } from "@/src/types/product";
import ProductCard from "@/src/components/product/ProductCard";
import { toBanglaNumber, toNumber } from "@/src/lib/utils";

interface CategoryProductsProps {
  products: Product[];
}

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const copy = [...products];

    if (sort === "low") {
      return copy.sort((a, b) => toNumber(a.today) - toNumber(b.today));
    }

    if (sort === "high") {
      return copy.sort((a, b) => toNumber(b.today) - toNumber(a.today));
    }

    return copy;
  }, [products, sort]);

  return (
    <>
      <div className="mb-7 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500 sm:text-sm">
          মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <label htmlFor="sort" className="text-xs font-medium text-slate-600">
            সাজান
          </label>

          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-8 w-[120px] cursor-pointer appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-7 text-[11px] font-medium text-slate-600 shadow-sm outline-none transition hover:border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-100 sm:w-48 sm:text-xs"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>

            <FiChevronDown
              size={14}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="text-sm font-bold text-slate-700">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="btn mt-5 border-0 bg-[#05893E] text-white hover:bg-[#047A36]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </>
  );
};

export default CategoryProducts;
