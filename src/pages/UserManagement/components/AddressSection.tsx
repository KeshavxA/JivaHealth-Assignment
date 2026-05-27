import { useState } from 'react';
import { Home, Plus, Pencil, Trash2, X, Check, AlertTriangle } from 'lucide-react';
import { useUserStore } from '../../../store/useUserStore';
import type { User, Address } from '../../../types';

interface AddressSectionProps {
  user: User;
}

const INPUT_CLS =
  'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-900 ' +
  'focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]';

const BLANK_FORM = {
  type: 'Home' as Address['type'],
  isDefault: false,
  line1: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
};

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh',
];

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: typeof BLANK_FORM;
  onSave: (data: typeof BLANK_FORM) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const f = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="mt-3 p-4 border border-[#2D7A3A]/20 rounded-xl bg-[#F0FDF4]/40 space-y-3 animate-in fade-in duration-150">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Type</label>
          <select className={INPUT_CLS} value={form.type} onChange={(e) => f('type', e.target.value as Address['type'])}>
            <option>Home</option><option>Work</option><option>Other</option>
          </select>
        </div>
        <div className="flex items-end gap-2">
          <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
            <input type="checkbox" checked={form.isDefault} onChange={(e) => f('isDefault', e.target.checked)} className="accent-[#2D7A3A]" />
            Set as default
          </label>
        </div>
        <div className="col-span-2">
          <label className="text-xs font-medium text-gray-500 mb-1 block">Address Line</label>
          <input className={INPUT_CLS} value={form.line1} onChange={(e) => f('line1', e.target.value)} placeholder="Flat / Building / Street" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">City</label>
          <input className={INPUT_CLS} value={form.city} onChange={(e) => f('city', e.target.value)} placeholder="City" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">State</label>
          <select className={INPUT_CLS} value={form.state} onChange={(e) => f('state', e.target.value)}>
            <option value="">Select state…</option>
            {STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Pin Code</label>
          <input className={INPUT_CLS} value={form.pincode} onChange={(e) => f('pincode', e.target.value)} placeholder="000000" maxLength={6} />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Country</label>
          <input className={INPUT_CLS} value={form.country} onChange={(e) => f('country', e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          className="flex items-center gap-1 text-xs font-medium text-white px-3 py-1.5 rounded-lg bg-[#2D7A3A] hover:bg-[#256832]"
        >
          <Check className="w-3.5 h-3.5" /> Save
        </button>
      </div>
    </div>
  );
}

function DeleteConfirm({ label, onConfirm, onCancel }: { label: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs animate-in fade-in duration-150">
      <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
      <span className="text-red-700 flex-1">{label}</span>
      <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 font-medium px-2 py-0.5 rounded">No</button>
      <button onClick={onConfirm} className="text-white bg-red-500 hover:bg-red-600 font-semibold px-2 py-0.5 rounded">Yes, delete</button>
    </div>
  );
}

export function AddressSection({ user }: AddressSectionProps) {
  const { addAddress, updateAddress, deleteAddress } = useUserStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDelete = (addrId: string) => {
    deleteAddress(user.id, addrId);
    setConfirmDeleteId(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-gray-800">Addresses</h3>
        <button
          id="btn-add-address"
          onClick={() => { setShowAddForm(true); setEditId(null); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-gray-500" /> Add
        </button>
      </div>

      {showAddForm && (
        <AddressForm
          initial={BLANK_FORM}
          onSave={(data) => { addAddress(user.id, data); setShowAddForm(false); }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="space-y-3 mt-2">
        {user.addresses.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">No addresses added.</p>
        )}
        {user.addresses.map((addr) => (
          <div key={addr.id}>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/50 mb-3 border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#A7D8C4] bg-opacity-60 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Home className="w-5 h-5 text-[#2D7A3A]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[15px] font-medium text-gray-900">{addr.type}</span>
                  {addr.isDefault && (
                    <span className="text-[11px] font-medium text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-gray-600 mt-1">{addr.line1}</p>
                <p className="text-[13px] text-gray-600 mt-0.5">{addr.city}, {addr.state} {addr.pincode}</p>
                <p className="text-[13px] text-gray-600 mt-0.5">{addr.country}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  id={`btn-edit-addr-${addr.id}`}
                  onClick={() => { setEditId(editId === addr.id ? null : addr.id); setConfirmDeleteId(null); }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  id={`btn-delete-addr-${addr.id}`}
                  onClick={() => { setConfirmDeleteId(addr.id); setEditId(null); }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {confirmDeleteId === addr.id && (
              <div className="mt-1.5">
                <DeleteConfirm
                  label="Delete this address?"
                  onConfirm={() => handleDelete(addr.id)}
                  onCancel={() => setConfirmDeleteId(null)}
                />
              </div>
            )}

            {editId === addr.id && (
              <AddressForm
                initial={{ type: addr.type, isDefault: addr.isDefault, line1: addr.line1, city: addr.city, state: addr.state, pincode: addr.pincode, country: addr.country }}
                onSave={(data) => { updateAddress(user.id, addr.id, data); setEditId(null); }}
                onCancel={() => setEditId(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
