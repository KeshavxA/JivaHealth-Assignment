import clsx from 'clsx';

export type BadgeVariant = 'green' | 'red' | 'gray' | 'yellow' | 'blue' | 'outlined';

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-[#E8F5E9] text-[#2D7A3A]',
  red: 'bg-red-100 text-red-700',
  gray: 'bg-gray-100 text-gray-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  blue: 'bg-blue-100 text-blue-700',
  outlined: 'bg-white border border-gray-200 text-gray-600',
};

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;

  dot?: boolean;
  className?: string;

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
            variant === 'green' ? 'bg-green-500' :
              variant === 'red' ? 'bg-red-500' :
                variant === 'yellow' ? 'bg-yellow-500' :
                  variant === 'blue' ? 'bg-blue-500' :
                    'bg-gray-400',
          )}
        />
      )}
      {children ?? label}
    </span>
  );
}


export function statusVariant(status: string): BadgeVariant {
  return status === 'Active' || status === 'active' ? 'green' : 'red';
}

export function tierVariant(tier: string): BadgeVariant {
  return tier === 'Prime User' ? 'yellow' : 'outlined';
}

export function roleVariant(role: string): BadgeVariant {
  return 'gray';
}

export function orderStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    Delivered: 'green', Completed: 'green',
    Pending: 'yellow', Processing: 'blue',
    Cancelled: 'red', Failed: 'red',
  };
  return map[status] ?? 'gray';
}

export function paymentStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    Paid: 'green',
    Pending: 'yellow',
    Failed: 'red',
    Refunded: 'blue',
  };
  return map[status] ?? 'gray';
}
