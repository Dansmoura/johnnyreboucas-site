import { useEffect, useRef } from 'react';
import { TOUCH_CONFIG } from '../constants';

interface UseTouchNavigationProps {
  enabled: boolean;
  currentSlide: number;
  maxSlides: number;
  onNavigate: (newSlide: number) => void;
}

/**
 * Custom hook para gerenciar navegação por toque/swipe
 * Otimizado com passive listeners
 */
export function useTouchNavigation({
  enabled,
  currentSlide,
  maxSlides,
  onNavigate
}: UseTouchNavigationProps) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
      const xDiff = touchStartX.current - touchEndX.current;

      if (Math.abs(xDiff) > TOUCH_CONFIG.SWIPE_THRESHOLD) {
        if (xDiff > 0) {
          // Swipe left - next slide
          onNavigate(Math.min(maxSlides - 1, currentSlide + 1));
        } else {
          // Swipe right - previous slide
          onNavigate(Math.max(0, currentSlide - 1));
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, currentSlide, maxSlides, onNavigate]);
}
