export const formatCurrency = (
  value: number,
  currency = 'INR',
  locale = 'en-IN'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
};

export default formatCurrency;
