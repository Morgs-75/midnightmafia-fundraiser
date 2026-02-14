import { motion } from "motion/react";
import { Eye, Users } from "lucide-react";
import { useState, useEffect } from "react";

export function LiveViewers() {
  const [viewers, setViewers] = useState(47);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increase or decrease viewers
      setViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newVal = prev + change;
        return Math.max(35, Math.min(75, newVal)); // Keep between 35-75
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 pointer-events-none"
    >
      <div className="flex flex-col gap-2">
        {/* Live viewers badge */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-gradient-to-r from-red-600 to-pink-600 rounded-full px-4 py-2 shadow-xl border-2 border-white/30 flex items-center gap-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-white rounded-full"
          />
          <Eye className="w-4 h-4 text-white" />
          <span className="text-white font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {viewers} watching
          </span>
        </motion.div>

        {/* Active supporters */}
        <motion.div
          animate={{ 
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full px-4 py-2 shadow-xl border-2 border-white/30 flex items-center gap-2"
        >
          <Users className="w-4 h-4 text-white" />
          <span className="text-white font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {Math.floor(viewers * 1.2)} supporters
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
