import { useState, useMemo } from 'react';
import { Search, FileText, Filter, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card } from '../components/shared/Card';
import { Badge } from '../components/shared/Badge';

export function OrdersPayments() {
  const { orders, users } = useStore();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const q = search.toLowerCase();
      const matchSearch = !q || o.userName.toLowerCase().includes(q) || o.itemName.toLowerCase().includes(q) || o.invoiceNumber.toLowerCase().includes(q);
      const matchStatus = filterStatus === 'all' || o.status === filterStatus;
      return matchSearch && matchStatus;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders, search, filterStatus]);

  const totalRevenue = orders.filter((o) => o.status === 'paid').reduce((s, o) => s + o.amount, 0);
  const totalPending = orders.filter((o) => o.status === 'pending').reduce((s, o) => s + o.amount, 0);
  const totalFailed = orders.filter((o) => o.status === 'failed').reduce((s, o) => s + o.amount, 0);

  return (
    <div className="p-6 space-y-5 animate-fade-in">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: orders.length, color: '#111827', prefix: '' },
          { label: 'Revenue Collected', value: totalRevenue.toLocaleString('en-IN'), color: '#16A34A', prefix: '₹' },
          { label: 'Pending Amount', value: totalPending.toLocaleString('en-IN'), color: '#D97706', prefix: '₹' },
          { label: 'Failed / Refunded', value: totalFailed.toLocaleString('en-IN'), color: '#DC2626', prefix: '₹' },
        ].map(({ label, value, color, prefix }) => (
          <Card key={label}>
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color }}>{prefix}{value}</p>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="input-orders-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders, users..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
          />
        </div>
        <button
          id="btn-toggle-order-filters"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-all ${showFilters ? 'bg-[#F0FDF4] border-[#2D7A3A]/30 text-[#2D7A3A]' : 'bg-white border-gray-200 text-gray-600'}`}
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
        <span className="text-sm text-gray-400 ml-auto">{filtered.length} records</span>
      </div>

      {showFilters && (
        <Card className="animate-fade-in">
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-xs font-medium text-gray-500">Status:</label>
            {['all', 'paid', 'pending', 'failed', 'refunded'].map((s) => (
              <button
                key={s}
                id={`filter-order-status-${s}`}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all capitalize ${filterStatus === s ? 'bg-[#F0FDF4] text-[#2D7A3A] border-[#2D7A3A]/30' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
              >{s === 'all' ? 'All' : s}</button>
            ))}
            {filterStatus !== 'all' && (
              <button onClick={() => setFilterStatus('all')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </Card>
      )}

      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Invoice', 'User', 'Service', 'Date', 'Amount', 'Method', 'Status'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => {
                const user = users.find((u) => u.id === order.userId);
                return (
                  <tr key={order.id} id={`order-global-${order.id}`} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-mono text-gray-600">{order.invoiceNumber}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {user && <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover" />}
                        <span className="text-sm font-medium text-gray-900">{order.userName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-gray-700 max-w-[200px] truncate">{order.itemName}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-gray-600 whitespace-nowrap">
                        {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-bold text-gray-900 whitespace-nowrap">₹{order.amount.toLocaleString('en-IN')}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-xs text-gray-500 capitalize whitespace-nowrap">{order.paymentMethod.replace(/_/g, ' ')}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={order.status} dot />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-sm">No orders match your filters.</div>
          )}
        </div>
      </Card>
    </div>
  );
}
