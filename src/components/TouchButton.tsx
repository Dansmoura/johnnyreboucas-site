import { ReactNode, CSSProperties } from 'react';
import { MOBILE_DESIGN_SYSTEM } from '../mobile-design-system';

interface TouchButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'comfortable' | 'spacious';
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Touch-optimized Button Component
 * Guarantees minimum 44x44px touch target (WCAG 2.1 AAA)
 * Includes haptic feedback on mobile
 */
export default function TouchButton({
  children,
  onClick,
  variant = 'ghost',
  size = 'comfortable',
  disabled = false,
  ariaLabel,
  className = '',
  style = {},
}: TouchButtonProps) {
  
  const handleClick = () => {
    // Haptic feedback on supported devices
    if ('vibrate' in navigator && !disabled) {
      navigator.vibrate(10);
    }
    onClick?.();
  };

  const variantStyles = {
    primary: {
      background: 'rgba(197, 139, 48, 0.2)',
      border: '1px solid rgba(197, 139, 48, 0.4)',
      color: '#C58B30',
    },
    secondary: {
      background: 'rgba(197, 139, 48, 0.1)',
      border: '1px solid rgba(197, 139, 48, 0.3)',
      color: '#C58B30',
    },
    ghost: {
      background: 'transparent',
      border: 'none',
      color: '#C58B30',
    },
  };

  const sizeValue = MOBILE_DESIGN_SYSTEM.touchTarget[size];

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        flex items-center justify-center rounded-full 
        transition-all duration-200
        active:scale-95
        disabled:opacity-30 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        minWidth: sizeValue,
        minHeight: sizeValue,
        ...variantStyles[variant],
        touchAction: 'manipulation', // Disable double-tap zoom
        WebkitTapHighlightColor: 'transparent', // Remove iOS tap highlight
        ...style,
      }}
    >
      {children}
    </button>
  );
}
