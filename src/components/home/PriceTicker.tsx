import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

import type { Product } from "@/src/types/product";
import { formatPrice } from "@/src/lib/utils";

interface PriceTickerProps {
  products: Product[];
}

const getUnitInBangla = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    dozen: "ডজন",
  };

  return units[unit] ?? unit;
};

const PriceTicker = ({ products }: PriceTickerProps) => {
  return (
    <div className="overflow-hidden border-y border-slate-200 bg-[#FAFCFA] text-slate-700">
      <MarqueeText
        direction="right"
        duration={10}
        pauseOnHover
        className="flex items-center"
      >
        {products
          .filter((product) => product.change.pct !== 0)
          .map((product) => {
            const change = product.change.pct;
            const isUp = product.change.dir === "up";

            return (
              <div
                key={product.id}
                className="flex shrink-0 items-center gap-2 px-4 py-2 text-sm"
              >
                <span>{product.image}</span>

                <span className="font-bold">{product.nameBn}</span>

                <span>
                  {formatPrice(product.today)} টাকা/
                  {getUnitInBangla(product.unit)}
                </span>

                <span className={isUp ? "text-red-500" : "text-green-600"}>
                  {isUp ? "▲" : "▼"} {Math.abs(change)}%
                </span>
              </div>
            );
          })}
      </MarqueeText>
    </div>
  );
};

export default PriceTicker;
