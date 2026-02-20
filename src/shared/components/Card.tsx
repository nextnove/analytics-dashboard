import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  theme?: 'dark' | 'light';
}

export const Card = ({ children, className = '', theme = 'dark' }: CardProps) => {
  return (
    <div className={`border rounded-xl p-6 ${
      theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
    } ${className}`}>
      {children}
    </div>
  );
};
