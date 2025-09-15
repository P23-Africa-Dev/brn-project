// import { SidebarProvider } from '@/components/ui/sidebar';
// import { SharedData } from '@/types';
// import { usePage } from '@inertiajs/react';

// interface AppShellProps {
//     children: React.ReactNode;
//     variant?: 'header' | 'sidebar';
// }

// export function AppShell({ children, variant = 'header' }: AppShellProps) {
//     const isOpen = usePage<SharedData>().props.sidebarOpen;

//     if (variant === 'header') {
//         return <div className="hidden min-h-screen w-full flex-col">{children}</div>;
//     }

//     return (
//             <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>
    
//     );
// }


import React from 'react';
import { SidebarProvider } from './sidebar-context';


interface AppShellProps {
  children: React.ReactNode;
  defaultSidebarOpen?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({ children, defaultSidebarOpen = true }) => {
  return <SidebarProvider defaultOpen={defaultSidebarOpen}>{children}</SidebarProvider>;
};