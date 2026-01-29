import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { memo } from 'react';
import { MOBILE_DESIGN_SYSTEM } from '../mobile-design-system';

interface MobileMusicPlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentTrackName?: string;
}

/**
 * Mobile-optimized Music Player
 * Fixed bottom position with safe area support
 * Touch-friendly 48px buttons
 */
const MobileMusicPlayer = memo(function MobileMusicPlayer({ 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious,
  currentTrackName = 'Background Music'
}: MobileMusicPlayerProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed left-0 right-0 z-40 md:hidden"
      style={{
        bottom: MOBILE_DESIGN_SYSTEM.safeArea.bottom,
      }}
    >
      {/* Backdrop blur container - MAIS COMPACTO */}
      <div 
        className="mx-3 mb-3 rounded-xl overflow-hidden"
        style={{
          background: 'rgba(11, 11, 11, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(197, 139, 48, 0.25)',
          boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Controls - COMPACTO em linha única */}
        <div className="flex items-center justify-between gap-3 py-2.5 px-4">
          {/* Animated equalizer when playing */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-[#C58B30] rounded-full"
                animate={isPlaying ? {
                  height: [6, 14, 6],
                } : {
                  height: 6
                }}
                transition={{
                  duration: 0.8,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Controls centered */}
          <div className="flex items-center justify-center gap-2 flex-1">
            {/* Previous Button */}
            <button
              onClick={onPrevious}
              className="flex items-center justify-center rounded-full hover:bg-[#C58B30]/20 transition-all active:scale-95"
              style={{
                minWidth: '40px',
                minHeight: '40px',
              }}
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4 text-[#C58B30]" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={onPlayPause}
              className="flex items-center justify-center rounded-full bg-[#C58B30]/20 hover:bg-[#C58B30]/30 transition-all active:scale-95 border border-[#C58B30]/40"
              style={{
                minWidth: '48px',
                minHeight: '48px',
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <motion.div
                initial={false}
                animate={{ scale: isPlaying ? 1 : 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-[#C58B30] fill-[#C58B30]" />
                ) : (
                  <Play className="w-5 h-5 text-[#C58B30] fill-[#C58B30] ml-0.5" />
                )}
              </motion.div>
            </button>

            {/* Next Button */}
            <button
              onClick={onNext}
              className="flex items-center justify-center rounded-full hover:bg-[#C58B30]/20 transition-all active:scale-95"
              style={{
                minWidth: '40px',
                minHeight: '40px',
              }}
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4 text-[#C58B30]" />
            </button>
          </div>

          {/* Spacer para balancear o equalizer */}
          <div className="w-4 flex-shrink-0" />
        </div>
      </div>
    </motion.div>
  );
});

export default MobileMusicPlayer;