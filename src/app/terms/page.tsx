'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 hero-gradient">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl glassmorphism space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-6">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground tracking-tight sm:text-3xl">Terms & Privacy Policy</h1>
              <p className="text-xs text-muted-foreground">Last updated: July 8, 2026</p>
            </div>
          </div>
          <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <h2 className="text-base font-bold text-foreground flex items-center gap-1.5 mt-4">
              <HeartHandshake className="h-5 w-5 text-primary" />
              <span>1. Disclaimer & Medical Consultation</span>
            </h2>
            <p>
              MediPulse is an educational final year prototype. The alerts, reminders, and health guidance suggestions are simulated metrics and calculations. It does NOT provide certified medical advice, diagnosis, or treatment. Always check medication logs and speak with a licensed clinician in real health emergencies.
            </p>
            <h2 className="text-base font-bold text-foreground mt-6">2. Data Privacy & Storage</h2>
            <p>
              All personal configuration profiles, medication histories, vital records, and system logs are stored strictly inside your browser local storage client-side. No sensitive data is transferred over remote unencrypted networks.
            </p>
            <h2 className="text-base font-bold text-foreground mt-6">3. Caregiver Coordination Consent</h2>
            <p>
              By setting up the Caregiver Dashboard mode, you grant permission for compliance statistics and critical vitals (systolic alerts) to be mirrored inside the Caregiver control view.
            </p>
            <h2 className="text-base font-bold text-foreground mt-6">4. Emergency Alarm Limits</h2>
            <p>
              The SOS button relies on internal application state indicators. It does not automatically route emergency phone calls to public local services (911 / 112).
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
