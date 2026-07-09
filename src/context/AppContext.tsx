'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { UserProfile, Medicine, Reminder, HealthLog, Notification, CaregiverAlert, SystemLog, ChatMessage, UserRole } from '../types';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
  role: UserRole;
  switchRole: (role: UserRole) => void;
  medications: Medicine[];
  addMedicine: (medicine: Omit<Medicine, 'id'>) => void;
  updateMedicine: (id: string, medicine: Partial<Medicine>) => void;
  deleteMedicine: (id: string) => void;
  reminders: Reminder[];
  markReminderStatus: (id: string, status: 'pending' | 'completed' | 'missed') => void;
  healthLogs: HealthLog[];
  addHealthLog: (log: Omit<HealthLog, 'id'>) => void;
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  caregiverAlerts: CaregiverAlert[];
  resolveCaregiverAlert: (id: string) => void;
  systemLogs: SystemLog[];
  addSystemLog: (action: string, module: SystemLog['module']) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  triggerSOS: () => void;
  sosTriggered: boolean;
  resetSOS: () => void;
  waterIntake: number;
  updateWaterIntake: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultUser: UserProfile = {
  name: 'Saheeb', email: 'john.doe@healthmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  role: 'patient', bloodType: 'O-Positive', allergies: 'Penicillin, Peanuts',
  conditions: 'Type-2 Diabetes, Mild Hypertension', streak: 5,
  doctor: { name: 'Dr. Sarah Jenkins', specialty: 'Cardiologist', phone: '+1 (555) 234-5678', email: 'sarah.jenkins@hospital.org', clinicName: 'Metro Heart and Vascular Center' },
  emergencyContact: { name: 'Emily Doe', relation: 'Spouse', phone: '+1 (555) 987-6543' },
};

const defaultMedications: Medicine[] = [
  { id:'med-1', name:'Lipitor', category:'Pill', dosage:'10 mg (1 tablet)', frequency:'Daily', times:['08:00'], remainingQty:24, totalQty:30, instructions:'Take after breakfast', refillReminder:true, refillThreshold:5 },
  { id:'med-2', name:'Metformin', category:'Pill', dosage:'500 mg (1 tablet)', frequency:'Twice a day', times:['08:00','20:00'], remainingQty:8, totalQty:60, instructions:'Take with food', refillReminder:true, refillThreshold:10 },
  { id:'med-3', name:'Ventolin HFA', category:'Inhaler', dosage:'90 mcg (2 puffs)', frequency:'Daily', times:['14:00'], remainingQty:120, totalQty:200, instructions:'Inhale through mouth. Rinse afterwards.', refillReminder:false, refillThreshold:20 },
  { id:'med-4', name:'Omega 3', category:'Drops', dosage:'1000 mg (1 capsule)', frequency:'Daily', times:['21:00'], remainingQty:45, totalQty:60, instructions:'Take with water before bed', refillReminder:true, refillThreshold:10 },
];

const defaultReminders: Reminder[] = [
  { id:'rem-1', medicineId:'med-1', medicineName:'Lipitor', category:'Pill', dosage:'10 mg', time:'08:00', status:'completed', takenAt:'08:05' },
  { id:'rem-2', medicineId:'med-2', medicineName:'Metformin', category:'Pill', dosage:'500 mg', time:'08:00', status:'completed', takenAt:'08:06' },
  { id:'rem-3', medicineId:'med-3', medicineName:'Ventolin HFA', category:'Inhaler', dosage:'2 puffs', time:'14:00', status:'pending' },
  { id:'rem-4', medicineId:'med-2', medicineName:'Metformin', category:'Pill', dosage:'500 mg', time:'20:00', status:'pending' },
  { id:'rem-5', medicineId:'med-4', medicineName:'Omega 3', category:'Drops', dosage:'1 capsule', time:'21:00', status:'pending' },
];

