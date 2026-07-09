'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Pill, Clock, Heart, Users, ShieldCheck, Settings } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { role } = useApp();
  const isPublic = ['/','/login','/register','/forgot-password','/reset-password','/otp','/about','/contact','/terms'].includes(pathname);
  if (isPublic) return null;

  const items = role === 'patient'
    ? [{ name:'Home', href:'/dashboard', icon:LayoutDashboard }, { name:'Meds', href:'/medications', icon:Pill }, { name:'Reminders', href:'/reminders', icon:Clock }, { name:'Health', href:'/health', icon:Heart }, { name:'Settings', href:'/settings', icon:Settings }]
    : role === 'caregiver'
    ? [{ name:'Overview', href:'/caregiver', icon:Users }, { name:'Health', href:'/health', icon:Heart }, { name:'Reports', href:'/reports', icon:Clock }, { name:'Settings', href:'/settings', icon:Settings }]
    : [{ name:'Admin', href:'/admin', icon:ShieldCheck }, { name:'Medicines', href:'/medications', icon:Pill }, { name:'Analytics', href:'/reports', icon:Clock }, { name:'Settings', href:'/settings', icon:Settings }];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/90 backdrop-blur-md md:hidden no-print">
      <div className="flex h-16 items-center justify-around px-2">
        {items.map(item => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl ${active ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}`}>
              <Icon className={`h-5 w-5 ${active ? 'scale-110 text-primary' : 'text-muted-foreground'}`} />
              <span className="text-[9px] mt-1 tracking-tight truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
export default BottomNav;
