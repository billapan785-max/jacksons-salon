import React from 'react';
import { motion } from 'motion/react';

interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: any;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  [key: string]: any;
}

export const GlassButton = ({ children, className = "", onClick, as: Component = "button", ...props }: GlassButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <Component
      {...props}
      onClick={handleClick}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </Component>
  );
};
