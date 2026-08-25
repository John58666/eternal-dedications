import type { ReactNode } from 'react';

interface CTAButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'giant';
  size?: 'md' | 'sm';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export const CTAButton = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  disabled = false,
}: CTAButtonProps) => {
  const baseStyles =
    'bg-esmeralda-noche hover:bg-esmeralda-abismo text-white font-bold rounded-2xl shadow-lg transition-all hover:-translate-y-1 inline-block text-center';
  const variantStyles = variant === 'giant' ? 'text-xl py-6 px-12' : '';
  /* sm mantiene el objetivo táctil mínimo de 44px (component-forge) */
  const sizeStyles =
    variant === 'giant'
      ? ''
      : size === 'sm'
        ? 'text-sm py-2.5 px-6 rounded-xl min-h-[44px]'
        : 'py-4 px-8';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:-translate-y-0' : '';

  const className = `${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} animate-pulse-glow`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};
