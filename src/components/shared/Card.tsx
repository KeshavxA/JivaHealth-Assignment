import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  hover?: boolean;
  noPad?: boolean;
}

export function Card({ children, className, id, hover = false, noPad = false }: CardProps) {
  return (
    <div
      id={id}
      className={clsx(
        'bg-white rounded-2xl border border-gray-200 shadow-sm',
        !noPad && 'p-5',
        hover && 'hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
