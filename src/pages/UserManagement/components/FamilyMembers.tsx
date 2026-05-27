import { useState } from 'react';
import { Plus, Phone, Calendar, Pencil, Trash2, Users } from 'lucide-react';
import { useUserStore } from '../../../store/useUserStore';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import type { User, FamilyMember, Gender } from '../../../types';

interface FamilyMembersProps {
  user: User;
}

const INPUT_CLS = 'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-900 ' +
  'focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]';

const BLANK = { name: '', relation: '', phone: '', dob: '', gender: 'Female' as Gender };

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

interface MemberFormProps {
  initial: typeof BLANK;
  onSave: (data: typeof BLANK) => void;
  onClose: () => void;
  title: string;
}

function MemberForm({ initial, onSave, onClose, title }: MemberFormProps) {
  const [form, setForm] = useState(initial);
  const f = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <Modal isOpen={true} onClose={onClose} title={title} size="md">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Name <span className="text-red-400">*</span></label>
            <input required className={INPUT_CLS} value={form.name}
              onChange={(e) => f('name', e.target.value)} placeholder="Full name" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Relationship <span className="text-red-400">*</span></label>
            <input required className={INPUT_CLS} value={form.relation}
              onChange={(e) => f('relation', e.target.value)} placeholder="e.g. Son, Wife" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone</label>
            <input className={INPUT_CLS} value={form.phone}
              onChange={(e) => f('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth</label>
            <input type="date" className={INPUT_CLS} value={form.dob}
              onChange={(e) => f('dob', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender (optional)</label>
            <select className={INPUT_CLS} value={form.gender}
              onChange={(e) => f('gender', e.target.value as Gender)}>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            type="button" variant="primary"
            onClick={() => { if (form.name && form.relation) onSave(form); }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export function FamilyMembers({ user }: FamilyMembersProps) {
  const { addFamilyMember, updateFamilyMember, deleteFamilyMember, users } = useUserStore();
  const [addOpen, setAddOpen] = useState(false);
  const [editMember, setEditMember] = useState<FamilyMember | null>(null);

  const liveUser = users.find((u) => u.id === user.id) ?? user;

  const fmtDob = (d: string) => d
    ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">
          Family Members
          <span className="ml-2 text-xs text-gray-400 font-normal">({liveUser.familyMembers.length})</span>
        </h3>
        <button
          id="btn-add-member"
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Add Member
        </button>
      </div>

      {/* Empty state */}
      {liveUser.familyMembers.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-200">
          <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No family members added yet</p>
        </div>
      )}

      {/* Member cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {liveUser.familyMembers.map((m) => (
          <div
            key={m.id}
            id={`member-card-${m.id}`}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex items-start gap-3"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {getInitials(m.name)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-gray-800 truncate">{m.name}</p>
                <Badge variant="Normal User" label={m.relation} />
              </div>
              {m.phone && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{m.phone}</span>
                </div>
              )}
              {m.dob && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{fmtDob(m.dob)}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                id={`btn-edit-member-${m.id}`}
                onClick={() => setEditMember(m)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                id={`btn-delete-member-${m.id}`}
                onClick={() => deleteFamilyMember(user.id, m.id)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-[#DC2626] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {addOpen && (
        <MemberForm
          title="Add Family Member"
          initial={BLANK}
          onSave={(data) => {
            addFamilyMember(user.id, data);
            setAddOpen(false);
          }}
          onClose={() => setAddOpen(false)}
        />
      )}

      {/* Edit Modal */}
      {editMember && (
        <MemberForm
          title="Edit Family Member"
          initial={{
            name: editMember.name,
            relation: editMember.relation,
            phone: editMember.phone,
            dob: editMember.dob,
            gender: editMember.gender ?? 'Female',
          }}
          onSave={(data) => {
            updateFamilyMember(user.id, editMember.id, data);
            setEditMember(null);
          }}
          onClose={() => setEditMember(null)}
        />
      )}
    </div>
  );
}
