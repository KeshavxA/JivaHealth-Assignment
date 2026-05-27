import clsx from 'clsx';

type BadgeVariant =
  // User status
  | 'Active' | 'Inactive'
  // User role
  | 'Patient' | 'Nurse' | 'Doctor' | 'Support Staff'
  // User tier
  | 'Prime User' | 'Normal User'
  // Order status
  | 'Delivered' | 'Pending' | 'Cancelled' | 'Processing'
  // Payment status
  | 'Completed' | 'Failed'
  // Address type
  | 'Home' | 'Work' | 'Other'
  // Default
  | 'Default'
  // Legacy variants (keep for compat)
  | 'active' | 'inactive' | 'premium' | 'free' | 'admin' | 'user'
  | 'scheduled' | 'completed' | 'cancelled' | 'paid' | 'pending' | 'failed' | 'refunded'
  | 'telehealth' | 'consultation' | 'checkup' | 'follow-up';

const STYLES: Record<string, string> = {
  // Status
  Active:         'bg-green-100 text-green-700',
  Inactive:       'bg-red-100 text-red-700',
  // Role
  Patient:        'bg-gray-100 text-gray-700',
  Nurse:          'bg-blue-100 text-blue-700',
  Doctor:         'bg-purple-100 text-purple-700',
  'Support Staff':'bg-orange-100 text-orange-700',
  // Tier
  'Prime User':   'bg-amber-100 text-amber-700',
  'Normal User':  'bg-gray-100 text-gray-600',
  // Order status
  Delivered:      'bg-green-100 text-green-700',
  Processing:     'bg-blue-100 text-blue-700',
  Cancelled:      'bg-red-100 text-red-700',
  // Payment
  Completed:      'bg-green-100 text-green-700',
  Failed:         'bg-red-100 text-red-700',
  // Address
  Home:           'bg-green-50 text-green-700',
  Work:           'bg-blue-50 text-blue-700',
  Other:          'bg-gray-100 text-gray-600',
  // Default/Pending shared
  Pending:        'bg-amber-100 text-amber-700',
  Default:        'bg-[#2D7A3A]/10 text-[#2D7A3A]',
  // Legacy
  active:         'bg-green-100 text-green-700',
  inactive:       'bg-red-100 text-red-700',
  premium:        'bg-amber-100 text-amber-700',
  free:           'bg-gray-100 text-gray-500',
  admin:          'bg-purple-100 text-purple-700',
  user:           'bg-blue-100 text-blue-600',
  scheduled:      'bg-blue-100 text-blue-700',
  completed:      'bg-green-100 text-green-700',
  cancelled:      'bg-gray-100 text-gray-500',
  paid:           'bg-green-100 text-green-700',
  pending:        'bg-amber-100 text-amber-700',
  failed:         'bg-red-100 text-red-700',
  refunded:       'bg-purple-100 text-purple-700',
  telehealth:     'bg-teal-100 text-teal-700',
  consultation:   'bg-blue-100 text-blue-700',
  checkup:        'bg-indigo-100 text-indigo-700',
  'follow-up':    'bg-orange-100 text-orange-700',
};

interface BadgeProps {
  variant: BadgeVariant | string;
  label?: string;
  dot?: boolean;
  className?: string;
}

export function Badge({ variant, label, dot = false, className }: BadgeProps) {
  const displayLabel = label ?? variant.replace(/-/g, ' ');
  const style = STYLES[variant] ?? 'bg-gray-100 text-gray-600';
  const dotColor =
    variant === 'Active' || variant === 'active' || variant === 'Delivered' || variant === 'Completed' || variant === 'paid'
      ? 'bg-green-500'
      : variant === 'Inactive' || variant === 'inactive' || variant === 'Cancelled' || variant === 'Failed' || variant === 'failed'
      ? 'bg-red-500'
      : 'bg-amber-400';

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
        style,
        className,
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColor)} />}
      {displayLabel}
    </span>
  );
}
