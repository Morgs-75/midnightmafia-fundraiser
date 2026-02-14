import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkles, TrendingUp, Users, Zap, DollarSign, Timer, Crown } from "lucide-react";

interface Notification {
  id: string;
  type: "purchase" | "urgency" | "milestone" | "team";
  message: string;
  icon: React.ReactNode;
  color: string;
}

const FAKE_NAMES = [
  "Jessica M.", "Mike T.", "Sarah L.", "Anonymous", "Coach Davis", 
  "Mom Squad", "Team Alumni", "Emma's Dad", "The Williams Family",
  "Gym Parents", "Ashley K.", "Brandon R.", "Taylor S.", "Jordan P.",
  "Morgan W.", "Casey D.", "Riley M.", "Avery B.", "Quinn L."
];

const URGENCY_MESSAGES = [
  "⚡ Only 15 numbers left!",
  "🔥 Numbers selling FAST!",
  "⏰ Draw happening soon!",
  "💰 Over $2,000 raised!",
  "🎯 85% of board sold!",
  "⚡ Last chance for lucky numbers!",
  "🔥 Someone just swept 6 numbers!",
  "💎 Premium numbers going quick!",
];

const MILESTONE_MESSAGES = [
  "🎉 50 supporters joined!",
  "⭐ $2,500 milestone reached!",
  "🏆 75% funded!",
  "💪 200+ numbers sold!",
  "🎊 New supporter every 2 minutes!",
  "✨ Goal almost reached!",
];

export function CasinoNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const generateNotification = (): Notification => {
      const rand = Math.random();
      const id = `notif-${Date.now()}-${Math.random()}`;

      // 60% chance: Purchase notification
      if (rand < 0.6) {
        const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
        const count = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 2 : 1;
        const timeAgo = Math.floor(Math.random() * 5) + 1;
        
        return {
          id,
          type: "purchase",
          message: `${name} just bought ${count} number${count > 1 ? 's' : ''} ${timeAgo}m ago`,
          icon: <Sparkles className="w-4 h-4" />,
          color: "from-yellow-600 to-yellow-500"
        };
      }
      
      // 20% chance: Urgency message
      if (rand < 0.8) {
        const message = URGENCY_MESSAGES[Math.floor(Math.random() * URGENCY_MESSAGES.length)];
        return {
          id,
          type: "urgency",
          message,
          icon: <Zap className="w-4 h-4" />,
          color: "from-pink-600 to-purple-600"
        };
      }
      
      // 15% chance: Milestone
      if (rand < 0.95) {
        const message = MILESTONE_MESSAGES[Math.floor(Math.random() * MILESTONE_MESSAGES.length)];
        return {
          id,
          type: "milestone",
          message,
          icon: <TrendingUp className="w-4 h-4" />,
          color: "from-green-600 to-emerald-600"
        };
      }
      
      // 5% chance: Team message
      return {
        id,
        type: "team",
        message: "👑 Team has 10 chances to win it ALL!",
        icon: <Crown className="w-4 h-4" />,
        color: "from-purple-600 to-indigo-600"
      };
    };

    // Initial notification
    const initialDelay = setTimeout(() => {
      const notif = generateNotification();
      setNotifications([notif]);
    }, 2000);

    // Regular notifications every 4-8 seconds
    const interval = setInterval(() => {
      const notif = generateNotification();
      setNotifications(prev => {
        // Keep max 3 notifications
        const updated = [notif, ...prev].slice(0, 3);
        return updated;
      });
    }, Math.random() * 4000 + 4000); // 4-8 seconds

    // Auto-remove notifications after 5 seconds
    const cleanupInterval = setInterval(() => {
      setNotifications(prev => {
        if (prev.length === 0) return prev;
        return prev.slice(0, -1); // Remove oldest
      });
    }, 5000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div className="fixed top-20 left-4 right-4 z-40 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notif, index) => (
          <motion.div
            key={notif.id}
            initial={{ x: -100, opacity: 0, scale: 0.8 }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              scale: 1,
              y: index * 70 
            }}
            exit={{ x: -100, opacity: 0, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30 
            }}
            className={`absolute top-0 left-0 max-w-xs bg-gradient-to-r ${notif.color} rounded-lg px-4 py-3 shadow-2xl border-2 border-white/20 backdrop-blur-sm`}
            style={{ zIndex: 50 - index }}
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                {notif.icon}
              </div>
              <p className="text-sm text-white font-semibold flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {notif.message}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
