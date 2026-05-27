import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Calendar, CreditCard, Settings, ChevronLeft, ChevronRight,
  Heart
} from 'lucide-react';
import clsx from 'clsx';
import { useStore } from '../../store/useStore';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/appointments', icon: Calendar, label: 'Appointments' },
  { to: '/orders-payments', icon: CreditCard, label: 'Orders & Payments' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useStore();
  const navigate = useNavigate();

  return (
    <aside
      id="sidebar"
      className={clsx(
        'relative flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out h-screen sticky top-0',
        sidebarCollapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >

      <div
        className="flex items-center gap-3 px-4 py-5 cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #2D7A3A, #3B8C47)' }}>
          <Heart className="w-5 h-5 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="overflow-hidden">
            <span className="font-bold text-base text-gray-900 whitespace-nowrap tracking-tight">
              Jiva<span style={{ color: '#2D7A3A' }}>Health</span>
            </span>
            <p className="text-xs text-gray-400 whitespace-nowrap">Admin Console</p>
          </div>
        )}
      </div>

      <div className="mx-4 h-px bg-gray-100 mb-2" />

      <nav className="flex-1 px-2 space-y-1">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            id={`nav-${label.toLowerCase().replace(/[^a-z]/g, '-')}`}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                sidebarCollapsed ? 'justify-center' : '',
                isActive
                  ? 'bg-[#F0FDF4] text-[#2D7A3A]'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={clsx(
                    'w-5 h-5 flex-shrink-0 transition-colors',
                    isActive ? 'text-[#2D7A3A]' : 'text-gray-400 group-hover:text-gray-600'
                  )}
                />
                {!sidebarCollapsed && (
                  <span className="truncate">{label}</span>
                )}
                {!sidebarCollapsed && isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2D7A3A]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-2 pb-4 space-y-1">
        <div className="mx-2 h-px bg-gray-100 mb-2" />

        <div
          className={clsx(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors',
            sidebarCollapsed ? 'justify-center' : ''
          )}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2D7A3A, #3B8C47)' }}>
            A
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@jivahealth.in</p>
            </div>
          )}
        </div>
      </div>

      <button
        id="btn-sidebar-toggle"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 shadow-sm transition-all z-10"
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
    </aside>
  );
}
