import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
  enabled: boolean;
  currentSlide: number;
  maxSlides: number;
  onNavigate: (newSlide: number) => void;
}

/**
 * Custom hook para gerenciar navegação por teclado
 * Inclui suporte a Home/End e acessibilidade
 */
export function useKeyboardNavigation({
  enabled,
  currentSlide,
  maxSlides,
  onNavigate
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          onNavigate(Math.max(0, currentSlide - 1));
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Spacebar
          e.preventDefault();
          onNavigate(Math.min(maxSlides - 1, currentSlide + 1));
          break;
        case 'Home':
          e.preventDefault();
          onNavigate(0);
          break;
        case 'End':
          e.preventDefault();
          onNavigate(maxSlides - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, currentSlide, maxSlides, onNavigate]);
}
