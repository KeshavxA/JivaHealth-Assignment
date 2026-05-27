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
  return new Date(dateStr).toLocaleDateString('en-CA'); // e.g. 2025-07-18
}

export function UserCard({ user, onEdit, onUpgrade }: UserCardProps) {
  const navigate = useNavigate();

  return (
    <div
      id={`user-card-${user.id}`}
      className="bg-white border border-gray-200 rounded-2xl p-5
        hover:shadow-sm hover:border-gray-300 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-5"
    >

      <div className="flex-shrink-0">
        <Avatar
          name={user.name}
          size="lg"
          shape="circle"
        />
      </div>

      <div className="flex-1 min-w-0 sm:w-48 sm:flex-none">
        <p className="font-semibold text-gray-900 text-[15px] leading-tight truncate">{user.name}</p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <Badge variant={roleVariant(user.role)}>{user.role}</Badge>
          <Badge variant={statusVariant(user.status)}>{user.status}</Badge>
        </div>
        <div className="mt-1.5">
          <Badge variant={tierVariant(user.tier)}>{user.tier}</Badge>
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2 text-[13px] text-gray-600">
          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-gray-600">
          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>{user.phone}</span>
        </div>
      </div>

      <div className="hidden sm:block w-32 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-0.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Joined</span>
        </div>
        <p className="text-[13px] font-semibold text-gray-800">{fmt(user.joinedDate)}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">Last: {fmt(user.lastActive)}</p>
      </div>

      <div className="hidden sm:block w-24 flex-shrink-0">
        <p className="text-[13px] text-gray-500 mb-0.5">Appointments</p>
        <p className="text-2xl font-normal text-blue-600 leading-none">{user.appointments}</p>
      </div>

      <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t border-gray-100 sm:border-0 flex-shrink-0 mt-3 sm:mt-0">
        {user.tier !== 'Prime User' ? (
          <button
            id={`btn-upgrade-${user.id}`}
            onClick={() => onUpgrade(user.id)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-white
              transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
            style={{ backgroundColor: '#ED8936' }}
          >
            <Crown className="w-3.5 h-3.5" /> Upgrade to Prime
          </button>
        ) : (
          <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#ED8936] bg-orange-50 border border-orange-100 whitespace-nowrap">
            <Crown className="w-3.5 h-3.5" /> Prime
          </span>
        )}
        <button
          id={`btn-view-${user.id}`}
          onClick={() => navigate(`/user-management/${user.id}`)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-700
            border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all bg-white"
        >
          <Eye className="w-3.5 h-3.5" /> View
        </button>
        <button
          id={`btn-edit-${user.id}`}
          onClick={() => onEdit(user)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-700
            border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all bg-white"
        >
          <Pencil className="w-3.5 h-3.5" /> Edit
        </button>
      </div>

    </div>
  );
}
