import { CreditCard } from 'lucide-react';
import { useUserStore } from '../../../store/useUserStore';
import { Badge } from '../../../components/ui/Badge';
import type { User } from '../../../types';

interface PaymentHistoryProps {
  user: User;
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function PaymentHistory({ user }: PaymentHistoryProps) {
  const { users } = useUserStore();
  const liveUser = users.find((u) => u.id === user.id) ?? user;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-800">Payment History</h3>
      {liveUser.payments.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-200">
          <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No payments yet</p>
        </div>
      )}
      {liveUser.payments.map((payment) => (
        <div
          key={payment.id}
          id={`payment-row-${payment.id}`}
          className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-4"
        >

          <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-[#2D7A3A]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-gray-800">{payment.paymentId}</span>
              <Badge variant={payment.status} />
            </div>
            <p className="text-xs text-gray-600">{payment.description}</p>
            <div className="flex items-center gap-3 mt-0.5">
              <p className="text-xs text-gray-400">{fmtDate(payment.date)}</p>
              <span className="text-xs text-gray-400">•</span>
              <p className="text-xs text-gray-500 font-medium">{payment.method}</p>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-gray-900">₹{payment.amount.toLocaleString('en-IN')}</p>
            <p className="text-xs text-gray-400">{payment.method}</p>
          </div>
        </div>
      ))}

      {liveUser.payments.length > 0 && (
        <div className="bg-[#F0FDF4] border border-[#2D7A3A]/20 rounded-2xl px-5 py-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-[#2D7A3A]">Total Spent</p>
          <p className="text-base font-bold text-[#2D7A3A]">
            ₹{liveUser.payments
              .filter((p) => p.status === 'Completed')
              .reduce((s, p) => s + p.amount, 0)
              .toLocaleString('en-IN')}
          </p>
        </div>
      )}
    </div>
  );
}
