import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../translations';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languages = [
  { code: 'pt-br' as Language, label: 'PT', flag: '🇧🇷' },
  { code: 'en-us' as Language, label: 'EN', flag: '🇺🇸' },
  { code: 'es' as Language, label: 'ES', flag: '🇪🇸' }
];

export default function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all"
        style={{
          background: 'rgba(11, 11, 11, 0.6)',
          borderColor: isOpen ? 'rgba(197, 139, 48, 0.5)' : 'rgba(197, 139, 48, 0.25)',
          boxShadow: isOpen 
            ? '0 4px 20px rgba(197, 139, 48, 0.3)' 
            : '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}
      >
        <Globe className="w-4 h-4 text-[#C58B30]" />
        <span 
          className="text-white"
          style={{ 
            fontFamily: 'Satoshi, sans-serif', 
            fontWeight: 500,
            fontSize: '0.875rem',
            letterSpacing: '0.05em'
          }}
        >
          {currentLang?.flag} {currentLang?.label}
        </span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 rounded-xl overflow-hidden border"
            style={{
              background: 'rgba(11, 11, 11, 0.95)',
              backdropFilter: 'blur(40px)',
              borderColor: 'rgba(197, 139, 48, 0.25)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              minWidth: '140px'
            }}
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(197, 139, 48, 0.15)' }}
                className="w-full px-4 py-3 flex items-center gap-3 transition-colors"
                style={{
                  borderBottom: index < languages.length - 1 ? '1px solid rgba(197, 139, 48, 0.15)' : 'none',
                  background: lang.code === currentLanguage 
                    ? 'rgba(197, 139, 48, 0.2)' 
                    : 'transparent'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{lang.flag}</span>
                <span 
                  className="text-white"
                  style={{ 
                    fontFamily: 'Satoshi, sans-serif', 
                    fontWeight: lang.code === currentLanguage ? 600 : 400,
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  {lang.label}
                </span>
                {lang.code === currentLanguage && (
                  <motion.div
                    layoutId="activeLanguage"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C58B30]"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}