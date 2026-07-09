'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/ui/Toast';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast('Please fill all fields', 'error'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast('Registration success! Code sent to ' + email, 'success'); router.push('/otp'); }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background hero-gradient">
      <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl glassmorphism">
        <div className="text-center space-y-2 mb-6"><h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Create Account</h2><p className="text-xs text-muted-foreground">Register to organize medication schedules</p></div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1"><label className="text-xs font-semibold text-foreground" htmlFor="name">Full Name</label><div className="relative"><User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input id="name" type="text" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-2xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" /></div></div>
          <div className="space-y-1"><label className="text-xs font-semibold text-foreground" htmlFor="email">Email</label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input id="email" type="email" placeholder="john@healthmail.com" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-2xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" /></div></div>
          <div className="space-y-1"><label className="text-xs font-semibold text-foreground" htmlFor="password">Password</label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input id="password" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-2xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" /></div></div>
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-white shadow-md disabled:opacity-50">{loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <><span>Sign Up</span><ArrowRight className="h-4 w-4" /></>}</button>
        </form>
        <div className="mt-6 text-center text-xs text-muted-foreground">Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link></div>
      </motion.div>
    </div>
  );
}
