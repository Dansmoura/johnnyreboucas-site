import { motion } from 'motion/react';
import { Language } from '../translations';

interface LanguageSelectorProps {
  onSelectLanguage: (lang: Language) => void;
}

export default function LanguageSelector({ onSelectLanguage }: LanguageSelectorProps) {
  const languages = [
    { code: 'en-us' as Language, label: 'EN/US', flag: '🇺🇸' },
    { code: 'es' as Language, label: 'ES', flag: '🇪🇸' },
    { code: 'pt-br' as Language, label: 'PT/BR', flag: '🇧🇷' }
  ];

  return (
    <div className="w-full h-full bg-[#0B0B0B] relative overflow-hidden flex items-center justify-center">
      {/* Golden glow background */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0.2 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[800px] h-[800px] rounded-full bg-[#C58B30] blur-[150px]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-6xl text-white mb-16"
          style={{ 
            fontFamily: 'Satoshi, sans-serif', 
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}
        >
          Brazilian Live Sessions
        </motion.h1>

        {/* Language buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex gap-6"
        >
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.15, duration: 0.6 }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 40px rgba(197, 139, 48, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectLanguage(lang.code)}
              className="group relative px-12 py-8 bg-gradient-to-br from-[#C58B30]/20 to-[#C58B30]/5 backdrop-blur-sm border border-[#C58B30]/30 rounded-2xl cursor-pointer transition-all duration-300 hover:border-[#C58B30]"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C58B30]/0 to-[#C58B30]/0 group-hover:from-[#C58B30]/10 group-hover:to-[#C58B30]/5 transition-all duration-300" />
              
              <div className="relative flex flex-col items-center gap-3">
                <span className="text-5xl">{lang.flag}</span>
                <span 
                  className="text-2xl text-white/80 group-hover:text-white transition-colors duration-300"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: 600,
                    letterSpacing: '0.1em'
                  }}
                >
                  {lang.label}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-12 text-lg text-white/40"
          style={{ 
            fontFamily: 'Satoshi, sans-serif', 
            fontWeight: 300,
            letterSpacing: '0.2em'
          }}
        >
          SELECT YOUR LANGUAGE
        </motion.p>
      </div>

      {/* Decorative corners */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <div className="absolute top-12 left-12 w-32 h-32 border-t-2 border-l-2 border-[#C58B30]/40" />
        <div className="absolute top-12 right-12 w-32 h-32 border-t-2 border-r-2 border-[#C58B30]/40" />
        <div className="absolute bottom-12 left-12 w-32 h-32 border-b-2 border-l-2 border-[#C58B30]/40" />
        <div className="absolute bottom-12 right-12 w-32 h-32 border-b-2 border-r-2 border-[#C58B30]/40" />
      </motion.div>

      {/* Grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
}
