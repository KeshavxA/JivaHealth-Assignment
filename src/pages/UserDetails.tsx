import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Crown, UserX, UserCheck, MapPin, Phone, Mail, Droplet, User, Calendar, CreditCard } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card } from '../components/shared/Card';
import { Badge } from '../components/shared/Badge';
import { Modal } from '../components/shared/Modal';
import { UserProfileTab } from '../components/users/UserProfileTab';
import { FamilyMembersTab } from '../components/users/FamilyMembersTab';
import { OrdersPaymentsTab } from '../components/users/OrdersPaymentsTab';
import { AppointmentsTab } from '../components/users/AppointmentsTab';
import type { TabId } from '../types';
import clsx from 'clsx';

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'family', label: 'Family Members', icon: User },
  { id: 'orders', label: 'Orders & Payments', icon: CreditCard },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
];

export function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, updateUser, deleteUser, orders } = useStore();

  const user = users.find((u) => u.id === id);
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!user) {
    return (
      <div className="p-6 text-center py-20">
        <p className="text-gray-400 text-lg">User not found.</p>
        <button onClick={() => navigate('/users')} className="mt-4 px-4 py-2 text-sm text-[#2D7A3A] border border-[#2D7A3A]/30 rounded-xl hover:bg-[#F0FDF4]">
          Back to Users
        </button>
      </div>
    );
  }

  const userOrders = orders.filter((o) => o.userId === user.id);
  const totalPaid = userOrders.filter((o) => o.status === 'paid').reduce((sum, o) => sum + o.amount, 0);

  const handleDelete = () => {
    deleteUser(user.id);
    navigate('/users');
  };

  const handleUpgrade = () => {
    updateUser(user.id, { plan: user.plan === 'premium' ? 'free' : 'premium' });
  };

  const handleToggleStatus = () => {
    updateUser(user.id, { status: user.status === 'active' ? 'inactive' : 'active' });
  };

  return (
    <div className="p-6 space-y-5 animate-fade-in">

      <div className="flex items-center gap-2 text-sm">
        <button onClick={() => navigate('/users')} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Users
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">{user.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">

        <div className="space-y-4">
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover shadow-md" />
                <span
                  className={clsx(
                    'absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 border-white',
                    user.status === 'active' ? 'bg-[#16A34A]' : 'bg-[#DC2626]'
                  )}
                />
              </div>
              <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{user.city}, {user.state}</p>
              <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
                <Badge variant={user.status} dot />
                <Badge variant={user.plan} />
                {user.role === 'admin' && <Badge variant="admin" />}
              </div>

              <div className="w-full mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-xl font-bold text-[#16A34A]">{user.appointmentCount}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Appts</p>
                </div>
                <div className="text-center border-x border-gray-100">
                  <p className="text-xl font-bold text-gray-900">{user.familyMembers.length}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Family</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">₹{(totalPaid / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-400 mt-0.5">Spend</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Contact Info</h3>
            <div className="space-y-3">
              {[
                { icon: Mail, label: user.email },
                { icon: Phone, label: user.phone },
                { icon: MapPin, label: `${user.city}, ${user.state}` },
                { icon: Droplet, label: user.bloodGroup ?? 'N/A' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate">{label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button
                id="btn-upgrade-plan"
                onClick={handleUpgrade}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: user.plan === 'premium' ? '#F9FAFB' : 'linear-gradient(135deg, #F59E0B, #D97706)',
                  color: user.plan === 'premium' ? '#6B7280' : 'white',
                  border: user.plan === 'premium' ? '1px solid #E5E7EB' : 'none',
                }}
              >
                <Crown className="w-4 h-4 flex-shrink-0" />
                {user.plan === 'premium' ? 'Downgrade to Free' : 'Upgrade to Premium'}
              </button>

              <button
                id="btn-toggle-status"
                onClick={handleToggleStatus}
                className={clsx(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border',
                  user.status === 'active'
                    ? 'border-red-100 text-[#DC2626] hover:bg-red-50'
                    : 'border-[#16A34A]/30 text-[#16A34A] hover:bg-[#F0FDF4]'
                )}
              >
                {user.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                {user.status === 'active' ? 'Deactivate User' : 'Activate User'}
              </button>

              <button
                id="btn-delete-user-profile"
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium border border-red-100 text-[#DC2626] hover:bg-red-50 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Delete User
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Tab Bar */}
          <div className="flex border-b border-gray-200 bg-white rounded-t-2xl overflow-hidden">
            {TABS.map(({ id: tabId, label, icon: Icon }) => (
              <button
                key={tabId}
                id={`tab-${tabId}`}
                onClick={() => setActiveTab(tabId)}
                className={clsx(
                  'flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all relative border-b-2',
                  activeTab === tabId
                    ? 'text-[#2D7A3A] border-[#2D7A3A]'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
                {tabId === 'family' && user.familyMembers.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#F0FDF4] text-[#2D7A3A] text-xs flex items-center justify-center font-bold">
                    {user.familyMembers.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="animate-fade-in">
            {activeTab === 'profile' && <UserProfileTab user={user} />}
            {activeTab === 'family' && <FamilyMembersTab user={user} />}
            {activeTab === 'orders' && <OrdersPaymentsTab userId={user.id} />}
            {activeTab === 'appointments' && <AppointmentsTab userId={user.id} />}
          </div>
        </div>
      </div>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete User" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to permanently delete <strong>{user.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button id="btn-confirm-delete-profile" onClick={handleDelete} className="px-4 py-2 text-sm font-semibold text-white bg-[#DC2626] rounded-xl hover:bg-red-700 transition-colors">Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
