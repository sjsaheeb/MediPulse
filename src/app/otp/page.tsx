'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '../../components/ui/Toast';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { addSystemLog } = useApp();
  const isResetFlow = searchParams.get('flow') === 'reset';

  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 4) {
      toast('Please enter all 4 digits', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code === '1234') {
        addSystemLog('OTP Verified successfully', 'auth');
        toast('OTP Verified successfully!', 'success');
        if (isResetFlow) {
          router.push('/reset-password');
        } else {
          router.push('/dashboard');
        }
      } else {
        toast('Invalid code. Use mock code: 1234', 'error');
      }
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background hero-gradient">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl glassmorphism">
        <Link href="/login" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sign In</span>
        </Link>
        <div className="text-center space-y-2 mb-6">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2">
            <KeyRound className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Security Verification</h2>
          <p className="text-xs text-muted-foreground">Enter the 4-digit code sent to your email. (Hint: Use 1234)</p>
        </div>
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-4">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputsRef.current[i] = el; }}
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-14 w-14 rounded-2xl border-2 border-border bg-background text-center text-xl font-bold outline-none focus:border-primary text-foreground transition-all"
              />
            ))}
          </div>
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-white shadow-md disabled:opacity-50">
            {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <span>Verify Code</span>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function OTPPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background hero-gradient">
        <div className="animate-pulse space-y-4 w-full max-w-md p-6 bg-card rounded-3xl border border-border">
          <div className="h-12 w-12 bg-muted rounded-2xl mx-auto" />
          <div className="h-6 bg-muted rounded-xl w-1/2 mx-auto" />
          <div className="h-4 bg-muted rounded-xl w-3/4 mx-auto" />
        </div>
      </div>
    }>
      <OTPForm />
    </Suspense>
  );
}
