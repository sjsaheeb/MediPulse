'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/ui/Toast';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast('Enter your recovery email', 'error'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast('Code sent to ' + email, 'success'); router.push('/otp?flow=reset'); }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background hero-gradient">
      <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl glassmorphism">
        <Link href="/login" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium mb-6"><ArrowLeft className="h-4 w-4" /><span>Back to Sign In</span></Link>
        <div className="space-y-2 mb-6"><h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Reset Password</h2><p className="text-xs text-muted-foreground">Enter your email for a 4-digit verification code.</p></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1"><label className="text-xs font-semibold text-foreground" htmlFor="email">Email</label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input id="email" type="email" placeholder="john.doe@healthmail.com" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-2xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" /></div></div>
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-white shadow-md disabled:opacity-50">{loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <><span>Send Code</span><ArrowRight className="h-4 w-4" /></>}</button>
        </form>
      </motion.div>
    </div>
  );
}
