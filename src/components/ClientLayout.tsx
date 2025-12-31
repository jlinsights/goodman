'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import QuickToolsBar from './QuickToolsBar';
import Navigation from './Navigation';
import Footer from './Footer';
import FloatingConnect from './FloatingConnect';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <QuickToolsBar />
      <Navigation />
      {children}
      <Footer />
      <FloatingConnect />
    </LanguageProvider>
  );
}
