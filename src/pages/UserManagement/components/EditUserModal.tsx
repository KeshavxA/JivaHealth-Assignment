import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { useUserStore } from '../../../store/useUserStore';
import type { User, UserStatus, SubscriptionPlan } from '../../../types';

interface EditUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const cls =
  'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 ' +
  'focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]';

export function EditUserModal({ user, isOpen, onClose }: EditUserModalProps) {
  const { updateUser } = useUserStore();

  const [form, setForm] = useState({
    name:       user.name,
    email:      user.email,
    phone:      user.phone,
    city:       user.city,
    state:      user.state,
    age:        String(user.age),
    bloodGroup: user.bloodGroup ?? '',
    status:     user.status,
    plan:       user.plan,
    notes:      user.notes ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(user.id, {
      name:       form.name,
      email:      form.email,
      phone:      form.phone,
      city:       form.city,
      state:      form.state,
      age:        Number(form.age),
      bloodGroup: form.bloodGroup || undefined,
      status:     form.status as UserStatus,
      plan:       form.plan as SubscriptionPlan,
      notes:      form.notes || undefined,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User" size="lg" id="modal-edit-user">
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
          ] as const).map(({ name, label, type, required }) => (
            <div key={name}>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {label}{required && <span className="text-red-400 ml-0.5">*</span>}
              </label>
              <input
                id={`input-edit-${name}`}
                type={type}
                required={required}
                value={(form as any)[name]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                className={cls}
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
            <select id="select-edit-status" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as UserStatus })} className={cls}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Subscription Plan</label>
            <select id="select-edit-plan" value={form.plan}
              onChange={(e) => setForm({ ...form, plan: e.target.value as SubscriptionPlan })} className={cls}>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Notes</label>
          <textarea
            id="input-edit-notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            placeholder="Admin notes…"
            className={`${cls} resize-none`}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" id="btn-submit-edit-user">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
}
