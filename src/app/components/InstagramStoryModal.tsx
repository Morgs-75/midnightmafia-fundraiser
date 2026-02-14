import { motion, AnimatePresence } from "motion/react";
import { Instagram, Share2, Download, X, Crown } from "lucide-react";

interface InstagramStoryModalProps {
  isOpen: boolean;
  numbers: number[];
  displayName: string;
  message: string;
  teamHandle?: string;
  onClose: () => void;
}

export function InstagramStoryModal({ 
  isOpen, 
  numbers, 
  displayName, 
  message, 
  teamHandle = "@outlaws.midnightmafia",
  onClose 
}: InstagramStoryModalProps) {
  const handleDownload = async () => {
    // Get the story element
    const storyElement = document.getElementById('instagram-story-modal-preview');
    if (!storyElement) return;

    try {
      // Use html2canvas to capture the element
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(storyElement, {
        backgroundColor: null,
        scale: 2, // Higher resolution
        logging: false,
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `midnight-mafia-supporter-${numbers.join('-')}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-purple-500/30 shadow-2xl z-50 overflow-hidden"
          >
            <div className="relative h-full max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="relative px-6 py-4 border-b border-gray-700 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <div className="relative flex items-center gap-2">
                  <Instagram className="w-6 h-6 text-pink-500" />
                  <h2 className="text-2xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    Share Your Support!
                  </h2>
                </div>
                
                <p className="text-sm text-gray-400 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Download and share to your Instagram Story
                </p>
              </div>
              
              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* Instagram Story Preview - 9:16 aspect ratio */}
                <motion.div
                  id="instagram-story-modal-preview"
                  whileHover={{ scale: 1.01 }}
                  className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-500/30 mx-auto"
                  style={{ aspectRatio: '9/16', maxWidth: '380px' }}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }} />
                  </div>
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                    {/* Midnight Mafia Logo at Top */}
                    <motion.div 
                      className="mb-6"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="relative">
                        {/* Glow effect behind crown */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl"
                        />
                        
                        {/* Crown Icon */}
                        <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-4 border-4 border-white/30 shadow-2xl">
                          <Crown className="w-16 h-16 text-white" />
                        </div>
                      </div>
                      
                      {/* Team Name */}
                      <motion.div 
                        className="mt-3"
                        animate={{ 
                          textShadow: [
                            "0 0 20px rgba(234, 179, 8, 0.5)",
                            "0 0 30px rgba(234, 179, 8, 0.8)",
                            "0 0 20px rgba(234, 179, 8, 0.5)",
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <p className="text-3xl text-yellow-400 font-black tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                          MIDNIGHT MAFIA
                        </p>
                        <p className="text-sm text-white/80 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          CHEER
                        </p>
                      </motion.div>
                    </motion.div>
                    
                    {/* Numbers Display - Grid Layout for multiple numbers */}
                    <div className="mb-6">
                      {/* Title above numbers */}
                      <motion.p 
                        className="text-2xl text-white mb-4 font-bold"
                        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                        animate={{ 
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {numbers.length === 1 ? 'MY NUMBER' : `MY ${numbers.length} NUMBERS`}
                      </motion.p>
                      
                      {numbers.length === 1 ? (
                        // Single number - large circle
                        <motion.div
                          animate={{
                            boxShadow: [
                              '0 0 40px rgba(234, 179, 8, 0.3)',
                              '0 0 60px rgba(234, 179, 8, 0.5)',
                              '0 0 40px rgba(234, 179, 8, 0.3)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-48 h-48 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-4 border-white/20"
                        >
                          <span className="text-8xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                            {numbers[0]}
                          </span>
                        </motion.div>
                      ) : (
                        // Multiple numbers - single row layout
                        <div className="flex justify-center gap-2 overflow-x-auto px-2">
                          {numbers.sort((a, b) => a - b).map((num, idx) => (
                            <motion.div
                              key={num}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-2 border-white/20 shadow-lg"
                            >
                              <span className="text-2xl text-white font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                                {num}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Text Content */}
                    <div className="space-y-3 mb-6">
                      <h3 className="text-3xl text-white leading-none whitespace-nowrap" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        SUPPORTING WORLDS 2026
                      </h3>
                      <p className="text-2xl text-yellow-400 font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        LET'S GO MIDNIGHT MAFIA! ✈️🏆
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Footer Actions */}
              <div className="px-6 py-4 border-t border-gray-700 space-y-3 flex-shrink-0">
                <button 
                  onClick={handleDownload}
                  className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>Share Story</span>
                </button>
                
                <button 
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-all"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}