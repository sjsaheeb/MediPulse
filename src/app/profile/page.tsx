'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import { 
  User, 
  Heart, 
  ShieldCheck, 
  Trash2, 
  Stethoscope, 
  Phone, 
  Lock,
  Save
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useApp();
  const { toast } = useToast();

  // Profile forms state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bloodType, setBloodType] = useState(user.bloodType);
  const [allergies, setAllergies] = useState(user.allergies);
  const [conditions, setConditions] = useState(user.conditions);

  // Doctor state
  const [docName, setDocName] = useState(user.doctor.name);
  const [docSpecialty, setDocSpecialty] = useState(user.doctor.specialty);
  const [docPhone, setDocPhone] = useState(user.doctor.phone);

  // Emergency contact state
  const [emerName, setEmerName] = useState(user.emergencyContact.name);
  const [emerRelation, setEmerRelation] = useState(user.emergencyContact.relation);
  const [emerPhone, setEmerPhone] = useState(user.emergencyContact.phone);

  // Security
  const [tfa, setTfa] = useState(false);
  const [biometrics, setBiometrics] = useState(true);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      bloodType,
      allergies,
      conditions,
      doctor: {
        ...user.doctor,
        name: docName,
        specialty: docSpecialty,
        phone: docPhone
      },
      emergencyContact: {
        name: emerName,
        relation: emerRelation,
        phone: emerPhone
      }
    });
    toast('Profile data saved successfully', 'success');
  };

  const handleDeleteAccount = () => {
    const confirmation = prompt('WARNING: You are about to permanently delete your medical profile. To confirm, type "DELETE":');
    if (confirmation === 'DELETE') {
      toast('Account deletion simulation triggered. Redirecting to landing.', 'error');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      toast('Deletion cancelled.', 'info');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-sans">Patient Profile Directory</h1>
        <p className="text-xs text-muted-foreground">Manage emergency contacts, clinical files, and security preferences</p>
      </div>

      <form onSubmit={handleProfileSave} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Profile Card and Security */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Avatar Profile Info */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm text-center space-y-4">
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary/10">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">{user.name}</h2>
              <p className="text-[10px] text-muted-foreground">{user.email}</p>
            </div>
            <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[9px] font-bold text-primary capitalize">
              Linked Role: {user.role}
            </div>
          </div>

          {/* Security & 2FA preferences */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Lock className="h-4.5 w-4.5 text-primary" />
              <span>Security Protocols</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="leading-snug">
                  <span className="font-semibold text-foreground block">Two-Factor Authentication</span>
                  <span className="text-[9px] text-muted-foreground">Secure logins with OTP verification.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={tfa}
                  onChange={e => { setTfa(e.target.checked); toast(`Two-Factor Authentication ${e.target.checked ? 'enabled' : 'disabled'}`, 'info'); }}
                  className="rounded text-primary focus:ring-primary border-border h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="leading-snug">
                  <span className="font-semibold text-foreground block">Biometric Lock</span>
                  <span className="text-[9px] text-muted-foreground">Unlock dashboard using Face ID.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={biometrics}
                  onChange={e => { setBiometrics(e.target.checked); toast(`Biometric Lock ${e.target.checked ? 'enabled' : 'disabled'}`, 'info'); }}
                  className="rounded text-primary focus:ring-primary border-border h-4 w-4"
                />
              </div>
            </div>
          </div>

          {/* Delete Account */}
          <div className="rounded-3xl border border-destructive/20 bg-destructive/[0.01] p-6 shadow-sm space-y-3 text-xs">
            <h3 className="font-bold text-destructive flex items-center gap-2">
              <Trash2 className="h-4.5 w-4.5" />
              <span>Danger Zone</span>
            </h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed">Permanently delete your profile, clinical recordings, and active dosage configurations. This action cannot be undone.</p>
            <button 
              type="button"
              onClick={handleDeleteAccount}
              className="w-full py-2 bg-destructive hover:bg-destructive/95 text-white font-bold rounded-xl text-[10px] transition-all"
            >
              Delete Medical Profile
            </button>
          </div>

        </div>

        {/* Right Column: Vitals File Info Form */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Medical Record data */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Heart className="h-4.5 w-4.5 text-primary" />
              <span>Clinical Record Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 outline-none focus:border-primary text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Blood Type Group</label>
                <input 
                  type="text" 
                  value={bloodType}
                  onChange={e => setBloodType(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Allergies List</label>
                <input 
                  type="text" 
                  value={allergies}
                  onChange={e => setAllergies(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 outline-none focus:border-primary text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Diagnosed Chronical Conditions</label>
                <input 
                  type="text" 
                  value={conditions}
                  onChange={e => setConditions(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Emergency & Doctor Records */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Stethoscope className="h-4.5 w-4.5 text-secondary" />
              <span>Assigned Contacts (Doctor & Caregiver)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Primary Doctor Name</label>
                <input 
                  type="text" 
                  value={docName}
                  onChange={e => setDocName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 outline-none focus:border-primary text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Doctor Specialty</label>
                <input 
                  type="text" 
                  value={docSpecialty}
                  onChange={e => setDocSpecialty(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 outline-none focus:border-primary text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Doctor Phone</label>
                <input 
                  type="text" 
                  value={docPhone}
                  onChange={e => setDocPhone(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-4">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Emergency Contact Name</label>
                <input 
                  type="text" 
                  value={emerName}
                  onChange={e => setEmerName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 outline-none focus:border-primary text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Relation</label>
                <input 
                  type="text" 
                  value={emerRelation}
                  onChange={e => setEmerRelation(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 outline-none focus:border-primary text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Contact Phone</label>
                <input 
                  type="text" 
                  value={emerPhone}
                  onChange={e => setEmerPhone(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-1 bg-primary text-white hover:bg-primary/95 py-3 rounded-2xl font-bold shadow-md shadow-primary/10 transition-all text-xs"
          >
            <Save className="h-4.5 w-4.5" />
            <span>Save Profile Directory</span>
          </button>

        </div>

      </form>

    </div>
  );
}