const defaultHealthLogs: HealthLog[] = [
  { id:'log-7', date:'2026-07-08', bloodPressure:{systolic:118,diastolic:77}, bloodSugar:93, heartRate:69, weight:74.7, temperature:36.4, oxygenLevel:99, sleepHours:7.8, mood:'Excellent', symptoms:[], notes:'Excellent health status.' },
  { id:'log-6', date:'2026-07-07', bloodPressure:{systolic:121,diastolic:80}, bloodSugar:99, heartRate:71, weight:75.0, temperature:36.6, oxygenLevel:98, sleepHours:7.0, mood:'Good', symptoms:[], notes:'Vitals stable.' },
  { id:'log-5', date:'2026-07-06', bloodPressure:{systolic:126,diastolic:81}, bloodSugar:112, heartRate:75, weight:75.1, temperature:36.8, oxygenLevel:97, sleepHours:6.2, mood:'Fair', symptoms:['Headache'], notes:'Slight headache.' },
  { id:'log-4', date:'2026-07-05', bloodPressure:{systolic:120,diastolic:79}, bloodSugar:96, heartRate:70, weight:74.8, temperature:36.7, oxygenLevel:99, sleepHours:7.5, mood:'Excellent', symptoms:[], notes:'Normal readings.' },
  { id:'log-3', date:'2026-07-04', bloodPressure:{systolic:119,diastolic:78}, bloodSugar:94, heartRate:68, weight:74.9, temperature:36.6, oxygenLevel:98, sleepHours:8.0, mood:'Excellent', symptoms:[], notes:'Great sleep.' },
  { id:'log-2', date:'2026-07-03', bloodPressure:{systolic:124,diastolic:82}, bloodSugar:102, heartRate:74, weight:75.0, temperature:36.5, oxygenLevel:99, sleepHours:6.8, mood:'Good', symptoms:['Mild Fatigue'], notes:'Tired in afternoon.' },
  { id:'log-1', date:'2026-07-02', bloodPressure:{systolic:122,diastolic:80}, bloodSugar:98, heartRate:72, weight:75.1, temperature:36.6, oxygenLevel:98, sleepHours:7.2, mood:'Good', symptoms:[], notes:'Took a 30m walk.' },
];

const defaultNotifications: Notification[] = [
  { id:'notif-1', title:'Refill Alert', description:'Metformin quantity is low (8 left). Please refill soon.', time:'10m ago', type:'refill', read:false },
  { id:'notif-2', title:'Adherence Streak!', description:'You reached a 5-day perfect adherence streak!', time:'2h ago', type:'info', read:false },
  { id:'notif-3', title:'Caregiver Update', description:'Caregiver Emily Doe reviewed your weekly summary.', time:'1d ago', type:'info', read:true },
];

const defaultCaregiverAlerts: CaregiverAlert[] = [
  { id:'cg-1', patientName:'Saheeb', alertType:'missed_medication', message:'Missed morning dose of Metformin (8:00 AM).', time:'Yesterday 10:00 AM', status:'unread' },
  { id:'cg-2', patientName:'Saheeb', alertType:'critical_vitals', message:'Elevated Systolic BP recorded: 142 mmHg.', time:'Jul 6, 2:15 PM', status:'resolved' },
];

