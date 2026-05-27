import { useState } from 'react';
import { Menu, Search, Moon, Bell, Sun } from 'lucide-react';

interface HeaderProps {
    onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
    const [darkMode, setDarkMode] = useState(false);
    const [searchVal, setSearchVal] = useState('');

    return (
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-14 flex items-center gap-4 px-6">

            <button
                id="btn-toggle-sidebar"
                onClick={onToggleSidebar}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Toggle sidebar"
            >
                <Menu className="w-5 h-5" />
            </button>

            <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                        id="input-header-search"
                        type="text"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl
              text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20
              focus:border-[#2D7A3A] transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">

                <button
                    id="btn-dark-mode"
                    onClick={() => setDarkMode((d) => !d)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </button>

                <button
                    id="btn-notifications"
                    className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                    aria-label="Notifications"
                >
                    <Bell className="w-4.5 h-4.5" />
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[9px] font-bold flex items-center justify-center">
                        1
                    </span>
                </button>

                <button
                    id="btn-admin-avatar"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, #2D7A3A, #3B8C47)' }}
                    aria-label="Admin profile"
                >
                    AD
                </button>
            </div>
        </header>
    );
}

export { Header as Navbar };
