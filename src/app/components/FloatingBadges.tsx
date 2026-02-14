import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Flame, Zap, Star, Trophy, Target, Sparkles } from "lucide-react";

interface Badge {
  id: string;
  icon: React.ReactNode;
  text: string;
  color: string;
  position: { x: number; y: number };
}

const BADGE_CONFIGS = [
  { icon: <Flame className="w-5 h-5" />, text: "HOT!", color: "from-orange-500 to-red-600" },
  { icon: <Zap className="w-5 h-5" />, text: "FAST!", color: "from-yellow-400 to-orange-500" },
  { icon: <Star className="w-5 h-5" />, text: "LUCKY!", color: "from-purple-500 to-pink-500" },
  { icon: <Trophy className="w-5 h-5" />, text: "WIN BIG!", color: "from-yellow-500 to-yellow-600" },
  { icon: <Target className="w-5 h-5" />, text: "ACT NOW!", color: "from-pink-500 to-purple-600" },
  { icon: <Sparkles className="w-5 h-5" />, text: "TRENDING!", color: "from-cyan-500 to-blue-600" },
];

export function FloatingBadges() {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const createBadge = () => {
      const config = BADGE_CONFIGS[Math.floor(Math.random() * BADGE_CONFIGS.length)];
      const badge: Badge = {
        id: `badge-${Date.now()}-${Math.random()}`,
        ...config,
        position: {
          x: Math.random() * 80 + 10, // 10-90% from left
          y: Math.random() * 60 + 20, // 20-80% from top
        }
      };

      setBadges(prev => [...prev, badge]);

      // Remove badge after 3 seconds
      setTimeout(() => {
        setBadges(prev => prev.filter(b => b.id !== badge.id));
      }, 3000);
    };

    // Create badges every 5-10 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance
        createBadge();
      }
    }, Math.random() * 5000 + 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {badges.map(badge => (
        <motion.div
          key={badge.id}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: `${badge.position.x}vw`,
            y: `${badge.position.y}vh`,
            rotate: -15
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.8],
            rotate: [15, -10, 5, -15],
            y: [`${badge.position.y}vh`, `${badge.position.y - 10}vh`]
          }}
          transition={{ 
            duration: 3,
            times: [0, 0.2, 0.7, 1]
          }}
          className={`absolute bg-gradient-to-r ${badge.color} rounded-full px-4 py-2 shadow-2xl border-2 border-white/30`}
        >
          <div className="flex items-center gap-2 text-white">
            {badge.icon}
            <span className="font-black text-sm" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              {badge.text}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