const defaultSystemLogs: SystemLog[] = [
  { id:'log-sys-1', action:'User login success', timestamp:'2026-07-08 08:00:23', user:'john.doe@healthmail.com', module:'auth' },
  { id:'log-sys-2', action:'Medicine Ventolin HFA updated', timestamp:'2026-07-07 14:10:45', user:'john.doe@healthmail.com', module:'medication' },
  { id:'log-sys-3', action:'Daily health log created', timestamp:'2026-07-08 08:30:12', user:'john.doe@healthmail.com', module:'health' },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [role, setRole] = useState<UserRole>('patient');
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [medications, setMedications] = useState<Medicine[]>(defaultMedications);
  const [reminders, setReminders] = useState<Reminder[]>(defaultReminders);
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>(defaultHealthLogs);
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [caregiverAlerts, setCaregiverAlerts] = useState<CaregiverAlert[]>(defaultCaregiverAlerts);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(defaultSystemLogs);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id:'chat-1', sender:'ai', text:'Hello! I am your AI Health Assistant. How can I help you today?', timestamp: '09:00 AM' },
  ]);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [waterIntake, setWaterIntake] = useState(1250);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
    if (savedTheme) { setTheme(savedTheme); document.documentElement.className = savedTheme; }
    else { document.documentElement.className = 'light'; }
    const savedRole = localStorage.getItem('app-role') as UserRole | null;
    if (savedRole) setRole(savedRole);
  }, []);

  useEffect(() => { if (!mounted) return; localStorage.setItem('app-theme', theme); document.documentElement.className = theme; }, [theme, mounted]);
  useEffect(() => { if (!mounted) return; localStorage.setItem('app-role', role); }, [role, mounted]);

  const toggleTheme = useCallback(() => setTheme(p => p === 'light' ? 'dark' : 'light'), []);
  const updateProfile = useCallback((d: Partial<UserProfile>) => setUser(p => ({ ...p, ...d })), []);
  const switchRole = (r: UserRole) => setRole(r);

  const addSystemLog = useCallback((action: string, module: SystemLog['module']) => {
    setSystemLogs(p => [{ id: 'slog-' + Date.now(), action, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), user: defaultUser.email, module }, ...p]);
  }, []);

  const addNotification = useCallback((n: Omit<Notification, 'id' | 'time' | 'read'>) => {
    setNotifications(p => [{ ...n, id: 'notif-' + Date.now(), time: 'Just now', read: false }, ...p]);
  }, []);

  const addMedicine = useCallback((med: Omit<Medicine, 'id'>) => {
    const newId = 'med-' + Date.now();
    setMedications(p => [...p, { ...med, id: newId }]);
    const newReminders: Reminder[] = med.times.map((t, i) => ({
      id: `rem-${newId}-${i}`, medicineId: newId, medicineName: med.name,
      category: med.category, dosage: med.dosage, time: t, status: 'pending' as const,
    }));
    setReminders(p => [...p, ...newReminders]);
    addNotification({ title: 'New Medicine Added', description: `${med.name} scheduled ${med.frequency}.`, type: 'info' });
    addSystemLog(`Added medication ${med.name}`, 'medication');
  }, [addNotification, addSystemLog]);

  const updateMedicine = useCallback((id: string, u: Partial<Medicine>) => {
    setMedications(p => p.map(m => m.id === id ? { ...m, ...u } : m));
    if (u.name || u.dosage) {
      setReminders(p => p.map(r => r.medicineId === id ? { ...r, medicineName: u.name ?? r.medicineName, dosage: u.dosage ?? r.dosage } : r));
    }
    addSystemLog(`Updated medication ${id}`, 'medication');
  }, [addSystemLog]);

  const deleteMedicine = useCallback((id: string) => {
    const med = medications.find(m => m.id === id);
    setMedications(p => p.filter(m => m.id !== id));
    setReminders(p => p.filter(r => r.medicineId !== id));
    if (med) { addNotification({ title: 'Medication Deleted', description: `${med.name} removed.`, type: 'info' }); addSystemLog(`Deleted ${med.name}`, 'medication'); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNotification, addSystemLog]);

  const markReminderStatus = useCallback((id: string, status: 'pending' | 'completed' | 'missed') => {
    let medId = '';
    setReminders(p => p.map(r => {
      if (r.id === id) { medId = r.medicineId; return { ...r, status, takenAt: status === 'completed' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined }; }
      return r;
    }));
    if (status === 'completed' && medId) {
      setMedications(p => p.map(m => {
        if (m.id !== medId) return m;
        const newQty = Math.max(0, m.remainingQty - 1);
        if (newQty <= m.refillThreshold && m.refillReminder) {
          setTimeout(() => addNotification({ title: 'Refill Warning', description: `${m.name} low (${newQty} left).`, type: 'refill' }), 500);
        }
        return { ...m, remainingQty: newQty };
      }));
      setUser(p => ({ ...p, streak: p.streak + 1 }));
    }
    if (status === 'missed') {
      setCaregiverAlerts(p => [{ id: 'cg-' + Date.now(), patientName: user.name, alertType: 'missed_medication', message: `Missed dose.`, time: 'Just now', status: 'unread' }, ...p]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNotification]);

  const addHealthLog = useCallback((log: Omit<HealthLog, 'id'>) => {
    setHealthLogs(p => [{ ...log, id: 'hlog-' + Date.now() }, ...p]);
    if (log.bloodPressure.systolic >= 140 || log.bloodPressure.diastolic >= 90) {
      addNotification({ title: 'High BP Alert', description: `BP: ${log.bloodPressure.systolic}/${log.bloodPressure.diastolic} mmHg.`, type: 'emergency' });
      setCaregiverAlerts(p => [{ id: 'cg-' + Date.now(), patientName: user.name, alertType: 'critical_vitals', message: `Critical BP: ${log.bloodPressure.systolic}/${log.bloodPressure.diastolic}`, time: 'Just now', status: 'unread' }, ...p]);
    }
    addSystemLog('Logged health metrics', 'health');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNotification, addSystemLog]);


  const markNotificationRead = useCallback((id: string) => setNotifications(p => p.map(n => n.id === id ? { ...n, read: true } : n)), []);
  const clearNotifications = useCallback(() => setNotifications([]), []);
  const resolveCaregiverAlert = useCallback((id: string) => setCaregiverAlerts(p => p.map(a => a.id === id ? { ...a, status: 'resolved' } : a)), []);
  const updateWaterIntake = useCallback((amount: number) => setWaterIntake(p => Math.max(0, p + amount)), []);

  const triggerSOS = useCallback(() => {
    setSosTriggered(true);
    addNotification({ title: 'EMERGENCY SOS', description: 'Alerts sent to caregiver and doctor.', type: 'emergency' });
    setCaregiverAlerts(p => [{ id: 'cg-sos-' + Date.now(), patientName: user.name, alertType: 'emergency_sos', message: `CRITICAL: ${user.name} triggered EMERGENCY SOS!`, time: 'Just now', status: 'unread' }, ...p]);
    addSystemLog('EMERGENCY SOS TRIGGERED', 'system');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNotification, addSystemLog, user.name]);
  const resetSOS = useCallback(() => { setSosTriggered(false); addSystemLog('Emergency SOS reset', 'system'); }, [addSystemLog]);

  const sendChatMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: 'cu-' + Date.now(), sender: 'user', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(p => [...p, userMsg]);
    setTimeout(() => {
      let reply = "I see. I'd suggest monitoring your symptoms. Contact Dr. Sarah Jenkins if needed or tap SOS.";
      const q = text.toLowerCase();
      if (q.includes('bp') || q.includes('blood pressure')) {
        const bp = healthLogs[0]?.bloodPressure;
        reply = `Your latest BP is ${bp ? `${bp.systolic}/${bp.diastolic} mmHg` : 'not logged'}. Normal is below 120/80 mmHg.`;
      } else if (q.includes('sugar') || q.includes('glucose')) {
        reply = `Your last Blood Sugar is ${healthLogs[0]?.bloodSugar ?? 'not logged'} mg/dL. Target fasting is 80-130 mg/dL.`;
      } else if (q.includes('hello') || q.includes('hi')) {
        const done = reminders.filter(r => r.status === 'completed').length;
        reply = `Hello ${user.name}! You've completed ${done}/${reminders.length} doses today. Water intake: ${waterIntake}ml.`;
      } else if (q.includes('streak') || q.includes('score')) {
        reply = `You have a ${user.streak}-day adherence streak! Adherence rating: 94%. Keep it up!`;
      }
      setChatMessages(p => [...p, { id: 'ca-' + Date.now(), sender: 'ai', text: reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(() => ({
    theme, toggleTheme, user, updateProfile, role, switchRole,
    medications, addMedicine, updateMedicine, deleteMedicine,
    reminders, markReminderStatus, healthLogs, addHealthLog,
    notifications, addNotification, markNotificationRead, clearNotifications,
    caregiverAlerts, resolveCaregiverAlert, systemLogs, addSystemLog,
    chatMessages, sendChatMessage, triggerSOS, sosTriggered, resetSOS,
    waterIntake, updateWaterIntake,
  }), [
    theme, toggleTheme, user, updateProfile, role, switchRole,
    medications, addMedicine, updateMedicine, deleteMedicine,
    reminders, markReminderStatus, healthLogs, addHealthLog,
    notifications, addNotification, markNotificationRead, clearNotifications,
    caregiverAlerts, resolveCaregiverAlert, systemLogs, addSystemLog,
    chatMessages, sendChatMessage, triggerSOS, sosTriggered, resetSOS,
    waterIntake, updateWaterIntake,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
