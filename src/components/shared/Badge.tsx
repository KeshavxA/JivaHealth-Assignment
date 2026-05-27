import clsx from 'clsx';

// Legacy types — this component predates the new types/index.ts
type BadgeVariant = string;

const VARIANT_STYLES: Record<string, string> = {
  active:       'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20',
  inactive:     'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20',
  scheduled:    'bg-blue-50 text-blue-700 border border-blue-100',
  completed:    'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20',
  cancelled:    'bg-gray-100 text-gray-500 border border-gray-200',
  paid:         'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20',
  pending:      'bg-amber-50 text-amber-700 border border-amber-100',
  failed:       'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20',
  refunded:     'bg-purple-50 text-purple-700 border border-purple-100',
  premium:      'bg-[#F59E0B]/10 text-[#D97706] border border-[#F59E0B]/20',
  free:         'bg-gray-100 text-gray-500 border border-gray-200',
  admin:        'bg-purple-50 text-purple-700 border border-purple-100',
  user:         'bg-blue-50 text-blue-600 border border-blue-100',
  telehealth:   'bg-teal-50 text-teal-700 border border-teal-100',
  consultation: 'bg-blue-50 text-blue-700 border border-blue-100',
  checkup:      'bg-indigo-50 text-indigo-700 border border-indigo-100',
  'follow-up':  'bg-orange-50 text-orange-700 border border-orange-100',
};

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  dot?: boolean;
  className?: string;
}

export function Badge({ variant, label, dot = false, className }: BadgeProps) {
  const displayLabel = label ?? variant.replace(/-/g, ' ');
  const style = VARIANT_STYLES[variant] ?? 'bg-gray-100 text-gray-500';

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        style,
        className
      )}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            variant === 'active' || variant === 'completed' || variant === 'paid' ? 'bg-[#16A34A]' :
            variant === 'inactive' || variant === 'failed' ? 'bg-[#DC2626]' :
            variant === 'scheduled' ? 'bg-blue-500' :
            variant === 'pending' ? 'bg-amber-500' :
            'bg-gray-400'
          )}
        />
      )}
      {displayLabel}
    </span>
  );
}
