import React, { useState } from 'react';
import { ArrowLeftRight, Plus, CheckCircle, Truck, Package, Clock } from 'lucide-react';

export default function TransfersPage() {
  const [transfers, setTransfers] = useState([
    {
      id: 1,
      transferNumber: 'TRF-2026-0091',
      source: 'NORTH HUB (Delhi NCR)',
      destination: 'WEST HUB (Mumbai)',
      product: 'Industrial LiDAR Sensor Unit Pro (LOG-IND-7701)',
      quantity: 40,
      status: 'IN_TRANSIT',
      requestedBy: 'Ananya Deshmukh',
      tracking: 'LOG-EXPR-99218',
      date: '2026-09-22 14:30'
    },
    {
      id: 2,
      transferNumber: 'TRF-2026-0090',
      source: 'SOUTH HUB (Bengaluru)',
      destination: 'CENTRAL HUB (Hyderabad)',
      product: 'High-Load Smart Poly-Pallet (LOG-PAL-4402)',
      quantity: 150,
      status: 'APPROVED',
      requestedBy: 'Sunita Rao',
      tracking: 'LOG-EXPR-99210',
      date: '2026-09-22 11:15'
    },
    {
      id: 3,
      transferNumber: 'TRF-2026-0089',
      source: 'WEST HUB (Mumbai)',
      destination: 'MID WEST HUB (Pune)',
      product: 'Lithium-Iron Battery Module (LOG-FORK-3305)',
      quantity: 10,
      status: 'RECEIVED',
      requestedBy: 'Kunal Patil',
      tracking: 'LOG-EXPR-99180',
      date: '2026-09-21 16:40'
    }
  ]);

  const [createModal, setCreateModal] = useState(false);
  const [form, setForm] = useState({
    source: 'NORTH HUB (Delhi NCR)',
    destination: 'WEST HUB (Mumbai)',
    product: 'Industrial LiDAR Sensor Unit Pro (LOG-IND-7701)',
    quantity: 25,
    requestedBy: 'Operations Manager'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const newTrf = {
      id: Date.now(),
      transferNumber: 'TRF-' + Math.floor(1000 + Math.random() * 9000),
      source: form.source,
      destination: form.destination,
      product: form.product,
      quantity: parseInt(form.quantity, 10),
      status: 'PENDING',
      requestedBy: form.requestedBy,
      tracking: 'LOG-EXPR-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setTransfers([newTrf, ...transfers]);
    setCreateModal(false);
  };

  const advanceTransfer = (id, newStatus) => {
    setTransfers(transfers.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-editorial text-[#F5F3EE]">INTER-WAREHOUSE TRANSFERS</h1>
          <p className="text-xs text-[#A6A9AF] mt-1">
            Workflow: REQUEST → APPROVAL → RESERVE → DISPATCH → IN TRANSIT → RECEIVE → UPDATE INVENTORY.
          </p>
        </div>

        <button
          onClick={() => setCreateModal(true)}
          className="bg-[#D6A85F] hover:bg-[#F0C982] text-black text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Initiate Transfer</span>
        </button>
      </div>

      <div className="bg-[#0B0D10] border border-[#1B1F27] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101318] text-[#A6A9AF] uppercase text-[10px] tracking-wider border-b border-[#1B1F27]">
              <tr>
                <th className="py-3 px-4">Transfer #</th>
                <th className="py-3 px-4">Source → Destination</th>
                <th className="py-3 px-4">Product Cargo</th>
                <th className="py-3 px-4 text-right">Quantity</th>
                <th className="py-3 px-4">Tracking Code</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Workflow Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B1F27] text-[#F5F3EE]">
              {transfers.map((t) => (
                <tr key={t.id} className="hover:bg-[#101318]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-[#D6A85F]">
                    {t.transferNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="block font-medium text-xs">{t.source}</span>
                    <span className="text-[11px] text-[#A6A9AF] flex items-center gap-1">
                      → {t.destination}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium">
                    {t.product}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold">
                    {t.quantity}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#6F737A]">
                    {t.tracking}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono ${
                      t.status === 'RECEIVED' ? 'bg-[#6FAF8F]/10 text-[#6FAF8F] border border-[#6FAF8F]/30' :
                      t.status === 'IN_TRANSIT' ? 'bg-[#D6A85F]/10 text-[#D6A85F] border border-[#D6A85F]/30' :
                      'bg-[#617582]/10 text-[#617582] border border-[#617582]/30'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {t.status === 'PENDING' && (
                      <button
                        onClick={() => advanceTransfer(t.id, 'APPROVED')}
                        className="px-2.5 py-1 rounded bg-[#101318] hover:bg-[#1B1F27] border border-[#252830] text-[11px] text-[#D6A85F]"
                      >
                        Approve
                      </button>
                    )}
                    {t.status === 'APPROVED' && (
                      <button
                        onClick={() => advanceTransfer(t.id, 'IN_TRANSIT')}
                        className="px-2.5 py-1 rounded bg-[#D6A85F] hover:bg-[#F0C982] text-black font-semibold text-[11px]"
                      >
                        Dispatch Cargo
                      </button>
                    )}
                    {t.status === 'IN_TRANSIT' && (
                      <button
                        onClick={() => advanceTransfer(t.id, 'RECEIVED')}
                        className="px-2.5 py-1 rounded bg-[#6FAF8F] hover:bg-[#85c9a7] text-black font-semibold text-[11px]"
                      >
                        Confirm Receipt
                      </button>
                    )}
                    {t.status === 'RECEIVED' && (
                      <span className="text-[11px] text-[#6FAF8F] font-mono">Stock Updated</span>
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
            <h3 className="text-base font-bold font-editorial text-[#F5F3EE] mb-1">CREATE TRANSFER REQUISITION</h3>
            <p className="text-xs text-[#A6A9AF] mb-4">Stock will be reserved at source upon approval.</p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Source Warehouse</label>
                <select
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  className="w-full bg-[#0B0D10] border border-[#252830] text-xs text-[#F5F3EE] rounded px-3 py-2 outline-none"
                >
                  <option value="NORTH HUB (Delhi NCR)">NORTH HUB (Delhi NCR)</option>
                  <option value="WEST HUB (Mumbai)">WEST HUB (Mumbai)</option>
                  <option value="SOUTH HUB (Bengaluru)">SOUTH HUB (Bengaluru)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Destination Warehouse</label>
                <select
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  className="w-full bg-[#0B0D10] border border-[#252830] text-xs text-[#F5F3EE] rounded px-3 py-2 outline-none"
                >
                  <option value="WEST HUB (Mumbai)">WEST HUB (Mumbai)</option>
                  <option value="NORTH HUB (Delhi NCR)">NORTH HUB (Delhi NCR)</option>
                  <option value="SOUTH HUB (Bengaluru)">SOUTH HUB (Bengaluru)</option>
                  <option value="CENTRAL HUB (Hyderabad)">CENTRAL HUB (Hyderabad)</option>
                </select>
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
                  Submit Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
