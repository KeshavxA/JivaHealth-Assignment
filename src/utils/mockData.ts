// Local types for legacy dashboard/appointments/orders pages.
// These are NOT the canonical types — see src/types/index.ts for the new spec.
interface LegacyFamilyMember {
  id: string; name: string; relation: string; age: number; status: string; avatar: string;
}
interface LegacyUser {
  id: string; name: string; email: string; phone: string; status: string; plan: string;
  role: string; avatar: string; dateJoined: string; lastActive: string; city: string;
  state: string; bloodGroup: string; age: number; gender: string; appointmentCount: number;
  totalSpend: number; notes?: string; familyMembers: LegacyFamilyMember[];
}
interface Appointment {
  id: string; userId: string; userName: string; doctorName: string; doctorSpecialty: string;
  type: string; status: string; date: string; time: string; notes?: string; location?: string;
}
interface Order {
  id: string; userId: string; userName: string; itemName: string; amount: number;
  status: string; paymentMethod: string; date: string; invoiceNumber: string;
}
type User = LegacyUser;

const avatar = (name: string, bg: string, color: string = 'ffffff') =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=${color}&bold=true&size=128`;

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Jane Cooper',
    email: 'jane.cooper@email.com',
    phone: '+91 98765 43210',
    status: 'active',
    plan: 'premium',
    role: 'user',
    avatar: avatar('Jane Cooper', '2D7A3A'),
    dateJoined: '2023-03-15',
    lastActive: '2024-05-20',
    city: 'Mumbai',
    state: 'Maharashtra',
    bloodGroup: 'O+',
    age: 34,
    gender: 'female',
    appointmentCount: 3,
    totalSpend: 12500,
    notes: 'Premium subscriber, referred by Dr. Gupta.',
    familyMembers: [
      { id: 'fm1', name: 'Robert Cooper', relation: 'spouse', age: 37, status: 'active', avatar: avatar('Robert Cooper', '3B82F6') },
      { id: 'fm2', name: 'Lily Cooper', relation: 'child', age: 8, status: 'active', avatar: avatar('Lily Cooper', 'EC4899') },
      { id: 'fm3', name: 'Margaret Cooper', relation: 'parent', age: 64, status: 'active', avatar: avatar('Margaret Cooper', '8B5CF6') },
    ],
  },
  {
    id: 'u2',
    name: 'Cody Fisher',
    email: 'cody.fisher@email.com',
    phone: '+91 87654 32109',
    status: 'inactive',
    plan: 'free',
    role: 'user',
    avatar: avatar('Cody Fisher', 'DC2626'),
    dateJoined: '2023-06-22',
    lastActive: '2024-01-10',
    city: 'Bengaluru',
    state: 'Karnataka',
    bloodGroup: 'A+',
    age: 28,
    gender: 'male',
    appointmentCount: 0,
    totalSpend: 2200,
    notes: 'Inactive for 4 months. Follow-up needed.',
    familyMembers: [
      { id: 'fm4', name: 'Nina Fisher', relation: 'spouse', age: 26, status: 'active', avatar: avatar('Nina Fisher', 'F59E0B') },
    ],
  },
  {
    id: 'u3',
    name: 'Esther Howard',
    email: 'esther.howard@email.com',
    phone: '+91 76543 21098',
    status: 'active',
    plan: 'free',
    role: 'user',
    avatar: avatar('Esther Howard', '0EA5E9'),
    dateJoined: '2023-11-05',
    lastActive: '2024-05-25',
    city: 'Delhi',
    state: 'Delhi',
    bloodGroup: 'B-',
    age: 45,
    gender: 'female',
    appointmentCount: 1,
    totalSpend: 5800,
    familyMembers: [],
  },
  {
    id: 'u4',
    name: 'Jenny Wilson',
    email: 'jenny.wilson@email.com',
    phone: '+91 65432 10987',
    status: 'active',
    plan: 'premium',
    role: 'admin',
    avatar: avatar('Jenny Wilson', '7C3AED'),
    dateJoined: '2022-12-01',
    lastActive: '2024-05-27',
    city: 'Hyderabad',
    state: 'Telangana',
    bloodGroup: 'AB+',
    age: 31,
    gender: 'female',
    appointmentCount: 4,
    totalSpend: 28900,
    notes: 'Admin user. VIP Premium subscriber.',
    familyMembers: [
      { id: 'fm5', name: 'Tom Wilson', relation: 'spouse', age: 34, status: 'active', avatar: avatar('Tom Wilson', '0D9488') },
      { id: 'fm6', name: 'Emma Wilson', relation: 'child', age: 5, status: 'active', avatar: avatar('Emma Wilson', 'F43F5E') },
    ],
  },
  {
    id: 'u5',
    name: 'Brooklyn Simmons',
    email: 'brooklyn.s@email.com',
    phone: '+91 54321 09876',
    status: 'active',
    plan: 'free',
    role: 'user',
    avatar: avatar('Brooklyn Simmons', '059669'),
    dateJoined: '2024-01-18',
    lastActive: '2024-05-22',
    city: 'Chennai',
    state: 'Tamil Nadu',
    bloodGroup: 'O-',
    age: 22,
    gender: 'male',
    appointmentCount: 2,
    totalSpend: 3400,
    familyMembers: [
      { id: 'fm7', name: 'Sam Simmons', relation: 'parent', age: 55, status: 'active', avatar: avatar('Sam Simmons', '6366F1') },
    ],
  },
  {
    id: 'u6',
    name: 'Dianne Russell',
    email: 'dianne.r@email.com',
    phone: '+91 43210 98765',
    status: 'inactive',
    plan: 'premium',
    role: 'user',
    avatar: avatar('Dianne Russell', 'DB2777'),
    dateJoined: '2023-04-10',
    lastActive: '2023-12-30',
    city: 'Pune',
    state: 'Maharashtra',
    bloodGroup: 'A-',
    age: 39,
    gender: 'female',
    appointmentCount: 0,
    totalSpend: 9100,
    notes: 'Premium plan active but user has been inactive since December.',
    familyMembers: [],
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1', userId: 'u1', userName: 'Jane Cooper',
    doctorName: 'Dr. Arvind Sharma', doctorSpecialty: 'Cardiologist',
    type: 'checkup', status: 'scheduled',
    date: '2024-06-05', time: '10:00 AM',
    notes: 'Annual cardiac checkup. Bring previous ECG reports.',
    location: 'Jiva Clinic, Mumbai',
  },
  {
    id: 'a2', userId: 'u1', userName: 'Jane Cooper',
    doctorName: 'Dr. Priya Nair', doctorSpecialty: 'General Physician',
    type: 'follow-up', status: 'completed',
    date: '2024-05-15', time: '11:30 AM',
    notes: 'Follow-up after flu. Recovered.',
    location: 'Jiva Clinic, Mumbai',
  },
  {
    id: 'a3', userId: 'u1', userName: 'Jane Cooper',
    doctorName: 'Dr. Rohan Gupta', doctorSpecialty: 'Dermatologist',
    type: 'consultation', status: 'scheduled',
    date: '2024-06-12', time: '3:00 PM',
    location: 'Jiva Clinic, Mumbai',
  },
  {
    id: 'a4', userId: 'u3', userName: 'Esther Howard',
    doctorName: 'Dr. Mala Krishnan', doctorSpecialty: 'Orthopedist',
    type: 'telehealth', status: 'scheduled',
    date: '2024-06-08', time: '4:30 PM',
    notes: 'Knee pain consultation, online via app.',
  },
  {
    id: 'a5', userId: 'u4', userName: 'Jenny Wilson',
    doctorName: 'Dr. Arvind Sharma', doctorSpecialty: 'Cardiologist',
    type: 'consultation', status: 'scheduled',
    date: '2024-06-03', time: '9:00 AM',
    location: 'Jiva Clinic, Hyderabad',
  },
  {
    id: 'a6', userId: 'u4', userName: 'Jenny Wilson',
    doctorName: 'Dr. Sanjay Mehta', doctorSpecialty: 'Neurologist',
    type: 'follow-up', status: 'completed',
    date: '2024-05-10', time: '2:00 PM',
    location: 'Jiva Clinic, Hyderabad',
  },
  {
    id: 'a7', userId: 'u4', userName: 'Jenny Wilson',
    doctorName: 'Dr. Priya Nair', doctorSpecialty: 'General Physician',
    type: 'checkup', status: 'cancelled',
    date: '2024-05-20', time: '11:00 AM',
    notes: 'Cancelled by patient.',
  },
  {
    id: 'a8', userId: 'u4', userName: 'Jenny Wilson',
    doctorName: 'Dr. Anita Patel', doctorSpecialty: 'Gynecologist',
    type: 'telehealth', status: 'scheduled',
    date: '2024-06-15', time: '5:00 PM',
  },
  {
    id: 'a9', userId: 'u5', userName: 'Brooklyn Simmons',
    doctorName: 'Dr. Rohan Gupta', doctorSpecialty: 'Dermatologist',
    type: 'consultation', status: 'scheduled',
    date: '2024-06-10', time: '1:00 PM',
    location: 'Jiva Clinic, Chennai',
  },
  {
    id: 'a10', userId: 'u5', userName: 'Brooklyn Simmons',
    doctorName: 'Dr. Mala Krishnan', doctorSpecialty: 'Orthopedist',
    type: 'follow-up', status: 'completed',
    date: '2024-05-08', time: '10:30 AM',
    location: 'Jiva Clinic, Chennai',
  },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'o1', userId: 'u1', userName: 'Jane Cooper', itemName: 'Premium Health Plan - Monthly', amount: 2999, status: 'paid', paymentMethod: 'credit_card', date: '2024-05-01', invoiceNumber: 'INV-2024-001' },
  { id: 'o2', userId: 'u1', userName: 'Jane Cooper', itemName: 'Cardiac Consultation Fee', amount: 1500, status: 'paid', paymentMethod: 'upi', date: '2024-05-15', invoiceNumber: 'INV-2024-002' },
  { id: 'o3', userId: 'u1', userName: 'Jane Cooper', itemName: 'Blood Test Package', amount: 850, status: 'pending', paymentMethod: 'net_banking', date: '2024-05-22', invoiceNumber: 'INV-2024-003' },
  { id: 'o4', userId: 'u2', userName: 'Cody Fisher', itemName: 'General Consultation', amount: 500, status: 'paid', paymentMethod: 'cash', date: '2024-01-08', invoiceNumber: 'INV-2024-004' },
  { id: 'o5', userId: 'u3', userName: 'Esther Howard', itemName: 'X-Ray + Report', amount: 1200, status: 'paid', paymentMethod: 'debit_card', date: '2024-04-20', invoiceNumber: 'INV-2024-005' },
  { id: 'o6', userId: 'u3', userName: 'Esther Howard', itemName: 'Orthopedic Consultation', amount: 800, status: 'pending', paymentMethod: 'upi', date: '2024-05-28', invoiceNumber: 'INV-2024-006' },
  { id: 'o7', userId: 'u4', userName: 'Jenny Wilson', itemName: 'Premium Health Plan - Annual', amount: 24999, status: 'paid', paymentMethod: 'credit_card', date: '2023-12-01', invoiceNumber: 'INV-2024-007' },
  { id: 'o8', userId: 'u4', userName: 'Jenny Wilson', itemName: 'Neurology Consultation', amount: 2000, status: 'paid', paymentMethod: 'upi', date: '2024-05-10', invoiceNumber: 'INV-2024-008' },
  { id: 'o9', userId: 'u4', userName: 'Jenny Wilson', itemName: 'Full Body Checkup Package', amount: 3500, status: 'paid', paymentMethod: 'credit_card', date: '2024-03-15', invoiceNumber: 'INV-2024-009' },
  { id: 'o10', userId: 'u4', userName: 'Jenny Wilson', itemName: 'Pharmacy - Prescription', amount: 450, status: 'failed', paymentMethod: 'net_banking', date: '2024-05-20', invoiceNumber: 'INV-2024-010' },
  { id: 'o11', userId: 'u4', userName: 'Jenny Wilson', itemName: 'Tele-consultation Pack (5 sessions)', amount: 1999, status: 'paid', paymentMethod: 'credit_card', date: '2024-04-01', invoiceNumber: 'INV-2024-011' },
  { id: 'o12', userId: 'u5', userName: 'Brooklyn Simmons', itemName: 'Dermatology Consultation', amount: 700, status: 'paid', paymentMethod: 'upi', date: '2024-05-18', invoiceNumber: 'INV-2024-012' },
  { id: 'o13', userId: 'u5', userName: 'Brooklyn Simmons', itemName: 'Skin Care Medicine Pack', amount: 1200, status: 'pending', paymentMethod: 'debit_card', date: '2024-05-26', invoiceNumber: 'INV-2024-013' },
  { id: 'o14', userId: 'u6', userName: 'Dianne Russell', itemName: 'Premium Health Plan - Monthly', amount: 2999, status: 'paid', paymentMethod: 'credit_card', date: '2023-12-10', invoiceNumber: 'INV-2024-014' },
];

export interface Activity {
  id: string;
  type: 'user_added' | 'appointment_booked' | 'order_placed' | 'user_upgraded';
  message: string;
  timestamp: string;
  avatar: string;
}

export const MOCK_ACTIVITY: Activity[] = [
  { id: 'act1', type: 'user_added', message: 'Brooklyn Simmons joined as a new user', timestamp: '2 hours ago', avatar: avatar('Brooklyn Simmons', '059669') },
  { id: 'act2', type: 'appointment_booked', message: 'Jane Cooper booked a Cardiac Checkup', timestamp: '4 hours ago', avatar: avatar('Jane Cooper', '2D7A3A') },
  { id: 'act3', type: 'order_placed', message: 'Jenny Wilson renewed Annual Premium Plan', timestamp: '1 day ago', avatar: avatar('Jenny Wilson', '7C3AED') },
  { id: 'act4', type: 'user_upgraded', message: 'Esther Howard upgraded to Premium', timestamp: '2 days ago', avatar: avatar('Esther Howard', '0EA5E9') },
  { id: 'act5', type: 'appointment_booked', message: 'Brooklyn Simmons scheduled Dermatology consultation', timestamp: '2 days ago', avatar: avatar('Brooklyn Simmons', '059669') },
  { id: 'act6', type: 'order_placed', message: 'Cody Fisher completed a General Consultation order', timestamp: '3 days ago', avatar: avatar('Cody Fisher', 'DC2626') },
];

export const APPOINTMENT_TREND = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 18 },
  { month: 'Mar', count: 15 },
  { month: 'Apr', count: 22 },
  { month: 'May', count: 28 },
  { month: 'Jun', count: 35 },
];

export const REVENUE_TREND = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 62000 },
  { month: 'Mar', revenue: 58000 },
  { month: 'Apr', revenue: 75000 },
  { month: 'May', revenue: 89000 },
  { month: 'Jun', revenue: 95000 },
];
