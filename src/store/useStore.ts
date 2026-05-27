import { create } from 'zustand';
import type { User, Appointment, Order, FamilyMember } from '../types';
import { MOCK_USERS, MOCK_APPOINTMENTS, MOCK_ORDERS } from '../utils/mockData';

interface AppState {

  users: User[];
  appointments: Appointment[];
  orders: Order[];

  sidebarCollapsed: boolean;
  searchQuery: string;
  selectedUserId: string | null;

  addUser: (user: Omit<User, 'id' | 'familyMembers' | 'appointmentCount' | 'totalSpend'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;

  addFamilyMember: (userId: string, member: Omit<FamilyMember, 'id'>) => void;
  updateFamilyMember: (userId: string, memberId: string, updates: Partial<FamilyMember>) => void;
  deleteFamilyMember: (userId: string, memberId: string) => void;

  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;

  addOrder: (order: Omit<Order, 'id' | 'invoiceNumber'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;

  setSidebarCollapsed: (collapsed: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedUserId: (id: string | null) => void;
}

const genId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useStore = create<AppState>((set, get) => ({
  users: MOCK_USERS,
  appointments: MOCK_APPOINTMENTS,
  orders: MOCK_ORDERS,
  sidebarCollapsed: false,
  searchQuery: '',
  selectedUserId: null,

  addUser: (userData) => {
    const newUser: User = {
      ...userData,
      id: genId(),
      familyMembers: [],
      appointmentCount: 0,
      totalSpend: 0,
    };
    set((state) => ({ users: [...state.users, newUser] }));
  },

  updateUser: (id, updates) => {
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    }));
  },

  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
      appointments: state.appointments.filter((a) => a.userId !== id),
      orders: state.orders.filter((o) => o.userId !== id),
    }));
  },

  addFamilyMember: (userId, memberData) => {
    const newMember: FamilyMember = { ...memberData, id: genId() };
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? { ...u, familyMembers: [...u.familyMembers, newMember] }
          : u
      ),
    }));
  },

  updateFamilyMember: (userId, memberId, updates) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? {
            ...u,
            familyMembers: u.familyMembers.map((fm) =>
              fm.id === memberId ? { ...fm, ...updates } : fm
            ),
          }
          : u
      ),
    }));
  },

  deleteFamilyMember: (userId, memberId) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? { ...u, familyMembers: u.familyMembers.filter((fm) => fm.id !== memberId) }
          : u
      ),
    }));
  },

  addAppointment: (apptData) => {
    const newAppt: Appointment = { ...apptData, id: genId() };
    set((state) => {
      const users = state.users.map((u) =>
        u.id === apptData.userId ? { ...u, appointmentCount: u.appointmentCount + 1 } : u
      );
      return { appointments: [...state.appointments, newAppt], users };
    });
  },

  updateAppointment: (id, updates) => {
    set((state) => ({
      appointments: state.appointments.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }));
  },

  deleteAppointment: (id) => {
    const appt = get().appointments.find((a) => a.id === id);
    set((state) => {
      const appointments = state.appointments.filter((a) => a.id !== id);
      const users = appt
        ? state.users.map((u) =>
          u.id === appt.userId
            ? { ...u, appointmentCount: Math.max(0, u.appointmentCount - 1) }
            : u
        )
        : state.users;
      return { appointments, users };
    });
  },

  addOrder: (orderData) => {
    const invoiceNumber = `INV-${Date.now()}`;
    const newOrder: Order = { ...orderData, id: genId(), invoiceNumber };
    set((state) => {
      const users = state.users.map((u) =>
        u.id === orderData.userId && orderData.status === 'paid'
          ? { ...u, totalSpend: u.totalSpend + orderData.amount }
          : u
      );
      return { orders: [...state.orders, newOrder], users };
    });
  },

  updateOrder: (id, updates) => {
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, ...updates } : o)),
    }));
  },

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedUserId: (id) => set({ selectedUserId: id }),
}));
