/**
 * Unified pricing logic for the fundraiser
 *
 * Pricing structure:
 * - $25 per number
 * - Buy 4, get 1 FREE (5 for $100)
 * - Every 6 numbers = $100 (buy 5, get 1 free per package)
 * - Special: 10 numbers = $175
 */

export const PRICE_PER_NUMBER = 25;

/**
 * Calculate price with bulk deals
 * @param count Number of tickets being purchased
 * @returns Subtotal before payment processing fees
 */
export function calculatePrice(count: number): number {
  if (count === 0) return 0;

  // First tier: 1-4 numbers at $25 each
  if (count <= 4) {
    return count * PRICE_PER_NUMBER;
  }

  // First package: 5 numbers for $100 (buy 4, get 1 free)
  if (count === 5) {
    return 100;
  }

  // 6-9 numbers: $100 for first 5, then $25 each for remainder
  if (count >= 6 && count <= 9) {
    return 100 + ((count - 5) * PRICE_PER_NUMBER);
  }

  // Special deal: 10 numbers = $175
  if (count === 10) {
    return 175;
  }

  // After 10 numbers, calculate based on packages
  // First 5 = $100, then packages of 6 for $100 each
  const additional = count - 5;
  const additionalPackages = Math.floor(additional / 6);
  const remainder = additional % 6;

  // Base: $100 for first 5 numbers
  // Additional complete packages: additionalPackages * $100
  // Remainder numbers: remainder * $25 each
  return 100 + (additionalPackages * 100) + (remainder * PRICE_PER_NUMBER);
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

  // Calculate free numbers: 1 free per complete package of 6
  const freeNumbers = Math.floor(count / 6);

  return {
    total: subtotal,
    savings,
    freeNumbers
  };
}

/**
 * Calculate Stripe processing fees (1.75% + $0.30 AUD)
 * @param subtotal Subtotal before fees
 * @returns Fee amount in dollars
 */
export function calculateStripeFee(subtotal: number): number {
  return (subtotal * 0.0175) + 0.30;
}

/**
 * Calculate total including Stripe fees
 * @param subtotal Subtotal before fees
 * @returns Total including fees
 */
export function calculateTotalWithFees(subtotal: number): number {
  const fee = calculateStripeFee(subtotal);
  return subtotal + fee;
}
