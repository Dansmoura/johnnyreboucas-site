import { motion } from 'motion/react';
import { MOBILE_DESIGN_SYSTEM } from '../mobile-design-system';

interface SwipeIndicatorProps {
  currentIndex: number;
  totalSlides: number;
  onDotClick?: (index: number) => void;
}

/**
 * Swipe Indicator Component - Mobile UX Enhancement
 * Shows current slide position with dots + swipe hint
 */
export default function SwipeIndicator({ 
  currentIndex, 
  totalSlides, 
  onDotClick 
}: SwipeIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Dots - SEM FUNDO PRETO, transparente */}
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-transparent backdrop-blur-sm">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick?.(index)}
            className="relative p-2"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          >            
            {/* Visual dot - MENOR */}
            <motion.div
              className="mx-auto"
              animate={{
                width: index === currentIndex ? '20px' : '6px',
                height: '6px',
                backgroundColor: index === currentIndex 
                  ? '#C58B30' 
                  : 'rgba(197, 139, 48, 0.3)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                borderRadius: MOBILE_DESIGN_SYSTEM.borderRadius.full,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}