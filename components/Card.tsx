import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-card-bg border border-border rounded-xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
}