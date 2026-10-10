import type { Product } from "@/src/types/product";

const BANGLA_DIGITS = "০১২৩৪৫৬৭৮৯";
const ENGLISH_DIGITS = "0123456789";

export function toEnglishNumber(value: string | number) {
  return String(value).replace(/[০-৯]/g, (digit) => {
    return ENGLISH_DIGITS[BANGLA_DIGITS.indexOf(digit)];
  });
}

export function toBanglaNumber(value: string | number) {
  return String(value).replace(/[0-9]/g, (digit) => {
    return BANGLA_DIGITS[ENGLISH_DIGITS.indexOf(digit)];
  });
}

export function formatDecimalPrice(value: number) {
  const formatted = value.toFixed(2).replace(/\.00$/, "");

  return toBanglaNumber(formatted);
}

export function toNumber(value: string | number | undefined) {
  if (value === undefined) {
    return 0;
  }

  const normalized = toEnglishNumber(value)
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  return Number(normalized) || 0;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD").format(price);
}

const UNIT_LABELS: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

export function getUnitLabel(unit: string) {
  return UNIT_LABELS[unit?.toLowerCase?.()] ?? unit;
}


export function getSignedChange(product: Pick<Product, "change">) {
  const pct = Number(product.change?.pct) || 0;

  if (pct === 0) {
    return 0;
  }

  if (product.change?.dir === "down") {
    return -Math.abs(pct);
  }

  if (product.change?.dir === "up") {
    return Math.abs(pct);
  }

  return pct;
}

export function getChangeClass(change: number) {
  if (change > 0) return "text-green-600";
  if (change < 0) return "text-red-600";
  return "text-slate-500";
}

export function getChangeBadgeClass(change: number) {
  if (change > 0) return "bg-green-50 text-green-700";
  if (change < 0) return "bg-red-50 text-red-600";
  return "bg-slate-100 text-slate-500";
}

export function formatChange(change: number) {
  const value = `${toBanglaNumber(Math.abs(change).toFixed(1))}%`;

  if (change > 0) return `▲ ${value}`;
  if (change < 0) return `▼ ${value}`;
  return `—${value}`;
}
