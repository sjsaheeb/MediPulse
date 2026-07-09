'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import { 
  Users, 
  Heart, 
  Activity, 
  AlertTriangle, 
  Check, 
  Phone, 
  MessageSquare, 
  ShieldAlert,
  FileText,
  Clock,
  ArrowRight,
  Pill
} from 'lucide-react';
import Link from 'next/link';

export default function CaregiverPage() {
  const { caregiverAlerts, resolveCaregiverAlert, user, reminders, healthLogs, sosTriggered } = useApp();
  const { toast } = useToast();

  const handleResolveAlert = (id: string) => {
    resolveCaregiverAlert(id);
    toast('Alert marked as resolved.', 'success');
  };

  const activeAlerts = caregiverAlerts.filter(a => a.status === 'unread');
  const completedDoses = reminders.filter(r => r.status === 'completed').length;
  const totalDoses = reminders.length;
  const complianceRate = totalDoses > 0 ? Math.round((completedDoses / totalDoses) * 100) : 100;

  const latestBP = healthLogs[0]?.bloodPressure || { systolic: 120, diastolic: 80 };
  const latestSugar = healthLogs[0]?.bloodSugar || 95;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-sans">Caregiver Command Hub</h1>
        <p className="text-xs text-muted-foreground">Monitor schedules, adherence, and vital statistics for linked family members</p>
      </div>

      {/* Emergency Active Alert Box if patient SOS active */}
      {sosTriggered && (
        <div className="rounded-3xl border border-destructive bg-destructive/10 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-3 items-start sm:items-center">
            <ShieldAlert className="h-10 w-10 text-destructive animate-bounce flex-shrink-0" />
            <div>
              <h2 className="text-sm font-extrabold text-destructive uppercase">CRITICAL SOS ALARM TRIGGERED!</h2>
              <p className="text-xs text-foreground mt-0.5 font-semibold">Saheeb dispatched a distress call. Current location tracked to GPS coordinates.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a 
              href="tel:+15559876543"
              className="flex items-center gap-1 bg-destructive hover:bg-destructive/90 text-white rounded-full px-5 py-2.5 text-xs font-bold transition-all shadow-md"
            >
              <Phone className="h-4 w-4" />
              <span>Call Emergency</span>
            </a>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Side: Monitored Patient Overview */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Patient Card */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex gap-3">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h2 className="text-sm font-bold text-foreground">{user.name}</h2>
                  <p className="text-[10px] text-muted-foreground">Linked Patient • {user.conditions}</p>
                </div>
              </div>
              
              <div className="flex gap-1.5">
                <a 
                  href={`tel:${user.emergencyContact.phone}`}
                  className="rounded-full border border-border p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                  title="Call Patient"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <button 
                  onClick={() => toast(`Text chat with ${user.name} simulation opened.`, 'info')}
                  className="rounded-full border border-border p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                  title="Message Patient"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick stats columns */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-muted/40 p-4 space-y-1">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">Today&apos;s Adherence</span>
                <div className="flex items-center justify-between mt-1">
                  <h3 className="text-lg font-extrabold text-foreground">{complianceRate}%</h3>
                  <span className="text-[9px] text-muted-foreground">({completedDoses}/{totalDoses} doses)</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${complianceRate}%` }} />
                </div>
              </div>

              <div className="rounded-2xl bg-muted/40 p-4 space-y-1">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">Last BP Reading</span>
                <h3 className="text-lg font-extrabold text-foreground mt-1">{latestBP.systolic}/{latestBP.diastolic} <span className="text-[10px] font-semibold text-muted-foreground">mmHg</span></h3>
                <span className="text-[8px] font-bold text-success bg-success/10 rounded px-1.5 py-0.5 inline-block mt-2">Within Range</span>
              </div>

              <div className="rounded-2xl bg-muted/40 p-4 space-y-1">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">Last Blood Glucose</span>
                <h3 className="text-lg font-extrabold text-foreground mt-1">{latestSugar} <span className="text-[10px] font-semibold text-muted-foreground">mg/dL</span></h3>
                <span className="text-[8px] font-bold text-success bg-success/10 rounded px-1.5 py-0.5 inline-block mt-2">Stable (Fasting)</span>
              </div>
            </div>

            {/* Patient Medicine schedules list overview */}
            <div className="space-y-3 pt-3 border-t border-border">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Today&apos;s Dose Logs</span>
              
              <div className="space-y-2">
                {reminders.map((rem) => (
                  <div key={rem.id} className="flex justify-between items-center bg-muted/20 p-2.5 rounded-xl border border-border">
                    <div className="flex gap-2.5 items-center">
                      <Pill className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-xs font-bold text-foreground">{rem.medicineName}</span>
                        <span className="text-[9px] text-muted-foreground ml-2">({rem.dosage})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-semibold text-muted-foreground">Alarm: {rem.time}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${
                        rem.status === 'completed' 
                          ? 'bg-success/10 text-success' 
                          : rem.status === 'missed' 
                          ? 'bg-destructive/10 text-destructive' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {rem.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Caregiver warnings/Alerts panel */}
        <div className="md:col-span-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <AlertTriangle className="h-4.5 w-4.5 text-warning" />
              <span>Patient Alerts Diary ({activeAlerts.length})</span>
            </h3>

            <div className="space-y-3">
              {activeAlerts.length === 0 ? (
                <div className="py-6 text-center text-xs text-success font-semibold">
                  ✓ All patient logs look healthy today!
                </div>
              ) : (
                activeAlerts.map((alert) => (
                  <div key={alert.id} className="rounded-2xl border border-warning/20 bg-warning/5 p-4 space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-extrabold text-warning-foreground uppercase tracking-wider">
                          {alert.alertType.replace('_', ' ')}
                        </span>
                        <span className="text-[9px] text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-xs text-foreground font-semibold leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleResolveAlert(alert.id)}
                      className="w-full flex items-center justify-center gap-1 bg-white hover:bg-muted border border-border text-foreground font-bold py-1.5 rounded-xl text-[10px] transition-all"
                    >
                      <Check className="h-3.5 w-3.5 text-success" />
                      <span>Mark Acknowledged</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Quick Navigation Reports */}
            <div className="pt-4 border-t border-border">
              <Link 
                href="/reports" 
                className="w-full flex items-center justify-between text-xs font-bold text-primary hover:underline group"
              >
                <span>View Full Health Reports</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
