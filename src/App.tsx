import { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, translations } from './translations';
import { 
  AUDIO_CONFIG, 
  ANIMATION_CONFIG, 
  SLIDES_WITH_VIDEO, 
  BACKGROUND_MUSIC_TRACKS 
} from './constants';
import { useAudioFade } from './hooks/useAudioFade';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { useTouchNavigation } from './hooks/useTouchNavigation';
import { useReducedMotion } from './hooks/useReducedMotion';
import LanguageSelector from './components/LanguageSelector';
import LanguageSwitcher from './components/LanguageSwitcher';
import MusicPlayer from './components/MusicPlayer';

// Lazy loading dos slides para melhor performance inicial
const Slide1 = lazy(() => import('./components/LuxurySlide1'));
const Slide2 = lazy(() => import('./components/LuxurySlide2'));
const Slide4 = lazy(() => import('./components/LuxurySlide4'));
const Slide5Composer = lazy(() => import('./components/LuxurySlide5Composer'));
const Slide6 = lazy(() => import('./components/LuxurySlide5'));
const Slide7 = lazy(() => import('./components/LuxurySlide6'));
const Slide8 = lazy(() => import('./components/LuxurySlide7'));
const Slide9 = lazy(() => import('./components/LuxurySlide8'));
const Slide10 = lazy(() => import('./components/LuxurySlide10'));

const slides = [
  Slide1, Slide2, Slide4, Slide5Composer, Slide6,
  Slide7, Slide8, Slide9, Slide10
];

