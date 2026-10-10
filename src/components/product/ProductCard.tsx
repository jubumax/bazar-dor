import Link from "next/link";
import type { Product } from "@/src/types/product";
import { formatPrice, toBanglaNumber } from "@/src/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const change = product.change.pct;

  const changeClass =
    change > 0
      ? "text-red-600"
      : change < 0
        ? "text-green-600"
        : "text-slate-500";

  const unitNames: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  const unit = unitNames[product.unit] ?? product.unit;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Product info */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-green-50 text-2xl">
            {product.image}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-slate-900 group-hover:text-[#05893E]">
              {product.nameBn}
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">প্রতি {unit}</p>
          </div>
        </div>
      </div>

      {/* Price + Change */}
      <div className="mt-3 flex items-end justify-between border-t border-slate-100 pt-2">
        <div>
          <p className="text-xs text-slate-500">আজকের দাম</p>

          <p className="mt-0.5 text-xl font-extrabold text-slate-900">
            {formatPrice(product.today)}{" "}
            <span className="text-xs font-medium text-slate-500">টাকা</span>
          </p>
        </div>

        {/* Change */}
        <span className={`text-xs font-bold ${changeClass}`}>
          {change > 0 ? "▲" : change < 0 ? "▼" : "—"}{" "}
          {toBanglaNumber(Math.abs(change))}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
