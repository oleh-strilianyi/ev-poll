import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'overlay';
}

export const Badge = ({ children, className = '', variant = 'default' }: BadgeProps) => {
  const baseStyles = "inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[12px] font-bold tracking-wide pointer-events-none";
  
  const variantStyles = variant === 'overlay'
    ? "bg-black/60 text-white backdrop-blur-[2px] border border-white/10" 
    : "bg-gray-100 text-gray-600 border border-gray-200"; 

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </div>
  );
};