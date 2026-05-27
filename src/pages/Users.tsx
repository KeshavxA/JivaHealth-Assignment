import { useState, useMemo } from 'react';
import { Search, Plus, LayoutGrid, List, ChevronUp, ChevronDown, Trash2, Eye, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Card } from '../components/shared/Card';
import { Badge } from '../components/shared/Badge';
import { Modal } from '../components/shared/Modal';

// Legacy local types (kept for backward compat, not the canonical types)
type UserStatus = 'active' | 'inactive';
type SubscriptionPlan = 'free' | 'premium';
type UserRole = 'user' | 'admin';

type ViewMode = 'list' | 'grid';
type SortField = 'name' | 'dateJoined' | 'totalSpend' | 'appointmentCount';
type SortDir = 'asc' | 'desc';

const INITIAL_FORM = {
  name: '', email: '', phone: '', city: '', state: '',
  age: '', gender: 'female' as 'male' | 'female' | 'other',
  status: 'active' as UserStatus, plan: 'free' as SubscriptionPlan,
  role: 'user' as UserRole, bloodGroup: '', notes: '',
};

export function Users() {
  const { users, addUser, deleteUser } = useStore();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        const q = search.toLowerCase();
        const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q);
        const matchStatus = filterStatus === 'all' || u.status === filterStatus;
        const matchPlan = filterPlan === 'all' || u.plan === filterPlan;
        return matchSearch && matchStatus && matchPlan;
      })
      .sort((a, b) => {
        let aVal: any, bVal: any;
        if (sortField === 'name') { aVal = a.name; bVal = b.name; }
        else if (sortField === 'dateJoined') { aVal = a.dateJoined; bVal = b.dateJoined; }
        else if (sortField === 'totalSpend') { aVal = a.totalSpend; bVal = b.totalSpend; }
        else { aVal = a.appointmentCount; bVal = b.appointmentCount; }
        if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
        return aVal < bVal ? 1 : -1;
      });
  }, [users, search, filterStatus, filterPlan, sortField, sortDir]);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
  };

  const SortIcon = ({ field }: { field: SortField }) =>
    sortField === field
      ? sortDir === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
      : <ChevronDown className="w-3.5 h-3.5 opacity-30" />;

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      ...form,
      age: Number(form.age),
      dateJoined: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=2D7A3A&color=ffffff&bold=true`,
    });
    setForm(INITIAL_FORM);
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="p-6 space-y-5 animate-fade-in">

      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-sm text-gray-500">{filteredUsers.length} of {users.length} users</span>
        </div>
        <div className="flex items-center gap-3">

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="input-users-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A] w-56"
            />
          </div>

          <button
            id="btn-toggle-filters"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-all ${showFilters ? 'bg-[#F0FDF4] border-[#2D7A3A]/30 text-[#2D7A3A]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              id="btn-view-list"
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#F0FDF4] text-[#2D7A3A]' : 'text-gray-400 hover:text-gray-600'}`}
            ><List className="w-4 h-4" /></button>
            <button
              id="btn-view-grid"
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#F0FDF4] text-[#2D7A3A]' : 'text-gray-400 hover:text-gray-600'}`}
            ><LayoutGrid className="w-4 h-4" /></button>
          </div>

          <button
            id="btn-add-user"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#111827] hover:bg-gray-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      {showFilters && (
        <Card className="animate-fade-in">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500">Status:</label>
              {['all', 'active', 'inactive'].map((s) => (
                <button
                  key={s}
                  id={`filter-status-${s}`}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${filterStatus === s ? 'bg-[#F0FDF4] text-[#2D7A3A] border-[#2D7A3A]/30' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                >{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500">Plan:</label>
              {['all', 'free', 'premium'].map((p) => (
                <button
                  key={p}
                  id={`filter-plan-${p}`}
                  onClick={() => setFilterPlan(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${filterPlan === p ? 'bg-[#F0FDF4] text-[#2D7A3A] border-[#2D7A3A]/30' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                >{p === 'all' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}</button>
              ))}
            </div>
            {(filterStatus !== 'all' || filterPlan !== 'all') && (
              <button
                onClick={() => { setFilterStatus('all'); setFilterPlan('all'); }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>
        </Card>
      )}

      {viewMode === 'list' && (
        <Card noPad>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    { field: 'name' as SortField, label: 'User' },
                    { field: null, label: 'Contact' },
                    { field: null, label: 'Status' },
                    { field: 'dateJoined' as SortField, label: 'Joined' },
                    { field: 'appointmentCount' as SortField, label: 'Appointments' },
                    { field: 'totalSpend' as SortField, label: 'Total Spend' },
                    { field: null, label: 'Actions' },
                  ].map(({ field, label }) => (
                    <th
                      key={label}
                      className={`text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide ${field ? 'cursor-pointer hover:text-gray-700 select-none' : ''}`}
                      onClick={() => field && handleSort(field)}
                    >
                      <div className="flex items-center gap-1">
                        {label}
                        {field && <SortIcon field={field} />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    id={`user-row-${user.id}`}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Badge variant={user.role} />
                            {user.plan === 'premium' && <Badge variant="premium" label="Pro" />}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-gray-700">{user.email}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{user.phone}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={user.status} dot />
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-gray-700">{new Date(user.dateJoined).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-semibold text-[#16A34A]">{user.appointmentCount}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-semibold text-gray-900">₹{user.totalSpend.toLocaleString('en-IN')}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          id={`btn-view-user-${user.id}`}
                          onClick={() => navigate(`/users/${user.id}`)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#2D7A3A] hover:bg-[#F0FDF4] transition-all"
                          title="View Profile"
                        ><Eye className="w-4 h-4" /></button>
                        <button
                          id={`btn-delete-user-${user.id}`}
                          onClick={() => setDeleteConfirm(user.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#DC2626] hover:bg-red-50 transition-all"
                          title="Delete User"
                        ><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-sm">No users found matching your criteria.</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              id={`user-card-${user.id}`}
              hover
              className="cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <span
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.status === 'active' ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`}
                  />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 mb-2">{user.city}, {user.state}</p>
                <div className="flex items-center gap-1.5 flex-wrap justify-center mb-3">
                  <Badge variant={user.status} dot />
                  {user.plan === 'premium' && <Badge variant="premium" label="Pro" />}
                </div>
                <div className="w-full border-t border-gray-100 pt-3 grid grid-cols-2 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-[#16A34A]">{user.appointmentCount}</p>
                    <p className="text-xs text-gray-400">Appointments</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">₹{(user.totalSpend / 1000).toFixed(1)}k</p>
                    <p className="text-xs text-gray-400">Spend</p>
                  </div>
                </div>
                <button
                  id={`btn-grid-view-${user.id}`}
                  onClick={() => navigate(`/users/${user.id}`)}
                  className="mt-3 w-full py-2 text-xs font-semibold text-[#2D7A3A] rounded-lg border border-[#2D7A3A]/30 hover:bg-[#F0FDF4] transition-colors"
                >View Profile</button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New User" size="lg" id="modal-add-user">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'name', label: 'Full Name', type: 'text', required: true },
              { name: 'email', label: 'Email Address', type: 'email', required: true },
              { name: 'phone', label: 'Phone Number', type: 'text', required: true },
              { name: 'age', label: 'Age', type: 'number', required: true },
              { name: 'city', label: 'City', type: 'text', required: true },
              { name: 'state', label: 'State', type: 'text', required: true },
              { name: 'bloodGroup', label: 'Blood Group', type: 'text', required: false },
              { name: 'notes', label: 'Notes', type: 'text', required: false },
            ].map(({ name, label, type, required }) => (
              <div key={name} className={name === 'notes' ? 'col-span-2' : ''}>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
                <input
                  id={`input-add-${name}`}
                  type={type}
                  required={required}
                  value={(form as any)[name]}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender <span className="text-red-400">*</span></label>
              <select
                id="select-add-gender"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value as 'male' | 'female' | 'other' })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
              <select
                id="select-add-status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as UserStatus })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Subscription Plan</label>
              <select
                id="select-add-plan"
                value={form.plan}
                onChange={(e) => setForm({ ...form, plan: e.target.value as SubscriptionPlan })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" id="btn-submit-add-user" className="px-5 py-2 text-sm font-semibold text-white bg-[#111827] rounded-xl hover:bg-gray-800 transition-colors">Add User</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete User" size="sm" id="modal-delete-confirm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Are you sure you want to delete this user? This action cannot be undone and will also delete their appointments and orders.</p>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button id="btn-confirm-delete" onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="px-4 py-2 text-sm font-semibold text-white bg-[#DC2626] rounded-xl hover:bg-red-700 transition-colors">Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
