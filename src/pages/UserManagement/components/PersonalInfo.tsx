import { useState } from 'react';
import { Mail, Phone, Calendar, User as UserIcon, Droplets, Pencil, X, Check } from 'lucide-react';
import { useUserStore } from '../../../store/useUserStore';
import type { User, Gender, BloodGroup } from '../../../types';

interface PersonalInfoProps {
  user: User;
}

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const FIELD_ROW = 'flex items-start gap-3 py-3 border-b border-gray-100 last:border-0';
const ICON_BOX = 'w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center flex-shrink-0 mt-0.5';
const ICON_CLS = 'w-4 h-4 text-[#2D7A3A]';
const LABEL_CLS = 'text-xs font-semibold text-[#2D7A3A] uppercase tracking-wide mb-0.5';
const VAL_CLS = 'text-sm text-gray-800 font-medium';
const INPUT_CLS = 'text-sm border border-gray-200 rounded-lg px-2 py-1 text-gray-900 w-full ' +
  'focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]';

export function PersonalInfo({ user }: PersonalInfoProps) {
  const { updateUser } = useUserStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    email: user.email,
    phone: user.phone,
    dob: user.dob,
    gender: user.gender,
    bloodGroup: user.bloodGroup,
  });

  const save = () => {
    updateUser(user.id, {
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      gender: form.gender as Gender,
      bloodGroup: form.bloodGroup as BloodGroup,
    });
    setEditing(false);
  };

  const cancel = () => {
    setForm({
      email: user.email, phone: user.phone, dob: user.dob,
      gender: user.gender, bloodGroup: user.bloodGroup,
    });
    setEditing(false);
  };

  const fmtDob = (d: string) => d ? new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric',
  }) : '—';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Personal Information</h3>
        {!editing ? (
          <button
            id="btn-edit-personal-info"
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#2D7A3A] transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={save}
              className="flex items-center gap-1 text-xs font-medium text-[#2D7A3A] hover:underline">
              <Check className="w-3.5 h-3.5" /> Save
            </button>
            <button onClick={cancel}
              className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:underline">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="divide-y divide-gray-100">

        <div className={FIELD_ROW}>
          <div className={ICON_BOX}><Mail className={ICON_CLS} /></div>
          <div className="flex-1">
            <p className={LABEL_CLS}>Email</p>
            {editing
              ? <input className={INPUT_CLS} value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
              : <p className={VAL_CLS}>{user.email}</p>}
          </div>
        </div>

        <div className={FIELD_ROW}>
          <div className={ICON_BOX}><Phone className={ICON_CLS} /></div>
          <div className="flex-1">
            <p className={LABEL_CLS}>Phone</p>
            {editing
              ? <input className={INPUT_CLS} value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
              : <p className={VAL_CLS}>{user.phone}</p>}
          </div>
        </div>

        <div className={FIELD_ROW}>
          <div className={ICON_BOX}><Calendar className={ICON_CLS} /></div>
          <div className="flex-1">
            <p className={LABEL_CLS}>Date of Birth</p>
            {editing
              ? <input type="date" className={INPUT_CLS} value={form.dob} onChange={(e) => setForm((p) => ({ ...p, dob: e.target.value }))} />
              : <p className={VAL_CLS}>{fmtDob(user.dob)}</p>}
          </div>
        </div>

        <div className={FIELD_ROW}>
          <div className={ICON_BOX}><UserIcon className={ICON_CLS} /></div>
          <div className="flex-1">
            <p className={LABEL_CLS}>Gender</p>
            {editing
              ? (
                <select className={INPUT_CLS} value={form.gender} onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value as Gender }))}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              )
              : <p className={VAL_CLS}>{user.gender}</p>}
          </div>
        </div>

        <div className={FIELD_ROW}>
          <div className={ICON_BOX}><Droplets className={ICON_CLS} /></div>
          <div className="flex-1">
            <p className={LABEL_CLS}>Blood Group</p>
            {editing
              ? (
                <select className={INPUT_CLS} value={form.bloodGroup} onChange={(e) => setForm((p) => ({ ...p, bloodGroup: e.target.value as BloodGroup }))}>
                  {BLOOD_GROUPS.map((bg) => <option key={bg}>{bg}</option>)}
                </select>
              )
              : <p className={VAL_CLS}>{user.bloodGroup}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
