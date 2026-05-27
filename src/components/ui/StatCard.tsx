import clsx from 'clsx';
import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: number; label?: string };
  accent?: 'green' | 'red' | 'amber' | 'blue' | 'purple' | 'default';
  className?: string;
  id?: string;
}

const ACCENT_COLORS: Record<string, { icon: string; value: string; trend: string }> = {
  green:   { icon: 'bg-[#16A34A]/10 text-[#16A34A]', value: 'text-[#16A34A]', trend: 'text-[#16A34A]' },
  red:     { icon: 'bg-[#DC2626]/10 text-[#DC2626]', value: 'text-[#DC2626]', trend: 'text-[#DC2626]' },
  amber:   { icon: 'bg-[#D97706]/10 text-[#D97706]', value: 'text-[#D97706]', trend: 'text-[#D97706]' },
  blue:    { icon: 'bg-blue-50 text-blue-600',        value: 'text-blue-700',  trend: 'text-blue-600' },
  purple:  { icon: 'bg-purple-50 text-purple-600',    value: 'text-purple-700',trend: 'text-purple-600' },
  default: { icon: 'bg-gray-100 text-gray-500',       value: 'text-gray-900', trend: 'text-gray-500' },
};

export function StatCard({ label, value, icon, trend, accent = 'default', className, id }: StatCardProps) {
  const colors = ACCENT_COLORS[accent];
  return (
    <div
      id={id}
      className={clsx(
        'bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-start gap-4',
        className,
      )}
    >
      {icon && (
        <div className={clsx('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', colors.icon)}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className={clsx('text-2xl font-bold mt-1 leading-none', colors.value)}>{value}</p>
        {trend && (
          <p className={clsx('text-xs mt-1.5', colors.trend)}>
            {trend.value >= 0 ? '+' : ''}{trend.value}%{trend.label ? ` ${trend.label}` : ''}
          </p>
        )}
      </div>
    </div>
  );
}
