'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import {
  Flame, Pill, Droplet, Plus, MessageSquare, AlertTriangle, CheckCircle2,
  TrendingUp, Bell, Heart, Sparkles, ChevronRight, Activity, Moon
} from 'lucide-react';
import AIChatbot from '../../components/dashboard/AIChatbot';
import Link from 'next/link';

export default function Dashboard() {
  const {
    user,
    reminders,
    markReminderStatus,
    healthLogs,
    waterIntake,
    updateWaterIntake,
    triggerSOS
  } = useApp();
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);

  const todayReminders = reminders;
  const completedCount = todayReminders.filter(r => r.status === 'completed').length;
  const totalCount = todayReminders.length;
  const complianceRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100;

  const latestLog = healthLogs[0];

  const handleTakeReminder = (id: string, name: string) => {
    markReminderStatus(id, 'completed');
    toast(`Took ${name}! Well done.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-6 border border-primary/10">
        <div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Dashboard</span>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Hello {user.name}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Here is your health overview for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={triggerSOS}
            className="rounded-2xl bg-destructive hover:bg-destructive/90 text-white font-bold text-xs px-5 py-3 shadow-lg shadow-destructive/20 active:scale-95 transition-transform"
          >
            EMERGENCY SOS
          </button>
          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-card border border-border hover:bg-muted text-foreground text-xs font-semibold px-4 py-3 shadow-sm"
          >
            <MessageSquare className="h-4 w-4 text-primary" />
            <span>Chat AI</span>
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Adherence Rate */}
        <div className="rounded-3xl border border-border bg-card p-5 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Compliance Rate</span>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{completedCount}/{totalCount} taken</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0 h-16 w-16 flex items-center justify-center">
              <svg className="h-full w-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" className="stroke-muted" strokeWidth="6" fill="transparent" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  className="stroke-primary transition-all duration-500"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 28}
                  strokeDashoffset={2 * Math.PI * 28 * (1 - complianceRate / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-xs font-bold text-foreground">{complianceRate}%</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Med Adherence</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Keep pushing to hit 100% compliance!</p>
            </div>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="rounded-3xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
            <Flame className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Adherence Streak</span>
            <h3 className="text-xl font-black text-foreground mt-0.5">{user.streak} Days</h3>
            <p className="text-[11px] text-muted-foreground">Perfect daily log streak</p>
          </div>
        </div>

        {/* BP Status */}
        <div className="rounded-3xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center flex-shrink-0">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Blood Pressure</span>
            <h3 className="text-xl font-bold text-foreground mt-0.5">
              {latestLog ? `${latestLog.bloodPressure.systolic}/${latestLog.bloodPressure.diastolic}` : '--/--'}
            </h3>
            <p className="text-[11px] text-muted-foreground">mmHg • Latest reading</p>
          </div>
        </div>

        {/* Water Intake */}
        <div className="rounded-3xl border border-border bg-card p-5 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Hydration</span>
              <h3 className="text-xl font-bold text-foreground mt-0.5">{waterIntake} ml</h3>
            </div>
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Droplet className="h-5 w-5" />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => updateWaterIntake(250)}
              className="flex-1 bg-muted hover:bg-blue-500 hover:text-white rounded-xl py-1.5 text-[10px] font-bold transition-colors text-foreground"
            >
              +250ml
            </button>
            <button
              onClick={() => updateWaterIntake(500)}
              className="flex-1 bg-muted hover:bg-blue-500 hover:text-white rounded-xl py-1.5 text-[10px] font-bold transition-colors text-foreground"
            >
              +500ml
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reminders Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground flex items-center gap-1.5">
              <Pill className="h-5 w-5 text-primary" />
              <span>Today&apos;s Medication Schedule</span>
            </h2>
            <Link href="/medications" className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5">
              <span>View inventory</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {todayReminders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
                No reminders set. Go to Medications to add.
              </div>
            ) : (
              todayReminders.map(r => (
                <div
                  key={r.id}
                  className={`rounded-2xl border p-4 flex items-center justify-between gap-4 transition-all ${
                    r.status === 'completed'
                      ? 'border-green-500/20 bg-green-500/[0.02]'
                      : r.status === 'missed'
                      ? 'border-red-500/20 bg-red-500/[0.02]'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`mt-0.5 h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      r.status === 'completed'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      <Pill className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate">{r.medicineName}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{r.dosage} • Time: {r.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {r.status === 'completed' ? (
                      <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Taken
                      </span>
                    ) : r.status === 'missed' ? (
                      <span className="text-[10px] text-red-500 font-bold bg-red-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> Missed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleTakeReminder(r.id, r.medicineName)}
                        className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-[10px] px-3.5 py-1.5 transition-transform active:scale-95"
                      >
                        Take
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Doctor & Insights Column */}
        <div className="space-y-6">
          {/* Doctor Info */}
          <div className="rounded-3xl border border-border bg-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-foreground">Linked Doctor</h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Activity className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-foreground truncate">{user.doctor.name}</h4>
                <p className="text-[10px] text-muted-foreground truncate">{user.doctor.specialty}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-[10px] text-muted-foreground border-t border-border pt-3">
              <p>Clinic: <span className="text-foreground font-semibold">{user.doctor.clinicName}</span></p>
              <p>Phone: <span className="text-foreground font-semibold">{user.doctor.phone}</span></p>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="rounded-3xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center gap-1.5 text-foreground font-bold text-xs">
              <Sparkles className="h-4 w-4 text-teal-500" />
              <span>Smart Health Guidelines</span>
            </div>
            <div className="space-y-2 text-[11px] text-muted-foreground leading-relaxed">
              <p className="p-2.5 rounded-xl bg-muted/40">
                Hydration target is 2500 ml. Drink water before taking medications to assist absorption.
              </p>
              <p className="p-2.5 rounded-xl bg-muted/40">
                Your adherence rate is excellent today. Try to maintain it to extend your {user.streak}-day streak!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Bot Sidebar */}
      <AIChatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
