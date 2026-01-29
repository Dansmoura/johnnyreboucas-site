// Mobile-First Design System for Brazilian Live Sessions

export const MOBILE_DESIGN_SYSTEM = {
  // Touch Targets (WCAG 2.1 AAA)
  touchTarget: {
    min: '44px',        // iOS minimum
    comfortable: '48px', // Android Material Design
    spacious: '56px',    // Premium experience
  },

  // Spacing (Mobile-first)
  spacing: {
    touchSafe: '16px',      // Between touchable elements
    edgeMobile: '20px',     // Mobile edge padding
    edgeTablet: '32px',     // Tablet edge padding
    edgeDesktop: '48px',    // Desktop edge padding
    sectionMobile: '40px',  // Section spacing mobile
    sectionDesktop: '80px', // Section spacing desktop
  },

  // Typography (Fluid scales)
  typography: {
    displayHero: 'clamp(2.5rem, 5vw + 1rem, 5rem)',      // 40px → 80px
    displayLarge: 'clamp(2rem, 4vw + 0.5rem, 4rem)',     // 32px → 64px
    displayMedium: 'clamp(1.75rem, 3.5vw + 0.5rem, 3.5rem)', // 28px → 56px
    displaySmall: 'clamp(1.5rem, 3vw + 0.5rem, 3rem)',   // 24px → 48px
    headingLarge: 'clamp(1.375rem, 2.5vw + 0.5rem, 2.5rem)', // 22px → 40px
    headingMedium: 'clamp(1.25rem, 2vw + 0.5rem, 2rem)', // 20px → 32px
    headingSmall: 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)', // 18px → 24px
    bodyLarge: 'clamp(1.125rem, 1vw + 0.5rem, 1.375rem)', // 18px → 22px
    bodyMedium: 'clamp(1rem, 0.5vw + 0.5rem, 1.125rem)',  // 16px → 18px
    bodySmall: 'clamp(0.875rem, 0.25vw + 0.5rem, 1rem)',  // 14px → 16px
    caption: 'clamp(0.75rem, 0.25vw + 0.5rem, 0.875rem)', // 12px → 14px
  },

  // Line Heights (Responsive)
  lineHeight: {
    tight: {
      mobile: '1.2',
      desktop: '1.1',
    },
    normal: {
      mobile: '1.5',
      desktop: '1.4',
    },
    relaxed: {
      mobile: '1.7',
      desktop: '1.6',
    },
  },

  // Border Radius (Mobile-friendly)
  borderRadius: {
    small: '0.5rem',   // 8px
    medium: '0.75rem', // 12px
    large: '1rem',     // 16px
    xlarge: '1.5rem',  // 24px
    full: '9999px',
  },

  // Safe Areas (iOS notch support)
  safeArea: {
    top: 'env(safe-area-inset-top, 0px)',
    bottom: 'env(safe-area-inset-bottom, 0px)',
    left: 'env(safe-area-inset-left, 0px)',
    right: 'env(safe-area-inset-right, 0px)',
  },

  // Animation Durations (Reduced for mobile)
  animation: {
    fast: {
      mobile: '150ms',
      desktop: '200ms',
    },
    normal: {
      mobile: '200ms',
      desktop: '300ms',
    },
    slow: {
      mobile: '300ms',
      desktop: '500ms',
    },
  },

  // Breakpoints
  breakpoints: {
    xs: 320,   // Small phones
    sm: 640,   // Large phones (portrait)
    md: 768,   // Tablets (portrait)
    lg: 1024,  // Tablets (landscape) / Small laptops
    xl: 1280,  // Desktops
    '2xl': 1920, // Large screens
  },

  // Video optimization
  video: {
    mobile: {
      preload: 'none',
      poster: true,
      quality: '720p',
    },
    desktop: {
      preload: 'metadata',
      poster: true,
      quality: '1080p',
    },
  },
} as const;

// Helper: Get responsive value based on screen size
export const getResponsiveValue = <T,>(
  mobile: T,
  tablet?: T,
  desktop?: T
): T => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  
  if (width >= MOBILE_DESIGN_SYSTEM.breakpoints.lg && desktop) return desktop;
  if (width >= MOBILE_DESIGN_SYSTEM.breakpoints.md && tablet) return tablet;
  return mobile;
};

// Helper: Check if mobile
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_DESIGN_SYSTEM.breakpoints.md;
};

// Helper: Check if tablet
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= MOBILE_DESIGN_SYSTEM.breakpoints.md && 
         width < MOBILE_DESIGN_SYSTEM.breakpoints.lg;
};

// Helper: Get safe padding (with iOS notch support)
export const getSafePadding = (side: 'top' | 'bottom' | 'left' | 'right', fallback: string): string => {
  return `max(${fallback}, ${MOBILE_DESIGN_SYSTEM.safeArea[side]})`;
};
