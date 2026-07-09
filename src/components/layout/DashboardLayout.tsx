'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { useApp } from '../../context/AppContext';
import { ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { sosTriggered, resetSOS } = useApp();
  const isPublic = ['/','/login','/register','/forgot-password','/reset-password','/otp','/about','/contact','/terms'].includes(pathname);

  if (isPublic) {
    return (<div className="min-h-screen bg-background text-foreground transition-colors duration-300"><Navbar /><main>{children}</main></div>);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      <AnimatePresence>
        {sosTriggered && (
          <motion.div initial={{opacity:0,y:-50}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-50}} className="bg-red-500 text-white py-3 px-4 flex items-center justify-between z-50 text-xs sm:text-sm font-semibold sticky top-0 shadow-md">
            <div className="flex items-center gap-2"><ShieldAlert className="h-5 w-5 animate-pulse" /><span>EMERGENCY SOS ACTIVE: Caregiver notified.</span></div>
            <button onClick={resetSOS} className="bg-white/20 hover:bg-white/30 text-white rounded-full px-3 py-1 text-xs border border-white/30 font-bold">Cancel Alert</button>
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 px-4 py-6 md:px-8 pb-24 md:pb-8 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
export default DashboardLayout;
