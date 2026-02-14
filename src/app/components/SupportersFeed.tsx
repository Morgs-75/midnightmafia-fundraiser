import { motion } from "motion/react";
import { SupporterEntry } from "../types";
import { Heart } from "lucide-react";

interface SupportersFeedProps {
  supporters: SupporterEntry[];
}

export function SupportersFeed({ supporters }: SupportersFeedProps) {
  return (
    <section className="px-4 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Heart className="w-5 h-5 text-pink-500" />
        <h2 className="text-2xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          Recent Supporters
        </h2>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {supporters.map((supporter, index) => (
          <motion.div
            key={`${supporter.number}-${supporter.timestamp.getTime()}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-600/30 to-yellow-700/30 border-2 border-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <span className="text-xl text-yellow-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {supporter.number}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {supporter.displayName}
                </p>
                {supporter.message && (
                  <p className="text-sm text-gray-300 italic" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    "{supporter.message}"
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}