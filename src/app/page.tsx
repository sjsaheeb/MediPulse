'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pill, Heart, Users, MessageSquare, ArrowRight, CheckCircle, BellRing, LayoutDashboard } from 'lucide-react';

export default function LandingPage() {
  const [demoTaken, setDemoTaken] = useState(false);

  return (
    <div className="relative min-h-screen bg-background hero-gradient overflow-hidden">
      <div className="absolute top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-20 right-1/4 h-[350px] w-[350px] rounded-full bg-secondary/5 blur-3xl -z-10" />

      <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <BellRing className="h-3.5 w-3.5" /><span>Next-Gen Healthcare Project</span>
            </motion.div>
            <motion.h1 initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Smart Medicine Reminder &<br className="hidden sm:inline" /><span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Health Monitoring</span>
            </motion.h1>
            <motion.p initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg lg:mx-0">
              Never miss a dose. Monitor blood pressure, sugar, and vitals. Sync live alerts with caregivers and doctors. An all-in-one health ecosystem.
            </motion.p>
            <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/register" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] sm:w-auto">
                <span>Launch App Free</span><ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/about" className="flex w-full items-center justify-center rounded-full bg-muted/80 px-8 py-3.5 text-base font-semibold text-foreground border border-border hover:bg-muted sm:w-auto">Learn More</Link>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /><span>HIPAA Compliant</span></div>
              <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /><span>Offline local fallback</span></div>
            </motion.div>
          </div>

          {/* Phone Simulator */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.5,delay:0.2}}
              className="relative w-80 rounded-[40px] border-[8px] border-slate-900 bg-card p-4 shadow-2xl overflow-hidden aspect-[9/18] ring-1 ring-black/5">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-28 rounded-full bg-slate-900 z-10" />
              <div className="mt-4 flex items-center justify-between border-b border-border pb-3">
                <div><p className="text-[10px] text-muted-foreground">Good Morning</p><p className="text-xs font-bold text-foreground">Saheeb</p></div>
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">S</div>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-3 border border-primary/15 text-center">
                  <p className="text-[10px] text-muted-foreground">Medication Compliance</p>
                  <h3 className="text-xl font-bold text-primary mt-0.5">{demoTaken ? '100%' : '80%'}</h3>
                  <div className="h-1.5 w-full bg-muted rounded-full mt-2 overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500" style={{width: demoTaken ? '100%' : '80%'}} /></div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Today&apos;s Dose</span>
                  <div className={`rounded-xl border p-3 flex items-center justify-between transition-colors ${demoTaken ? 'border-green-500/30 bg-green-500/5' : 'border-border bg-card'}`}>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Pill className="h-4 w-4" /></div>
                      <div><h4 className="text-xs font-bold text-foreground">Metformin</h4><p className="text-[10px] text-muted-foreground">500mg • After meals</p></div>
                    </div>
                    <button onClick={() => setDemoTaken(!demoTaken)} className={`h-5 px-2.5 rounded-full text-[9px] font-bold transition-all ${demoTaken ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground hover:bg-primary hover:text-white'}`}>{demoTaken ? 'Taken ✓' : 'Mark Taken'}</button>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-3 space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Recent Vitals</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted/40 p-2 rounded-lg text-center"><p className="text-[8px] text-muted-foreground">Blood Pressure</p><p className="text-xs font-bold text-green-500 mt-0.5">118/77</p></div>
                    <div className="bg-muted/40 p-2 rounded-lg text-center"><p className="text-[8px] text-muted-foreground">Heart Rate</p><p className="text-xs font-bold text-primary mt-0.5">72 bpm</p></div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-around border-t border-border pt-2 text-muted-foreground">
                <LayoutDashboard className="h-4 w-4 text-primary" /><Pill className="h-4 w-4" /><Heart className="h-4 w-4" /><Users className="h-4 w-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-card/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3"><h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Complete Health Companion</h2><p className="mx-auto max-w-2xl text-sm text-muted-foreground">Everything for daily compliance, medical progress, and caregiver integration.</p></div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Pill, title: 'Medication Scheduler', desc: 'Add complex medication cycles, dosage instructions, refill inventory, and auto-reminders.', color: 'text-primary', bg: 'bg-primary/10' },
              { icon: Heart, title: 'Vitals Tracking', desc: 'Log blood pressure, glucose, sleep, and symptoms. Visualize with responsive charts.', color: 'text-teal-500', bg: 'bg-teal-500/10' },
              { icon: Users, title: 'Caregiver Support', desc: 'Link with relatives or providers. Caregivers get live alerts on missed doses or critical vitals.', color: 'text-green-500', bg: 'bg-green-500/10' },
              { icon: MessageSquare, title: 'AI Health Assistant', desc: 'Chat with an AI about your logged metrics. Receive healthy guidelines and advice.', color: 'text-primary', bg: 'bg-primary/10' },
            ].map(f => (
              <div key={f.title} className="rounded-3xl border border-border bg-card p-6 space-y-4 hover:border-primary/30 transition-all group">
                <div className={`h-12 w-12 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center group-hover:scale-105 transition-transform`}><f.icon className="h-6 w-6" /></div>
                <h3 className="text-lg font-bold text-foreground">{f.title}</h3><p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6"><h2 className="text-2xl font-bold text-center text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5"><h3 className="text-sm font-bold text-foreground">How does the Caregiver Alarm work?</h3><p className="text-xs text-muted-foreground mt-2 leading-relaxed">If a patient misses a dose within 2 hours, the system alerts the linked Caregiver for follow-up.</p></div>
            <div className="rounded-2xl border border-border bg-card p-5"><h3 className="text-sm font-bold text-foreground">Is my medical data secure?</h3><p className="text-xs text-muted-foreground mt-2 leading-relaxed">Absolutely. MediPulse encrypts all data. Health information is only accessible to you and your caregiver.</p></div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2">
          <p>© 2026 MediPulse Inc. All rights reserved. Final Year Software Engineering Project.</p>
          <div className="flex justify-center gap-4"><Link href="/terms" className="hover:underline">Terms & Conditions</Link><Link href="/terms" className="hover:underline">Privacy Policy</Link></div>
        </div>
      </footer>
    </div>
  );
}
