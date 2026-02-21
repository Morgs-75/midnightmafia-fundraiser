import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, X } from "lucide-react";
import { calculateTotal, calculateTotalWithFees, PRICE_PER_NUMBER } from "../../lib/pricing";

interface CheckoutBarProps {
  selectedNumbers: number[];
  onCheckout: () => void;
  onClearSelection: () => void;
}

export function CheckoutBar({ selectedNumbers, onCheckout, onClearSelection }: CheckoutBarProps) {
  const count = selectedNumbers.length;
  const { total: subtotal, savings } = calculateTotal(count);
  const total = calculateTotalWithFees(subtotal);

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

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={onClearSelection}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={onCheckout}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Checkout</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-purple-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {count} {count === 1 ? 'number' : 'numbers'} selected
                  </p>
                  <p className="text-xs text-purple-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    #{selectedNumbers.sort((a, b) => a - b).join(', #')}
                  </p>
                </div>

                <div className="text-right">
                  {savings > 0 && (
                    <p className="text-xs text-yellow-400 line-through opacity-70" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      ${count * PRICE_PER_NUMBER}
                    </p>
                  )}
                  <p className="text-2xl text-yellow-400" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}>
                    ${total.toFixed(2)}
                  </p>
                  <p className="text-xs text-purple-300 opacity-75" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Includes payment fee
                  </p>
                  {savings > 0 && (
                    <p className="text-xs text-green-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Save ${savings}!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}