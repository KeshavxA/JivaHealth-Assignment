import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Calendar, Zap, Crown, ShoppingBag,
    Stethoscope, Users, CreditCard, ChevronDown,
} from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { Avatar } from '../../components/ui/Avatar';
import { Badge, statusVariant, roleVariant, tierVariant } from '../../components/ui/Badge';
import { PersonalInfo } from './components/PersonalInfo';
import { AddressSection } from './components/AddressSection';
import { OrderHistory } from './components/OrderHistory';
import { PaymentHistory } from './components/PaymentHistory';
import { FamilyMembers } from './components/FamilyMembers';

type Tab = 'overview' | 'orders' | 'payments' | 'family';

const TABS: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders & Bookings' },
    { id: 'payments', label: 'Payments' },
    { id: 'family', label: 'Family Members' },
];

function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'numeric', year: 'numeric',
    });
}

export function UserDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { users, upgradeUserToPrime, updateUserStatus } = useUserStore();
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [statusOpen, setStatusOpen] = useState(false);
    const statusRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        if (!statusOpen) return;
        const handler = (e: MouseEvent) => {
            if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
                setStatusOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [statusOpen]);

    const user = users.find((u) => u.id === id);
    // store.find gives a reactive reference — any updateUser call re-renders this component

    if (!user) {
        return (
            <div className="p-8 text-center text-gray-500">
                <p>User not found.</p>
                <button onClick={() => navigate('/user-management')} className="mt-3 text-sm text-[#2D7A3A] hover:underline">
                    ← Back to User Management
                </button>
            </div>
        );
    }

    const metricCards = [
        {
            label: 'Total Orders',
            value: user.orders.length,
            icon: <ShoppingBag className="w-5 h-5 text-teal-600" />,
            bg: 'bg-teal-50',
        },
        {
            label: 'Total Booking & Appointment',
            value: user.appointments,
            icon: <Stethoscope className="w-5 h-5 text-[#2D7A3A]" />,
            bg: 'bg-[#F0FDF4]',
        },
        {
            // Derived live from familyMembers array — updates immediately on add/delete
            label: 'Total Family Member',
            value: user.familyMembers.length,
            icon: <Users className="w-5 h-5 text-blue-600" />,
            bg: 'bg-blue-50',
        },
        {
            label: 'Total Spent',
            value: `₹${user.totalSpent.toLocaleString('en-IN')}`,
            icon: <CreditCard className="w-5 h-5 text-[#2D7A3A]" />,
            bg: 'bg-[#F0FDF4]',
        },
    ];

    return (
        <div className="p-6 space-y-5 max-w-6xl mx-auto">

            <button
                id="btn-back"
                onClick={() => navigate('/user-management')}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to User Management
            </button>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-start gap-5">

                    <Avatar name={user.name} size="xl" shape="circle" statusDot={user.status === 'Active' ? 'active' : 'inactive'} />

                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant={statusVariant(user.status)} dot>{user.status}</Badge>
                            <span className="text-xs text-gray-400">|</span>
                            <Badge variant={roleVariant(user.role)}>{user.role}</Badge>
                            <span className="text-xs text-gray-400">|</span>
                            <Badge variant={tierVariant(user.tier)}>{user.tier}</Badge>
                            <span className="text-xs text-gray-400">|</span>
                            <span className="text-xs text-gray-500 font-medium">ID: #{user.id}</span>
                        </div>
                        <div className="flex items-center gap-5 mt-3">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                Joined {fmtDate(user.joinedDate)}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Zap className="w-3.5 h-3.5 text-gray-400" />
                                Last active {fmtDate(user.lastActive)}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                        {user.tier !== 'Prime User' && (
                            <button
                                id="btn-detail-upgrade"
                                onClick={() => upgradeUserToPrime(user.id)}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white
                  transition-all hover:opacity-90"
                                style={{ backgroundColor: '#F59E0B' }}
                            >
                                <Crown className="w-4 h-4" /> Upgrade to Prime
                            </button>
                        )}

                        <div className="relative" ref={statusRef}>
                            <button
                                id="btn-status-dropdown"
                                onClick={() => setStatusOpen((p) => !p)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all
                  ${user.status === 'Active'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-red-50 text-red-700 border-red-200'
                                    }`}
                            >
                                <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                {user.status}
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${statusOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {statusOpen && (
                                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-30 min-w-[160px] overflow-hidden py-1">
                                    {(['Active', 'Inactive'] as const).map((s) => (
                                        <button
                                            key={s}
                                            id={`btn-set-status-${s.toLowerCase()}`}
                                            onClick={() => {
                                                updateUserStatus(user.id, s);
                                                setStatusOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className={user.status === s ? 'font-semibold text-gray-900' : 'text-gray-600'}>{s}</span>
                                            {user.status === s && (
                                                <span className="ml-auto text-[#2D7A3A] font-bold text-base leading-none">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {metricCards.map(({ label, value, icon, bg }) => (
                    <div key={label} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                            {icon}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-400 leading-tight">{label}</p>
                            <p className="text-xl font-bold text-gray-900 mt-0.5">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                <div className="flex border-b border-gray-200">
                    {TABS.map(({ id: tabId, label }) => (
                        <button
                            key={tabId}
                            id={`tab-${tabId}`}
                            onClick={() => setActiveTab(tabId)}
                            className={`px-5 py-3.5 text-sm font-medium transition-all relative
                ${activeTab === tabId
                                    ? 'text-[#2D7A3A]'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {label}
                            {activeTab === tabId && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D7A3A]" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-5">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-2 gap-5">
                            <PersonalInfo user={user} />
                            <AddressSection user={user} />
                        </div>
                    )}
                    {activeTab === 'orders' && <OrderHistory user={user} />}
                    {activeTab === 'payments' && <PaymentHistory user={user} />}
                    {activeTab === 'family' && <FamilyMembers user={user} />}
                </div>
            </div>
        </div>
    );
}
