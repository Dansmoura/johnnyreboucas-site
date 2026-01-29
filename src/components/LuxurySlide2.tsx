import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import JohnnyLogo from './JohnnyLogo';
import { MOBILE_DESIGN_SYSTEM } from '../mobile-design-system';

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
      
      {/* Floating amber circle - organic movement - adjusted for mobile */}
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
        className="absolute top-1/4 right-1/3 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#C58B30] opacity-10 blur-[100px]"
      />

      {/* Content - Mobile optimized padding */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-20"
        style={{
          paddingLeft: MOBILE_DESIGN_SYSTEM.spacing.edgeMobile,
          paddingRight: MOBILE_DESIGN_SYSTEM.spacing.edgeMobile,
        }}
      >
        <div className="max-w-5xl text-center w-full">
          
          {/* Main Quote - Fluid typography */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 md:mb-10"
            style={{ 
              fontFamily: 'Satoshi, sans-serif', 
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontSize: MOBILE_DESIGN_SYSTEM.typography.displayLarge,
              lineHeight: MOBILE_DESIGN_SYSTEM.lineHeight.tight.mobile,
            }}
          >
            <span className="text-[#0B0B0B]">{t.slide2Line1} {t.slide2Line2} </span>
            <span className="text-[#C58B30]">{t.slide2Line3}</span>
          </motion.h2>

          {/* Description - Fluid typography */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="text-[#0B0B0B]/70 max-w-3xl mx-auto"
            style={{ 
              fontFamily: 'Satoshi, sans-serif', 
              fontWeight: 300,
              fontSize: MOBILE_DESIGN_SYSTEM.typography.bodyLarge,
              lineHeight: MOBILE_DESIGN_SYSTEM.lineHeight.relaxed.mobile,
            }}
          >
            {t.slide2Description}
          </motion.p>
        </div>
      </div>

      {/* Subtitle - minimal, delayed - responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
        className="absolute left-0 right-0 text-center px-4"
        style={{
          bottom: `calc(${MOBILE_DESIGN_SYSTEM.spacing.edgeMobile} + ${MOBILE_DESIGN_SYSTEM.safeArea.bottom})`,
        }}
      >
        <p 
          className="text-[#0B0B0B] opacity-40"
          style={{ 
            fontFamily: 'Satoshi, sans-serif', 
            fontWeight: 300,
            fontSize: MOBILE_DESIGN_SYSTEM.typography.caption,
            letterSpacing: '0.2em',
          }}
        >
          BRAZILIAN LIVE SESSIONS
        </p>
      </motion.div>

      {/* Corner accent - minimal line - scaled for mobile */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute top-8 md:top-16 left-6 md:left-16 w-12 md:w-32 h-px bg-[#C58B30]"
        style={{ transformOrigin: 'left' }}
      />
      
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 3.2, duration: 1.5 }}
        className="absolute top-8 md:top-16 left-6 md:left-16 w-px h-12 md:h-32 bg-[#C58B30]"
        style={{ transformOrigin: 'top' }}
      />
    </div>
  );
}