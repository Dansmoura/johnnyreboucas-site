import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { useEffect, useRef, useState } from 'react';
import imgGuitar from 'figma:asset/23a7e8d0ab30f510bc1f7b77298050084e77bc35.png';

// SLIDE 6: EXPERIENCE — +600 Performances (Cinematic Fullscreen)
export default function LuxurySlide6({ language, isMuted }: { language: Language; isMuted?: boolean }) {
  const t = translations[language];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const playWithSound = async () => {
      const video = videoRef.current;
      if (!video) return;
      
      video.muted = false;
      video.volume = 0.45;
      
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
      video.volume = 0.45;
    }
  }, [isMuted, needsInteraction]);

  const handleVideoClick = async () => {
    if (videoRef.current && needsInteraction) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.45;
      await videoRef.current.play();
      setNeedsInteraction(false);
    }
  };

  return (
    <div className="w-full h-full bg-[#0B0B0B] relative overflow-hidden">
      
      {/* Fullscreen Video Background */}
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
          style={{ 
            filter: 'brightness(0.35) contrast(1.2) saturate(0.7)',
            objectPosition: 'center center'
          }}
        >
          <source src="https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/Johnny%20GT%2001.mp4" type="video/mp4" />
        </video>

        {/* Overlay se precisar de interação */}
        {needsInteraction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleVideoClick}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer z-30"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#C58B30] flex items-center justify-center mx-auto shadow-2xl">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Dark gradient overlay for readability - seguindo paleta */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(11, 11, 11, 0.85) 0%, 
                rgba(14, 34, 60, 0.7) 35%,
                rgba(11, 11, 11, 0.75) 70%,
                rgba(11, 11, 11, 0.9) 100%
              )
            `
          }}
        />
      </motion.div>

      {/* Content Layout - Stack on mobile, side by side on desktop */}
      <div className="absolute inset-0 z-10 flex flex-col md:flex-row">
        
        {/* Left Section - Artist Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 md:w-2/5 flex items-end md:items-center justify-center p-4 md:p-12"
        >
          <div 
            className="relative w-32"
            style={{
              aspectRatio: '3/4'
            }}
          >
            <style>{`
              @media (max-width: 768px) {
                .relative.w-32 {
                  max-height: 25vh;
                }
              }
              @media (min-width: 769px) {
                .relative.w-32 {
                  width: 100% !important;
                  max-height: 75vh;
                }
              }
            `}</style>
            {/* Golden frame border */}
            <div 
              className="absolute -inset-2 md:-inset-4 z-10"
              style={{
                border: '2px solid #C58B30',
                borderRadius: '0.75rem',
                boxShadow: '0 0 60px rgba(197, 139, 48, 0.3), inset 0 0 40px rgba(197, 139, 48, 0.1)'
              }}
            >
              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-4 md:w-8 h-4 md:h-8 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-[#C58B30]" style={{ borderRadius: '0.75rem 0 0 0' }} />
              <div className="absolute -top-1 -right-1 w-4 md:w-8 h-4 md:h-8 border-t-2 md:border-t-4 border-r-2 md:border-r-4 border-[#C58B30]" style={{ borderRadius: '0 0.75rem 0 0' }} />
              <div className="absolute -bottom-1 -left-1 w-4 md:w-8 h-4 md:h-8 border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-[#C58B30]" style={{ borderRadius: '0 0 0 0.75rem' }} />
              <div className="absolute -bottom-1 -right-1 w-4 md:w-8 h-4 md:h-8 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-[#C58B30]" style={{ borderRadius: '0 0 0.75rem 0' }} />
            </div>

            {/* Image */}
            <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: '0.5rem' }}>
              <img 
                src={imgGuitar}
                alt="Johnny Rebouças Live"
                className="w-full h-full object-cover"
                style={{ 
                  filter: 'brightness(0.95) contrast(1.1) saturate(1.05)'
                }}
              />
              
              {/* Subtle overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(11, 11, 11, 0.3) 100%)'
                }}
              />
            </div>

            {/* Glow behind image */}
            <div 
              className="absolute -inset-8 -z-10 opacity-50"
              style={{
                background: 'radial-gradient(circle, rgba(197, 139, 48, 0.4) 0%, transparent 70%)',
                filter: 'blur(50px)'
              }}
            />
          </div>
        </motion.div>

        {/* Right Section - Content */}
        <div className="flex-shrink-0 md:w-3/5 flex items-center justify-center px-6 md:pr-20">
          <div className="max-w-2xl">
            
            {/* Label & Location */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-4 md:mb-6"
            >
              <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-[#C58B30]" />
              <span 
                className="text-[#C58B30] tracking-[0.3em] md:tracking-[0.4em] uppercase text-xs md:text-sm"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 500,
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                }}
              >
                {t.slide5Title}
              </span>
            </motion.div>

            {/* Título completo com parte dourada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 md:mb-12"
            >
              <h2 
                className="text-white text-3xl md:text-6xl mb-2"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: '1.1',
                  textShadow: '0 6px 30px rgba(0, 0, 0, 0.9)'
                }}
              >
                {t.slide5Title}
              </h2>
              <h2 
                className="text-[#C58B30] text-3xl md:text-6xl"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 300,
                  fontStyle: 'italic',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.1',
                  textShadow: '0 6px 30px rgba(197, 139, 48, 0.8)'
                }}
              >
                {t.slide5TitleGold}
              </h2>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-0.5 bg-gradient-to-r from-[#C58B30] via-[#C58B30]/50 to-transparent mb-4 md:mb-8 max-w-md"
            />

            {/* Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mb-6 md:mb-10"
            >
              <p 
                className="text-white/90 text-base md:text-2xl"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)'
                }}
              >
                {t.slide5Locations}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 1 }}
              className="grid grid-cols-2 gap-2 md:gap-6 max-w-lg"
            >
              {/* Stat 1 */}
              <div 
                className="p-3 md:p-5"
                style={{
                  background: 'rgba(11, 11, 11, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(197, 139, 48, 0.2)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                }}
              >
                <p 
                  className="text-[#C58B30] mb-1 text-2xl md:text-[2rem]"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 700,
                    lineHeight: '1'
                  }}
                >
                  12+
                </p>
                <p 
                  className="text-white/70 text-xs md:text-sm"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 400,
                    letterSpacing: '0.05em'
                  }}
                >
                  {t.slide5Years}
                </p>
              </div>

              {/* Stat 2 */}
              <div 
                className="p-3 md:p-5"
                style={{
                  background: 'rgba(11, 11, 11, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(197, 139, 48, 0.2)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                }}
              >
                <p 
                  className="text-[#C58B30] mb-1 text-2xl md:text-[2rem]"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 700,
                    lineHeight: '1'
                  }}
                >
                  5+
                </p>
                <p 
                  className="text-white/70 text-xs md:text-sm"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 400,
                    letterSpacing: '0.05em'
                  }}
                >
                  {t.slide5Countries}
                </p>
              </div>

              {/* Stat 3 */}
              <div 
                className="p-3 md:p-5"
                style={{
                  background: 'rgba(11, 11, 11, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(197, 139, 48, 0.2)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                }}
              >
                <p 
                  className="text-[#C58B30] mb-1 text-2xl md:text-[2rem]"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 700,
                    lineHeight: '1'
                  }}
                >
                  50+
                </p>
                <p 
                  className="text-white/70 text-xs md:text-sm"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 400,
                    letterSpacing: '0.05em'
                  }}
                >
                  {t.slide5Clubs}
                </p>
              </div>

              {/* Stat 4 */}
              <div 
                className="p-3 md:p-5"
                style={{
                  background: 'rgba(11, 11, 11, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(197, 139, 48, 0.2)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                }}
              >
                <p 
                  className="text-[#C58B30] mb-1 text-2xl md:text-[2rem]"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 700,
                    lineHeight: '1'
                  }}
                >
                  VIP
                </p>
                <p 
                  className="text-white/70 text-xs md:text-sm"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 400,
                    letterSpacing: '0.05em'
                  }}
                >
                  {t.slide5Events}
                </p>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-6 md:mt-10"
            >
              <p 
                className="text-white/50 italic max-w-md text-sm md:text-base"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 300,
                  lineHeight: '1.6',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                }}
              >
                {t.slide5Quote}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ambient glow - seguindo paleta */}
      <motion.div
        animate={{ 
          opacity: [0.08, 0.15, 0.08],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(197, 139, 48, 0.2) 0%, rgba(14, 34, 60, 0.1) 40%, transparent 70%)',
          filter: 'blur(150px)'
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