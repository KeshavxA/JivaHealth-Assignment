import { Search, Bell, ChevronDown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Platform overview and key metrics' },
  '/users': { title: 'User Management', subtitle: 'Manage all registered users' },
  '/appointments': { title: 'Appointments', subtitle: 'View and manage all appointments' },
  '/orders-payments': { title: 'Orders & Payments', subtitle: 'Billing and transaction history' },
  '/settings': { title: 'Settings', subtitle: 'Configure platform settings' },
};

export function Navbar() {
  const { searchQuery, setSearchQuery } = useStore();
  const location = useLocation();

  const currentPage = Object.keys(PAGE_TITLES)
    .sort((a, b) => b.length - a.length)
    .find((key) => location.pathname.startsWith(key));
  const pageInfo = currentPage ? PAGE_TITLES[currentPage] : { title: 'Jiva Health', subtitle: '' };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="flex items-center gap-4 px-6 py-3.5">

        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-gray-900 leading-tight">{pageInfo.title}</h1>
          {pageInfo.subtitle && (
            <p className="text-xs text-gray-500 mt-0.5">{pageInfo.subtitle}</p>
          )}
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="input-global-search"
            type="text"
            placeholder="Search users, appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A] transition-all"
          />
        </div>

        <button
          id="btn-notifications"
          className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626]" />
        </button>

        <button
          id="btn-admin-profile"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #2D7A3A, #3B8C47)' }}>
            A
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-gray-800 leading-none">Admin User</p>
            <p className="text-xs text-gray-400 mt-0.5">Super Admin</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
