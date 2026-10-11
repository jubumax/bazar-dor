import Link from "next/link";
import type { Product } from "@/src/types/product";
import {
  formatChange,
  formatDecimalPrice,
  formatPrice,
  getChangeClass,
  getSignedChange,
  getUnitLabel,
  toBanglaNumber,
} from "@/src/lib/utils";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const change = getSignedChange(product);
  const priceChange = product.today - product.yesterday;
  const marketPrices = product.markets;

  const unit = getUnitLabel(product.unit);

  const minMarket =
    marketPrices.length > 0
      ? marketPrices.reduce((lowest, market) =>
        market.min < lowest.min ? market : lowest,
      )
      : null;

  const maxMarket =
    marketPrices.length > 0
      ? marketPrices.reduce((highest, market) =>
        market.max > highest.max ? market : highest,
      )
      : null;

  const minPrice = minMarket?.min ?? product.today;
  const maxPrice = maxMarket?.max ?? product.today;

  const averagePrice =
    marketPrices.length > 0
      ? marketPrices.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0,
      ) / marketPrices.length
      : product.today;

  const summaryLine =
    marketPrices.length > 0
      ? `${toBanglaNumber(marketPrices.length)}টি বাজারের তথ্য অনুযায়ী ${product.nameBn}-এর দাম প্রতি ${unit} ${formatPrice(minPrice)} থেকে ${formatPrice(maxPrice)} টাকার মধ্যে; গড় দাম প্রায় ${formatPrice(Math.round(averagePrice))} টাকা।`
      : `আজ ${product.nameBn}-এর দাম প্রতি ${unit} ${formatPrice(product.today)} টাকা।`;

  return (
    <main className="min-h-screen bg-[#f4f8f3] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <span><Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link></span>

          <span>›</span>

          <span className="text-slate-700">{product.nameBn}</span>
        </div>

        <section className="mt-5 rounded-[22px] border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8 sm:py-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Product Info */}
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f3f7f2] text-5xl">
                {product.image}
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                  {summaryLine}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Link
                    href={`/category/${product.category}`}
                    className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800 transition hover:bg-green-100"
                  >
                    <span>{product.categoryIcon}</span>
                    {product.categoryNameBn}
                  </Link>

                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    প্রতি {unit}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className="font-bold">
                    {priceChange > 0
                      ? "বেড়েছে"
                      : priceChange < 0
                        ? "কমেছে"
                        : "অপরিবর্তিত"}
                  </span>{" "}
                  {priceChange !== 0 && (
                    <>
                      ·{" "}
                      <span
                        className={
                          priceChange > 0
                            ? "font-bold text-green-600"
                            : "font-bold text-red-600"
                        }
                      >
                        {formatPrice(Math.abs(priceChange))} টাকা
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="min-w-[150px] rounded-2xl bg-[#f4f8f3] px-6 py-4 text-center sm:text-right">
              <p className="text-sm font-medium text-slate-500">আজকের দাম</p>

              <p className="mt-1 text-3xl font-black text-slate-800">
                {formatPrice(product.today)}
              </p>

              <p className="mt-1 text-sm text-slate-500">টাকা / {unit}</p>

              <p className={`mt-1 text-xs font-bold ${getChangeClass(change)}`}>
                {formatChange(change)}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-7 rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold text-slate-900">দামের সারসংক্ষেপ</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-2xl font-black text-green-600">
                {formatPrice(minPrice)} টাকা
              </p>

              <p className="mt-2 text-xs text-slate-500">
                সবচেয়ে কম দামের বাজার
              </p>

              {minMarket && (
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {minMarket.market}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">সর্বাধিক দাম</p>

              <p className="mt-2 text-2xl font-black text-red-500">
                {formatPrice(maxPrice)} টাকা
              </p>

              <p className="mt-2 text-xs text-slate-500">
                সবচেয়ে বেশি দামের বাজার
              </p>

              {maxMarket && (
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {maxMarket.market}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">গড় দাম</p>

              <p className="mt-2 text-2xl font-black text-green-600">
                {formatPrice(Math.round(averagePrice))} টাকা
              </p>

              <p className="mt-2 text-xs text-slate-500">
                প্রতি {unit}-এর হিসাবে
              </p>
            </div>
          </div>
        </section>

        <section className="mt-7 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold text-slate-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {marketPrices.length > 0 ? (
            <div className="mt-5">
              <table className="w-full table-fixed border-collapse text-[10px] sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-300 text-left">
                    <th className="w-[24%] px-1.5 py-3 font-bold text-slate-700 sm:px-4 sm:py-4">
                      বাজার
                    </th>

                    <th className="w-[18%] px-1.5 py-3 font-bold text-slate-700 sm:px-4 sm:py-4">
                      বিভাগ
                    </th>

                    <th className="w-[19%] px-1 py-3 text-right font-bold text-slate-700 sm:px-4 sm:py-4">
                      সর্বনিম্ন
                    </th>

                    <th className="w-[19%] px-1 py-3 text-right font-bold text-slate-700 sm:px-4 sm:py-4">
                      সর্বাধিক
                    </th>

                    <th className="w-[20%] px-1 py-3 text-right font-bold text-slate-700 sm:px-4 sm:py-4">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {marketPrices.map((market, index) => {
                    const marketAverage = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={market.market}
                        className={`border-b border-slate-200 last:border-b-0 ${index % 2 === 1 ? "bg-[#f3f7f2]" : "bg-white"
                          }`}
                      >
                        <td className="break-words px-1.5 py-3 font-semibold text-slate-700 sm:px-4 sm:py-4">
                          {market.market}
                        </td>

                        <td className="break-words px-1.5 py-3 text-slate-600 sm:px-4 sm:py-4">
                          {market.division}
                        </td>

                        <td className="px-1 py-3 text-right font-medium text-slate-700 sm:px-4 sm:py-4">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="px-1 py-3 text-right font-medium text-slate-700 sm:px-4 sm:py-4">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="px-1 py-3 text-right font-bold text-slate-800 sm:px-4 sm:py-4">
                          <span className="sm:hidden">
                            {formatPrice(Math.round(marketAverage))} টাকা
                          </span>

                          <span className="hidden sm:inline">
                            {formatDecimalPrice(marketAverage)} টাকা
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              বাজারভিত্তিক তথ্য বর্তমানে পাওয়া যায়নি।
            </p>
          )}
        </section>

      </div>
    </main>
  );
};

export default ProductDetails;
