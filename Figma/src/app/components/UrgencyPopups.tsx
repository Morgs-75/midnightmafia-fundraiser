import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, Gift, Sparkles, Zap } from "lucide-react";

interface UrgencyPopup {
  id: string;
  title: string;
  message: string;
  countdown?: number;
  type: "flash" | "bonus" | "alert";
}

interface UrgencyPopupsProps {
  onClaimBonus: (popupType: "flash" | "bonus" | "alert") => void;
  availableCount: number;
}

const POPUP_CONFIGS = [
  {
    type: "flash" as const,
    title: "⚡ FLASH DEAL!",
    message: "Get 10 numbers for $200 or 15 numbers for $275!",
    countdown: 180 // 3 minutes
  },
  {
    type: "alert" as const,
    title: "🔥 ALMOST SOLD OUT!",
    message: "Only 12 numbers remaining!",
    countdown: 90
  },
  {
    type: "bonus" as const,
    title: "💎 BONUS OFFER!",
    message: "10 numbers for $200 or 15 numbers for $275!",
    countdown: 120
  },
  {
    type: "flash" as const,
    title: "⏰ HURRY!",
    message: "Someone is viewing the same numbers!",
    countdown: 60
  },
  {
    type: "alert" as const,
    title: "🚨 DON'T MISS OUT!",
    message: "3 people are viewing this page right now!",
    countdown: 45
  },
  {
    type: "flash" as const,
    title: "👀 SOMEONE WANTS YOUR NUMBER!",
    message: "It looks like somebody wants your number...",
    countdown: 75
  },
  {
    type: "alert" as const,
    title: "⚠️ GOING FAST!",
    message: "8 numbers sold in the last hour!",
    countdown: 55
  },
  {
    type: "bonus" as const,
    title: "💥 LAST CHANCE!",
    message: "This deal expires soon - grab it now!",
    countdown: 90
  },
  {
    type: "flash" as const,
    title: "🔔 SOMEONE JUST BOUGHT!",
    message: "Numbers flying off the board - don't wait!",
    countdown: 50
  },
  {
    type: "alert" as const,
    title: "😱 YOU'RE GONNA MISS IT!",
    message: "Your favorite numbers could be gone in seconds!",
    countdown: 65
  },
  {
    type: "flash" as const,
    title: "👁️ 12 PEOPLE WATCHING!",
    message: "Someone else is looking at your numbers!",
    countdown: 40
  },
  {
    type: "bonus" as const,
    title: "⚡ ACT NOW!",
    message: "Best numbers going quick - secure yours!",
    countdown: 70
  },
];

export function UrgencyPopups({ onClaimBonus, availableCount }: UrgencyPopupsProps) {
  const [popup, setPopup] = useState<UrgencyPopup | null>(null);
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    const showPopup = () => {
      const config = POPUP_CONFIGS[Math.floor(Math.random() * POPUP_CONFIGS.length)];
      
      // Update message for alert type with actual count
      let message = config.message;
      if (config.type === "alert") {
        message = `Only ${availableCount} numbers remaining!`;
      }
      
      const popup: UrgencyPopup = {
        id: `popup-${Date.now()}`,
        ...config,
        message
      };
      
      setPopup(popup);
      setCountdown(config.countdown || 0);
    };

    // Show first popup after 10 seconds
    const initialTimeout = setTimeout(showPopup, 10000);

    // Show popups every 20-40 seconds
    const interval = setInterval(() => {
      if (!popup && Math.random() > 0.3) { // 70% chance if no popup showing
        showPopup();
      }
    }, Math.random() * 20000 + 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [popup, availableCount]);

  useEffect(() => {
    if (!popup || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setPopup(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [popup, countdown]);

  const handleClose = () => {
    setPopup(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {popup && (
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
          }}
          exit={{ scale: 0, rotate: 10, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-24 md:bottom-8 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[360px] md:w-[380px] lg:w-[400px]"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(236, 72, 153, 0.3)",
                "0 0 40px rgba(236, 72, 153, 0.6)",
                "0 0 20px rgba(236, 72, 153, 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-gradient-to-br from-pink-600 via-purple-600 to-purple-700 rounded-2xl p-5 border-2 border-white/30 shadow-2xl relative overflow-hidden"
          >
            {/* Background animation */}
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 pointer-events-none"
            />

            {/* Content */}
            <div className="relative">
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="flex items-start gap-3 mb-3">
                <div className="bg-white/20 rounded-full p-2">
                  {popup.type === "flash" ? <Zap className="w-5 h-5 text-yellow-300" /> :
                   popup.type === "bonus" ? <Gift className="w-5 h-5 text-yellow-300" /> :
                   <Sparkles className="w-5 h-5 text-yellow-300" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-white font-black mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {popup.title}
                  </h3>
                  <p className="text-sm text-white/90" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {popup.message}
                  </p>
                </div>
              </div>

              {countdown > 0 && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="bg-black/30 rounded-lg px-4 py-2 text-center backdrop-blur-sm"
                >
                  <p className="text-xs text-white/70 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Time remaining:
                  </p>
                  <p className="text-3xl text-white font-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {formatTime(countdown)}
                  </p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-3 bg-white text-purple-700 font-bold py-2 rounded-lg shadow-lg"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                onClick={() => onClaimBonus(popup.type)}
              >
                CLAIM NOW! 🚀
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}