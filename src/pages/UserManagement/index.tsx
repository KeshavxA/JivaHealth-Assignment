import { useState } from 'react';
import { Users as UsersIcon, Star, UserCheck, Heart, Plus } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { UserCard } from './components/UserCard';
import { AddUserModal } from './components/AddUserModal';
import { EditUserModal } from './components/EditUserModal';
import { SearchBar } from '../../components/ui/SearchBar';
import { FilterDropdown } from '../../components/ui/FilterDropdown';
import type { User } from '../../types';

const STATUS_OPTIONS = [
    { value: 'All', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
];

const ROLE_OPTIONS = [
    { value: 'All', label: 'All Roles' },
    { value: 'Patient', label: 'Patient' },
    { value: 'Nurse', label: 'Nurse' },
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Support Staff', label: 'Support Staff' },
];

export function Users() {
    const { searchQuery, statusFilter, setSearchQuery, setStatusFilter, getFilteredUsers, getSummaryStats, upgradeUserToPrime } =
        useUserStore();
    const [roleFilter, setRoleFilter] = useState('All');
    const [addOpen, setAddOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);

    const stats = getSummaryStats();
    const filtered = getFilteredUsers().filter(
        (u) => roleFilter === 'All' || u.role === roleFilter
    );

    const STAT_CARDS = [
        { label: 'Total User', value: stats.total, icon: <UsersIcon className="w-5 h-5" />, bg: 'bg-green-50', color: 'text-green-600' },
        { label: 'Prime User', value: stats.prime, icon: <Star className="w-5 h-5" />, bg: 'bg-amber-50', color: 'text-amber-600' },
        { label: 'Non-Prime User', value: stats.nonPrime, icon: <UserCheck className="w-5 h-5" />, bg: 'bg-blue-50', color: 'text-blue-600' },
        { label: 'Total Family Members', value: stats.totalFamilyMembers, icon: <Heart className="w-5 h-5" />, bg: 'bg-purple-50', color: 'text-purple-600' },
    ];

    return (
        <div className="p-6 space-y-5">

            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">User Management</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Manage your users and their accounts</p>
                </div>
                <button
                    id="btn-add-user"
                    onClick={() => setAddOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold
            rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
                >
                    <Plus className="w-4 h-4" /> Add User
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {STAT_CARDS.map(({ label, value, icon, bg, color }) => (
                    <div key={label} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${bg} ${color}`}>
                            {icon}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">{label}</p>
                            <p className="text-2xl font-bold text-[#2D7A3A]">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3">
                <SearchBar
                    id="input-user-search"
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by name, email or phone..."
                    className="flex-1"
                />
                <FilterDropdown
                    id="filter-status"
                    value={statusFilter}
                    options={STATUS_OPTIONS}
                    onChange={(v) => setStatusFilter(v as 'All' | 'Active' | 'Inactive')}
                />
                <FilterDropdown
                    id="filter-role"
                    value={roleFilter}
                    options={ROLE_OPTIONS}
                    onChange={setRoleFilter}
                />
            </div>

            <p className="text-xs text-gray-400">
                Showing <span className="font-semibold text-gray-600">{filtered.length}</span> users
            </p>

            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <UsersIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
                        <p className="text-sm font-medium">No users found</p>
                    </div>
                ) : (
                    filtered.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onEdit={(u) => setEditUser(u)}
                            onUpgrade={upgradeUserToPrime}
                        />
                    ))
                )}
            </div>

            <AddUserModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
            {editUser && (
                <EditUserModal
                    user={editUser}
                    isOpen={!!editUser}
                    onClose={() => setEditUser(null)}
                />
            )}
        </div>
    );
}
