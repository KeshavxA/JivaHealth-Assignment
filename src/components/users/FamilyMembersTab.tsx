import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Card } from '../shared/Card';
import { Badge } from '../shared/Badge';
import { Modal } from '../shared/Modal';

// Legacy local types — isolated from canonical src/types/index.ts
type Relation = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
type UserStatus = 'active' | 'inactive';
interface FamilyMember { id: string; name: string; relation: string; age: number; status: string; avatar: string; }
interface User { id: string; familyMembers: FamilyMember[]; }

interface Props { user: User; }

const INITIAL_FM = { name: '', relation: 'spouse' as Relation, age: '', status: 'active' as UserStatus };

export function FamilyMembersTab({ user }: Props) {
  const { addFamilyMember, updateFamilyMember, deleteFamilyMember } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMember, setEditMember] = useState<FamilyMember | null>(null);
  const [form, setForm] = useState(INITIAL_FM);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addFamilyMember(user.id, {
      name: form.name,
      relation: form.relation,
      age: Number(form.age),
      status: form.status,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=3B82F6&color=ffffff&bold=true`,
    });
    setForm(INITIAL_FM);
    setShowAddModal(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editMember) return;
    updateFamilyMember(user.id, editMember.id, {
      name: form.name,
      relation: form.relation,
      age: Number(form.age),
      status: form.status,
    });
    setEditMember(null);
    setForm(INITIAL_FM);
  };

  const openEdit = (fm: FamilyMember) => {
    setEditMember(fm);
    setForm({ name: fm.name, relation: fm.relation as Relation, age: String(fm.age), status: fm.status as UserStatus });
  };

  const FamilyForm = ({ onSubmit, submitLabel }: { onSubmit: (e: React.FormEvent) => void; submitLabel: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name <span className="text-red-400">*</span></label>
        <input
          id="input-fm-name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Relation <span className="text-red-400">*</span></label>
          <select
            id="select-fm-relation"
            value={form.relation}
            onChange={(e) => setForm({ ...form, relation: e.target.value as Relation })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
          >
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="parent">Parent</option>
            <option value="sibling">Sibling</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Age <span className="text-red-400">*</span></label>
          <input
            id="input-fm-age"
            type="number" required min={0} max={120}
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
        <div className="flex gap-3">
          {(['active', 'inactive'] as UserStatus[]).map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="fm-status"
                value={s}
                checked={form.status === s}
                onChange={() => setForm({ ...form, status: s })}
                className="accent-[#2D7A3A]"
              />
              <span className="text-sm text-gray-700 capitalize">{s}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <button type="button" onClick={() => { setShowAddModal(false); setEditMember(null); }} className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">Cancel</button>
        <button type="submit" id="btn-submit-fm" className="px-5 py-2 text-sm font-semibold text-white bg-[#111827] rounded-xl hover:bg-gray-800">{submitLabel}</button>
      </div>
    </form>
  );

  return (
    <>
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-gray-900">Family Members</h3>
            <p className="text-xs text-gray-400 mt-0.5">{user.familyMembers.length} member{user.familyMembers.length !== 1 ? 's' : ''} registered</p>
          </div>
          <button
            id="btn-add-family-member"
            onClick={() => { setForm(INITIAL_FM); setShowAddModal(true); }}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-[#111827] rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        {user.familyMembers.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">No family members added yet.</p>
            <p className="text-xs mt-1">Click "Add Member" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.familyMembers.map((fm) => (
              <div
                key={fm.id}
                id={`fm-card-${fm.id}`}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={fm.avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(fm.name)}&background=3B82F6&color=ffffff&bold=true`}
                  alt={fm.name}
                  className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{fm.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500 capitalize">{fm.relation}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-500">{fm.age} yrs</span>
                    <Badge variant={fm.status} dot />
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    id={`btn-edit-fm-${fm.id}`}
                    onClick={() => openEdit(fm)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#2D7A3A] hover:bg-[#F0FDF4] transition-all"
                  ><Edit2 className="w-3.5 h-3.5" /></button>
                  <button
                    id={`btn-delete-fm-${fm.id}`}
                    onClick={() => setDeleteId(fm.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#DC2626] hover:bg-red-50 transition-all"
                  ><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Family Member" id="modal-add-family-member">
        <FamilyForm onSubmit={handleAdd} submitLabel="Add Member" />
      </Modal>

      <Modal isOpen={!!editMember} onClose={() => setEditMember(null)} title="Edit Family Member" id="modal-edit-family-member">
        <FamilyForm onSubmit={handleEdit} submitLabel="Save Changes" />
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Remove Family Member" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Are you sure you want to remove this family member?</p>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600">Cancel</button>
            <button
              id="btn-confirm-delete-fm"
              onClick={() => { if (deleteId) deleteFamilyMember(user.id, deleteId); setDeleteId(null); }}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#DC2626] rounded-xl hover:bg-red-700"
            >Remove</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
