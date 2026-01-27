import { motion } from 'motion/react';

interface JohnnyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  animate?: boolean;
  delay?: number;
}

const sizeValues = {
  sm: { width: 320, height: 120 },      // Small - para headers/footers
  md: { width: 480, height: 180 },      // Medium - uso geral
  lg: { width: 640, height: 240 },      // Large - destaque
  xl: { width: 800, height: 300 },      // Extra Large - opening
  hero: { width: 1000, height: 375 }    // Hero - slide principal
};

export default function JohnnyLogo({ 
  size = 'md', 
  className = '',
  animate = true,
  delay = 0
}: JohnnyLogoProps) {
  
  const dimensions = sizeValues[size];

  const logoElement = (
    <svg 
      width={dimensions.width} 
      height={dimensions.height} 
      viewBox="0 0 1000 375" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        maxWidth: '90vw', // Apenas limita no mobile para não ultrapassar
        height: 'auto'
      }}
    >
      {/* JOHNNY - Main text in white */}
      <text
        x="500"
        y="180"
        textAnchor="middle"
        fill="white"
        style={{
          fontFamily: 'Satoshi, sans-serif',
          fontWeight: 700,
          fontSize: '160px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase'
        }}
      >
        JOHNNY
      </text>

      {/* Divider line */}
      <line
        x1="300"
        y1="230"
        x2="700"
        y2="230"
        stroke="#C58B30"
        strokeWidth="2"
        opacity="0.6"
      />

      {/* BRAZILIAN · LIVE · SESSIONS - Subtitle in gold */}
      <text
        x="500"
        y="290"
        textAnchor="middle"
        fill="#C58B30"
        style={{
          fontFamily: 'Satoshi, sans-serif',
          fontWeight: 400,
          fontSize: '32px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase'
        }}
      >
        BRAZILIAN · LIVE · SESSIONS
      </text>
    </svg>
  );

  if (!animate) {
    return logoElement;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1.2, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {logoElement}
    </motion.div>
  );
}