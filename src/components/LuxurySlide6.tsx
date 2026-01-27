import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { useEffect, useRef, useState } from 'react';
import imgArtist from 'figma:asset/ef852d0a546660aa697c387bbb2f38062be8dcda.png';

// SLIDE 7: PERFORMANCE SHOWCASE — DJ + Guitar Live (Split Screen)
export default function LuxurySlide7({ language, isMuted }: { language: Language; isMuted?: boolean }) {
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
      {/* Split Screen Container */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side - Artist Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden"
        >
          <img 
            src={imgArtist}
            alt="Johnny Rebouças Live Performance"
            className="w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.75) contrast(1.15) saturate(1.05)',
              objectPosition: 'center 35%'
            }}
          />
          
          {/* Gradient overlay for seamless blend */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(11, 11, 11, 0.3) 80%, rgba(11, 11, 11, 0.6) 100%)'
            }}
          />

          {/* Accent glow from gold */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 60% 50%, rgba(197, 139, 48, 0.15) 0%, transparent 60%)',
              mixBlendMode: 'overlay'
            }}
          />
        </motion.div>

        {/* Right Side - Video */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden"
        >
          <video
            ref={videoRef}
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.8) contrast(1.1) saturate(0.95)',
              objectPosition: 'center center'
            }}
          >
            <source src="https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/VID_20251030_115234_050_1.mp4" type="video/mp4" />
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
                <div className="w-20 h-20 rounded-full bg-[#C58B30] flex items-center justify-center mx-auto shadow-2xl">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Gradient overlay for seamless blend */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(270deg, transparent 0%, rgba(11, 11, 11, 0.2) 80%, rgba(11, 11, 11, 0.5) 100%)'
            }}
          />
        </motion.div>
      </div>

      {/* Center Divider Line - Subtle Gold */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #C58B30 20%, #C58B30 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(197, 139, 48, 0.4)'
        }}
      />

      {/* Top Content Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-8 md:pt-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-5"
          >
            <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-[#C58B30]" />
            <span 
              className="text-[#C58B30] tracking-[0.3em] md:tracking-[0.4em] uppercase text-xs md:text-sm"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 500,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
              }}
            >
              {t.slide6Overline}
            </span>
            <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-[#C58B30]" />
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white mb-3 md:mb-6 text-3xl md:text-[4.5rem] leading-tight md:leading-none"
            style={{ 
              fontFamily: 'Satoshi, sans-serif', 
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textShadow: '0 6px 40px rgba(0, 0, 0, 0.9)'
            }}
          >
            {t.slide6Title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-white/70 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed md:leading-relaxed"
            style={{ 
              fontFamily: 'Satoshi, sans-serif', 
              fontWeight: 300,
              textShadow: '0 3px 20px rgba(0, 0, 0, 0.9)'
            }}
          >
            {t.slide6Subtitle}
          </motion.p>
        </div>
      </div>

      {/* Bottom Feature Cards */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 md:pb-12 px-4 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          
          {/* Card 1 - Live Remixing */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="relative group"
          >
            <div 
              className="p-6 text-center"
              style={{
                background: 'rgba(11, 11, 11, 0.5)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(197, 139, 48, 0.25)',
                borderRadius: '1rem',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="mb-3 flex justify-center">
                <div 
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(197, 139, 48, 0.3) 0%, rgba(197, 139, 48, 0.1) 100%)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(197, 139, 48, 0.4)'
                  }}
                >
                  <svg className="w-6 h-6 text-[#C58B30]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              </div>
              <h3 
                className="text-white mb-2"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 600,
                  fontSize: '1.125rem'
                }}
              >
                {t.slide6Card1Title}
              </h3>
              <p 
                className="text-white/60"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 300,
                  fontSize: '0.875rem'
                }}
              >
                {t.slide6Card1Desc}
              </p>
            </div>
          </motion.div>

          {/* Card 2 - Brazilian Soul */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="relative group"
          >
            <div 
              className="p-6 text-center"
              style={{
                background: 'rgba(11, 11, 11, 0.5)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(197, 139, 48, 0.25)',
                borderRadius: '1rem',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="mb-3 flex justify-center">
                <div 
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(197, 139, 48, 0.3) 0%, rgba(197, 139, 48, 0.1) 100%)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(197, 139, 48, 0.4)'
                  }}
                >
                  <svg className="w-6 h-6 text-[#C58B30]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 
                className="text-white mb-2"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 600,
                  fontSize: '1.125rem'
                }}
              >
                {t.slide6Card2Title}
              </h3>
              <p 
                className="text-white/60"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 300,
                  fontSize: '0.875rem'
                }}
              >
                {t.slide6Card2Desc}
              </p>
            </div>
          </motion.div>

          {/* Card 3 - Global Appeal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className="relative group"
          >
            <div 
              className="p-6 text-center"
              style={{
                background: 'rgba(11, 11, 11, 0.5)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(197, 139, 48, 0.25)',
                borderRadius: '1rem',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="mb-3 flex justify-center">
                <div 
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(197, 139, 48, 0.3) 0%, rgba(197, 139, 48, 0.1) 100%)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(197, 139, 48, 0.4)'
                  }}
                >
                  <svg className="w-6 h-6 text-[#C58B30]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <h3 
                className="text-white mb-2"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 600,
                  fontSize: '1.125rem'
                }}
              >
                {t.slide6Card3Title}
              </h3>
              <p 
                className="text-white/60"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 300,
                  fontSize: '0.875rem'
                }}
              >
                {t.slide6Card3Desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ambient glow */}
      <motion.div
        animate={{ 
          opacity: [0.06, 0.12, 0.06],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(197, 139, 48, 0.15) 0%, transparent 70%)',
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