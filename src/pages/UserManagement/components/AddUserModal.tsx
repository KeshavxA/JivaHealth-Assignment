import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { useUserStore } from '../../../store/useUserStore';
import type { User, UserStatus, SubscriptionPlan, UserRole } from '../../../types';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_FORM = {
  name: '', email: '', phone: '', city: '', state: '',
  age: '', gender: 'female' as User['gender'],
  status: 'active' as UserStatus,
  plan: 'free' as SubscriptionPlan,
  role: 'user' as UserRole,
  bloodGroup: '', notes: '',
};

const cls =
  'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 ' +
  'focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]';

export function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  const { addUser } = useUserStore();
  const [form, setForm] = useState(INITIAL_FORM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      ...form,
      age: Number(form.age),
      dateJoined: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=2D7A3A&color=ffffff&bold=true`,
    });
    setForm(INITIAL_FORM);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New User" size="lg" id="modal-add-user">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {([
            { name: 'name',       label: 'Full Name',     type: 'text',   required: true },
            { name: 'email',      label: 'Email Address', type: 'email',  required: true },
            { name: 'phone',      label: 'Phone Number',  type: 'text',   required: true },
            { name: 'age',        label: 'Age',           type: 'number', required: true },
            { name: 'city',       label: 'City',          type: 'text',   required: true },
            { name: 'state',      label: 'State',         type: 'text',   required: true },
            { name: 'bloodGroup', label: 'Blood Group',   type: 'text',   required: false },
            { name: 'notes',      label: 'Notes',         type: 'text',   required: false },
          ] as const).map(({ name, label, type, required }) => (
            <div key={name} className={name === 'notes' ? 'col-span-2' : ''}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {label}{required && <span className="text-red-400 ml-0.5">*</span>}
              </label>
              <input
                id={`input-add-${name}`}
                type={type}
                required={required}
                value={(form as any)[name]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                className={cls}
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender <span className="text-red-400">*</span></label>
            <select id="select-add-gender" value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value as User['gender'] })} className={cls}>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
            <select id="select-add-status" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as UserStatus })} className={cls}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Subscription Plan</label>
            <select id="select-add-plan" value={form.plan}
              onChange={(e) => setForm({ ...form, plan: e.target.value as SubscriptionPlan })} className={cls}>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" id="btn-submit-add-user">Add User</Button>
        </div>
      </form>
    </Modal>
  );
}
