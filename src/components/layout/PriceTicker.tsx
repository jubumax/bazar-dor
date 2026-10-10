"use client";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

import type { Product } from "@/src/types/product";
import {
  formatChange,
  formatPrice,
  getChangeClass,
  getSignedChange,
  getUnitLabel,
} from "@/src/lib/utils";

interface PriceTickerProps {
  products: Product[];
}

const PriceTicker = ({ products }: PriceTickerProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden border-y border-slate-200 bg-[#FAFCFA] text-slate-700">
      <MarqueeText
        direction="right"
        duration={10}
        pauseOnHover
        className="flex items-center"
      >
        {products.map((product) => {
          const change = getSignedChange(product);

          return (
            <div
              key={product.id}
              className="flex shrink-0 items-center gap-2 px-4 py-2 text-sm"
            >
              <span>{product.image}</span>

              <span className="font-bold">{product.nameBn}</span>

              <span>
                {formatPrice(product.today)} টাকা/{getUnitLabel(product.unit)}
              </span>

              <span className={`font-semibold ${getChangeClass(change)}`}>
                {formatChange(change)}
              </span>
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default PriceTicker;
