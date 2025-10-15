export const USD_TO_INR_RATE = 83;

export function formatINRFromUSD(amountUSD: number, rate: number = USD_TO_INR_RATE): string {
  const inr = amountUSD * rate;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr);
}
