'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import { 
  Settings, 
  Moon, 
  Sun, 
  Globe, 
  Accessibility, 
  CloudLightning, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme, addSystemLog } = useApp();
  const { toast } = useToast();

  const [language, setLanguage] = useState('English');
  const [largeFont, setLargeFont] = useState(false);
  const [audioFeedback, setAudioFeedback] = useState(false);
  const [syncStatus, setSyncStatus] = useState('Synced');
  const [loading, setLoading] = useState(false);

  const handleResetDatabase = () => {
    if (confirm('Are you sure you want to clear your local storage database? This will restore all default medication schedules and vitals logs.')) {
      localStorage.clear();
      toast('Database reset! Reloading application.', 'info');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleSync = () => {
    setLoading(true);
    setSyncStatus('Synchronizing...');
    
    setTimeout(() => {
      setLoading(false);
      setSyncStatus('Synced');
      addSystemLog('Cloud synchronization success', 'system');
      toast('Cloud synchronization complete. All records backed up.', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-sans">System Settings</h1>
        <p className="text-xs text-muted-foreground">Adjust device themes, backup configurations, and language options</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: General preferences */}
        <div className="space-y-6">
          
          {/* Theme card */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Settings className="h-4.5 w-4.5 text-primary" />
              <span>Theme & Appearance</span>
            </h3>

            <div className="flex items-center justify-between">
              <div className="leading-snug">
                <span className="font-semibold text-foreground block">Active Theme</span>
                <span className="text-[9px] text-muted-foreground">Toggle light or true dark mode styles.</span>
              </div>
              <button 
                onClick={toggleTheme}
                className="flex items-center gap-1.5 rounded-full bg-muted/60 px-3.5 py-1.5 font-bold hover:bg-muted text-foreground transition-all"
              >
                {theme === 'light' ? (
                  <>
                    <Sun className="h-3.5 w-3.5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-warning" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Language card */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Globe className="h-4.5 w-4.5 text-secondary" />
              <span>Localization & Translation</span>
            </h3>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Select Language</label>
              <select 
                value={language}
                onChange={e => { setLanguage(e.target.value); toast(`Language adjusted to: ${e.target.value}`, 'info'); }}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary text-foreground"
              >
                {['English', 'Spanish / Español', 'French / Français', 'German / Deutsch', 'Arabic / العربية'].map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Accessibility configs */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Accessibility className="h-4.5 w-4.5 text-success" />
              <span>Accessibility Accommodations</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="leading-snug">
                  <span className="font-semibold text-foreground block">Large Font Scaling</span>
                  <span className="text-[9px] text-muted-foreground">Increases header and paragraph readability.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={largeFont}
                  onChange={e => { setLargeFont(e.target.checked); toast(`Large fonts ${e.target.checked ? 'enabled' : 'disabled'} (Mock)`, 'info'); }}
                  className="rounded text-primary focus:ring-primary border-border h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="leading-snug">
                  <span className="font-semibold text-foreground block">Screen Reader Sound Guide</span>
                  <span className="text-[9px] text-muted-foreground">Voice narration guide on click events.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={audioFeedback}
                  onChange={e => { setAudioFeedback(e.target.checked); toast(`Screen Reader Guide ${e.target.checked ? 'enabled' : 'disabled'} (Mock)`, 'info'); }}
                  className="rounded text-primary focus:ring-primary border-border h-4 w-4"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Backups and database resets */}
        <div className="space-y-6">
          
          {/* Cloud sync */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <CloudLightning className="h-4.5 w-4.5 text-primary" />
              <span>Cloud Storage & Backup Sync</span>
            </h3>
            
            <p className="text-[10px] text-muted-foreground leading-relaxed">Save your vitals logs, medications schedule, and caregiver permissions to the clinical database. Backup synchronizes automatically in the background.</p>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="font-bold text-foreground">Status: {syncStatus}</span>
              </div>
              <button
                type="button"
                onClick={handleSync}
                disabled={loading}
                className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl font-bold transition-all disabled:opacity-50"
              >
                {loading ? 'Syncing...' : 'Sync Now'}
              </button>
            </div>
          </div>

          {/* Database reset */}
          <div className="rounded-3xl border border-destructive/20 bg-destructive/[0.01] p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-destructive flex items-center gap-2">
              <RotateCcw className="h-4.5 w-4.5" />
              <span>Developer Reset Database</span>
            </h3>

            <p className="text-[10px] text-muted-foreground leading-relaxed">Clears all custom medications, notifications, and logs from browser local storage, reloading default mock profiles. Useful for testing cycles.</p>
            
            <button
              type="button"
              onClick={handleResetDatabase}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-destructive/30 hover:bg-destructive hover:text-white text-destructive font-bold transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset to Default database</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
