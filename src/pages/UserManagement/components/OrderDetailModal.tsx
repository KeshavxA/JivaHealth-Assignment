import { Modal } from '../../../components/shared/Modal';
import { Badge, orderStatusVariant } from '../../../components/ui/Badge';
import { MapPin, CreditCard, Calendar, Package } from 'lucide-react';
import type { Order, User } from '../../../types';

interface OrderDetailModalProps {
  order: Order | null;
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailModal({ order, user, isOpen, onClose }: OrderDetailModalProps) {
  if (!order) return null;

  const address = user.addresses?.find((a) => a.isDefault) || user.addresses?.[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order Details: ${order.orderId}`} size="md" id={`modal-order-${order.id}`}>
      <div className="space-y-6">

        <div className="flex items-start justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">₹{order.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
          </div>
          <Badge variant={orderStatusVariant(order.status)}>{order.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5" /> Date Ordered
            </div>
            <p className="text-sm font-medium text-gray-900">
              {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Package className="w-3.5 h-3.5" /> Items
            </div>
            <p className="text-sm font-medium text-gray-900 line-clamp-2" title={order.items}>{order.items}</p>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
            <MapPin className="w-4 h-4 text-gray-400" /> Shipping Address
          </h4>
          {address ? (
            <div className="text-sm text-gray-600 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
              <p className="font-medium text-gray-900 mb-1">{address.type} {address.isDefault && '(Default)'}</p>
              <p>{address.line1}</p>
              <p>{address.city}, {address.state} {address.pincode}</p>
              <p>{address.country}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic bg-gray-50/50 p-3 rounded-lg border border-gray-100">No address on file.</p>
          )}
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
            <CreditCard className="w-4 h-4 text-gray-400" /> Payment Information
          </h4>
          <div className="text-sm text-gray-600 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
            <p>Check the <strong>Payments Tab</strong> for exact transaction details.</p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </Modal>
  );
}
