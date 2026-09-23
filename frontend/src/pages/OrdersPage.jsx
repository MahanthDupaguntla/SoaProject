import React, { useState } from 'react';
import { ShoppingCart, Plus, CheckCircle, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-2026-0881',
      customer: 'Aerospace Systems India',
      email: 'procurement@aerospace-systems.in',
      product: 'Industrial LiDAR Sensor Unit Pro (LOG-IND-7701)',
      quantity: 10,
      total: 12400.00,
      warehouse: 'NORTH HUB (Delhi NCR)',
      status: 'CONFIRMED',
      sagaReservation: 'RESERVED'
    },
    {
      id: 2,
      orderNumber: 'ORD-2026-0882',
      customer: 'National Logistics Logistics Ltd',
      email: 'supply@natlogistics.com',
      product: 'High-Load Smart Poly-Pallet (LOG-PAL-4402)',
      quantity: 50,
      total: 4750.00,
      warehouse: 'WEST HUB (Mumbai)',
      status: 'PROCESSING',
      sagaReservation: 'RESERVED'
    }
  ]);

  const [createModal, setCreateModal] = useState(false);
  const [form, setForm] = useState({
    customer: '',
    email: '',
    product: 'Industrial LiDAR Sensor Unit Pro (LOG-IND-7701)',
    quantity: 5,
    warehouse: 'NORTH HUB (Delhi NCR)',
    total: 6200.00
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrd = {
      id: Date.now(),
      orderNumber: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customer: form.customer,
      email: form.email,
      product: form.product,
      quantity: parseInt(form.quantity, 10),
      total: parseFloat(form.total) || 5000,
      warehouse: form.warehouse,
      status: 'CONFIRMED',
      sagaReservation: 'RESERVED'
    };
    setOrders([newOrd, ...orders]);
    setCreateModal(false);
  };

  const advanceOrder = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-editorial text-[#F5F3EE]">ORDERS & SAGA RESERVATIONS</h1>
          <p className="text-xs text-[#A6A9AF] mt-1">
            Order lifecycle with distributed SAGA pattern: Order Creation → Inventory Reservation → Confirmation.
          </p>
        </div>

        <button
          onClick={() => setCreateModal(true)}
          className="bg-[#D6A85F] hover:bg-[#F0C982] text-black text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Place New Order</span>
        </button>
      </div>

      <div className="bg-[#0B0D10] border border-[#1B1F27] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101318] text-[#A6A9AF] uppercase text-[10px] tracking-wider border-b border-[#1B1F27]">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer Entity</th>
                <th className="py-3 px-4">Fulfillment Hub</th>
                <th className="py-3 px-4">Product Cargo</th>
                <th className="py-3 px-4 text-right">Quantity</th>
                <th className="py-3 px-4 text-right">Total ($)</th>
                <th className="py-3 px-4">SAGA Reservation</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4 text-right">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B1F27] text-[#F5F3EE]">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#101318]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-[#D6A85F]">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="block font-medium">{ord.customer}</span>
                    <span className="text-[10px] text-[#A6A9AF]">{ord.email}</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs">
                    {ord.warehouse}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium">
                    {ord.product}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold">
                    {ord.quantity}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#6FAF8F] font-semibold">
                    ${ord.total.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#6FAF8F]/10 text-[#6FAF8F] border border-[#6FAF8F]/30">
                      <ShieldCheck className="w-3 h-3" /> {ord.sagaReservation}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-[#101318] text-[#D6A85F] border border-[#D6A85F]/30">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {ord.status === 'CONFIRMED' && (
                      <button
                        onClick={() => advanceOrder(ord.id, 'PROCESSING')}
                        className="px-2.5 py-1 rounded bg-[#101318] hover:bg-[#1B1F27] border border-[#252830] text-[11px] text-[#D6A85F]"
                      >
                        Start Picking
                      </button>
                    )}
                    {ord.status === 'PROCESSING' && (
                      <button
                        onClick={() => advanceOrder(ord.id, 'DISPATCHED')}
                        className="px-2.5 py-1 rounded bg-[#D6A85F] hover:bg-[#F0C982] text-black font-semibold text-[11px]"
                      >
                        Dispatch
                      </button>
                    )}
                    {ord.status === 'DISPATCHED' && (
                      <span className="text-[11px] text-[#6FAF8F] font-mono">Dispatched</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {createModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#101318] border border-[#252830] rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold font-editorial text-[#F5F3EE] mb-1">PLACE SALES ORDER</h3>
            <p className="text-xs text-[#A6A9AF] mb-4">Triggers atomic SAGA reservation across Inventory microservice.</p>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Client Entity</label>
                <input
                  type="text"
                  placeholder="Enterprise Client Name"
                  value={form.customer}
                  onChange={(e) => setForm({ ...form, customer: e.target.value })}
                  required
                  className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Billing Email</label>
                <input
                  type="email"
                  placeholder="billing@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Product</label>
                <select
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  className="w-full bg-[#0B0D10] border border-[#252830] text-xs text-[#F5F3EE] rounded px-3 py-2 outline-none"
                >
                  <option value="Industrial LiDAR Sensor Unit Pro (LOG-IND-7701)">Industrial LiDAR Sensor Unit Pro (LOG-IND-7701)</option>
                  <option value="High-Load Smart Poly-Pallet (LOG-PAL-4402)">High-Load Smart Poly-Pallet (LOG-PAL-4402)</option>
                  <option value="Lithium-Iron Battery Module (LOG-FORK-3305)">Lithium-Iron Battery Module (LOG-FORK-3305)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Quantity</label>
                  <input
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Hub</label>
                  <select
                    value={form.warehouse}
                    onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#252830] text-xs text-[#F5F3EE] rounded px-3 py-2 outline-none"
                  >
                    <option value="NORTH HUB (Delhi NCR)">NORTH HUB (Delhi NCR)</option>
                    <option value="WEST HUB (Mumbai)">WEST HUB (Mumbai)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#1B1F27]">
                <button
                  type="button"
                  onClick={() => setCreateModal(false)}
                  className="px-4 py-2 rounded bg-[#101318] text-[#A6A9AF] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#D6A85F] hover:bg-[#F0C982] text-black font-semibold text-xs transition-colors"
                >
                  Trigger SAGA Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
