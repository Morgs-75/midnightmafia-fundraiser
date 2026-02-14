import { motion, AnimatePresence } from "motion/react";
import { Crown, Zap, TrendingUp, Sparkles, Gift, Star } from "lucide-react";

interface SweepUpsellModalProps {
  isOpen: boolean;
  selectedNumbers: number[];
  pricePerNumber: number;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export function SweepUpsellModal({ isOpen, onAccept, onDecline }: SweepUpsellModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[70]"
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
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-[70] overflow-y-auto max-h-[90vh]"
          >
            {/* Mega glow effect */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 60px rgba(236, 72, 153, 0.6), 0 0 100px rgba(168, 85, 247, 0.4)",
                  "0 0 120px rgba(236, 72, 153, 1), 0 0 200px rgba(168, 85, 247, 0.8)",
                  "0 0 60px rgba(236, 72, 153, 0.6), 0 0 100px rgba(168, 85, 247, 0.4)",
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl"
            />

            <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 rounded-3xl border-[6px] border-yellow-400 shadow-2xl overflow-hidden">
              {/* Animated rays background */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-30"
                style={{
                  background: "repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(255,255,255,0.1) 10deg 20deg)"
                }}
              />

              {/* Multiple animated sparkle layers */}
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 10% 10%, rgba(255,255,255,0.3) 0%, transparent 30%)",
                    "radial-gradient(circle at 90% 90%, rgba(255,255,255,0.3) 0%, transparent 30%)",
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 30%)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0"
              />

              {/* Content */}
              <div className="relative p-6 md:p-10">
                {/* Explosion of floating badges */}
                <motion.div
                  animate={{ 
                    y: [-8, 8, -8],
                    rotate: [-10, 10, -10],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 rounded-full px-6 py-3 border-[5px] border-white shadow-2xl z-10"
                >
                  <p className="text-white font-black text-base md:text-lg" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    🔥🔥 MEGA DEAL! 🔥🔥
                  </p>
                </motion.div>

                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/4 -left-5 bg-yellow-400 rounded-full px-4 py-3 border-[5px] border-white shadow-2xl z-10"
                >
                  <p className="text-purple-900 font-black text-sm" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    💰 $100
                  </p>
                </motion.div>

                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute top-1/4 -right-5 bg-green-500 rounded-full px-4 py-3 border-[5px] border-white shadow-2xl z-10"
                >
                  <p className="text-white font-black text-sm" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    🎁 FREE
                  </p>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [8, -8, 8],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="absolute bottom-1/4 -left-6 bg-orange-500 rounded-full px-4 py-3 border-[5px] border-white shadow-2xl z-10"
                >
                  <p className="text-white font-black text-xs" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    ⚡ 6 FOR 1
                  </p>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [-8, 8, -8],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="absolute bottom-1/4 -right-6 bg-pink-500 rounded-full px-4 py-3 border-[5px] border-white shadow-2xl z-10"
                >
                  <p className="text-white font-black text-xs" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    👑 KING
                  </p>
                </motion.div>

                {/* Main content */}
                <div className="text-center mb-8 mt-6">
                  {/* Mega crown animation */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 15, -15, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block mb-6"
                  >
                    <div className="relative">
                      <Crown className="w-24 h-24 md:w-32 md:h-32 text-yellow-300 drop-shadow-[0_0_30px_rgba(253,224,71,1)]" />
                      <motion.div
                        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl"
                      />
                    </div>
                  </motion.div>

                  {/* Mega headline */}
                  <motion.h2 
                    animate={{ 
                      scale: [1, 1.08, 1],
                      textShadow: [
                        "0 0 30px rgba(250,204,21,1), 0 0 60px rgba(250,204,21,0.8)",
                        "0 0 60px rgba(250,204,21,1), 0 0 100px rgba(250,204,21,1)",
                        "0 0 30px rgba(250,204,21,1), 0 0 60px rgba(250,204,21,0.8)",
                      ]
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-6xl md:text-8xl text-white mb-4 leading-none" 
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    <motion.div
                      animate={{ rotate: [-2, 2, -2] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      🏆 WHY NOT SWEEP 🏆
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.12, 1],
                        y: [0, -5, 0]
                      }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="text-yellow-300 text-7xl md:text-9xl mt-2"
                    >
                      THE BOARD?!
                    </motion.div>
                  </motion.h2>

                  {/* Subheadline explosion */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      y: [0, -8, 0]
                    }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="mb-6 bg-black/40 backdrop-blur-sm rounded-3xl p-6 border-4 border-yellow-400"
                  >
                    <motion.p 
                      animate={{ 
                        scale: [1, 1.06, 1],
                      }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-4xl md:text-5xl text-yellow-300 font-black mb-3 drop-shadow-[0_0_20px_rgba(253,224,71,1)]" 
                      style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                    >
                      ⚡ TAKE ANOTHER 6 NUMBERS ⚡
                    </motion.p>
                    <motion.p 
                      animate={{ 
                        scale: [1, 1.08, 1],
                      }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="text-3xl md:text-4xl text-white font-black mb-2" 
                      style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                    >
                      FOR ONLY <span className="text-yellow-300 text-5xl md:text-6xl">$100!</span>
                    </motion.p>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.12, 1],
                        rotate: [-1, 1, -1]
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl px-6 py-3 border-4 border-white mt-2"
                    >
                      <p className="text-2xl md:text-3xl text-white font-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        (NEXT 5 + 1 <span className="text-yellow-300 text-4xl">FREE</span> BONUS!)
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Visual breakdown with giant numbers */}
                  <div className="bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-sm rounded-3xl p-8 mb-6 border-4 border-purple-400/50">
                    <div className="flex items-center justify-center gap-6 mb-6">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.15, 1],
                          rotate: [-5, 5, -5]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-center bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 border-4 border-white"
                      >
                        <motion.p 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="text-7xl md:text-8xl text-yellow-300 font-black mb-2" 
                          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                        >
                          6
                        </motion.p>
                        <p className="text-xl text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          MORE NUMBERS
                        </p>
                      </motion.div>

                      <motion.div
                        animate={{ 
                          x: [0, 10, 0],
                          scale: [1, 1.3, 1]
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        <div className="text-6xl">🎁</div>
                      </motion.div>

                      <motion.div 
                        animate={{ 
                          scale: [1, 1.15, 1],
                          rotate: [5, -5, 5]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-center bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 border-4 border-white"
                      >
                        <motion.p 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="text-7xl md:text-8xl text-yellow-300 font-black mb-2" 
                          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                        >
                          $100
                        </motion.p>
                        <p className="text-xl text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          TOTAL!
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      animate={{ 
                        scale: [1, 1.08, 1],
                        boxShadow: [
                          "0 0 20px rgba(234, 179, 8, 0.5)",
                          "0 0 40px rgba(234, 179, 8, 1)",
                          "0 0 20px rgba(234, 179, 8, 0.5)",
                        ]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-6 border-4 border-white"
                    >
                      <p className="text-4xl md:text-5xl text-white font-black mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        💎 1 NUMBER 100% FREE! 💎
                      </p>
                      <p className="text-xl md:text-2xl text-white/90 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        That's only <span className="text-yellow-300 text-3xl">$20 per number</span> instead of $25!
                      </p>
                    </motion.div>
                  </div>

                  {/* Reasons to buy more */}
                  <motion.div 
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="grid grid-cols-3 gap-3 mb-6"
                  >
                    <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl p-4 border-3 border-yellow-400">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Star className="w-10 h-10 text-yellow-300 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-white font-black text-sm" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        MORE CHANCES TO WIN!
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 border-3 border-yellow-400">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Zap className="w-10 h-10 text-yellow-300 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-white font-black text-sm" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        BEST VALUE DEAL!
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl p-4 border-3 border-yellow-400">
                      <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Crown className="w-10 h-10 text-yellow-300 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-white font-black text-sm" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        DOMINATE THE BOARD!
                      </p>
                    </div>
                  </motion.div>

                  {/* Urgency line */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </motion.div>
                    <p className="text-yellow-200 text-lg md:text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      This offer expires when you leave this page!
                    </p>
                    <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </motion.div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-4">
                  <motion.button
                    onClick={onAccept}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 40px rgba(250,204,21,0.8), 0 10px 50px rgba(250,204,21,0.5)",
                        "0 0 80px rgba(250,204,21,1), 0 20px 80px rgba(250,204,21,0.8)",
                        "0 0 40px rgba(250,204,21,0.8), 0 10px 50px rgba(250,204,21,0.5)",
                      ]
                    }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-8 bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 rounded-3xl text-purple-900 font-black text-3xl md:text-5xl shadow-2xl border-[6px] border-white"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                      }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                    >
                      <div className="text-4xl md:text-6xl mb-2">
                        👑 YES! SWEEP THE BOARD! 👑
                      </div>
                      <div className="text-xl md:text-2xl">
                        Add 6 More Numbers for $100!
                      </div>
                    </motion.div>
                  </motion.button>

                  <button
                    onClick={onDecline}
                    className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white/60 font-semibold border-2 border-white/20 transition-all text-base"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    No thanks, I'm done purchasing
                  </button>
                </div>

                {/* Social proof footer */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.08, 1],
                    opacity: [0.8, 1, 0.8] 
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-center mt-6 bg-red-600 rounded-full px-6 py-3 border-4 border-white"
                >
                  <p className="text-white text-base md:text-lg font-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    🔥 238 PEOPLE SWEPT THE BOARD TODAY! 🔥
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}