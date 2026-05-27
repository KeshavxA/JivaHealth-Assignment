import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  icon?: ReactNode;
  badge?: number;
}

interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  className?: string;
}

export function Tabs<T extends string>({ tabs, activeTab, onChange, className }: TabsProps<T>) {
  return (
    <div className={clsx('flex border-b border-gray-200 bg-white rounded-t-2xl overflow-hidden', className)}>
      {tabs.map(({ id, label, icon, badge }) => (
        <button
          key={id}
          id={`tab-${id}`}
          onClick={() => onChange(id)}
          className={clsx(
            'flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all relative border-b-2',
            activeTab === id
              ? 'text-[#2D7A3A] border-[#2D7A3A]'
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50',
          )}
        >
          {icon && <span className="w-4 h-4 flex items-center">{icon}</span>}
          {label}
          {badge !== undefined && badge > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#F0FDF4] text-[#2D7A3A] text-xs flex items-center justify-center font-bold">
              {badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
