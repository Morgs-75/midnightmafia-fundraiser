import { motion, AnimatePresence } from "motion/react";
import { X, Gift, Zap, TrendingUp, Sparkles } from "lucide-react";

interface UpsellModalProps {
  isOpen: boolean;
  selectedNumbers: number[];
  pricePerNumber: number;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export function UpsellModal({ isOpen, selectedNumbers, pricePerNumber, onClose, onAccept, onDecline }: UpsellModalProps) {
  const currentCount = selectedNumbers.length;

  // Pricing: $25 each, or 5 for $100 (save $25)
  // Upsell only shown for 2–4 numbers: upgrade to 5 for $100

  const numbersToAdd = 5 - currentCount;
  const newTotal = 5;
  const currentPrice = currentCount * 25;
  const dealPrice = 100;
  const additionalCost = 100 - currentPrice;
  const isBonus = additionalCost === 0;
  const upsellMessage = additionalCost === 0
    ? "Add 1 more number for FREE and get 5 for $100!"
    : `Upgrade to 5 for $100 — add ${numbersToAdd} more for only $${additionalCost}!`;

  const regularPrice = newTotal * pricePerNumber;
  const savings = regularPrice - dealPrice;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl z-[70] overflow-y-auto max-h-[90vh]"
          >
            {/* Pulsing glow effect */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 40px rgba(236, 72, 153, 0.4)",
                  "0 0 80px rgba(236, 72, 153, 0.8)",
                  "0 0 40px rgba(236, 72, 153, 0.4)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl"
            />

            <div className="relative bg-gradient-to-br from-pink-600 via-purple-600 to-purple-700 rounded-3xl border-4 border-yellow-400 shadow-2xl overflow-hidden">
              {/* Animated background sparkles */}
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0"
              />

              {/* Content */}
              <div className="relative p-6 md:p-8">
                {/* Floating badges - Multiple! */}
                <motion.div
                  animate={{ 
                    y: [-5, 5, -5],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-3 -right-3 bg-yellow-400 rounded-full px-4 py-2 border-4 border-white shadow-xl z-10"
                >
                  <p className="text-purple-900 font-black text-sm" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    🔥 HOT DEAL!
                  </p>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [5, -5, 5],
                    rotate: [5, -5, 5],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute -top-3 -left-3 bg-red-500 rounded-full px-4 py-2 border-4 border-white shadow-xl z-10"
                >
                  <p className="text-white font-black text-xs" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    💯 FREE!
                  </p>
                </motion.div>

                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/2 -left-4 bg-orange-500 rounded-full px-3 py-2 border-4 border-white shadow-xl z-10"
                >
                  <p className="text-white font-black text-xs" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    ⚡BONUS⚡
                  </p>
                </motion.div>

                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute top-1/2 -right-4 bg-green-500 rounded-full px-3 py-2 border-4 border-white shadow-xl z-10"
                >
                  <p className="text-white font-black text-xs" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    SAVE ${savings}
                  </p>
                </motion.div>

                {/* Main content */}
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block mb-4"
                  >
                    <Gift className="w-20 h-20 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]" />
                  </motion.div>

                  <motion.h2 
                    animate={{ 
                      scale: [1, 1.05, 1],
                      textShadow: [
                        "0 0 20px rgba(250,204,21,0.8)",
                        "0 0 40px rgba(250,204,21,1)",
                        "0 0 20px rgba(250,204,21,0.8)",
                      ]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-5xl md:text-7xl text-white mb-2 leading-tight drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]" 
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    🚨 WAIT! BONUS ALERT! 🚨
                  </motion.h2>

                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      y: [0, -5, 0]
                    }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="mb-4"
                  >
                    <p className="text-3xl md:text-4xl text-yellow-300 font-black mb-2 drop-shadow-[0_0_10px_rgba(253,224,71,1)]" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      ⚡ CLICK FOR A BONUS NUMBER! ⚡
                    </p>
                    <p className="text-2xl md:text-3xl text-white font-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      NEXT NUMBER IS <span className="text-yellow-300 text-4xl md:text-5xl">FREE!</span>
                    </p>
                  </motion.div>
                  
                  <motion.p
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="text-xl md:text-2xl text-white font-bold mb-4 px-4"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {isBonus ? (
                      <>
                        Get {numbersToAdd} EXTRA {numbersToAdd === 1 ? 'NUMBER' : 'NUMBERS'} <span className="text-yellow-300 text-3xl">100% FREE!</span>
                      </>
                    ) : additionalCost === 0 ? (
                      <>
                        Add {numbersToAdd} more {numbersToAdd === 1 ? 'number' : 'numbers'} for <span className="text-yellow-300 text-3xl">$0!</span>
                      </>
                    ) : (
                      <>
                        Add {numbersToAdd} more {numbersToAdd === 1 ? 'number' : 'numbers'} for only <span className="text-yellow-300 text-3xl">${additionalCost}!</span>
                      </>
                    )}
                  </motion.p>

                  {/* Deal visualization */}
                  <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-yellow-400/50">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-gray-300 text-sm mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          You selected:
                        </p>
                        <p className="text-3xl text-white font-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                          {currentCount}
                        </p>
                        <p className="text-yellow-300 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          ${currentPrice}
                        </p>
                      </div>

                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <TrendingUp className="w-8 h-8 text-yellow-400" />
                      </motion.div>

                      <div className="text-center">
                        <p className="text-gray-300 text-sm mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Upgrade to:
                        </p>
                        <p className="text-3xl text-yellow-300 font-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                          {newTotal}
                        </p>
                        <p className="text-yellow-300 text-sm font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          ${dealPrice}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-3"
                    >
                      <p className="text-white text-xl font-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        💰 SAVE ${savings}! 💰
                      </p>
                      <p className="text-white/90 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {savings >= 50 ? `That's ${Math.floor(savings / 25)} numbers completely FREE!` : savings >= 25 ? 'That\'s 1 number completely FREE!' : 'Better value deal!'}
                      </p>
                    </motion.div>
                  </div>

                  {/* Urgency message */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <p className="text-yellow-200 text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Limited time offer • Better value • More chances to win!
                    </p>
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={onAccept}
                    animate={{
                      scale: [1, 1.03, 1],
                      boxShadow: [
                        "0 0 30px rgba(250,204,21,0.6)",
                        "0 0 50px rgba(250,204,21,1)",
                        "0 0 30px rgba(250,204,21,0.6)",
                      ]
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-500 rounded-2xl text-purple-900 font-black text-2xl md:text-3xl shadow-2xl border-4 border-white"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <div className="text-3xl md:text-4xl mb-1">
                        {isBonus ? '🎁 CLAIM MY BONUS! 🎁' : additionalCost === 0 ? '🎁 CLAIM FREE NUMBER! 🎁' : '⚡ UPGRADE NOW! ⚡'}
                      </div>
                      <div className="text-lg md:text-xl">
                        {additionalCost === 0 ? `YES! Add ${numbersToAdd} for FREE!` : `YES! Add ${numbersToAdd} for $${additionalCost}!`}
                      </div>
                    </motion.div>
                  </motion.button>

                  <button
                    onClick={onDecline}
                    className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white/70 font-semibold border-2 border-white/20 transition-all text-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {isBonus || additionalCost === 0 ? "No thanks, I don't want the bonus" : "No thanks, proceed with current selection"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}