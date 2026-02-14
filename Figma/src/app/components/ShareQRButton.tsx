import { motion } from "motion/react";
import { QrCode } from "lucide-react";

interface ShareQRButtonProps {
  onClick: () => void;
}

export function ShareQRButton({ onClick }: ShareQRButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed top-6 left-4 z-40 p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-2xl border-2 border-white/30 group"
      aria-label="Share QR Code"
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.4)",
            "0 0 40px rgba(168, 85, 247, 0.8)",
            "0 0 20px rgba(168, 85, 247, 0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full"
      />
      
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <QrCode className="w-6 h-6 text-white relative z-10" />
      </motion.div>

      {/* Tooltip */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm border border-purple-500/30" style={{ fontFamily: "Poppins, sans-serif" }}>
          Share QR Code
        </div>
      </div>
    </motion.button>
  );
}
