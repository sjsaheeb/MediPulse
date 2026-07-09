'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import {
  Heart, Activity, TrendingUp, ShieldAlert, Plus, Calendar, Smile, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBloodPressureStage, getBloodSugarCategory } from '../../lib/utils';

export default function HealthPage() {
  const { healthLogs, addHealthLog } = useApp();
  const { toast } = useToast();

  const [addLogOpen, setAddLogOpen] = useState(false);

  // Form states
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [bloodSugar, setBloodSugar] = useState(90);
  const [heartRate, setHeartRate] = useState(72);
  const [weight, setWeight] = useState(70.0);
  const [temperature, setTemperature] = useState(36.6);
  const [oxygenLevel, setOxygenLevel] = useState(98);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [mood, setMood] = useState<'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Awful'>('Good');
  const [notes, setNotes] = useState('');

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      date: new Date().toISOString().split('T')[0],
      bloodPressure: { systolic, diastolic },
      bloodSugar,
      heartRate,
      weight,
      temperature,
      oxygenLevel,
      sleepHours,
      mood,
      symptoms: [],
      notes
    };
    addHealthLog(payload);
    toast('Health metrics logged successfully', 'success');
    setAddLogOpen(false);
  };

  // Vitals definitions for render
  const currentBp = healthLogs[0]?.bloodPressure || { systolic: 120, diastolic: 80 };
  const currentSugar = healthLogs[0]?.bloodSugar || 95;
  const currentHeartRate = healthLogs[0]?.heartRate || 72;
  const currentOxygen = healthLogs[0]?.oxygenLevel || 98;

  const bpEval = getBloodPressureStage(currentBp.systolic, currentBp.diastolic);
  const sugarEval = getBloodSugarCategory(currentSugar);

  // Responsive SVG Line Chart Helper for BP Systolic/Diastolic
  const renderBpChart = () => {
    const data = [...healthLogs].reverse().slice(-7);
    if (data.length === 0) return null;

    const width = 500;
    const height = 180;
    const padding = 30;

    // Systolic range maps 80-160
    // Diastolic range maps 50-100
    const pointsSys = data.map((d, idx) => {
      const x = padding + (idx * (width - 2 * padding)) / Math.max(1, data.length - 1);
      const y = height - padding - ((d.bloodPressure.systolic - 80) * (height - 2 * padding)) / 80;
      return `${x},${y}`;
    }).join(' ');

    const pointsDia = data.map((d, idx) => {
      const x = padding + (idx * (width - 2 * padding)) / Math.max(1, data.length - 1);
      const y = height - padding - ((d.bloodPressure.diastolic - 50) * (height - 2 * padding)) / 50;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {/* Grid lines */}
        <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="currentColor" strokeOpacity="0.05" />
        <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="currentColor" strokeOpacity="0.05" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" strokeOpacity="0.1" />

        {/* BP Systolic line */}
        <polyline fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" points={pointsSys} />
        {/* BP Diastolic line */}
        <polyline fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" points={pointsDia} />

        {/* Graph dots */}
        {data.map((d, idx) => {
          const x = padding + (idx * (width - 2 * padding)) / Math.max(1, data.length - 1);
          const ySys = height - padding - ((d.bloodPressure.systolic - 80) * (height - 2 * padding)) / 80;
          const yDia = height - padding - ((d.bloodPressure.diastolic - 50) * (height - 2 * padding)) / 50;
          return (
            <g key={idx}>
              <circle cx={x} cy={ySys} r="4" fill="#f43f5e" stroke="#fff" strokeWidth="1" />
              <circle cx={x} cy={yDia} r="4" fill="#06b6d4" stroke="#fff" strokeWidth="1" />
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Diagnostics</span>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Health Vitals</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Visualize your physical diagnostics log updates.</p>
        </div>
        <button
          onClick={() => setAddLogOpen(true)}
          className="flex items-center gap-1.5 rounded-2xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold px-4 py-3 shadow-md shadow-primary/10 transition-transform active:scale-95 self-start"
        >
          <Plus className="h-4 w-4" />
          <span>Log Vitals</span>
        </button>
      </div>

      {/* Grid of Vitals Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* BP */}
        <div className="rounded-3xl border border-border bg-card p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Blood Pressure</span>
            <Heart className="h-5 w-5 text-rose-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{currentBp.systolic}/{currentBp.diastolic} <span className="text-xs text-muted-foreground">mmHg</span></h3>
            <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1.5 ${bpEval.bgColor} ${bpEval.color}`}>
              {bpEval.stage}
            </span>
          </div>
        </div>

        {/* Sugar */}
        <div className="rounded-3xl border border-border bg-card p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Blood Sugar</span>
            <Activity className="h-5 w-5 text-teal-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{currentSugar} <span className="text-xs text-muted-foreground">mg/dL</span></h3>
            <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1.5 ${sugarEval.bgColor} ${sugarEval.color}`}>
              {sugarEval.category}
            </span>
          </div>
        </div>

        {/* Heart Rate */}
        <div className="rounded-3xl border border-border bg-card p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Heart Rate</span>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{currentHeartRate} <span className="text-xs text-muted-foreground">bpm</span></h3>
            <span className="inline-block text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1.5">
              Normal resting
            </span>
          </div>
        </div>

        {/* Oxygen */}
        <div className="rounded-3xl border border-border bg-card p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Oxygen level</span>
            <ShieldAlert className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{currentOxygen} <span className="text-xs text-muted-foreground">% SpO2</span></h3>
            <span className="inline-block text-[9px] font-bold bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full mt-1.5">
              Excellent saturation
            </span>
          </div>
        </div>
      </div>

      {/* Responsive Visual Chart */}
      <div className="rounded-3xl border border-border bg-card p-5 lg:p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-border pb-3">
          <div>
            <h3 className="text-xs font-bold text-foreground">BP Trend Analysis</h3>
            <p className="text-[10px] text-muted-foreground">Systolic (rose) vs Diastolic (blue) trend curves.</p>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-semibold">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> Systolic</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-cyan-500" /> Diastolic</span>
          </div>
        </div>
        <div className="h-56 flex items-center justify-center text-muted-foreground bg-muted/20 rounded-2xl p-2 relative">
          {renderBpChart()}
        </div>
      </div>

      {/* Add Log Modal */}
      <AnimatePresence>
        {addLogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setAddLogOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <h2 className="text-sm font-bold text-foreground">Log New Vitals</h2>
                <button onClick={() => setAddLogOpen(false)} className="p-1 rounded-full hover:bg-muted text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveLog} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Systolic BP (mmHg)</label>
                    <input
                      type="number"
                      value={systolic}
                      onChange={e => setSystolic(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Diastolic BP (mmHg)</label>
                    <input
                      type="number"
                      value={diastolic}
                      onChange={e => setDiastolic(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Blood Sugar (mg/dL)</label>
                    <input
                      type="number"
                      value={bloodSugar}
                      onChange={e => setBloodSugar(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Heart Rate (bpm)</label>
                    <input
                      type="number"
                      value={heartRate}
                      onChange={e => setHeartRate(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={e => setWeight(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Temp (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={temperature}
                      onChange={e => setTemperature(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">SpO2 (%)</label>
                    <input
                      type="number"
                      value={oxygenLevel}
                      onChange={e => setOxygenLevel(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Sleep Hours</label>
                    <input
                      type="number"
                      step="0.1"
                      value={sleepHours}
                      onChange={e => setSleepHours(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Mood</label>
                    <select
                      value={mood}
                      onChange={e => setMood(e.target.value as 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Awful')}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    >
                      {['Excellent', 'Good', 'Fair', 'Poor', 'Awful'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Vitals Notes</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="e.g. Logged post-exercise / felt slightly dizzy"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                  />
                </div>

                <button type="submit" className="w-full rounded-2xl bg-primary py-3 text-xs font-semibold text-white shadow-md active:scale-95 transition-transform">
                  Save Vitals Log
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple dummy replacement for standard Close Icon to prevent dynamic import issues
const X = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
