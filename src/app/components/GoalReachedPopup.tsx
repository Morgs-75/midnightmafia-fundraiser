import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, PartyPopper } from "lucide-react";

interface GoalReachedPopupProps {
  totalRaised: number;
  goalAmount: number;
}

export function GoalReachedPopup({ totalRaised, goalAmount }: GoalReachedPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if we've reached the goal and haven't shown this popup before
    if (totalRaised >= goalAmount) {
      const hasShownGoalPopup = localStorage.getItem('hasShownGoalReachedPopup');
      if (!hasShownGoalPopup) {
        // Show popup after a brief delay
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [totalRaised, goalAmount]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasShownGoalReachedPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[250] w-[95vw] max-w-xl"
          >
            <motion.div
              className="relative bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 rounded-3xl p-10 md:p-12 border-4 border-green-400 shadow-2xl shadow-green-500/50"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(34, 197, 94, 0.5)",
                  "0 0 80px rgba(34, 197, 94, 0.8)",
                  "0 0 40px rgba(34, 197, 94, 0.5)",
                ],
                borderColor: [
                  "rgb(34, 197, 94)",
                  "rgb(187, 247, 208)",
                  "rgb(34, 197, 94)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Multiple glow layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-emerald-400/30 to-green-400/30 rounded-3xl blur-2xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-400/20 to-green-400/20 rounded-3xl blur-3xl" />

              {/* Confetti effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `-10%`,
                      backgroundColor: ['#fbbf24', '#f472b6', '#a78bfa', '#34d399'][Math.floor(Math.random() * 4)]
                    }}
                    animate={{
                      y: ['0vh', '120vh'],
                      x: [0, (Math.random() - 0.5) * 100],
                      rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                      opacity: [1, 0.8, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeIn"
                    }}
                  />
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 bg-black/30 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="relative text-center">
                {/* Party popper icon */}
                <motion.div
                  animate={{
                    rotate: [0, -15, 15, -15, 0],
                    scale: [1, 1.15, 1, 1.15, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="inline-block mb-4"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                    <PartyPopper className="w-10 h-10 text-green-900" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-400 mb-6 tracking-tight leading-tight"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(34, 197, 94, 0.5)",
                      "0 0 40px rgba(34, 197, 94, 0.8)",
                      "0 0 20px rgba(34, 197, 94, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Goal Reached!
                </motion.h2>

                {/* Total Raised - MASSIVE */}
                <motion.div
                  className="bg-black/60 rounded-3xl py-8 px-6 md:px-10 border-4 border-green-400/50 mb-8"
                  animate={{
                    scale: [1, 1.03, 1],
                    borderColor: [
                      "rgba(34, 197, 94, 0.5)",
                      "rgba(34, 197, 94, 1)",
                      "rgba(34, 197, 94, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-lg md:text-xl font-bold text-green-300 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Total Raised
                  </div>
                  <motion.div
                    className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ${totalRaised}
                  </motion.div>
                </motion.div>

                {/* Thank you text */}
                <motion.p
                  className="text-2xl md:text-3xl text-white font-bold mb-4"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Thank You!
                </motion.p>

                <motion.p
                  className="text-lg md:text-xl text-green-200 font-bold"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  🎉 Your support means the world to us! 🎉
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
