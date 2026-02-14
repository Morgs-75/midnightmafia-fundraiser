import { motion } from "motion/react";
import { MessageCircle, Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface MessageBubbleProps {
  number: number;
  displayName: string;
  message: string;
  gridPosition: { row: number; col: number }; // Position in 10x10 grid
  onComplete: () => void;
}

export function MessageBubble({ 
  number, 
  displayName, 
  message, 
  gridPosition,
  onComplete 
}: MessageBubbleProps) {
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Calculate the tile's position on the screen
    // Grid is 10 cols on desktop, 5 on mobile
    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 5 : 10;
    const gap = isMobile ? 8 : 12; // gap-2 = 8px, gap-3 = 12px
    
    // Find the number board element to get its position
    const boardElement = document.querySelector('[data-number-board]');
    if (boardElement) {
      const boardRect = boardElement.getBoundingClientRect();
      const tileWidth = isMobile 
        ? (boardRect.width - (gap * (cols - 1))) / cols 
        : (boardRect.width - (gap * (cols - 1))) / cols;
      
      // Calculate position based on grid layout
      const actualCol = isMobile ? gridPosition.col % 5 : gridPosition.col;
      const actualRow = isMobile ? Math.floor(gridPosition.col / 5) + gridPosition.row * 2 : gridPosition.row;
      
      const x = boardRect.left + (actualCol * (tileWidth + gap)) + (tileWidth / 2);
      const y = boardRect.top + (actualRow * (tileWidth + gap)) + (tileWidth / 2);
      
      setStartPosition({ x, y });
    }

    // Auto-remove after animation completes
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [gridPosition, onComplete]);

  const hasMessage = message && message.trim().length > 0;

  return (
    <motion.div
      initial={{ 
        x: startPosition.x,
        y: startPosition.y,
        opacity: 0,
        scale: 0.3,
      }}
      animate={{ 
        x: startPosition.x,
        y: startPosition.y - 200, // Float up 200px
        opacity: [0, 1, 1, 0],
        scale: [0.3, 1, 1, 0.8],
      }}
      transition={{ 
        duration: 4,
        ease: "easeOut",
        opacity: {
          times: [0, 0.1, 0.8, 1],
          duration: 4,
        }
      }}
      className="fixed z-[70] pointer-events-none"
      style={{
        left: 0,
        top: 0,
      }}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50 blur-xl rounded-2xl" />
        
        {/* Bubble */}
        <div className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 border-2 border-purple-400 rounded-2xl p-4 shadow-2xl min-w-[200px] max-w-[280px]">
          {/* Number badge */}
          <div className="absolute -top-3 -left-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-xl font-black text-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              {number}
            </span>
          </div>

          {/* Content */}
          <div className="pl-6">
            {/* Display name */}
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              <p className="text-white font-bold text-sm truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {displayName}
              </p>
            </div>

            {/* Message */}
            {hasMessage && (
              <div className="flex gap-2">
                <MessageCircle className="w-4 h-4 text-purple-300 flex-shrink-0 mt-0.5" />
                <p className="text-purple-200 text-xs leading-relaxed line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {message}
                </p>
              </div>
            )}
            
            {!hasMessage && (
              <p className="text-purple-200 text-xs italic" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Thanks for your support! 💜
              </p>
            )}
          </div>

          {/* Sparkles */}
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">✨</span>
            </div>
          </motion.div>
        </div>

        {/* Tail pointing down */}
        <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-purple-400" />
      </div>
    </motion.div>
  );
}
