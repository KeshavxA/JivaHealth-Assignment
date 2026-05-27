import { Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import type { User } from '../../../types';

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
}

export function UserCard({ user, onDelete }: UserCardProps) {
  const navigate = useNavigate();

  return (
    <div
      id={`user-card-${user.id}`}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col items-center text-center
        hover:shadow-md hover:border-gray-300 transition-all duration-200"
    >
      <div className="relative mb-3">
        <Avatar
          src={user.avatar}
          name={user.name}
          size="lg"
          shape="rounded"
          statusDot={user.status}
        />
      </div>

      <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
      <p className="text-xs text-gray-400 mt-0.5 mb-2">{user.city}, {user.state}</p>

      <div className="flex items-center gap-1.5 flex-wrap justify-center mb-3">
        <Badge variant={user.status} dot />
        {user.plan === 'premium' && <Badge variant="premium" label="Pro" />}
        {user.role === 'admin' && <Badge variant="admin" />}
      </div>

      <div className="w-full border-t border-gray-100 pt-3 grid grid-cols-2 gap-2 text-center mb-3">
        <div>
          <p className="text-lg font-bold text-[#16A34A]">{user.appointmentCount}</p>
          <p className="text-xs text-gray-400">Appointments</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">₹{(user.totalSpend / 1000).toFixed(1)}k</p>
          <p className="text-xs text-gray-400">Spend</p>
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <button
          id={`btn-grid-view-${user.id}`}
          onClick={() => navigate(`/users/${user.id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#2D7A3A]
            rounded-lg border border-[#2D7A3A]/30 hover:bg-[#F0FDF4] transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> View
        </button>
        <button
          id={`btn-grid-delete-${user.id}`}
          onClick={() => onDelete(user.id)}
          className="flex items-center justify-center p-2 text-gray-400 hover:text-[#DC2626]
            hover:bg-red-50 rounded-lg border border-gray-200 hover:border-red-100 transition-colors"
          title="Delete user"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
