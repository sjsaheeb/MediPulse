'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import { Mail, Lock, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const { switchRole, addSystemLog } = useApp();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast('Please enter both fields', 'error'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); addSystemLog('User login: ' + email, 'auth'); toast('Welcome back!', 'success'); router.push('/dashboard'); }, 1500);
  };

  const quickLogin = (r: 'patient'|'caregiver'|'admin') => {
    switchRole(r); addSystemLog(`Quick login as ${r}`, 'auth');
    toast(`Logged in as ${r}`, 'success');
    router.push(r === 'patient' ? '/dashboard' : r === 'caregiver' ? '/caregiver' : '/admin');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background hero-gradient">
      <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl glassmorphism">
        <div className="text-center space-y-2 mb-8"><h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Sign In</h2><p className="text-xs text-muted-foreground">Access your health schedules</p></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1"><label className="text-xs font-semibold text-foreground" htmlFor="email">Email</label>
            <div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input id="email" type="email" placeholder="john.doe@healthmail.com" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-2xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" /></div>
          </div>
          <div className="space-y-1"><div className="flex justify-between items-center"><label className="text-xs font-semibold text-foreground" htmlFor="password">Password</label><Link href="/forgot-password" className="text-[11px] text-primary hover:underline font-medium">Forgot?</Link></div>
            <div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input id="password" type={showPw?'text':'password'} placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-2xl border border-border bg-background/50 pl-10 pr-10 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" /><button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-3 text-muted-foreground">{showPw?<EyeOff className="h-4 w-4"/>:<Eye className="h-4 w-4"/>}</button></div>
          </div>
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-white shadow-md disabled:opacity-50">
            {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <><span>Sign In</span><ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-muted-foreground">No account? <Link href="/register" className="text-primary font-semibold hover:underline">Register</Link></div>
        <div className="mt-8 pt-6 border-t border-border space-y-3">
          <div className="flex items-center gap-1.5 justify-center text-[10px] font-bold uppercase tracking-wider text-primary"><ShieldAlert className="h-3.5 w-3.5" /><span>Quick Access</span></div>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={()=>quickLogin('patient')} className="rounded-xl border border-border bg-muted/40 py-2 text-[10px] font-bold text-foreground hover:bg-primary hover:text-white transition-colors">Patient</button>
            <button onClick={()=>quickLogin('caregiver')} className="rounded-xl border border-border bg-muted/40 py-2 text-[10px] font-bold text-foreground hover:bg-teal-500 hover:text-white transition-colors">Caregiver</button>
            <button onClick={()=>quickLogin('admin')} className="rounded-xl border border-border bg-muted/40 py-2 text-[10px] font-bold text-foreground hover:bg-slate-800 hover:text-white transition-colors">Admin</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
