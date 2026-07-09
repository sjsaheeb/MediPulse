'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import { 
  ShieldCheck, 
  Users, 
  Pill, 
  Activity, 
  Database, 
  AlertTriangle, 
  Radio, 
  Send,
  Terminal
} from 'lucide-react';

export default function AdminPage() {
  const { systemLogs, medications, caregiverAlerts, user } = useApp();
  const { toast } = useToast();

  const [announcement, setAnnouncement] = useState('');
  const [broadcasting, setBroadcasting] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement.trim()) return;

    setBroadcasting(true);
    setTimeout(() => {
      setBroadcasting(false);
      setAnnouncement('');
      toast('System announcement broadcast to all active devices!', 'success');
    }, 1200);
  };

  // Math metrics
  const activeSOS = caregiverAlerts.filter(a => a.alertType === 'emergency_sos').length;
  const activeAlerts = caregiverAlerts.filter(a => a.status === 'unread').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-sans">System Administration</h1>
        <p className="text-xs text-muted-foreground">Manage user mappings, inspect audit logs, and dispatch global notifications</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="rounded-3xl border border-border bg-card p-5 space-y-2 shadow-sm">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] font-bold uppercase">Total Accounts</span>
            <Users className="h-4.5 w-4.5 text-primary" />
          </div>
          <h2 className="text-xl font-extrabold text-foreground">1,248</h2>
          <p className="text-[9px] text-muted-foreground">Active Patients & Caregivers</p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 space-y-2 shadow-sm">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] font-bold uppercase">Medicines Schema</span>
            <Pill className="h-4.5 w-4.5 text-secondary" />
          </div>
          <h2 className="text-xl font-extrabold text-foreground">{medications.length}</h2>
          <p className="text-[9px] text-muted-foreground">Registered on current account</p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 space-y-2 shadow-sm">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] font-bold uppercase">Active Vitals Warnings</span>
            <AlertTriangle className="h-4.5 w-4.5 text-warning" />
          </div>
          <h2 className="text-xl font-extrabold text-foreground">{activeAlerts}</h2>
          <p className="text-[9px] text-muted-foreground">Vitals outside stable bands</p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 space-y-2 shadow-sm">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-[10px] font-bold uppercase">SOS Emergencies</span>
            <AlertTriangle className="h-4.5 w-4.5 text-destructive animate-pulse" />
          </div>
          <h2 className="text-xl font-extrabold text-foreground">{activeSOS}</h2>
          <p className="text-[9px] text-muted-foreground">Active patient distress triggers</p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: Audit Trail Log viewer */}
        <div className="md:col-span-8 space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Terminal className="h-4.5 w-4.5 text-primary" />
              <span>System Operations Audit Trail</span>
            </h3>

            {/* Code console logging view */}
            <div className="bg-slate-950 text-slate-300 font-mono text-[10px] rounded-2xl p-4 overflow-x-auto h-72 border border-border space-y-2">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex gap-2">
                  <span className="text-slate-500">[{log.timestamp}]</span>
                  <span className="text-primary font-bold">[{log.module.toUpperCase()}]</span>
                  <span className="text-success">{log.user}:</span>
                  <span>{log.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Broadcast dispatch form */}
        <div className="md:col-span-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Radio className="h-4.5 w-4.5 text-secondary" />
              <span>Global Dispatcher</span>
            </h3>

            <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">System announcement message</label>
                <textarea 
                  rows={4}
                  value={announcement}
                  onChange={e => setAnnouncement(e.target.value)}
                  placeholder="e.g. Scheduled server synchronization maintenance at 22:00 UTC."
                  className="w-full rounded-2xl border border-border bg-background/50 px-4 py-2.5 outline-none focus:border-primary text-foreground resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={broadcasting}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-primary text-white hover:bg-primary/95 font-bold shadow-md shadow-primary/10 transition-all"
              >
                {broadcasting ? (
                  <span>Dispatching...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Broadcast Announcement</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
