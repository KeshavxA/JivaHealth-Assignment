
export type UserStatus = 'active' | 'inactive';
export type SubscriptionPlan = 'free' | 'premium';
export type UserRole = 'admin' | 'user';
export type Relation = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';
export type AppointmentType = 'consultation' | 'checkup' | 'follow-up' | 'telehealth';
export type OrderStatus = 'paid' | 'pending' | 'failed' | 'refunded';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'cash';

export interface FamilyMember {
  id: string;
  name: string;
  relation: Relation;
  age: number;
  status: UserStatus;
  avatar?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  doctorName: string;
  doctorSpecialty: string;
  type: AppointmentType;
  status: AppointmentStatus;
  date: string;
  time: string;
  notes?: string;
  location?: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  itemName: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  date: string;
  invoiceNumber: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  plan: SubscriptionPlan;
  role: UserRole;
  avatar?: string;
  dateJoined: string;
  lastActive: string;
  city: string;
  state: string;
  bloodGroup?: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  familyMembers: FamilyMember[];
  appointmentCount: number;
  totalSpend: number;
  notes?: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  upcomingAppointments: number;
  totalRevenue: number;
  newUsersThisWeek: number;
}

export type TabId = 'profile' | 'family' | 'orders' | 'appointments';
