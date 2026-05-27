import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, ChevronDown, ChevronRight,
  Stethoscope, FlaskConical, Pill, Ambulance, Store, FileBarChart,
  ShieldCheck, Settings, Heart,
} from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  label: string;
  icon: React.ElementType;
  to?: string;
  children?: { label: string; to: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Organization', icon: Building2, to: '/organization' },
  { label: 'User Management', icon: Users, to: '/user-management' },
  {
    label: 'Services',
    icon: Stethoscope,
    children: [
      { label: 'Consultation', to: '/services/consultation' },
      { label: 'Lab test Booking', to: '/services/lab-test' },
      { label: 'Medicine Orders', to: '/services/medicine' },
      { label: 'Ambulance booking', to: '/services/ambulance' },
    ],
  },
  { label: 'Vendor & Partners', icon: Store, to: '/vendors' },
  { label: 'Report', icon: FileBarChart, to: '/report' },
  { label: 'User Access', icon: ShieldCheck, to: '/user-access' },
  { label: 'Setting', icon: Settings, to: '/settings' },
];

const SERVICES_ICONS: Record<string, React.ElementType> = {
  'Consultation': Stethoscope,
  'Lab test Booking': FlaskConical,
  'Medicine Orders': Pill,
  'Ambulance booking': Ambulance,
};

interface SidebarProps {
  isOpen?: boolean;
}

export function Sidebar({ isOpen = true }: SidebarProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <aside
      id="sidebar"
      className={clsx(
        'flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 overflow-hidden',
        isOpen ? 'w-[240px] min-w-[240px]' : 'w-[64px] min-w-[64px]',
      )}
    >

      <div
        className="flex items-center gap-3 px-4 py-5 cursor-pointer border-b border-gray-100 overflow-hidden"
        onClick={() => navigate('/dashboard')}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #2D7A3A, #3B8C47)' }}
        >
          <Heart className="w-5 h-5 text-white" />
        </div>
        {isOpen && (
          <div className="whitespace-nowrap overflow-hidden">
            <span className="font-bold text-base text-gray-900 tracking-tight">
              Jiva<span className="text-[#2D7A3A]">Health</span>
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  id={`nav-services`}
                  onClick={() => setServicesOpen((p) => !p)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all"
                  title={!isOpen ? item.label : undefined}
                >
                  <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
                  {isOpen && <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>}
                  {isOpen && (
                    servicesOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>

                {servicesOpen && (
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-3">
                    {item.children.map((child) => {
                      const ChildIcon = SERVICES_ICONS[child.label];
                      return (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          id={`nav-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                          className={({ isActive }) =>
                            clsx(
                              'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all',
                              isActive
                                ? 'bg-[#F0FDF4] text-[#2D7A3A] font-semibold'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            )
                          }
                        >
                          {ChildIcon && <ChildIcon className="w-4 h-4 flex-shrink-0" />}
                          {child.label}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to!}
              id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              title={!isOpen ? item.label : undefined}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  isOpen ? '' : 'justify-center',
                  isActive
                    ? 'bg-[#F0FDF4] text-[#2D7A3A] font-semibold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={clsx(
                      'w-4.5 h-4.5 flex-shrink-0',
                      isActive ? 'text-[#2D7A3A]' : 'text-gray-400'
                    )}
                  />
                  {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-3 pb-4 border-t border-gray-100 pt-3">
        <div
          className={clsx(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors overflow-hidden',
            !isOpen && 'justify-center px-0',
          )}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2D7A3A, #3B8C47)' }}
            title={!isOpen ? 'Admin User' : undefined}
          >
            AD
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-medium text-gray-800 truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@jivahealth.in</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
