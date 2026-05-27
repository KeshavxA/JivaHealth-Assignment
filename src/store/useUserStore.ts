import { create } from 'zustand';
import type { User, FamilyMember, Address, Order } from '../types';
import { mockUsers } from '../data/mockUsers';

interface UserStore {
  users: User[];
  searchQuery: string;
  statusFilter: 'All' | 'Active' | 'Inactive';
  setSearchQuery: (q: string) => void;
  setStatusFilter: (f: 'All' | 'Active' | 'Inactive') => void;
  addUser: (user: Omit<User, 'id' | 'orders' | 'payments' | 'familyMembers' | 'addresses'>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  updateUserStatus: (id: string, status: 'Active' | 'Inactive') => void;
  addFamilyMember: (userId: string, member: Omit<FamilyMember, 'id'>) => void;
  updateFamilyMember: (userId: string, memberId: string, data: Partial<FamilyMember>) => void;
  deleteFamilyMember: (userId: string, memberId: string) => void;
  addAddress: (userId: string, address: Omit<Address, 'id'>) => void;
  updateAddress: (userId: string, addressId: string, data: Partial<Address>) => void;
  deleteAddress: (userId: string, addressId: string) => void;
  upgradeUserToPrime: (userId: string) => void;
  updateOrderStatus: (userId: string, orderId: string, status: Order['status']) => void;
  getFilteredUsers: () => User[];
  getSummaryStats: () => {
    total: number;
    prime: number;
    nonPrime: number;
    totalFamilyMembers: number;
  };
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: mockUsers,
  searchQuery: '',
  statusFilter: 'All',

  setSearchQuery: (q) => set({ searchQuery: q }),
  setStatusFilter: (f) => set({ statusFilter: f }),

  addUser: (userData) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          ...userData,
          id: Date.now().toString(),
          orders: [],
          payments: [],
          familyMembers: [],
          addresses: [
            {
              id: 'a' + Date.now(),
              type: 'Home',
              isDefault: true,
              line1: '',
              city: '',
              state: '',
              pincode: '',
              country: 'India',
            },
          ],
        },
      ],
    })),

  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
    })),

  updateUserStatus: (id, status) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, status } : u)),
    })),

  addFamilyMember: (userId, member) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? {
              ...u,
              familyMembers: [...u.familyMembers, { ...member, id: Date.now().toString() }],
              totalFamilyMembers: u.totalFamilyMembers + 1,
            }
          : u
      ),
    })),

  updateFamilyMember: (userId, memberId, data) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? {
              ...u,
              familyMembers: u.familyMembers.map((m) =>
                m.id === memberId ? { ...m, ...data } : m
              ),
            }
          : u
      ),
    })),

  deleteFamilyMember: (userId, memberId) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? {
              ...u,
              familyMembers: u.familyMembers.filter((m) => m.id !== memberId),
              totalFamilyMembers: Math.max(0, u.totalFamilyMembers - 1),
            }
          : u
      ),
    })),

  addAddress: (userId, address) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? { ...u, addresses: [...u.addresses, { ...address, id: Date.now().toString() }] }
          : u
      ),
    })),

  updateAddress: (userId, addressId, data) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? {
              ...u,
              addresses: u.addresses.map((a) =>
                a.id === addressId ? { ...a, ...data } : a
              ),
            }
          : u
      ),
    })),

  deleteAddress: (userId, addressId) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? { ...u, addresses: u.addresses.filter((a) => a.id !== addressId) }
          : u
      ),
    })),

  upgradeUserToPrime: (userId) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, tier: 'Prime User' } : u
      ),
    })),

  updateOrderStatus: (userId, orderId, status) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? {
              ...u,
              orders: u.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
            }
          : u
      ),
    })),

  getFilteredUsers: () => {
    const { users, searchQuery, statusFilter } = get();
    return users.filter((u) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === '' ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q);
      const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  },

  getSummaryStats: () => {
    const { users } = get();
    return {
      total: users.length,
      prime: users.filter((u) => u.tier === 'Prime User').length,
      nonPrime: users.filter((u) => u.tier === 'Normal User').length,
      // Derive from actual arrays — always accurate even after add/delete
      totalFamilyMembers: users.reduce((sum, u) => sum + u.familyMembers.length, 0),
    };
  },
}));
