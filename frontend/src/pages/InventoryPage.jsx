import React, { useState } from 'react';
import {
  Boxes,
  Search,
  Plus,
  ArrowUpDown,
  Filter,
  CheckCircle,
  AlertTriangle,
  History
} from 'lucide-react';

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWarehouse, setFilterWarehouse] = useState('ALL');

  // Initial stock data loaded from microservice model
  const [inventoryList, setInventoryList] = useState([
    {
      id: 1,
      sku: 'LOG-IND-7701',
      name: 'Industrial LiDAR Sensor Unit Pro',
      warehouse: 'NORTH HUB (Delhi NCR)',
      warehouseCode: 'WH-DEL-01',
      location: 'Z1-R04-S2-B12',
      quantity: 320,
      reserved: 20,
      available: 300,
      batch: 'BAT-2026-X01',
      status: 'OPTIMAL'
    },
    {
      id: 2,
      sku: 'LOG-PAL-4402',
      name: 'High-Load Smart Poly-Pallet (RFID)',
      warehouse: 'NORTH HUB (Delhi NCR)',
      warehouseCode: 'WH-DEL-01',
      location: 'Z2-R01-S1-B05',
      quantity: 850,
      reserved: 50,
      available: 800,
      batch: 'BAT-2026-P99',
      status: 'OPTIMAL'
    },
    {
      id: 3,
      sku: 'LOG-IND-7701',
      name: 'Industrial LiDAR Sensor Unit Pro',
      warehouse: 'WEST HUB (Mumbai)',
      warehouseCode: 'WH-BOM-02',
      location: 'Z1-R02-S3-B08',
      quantity: 160,
      reserved: 0,
      available: 160,
      batch: 'BAT-2026-X01',
      status: 'OPTIMAL'
    },
    {
      id: 4,
      sku: 'LOG-FORK-3305',
      name: 'Lithium-Iron Battery Module 48V',
      warehouse: 'SOUTH HUB (Bengaluru)',
      warehouseCode: 'WH-BLR-03',
      location: 'Z3-R05-S1-B01',
      quantity: 12,
      reserved: 4,
      available: 8,
      batch: 'BAT-VLT-881',
      status: 'LOW STOCK'
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [adjustmentForm, setAdjustmentForm] = useState({
    id: null,
    sku: '',
    name: '',
    currentQuantity: 0,
    newQuantity: 0,
    reason: 'Cycle Count Audit Adjustment'
  });

  const handleOpenAdjust = (item) => {
    setAdjustmentForm({
      id: item.id,
      sku: item.sku,
      name: item.name,
      currentQuantity: item.quantity,
      newQuantity: item.quantity,
      reason: 'Physical Audit Adjustment'
    });
    setModalOpen(true);
  };

  const handleSaveAdjustment = (e) => {
    e.preventDefault();
    setInventoryList(prev => prev.map(item => {
      if (item.id === adjustmentForm.id) {
        const newQty = parseInt(adjustmentForm.newQuantity, 10);
        return {
          ...item,
          quantity: newQty,
          available: Math.max(0, newQty - item.reserved)
        };
      }
      return item;
    }));
    setModalOpen(false);
  };

  const filtered = inventoryList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWh = filterWarehouse === 'ALL' || item.warehouseCode === filterWarehouse;
    return matchesSearch && matchesWh;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-editorial text-[#F5F3EE]">INVENTORY & MULTI-WAREHOUSE STOCK</h1>
          <p className="text-xs text-[#A6A9AF] mt-1">
            Real-time stock balance, optimistic locking concurrency protection, and bin allocations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0B0D10] border border-[#1B1F27] text-xs">
            <Search className="w-3.5 h-3.5 text-[#6F737A]" />
            <input
              type="text"
              placeholder="Filter SKU, Name, Bin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-xs text-[#F5F3EE] placeholder-[#6F737A] w-40"
            />
          </div>

          <select
            value={filterWarehouse}
            onChange={(e) => setFilterWarehouse(e.target.value)}
            className="bg-[#0B0D10] border border-[#1B1F27] text-xs text-[#F5F3EE] rounded-lg px-3 py-2 outline-none"
          >
            <option value="ALL">All Hubs (India Network)</option>
            <option value="WH-DEL-01">NORTH HUB (Delhi NCR)</option>
            <option value="WH-BOM-02">WEST HUB (Mumbai)</option>
            <option value="WH-BLR-03">SOUTH HUB (Bengaluru)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-[#0B0D10] border border-[#1B1F27] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101318] text-[#A6A9AF] uppercase text-[10px] tracking-wider border-b border-[#1B1F27]">
              <tr>
                <th className="py-3 px-4">SKU / Product</th>
                <th className="py-3 px-4">Warehouse & Bin</th>
                <th className="py-3 px-4">Batch Number</th>
                <th className="py-3 px-4 text-right">Physical Total</th>
                <th className="py-3 px-4 text-right">Reserved</th>
                <th className="py-3 px-4 text-right">Available</th>
                <th className="py-3 px-4">Health</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B1F27] text-[#F5F3EE]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#101318]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11px] text-[#D6A85F] block">{item.sku}</span>
                    <span className="font-medium text-xs">{item.name}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="block font-medium">{item.warehouse}</span>
                    <span className="text-[11px] font-mono text-[#6F737A]">{item.location}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#A6A9AF]">
                    {item.batch}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold">
                    {item.quantity}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#D6A85F]">
                    {item.reserved}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#6FAF8F] font-semibold">
                    {item.available}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                      item.status === 'LOW STOCK'
                        ? 'bg-[#C89A52]/10 text-[#C89A52] border border-[#C89A52]/30'
                        : 'bg-[#6FAF8F]/10 text-[#6FAF8F] border border-[#6FAF8F]/30'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenAdjust(item)}
                      className="px-2.5 py-1 rounded bg-[#101318] hover:bg-[#1B1F27] border border-[#252830] text-[11px] text-[#D6A85F] transition-colors"
                    >
                      Adjust Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#101318] border border-[#252830] rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold font-editorial text-[#F5F3EE] mb-1">
              RECORD STOCK ADJUSTMENT
            </h3>
            <p className="text-xs text-[#A6A9AF] mb-4">
              Direct adjustment creates an audited movement ledger entry in Inventory Service.
            </p>

            <form onSubmit={handleSaveAdjustment} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Product</label>
                <div className="text-xs font-mono text-[#D6A85F]">{adjustmentForm.sku} — {adjustmentForm.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Current Quantity</label>
                  <div className="text-sm font-mono font-bold text-[#F5F3EE]">{adjustmentForm.currentQuantity}</div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">New Physical Quantity</label>
                  <input
                    type="number"
                    value={adjustmentForm.newQuantity}
                    onChange={(e) => setAdjustmentForm({ ...adjustmentForm, newQuantity: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] focus:border-[#D6A85F] rounded px-3 py-1.5 text-xs text-[#F5F3EE] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Audit Reason</label>
                <input
                  type="text"
                  value={adjustmentForm.reason}
                  onChange={(e) => setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })}
                  required
                  className="w-full bg-[#0B0D10] border border-[#252830] focus:border-[#D6A85F] rounded px-3 py-1.5 text-xs text-[#F5F3EE] outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#1B1F27]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-[#101318] text-[#A6A9AF] hover:text-[#F5F3EE] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#D6A85F] hover:bg-[#F0C982] text-black font-semibold text-xs transition-colors"
                >
                  Commit Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
