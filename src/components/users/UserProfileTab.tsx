import { useState } from 'react';
import { Save, Edit2, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Card } from '../shared/Card';

// Legacy interface matching the old store's user shape
interface User {
  id: string; name: string; email: string; phone: string; city: string; state: string;
  bloodGroup?: string; age: number; gender: string; notes?: string; dateJoined: string; lastActive: string;
}

interface Props {
  user: User;
}

export function UserProfileTab({ user }: Props) {
  const { updateUser } = useStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    email: user.email,
    phone: user.phone,
    city: user.city,
    state: user.state,
    bloodGroup: user.bloodGroup ?? '',
    age: String(user.age),
    notes: user.notes ?? '',
  });

  const handleSave = () => {
    updateUser(user.id, {
      email: form.email,
      phone: form.phone,
      city: form.city,
      state: form.state,
      bloodGroup: form.bloodGroup || undefined,
      age: Number(form.age),
      notes: form.notes || undefined,
    });
    setEditing(false);
  };

  const Field = ({ label, name, type = 'text' }: { label: string; name: keyof typeof form; type?: string }) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      {editing ? (
        <input
          id={`profile-input-${name}`}
          type={type}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
        />
      ) : (
        <p className="text-sm text-gray-900 py-2 px-0 border-b border-gray-100">{form[name] || '—'}</p>
      )}
    </div>
  );

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900">Profile Details</h3>
        {editing ? (
          <div className="flex gap-2">
            <button
              onClick={() => { setEditing(false); setForm({ email: user.email, phone: user.phone, city: user.city, state: user.state, bloodGroup: user.bloodGroup ?? '', age: String(user.age), notes: user.notes ?? '' }); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
            <button
              id="btn-save-profile"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2D7A3A] rounded-lg hover:bg-[#1F5C2A]"
            >
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        ) : (
          <button
            id="btn-edit-profile"
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Name</label>
          <p className="text-sm text-gray-900 py-2 border-b border-gray-100">{user.name}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Gender</label>
          <p className="text-sm text-gray-900 py-2 border-b border-gray-100 capitalize">{user.gender}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Date Joined</label>
          <p className="text-sm text-gray-900 py-2 border-b border-gray-100">
            {new Date(user.dateJoined).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Last Active</label>
          <p className="text-sm text-gray-900 py-2 border-b border-gray-100">
            {new Date(user.lastActive).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <Field label="Email Address" name="email" type="email" />
        <Field label="Phone Number" name="phone" />
        <Field label="Age" name="age" type="number" />
        <Field label="Blood Group" name="bloodGroup" />
        <Field label="City" name="city" />
        <Field label="State" name="state" />
      </div>

      <div className="mt-5">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Admin Notes</label>
        {editing ? (
          <textarea
            id="profile-input-notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            placeholder="Add private admin notes..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A] resize-none"
          />
        ) : (
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-600 italic">{form.notes || 'No notes added.'}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
