import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import img1 from 'figma:asset/b881a7247ba2594c9ec6cc24a7a70078d3bbe6fd.png';

// SLIDE 9: INVESTMENT — Luxury Package Details
export default function LuxurySlide9({ language }: { language: Language; isMuted?: boolean }) {
  const t = translations[language];

  const specs = [
    { label: t.slide8Setup, value: t.slide8SetupValue },
    { label: t.slide8Guitar, value: t.slide8GuitarValue },
    { label: t.slide8Sound, value: t.slide8SoundValue },
    { label: t.slide8Experience, value: t.slide8ExperienceValue }
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

      {/* Two Column Layout */}
      <div className="absolute inset-0 flex items-center justify-between px-20 gap-16">
        
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
            className="text-6xl text-white mb-10 leading-none"
            style={{ 
              fontFamily: 'Satoshi, sans-serif', 
              fontWeight: 700,
              letterSpacing: '0.02em'
            }}
          >
            {t.slide8LeftTitle}
          </motion.h2>

          {/* Specs list - minimal */}
          <div className="space-y-4">
            {specs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.12, duration: 0.8 }}
                className="border-l-2 border-[#C58B30]/40 pl-5 py-2"
              >
                <div className="flex items-baseline gap-6">
                  <span 
                    className="text-sm text-[#C58B30] w-24"
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
                    className="text-base text-white/80 flex-1"
                    style={{ 
                      fontFamily: 'Satoshi, sans-serif', 
                      fontWeight: 400
                    }}
                  >
                    {spec.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1.5 }}
            className="mt-10 pt-6 border-t border-white/10"
          >
            <p 
              className="text-lg text-white/50 italic"
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
            className="mb-8"
          >
            <h3 
              className="text-5xl text-white mb-2 leading-none"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 700,
                letterSpacing: '0.02em'
              }}
            >
              {t.slide8InvestmentTitle}
            </h3>
            <p 
              className="text-base text-[#C58B30]/70"
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

          {/* Pricing Cards */}
          <div className="space-y-4">
            {pricing.map((item, index) => (
              <motion.div
                key={item.duration}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + index * 0.15, duration: 0.8 }}
                whileHover={{ x: -8, transition: { duration: 0.3 } }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-5 cursor-pointer group relative overflow-hidden"
                onClick={() => handleWhatsAppClick(item)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span 
                    className="text-xl text-white"
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
                      className="text-3xl text-[#C58B30]"
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
                    className="text-sm text-white/40 italic"
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