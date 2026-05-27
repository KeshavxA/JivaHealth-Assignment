
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Calendar, Eye, Pencil, Crown } from 'lucide-react';
import { Badge, statusVariant, roleVariant, tierVariant } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import type { User } from '../../../types';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onUpgrade: (id: string) => void;
}

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

export function UserCard({ user, onEdit, onUpgrade }: UserCardProps) {
  const navigate = useNavigate();

  return (
    <div
      id={`user-card-${user.id}`}
      className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-5
        hover:shadow-sm hover:border-gray-300 transition-all duration-200"
    >

      <div className="flex-shrink-0">
        <Avatar name={user.name} size="lg" shape="circle" statusDot={user.status === 'Active' ? 'active' : 'inactive'} />
      </div>

      <div className="w-[180px] flex-shrink-0">
        <p className="font-semibold text-gray-900 text-sm leading-tight truncate">{user.name}</p>
        <div className="flex items-center gap-1 mt-1 flex-wrap">
          <Badge variant={roleVariant(user.role)}>{user.role}</Badge>
        </div>
        <div className="flex items-center gap-1 mt-1 flex-wrap">
          <Badge variant={statusVariant(user.status)} dot>{user.status}</Badge>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          <Badge variant={tierVariant(user.tier)}>{user.tier}</Badge>
        </p>
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Last: {fmt(user.lastActive)}</span>
        </div>
      </div>

      <div className="w-[120px] flex-shrink-0 text-center space-y-2">
        <div>
          <p className="text-xs text-gray-400">Joined</p>
          <p className="text-xs font-medium text-gray-700 mt-0.5">{fmt(user.joinedDate)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Appointments</p>
          <p className="text-lg font-bold text-[#2D7A3A]">{user.appointments}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-shrink-0 items-end">
        {user.tier !== 'Prime User' && (
          <button
            id={`btn-upgrade-${user.id}`}
            onClick={() => onUpgrade(user.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white
              transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <Crown className="w-3.5 h-3.5" />
            Upgrade to Prime
          </button>
        )}
        {user.tier === 'Prime User' && (
          <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100">
            <Crown className="w-3.5 h-3.5" /> Prime
          </span>
        )}
        <div className="flex items-center gap-2">
          <button
            id={`btn-view-${user.id}`}
            onClick={() => navigate(`/user-management/${user.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700
              border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </button>
          <button
            id={`btn-edit-${user.id}`}
            onClick={() => onEdit(user)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700
              border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}
