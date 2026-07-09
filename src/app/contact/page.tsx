'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !msg) {
      toast('Please fill in all fields', 'error');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast('Message sent successfully!', 'success');
      setEmail('');
      setMsg('');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 hero-gradient">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-5 space-y-6">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">Get in touch</h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Have questions regarding the smart medicine reminder platform or integration APIs? Contact our university project development team.
            </p>
            <div className="space-y-4 pt-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>support@medipulse-system.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 019-2834</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Software Engineering Dept, Tech University campus</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl glassmorphism">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-primary text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="How can we help you?"
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-primary text-foreground resize-none"
                />
              </div>
              <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-white shadow-md disabled:opacity-50 transition-transform active:scale-95">
                {submitting ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <><span>Send Message</span><Send className="h-4 w-4" /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