// Fallback loading component
const SlideLoading = () => (
  <div className="w-full h-full bg-[#0B0B0B] flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-[#C58B30] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  // State management
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const hideControlsTimeoutRef = useRef<number>();
  
  // Custom hooks
  const { fadeIn, fadeOut, cancelFade } = useAudioFade();
  const prefersReducedMotion = useReducedMotion();

  // Memoized values
  const CurrentSlideComponent = useMemo(() => slides[currentSlide], [currentSlide]);
  const hasVideo = useMemo(() => SLIDES_WITH_VIDEO.includes(currentSlide), [currentSlide]);
  const isMobile = useMemo(() => window.innerWidth < 768, []);

  // Callbacks otimizados com useCallback
  const handleNavigate = useCallback((newSlide: number) => {
    if (newSlide >= 0 && newSlide < slides.length) {
      setCurrentSlide(newSlide);
    }
  }, []);

  const handleShowControls = useCallback(() => {
    setShowControls(true);
    
    // Clear timeout anterior
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    
    // Auto-hide controls após 3 segundos de inatividade (desktop only)
    if (!isMobile) {
      hideControlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isMobile]);

  const handleHideControls = useCallback(() => {
    if (!isMobile && hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
      setShowControls(false);
    }
  }, [isMobile]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicMuted) {
      audio.play().catch(err => console.log('Playback error:', err));
      setIsMusicMuted(false);
    } else {
      audio.pause();
      setIsMusicMuted(true);
    }
  }, [isMusicMuted]);

  const handleNextTrack = useCallback(() => {
    const newIndex = (currentTrackIndex + 1) % BACKGROUND_MUSIC_TRACKS.length;
    setCurrentTrackIndex(newIndex);
    setIsMusicMuted(false);
  }, [currentTrackIndex]);

  const handlePreviousTrack = useCallback(() => {
    const newIndex = (currentTrackIndex - 1 + BACKGROUND_MUSIC_TRACKS.length) % BACKGROUND_MUSIC_TRACKS.length;
    setCurrentTrackIndex(newIndex);
    setIsMusicMuted(false);
  }, [currentTrackIndex]);

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(err => console.log('Playback error:', err));
      setIsMusicMuted(false);
    } else {
      audio.pause();
      setIsMusicMuted(true);
    }
  }, []);

  // Keyboard navigation
  useKeyboardNavigation({
    enabled: !!selectedLanguage,
    currentSlide,
    maxSlides: slides.length,
    onNavigate: handleNavigate
  });

  // Touch navigation
  useTouchNavigation({
    enabled: !!selectedLanguage,
    currentSlide,
    maxSlides: slides.length,
    onNavigate: handleNavigate
  });

  // Hide instructions after timeout
  useEffect(() => {
    if (!selectedLanguage) return;
    
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, ANIMATION_CONFIG.INSTRUCTIONS_TIMEOUT);
    
    return () => clearTimeout(timer);
  }, [selectedLanguage]);

  // Auto-show controls on mobile
  useEffect(() => {
    if (isMobile) {
      setShowControls(true);
    }
  }, [isMobile]);

  // Track audio play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Background Music Control - Fade in/out otimizado
  useEffect(() => {
    if (!selectedLanguage) return;
    const audio = audioRef.current;
    if (!audio) return;

    if (hasVideo) {
      // Fade out quando tem vídeo
      fadeOut(audio, AUDIO_CONFIG.FADE_OUT_DURATION);
    } else {
      // Fade in quando não tem vídeo
      if (audio.paused && !isMusicMuted) {
        audio.play().then(() => {
          fadeIn(audio, AUDIO_CONFIG.DEFAULT_VOLUME, AUDIO_CONFIG.FADE_IN_DURATION);
        }).catch(err => console.log('Autoplay blocked:', err));
      }
    }

    return () => {
      cancelFade();
    };
  }, [currentSlide, hasVideo, isMusicMuted, selectedLanguage, fadeIn, fadeOut, cancelFade]);

  // Random track selection quando termina
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTrackEnd = () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * BACKGROUND_MUSIC_TRACKS.length);
      } while (newIndex === currentTrackIndex && BACKGROUND_MUSIC_TRACKS.length > 1);
      
      setCurrentTrackIndex(newIndex);
    };

    audio.addEventListener('ended', handleTrackEnd);
    return () => audio.removeEventListener('ended', handleTrackEnd);
  }, [currentTrackIndex]);

  // Atualizar src quando track muda
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.src = BACKGROUND_MUSIC_TRACKS[currentTrackIndex];
    audio.load();
    
    const playTimeout = setTimeout(() => {
      if (!hasVideo && !isMusicMuted) {
        audio.play().then(() => {
          fadeIn(audio, AUDIO_CONFIG.DEFAULT_VOLUME, AUDIO_CONFIG.FADE_IN_DURATION);
        }).catch(err => console.log('Playback error:', err));
      }
    }, AUDIO_CONFIG.TRACK_SWITCH_DELAY);

    return () => {
      clearTimeout(playTimeout);
    };
  }, [currentTrackIndex, hasVideo, isMusicMuted, fadeIn]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
      cancelFade();
    };
  }, [cancelFade]);

  // Show language selector first
  if (!selectedLanguage) {
    return <LanguageSelector onSelectLanguage={setSelectedLanguage} />;
  }

  const t = translations[selectedLanguage];

  return (
    <div 
      className="w-screen h-screen overflow-hidden bg-[#0B0B0B] relative"
      onMouseMove={handleShowControls}
      onMouseLeave={handleHideControls}
      onTouchStart={handleShowControls}
      role="application"
      aria-label="Brazilian Live Sessions Presentation"
      aria-roledescription="slideshow"
    >
      {/* Instructions Overlay */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 pointer-events-none px-4"
            role="alert"
            aria-live="polite"
          >
            <div className="text-center space-y-4">
              <div className="hidden md:flex items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <ChevronLeft className="w-8 h-8 text-[#C58B30]" aria-hidden="true" />
                  <span className="text-white">{t.instructionUse} {t.instructionArrows}</span>
                  <ChevronRight className="w-8 h-8 text-[#C58B30]" aria-hidden="true" />
                </div>
              </div>
              <p className="text-white/60 text-sm md:text-base">
                <span className="md:hidden">Deslize para navegar</span>
                <span className="hidden md:inline">{t.instructionOr} {t.instructionClick} {t.instructionToNavigate}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slides com Suspense para lazy loading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: prefersReducedMotion ? 0 : ANIMATION_CONFIG.SLIDE_TRANSITION_DURATION, 
            ease: 'easeInOut' 
          }}
          className="w-full h-full"
          role="region"
          aria-label={`Slide ${currentSlide + 1} of ${slides.length}`}
          aria-live="polite"
        >
          <Suspense fallback={<SlideLoading />}>
            <CurrentSlideComponent language={selectedLanguage} isMuted={isMusicMuted} />
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Desktop only */}
      <AnimatePresence>
        {showControls && (
          <>
            <motion.button
              onClick={() => handleNavigate(currentSlide - 1)}
              disabled={currentSlide === 0}
              className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 items-center justify-center rounded-full bg-[#C58B30]/10 backdrop-blur-md border border-[#C58B30]/30 hover:bg-[#C58B30]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: ANIMATION_CONFIG.CONTROLS_ANIMATION_DURATION }}
              aria-label="Previous slide"
              aria-disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-7 h-7 text-[#C58B30]" aria-hidden="true" />
            </motion.button>

            <motion.button
              onClick={() => handleNavigate(currentSlide + 1)}
              disabled={currentSlide === slides.length - 1}
              className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 items-center justify-center rounded-full bg-[#C58B30]/10 backdrop-blur-md border border-[#C58B30]/30 hover:bg-[#C58B30]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: ANIMATION_CONFIG.CONTROLS_ANIMATION_DURATION }}
              aria-label="Next slide"
              aria-disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="w-7 h-7 text-[#C58B30]" aria-hidden="true" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Slide Counter */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: ANIMATION_CONFIG.CONTROLS_ANIMATION_DURATION }}
            className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-[#C58B30]/10 backdrop-blur-md border border-[#C58B30]/30"
            role="status"
            aria-live="polite"
          >
            <span 
              className="text-[#C58B30] text-sm md:text-base"
              style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 500, letterSpacing: '0.05em' }}
              aria-label={`Slide ${currentSlide + 1} of ${slides.length}`}
            >
              {currentSlide + 1} / {slides.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Right Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: ANIMATION_CONFIG.CONTROLS_ANIMATION_DURATION }}
            className="absolute top-8 right-8 z-50 flex items-center gap-3"
          >
            <MusicPlayer
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNext={handleNextTrack}
              onPrevious={handlePreviousTrack}
            />
            
            <LanguageSwitcher 
              currentLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Music - Preload metadata only */}
      <audio
        ref={audioRef}
        src={BACKGROUND_MUSIC_TRACKS[currentTrackIndex]}
        preload="metadata"
        aria-label="Background music"
      />
    </div>
  );
}
