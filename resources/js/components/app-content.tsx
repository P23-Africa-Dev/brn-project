// resources/js/components/ui/sidebar/AppContent.tsx
import React from 'react';
import { useSidebar } from './sidebar-context';

interface AppContentProps extends React.ComponentProps<'main'> {
  variant?: 'header' | 'sidebar';
}

export const AppContent: React.FC<AppContentProps> = ({ children, className = '', ...props }) => {
  const { open } = useSidebar();

  // when sidebar collapsed we might want different padding
  return (
    <main
      {...props}
      className={`relative z-0  flex h-full w-full  flex-1 flex-col gap-4 rounded-xl transition-all  ${className}`}
    >
      {children}
    </main>
  );
};
