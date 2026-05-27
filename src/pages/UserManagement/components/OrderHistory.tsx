import { ShoppingBag, Trash2, ChevronDown } from 'lucide-react';
import { useUserStore } from '../../../store/useUserStore';
import { Badge, orderStatusVariant } from '../../../components/ui/Badge';
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
      <h3 className="text-[15px] font-semibold text-gray-800 mb-4">Order History</h3>
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
          className="bg-gray-50/50 border border-gray-100 hover:border-gray-200 rounded-2xl p-4 flex items-center gap-5 transition-colors"
        >

          <div className="w-12 h-12 rounded-xl bg-[#A7D8C4] bg-opacity-60 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-5 h-5 text-[#2D7A3A]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[15px] font-semibold text-gray-900">{order.orderId}</span>
              <Badge variant={orderStatusVariant(order.status)}>{order.status}</Badge>
            </div>
            <p className="text-[13px] text-gray-600 truncate">{order.items}</p>
            <div className="flex items-center gap-4 mt-0.5">
              <p className="text-[13px] text-gray-500">{fmtDate(order.date)}</p>
              <p className="text-[13px] font-bold text-gray-900">₹{order.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className="relative flex-shrink-0">
            <select
              id={`select-order-status-${order.id}`}
              value={order.status}
              onChange={(e) => updateOrderStatus(user.id, order.id, e.target.value as Order['status'])}
              className="appearance-none pl-4 pr-9 py-2 text-[13px] font-medium border border-gray-200 rounded-lg
                text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 cursor-pointer bg-white"
            >
              {ORDER_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button
            id={`btn-delete-order-${order.id}`}
            onClick={() => deleteOrder(order.id)}
            className="w-[34px] h-[34px] flex items-center justify-center rounded-lg bg-white border border-red-100 text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
