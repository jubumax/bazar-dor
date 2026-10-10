"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/src/types/product";

interface CategoryNavProps {
  categories: Category[];
}

const CategoryNav = ({ categories }: CategoryNavProps) => {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-[#FAFCFA]">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-0.5 gap-y-0.5 px-1 py-1 md:flex-nowrap md:justify-start md:gap-1 md:overflow-visible md:px-4 md:py-2">
        {categories.map((category) => {
          const isActive = pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`shrink-0 rounded-md px-1.5 py-1 text-[11px] font-bold duration-150 active:scale-95 transition-colors md:px-3 md:text-sm ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-slate-700 hover:bg-slate-200 hover:text-green-700"
              }`}
            >
              {category.icon} {category.nameBn}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
