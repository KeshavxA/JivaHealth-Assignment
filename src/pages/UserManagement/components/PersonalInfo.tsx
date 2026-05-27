import { useState } from 'react';
import { Mail, Phone, Calendar, User as UserIcon, Heart, Pencil, X, Check } from 'lucide-react';
import { useUserStore } from '../../../store/useUserStore';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import type { User, Gender, BloodGroup } from '../../../types';

interface PersonalInfoProps {
  user: User;
}

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const GENDERS: Gender[] = ['Male', 'Female', 'Other'];

const FIELD_ROW = 'flex items-center gap-2 py-2.5';
const ICON_CLS = 'w-[18px] h-[18px] text-[#2D7A3A]';
const LABEL_CLS = 'text-[13px] text-[#2D7A3A] w-24';
const VAL_CLS = 'text-[13px] text-gray-900 font-medium';
const INPUT_CLS =
  'text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-900 w-full ' +
  'focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]';

export function PersonalInfo({ user }: PersonalInfoProps) {
  const { updateUser } = useUserStore();
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    dob: user.dob,
    gender: user.gender,
    bloodGroup: user.bloodGroup,
  });

  const openEdit = () => {
    setForm({
      name: user.name, email: user.email, phone: user.phone,
      dob: user.dob, gender: user.gender, bloodGroup: user.bloodGroup,
    });
    setEditOpen(true);
  };

  const save = () => {
    updateUser(user.id, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      gender: form.gender as Gender,
      bloodGroup: form.bloodGroup as BloodGroup,
    });
    setEditOpen(false);
  };

  const fmtDob = (d: string) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—';

  const f = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Personal Information</h3>
          <button
            id="btn-edit-personal-info"
            onClick={openEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" /> Edit
          </button>
        </div>

        <div className="mt-2 space-y-1">

          <div className={FIELD_ROW}>
            <Mail className={ICON_CLS} />
            <p className={LABEL_CLS}>Email:</p>
            <p className={VAL_CLS}>{user.email}</p>
          </div>

          <div className={FIELD_ROW}>
            <Phone className={ICON_CLS} />
            <p className={LABEL_CLS}>Phone:</p>
            <p className={VAL_CLS}>{user.phone}</p>
          </div>

          <div className={FIELD_ROW}>
            <Calendar className={ICON_CLS} />
            <p className={LABEL_CLS}>Date of Birth:</p>
            <p className={VAL_CLS}>{fmtDob(user.dob)}</p>
          </div>

          <div className={FIELD_ROW}>
            <UserIcon className={ICON_CLS} />
            <p className={LABEL_CLS}>Gender:</p>
            <p className={VAL_CLS}>{user.gender}</p>
          </div>

          <div className={FIELD_ROW}>
            <Heart className={ICON_CLS} />
            <p className={LABEL_CLS}>Blood Group:</p>
            <p className={VAL_CLS}>{user.bloodGroup}</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Personal Information"
        size="md"
        id="modal-edit-personal-info"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">

            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="input-edit-name"
                required
                type="text"
                value={form.name}
                onChange={(e) => f('name', e.target.value)}
                className={INPUT_CLS}
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
              <input
                id="input-edit-email"
                type="email"
                value={form.email}
                onChange={(e) => f('email', e.target.value)}
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone</label>
              <input
                id="input-edit-phone"
                type="text"
                value={form.phone}
                onChange={(e) => f('phone', e.target.value)}
                className={INPUT_CLS}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth</label>
              <input
                id="input-edit-dob"
                type="date"
                value={form.dob}
                onChange={(e) => f('dob', e.target.value)}
                className={INPUT_CLS}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender</label>
              <select
                id="select-edit-gender"
                value={form.gender}
                onChange={(e) => f('gender', e.target.value as Gender)}
                className={INPUT_CLS}
              >
                {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Blood Group</label>
              <select
                id="select-edit-blood"
                value={form.bloodGroup}
                onChange={(e) => f('bloodGroup', e.target.value as BloodGroup)}
                className={INPUT_CLS}
              >
                {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
              <X className="w-3.5 h-3.5" /> Cancel
            </Button>
            <Button type="button" variant="primary" id="btn-save-personal-info" onClick={save}>
              <Check className="w-3.5 h-3.5" /> Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
