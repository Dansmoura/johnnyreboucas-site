import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import img1 from 'figma:asset/b881a7247ba2594c9ec6cc24a7a70078d3bbe6fd.png';
import { Settings, Guitar, Volume2, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// SLIDE 9: INVESTMENT — Luxury Package Details
export default function LuxurySlide9({ language }: { language: Language; isMuted?: boolean }) {
  const t = translations[language];

  const specs = [
    { label: t.slide8Setup, value: t.slide8SetupValue, icon: Settings },
    { label: t.slide8Guitar, value: t.slide8GuitarValue, icon: Guitar },
    { label: t.slide8Sound, value: t.slide8SoundValue, icon: Volume2 },
    { label: t.slide8Experience, value: t.slide8ExperienceValue, icon: Sparkles }
  ];

  const pricing = [
    { duration: t.slide8Duration1, price: '€320', description: t.slide8Desc1, hours: t.slide8Duration1 },
    { duration: t.slide8Duration2, price: '€250', description: t.slide8Desc2, hours: t.slide8Duration2 },
    { duration: t.slide8Duration3, price: '€150', description: t.slide8Desc3, hours: t.slide8Duration3 }
  ];

  const handleWhatsAppClick = (item: typeof pricing[0]) => {
    const phone = '5571991987985'; // Formato internacional sem + e espaços
    const message = t.slide8WhatsAppMessage(item.duration, item.description, item.price);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full h-full bg-[#0B0B0B] relative overflow-hidden">
      {/* Background image - dramatic close-up crop */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 2.5 }}
        className="absolute inset-0"
      >
        <img 
          src={img1} 
          alt="Johnny Backstage"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.3) contrast(1.4) grayscale(0.4)' }}
        />
        {/* Heavy vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(11, 11, 11, 0.75) 50%, rgba(11, 11, 11, 0.97) 100%)'
          }}
        />
      </motion.div>

      {/* PADRÃO TELA 3 - Wrapper com scroll */}
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden md:overflow-visible z-20"
        style={{
          paddingTop: '80px',
          paddingBottom: '100px',
          paddingLeft: '20px',
          paddingRight: '20px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Two Column Layout - RESPONSIVO */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:px-4 gap-8 md:gap-16 max-w-7xl mx-auto min-h-full">
          
          {/* LEFT COLUMN - Technical Specs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="flex-1 max-w-xl"
          >
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-4xl md:text-6xl text-white mb-6 md:mb-10 leading-none"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 700,
                letterSpacing: '0.02em'
              }}
            >
              {t.slide8LeftTitle}
            </motion.h2>

            {/* Specs list - minimal */}
            <div className="space-y-3 md:space-y-4">
              {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.12, duration: 0.8 }}
                    className="border-l-2 border-[#C58B30]/40 pl-4 md:pl-5 py-1.5 md:py-2 relative"
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#C58B30]/60" strokeWidth={1.5} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 flex-1">
                        <span 
                          className="text-xs md:text-sm text-[#C58B30] md:w-24"
                          style={{ 
                            fontFamily: 'Satoshi, sans-serif', 
                            fontWeight: 300,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                          }}
                        >
                          {spec.label}
                        </span>
                        <span 
                          className="text-sm md:text-base text-white/80 flex-1"
                          style={{ 
                            fontFamily: 'Satoshi, sans-serif', 
                            fontWeight: 400
                          }}
                        >
                          {spec.value}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 1.5 }}
              className="mt-8 md:mt-10 pt-5 md:pt-6 border-t border-white/10"
            >
              <p 
                className="text-base md:text-lg text-white/50 italic"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 300,
                  lineHeight: 1.6
                }}
              >
                {t.slide8Quote}
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Investment/Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="flex-1 max-w-lg"
          >
            {/* Investment Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mb-6 md:mb-8"
            >
              <h3 
                className="text-4xl md:text-5xl text-white mb-2 leading-none"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 700,
                  letterSpacing: '0.02em'
                }}
              >
                {t.slide8InvestmentTitle}
              </h3>
              <p 
                className="text-sm md:text-base text-[#C58B30]/70"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 300,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                {t.slide8InvestmentSubtitle}
              </p>
            </motion.div>

            {/* Equipment Gallery - Mini visual break */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="mb-6 md:mb-8 grid grid-cols-3 gap-2 md:gap-3"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden border border-[#C58B30]/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1765986964925-4aec53343a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdWRpbyUyMG1peGVyJTIwY29uc29sZXxlbnwxfHx8fDE3Njk3MDM1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Professional Audio Mixer"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.4) contrast(1.2) saturate(0.8)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden border border-[#C58B30]/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1682988447436-90a24d7623bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGd1aXRhciUyMGNsb3NldXAlMjBlbGVnYW50fGVufDF8fHx8MTc2OTcwMzUxOHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Acoustic Guitar"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.4) contrast(1.2) saturate(0.8)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden border border-[#C58B30]/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1765986964925-4aec53343a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMGVxdWlwbWVudCUyMHR1cm50YWJsZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njk3MDM1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="DJ Equipment"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.4) contrast(1.2) saturate(0.8)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Pricing Cards */}
            <div className="space-y-3 md:space-y-4">
              {pricing.map((item, index) => (
                <motion.div
                  key={item.duration}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + index * 0.15, duration: 0.8 }}
                  whileHover={{ x: -8, transition: { duration: 0.3 } }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 px-5 md:px-6 py-4 md:py-5 cursor-pointer group relative overflow-hidden"
                  onClick={() => handleWhatsAppClick(item)}
                >
                  <div className="flex items-center justify-between mb-1.5 md:mb-2">
                    <span 
                      className="text-lg md:text-xl text-white"
                      style={{ 
                        fontFamily: 'Satoshi, sans-serif', 
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                      }}
                    >
                      {item.duration}
                    </span>
                    <div className="text-right">
                      <span 
                        className="text-2xl md:text-3xl text-[#C58B30]"
                        style={{ 
                          fontFamily: 'Satoshi, sans-serif', 
                          fontWeight: 700
                        }}
                      >
                        {item.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p 
                      className="text-xs md:text-sm text-white/40 italic"
                      style={{ 
                        fontFamily: 'Satoshi, sans-serif', 
                        fontWeight: 300
                      }}
                    >
                      {item.description}
                    </p>
                    <span 
                      className="text-xs text-[#C58B30]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ 
                        fontFamily: 'Satoshi, sans-serif', 
                        fontWeight: 400,
                        letterSpacing: '0.05em'
                      }}
                    >
                      {t.slide8ClickMessage}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Custom note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 1.5 }}
              className="mt-6 text-sm text-white/30 text-right"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 300,
                letterSpacing: '0.03em'
              }}
            >
              {t.slide8CustomNote}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Vertical divider line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.8, duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3/5 bg-gradient-to-b from-transparent via-[#C58B30]/30 to-transparent"
      />

      {/* Subtle grain */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
}