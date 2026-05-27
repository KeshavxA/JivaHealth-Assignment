import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Calendar, Crown, ShoppingBag,
    Stethoscope, Users, CreditCard, ChevronDown, Activity, User
} from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { Avatar } from '../../components/ui/Avatar';
import { Badge, statusVariant } from '../../components/ui/Badge';
import { PageWrapper } from '../../components/ui/PageWrapper';
import { PersonalInfo } from './components/PersonalInfo';
import { AddressSection } from './components/AddressSection';
import { OrderHistory } from './components/OrderHistory';
import { PaymentHistory } from './components/PaymentHistory';
import { FamilyMembers } from './components/FamilyMembers';

type Tab = 'overview' | 'orders' | 'payments' | 'family';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <User className="w-[18px] h-[18px]" /> },
    { id: 'orders', label: 'Orders & Bookings', icon: <ShoppingBag className="w-[18px] h-[18px]" /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard className="w-[18px] h-[18px]" /> },
    { id: 'family', label: 'Family Members', icon: <Users className="w-[18px] h-[18px]" /> },
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

    const METRIC_CARDS = [
        {
            label: 'Total Orders',
            value: user.orders.length,
            icon: <ShoppingBag className="w-5 h-5 text-blue-600" />,
            iconBg: 'bg-blue-100',
            valueColor: 'text-gray-900',
        },
        {
            label: 'Total Booking & Appointment',
            value: user.appointments,
            icon: <Stethoscope className="w-5 h-5 text-[#2D7A3A]" />,
            iconBg: 'bg-[#A7D8C4] bg-opacity-60',
            valueColor: 'text-[#2D7A3A]',
        },
        {
            label: 'Total Family Member',
            value: user.familyMembers.length,
            icon: <Users className="w-5 h-5 text-blue-600" />,
            iconBg: null,
            valueColor: 'text-[#2D7A3A]',
        },
        {
            label: 'Total Spent',
            value: `₹${user.totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
            icon: <CreditCard className="w-5 h-5 text-[#2D7A3A]" />,
            iconBg: 'bg-[#D1FAE5]',
            valueColor: 'text-gray-900',
        },
    ];

    return (
        <PageWrapper>
        <div className="p-4 sm:p-6 space-y-5 max-w-6xl mx-auto">

            <button
                id="btn-back"
                onClick={() => navigate('/user-management')}
                className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-gray-900 transition-colors -ml-1"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to User Management
            </button>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
                    <Avatar name={user.name} size="xl" shape="circle" className="w-20 h-20 text-xl" />

                    <div className="flex-1 min-w-0">
                        <h2 className="text-[26px] font-semibold text-gray-900 leading-none">{user.name}</h2>
                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                            <Badge variant={statusVariant(user.status)}>{user.status}</Badge>
                            <Badge variant="outlined">{user.role}</Badge>
                            <Badge variant="outlined">{user.tier}</Badge>
                            <span className="text-[13px] text-gray-500 font-medium">ID: #{user.id}</span>
                        </div>
                        <div className="flex items-center gap-6 mt-3.5">
                            <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                Joined {fmtDate(user.joinedDate)}
                            </div>
                            <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                                <Activity className="w-4 h-4 text-gray-400" />
                                Last active {fmtDate(user.lastActive)}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 mt-4 sm:mt-0">
                        {user.tier !== 'Prime User' && (
                            <button
                                id="btn-detail-upgrade"
                                onClick={() => upgradeUserToPrime(user.id)}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white
                  transition-all hover:opacity-90"
                                style={{ backgroundColor: '#ED8936' }}
                            >
                                <Crown className="w-4 h-4" /> Upgrade to Prime
                            </button>
                        )}

                        <div className="relative w-full sm:w-auto" ref={statusRef}>
                            <button
                                id="btn-status-dropdown"
                                onClick={() => setStatusOpen((p) => !p)}
                                className="flex w-full sm:w-[130px] items-center justify-between gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-white border border-gray-200 transition-all hover:border-gray-300"
                            >
                                {user.status}
                                <ChevronDown className="w-4 h-4 text-gray-400" />
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

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {METRIC_CARDS.map(({ label, value, icon, iconBg, valueColor }) => (
                    <div key={label} className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[13px] text-gray-500 font-medium mb-1.5">{label}</p>
                            <p className={`text-[28px] font-semibold leading-none ${valueColor}`}>{value}</p>
                        </div>
                        {iconBg && (
                            <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                                {icon}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                <div className="flex border-b border-gray-200">
                    {TABS.map(({ id: tabId, label, icon }) => (
                        <button
                            key={tabId}
                            id={`tab-${tabId}`}
                            onClick={() => setActiveTab(tabId)}
                            className={`flex items-center gap-2 px-5 py-4 text-[13px] font-medium transition-all relative
                ${activeTab === tabId
                                    ? 'text-[#2D7A3A]'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {icon}
                            {label}
                            {activeTab === tabId && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D7A3A]" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-5">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        </PageWrapper>
    );
}
