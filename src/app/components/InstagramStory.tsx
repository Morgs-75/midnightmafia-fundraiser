import { motion } from "motion/react";
import { Instagram, Share2, Download, Crown } from "lucide-react";

interface InstagramStoryProps {
  numbers: number[]; // Changed from single number to array
  displayName: string;
  message: string;
  teamHandle?: string;
}

export function InstagramStory({ numbers, displayName, message, teamHandle = "@WorldsChamps2026" }: InstagramStoryProps) {
  const handleDownload = async () => {
    // Get the story element
    const storyElement = document.getElementById('instagram-story-preview');
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
    <section className="px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Instagram className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              Share Your Support
            </h2>
          </div>
          
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" onClick={handleDownload}>
            <Download className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Share this to your Instagram Story and tag the team!
        </p>
        
        {/* Instagram Story Preview - 9:16 aspect ratio */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-500/30"
          style={{ aspectRatio: '9/16' }}
          id="instagram-story-preview"
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
                // Multiple numbers - grid layout
                <div className="flex flex-wrap justify-center gap-3 max-w-xs">
                  {numbers.sort((a, b) => a - b).map((num, idx) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-2 border-white/20 shadow-lg"
                    >
                      <span className="text-3xl text-white font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        {num}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Text Content */}
            <div className="space-y-3 mb-6">
              <h3 className="text-4xl text-white leading-tight" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                I am a proud supporter of
              </h3>
              <p className="text-3xl text-yellow-400 font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                Midnight Mafia
              </p>
            </div>
            
            {/* Supporter Name */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl px-6 py-3 mb-6 border border-white/10">
              <p className="text-xl text-white font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {displayName}
              </p>
            </div>
            
            {/* Custom Message */}
            {message && (
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl px-5 py-3 mb-6 border border-pink-500/30 max-w-xs">
                <p className="text-base text-white italic" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  "{message}"
                </p>
              </div>
            )}
            
            {/* Team Handle */}
            <div className="mt-auto">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500/80 to-purple-600/80 rounded-full backdrop-blur-sm border border-white/20">
                <Instagram className="w-5 h-5 text-white" />
                <span className="text-xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {teamHandle}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
          <Share2 className="w-5 h-5" />
          <span style={{ fontFamily: 'Poppins, sans-serif' }}>Share to Story</span>
        </button>
      </div>
    </section>
  );
}