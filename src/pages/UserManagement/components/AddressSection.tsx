import type { User } from '../../../types';
import { MapPin } from 'lucide-react';

interface AddressSectionProps {
  user: User;
}

/**
 * AddressSection — displays the user's address / location details.
 * Used inside the profile tab on the UserDetail page.
 */
export function AddressSection({ user }: AddressSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5" />
        Address
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
          <p className="text-sm text-gray-900 py-2 border-b border-gray-100">{user.city}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">State</label>
          <p className="text-sm text-gray-900 py-2 border-b border-gray-100">{user.state}</p>
        </div>
      </div>
    </div>
  );
}
