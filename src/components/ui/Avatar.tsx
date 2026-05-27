import clsx from 'clsx';

// Spec: consistent color based on name hash
const COLORS = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-teal-500', 'bg-orange-500'];

function getColor(name: string): string {
  const i = name.charCodeAt(0) % COLORS.length;
  return COLORS[i];
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  statusDot?: 'active' | 'inactive' | null;
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

const SHAPE_CLASSES = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
};

const DOT_SIZE = {
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
};

export function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  statusDot = null,
  className,
}: AvatarProps) {
  const initials = getInitials(name);
  const colorClass = getColor(name);

  return (
    <div className={clsx('relative inline-flex flex-shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={clsx(SIZE_CLASSES[size], SHAPE_CLASSES[shape], 'object-cover')}
        />
      ) : (
        <div
          className={clsx(
            SIZE_CLASSES[size],
            SHAPE_CLASSES[shape],
            colorClass,
            'flex items-center justify-center font-bold text-white select-none',
          )}
        >
          {initials}
        </div>
      )}
      {statusDot && (
        <span
          className={clsx(
            'absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white',
            DOT_SIZE[size],
            statusDot === 'active' ? 'bg-green-500' : 'bg-red-500',
          )}
        />
      )}
    </div>
  );
}
