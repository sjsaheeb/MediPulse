'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import { 
  Clock, 
  Volume2, 
  VolumeX, 
  Moon, 
  BellRing, 
  HelpCircle, 
  Volume,
  History,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react';

export default function RemindersPage() {
  const { reminders, markReminderStatus } = useApp();
  const { toast } = useToast();

  // Settings states
  const [alarmSound, setAlarmSound] = useState('Chime');
  const [snoozeTime, setSnoozeTime] = useState('10');
  const [volume, setVolume] = useState(80);
  const [voiceReminder, setVoiceReminder] = useState(true);
  const [vibrate, setVibrate] = useState(true);

  const handleTestSound = () => {
    toast(`Testing alarm sound: "${alarmSound}" tone played at ${volume}% volume.`, 'info');
    
    // Simulate audio chime output via speech synthesis if active
    if (voiceReminder && 'speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(`Attention, this is a test of the MediPulse Voice Reminder system. Please take your prescribed dose.`);
      window.speechSynthesis.speak(msg);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Notification and Alarm preferences saved.', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-sans">Reminders & Alarms</h1>
        <p className="text-xs text-muted-foreground">Adjust notifications tone triggers and snooze intervals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Side: Alarm Settings Form */}
        <div className="md:col-span-7">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <BellRing className="h-4.5 w-4.5 text-primary" />
              <span>Alarm Preference Panel</span>
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              
              {/* Sound Selection */}
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Select Alarm Tone</label>
                <div className="flex gap-2">
                  <select 
                    value={alarmSound}
                    onChange={e => setAlarmSound(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary text-foreground"
                  >
                    {['Chime', 'Gentle Beep', 'Radar Echo', 'Digital Pulse', 'Guitar Melody'].map(snd => (
                      <option key={snd} value={snd}>{snd}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleTestSound}
                    className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl font-bold transition-all"
                  >
                    <Play className="h-3 w-3" />
                    <span>Test</span>
                  </button>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                  <span className="uppercase">Volume Level</span>
                  <span>{volume}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Volume className="h-4.5 w-4.5 text-muted-foreground" />
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <Volume2 className="h-4.5 w-4.5 text-muted-foreground" />
                </div>
              </div>

              {/* Snooze & Vibrate settings */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Snooze Interval</label>
                  <select 
                    value={snoozeTime}
                    onChange={e => setSnoozeTime(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary text-foreground"
                  >
                    <option value="5">5 Minutes</option>
                    <option value="10">10 Minutes</option>
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col justify-end">
                  <div className="flex items-center gap-2 py-2">
                    <input 
                      type="checkbox" 
                      id="vibrate" 
                      checked={vibrate}
                      onChange={e => setVibrate(e.target.checked)}
                      className="rounded text-primary focus:ring-primary border-border h-4 w-4"
                    />
                    <label htmlFor="vibrate" className="font-semibold text-foreground">Vibrate Device</label>
                  </div>
                </div>
              </div>

              {/* Voice Alert Switch */}
              <div className="flex items-center gap-2 py-2 border-t border-border">
                <input 
                  type="checkbox" 
                  id="voiceReminder" 
                  checked={voiceReminder}
                  onChange={e => setVoiceReminder(e.target.checked)}
                  className="rounded text-primary focus:ring-primary border-border h-4 w-4"
                />
                <div className="leading-snug">
                  <label htmlFor="voiceReminder" className="font-semibold text-foreground block">Voice Reminder (Text-to-Speech)</label>
                  <span className="text-[10px] text-muted-foreground">Speaks medicine name and custom dosage instructions aloud when alarm triggers.</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white hover:bg-primary/95 rounded-2xl font-bold shadow-md shadow-primary/10 transition-all text-xs"
              >
                Save Settings
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Timeline checklist & History logs */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Day Timeline */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Reminder Checklist</h3>
            
            <div className="relative pl-6 border-l border-muted space-y-6">
              {reminders.map((rem) => {
                const isCompleted = rem.status === 'completed';
                const isMissed = rem.status === 'missed';
                
                return (
                  <div key={rem.id} className="relative">
                    {/* Circle icon marker on path */}
                    <div className={`absolute -left-[30px] top-0.5 h-4 w-4 rounded-full border-2 bg-card flex items-center justify-center ${
                      isCompleted 
                        ? 'border-success' 
                        : isMissed 
                        ? 'border-destructive' 
                        : 'border-primary'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        isCompleted 
                          ? 'bg-success' 
                          : isMissed 
                          ? 'bg-destructive' 
                          : 'bg-primary'
                      }`} />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-extrabold text-foreground">{rem.medicineName}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">{rem.time}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{rem.dosage}</p>
                      
                      {/* Action controllers */}
                      {!isCompleted && !isMissed && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => markReminderStatus(rem.id, 'completed')}
                            className="bg-success/10 text-success hover:bg-success hover:text-white rounded px-2.5 py-0.5 text-[8px] font-bold transition-all"
                          >
                            Mark Taken
                          </button>
                          <button
                            onClick={() => markReminderStatus(rem.id, 'missed')}
                            className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded px-2.5 py-0.5 text-[8px] font-bold transition-all"
                          >
                            Mark Missed
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
