import { motion } from 'motion/react';
import { Language } from '../translations';
import johnnyImage from 'figma:asset/ef852d0a546660aa697c387bbb2f38062be8dcda.png';
import JohnnyLogo from './JohnnyLogo';

// SLIDE 1: OPENING — Brazilian Live Sessions
export default function LuxurySlide1({ language }: { language: Language; isMuted?: boolean }) {
  return (
    <div className="w-full h-full bg-[#0B0B0B] relative overflow-hidden">
      {/* Full bleed image - dramatic crop, slow zoom */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img 
          src={johnnyImage} 
          alt="Johnny Rebouças"
          className="w-full h-full object-cover object-[center_30%]"
          style={{ filter: 'brightness(0.35) contrast(1.25)' }}
        />
        {/* Vignette overlay - darker edges */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(11, 11, 11, 0.5) 60%, rgba(11, 11, 11, 0.85) 100%)'
          }}
        />
      </motion.div>

      {/* Logo centered */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-0">
        <JohnnyLogo 
          size="hero" 
          animate={true}
          delay={2.5}
        />
      </div>

      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
}