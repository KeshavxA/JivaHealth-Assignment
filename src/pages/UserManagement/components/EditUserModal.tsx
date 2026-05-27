import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { useUserStore } from '../../../store/useUserStore';
import type { User, UserRole, UserStatus, BloodGroup, Gender } from '../../../types';

interface EditUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const ROLES: UserRole[] = ['Patient', 'Nurse', 'Doctor', 'Support Staff'];

const cls = 'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 ' +
  'focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A] bg-white';

export function EditUserModal({ user, isOpen, onClose }: EditUserModalProps) {
  const { updateUser } = useUserStore();

  const [form, setForm] = useState({
    name: user.name, email: user.email, phone: user.phone, dob: user.dob,
    gender: user.gender, bloodGroup: user.bloodGroup, role: user.role, status: user.status,
  });

  useEffect(() => {
    setForm({
      name: user.name, email: user.email, phone: user.phone, dob: user.dob,
      gender: user.gender, bloodGroup: user.bloodGroup, role: user.role, status: user.status,
    });
  }, [user]);

  const f = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(user.id, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      gender: form.gender as Gender,
      bloodGroup: form.bloodGroup as BloodGroup,
      role: form.role as UserRole,
      status: form.status as UserStatus,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User" size="lg" id="modal-edit-user">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name <span className="text-red-400">*</span></label>
            <input id="input-edit-name" required type="text" value={form.name}
              onChange={(e) => f('name', e.target.value)} className={cls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Email <span className="text-red-400">*</span></label>
            <input id="input-edit-email" required type="email" value={form.email}
              onChange={(e) => f('email', e.target.value)} className={cls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
            <input id="input-edit-phone" type="text" value={form.phone}
              onChange={(e) => f('phone', e.target.value)} className={cls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth</label>
            <input id="input-edit-dob" type="date" value={form.dob}
              onChange={(e) => f('dob', e.target.value)} className={cls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender</label>
            <select id="select-edit-gender" value={form.gender}
              onChange={(e) => f('gender', e.target.value as Gender)} className={cls}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Blood Group</label>
            <select id="select-edit-blood" value={form.bloodGroup}
              onChange={(e) => f('bloodGroup', e.target.value as BloodGroup)} className={cls}>
              {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Role</label>
            <select id="select-edit-role" value={form.role}
              onChange={(e) => f('role', e.target.value as UserRole)} className={cls}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
            <select id="select-edit-status" value={form.status}
              onChange={(e) => f('status', e.target.value as UserStatus)} className={cls}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" id="btn-submit-edit-user">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
}
