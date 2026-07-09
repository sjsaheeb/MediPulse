'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/ui/Toast';
import {
  Pill, Plus, Trash2, Edit2, AlertCircle, ScanBarcode, X, RefreshCw, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MedicationsPage() {
  const {
    medications,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    addSystemLog
  } = useApp();
  const { toast } = useToast();

  const [addOpen, setAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Pill' | 'Syrup' | 'Injection' | 'Inhaler' | 'Drops' | 'Powder' | 'Other'>('Pill');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [times, setTimes] = useState<string[]>(['08:00']);
  const [totalQty, setTotalQty] = useState(30);
  const [remainingQty, setRemainingQty] = useState(30);
  const [instructions, setInstructions] = useState('');
  const [refillReminder, setRefillReminder] = useState(true);
  const [refillThreshold, setRefillThreshold] = useState(5);

  // Barcode Simulator States
  const [barcodeOpen, setBarcodeOpen] = useState(false);
  const [scanning, setScanning] = useState(false);

  const resetForm = () => {
    setName('');
    setCategory('Pill');
    setDosage('');
    setFrequency('Daily');
    setTimes(['08:00']);
    setTotalQty(30);
    setRemainingQty(30);
    setInstructions('');
    setRefillReminder(true);
    setRefillThreshold(5);
    setEditingId(null);
  };

  const handleAddField = () => {
    setTimes([...times, '08:00']);
  };

  const handleRemoveField = (index: number) => {
    setTimes(times.filter((_, i) => i !== index));
  };

  const handleTimeChange = (index: number, val: string) => {
    const nextTimes = [...times];
    nextTimes[index] = val;
    setTimes(nextTimes);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage) {
      toast('Please enter name and dosage', 'error');
      return;
    }

    const payload = {
      name,
      category,
      dosage,
      frequency,
      times,
      totalQty,
      remainingQty,
      instructions,
      refillReminder,
      refillThreshold
    };

    if (editingId) {
      updateMedicine(editingId, payload);
      toast(`Medication ${name} updated successfully`, 'success');
    } else {
      addMedicine(payload);
      toast(`Medication ${name} added successfully`, 'success');
    }
    setAddOpen(false);
    resetForm();
  };

  const handleEdit = (med: typeof medications[0]) => {
    setEditingId(med.id);
    setName(med.name);
    setCategory(med.category);
    setDosage(med.dosage);
    setFrequency(med.frequency);
    setTimes(med.times);
    setTotalQty(med.totalQty);
    setRemainingQty(med.remainingQty);
    setInstructions(med.instructions);
    setRefillReminder(med.refillReminder);
    setRefillThreshold(med.refillThreshold);
    setAddOpen(true);
  };

  // Barcode Simulator Scan Trigger
  const handleScanBarcode = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      // Autofill standard medicine
      setName('Aspirin Daily Low Dose');
      setCategory('Pill');
      setDosage('81 mg (1 pill)');
      setInstructions('Take after breakfast');
      setTotalQty(100);
      setRemainingQty(100);
      setBarcodeOpen(false);
      toast('Barcode matched: Aspirin (81mg)!', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Inventory</span>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">My Medications</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage medications, log schedule reminders and monitor refill counts.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setBarcodeOpen(true)}
            className="flex items-center gap-1.5 rounded-2xl bg-card border border-border hover:bg-muted text-foreground text-xs font-semibold px-4 py-3"
          >
            <ScanBarcode className="h-4 w-4 text-primary" />
            <span>Scan Box</span>
          </button>
          <button
            onClick={() => { resetForm(); setAddOpen(true); }}
            className="flex items-center gap-1.5 rounded-2xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold px-4 py-3 shadow-md shadow-primary/10 transition-transform active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Medication</span>
          </button>
        </div>
      </div>

      {/* Grid of Medications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medications.map(med => {
          const isLow = med.remainingQty <= med.refillThreshold;
          return (
            <div key={med.id} className="rounded-3xl border border-border bg-card p-5 space-y-4 relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Pill className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-foreground truncate">{med.name}</h3>
                      <span className="text-[9px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize">{med.category}</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => handleEdit(med)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => deleteMedicine(med.id)} className="p-1.5 rounded-lg hover:bg-red-500/5 text-muted-foreground hover:text-red-500">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mt-4 text-[10px] text-muted-foreground border-t border-border/60 pt-3">
                  <p>Dosage: <span className="text-foreground font-semibold">{med.dosage}</span></p>
                  <p>Frequency: <span className="text-foreground font-semibold">{med.frequency} ({med.times.join(', ')})</span></p>
                  {med.instructions && <p>Instructions: <span className="text-foreground font-semibold italic">{med.instructions}</span></p>}
                </div>
              </div>

              <div className="border-t border-border/60 pt-3 mt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-muted-foreground">Stock Inventory</span>
                  <span className={isLow ? 'text-red-500' : 'text-foreground'}>{med.remainingQty} / {med.totalQty} left</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${isLow ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${(med.remainingQty / med.totalQty) * 100}%` }}
                  />
                </div>
                {isLow && (
                  <div className="flex items-center gap-1 text-[9px] text-red-500 font-bold bg-red-500/10 p-2 rounded-lg">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Low Stock! Time to Refill Medication.</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {addOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setAddOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <h2 className="text-sm font-bold text-foreground">{editingId ? 'Edit Medication' : 'Add Medication'}</h2>
                <button onClick={() => setAddOpen(false)} className="p-1 rounded-full hover:bg-muted text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Medication Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Lipitor"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as 'Pill' | 'Syrup' | 'Injection' | 'Inhaler' | 'Drops' | 'Powder' | 'Other')}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    >
                      {['Pill', 'Syrup', 'Injection', 'Inhaler', 'Drops', 'Powder', 'Other'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Dosage</label>
                    <input
                      type="text"
                      value={dosage}
                      onChange={e => setDosage(e.target.value)}
                      placeholder="e.g. 10 mg (1 tablet)"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-semibold text-foreground">Intake Reminders (24h format)</label>
                    <button type="button" onClick={handleAddField} className="text-primary font-bold hover:underline">
                      + Add Time
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((t, idx) => (
                      <div key={idx} className="flex gap-1 items-center">
                        <input
                          type="time"
                          value={t}
                          onChange={e => handleTimeChange(idx, e.target.value)}
                          className="flex-1 rounded-xl border border-border bg-background px-2.5 py-1.5 outline-none focus:border-primary text-foreground"
                        />
                        {times.length > 1 && (
                          <button type="button" onClick={() => handleRemoveField(idx)} className="text-red-500 hover:text-red-600">
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Initial Total Stock Qty</label>
                    <input
                      type="number"
                      value={totalQty}
                      onChange={e => setTotalQty(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Remaining Qty</label>
                    <input
                      type="number"
                      value={remainingQty}
                      onChange={e => setRemainingQty(Number(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Instructions</label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={e => setInstructions(e.target.value)}
                    placeholder="e.g. Take with food / after breakfast"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 items-center bg-muted/30 p-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="refillReminder"
                      checked={refillReminder}
                      onChange={e => setRefillReminder(e.target.checked)}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="refillReminder" className="font-semibold text-foreground cursor-pointer">Refill Alerts</label>
                  </div>
                  {refillReminder && (
                    <div className="space-y-1">
                      <label className="font-semibold text-[10px] text-muted-foreground block">Alert Limit threshold</label>
                      <input
                        type="number"
                        value={refillThreshold}
                        onChange={e => setRefillThreshold(Number(e.target.value))}
                        className="w-full rounded-xl border border-border bg-background px-2.5 py-1 outline-none focus:border-primary text-foreground"
                      />
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full rounded-2xl bg-primary py-3 text-xs font-semibold text-white shadow-md active:scale-95 transition-transform">
                  Save Medication
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Barcode Scanner simulator modal */}
      <AnimatePresence>
        {barcodeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setBarcodeOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-2xl z-10 text-center space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-foreground">Barcode Simulation</h3>
                <button onClick={() => setBarcodeOpen(false)} className="p-1 rounded-full hover:bg-muted text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="h-44 w-full bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border border-slate-800">
                {scanning ? (
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-red-500 animate-bounce" />
                ) : (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-36 border-2 border-dashed border-primary/40 rounded-xl" />
                )}
                <div className="space-y-1.5 text-white/70 z-10">
                  <ScanBarcode className="h-10 w-10 mx-auto text-primary animate-pulse" />
                  <p className="text-[10px] font-semibold">{scanning ? 'Analyzing Medication package...' : 'Position Barcode inside target window'}</p>
                </div>
              </div>

              <button
                onClick={handleScanBarcode}
                disabled={scanning}
                className="w-full flex items-center justify-center gap-1.5 rounded-2xl bg-primary py-3 text-xs font-semibold text-white shadow-md active:scale-95"
              >
                {scanning ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Trigger Simulated Scan</span>
                )}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
