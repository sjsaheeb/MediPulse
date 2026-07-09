'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Info, Award, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 hero-gradient">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl glassmorphism space-y-8">
          <div className="flex items-center gap-3 border-b border-border pb-6">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground tracking-tight sm:text-3xl">About MediPulse</h1>
              <p className="text-xs text-muted-foreground">Final Year Software Engineering Project</p>
            </div>
          </div>
          
          <div className="space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              MediPulse is a mobile-first premium medical reminder and vitals monitoring platform designed to tackle the global challenge of medication non-adherence. By bridging patients, caregivers, and medical practitioners through a unified offline-capable web application, the project delivers critical support to individuals managing chronic conditions like Hypertension and Type-2 Diabetes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl border border-border bg-muted/30 space-y-2">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <Award className="h-4 w-4 text-primary" />
                  <span>Key Adherence Drivers</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Utilizes responsive compliance rings, persistent web alarms, smart inventory warnings, and automated caregiver SMS indicators.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-border bg-muted/30 space-y-2">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <Code className="h-4 w-4 text-primary" />
                  <span>Next.js Architecture</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Built using the Next.js App Router, Tailwind CSS, Framer Motion, and client-side memory contexts.
                </p>
              </div>
            </div>

            <p className="pt-4">
              The project demonstrates full responsiveness, mimicking a native mobile package with seamless light/dark configurations, glassmorphic layout frameworks, and interactive SVG indicators.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
