import { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Card } from '../shared/Card';
import { Badge } from '../shared/Badge';
import { Modal } from '../shared/Modal';
import type { OrderStatus, PaymentMethod } from '../../types';

interface Props { userId: string; }

const PAYMENT_METHODS: PaymentMethod[] = ['credit_card', 'debit_card', 'upi', 'net_banking', 'cash'];

export function OrdersPaymentsTab({ userId }: Props) {
  const { orders, addOrder } = useStore();
  const userOrders = orders.filter((o) => o.userId === userId);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    itemName: '', amount: '', status: 'paid' as OrderStatus,
    paymentMethod: 'upi' as PaymentMethod,
  });
  const [showInvoice, setShowInvoice] = useState<string | null>(null);

  const invoiceOrder = orders.find((o) => o.id === showInvoice);

  const totalPaid = userOrders.filter((o) => o.status === 'paid').reduce((s, o) => s + o.amount, 0);
  const totalPending = userOrders.filter((o) => o.status === 'pending').reduce((s, o) => s + o.amount, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const user = useStore.getState().users.find((u) => u.id === userId);
    addOrder({
      userId,
      userName: user?.name ?? '',
      itemName: form.itemName,
      amount: Number(form.amount),
      status: form.status,
      paymentMethod: form.paymentMethod,
      date: new Date().toISOString().split('T')[0],
    });
    setForm({ itemName: '', amount: '', status: 'paid', paymentMethod: 'upi' });
    setShowModal(false);
  };

  return (
    <>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Total Orders', value: userOrders.length, color: '#111827' },
          { label: 'Total Paid', value: `₹${totalPaid.toLocaleString('en-IN')}`, color: '#16A34A' },
          { label: 'Pending', value: `₹${totalPending.toLocaleString('en-IN')}`, color: '#D97706' },
        ].map(({ label, value, color }) => (
          <Card key={label} className="text-center !py-3.5">
            <p className="text-lg font-bold" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      <Card noPad>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Orders & Payments</h3>
          <button
            id="btn-add-order"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-[#111827] rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Order
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {userOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">No orders found.</div>
          ) : (
            userOrders.map((order) => (
              <div key={order.id} id={`order-row-${order.id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/50">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{order.itemName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {order.invoiceNumber} · {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} ·
                    <span className="capitalize ml-1">{order.paymentMethod.replace(/_/g, ' ')}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">₹{order.amount.toLocaleString('en-IN')}</p>
                  <Badge variant={order.status} />
                  <button
                    id={`btn-invoice-${order.id}`}
                    onClick={() => setShowInvoice(order.id)}
                    className="text-xs text-[#2D7A3A] hover:underline"
                  >Invoice</button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Order" id="modal-add-order">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Item / Service Name <span className="text-red-400">*</span></label>
            <input
              id="input-order-item"
              required
              value={form.itemName}
              onChange={(e) => setForm({ ...form, itemName: e.target.value })}
              placeholder="e.g. Premium Health Plan"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Amount (₹) <span className="text-red-400">*</span></label>
              <input
                id="input-order-amount"
                required type="number" min={1}
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
              <select
                id="select-order-status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as OrderStatus })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Payment Method</label>
            <select
              id="select-order-payment-method"
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value as PaymentMethod })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m} value={m}>{m.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" id="btn-submit-order" className="px-5 py-2 text-sm font-semibold text-white bg-[#111827] rounded-xl hover:bg-gray-800">Add Order</button>
          </div>
        </form>
      </Modal>

      {invoiceOrder && (
        <Modal isOpen={!!showInvoice} onClose={() => setShowInvoice(null)} title="Invoice Preview" size="sm" id="modal-invoice">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h4 className="font-bold text-gray-900">JivaHealth</h4>
                <p className="text-xs text-gray-400">admin@jivahealth.in</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#2D7A3A]">{invoiceOrder.invoiceNumber}</p>
                <p className="text-xs text-gray-400">{new Date(invoiceOrder.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Service</span>
                <span className="font-medium text-gray-900">{invoiceOrder.itemName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment Method</span>
                <span className="text-gray-700 capitalize">{invoiceOrder.paymentMethod.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <Badge variant={invoiceOrder.status} />
              </div>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total Amount</span>
              <span className="text-xl font-bold text-[#2D7A3A]">₹{invoiceOrder.amount.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-gray-400 text-center">Thank you for choosing JivaHealth</p>
          </div>
        </Modal>
      )}
    </>
  );
}
