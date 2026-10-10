export function toEnglishNumber(value: string | number) {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  return String(value).replace(/[০-৯]/g, (digit) => {
    return englishDigits[banglaDigits.indexOf(digit)];
  });
}

export function toBanglaNumber(value: string | number) {
  const englishDigits = "0123456789";
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(/[0-9]/g, (digit) => {
    return banglaDigits[englishDigits.indexOf(digit)];
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

export function getChangeValue(product: {
  changePercent?: number;
}) {
  return Number(product.changePercent) || 0;
}