import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, X, Gift, Sparkles } from "lucide-react";

interface CheckoutBarProps {
  selectedNumbers: number[];
  pricePerNumber: number;
  onCheckout: () => void;
  onClearSelection: () => void;
}

// Helper to calculate price with bulk deal
// Buy 4 for $100, get the 5th FREE
// Special deal: 10 numbers = $175
// Once you have 5 numbers, you can get 6 more for $100 each package (11 = $200)
const calculatePrice = (count: number, pricePerNumber: number) => {
  if (count === 0) return 0;
  
  // First tier: 1-4 numbers at $25 each
  if (count <= 4) {
    return count * pricePerNumber;
  }
  
  // First package: 5 numbers for $100 (buy 4, get 1 free)
  if (count === 5) {
    return 100;
  }
  
  // 6-9 numbers: $100 for first 5, then $25 each for remainder
  if (count >= 6 && count <= 9) {
    return 100 + ((count - 5) * pricePerNumber);
  }
  
  // Special deal: 10 numbers = $175
  if (count === 10) {
    return 175;
  }
  
  // After 10 numbers, calculate based on packages
  // 11 numbers = $200 (5 + 6 for $100 each)
  // count = 5 + additional
  // First 5 = $100, then packages of 6 for $100 each
  const additional = count - 5;
  const additionalPackages = Math.floor(additional / 6);
  const remainder = additional % 6;
  
  // Base: $100 for first 5 numbers
  // Additional complete packages: additionalPackages * $100
  // Remainder numbers: remainder * $25 each
  return 100 + (additionalPackages * 100) + (remainder * pricePerNumber);
};

export function CheckoutBar({ selectedNumbers, pricePerNumber, onCheckout, onClearSelection }: CheckoutBarProps) {
  const count = selectedNumbers.length;
  const total = calculatePrice(count, pricePerNumber);
  const isOneAwayFromBonus = count % 5 === 4;
  const isAtFiveNumbers = count === 5;
  const bulkSets = Math.floor(count / 5);
  const savings = count > 0 ? (count * pricePerNumber) - total : 0;

  return (
    <AnimatePresence>
      {selectedNumbers.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-pink-900 border-t-2 border-purple-500 shadow-2xl shadow-purple-900/50 z-50"
        >
          <div className="px-4 py-4 max-w-4xl mx-auto">
            {/* Bonus message when at 4, 9, 14, etc. */}
            {isOneAwayFromBonus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg border border-yellow-500/50 flex items-center gap-2"
              >
                <Gift className="w-5 h-5 text-yellow-400 animate-pulse" />
                <p className="text-sm text-yellow-300 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  🎁 Click for a BONUS number! Next number is FREE
                </p>
              </motion.div>
            )}
            
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={onClearSelection}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <div>
                  <p className="text-sm text-purple-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {count} {count === 1 ? 'number' : 'numbers'} selected
                    {bulkSets > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded text-xs">
                        {bulkSets} FREE!
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-purple-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    #{selectedNumbers.sort((a, b) => a - b).join(', #')}
                  </p>
                </div>
              </div>
              
              <div className="text-right mr-4">
                {savings > 0 && (
                  <p className="text-xs text-yellow-400 line-through opacity-70" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    ${count * pricePerNumber}
                  </p>
                )}
                <p className="text-2xl text-yellow-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  ${total}
                </p>
                {savings > 0 && (
                  <p className="text-xs text-green-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Save ${savings}!
                  </p>
                )}
              </div>
              
              <button
                onClick={onCheckout}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Checkout</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}