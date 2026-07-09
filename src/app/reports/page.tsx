'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import { 
  FileText, 
  Printer, 
  Download, 
  TrendingUp, 
  Pill, 
  Heart, 
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

type ReportInterval = 'daily' | 'weekly' | 'monthly';

export default function ReportsPage() {
  const { healthLogs, reminders, medications, user } = useApp();
  const { toast } = useToast();
  
  const [interval, setInterval] = useState<ReportInterval>('weekly');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    toast('Generating PDF Report... Starting download dialog.', 'info');
    setTimeout(() => {
      window.print(); // Natively launches the print save-to-pdf dialog on browsers
    }, 1000);
  };

  // Math metrics solver
  const totalToday = reminders.length;
  const completedToday = reminders.filter(r => r.status === 'completed').length;
  const complianceToday = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 100;

  return (
    <div className="space-y-6">
      
      {/* Header controls (Hidden on print) */}
      <div className="flex items-center justify-between no-print">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-sans">Medical Compliance Analytics</h1>
          <p className="text-xs text-muted-foreground">Export PDF reports and view weekly vitals summaries</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card hover:bg-muted text-foreground px-4 py-2 text-xs font-bold transition-all shadow-sm"
          >
            <Printer className="h-4 w-4" />
            <span>Print Report</span>
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary/95 text-white px-4 py-2 text-xs font-bold transition-all shadow-md shadow-primary/10"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Interval Selector Tab bar (Hidden on print) */}
      <div className="flex gap-1 bg-muted/60 p-1 rounded-2xl max-w-sm w-full no-print">
        {(['daily', 'weekly', 'monthly'] as const).map(i => (
          <button
            key={i}
            onClick={() => setInterval(i)}
            className={`flex-1 py-2 text-center rounded-xl text-xs font-bold capitalize transition-all ${
              interval === i 
                ? 'bg-card text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {i} Report
          </button>
        ))}
      </div>

      {/* Printable Report Layout Container */}
      <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6 print-card">
        
        {/* Print Only Title Header */}
        <div className="hidden print:block border-b border-border pb-6 text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-black font-sans">MediPulse Medical Compliance Report</h1>
          <p className="text-xs text-slate-500">Report generated on: {new Date().toLocaleDateString()} • Patient: {user.name}</p>
        </div>

        {/* Patient Profile Box */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-foreground">Patient Information</h2>
            <p className="text-xs text-muted-foreground">Name: <span className="text-foreground font-semibold">{user.name}</span></p>
            <p className="text-xs text-muted-foreground">Diagnosed Conditions: <span className="text-foreground font-semibold">{user.conditions}</span></p>
            <p className="text-xs text-muted-foreground">Known Allergies: <span className="text-foreground font-semibold">{user.allergies}</span></p>
          </div>
          <div className="space-y-1 sm:text-right">
            <h2 className="text-sm font-bold text-foreground">Assigned Medical Contact</h2>
            <p className="text-xs text-muted-foreground">Specialist: <span className="text-foreground font-semibold">{user.doctor.name} ({user.doctor.specialty})</span></p>
            <p className="text-xs text-muted-foreground">Clinic: <span className="text-foreground font-semibold">{user.doctor.clinicName}</span></p>
            <p className="text-xs text-muted-foreground">Emergency Number: <span className="text-foreground font-semibold">{user.emergencyContact.phone}</span></p>
          </div>
        </div>

        {/* Adherence Rate Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Adherence compliance ratings</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* General progress bar */}
            <div className="rounded-2xl bg-muted/40 p-4 space-y-2 border border-border flex flex-col justify-center">
              <span className="text-xs font-bold text-foreground block">Overall Adherence compliance</span>
              <div className="flex items-center justify-between text-xs font-extrabold text-primary">
                <span>{interval === 'daily' ? `${complianceToday}%` : '94%'}</span>
                <span className="text-[10px] text-muted-foreground font-bold">Target: &gt;80%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all" 
                  style={{ width: interval === 'daily' ? `${complianceToday}%` : '94%' }} 
                />
              </div>
            </div>

            {/* Individual meds rate */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-2.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase block">Compliance by medicine</span>
              <div className="space-y-2">
                {medications.map(med => (
                  <div key={med.id} className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-foreground">{med.name}</span>
                    <span className="font-extrabold text-success">
                      {med.name === 'Metformin' ? '90%' : med.name === 'Lipitor' ? '98%' : '100%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Vitals logs table */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Logged Vital Statistics (Last 7 Entries)</h3>
          
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground font-bold border-b border-border">
                  <th className="p-3">Date</th>
                  <th className="p-3">BP (mmHg)</th>
                  <th className="p-3">Glucose (mg/dL)</th>
                  <th className="p-3">Pulse (bpm)</th>
                  <th className="p-3">Temp (°C)</th>
                  <th className="p-3">Oxygen (%)</th>
                  <th className="p-3">Sleep (hrs)</th>
                  <th className="p-3">Mood</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground font-medium">
                {healthLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/10">
                    <td className="p-3 font-semibold">{log.date}</td>
                    <td className="p-3">{log.bloodPressure.systolic}/{log.bloodPressure.diastolic}</td>
                    <td className="p-3">{log.bloodSugar}</td>
                    <td className="p-3">{log.heartRate}</td>
                    <td className="p-3">{log.temperature}</td>
                    <td className="p-3">{log.oxygenLevel}</td>
                    <td className="p-3">{log.sleepHours}</td>
                    <td className="p-3">{log.mood}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor signature section (Only shown on print) */}
        <div className="hidden print:flex justify-between pt-16 text-xs text-slate-500">
          <div>
            <div className="w-48 border-b border-slate-400 mb-1" />
            <p>Patient Signature</p>
          </div>
          <div>
            <div className="w-48 border-b border-slate-400 mb-1" />
            <p>Caregiver Signature</p>
          </div>
          <div>
            <div className="w-48 border-b border-slate-400 mb-1" />
            <p>Clinical Representative Signature</p>
          </div>
        </div>

      </div>

    </div>
  );
}
