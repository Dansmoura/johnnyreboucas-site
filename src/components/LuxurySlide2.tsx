import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import JohnnyLogo from './JohnnyLogo';

// SLIDE 2: MANIFESTO — O Som da Presença
export default function LuxurySlide2({ language }: { language: Language; isMuted?: boolean }) {
  const t = translations[language];
  
  const manifestoLines = [
    t.slide2Line1,
    t.slide2Line2,
    t.slide2Line3
  ];

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/* Stark white background - high contrast shift */}
      
      {/* Floating amber circle - organic movement */}
      <motion.div
        animate={{ 
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-[#C58B30] opacity-10 blur-[100px]"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-6 md:px-20">
        <div className="max-w-5xl text-center">
          
          {/* Main Quote */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 md:mb-10 text-3xl md:text-6xl leading-tight md:leading-[1.2]"
            style={{ 
              fontFamily: 'Satoshi, sans-serif', 
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}
          >
            <span className="text-[#0B0B0B]">{t.slide2Line1} {t.slide2Line2} </span>
            <span className="text-[#C58B30]">{t.slide2Line3}</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="text-[#0B0B0B]/70 max-w-3xl mx-auto text-sm md:text-xl leading-relaxed md:leading-relaxed"
            style={{ 
              fontFamily: 'Satoshi, sans-serif', 
              fontWeight: 300
            }}
          >
            {t.slide2Description}
          </motion.p>
        </div>
      </div>

      {/* Subtitle - minimal, delayed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
        className="absolute bottom-12 md:bottom-20 left-0 right-0 text-center px-4"
      >
        <p 
          className="text-xs md:text-xl text-[#0B0B0B] tracking-[0.2em] md:tracking-[0.3em] opacity-40"
          style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 300 }}
        >
          BRAZILIAN LIVE SESSIONS
        </p>
      </motion.div>

      {/* Corner accent - minimal line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute top-8 md:top-16 left-6 md:left-16 w-16 md:w-32 h-px bg-[#C58B30]"
        style={{ transformOrigin: 'left' }}
      />
      
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 3.2, duration: 1.5 }}
        className="absolute top-8 md:top-16 left-6 md:left-16 w-px h-16 md:h-32 bg-[#C58B30]"
        style={{ transformOrigin: 'top' }}
      />
    </div>
  );
}