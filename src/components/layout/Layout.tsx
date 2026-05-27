import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

function useResponsiveSidebar() {
  const isLg = () => window.innerWidth >= 1024;
  const [open, setOpen] = useState(isLg);

  useEffect(() => {
    const onResize = () => setOpen(isLg());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return { open, toggle: () => setOpen((o) => !o), setOpen };
}

export function Layout() {
  const { open, toggle } = useResponsiveSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isOpen={open} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header onToggleSidebar={toggle} />
        <main id="main-content" className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
