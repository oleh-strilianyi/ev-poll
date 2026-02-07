import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'overlay';
}

export const Badge = ({ children, className = '', variant = 'default' }: BadgeProps) => {
  // Базові стилі для всіх бейджів
  const baseStyles = "inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide pointer-events-none";
  
  // Варіанти стилізації
  const variantStyles = variant === 'overlay'
    ? "bg-black/60 text-white backdrop-blur-[2px] border border-white/10" // Для накладання на фото
    : "bg-gray-100 text-gray-600 border border-gray-200"; // Звичайний (сірий)

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </div>
  );
};