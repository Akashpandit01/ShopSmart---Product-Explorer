export const formatCurrency = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
