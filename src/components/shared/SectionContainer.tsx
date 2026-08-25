import type { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const SectionContainer = ({
  children,
  className = '',
  id,
}: SectionContainerProps) => {
  return (
    <div
      id={id}
      className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 ${className}`}
    >
      {children}
    </div>
  );
};
