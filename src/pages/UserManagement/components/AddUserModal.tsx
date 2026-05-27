import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { useUserStore } from '../../../store/useUserStore';
import type { UserRole, UserStatus, UserTier, BloodGroup, Gender } from '../../../types';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh',
];

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const ROLES: UserRole[] = ['Patient', 'Nurse', 'Doctor', 'Support Staff'];

const cls = 'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 ' +
  'focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A] bg-white';

const INITIAL = {
  name: '', email: '', phone: '', dob: '',
  gender: 'Male' as Gender, bloodGroup: 'O+' as BloodGroup,
  role: 'Patient' as UserRole, status: 'Active' as UserStatus,
  tier: 'Normal User' as UserTier,
  line1: '', pincode: '', city: '', state: 'Maharashtra', country: 'India',
  appointments: 0, totalOrders: 0, totalSpent: 0, totalFamilyMembers: 0,
};

export function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  const { addUser } = useUserStore();
  const [form, setForm] = useState(INITIAL);

  const f = (k: keyof typeof form, v: string | number) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      gender: form.gender,
      bloodGroup: form.bloodGroup,
      role: form.role,
      status: form.status,
      tier: form.tier,
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      appointments: form.appointments,
      totalOrders: form.totalOrders,
      totalSpent: form.totalSpent,
      totalFamilyMembers: form.totalFamilyMembers,
    });
    setForm(INITIAL);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add User" size="xl" id="modal-add-user">
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input id="input-add-name" required type="text" value={form.name}
              onChange={(e) => f('name', e.target.value)} placeholder="Enter full name" className={cls} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input id="input-add-email" required type="email" value={form.email}
              onChange={(e) => f('email', e.target.value)} placeholder="Enter email" className={cls} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
            <input id="input-add-phone" type="text" value={form.phone}
              onChange={(e) => f('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={cls} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth</label>
            <input id="input-add-dob" type="date" value={form.dob}
              onChange={(e) => f('dob', e.target.value)} className={cls} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender</label>
            <select id="select-add-gender" value={form.gender}
              onChange={(e) => f('gender', e.target.value as Gender)} className={cls}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option disabled>──────────</option>
              <option value="13-17 years">13–17 years</option>
              <option value="18-35 years">18–35 years</option>
              <option value="36-59 years">36–59 years</option>
              <option value="60+ years">60+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Blood Group</label>
            <select id="select-add-blood" value={form.bloodGroup}
              onChange={(e) => f('bloodGroup', e.target.value as BloodGroup)} className={cls}>
              {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Role</label>
            <select id="select-add-role" value={form.role}
              onChange={(e) => f('role', e.target.value as UserRole)} className={cls}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
            <select id="select-add-status" value={form.status}
              onChange={(e) => f('status', e.target.value as UserStatus)} className={cls}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Area Detail</label>
          <input id="input-add-line1" type="text" value={form.line1}
            onChange={(e) => f('line1', e.target.value)} placeholder="Flat / Building / Street" className={cls} />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Pin Code</label>
            <input id="input-add-pincode" type="text" maxLength={6} value={form.pincode}
              onChange={(e) => f('pincode', e.target.value)} placeholder="000000" className={cls} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">City</label>
            <input id="input-add-city" type="text" value={form.city}
              onChange={(e) => f('city', e.target.value)} placeholder="City" className={cls} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">State</label>
            <select id="select-add-state" value={form.state}
              onChange={(e) => f('state', e.target.value)} className={cls}>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Country</label>
            <input id="input-add-country" type="text" value={form.country}
              onChange={(e) => f('country', e.target.value)} className={cls} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" id="btn-submit-add-user">Add User</Button>
        </div>
      </form>
    </Modal>
  );
}
