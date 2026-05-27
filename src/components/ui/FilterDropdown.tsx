import { ChevronDown, Filter } from 'lucide-react';
import clsx from 'clsx';

interface Option {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  icon?: boolean;
}

export function FilterDropdown({ label, value, options, onChange, id, className }: FilterDropdownProps) {
  return (
    <div className={clsx('relative inline-flex items-center gap-2', className)}>
      {label && (
        <span className="text-xs font-medium text-gray-500 whitespace-nowrap">{label}:</span>
      )}
      <div className="relative">
        {icon && (
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        )}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(
            "appearance-none pr-8 py-2 text-sm bg-white border border-gray-200 rounded-xl",
            "text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]",
            "cursor-pointer transition-all hover:border-gray-300",
            icon ? "pl-9" : "pl-3"
          )}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
