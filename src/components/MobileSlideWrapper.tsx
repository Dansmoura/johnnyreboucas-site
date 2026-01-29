import { ReactNode } from 'react';
import { useIsMobile } from '../hooks/useDevice';

interface MobileSlideWrapperProps {
  children: ReactNode;
  className?: string;
  allowScroll?: boolean;
  paddingTop?: string;
  paddingBottom?: string;
}

/**
 * Wrapper para slides com padding e scroll mobile adequados
 * Garante espaçamento consistente e evita sobreposição
 */
export default function MobileSlideWrapper({
  children,
  className = '',
  allowScroll = true,
  paddingTop = '80px',
  paddingBottom = '140px',
}: MobileSlideWrapperProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div
      className={`w-full h-full ${allowScroll ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'} ${className}`}
      style={{
        paddingTop,
        paddingBottom,
        WebkitOverflowScrolling: 'touch', // Smooth scrolling no iOS
      }}
    >
      {children}
    </div>
  );
}
