import clsx from 'clsx';

// Spec-matching badge variants
export type BadgeVariant = 'green' | 'red' | 'gray' | 'yellow' | 'blue';

const variantClasses: Record<BadgeVariant, string> = {
  green:  'bg-green-100 text-green-700',
  red:    'bg-red-100 text-red-700',
  gray:   'bg-gray-100 text-gray-600',
  yellow: 'bg-yellow-100 text-yellow-700',
  blue:   'bg-blue-100 text-blue-700',
};

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  /** Optional dot indicator */
  dot?: boolean;
  className?: string;
  /** Short-cut: if no children, renders this as the label text */
  label?: string;
}

export function Badge({
  children,
  variant = 'gray',
  dot = false,
  label,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            variant === 'green'  ? 'bg-green-500'  :
            variant === 'red'    ? 'bg-red-500'    :
            variant === 'yellow' ? 'bg-yellow-500' :
            variant === 'blue'   ? 'bg-blue-500'   :
            'bg-gray-400',
          )}
        />
      )}
      {children ?? label}
    </span>
  );
}

// ─── Convenience helpers for domain entities ─────────────────────────────────

/** Maps UserStatus → BadgeVariant */
export function statusVariant(status: string): BadgeVariant {
  return status === 'Active' || status === 'active' ? 'green' : 'red';
}

/** Maps UserTier → BadgeVariant */
export function tierVariant(tier: string): BadgeVariant {
  return tier === 'Prime User' ? 'yellow' : 'gray';
}

/** Maps UserRole → BadgeVariant */
export function roleVariant(role: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    Patient: 'blue',
    Doctor:  'green',
    Nurse:   'yellow',
    'Support Staff': 'gray',
  };
  return map[role] ?? 'gray';
}

/** Maps OrderStatus → BadgeVariant */
export function orderStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    Delivered: 'green', Completed: 'green',
    Pending:   'yellow', Processing: 'blue',
    Cancelled: 'red',   Failed: 'red',
  };
  return map[status] ?? 'gray';
}

/** Maps PaymentStatus → BadgeVariant */
export function paymentStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    Paid:    'green',
    Pending: 'yellow',
    Failed:  'red',
    Refunded:'blue',
  };
  return map[status] ?? 'gray';
}
