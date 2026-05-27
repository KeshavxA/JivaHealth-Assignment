import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
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

const cls = 'w-full px-3 py-2 text-[13px] rounded-lg text-gray-900 ' +
  'bg-[#F3F4F6] border border-transparent focus:outline-none focus:bg-white focus:border-[#2D7A3A] transition-colors';

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
    <Modal isOpen={isOpen} onClose={onClose} title="Add New User" size="xl" id="modal-add-user">
      <p className="text-[13px] text-gray-500 mb-5 -mt-3">Create a new user account with role and permissions</p>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-1.5">
              Full Name *
            </label>
            <input id="input-add-name" required type="text" value={form.name}
              onChange={(e) => f('name', e.target.value)} placeholder="e.g., John Smith" className={cls} />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-1.5">
              Email *
            </label>
            <input id="input-add-email" required type="email" value={form.email}
              onChange={(e) => f('email', e.target.value)} placeholder="john.smith@email.com" className={cls} />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-1.5">Phone Number</label>
            <input id="input-add-phone" type="text" value={form.phone}
              onChange={(e) => f('phone', e.target.value)} placeholder="+91 98765 43210" className={cls} />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-1.5">Date of Birth</label>
            <input id="input-add-dob" type="date" value={form.dob}
              onChange={(e) => f('dob', e.target.value)} className={cls} />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-1.5">Gender</label>
            <select id="select-add-gender" value={form.gender}
              onChange={(e) => f('gender', e.target.value as Gender)} className={cls}>
              <option value="" disabled>Select gender</option>
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
            <label className="block text-[13px] font-medium text-gray-900 mb-1.5">Blood Group</label>
            <select id="select-add-blood" value={form.bloodGroup}
              onChange={(e) => f('bloodGroup', e.target.value as BloodGroup)} className={cls}>
              <option value="" disabled>Select blood group</option>
              {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-gray-900 mb-1.5">Area Detail</label>
          <input id="input-add-line1" type="text" value={form.line1}
            onChange={(e) => f('line1', e.target.value)} placeholder="House/Flat No., Building Name, Street" className={cls} />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-1.5">Pin Code</label>
            <input id="input-add-pincode" type="text" maxLength={6} value={form.pincode}
              onChange={(e) => f('pincode', e.target.value)} placeholder="400001" className={cls} />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-1.5">City</label>
            <input id="input-add-city" type="text" value={form.city}
              onChange={(e) => f('city', e.target.value)} placeholder="Mumbai" className={cls} />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-1.5">State</label>
            <select id="select-add-state" value={form.state}
              onChange={(e) => f('state', e.target.value)} className={cls}>
              <option value="" disabled>Select state</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-1.5">Country</label>
            <input id="input-add-country" type="text" value={form.country}
              onChange={(e) => f('country', e.target.value)} className={`${cls} bg-white border-gray-200 focus:bg-white`} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 text-[13px] font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" id="btn-submit-add-user" className="px-4 py-2 text-[13px] font-medium text-white bg-[#2A3647] rounded-lg hover:bg-gray-800 transition-colors">
            Add User
          </button>
        </div>
      </form>
    </Modal>
  );
}
