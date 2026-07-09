'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { Bell, Sun, Moon, User, ShieldAlert, LogOut, ChevronDown, Menu, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC<{ onMenuToggle?: () => void }> = ({ onMenuToggle }) => {
  const { theme, toggleTheme, role, switchRole, notifications, markNotificationRead, clearNotifications, user } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isPublicPage = ['/','/login','/register','/forgot-password','/reset-password','/otp','/about','/contact','/terms'].includes(pathname);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRoleSwitch = (r: 'patient'|'caregiver'|'admin') => {
    switchRole(r); setRoleOpen(false);
    if (r === 'patient') router.push('/dashboard');
    else if (r === 'caregiver') router.push('/caregiver');
    else router.push('/admin');
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {!isPublicPage && <button onClick={onMenuToggle} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted md:hidden" aria-label="Toggle menu"><Menu className="h-6 w-6" /></button>}
          <Link href="/" className="flex items-center gap-2">
            <img src="/app-logo.jpg" alt="MediPulse logo" className="h-10 w-10 rounded-xl bg-white object-contain p-1 shadow-md shadow-primary/20" />
            <span className="hidden font-sans text-xl font-bold tracking-tight text-foreground sm:block">Medi<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Pulse</span></span>
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {isPublicPage && (
            <div className="hidden items-center gap-6 md:flex">
              <Link href="/about" className={`text-sm font-medium transition-colors hover:text-primary ${pathname==='/about'?'text-primary':'text-muted-foreground'}`}>About</Link>
              <Link href="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${pathname==='/contact'?'text-primary':'text-muted-foreground'}`}>Contact</Link>
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary">Login</Link>
              <Link href="/register" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:scale-[1.02] active:scale-[0.98]">Get Started</Link>
            </div>
          )}
          {!isPublicPage && (
            <div className="relative">
              <button onClick={() => setRoleOpen(!roleOpen)} className="flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 text-xs font-semibold capitalize text-foreground hover:bg-muted">
                Role: <span className="text-primary font-bold">{role}</span><ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>{roleOpen && (<><div className="fixed inset-0 z-10" onClick={() => setRoleOpen(false)} />
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} className="absolute right-0 mt-2 w-48 rounded-2xl border border-border bg-card p-1 shadow-lg z-20">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Switch Environment</div>
                  {(['patient','caregiver','admin'] as const).map(r => (
                    <button key={r} onClick={() => handleRoleSwitch(r)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium hover:bg-muted ${role===r?'text-primary bg-primary/5':'text-foreground'}`}>
                      <span className="capitalize">{r} view</span>{role===r && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                </motion.div></>)}</AnimatePresence>
            </div>
          )}
          <button onClick={toggleTheme} className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Toggle theme">
            {theme==='light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-500" />}
          </button>
          {!isPublicPage && (
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative rounded-full p-2 text-muted-foreground hover:bg-muted" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" /></span>}
              </button>
              <AnimatePresence>{notifOpen && (<><div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-card p-2 shadow-xl z-20">
                  <div className="flex items-center justify-between border-b border-border px-3 py-2 pb-3">
                    <span className="font-semibold text-foreground text-sm">Notifications ({unreadCount})</span>
                    {notifications.length > 0 && <button onClick={clearNotifications} className="text-xs text-primary font-medium hover:underline">Clear all</button>}
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {notifications.length===0 ? <div className="py-6 text-center text-xs text-muted-foreground">No notifications</div> :
                      notifications.map(n => (
                        <div key={n.id} onClick={() => markNotificationRead(n.id)} className={`flex gap-3 rounded-xl p-2.5 cursor-pointer hover:bg-muted/50 ${!n.read?'bg-primary/[0.02]':''}`}>
                          <div className="mt-1.5 flex-shrink-0">{n.type==='emergency' ? <ShieldAlert className="h-4 w-4 text-red-500" /> : <div className={`h-2 w-2 rounded-full ${!n.read?'bg-primary':'bg-muted-foreground/30'}`} />}</div>
                          <div className="flex-1"><p className="text-xs font-semibold text-foreground">{n.title}</p><p className="text-[11px] text-muted-foreground mt-0.5">{n.description}</p><span className="text-[10px] text-muted-foreground/60 mt-1 block">{n.time}</span></div>
                        </div>
                      ))}
                  </div>
                </motion.div></>)}</AnimatePresence>
            </div>
          )}
          {!isPublicPage ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="focus:outline-none"><img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary/50" /></button>
              <AnimatePresence>{profileOpen && (<><div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-1 shadow-lg z-20">
                  <div className="px-4 py-2.5 border-b border-border"><p className="text-xs font-bold text-foreground truncate">{user.name}</p><p className="text-[10px] text-muted-foreground truncate">{user.email}</p></div>
                  <div className="p-1">
                    <Link href="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground hover:bg-muted"><User className="h-4 w-4 text-muted-foreground" /><span>My Profile</span></Link>
                    <button onClick={() => { setProfileOpen(false); router.push('/login'); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-500/5"><LogOut className="h-4 w-4" /><span>Sign Out</span></button>
                  </div>
                </motion.div></>)}</AnimatePresence>
            </div>
          ) : isPublicPage && pathname !== '/login' && pathname !== '/register' && (
            <Link href="/login" className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-sm md:hidden">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
