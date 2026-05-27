import type { ReactNode } from 'react';


export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}
