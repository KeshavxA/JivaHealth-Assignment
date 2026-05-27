import clsx from 'clsx';

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
  xl: 'w-24 h-24 text-xl',
};

const SHAPE_CLASSES = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
};

export function Avatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  statusDot = null,
  className,
}: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

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
            'flex items-center justify-center font-bold text-white',
          )}
          style={{ background: 'linear-gradient(135deg, #2D7A3A, #3B8C47)' }}
        >
          {initials}
        </div>
      )}
      {statusDot && (
        <span
          className={clsx(
            'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white',
            statusDot === 'active' ? 'bg-[#16A34A]' : 'bg-[#DC2626]',
          )}
        />
      )}
    </div>
  );
}
