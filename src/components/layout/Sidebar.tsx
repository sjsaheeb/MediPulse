'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Pill, Clock, Heart, Users, FileText, Settings, User, ShieldCheck, Activity, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { role, user } = useApp();

  const getNavLinks = () => {
    const common = [{ name:'Profile', href:'/profile', icon:User }, { name:'Settings', href:'/settings', icon:Settings }];
    if (role === 'patient') return [
      { name:'Dashboard', href:'/dashboard', icon:LayoutDashboard },
      { name:'Medications', href:'/medications', icon:Pill },
      { name:'Reminders & Alarms', href:'/reminders', icon:Clock },
      { name:'Health Vitals', href:'/health', icon:Heart },
      { name:'Reports & Export', href:'/reports', icon:FileText },
      ...common,
    ];
    if (role === 'caregiver') return [
      { name:'Caregiver Panel', href:'/caregiver', icon:Users },
      { name:'Patient Vitals', href:'/health', icon:Heart },
      { name:'Adherence Reports', href:'/reports', icon:FileText },
      ...common,
    ];
    return [
      { name:'Admin Dashboard', href:'/admin', icon:ShieldCheck },
      { name:'Medicines List', href:'/medications', icon:Pill },
      { name:'Compliance Stats', href:'/reports', icon:FileText },
      ...common,
    ];
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden" onClick={onClose} />}
      <aside className={`fixed bottom-0 top-16 z-30 w-64 border-r border-border bg-card p-4 transition-transform md:sticky md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:block'}`}>
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-muted/40 p-3">
          <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20" />
          <div className="min-w-0 flex-1"><p className="text-xs font-bold text-foreground truncate">{user.name}</p><p className="text-[10px] text-primary font-bold uppercase tracking-wider">{role} Mode</p></div>
        </div>
        <nav className="space-y-1">
          {getNavLinks().map(link => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.href} onClick={onClose}
                className={`relative flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all group ${isActive ? 'text-primary bg-primary/5 font-semibold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <div className="flex items-center gap-3"><Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} /><span>{link.name}</span></div>
                {isActive && <motion.div layoutId="activeIndicator" className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-primary" transition={{ type:'spring', stiffness:380, damping:30 }} />}
                <ChevronRight className="h-4 w-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100" />
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <div className="rounded-xl bg-gradient-to-tr from-primary/5 to-secondary/5 p-3 border border-primary/10">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary"><Activity className="h-4 w-4" /><span>Smart Health Care</span></div>
            <p className="text-[9px] text-muted-foreground/70 mt-1">Version 1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
