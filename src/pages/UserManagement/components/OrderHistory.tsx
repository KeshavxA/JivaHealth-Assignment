import { ShoppingBag, Trash2, ChevronDown } from 'lucide-react';
import { useUserStore } from '../../../store/useUserStore';
import { Badge } from '../../../components/ui/Badge';
import type { User, Order } from '../../../types';

interface OrderHistoryProps {
  user: User;
}

const ORDER_STATUS_OPTIONS: Order['status'][] = ['Delivered', 'Pending', 'Processing', 'Cancelled'];

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function OrderHistory({ user }: OrderHistoryProps) {
  const { updateOrderStatus } = useUserStore();
  const { updateUser, users } = useUserStore();

  const deleteOrder = (orderId: string) => {
    const freshUser = users.find((u) => u.id === user.id);
    if (!freshUser) return;
    updateUser(user.id, {
      orders: freshUser.orders.filter((o) => o.id !== orderId),
    });
  };

  const liveUser = users.find((u) => u.id === user.id) ?? user;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-800">Order History</h3>
      {liveUser.orders.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-200">
          <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No orders yet</p>
        </div>
      )}
      {liveUser.orders.map((order) => (
        <div
          key={order.id}
          id={`order-row-${order.id}`}
          className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4"
        >

          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-5 h-5 text-teal-600" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-gray-800">{order.orderId}</span>
              <Badge variant={order.status} />
            </div>
            <p className="text-xs text-gray-600 truncate">{order.items}</p>
            <p className="text-xs text-gray-400 mt-0.5">{fmtDate(order.date)}</p>
          </div>

          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-gray-900">₹{order.amount.toLocaleString('en-IN')}</p>
          </div>

          <div className="relative flex-shrink-0">
            <select
              id={`select-order-status-${order.id}`}
              value={order.status}
              onChange={(e) => updateOrderStatus(user.id, order.id, e.target.value as Order['status'])}
              className="appearance-none pl-3 pr-7 py-1.5 text-xs border border-gray-200 rounded-lg
                text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 cursor-pointer bg-white"
            >
              {ORDER_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>

          <button
            id={`btn-delete-order-${order.id}`}
            onClick={() => deleteOrder(order.id)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#DC2626] hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
