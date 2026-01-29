import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { useEffect, useRef, useState } from 'react';
import imgArtist from 'figma:asset/ef852d0a546660aa697c387bbb2f38062be8dcda.png';

// SLIDE 7: PERFORMANCE SHOWCASE — DJ + Guitar Live (Vertical Scroll Layout)
export default function LuxurySlide7({ language, isMuted }: { language: Language; isMuted?: boolean }) {
  const t = translations[language];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [videoError, setVideoError] = useState(false);

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
        video.muted = true;
        try {
          await video.play();
          setNeedsInteraction(true);
        } catch (e) {
          setNeedsInteraction(true);
        }
      }
    };
    
    const timer = setTimeout(playWithSound, 100);
    return () => clearTimeout(timer);
  }, []);

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
      
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(11, 11, 11, 1) 0%, rgba(14, 34, 60, 0.4) 50%, rgba(11, 11, 11, 1) 100%)'
        }}
      />

      {/* PADRÃO MOBILE - Wrapper com scroll */}
      <div className="block md:hidden absolute inset-0 overflow-y-auto overflow-x-hidden z-20"
        style={{
          paddingTop: '40px',
          paddingBottom: '60px',
          paddingLeft: '16px',
          paddingRight: '16px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C58B30]" />
              <span 
                className="text-[#C58B30] tracking-[0.3em] uppercase text-xs"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 500
                }}
              >
                {t.slide6Overline}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C58B30]" />
            </div>
            
            <h2 
              className="text-white text-3xl mb-1"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              {t.slide6Title} <br />
              <span className="text-[#C58B30]">{t.slide6TitleGold}</span>
            </h2>
            
            <p 
              className="text-white/60 text-sm max-w-2xl mx-auto mt-4"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 300,
                lineHeight: '1.6'
              }}
            >
              {t.slide6Description}
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative aspect-[9/16] max-h-[500px] rounded-lg overflow-hidden group mx-auto"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            <video
              ref={videoRef}
              loop
              playsInline
              autoPlay
              muted={false}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.85) contrast(1.1)', backgroundColor: '#0B0B0B' }}
            >
              <source src="https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/VID_20251030_115234_050_1.mp4" type="video/mp4" />
            </video>

            {/* Fallback visual se vídeo falhar */}
            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B]">
                <img 
                  src={imgArtist}
                  alt="Johnny Rebouças DJ Performance"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.85) contrast(1.1) saturate(1.05)' }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#C58B30]/30 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-[#C58B30]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Vídeo indisponível
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                    Toque para ativar áudio
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Border glow */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                border: '1px solid rgba(197, 139, 48, 0.3)',
                borderRadius: '0.75rem',
                boxShadow: 'inset 0 0 40px rgba(197, 139, 48, 0.1)'
              }}
            />
          </motion.div>

          {/* Text Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="p-6 rounded-xl"
            style={{
              background: 'rgba(11, 11, 11, 0.7)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(197, 139, 48, 0.2)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full text-[#C58B30]"
                style={{
                  background: 'linear-gradient(135deg, rgba(197, 139, 48, 0.2) 0%, rgba(197, 139, 48, 0.05) 100%)',
                  border: '1px solid rgba(197, 139, 48, 0.3)'
                }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 
                  className="text-white text-xl mb-2"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 600
                  }}
                >
                  {t.slide6Point1Title}
                </h3>
                <p 
                  className="text-white/60 text-sm"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 300,
                    lineHeight: '1.6'
                  }}
                >
                  {t.slide6Point1Desc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="relative aspect-[4/3] rounded-xl overflow-hidden"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
            }}
          >
            <img 
              src={imgArtist}
              alt="Johnny Rebouças Live Performance"
              className="w-full h-full object-cover"
              style={{ 
                filter: 'brightness(0.85) contrast(1.1) saturate(1.05)',
                objectPosition: 'center 35%'
              }}
            />

            {/* Border glow */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                border: '1px solid rgba(197, 139, 48, 0.3)',
                borderRadius: '0.75rem',
                boxShadow: 'inset 0 0 40px rgba(197, 139, 48, 0.1)'
              }}
            />
          </motion.div>

          {/* Text Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="p-6 rounded-xl"
            style={{
              background: 'rgba(11, 11, 11, 0.7)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(197, 139, 48, 0.2)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full text-[#C58B30]"
                style={{
                  background: 'linear-gradient(135deg, rgba(197, 139, 48, 0.2) 0%, rgba(197, 139, 48, 0.05) 100%)',
                  border: '1px solid rgba(197, 139, 48, 0.3)'
                }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 
                  className="text-white text-xl mb-2"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 600
                  }}
                >
                  {t.slide6Point2Title}
                </h3>
                <p 
                  className="text-white/60 text-sm"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 300,
                    lineHeight: '1.6'
                  }}
                >
                  {t.slide6Point2Desc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="text-center pt-4"
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
                className="text-[#C58B30] text-sm"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 500,
                  letterSpacing: '0.08em'
                }}
              >
                {t.slide6Footer}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP VERSION - Split Screen with Video Background Bleed */}
      <div className="hidden md:block relative h-full w-full">
        
        {/* Background Video - Fullscreen (subtle) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 overflow-hidden"
        >
          <video
            loop
            playsInline
            autoPlay
            muted
            className="w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.3) blur(8px) saturate(0.8)',
              backgroundColor: '#0B0B0B'
            }}
          >
            <source src="https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/VID_20251030_115234_050_1.mp4" type="video/mp4" />
          </video>
          
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, rgba(11, 11, 11, 0.5) 0%, rgba(11, 11, 11, 0.9) 60%, rgba(11, 11, 11, 1) 100%)',
            }}
          />
        </motion.div>

        {/* Split Screen Layout */}
        <div className="absolute inset-0 flex items-center">
          
          {/* LEFT: Video embed with audio */}
          <div className="w-1/2 h-full flex items-center justify-center px-12">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[9/16] max-h-[85vh] rounded-2xl overflow-hidden group"
              style={{
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(197, 139, 48, 0.4)'
              }}
            >
              <video
                ref={videoRef}
                loop
                playsInline
                autoPlay
                muted={false}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.9) contrast(1.1)', backgroundColor: '#0B0B0B' }}
              >
                <source src="https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/VID_20251030_115234_050_1.mp4" type="video/mp4" />
              </video>

              {/* Play overlay if needs interaction */}
              {needsInteraction && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleVideoClick}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer z-50"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-[#C58B30] flex items-center justify-center mb-4 mx-auto shadow-2xl">
                      <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p 
                      className="text-white text-lg"
                      style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}
                    >
                      Clique para ativar áudio
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* Border glow on hover */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(197, 139, 48, 0.3)',
                  borderRadius: '1rem'
                }}
              />
            </motion.div>
          </div>

          {/* RIGHT: Content */}
          <div className="w-1/2 h-full flex items-center justify-center px-12">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl w-full space-y-12"
            >
              
              {/* Header */}
              <div className="space-y-10">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C58B30]" />
                  <span 
                    className="text-[#C58B30] tracking-[0.3em] uppercase text-xs"
                    style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}
                  >
                    {t.slide6Overline}
                  </span>
                </div>
                
                <h2 
                  className="text-white text-5xl"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                    lineHeight: '1.3'
                  }}
                >
                  {t.slide6Title} 
                  <span className="block mt-3 text-[#C58B30]">{t.slide6TitleGold}</span>
                </h2>
                
                <p 
                  className="text-white/80 text-lg leading-relaxed pt-4"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 300
                  }}
                >
                  {t.slide6Description}
                </p>
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { title: t.slide6Card1Title, desc: t.slide6Card1Desc },
                  { title: t.slide6Card2Title, desc: t.slide6Card2Desc },
                  { title: t.slide6Card3Title, desc: t.slide6Card3Desc }
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                    className="p-5 rounded-lg text-center backdrop-blur-md"
                    style={{
                      background: 'rgba(11, 11, 11, 0.7)',
                      border: '1px solid rgba(197, 139, 48, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
                    }}
                  >
                    <p 
                      className="text-[#C58B30] text-sm mb-2 font-semibold"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {card.title}
                    </p>
                    <p 
                      className="text-white/60 text-xs"
                      style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
                    >
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gold accent glow */}
        <motion.div
          animate={{ 
            opacity: [0.08, 0.15, 0.08],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(197, 139, 48, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
      </div>

      {/* Ambient glow - MOBILE ONLY */}
      <motion.div
        animate={{ 
          opacity: [0.06, 0.12, 0.06],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="block md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none"
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