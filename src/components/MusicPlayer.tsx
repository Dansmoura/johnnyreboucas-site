import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { memo } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Memoized para evitar re-renders desnecessários
const MusicPlayer = memo(function MusicPlayer({ isPlaying, onPlayPause, onNext, onPrevious }: MusicPlayerProps) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#0B0B0B]/40 backdrop-blur-md border border-[#C58B30]/30">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#C58B30]/20 transition-all duration-300 group"
        aria-label="Previous track"
      >
        <SkipBack className="w-4 h-4 text-[#C58B30] group-hover:scale-110 transition-transform" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={onPlayPause}
        className="w-9 h-9 rounded-full flex items-center justify-center bg-[#C58B30]/20 hover:bg-[#C58B30]/30 transition-all duration-300 border border-[#C58B30]/40 group"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <motion.div
          initial={false}
          animate={{ scale: isPlaying ? 1 : 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-[#C58B30] fill-[#C58B30] group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="w-4 h-4 text-[#C58B30] fill-[#C58B30] ml-0.5 group-hover:scale-110 transition-transform" />
          )}
        </motion.div>
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#C58B30]/20 transition-all duration-300 group"
        aria-label="Next track"
      >
        <SkipForward className="w-4 h-4 text-[#C58B30] group-hover:scale-110 transition-transform" />
      </button>

      {/* Animated equalizer indicator when playing */}
      {isPlaying && (
        <motion.div 
          className="flex items-center gap-0.5 ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-[#C58B30] rounded-full"
              animate={{
                height: [4, 12, 4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
});

export default MusicPlayer;