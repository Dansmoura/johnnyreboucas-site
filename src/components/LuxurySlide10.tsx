import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { Mail, Instagram } from 'lucide-react';
import { useEffect, useRef } from 'react';
import JohnnyLogo from './JohnnyLogo';

// SLIDE 10: CLOSING — Call to Action
export default function LuxurySlide10({ language }: { language: Language; isMuted?: boolean }) {
  const t = translations[language];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video muted
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(e => console.log('Erro ao tocar vídeo:', e));
    }
  }, []);

  return (
    <div className="w-full h-full bg-[#0B0B0B] relative overflow-hidden">
      {/* Background Video - Muted */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          filter: 'brightness(0.4) contrast(1.2) saturate(0.8)',
          objectPosition: 'center center'
        }}
      >
        <source src="https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/Johnny%20GT%2001%20Edit.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/60 via-transparent to-[#0B0B0B]/80" />

      {/* Animated Spotlight Effects - HIDDEN MOBILE para performance */}
      <div className="hidden md:block">
        {/* Spotlight 1 - Diagonal sweep */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut'
          }}
          className="absolute top-0 left-0 w-[600px] h-full origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(197, 139, 48, 0.4) 50%, transparent 100%)',
            transform: 'skewX(-20deg)',
            filter: 'blur(60px)'
          }}
        />

        {/* Spotlight 2 - Vertical sweep */}
        <motion.div
          animate={{
            y: ['-100%', '200%'],
            opacity: [0, 0.5, 0.5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute left-0 top-0 w-full h-[500px]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
            filter: 'blur(80px)'
          }}
        />

        {/* Spotlight 3 - Radial pulse from corners */}
        <motion.div
          animate={{
            scale: [0.5, 2, 0.5],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
            delay: 4
          }}
          className="absolute top-0 right-0 w-[800px] h-[800px]"
          style={{
            background: 'radial-gradient(circle, rgba(197, 139, 48, 0.5) 0%, transparent 70%)',
            filter: 'blur(100px)',
            transformOrigin: 'top right'
          }}
        />

        {/* Spotlight 4 - Cross beam */}
        <motion.div
          animate={{
            x: ['200%', '-100%'],
            opacity: [0, 0.5, 0.5, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: 'easeInOut',
            delay: 5
          }}
          className="absolute top-1/3 left-0 w-[700px] h-[300px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(14, 34, 60, 0.6) 50%, transparent 100%)',
            transform: 'skewY(-15deg)',
            filter: 'blur(70px)'
          }}
        />
      </div>

      {/* Main content - COM SCROLL E PADDING MOBILE */}
      <div 
        className="absolute inset-0 overflow-y-auto overflow-x-hidden md:overflow-visible z-10"
        style={{
          paddingTop: '140px',
          paddingBottom: '250px',
          paddingLeft: '20px',
          paddingRight: '20px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-full">
          {/* Logo mark - RESPONSIVO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="mb-8 md:mb-16"
          >
            <JohnnyLogo 
              size="hero" 
              animate={false}
            />
          </motion.div>

          {/* Contact info - MOBILE FRIENDLY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1.5 }}
            className="w-full max-w-md space-y-4 md:space-y-5 backdrop-blur-sm bg-[#0B0B0B]/40 px-6 md:px-10 py-6 md:py-8 rounded-2xl border border-white/10"
          >
            {/* Email - MOBILE WRAPPED */}
            <motion.a
              href="mailto:joaopaulorochareboucas@gmail.com"
              whileHover={{ x: 5 }}
              className="flex items-start md:items-center gap-3 md:gap-4 text-sm md:text-lg text-white/70 hover:text-[#C58B30] transition-colors duration-500 break-all"
              style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 md:mt-0" strokeWidth={1.5} />
              <span className="break-words">joaopaulorochareboucas@gmail.com</span>
            </motion.a>

            {/* WhatsApp - MOBILE FRIENDLY */}
            <motion.a
              href="https://wa.me/5571991987985"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 md:gap-4 text-sm md:text-lg text-white/70 hover:text-[#C58B30] transition-colors duration-500"
              style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              +55 71 99198-7985
            </motion.a>

            {/* Instagram - MOBILE FRIENDLY */}
            <motion.a
              href="https://instagram.com/johnny_reboucas"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 md:gap-4 text-sm md:text-lg text-white/70 hover:text-[#C58B30] transition-colors duration-500"
              style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
            >
              <Instagram className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" strokeWidth={1.5} />
              @johnny_reboucas
            </motion.a>
          </motion.div>

          {/* Final manifesto - MOBILE SMALLER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 2 }}
            className="mt-8 md:mt-16 text-center px-4"
          >
            <p 
              className="text-xs md:text-xl text-white/60 tracking-[0.2em] md:tracking-[0.3em]"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 300,
              }}
            >
              {t.slide2Subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Minimal corner frames - HIDDEN MOBILE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3, duration: 2 }}
        className="z-10 hidden md:block"
      >
        <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-[#C58B30]/50" />
        <div className="absolute top-12 right-12 w-24 h-24 border-t border-r border-[#C58B30]/50" />
        <div className="absolute bottom-12 left-12 w-24 h-24 border-b border-l border-[#C58B30]/50" />
        <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-[#C58B30]/50" />
      </motion.div>

      {/* Expanding circles - HIDDEN MOBILE */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 3, 4],
            opacity: [0, 0.12, 0]
          }}
          transition={{ 
            duration: 5,
            delay: 4 + i * 0.4,
            ease: 'easeOut'
          }}
          className="absolute inset-0 items-center justify-center pointer-events-none z-0 hidden md:flex"
        >
          <div 
            className="rounded-full border-2 border-[#C58B30]"
            style={{ width: '400px', height: '400px' }}
          />
        </motion.div>
      ))}

      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
}