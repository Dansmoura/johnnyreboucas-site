import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Language, translations } from '../translations';
import img1 from 'figma:asset/da7dfd3f088ee83b811e41eb4a4a325fa6fd6233.png';
import img2 from 'figma:asset/e73f472387a95ae6312f3903f8407b33ee5b1b67.png';
import img3 from 'figma:asset/6838e40d50507a6bb6cbfe88c223655d35e5f388.png';
import img4 from 'figma:asset/cd6f702f297ed2f6e51d2e9dcdb41006ed738c0f.png';
import img5 from 'figma:asset/47803e83f7fe1513c9a7db532fe8e8c81fad5914.png';

// SLIDE 8: VERSATILIDADE — Carousel de Contextos
export default function LuxurySlide8({ language }: { language: Language; isMuted?: boolean }) {
  const t = translations[language];
  
  const venues = [
    { 
      img: img1, 
      name: t.slide7Venue1,
      desc: t.slide7Venue1Desc,
      position: 'center 40%'
    },
    { 
      img: img2, 
      name: t.slide7Venue2,
      desc: t.slide7Venue2Desc,
      position: 'center 40%'
    },
    { 
      img: img3, 
      name: t.slide7Venue3,
      desc: t.slide7Venue3Desc,
      position: 'center 40%'
    },
    { 
      img: img4, 
      name: t.slide7Venue4,
      desc: t.slide7Venue4Desc,
      position: 'center 40%'
    },
    { 
      img: img5, 
      name: t.slide7Venue5,
      desc: t.slide7Venue5Desc,
      position: 'center 20%'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % venues.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [venues.length]);

  return (
    <div className="w-full h-full bg-[#0E223C] relative overflow-hidden">
      {/* Image carousel - FIXED */}
      <div className="absolute inset-0">
        {venues.map((venue, index) => (
          <motion.div
            key={venue.name}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentIndex === index ? 1 : 0,
              scale: currentIndex === index ? 1 : 1.05
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img 
              src={venue.img} 
              alt={venue.name}
              className="w-full h-full object-cover"
              style={{ 
                filter: 'brightness(0.6) contrast(1.15)',
                objectPosition: venue.position
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E223C] via-[#0E223C]/60 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Content overlay - COM PADDINGS PADRÃO */}
      <div className="absolute inset-0"
        style={{
          paddingTop: '80px',
          paddingBottom: '160px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <div className="h-full flex flex-col justify-between max-w-7xl mx-auto">
          {/* Top section - title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 
              className="text-2xl md:text-5xl text-white mb-2 md:mb-3"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 700,
                letterSpacing: '0.03em'
              }}
            >
              {t.slide7Title1}
            </h2>
            <h2 
              className="text-2xl md:text-5xl text-[#C58B30]"
              style={{ 
                fontFamily: 'Satoshi, sans-serif', 
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '0.03em'
              }}
            >
              {t.slide7Title2}
            </h2>
          </motion.div>

          {/* Bottom section - venue info */}
          <div>
            {/* Venue name & description */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 md:mb-8"
            >
              <h3 
                className="text-xl md:text-4xl text-white mb-1 md:mb-2"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 600,
                  letterSpacing: '0.02em'
                }}
              >
                {venues[currentIndex].name}
              </h3>
              <p 
                className="text-sm md:text-xl text-white/60"
                style={{ 
                  fontFamily: 'Satoshi, sans-serif', 
                  fontWeight: 300,
                  fontStyle: 'italic'
                }}
              >
                {venues[currentIndex].desc}
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="flex gap-2">
              {venues.map((_, index) => (
                <div key={index} className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: currentIndex === index ? 1 : 0
                    }}
                    transition={{ 
                      duration: currentIndex === index ? 4.5 : 0.3,
                      ease: 'linear'
                    }}
                    className="h-full bg-[#C58B30] origin-left"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots - side - RESPEITANDO PADDINGS */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-30">
        {venues.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            animate={{
              scale: currentIndex === index ? 1.5 : 1,
              opacity: currentIndex === index ? 1 : 0.3
            }}
            className="w-2 h-2 rounded-full bg-white cursor-pointer transition-all"
            whileHover={{ scale: 1.8 }}
          />
        ))}
      </div>

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
}