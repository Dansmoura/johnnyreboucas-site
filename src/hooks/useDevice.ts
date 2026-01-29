import { useState, useEffect } from 'react';
import { MOBILE_DESIGN_SYSTEM } from '../mobile-design-system';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  hasNotch: boolean;
  supportsHover: boolean;
}

/**
 * Hook para detectar tipo de dispositivo e características
 * Atualiza em tempo real quando a tela é redimensionada
 */
export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1024,
        height: 768,
        orientation: 'landscape',
        hasNotch: false,
        supportsHover: true,
      };
    }

    return getDeviceInfo();
  });

  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo());
    };

    const handleOrientationChange = () => {
      // Wait for orientation change to complete
      setTimeout(() => {
        setDeviceInfo(getDeviceInfo());
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return deviceInfo;
}

function getDeviceInfo(): DeviceInfo {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  const isMobile = width < MOBILE_DESIGN_SYSTEM.breakpoints.md;
  const isTablet = width >= MOBILE_DESIGN_SYSTEM.breakpoints.md && 
                   width < MOBILE_DESIGN_SYSTEM.breakpoints.lg;
  const isDesktop = width >= MOBILE_DESIGN_SYSTEM.breakpoints.lg;
  
  const orientation: 'portrait' | 'landscape' = height > width ? 'portrait' : 'landscape';
  
  // Detect iOS notch (safe area insets)
  const hasNotch = (() => {
    if (typeof window === 'undefined') return false;
    
    // Check if safe area insets are available
    const style = getComputedStyle(document.documentElement);
    const top = style.getPropertyValue('--sat') || 
                style.getPropertyValue('env(safe-area-inset-top)') || '0px';
    
    return parseInt(top) > 0;
  })();
  
  // Detect hover support (true pointer device like mouse)
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  return {
    isMobile,
    isTablet,
    isDesktop,
    width,
    height,
    orientation,
    hasNotch,
    supportsHover,
  };
}

/**
 * Hook para detectar se está em modo mobile
 * Versão simplificada do useDevice
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_DESIGN_SYSTEM.breakpoints.md;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_DESIGN_SYSTEM.breakpoints.md);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
