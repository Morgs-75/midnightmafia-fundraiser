/**
 * Unified pricing logic for the fundraiser
 *
 * Pricing structure:
 * - $25 per number
 * - 5 for $100 (save $25)
 * - 6+: $100 for first 5, then $25 each
 */

export const PRICE_PER_NUMBER = 25;

/**
 * Calculate price with bulk deal
 * @param count Number of tickets being purchased
 * @returns Subtotal before payment processing fees
 */
export function calculatePrice(count: number): number {
  if (count === 0) return 0;

  // 1-4 numbers: $25 each
  if (count <= 4) {
    return count * PRICE_PER_NUMBER;
  }

  // 5+ numbers: $100 for first 5, then $25 each
  return 100 + ((count - 5) * PRICE_PER_NUMBER);
}

/**
 * Calculate total with savings breakdown
 * @param count Number of tickets being purchased
 * @returns Object with total, savings, and free numbers count
 */
export function calculateTotal(count: number): {
  total: number;
  savings: number;
  freeNumbers: number;
} {
  const regularPrice = count * PRICE_PER_NUMBER;
  const subtotal = calculatePrice(count);
  const savings = regularPrice - subtotal;

  // 1 number free when buying 5 (saves $25)
  const freeNumbers = count >= 5 ? 1 : 0;

  return {
    total: subtotal,
    savings,
    freeNumbers
  };
}

/**
 * Calculate Square processing fees (1.6% + $0.10 AUD)
 * @param subtotal Subtotal before fees
 * @returns Fee amount in dollars
 */
export function calculateStripeFee(subtotal: number): number {
  // Square AU rate: 1.6% + $0.10
  return Math.round(((subtotal * 0.016) + 0.10) * 100) / 100;
}

/**
 * Calculate total including Square fees
 * @param subtotal Subtotal before fees
 * @returns Total including fees
 */
export function calculateTotalWithFees(subtotal: number): number {
  const fee = calculateStripeFee(subtotal);
  return subtotal + fee;
}
