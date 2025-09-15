
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SidebarContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export const SidebarProvider: React.FC<{ defaultOpen?: boolean; children: React.ReactNode }> = ({
  defaultOpen = true,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  useEffect(() => {
    // restore preference from localStorage (optional)
    try {
      const saved = localStorage.getItem('app.sidebar.open');
      if (saved !== null) setOpen(saved === '1');
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('app.sidebar.open', open ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [open]);

  const toggle = () => setOpen((s) => !s);

  return <SidebarContext.Provider value={{ open, setOpen, toggle }}>{children}</SidebarContext.Provider>;
};

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}
