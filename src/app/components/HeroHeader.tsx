import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface HeroHeaderProps {
  drawDate: Date;
}

export function HeroHeader({ drawDate }: HeroHeaderProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = drawDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft("Draw completed!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [drawDate]);

  const formatDrawDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <header className="relative px-4 py-8 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none" />
      
      <div className="relative">
        {/* LOUD PRIZE BANNER */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 blur-xl opacity-50 animate-pulse" />
          <div className="relative bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-2xl py-4 px-6 border-4 border-yellow-300 shadow-2xl shadow-yellow-500/50 animate-pulse">
            <div className="text-xs md:text-sm text-yellow-900 font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              🏆 GRAND PRIZE 🏆
            </div>
            <div className="text-5xl md:text-7xl font-black text-yellow-900 tracking-tight" style={{ fontFamily: 'Bebas Neue, sans-serif', textShadow: '2px 2px 0px rgba(0,0,0,0.1)', fontWeight: 900, letterSpacing: '1px' }}>
              WIN $250
            </div>
            <div className="text-xs md:text-sm text-yellow-900 font-bold mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              ⚡ ONE LUCKY NUMBER TAKES ALL ⚡
            </div>
          </div>
        </div>

        {/* COMMENTED OUT FOR NOW - COUNTDOWN TIMER */}
        {/* <div className="inline-flex flex-col items-center gap-2 px-6 py-3 mb-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">{formatDrawDate(drawDate)}</span>
          </div>
          {timeLeft && (
            <div className="text-xl font-bold text-yellow-400" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 700, letterSpacing: '0.5px' }}>
              {timeLeft}
            </div>
          )}
        </div> */}
        
        <h1 className="text-6xl md:text-7xl mb-4 tracking-tight" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 900, letterSpacing: '1px' }}>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200">
            Midnight Mafia Bingo!
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Pick your number. Support the team. Win prizes.
        </p>
        
        {/* PRICING SECTION */}
        <div className="mt-8 max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl text-yellow-400 mb-4 font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 700, letterSpacing: '0.5px' }}>
            💰 Pricing 💰
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            {/* Individual */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-4 border border-purple-500/30">
              <p className="text-white text-lg font-extrabold mb-1 uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}>
                Single Number
              </p>
              <p className="text-yellow-400 text-4xl font-black" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}>
                $25
              </p>
              <p className="text-gray-300 text-sm mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Perfect for a quick entry!
              </p>
            </div>

            {/* Best Deal - 5 Numbers */}
            <motion.div
              className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-4 pt-6 border-2 border-green-400/50 relative"
              animate={{
                rotate: [0, -2, 2, -2, 2, 0],
                scale: [1, 1.05, 1, 1.05, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                MOST POPULAR
              </motion.div>
              <p className="text-white text-lg font-extrabold mb-1 uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}>
                5 Numbers (1 Free)
              </p>
              <p className="text-yellow-400 text-4xl font-black" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}>
                $100
              </p>
              <p className="text-gray-300 text-sm mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Save $25! (Regular $125)
              </p>
            </motion.div>

            {/* 10 Numbers */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-4 border border-purple-500/30">
              <p className="text-white text-lg font-extrabold mb-1 uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}>
                10 Numbers (3 Free)
              </p>
              <p className="text-yellow-400 text-4xl font-black" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900 }}>
                $175
              </p>
              <p className="text-gray-300 text-sm mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Save $75! (Regular $250)
              </p>
            </div>
          </div>
          <p className="text-center text-yellow-300 text-sm mt-4 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ⚡ More numbers = Better odds of winning $250! 
          </p>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-3 justify-center text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-purple-500 bg-transparent" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
            <span>Sold</span>
          </div>
        </div>
      </div>
    </header>
  );
}