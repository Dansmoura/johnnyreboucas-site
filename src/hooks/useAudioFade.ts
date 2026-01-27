import { useRef, useCallback } from 'react';
import { AUDIO_CONFIG } from '../constants';

/**
 * Custom hook para gerenciar fade in/out de áudio com requestAnimationFrame
 * Mais performático que setInterval
 */
export function useAudioFade() {
  const fadeAnimationRef = useRef<number | null>(null);

  const cancelFade = useCallback(() => {
    if (fadeAnimationRef.current !== null) {
      cancelAnimationFrame(fadeAnimationRef.current);
      fadeAnimationRef.current = null;
    }
  }, []);

  const fadeOut = useCallback((
    audioElement: HTMLAudioElement,
    duration: number = AUDIO_CONFIG.FADE_OUT_DURATION,
    onComplete?: () => void
  ) => {
    cancelFade();

    const startVolume = audioElement.volume;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function para fade mais suave
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      audioElement.volume = Math.max(0, startVolume * (1 - easedProgress));

      if (progress < 1) {
        fadeAnimationRef.current = requestAnimationFrame(animate);
      } else {
        audioElement.volume = 0;
        audioElement.pause();
        fadeAnimationRef.current = null;
        onComplete?.();
      }
    };

    fadeAnimationRef.current = requestAnimationFrame(animate);
  }, [cancelFade]);

  const fadeIn = useCallback((
    audioElement: HTMLAudioElement,
    targetVolume: number = AUDIO_CONFIG.DEFAULT_VOLUME,
    duration: number = AUDIO_CONFIG.FADE_IN_DURATION,
    onComplete?: () => void
  ) => {
    cancelFade();

    const startTime = performance.now();
    audioElement.volume = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function para fade mais suave
      const easedProgress = Math.pow(progress, 2);
      audioElement.volume = Math.min(targetVolume, targetVolume * easedProgress);

      if (progress < 1) {
        fadeAnimationRef.current = requestAnimationFrame(animate);
      } else {
        audioElement.volume = targetVolume;
        fadeAnimationRef.current = null;
        onComplete?.();
      }
    };

    fadeAnimationRef.current = requestAnimationFrame(animate);
  }, [cancelFade]);

  return { fadeIn, fadeOut, cancelFade };
}
