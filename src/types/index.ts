export type UserRole = 'patient' | 'caregiver' | 'admin';

export interface DoctorInfo {
  name: string;
  specialty: string;
  phone: string;
  email: string;
  clinicName: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  bloodType: string;
  allergies: string;
  conditions: string;
  doctor: DoctorInfo;
  emergencyContact: EmergencyContact;
  streak: number;
}

export interface Medicine {
  id: string;
  name: string;
  category: 'Pill' | 'Syrup' | 'Injection' | 'Inhaler' | 'Drops' | 'Powder' | 'Other';
  dosage: string;
  frequency: string;
  times: string[];
  remainingQty: number;
  totalQty: number;
  instructions: string;
  imageUrl?: string;
  refillReminder: boolean;
  refillThreshold: number;
}

export interface Reminder {
  id: string;
  medicineId: string;
  medicineName: string;
  category: string;
  dosage: string;
  time: string;
  status: 'pending' | 'completed' | 'missed';
  takenAt?: string;
}

export interface HealthLog {
  id: string;
  date: string;
  bloodPressure: { systolic: number; diastolic: number };
  bloodSugar: number;
  heartRate: number;
  weight: number;
  temperature: number;
  oxygenLevel: number;
  sleepHours: number;
  mood: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Awful';
  symptoms: string[];
  notes: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'refill' | 'missed' | 'emergency';
  read: boolean;
}

export interface CaregiverAlert {
  id: string;
  patientName: string;
  alertType: 'missed_medication' | 'critical_vitals' | 'emergency_sos';
  message: string;
  time: string;
  status: 'unread' | 'resolved';
}

export interface SystemLog {
  id: string;
  action: string;
  timestamp: string;
  user: string;
  module: 'auth' | 'medication' | 'health' | 'system';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
