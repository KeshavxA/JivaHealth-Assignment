export type UserRole = 'Patient' | 'Nurse' | 'Doctor' | 'Support Staff';
export type UserStatus = 'Active' | 'Inactive';
export type UserTier = 'Normal User' | 'Prime User';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
export type Gender = 'Male' | 'Female' | 'Other';

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  dob: string;
  gender?: Gender;
}

export interface Order {
  id: string;
  orderId: string;
  date: string;
  items: string;
  amount: number;
  status: 'Delivered' | 'Pending' | 'Cancelled' | 'Processing';
}

export interface Payment {
  id: string;
  paymentId: string;
  date: string;
  description: string;
  amount: number;
  method: 'Card' | 'UPI' | 'Cash' | 'Net Banking';
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  tier: UserTier;
  joinedDate: string;
  lastActive: string;
  appointments: number;
  totalOrders: number;
  totalSpent: number;
  totalFamilyMembers: number;
  dob: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  addresses: Address[];
  familyMembers: FamilyMember[];
  orders: Order[];
  payments: Payment[];
}
