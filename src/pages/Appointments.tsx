import { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, Search, Filter, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card } from '../components/shared/Card';
import { Badge } from '../components/shared/Badge';

export function Appointments() {
  const { appointments, users } = useStore();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch = !q || a.userName.toLowerCase().includes(q) || a.doctorName.toLowerCase().includes(q);
      const matchStatus = filterStatus === 'all' || a.status === filterStatus;
      const matchType = filterType === 'all' || a.type === filterType;
      return matchSearch && matchStatus && matchType;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [appointments, search, filterStatus, filterType]);

  const scheduled = appointments.filter((a) => a.status === 'scheduled').length;
  const completed = appointments.filter((a) => a.status === 'completed').length;
  const cancelled = appointments.filter((a) => a.status === 'cancelled').length;

  return (
    <div className="p-6 space-y-5 animate-fade-in">

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Upcoming', value: scheduled, color: '#16A34A', bg: '#F0FDF4' },
          { label: 'Completed', value: completed, color: '#2D7A3A', bg: '#F0FDF4' },
          { label: 'Cancelled', value: cancelled, color: '#6B7280' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="text-center">
            <p className="text-3xl font-bold" style={{ color }}>{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="input-appts-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user or doctor..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
          />
        </div>
        <button
          id="btn-toggle-appt-filters"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-all ${showFilters ? 'bg-[#F0FDF4] border-[#2D7A3A]/30 text-[#2D7A3A]' : 'bg-white border-gray-200 text-gray-600'}`}
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
        <span className="text-sm text-gray-400 ml-auto">{filtered.length} appointments</span>
      </div>

      {showFilters && (
        <Card className="animate-fade-in">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500">Status:</label>
              {['all', 'scheduled', 'completed', 'cancelled'].map((s) => (
                <button
                  key={s}
                  id={`filter-appt-status-${s}`}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all capitalize ${filterStatus === s ? 'bg-[#F0FDF4] text-[#2D7A3A] border-[#2D7A3A]/30' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                >{s === 'all' ? 'All' : s}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500">Type:</label>
              {['all', 'consultation', 'checkup', 'follow-up', 'telehealth'].map((t) => (
                <button
                  key={t}
                  id={`filter-appt-type-${t}`}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all capitalize ${filterType === t ? 'bg-[#F0FDF4] text-[#2D7A3A] border-[#2D7A3A]/30' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                >{t === 'all' ? 'All' : t.replace(/-/g, ' ')}</button>
              ))}
            </div>
            {(filterStatus !== 'all' || filterType !== 'all') && (
              <button onClick={() => { setFilterStatus('all'); setFilterType('all'); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </Card>
      )}

      <Card noPad>
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">No appointments match your filters.</div>
          ) : (
            filtered.map((appt) => {
              const user = users.find((u) => u.id === appt.userId);
              return (
                <div key={appt.id} id={`appt-global-${appt.id}`} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">

                  {user && (
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-gray-900">{appt.userName}</p>
                      <span className="text-gray-300">·</span>
                      <p className="text-sm text-gray-500">{appt.doctorName}</p>
                      <span className="text-gray-300">·</span>
                      <p className="text-xs text-gray-400">{appt.doctorSpecialty}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {new Date(appt.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {appt.time}
                      </div>
                      {appt.location && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {appt.location}
                        </div>
                      )}
                    </div>
                    {appt.notes && (
                      <p className="text-xs text-gray-400 mt-1 italic">{appt.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={appt.type} />
                    <Badge variant={appt.status} dot />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
