import type { Product } from "@/src/types/product";
import ProductCard from "@/src/components/product/ProductCard";
import { formatPrice, toBanglaNumber } from "@/src/lib/utils";

interface ProductSectionsProps {
  products: Product[];
}

const ProductSections = ({ products }: ProductSectionsProps) => {
  const sorted = [...products].sort(
    (a, b) => Number(b.change.pct) - Number(a.change.pct),
  );

  const rising = sorted
    .filter((product) => Number(product.change.pct) > 0)
    .slice(0, 6);

  const falling = [...products]
    .sort((a, b) => Number(a.change.pct) - Number(b.change.pct))
    .filter((product) => Number(product.change.pct) < 0)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <section>
        <div className="mb-6 flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">▲</span>

          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            আজ দাম বেড়েছে
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rising.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-center gap-2">
          <span className="text-lg font-bold text-green-600">▼</span>

          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            আজ দাম কমেছে
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {falling.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="mt-16 scroll-mt-24">
        <div className="mb-6">
          <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
            সব পণ্য
          </h2>

          <p className="mt-2 text-slate-500">
            মোট {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম দেখানো
            হচ্ছে।
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductSections;
