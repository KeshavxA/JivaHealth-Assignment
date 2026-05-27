import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Filter, Check } from 'lucide-react';
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

export function FilterDropdown({ label, value, options, onChange, id, className, icon }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className={clsx('relative inline-flex items-center gap-2', className)} ref={containerRef}>
      {label && (
        <span className="text-xs font-medium text-gray-500 whitespace-nowrap">{label}:</span>
      )}
      <div className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "flex items-center justify-between min-w-[120px] pr-8 py-2 text-sm bg-white border rounded-xl",
            "text-gray-700 focus:outline-none transition-all hover:border-gray-300",
            isOpen ? "border-[#2D7A3A] ring-2 ring-[#2D7A3A]/20" : "border-gray-200",
            icon ? "pl-9" : "pl-3"
          )}
        >
          {icon && (
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          )}
          <span className="truncate mr-2">{selectedLabel}</span>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </button>

        {isOpen && (
          <div className="absolute z-50 top-full left-0 mt-1.5 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-1">
            {options.map((o) => {
              const isSelected = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => { onChange(o.value); setIsOpen(false); }}
                  className={clsx(
                    "w-full text-left flex items-center justify-between px-3.5 py-2 text-[14px]",
                    isSelected ? "bg-gray-100/60 font-medium text-gray-900" : "text-gray-700 hover:bg-gray-50 transition-colors"
                  )}
                >
                  {o.label}
                  {isSelected && <Check className="w-4 h-4 text-gray-900" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
