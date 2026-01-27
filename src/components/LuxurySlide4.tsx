import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { useEffect, useRef, useState } from 'react';

// SLIDE 4: CONCEPT POINTS — 3-Panel Visual
export default function LuxurySlide4({ language, isMuted }: { language: Language; isMuted?: boolean }) {
  const t = translations[language];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const playWithSound = async () => {
      const video = videoRef.current;
      if (!video) return;
      
      video.muted = false;
      video.volume = 0.4;
      
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
      video.volume = 0.4;
    }
  }, [isMuted, needsInteraction]);

  const handleVideoClick = async () => {
    if (videoRef.current && needsInteraction) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.4;
      await videoRef.current.play();
      setNeedsInteraction(false);
    }
  };

  const conceptPoints = [
    {
      icon: 'guitar',
      title: t.slide4Point1Title,
      subtitle: t.slide4Point1Subtitle,
      description: t.slide4Point1Desc
    },
    {
      icon: 'waves',
      title: t.slide4Point2Title,
      subtitle: t.slide4Point2Subtitle,
      description: t.slide4Point2Desc
    },
    {
      icon: 'globe',
      title: t.slide4Point3Title,
      subtitle: t.slide4Point3Subtitle,
      description: t.slide4Point3Desc
    },
    {
      icon: 'sparkles',
      title: t.slide4Point4Title,
      subtitle: t.slide4Point4Subtitle,
      description: t.slide4Point4Desc
    }
  ];

  // Icon components
  const Icons = {
    guitar: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    waves: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    globe: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    sparkles: () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
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
          style={{ filter: 'brightness(0.32) contrast(1.25) saturate(0.75)' }}
        >
          <source src="https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/Johnny%20GT%2001-2.mp4" type="video/mp4" />
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
        
        {/* Cinematic overlay - seguindo paleta estrita */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(11, 11, 11, 0.85) 0%, 
                rgba(14, 34, 60, 0.7) 40%,
                rgba(11, 11, 11, 0.75) 70%,
                rgba(11, 11, 11, 0.9) 100%
              )
            `
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-20 py-8 md:py-16 z-20">
        <div className="max-w-7xl w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center mb-8 md:mb-16"
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
                {t.slide4Overline}
              </span>
              <div className="h-px w-10 md:w-20 bg-gradient-to-l from-transparent to-[#C58B30]" />
            </div>

            {/* Main Title */}
            <h2 
              className="text-white mb-3 md:mb-5 text-3xl md:text-[4.5rem] leading-tight md:leading-none"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 700,
                letterSpacing: '-0.03em',
                textShadow: '0 6px 40px rgba(0, 0, 0, 0.9), 0 0 80px rgba(197, 139, 48, 0.2)'
              }}
            >
              {t.slide4MainTitle}
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
              {t.slide4Description}
            </motion.p>
          </motion.div>

          {/* Concept Grid - 2x2 Refined */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {conceptPoints.map((point, index) => {
              const IconComponent = Icons[point.icon as keyof typeof Icons];
              
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 1.2 + index * 0.15, 
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="relative group"
                >
                  {/* Card */}
                  <div 
                    className="relative p-5 md:p-7 h-full transition-all duration-500 group-hover:translate-y-[-4px]"
                    style={{
                      background: 'rgba(11, 11, 11, 0.6)',
                      backdropFilter: 'blur(40px)',
                      border: '1px solid rgba(197, 139, 48, 0.2)',
                      borderRadius: '1rem',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {/* Top accent line */}
                    <div 
                      className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#C58B30] to-transparent transition-all duration-500"
                      style={{
                        width: '3rem',
                        borderRadius: '1rem 1rem 0 0'
                      }}
                    />

                    {/* Icon + Title row */}
                    <div className="flex items-start gap-4 mb-4">
                      <div 
                        className="w-12 h-12 flex items-center justify-center flex-shrink-0 text-[#C58B30] transition-all duration-500 group-hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, rgba(197, 139, 48, 0.2) 0%, rgba(197, 139, 48, 0.05) 100%)',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(197, 139, 48, 0.3)'
                        }}
                      >
                        <IconComponent />
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <h3 
                          className="text-white mb-1"
                          style={{ 
                            fontFamily: 'Satoshi, sans-serif', 
                            fontWeight: 600,
                            fontSize: '1.25rem',
                            lineHeight: '1.3',
                            letterSpacing: '-0.01em',
                            textShadow: '0 2px 15px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          {point.title}
                        </h3>
                        <p 
                          className="text-[#C58B30]"
                          style={{ 
                            fontFamily: 'Satoshi, sans-serif', 
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            letterSpacing: '0.01em'
                          }}
                        >
                          {point.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p 
                      className="text-white/60 pl-0 md:pl-16 text-xs md:text-sm"
                      style={{ 
                        fontFamily: 'Satoshi, sans-serif', 
                        fontWeight: 300,
                        lineHeight: '1.5'
                      }}
                    >
                      {point.description}
                    </p>

                    {/* Hover glow effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(197, 139, 48, 0.15) 0%, transparent 70%)',
                        filter: 'blur(25px)',
                        borderRadius: '1rem'
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: 'rgba(197, 139, 48, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(197, 139, 48, 0.3)',
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
                className="text-[#C58B30]"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  letterSpacing: '0.08em'
                }}
              >
                {t.slide4Footer}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ambient glow - paleta correta */}
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