import { useMemo } from 'react';
import { Users, Calendar, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card } from '../components/shared/Card';
import { Badge } from '../components/shared/Badge';
import { AreaChart, BarChart } from '../components/shared/CustomChart';
import { MOCK_ACTIVITY, APPOINTMENT_TREND, REVENUE_TREND } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { users, appointments, orders } = useStore();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === 'active').length;
    const inactiveUsers = totalUsers - activeUsers;
    const upcomingAppointments = appointments.filter((a) => a.status === 'scheduled').length;
    const totalRevenue = orders.filter((o) => o.status === 'paid').reduce((sum, o) => sum + o.amount, 0);
    const newUsersThisWeek = 3;
    return { totalUsers, activeUsers, inactiveUsers, upcomingAppointments, totalRevenue, newUsersThisWeek };
  }, [users, appointments, orders]);

  const apptChartData = APPOINTMENT_TREND.map((d) => ({ label: d.month, value: d.count }));
  const revenueChartData = REVENUE_TREND.map((d) => ({ label: d.month, value: d.revenue }));

  const recentUsers = users.slice(0, 5);

  const KPICard = ({
    icon: Icon, label, value, change, changeLabel, color, bgColor, id, onClick
  }: {
    icon: any; label: string; value: string | number; change?: number; changeLabel?: string;
    color: string; bgColor: string; id: string; onClick?: () => void;
  }) => (
    <Card id={id} className="cursor-default" hover={!!onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-3xl font-bold mt-1" style={{ color: '#111827' }}>{value}</p>
        </div>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bgColor }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          {change >= 0 ? (
            <ArrowUpRight className="w-4 h-4 text-[#16A34A]" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-[#DC2626]" />
          )}
          <span className={`text-sm font-semibold ${change >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-gray-400">{changeLabel}</span>
        </div>
      )}
    </Card>
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">

      <div
        className="rounded-2xl p-6 text-white overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #2D7A3A 0%, #3B8C47 50%, #059669 100%)' }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'white', transform: 'translate(30%, -40%)' }} />
        <div className="absolute bottom-0 left-1/2 w-32 h-32 rounded-full opacity-10"
          style={{ background: 'white', transform: 'translate(-50%, 40%)' }} />
        <div className="relative">
          <p className="text-green-100 text-sm font-medium">Good morning 👋</p>
          <h2 className="text-2xl font-bold mt-1">Welcome back, Admin</h2>
          <p className="text-green-100 text-sm mt-2 max-w-md">
            You have <span className="text-white font-semibold">{stats.upcomingAppointments} upcoming appointments</span> and{' '}
            <span className="text-white font-semibold">{stats.newUsersThisWeek} new users</span> this week.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          id="kpi-total-users"
          icon={Users}
          label="Total Users"
          value={stats.totalUsers}
          change={12}
          changeLabel="vs last month"
          color="#2D7A3A"
          bgColor="#F0FDF4"
          onClick={() => navigate('/users')}
        />
        <KPICard
          id="kpi-active-users"
          icon={TrendingUp}
          label="Active Users"
          value={stats.activeUsers}
          change={8}
          changeLabel="vs last month"
          color="#16A34A"
          bgColor="#F0FDF4"
        />
        <KPICard
          id="kpi-appointments"
          icon={Calendar}
          label="Upcoming Appointments"
          value={stats.upcomingAppointments}
          change={5}
          changeLabel="vs last week"
          color="#16A34A"
          bgColor="#F0FDF4"
          onClick={() => navigate('/appointments')}
        />
        <KPICard
          id="kpi-revenue"
          icon={DollarSign}
          label="Total Revenue"
          value={`₹${(stats.totalRevenue / 1000).toFixed(1)}k`}
          change={18}
          changeLabel="vs last month"
          color="#D97706"
          bgColor="#FFFBEB"
          onClick={() => navigate('/orders-payments')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card id="chart-appointments">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Appointment Trends</h3>
              <p className="text-xs text-gray-500 mt-0.5">Monthly appointments over 6 months</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2D7A3A]" />
              <span className="text-xs text-gray-500">Appointments</span>
            </div>
          </div>
          <AreaChart
            data={apptChartData}
            color="#2D7A3A"
            formatValue={(v) => `${v} appts`}
          />
        </Card>

        <Card id="chart-revenue">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-xs text-gray-500 mt-0.5">Monthly revenue over 6 months</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
              <span className="text-xs text-gray-500">Revenue (₹)</span>
            </div>
          </div>
          <BarChart
            data={revenueChartData}
            color="#F59E0B"
            formatValue={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Recent Users */}
        <Card id="card-recent-users" className="lg:col-span-3" noPad>
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Users</h3>
            <button
              onClick={() => navigate('/users')}
              className="text-xs font-medium text-[#2D7A3A] hover:text-[#1F5C2A] transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/users/${user.id}`)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={user.status} dot />
                  {user.plan === 'premium' && (
                    <Badge variant="premium" label="Pro" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card id="card-activity-feed" className="lg:col-span-2" noPad>
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            <span className="w-2 h-2 rounded-full bg-[#16A34A] status-dot-active" />
          </div>
          <div className="divide-y divide-gray-50">
            {MOCK_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 px-5 py-3">
                <img src={activity.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-snug">{activity.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
