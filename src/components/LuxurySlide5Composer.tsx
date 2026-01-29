import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { useEffect, useRef, useState } from 'react';

// SLIDE 5: COMPOSITOR & PRODUTOR — Original Compositions
export default function LuxurySlide5Composer({ language, isMuted }: { language: Language; isMuted?: boolean }) {
  const t = translations[language];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const playWithSound = async () => {
      const video = videoRef.current;
      if (!video) return;
      
      video.muted = false;
      video.volume = 0.5;
      
      try {
        await video.play();
        setNeedsInteraction(false);
      } catch (err) {
        setNeedsInteraction(true);
      }
    };
    
    playWithSound();
  }, []);

  // Respond to global mute state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      video.muted = true;
    } else if (!needsInteraction) {
      video.muted = false;
      video.volume = 0.5;
    }
  }, [isMuted, needsInteraction]);

  const handleVideoClick = async () => {
    if (videoRef.current && needsInteraction) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.5;
      await videoRef.current.play();
      setNeedsInteraction(false);
    }
  };

  return (
    <div className="w-full h-full bg-[#0B0B0B] relative overflow-hidden">
      {/* Full-screen Video Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) contrast(1.2) saturate(0.8)' }}
        >
          <source src="https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/Track%20Birthday%20Puxadinho%20Restorant%20(Arranjos%20originais%20de%20Johnny%20Rebou%C3%A7as.mp4" type="video/mp4" />
        </video>

        {/* Overlay se precisar de interação */}
        {needsInteraction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleVideoClick}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-pointer z-30"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#C58B30] flex items-center justify-center mb-4 mx-auto shadow-2xl">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p 
                className="text-white"
                style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}
              >
                Click to activate audio
              </p>
            </motion.div>
          </motion.div>
        )}
        
        {/* Cinematic overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(11, 11, 11, 0.8) 0%, 
                rgba(14, 34, 60, 0.65) 40%,
                rgba(11, 11, 11, 0.75) 70%,
                rgba(11, 11, 11, 0.85) 100%
              )
            `
          }}
        />
      </motion.div>

      {/* Content - PADRÃO TELA 3 */}
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden md:overflow-visible z-20"
        style={{
          paddingTop: '140px',
          paddingBottom: '250px',
          paddingLeft: '16px',
          paddingRight: '16px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="max-w-7xl w-full mx-auto md:px-4">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center mb-10 md:mb-16"
          >
            {/* Overline */}
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
              <div className="h-px w-10 md:w-20 bg-gradient-to-r from-transparent to-[#C58B30]" />
              <span 
                className="text-[#C58B30] tracking-[0.3em] md:tracking-[0.4em] uppercase text-[0.65rem] md:text-sm"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 500
                }}
              >
                {t.slide5ComposerOverline}
              </span>
              <div className="h-px w-10 md:w-20 bg-gradient-to-l from-transparent to-[#C58B30]" />
            </div>

            {/* Main Title */}
            <h2 
              className="text-white mb-4 md:mb-6 text-3xl md:text-[4.5rem] leading-tight md:leading-none px-4 md:px-0"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 700,
                letterSpacing: '-0.03em',
                textShadow: '0 6px 40px rgba(0, 0, 0, 0.9), 0 0 80px rgba(197, 139, 48, 0.2)'
              }}
            >
              {t.slide5ComposerTitle}
            </h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-white/70 max-w-3xl mx-auto text-sm md:text-lg px-4 md:px-0"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 300,
                lineHeight: '1.7',
                textShadow: '0 3px 20px rgba(0, 0, 0, 0.9)'
              }}
            >
              {t.slide5ComposerDescription}
            </motion.p>
          </motion.div>

          {/* Key Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mb-10 md:mb-16">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ),
                title: t.slide5ComposerPoint1Title,
                description: t.slide5ComposerPoint1Desc
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ),
                title: t.slide5ComposerPoint2Title,
                description: t.slide5ComposerPoint2Desc
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                title: t.slide5ComposerPoint3Title,
                description: t.slide5ComposerPoint3Desc
              }
            ].map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.2 + index * 0.2, 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative group text-center"
              >
                <div 
                  className="relative p-6 md:p-8 h-full transition-all duration-500 group-hover:translate-y-[-4px]"
                  style={{
                    background: 'rgba(11, 11, 11, 0.6)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(197, 139, 48, 0.2)',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 md:mb-6 text-[#C58B30] transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(197, 139, 48, 0.2) 0%, rgba(197, 139, 48, 0.05) 100%)',
                      borderRadius: '50%',
                      border: '1px solid rgba(197, 139, 48, 0.3)'
                    }}
                  >
                    {point.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className="text-white mb-3 md:mb-4"
                    style={{ 
                      fontFamily: 'Satoshi, sans-serif', 
                      fontWeight: 600,
                      fontSize: '1.15rem',
                      lineHeight: '1.3',
                      letterSpacing: '-0.01em',
                      textShadow: '0 2px 15px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    {point.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-white/60 text-xs md:text-sm"
                    style={{ 
                      fontFamily: 'Satoshi, sans-serif', 
                      fontWeight: 300,
                      lineHeight: '1.6'
                    }}
                  >
                    {point.description}
                  </p>

                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                    style={{
                      background: 'radial-gradient(circle at 50% 30%, rgba(197, 139, 48, 0.15) 0%, transparent 70%)',
                      filter: 'blur(25px)',
                      borderRadius: '1rem'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full"
              style={{
                background: 'rgba(197, 139, 48, 0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(197, 139, 48, 0.4)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#C58B30]">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full h-full rounded-full bg-[#C58B30]"
                />
              </div>
              <span 
                className="text-[#C58B30] text-sm md:text-base"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 500,
                  letterSpacing: '0.08em'
                }}
              >
                {t.slide5ComposerFooter}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ambient glow */}
      <motion.div
        animate={{ 
          opacity: [0.06, 0.12, 0.06],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(197, 139, 48, 0.15) 0%, rgba(14, 34, 60, 0.08) 50%, transparent 70%)',
          filter: 'blur(120px)'
        }}
      />

      {/* Film grain */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
}