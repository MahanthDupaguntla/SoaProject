import React, { useState } from 'react';
import { Package, Plus, Search, Tag, Barcode, Calendar } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      sku: 'LOG-IND-7701',
      name: 'Industrial LiDAR Sensor Unit Pro',
      category: 'Automation & Robotics',
      brand: 'ApexMotion Dynamics',
      unit: 'PCS',
      price: 1240.00,
      cost: 820.00,
      barcode: '8901245007701',
      reorderLevel: 100,
      status: 'ACTIVE',
      batch: 'BAT-2026-X01'
    },
    {
      id: 2,
      sku: 'LOG-PAL-4402',
      name: 'High-Load Smart Poly-Pallet (RFID Tagged)',
      category: 'Storage & Material Handling',
      brand: 'Logistra HeavyDuty',
      unit: 'PCS',
      price: 95.00,
      cost: 55.00,
      barcode: '8901245004402',
      reorderLevel: 300,
      status: 'ACTIVE',
      batch: 'BAT-2026-P99'
    },
    {
      id: 3,
      sku: 'LOG-FORK-3305',
      name: 'Lithium-Iron Battery Module 48V 600Ah',
      category: 'Power Systems',
      brand: 'VoltStorage Enterprise',
      unit: 'UNITS',
      price: 4850.00,
      cost: 3400.00,
      barcode: '8901245003305',
      reorderLevel: 15,
      status: 'ACTIVE',
      batch: 'BAT-VLT-881'
    }
  ]);

  const [search, setSearch] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({
    sku: '',
    name: '',
    category: 'Automation & Robotics',
    brand: '',
    unit: 'PCS',
    price: '',
    cost: '',
    barcode: '',
    reorderLevel: 50
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const newProd = {
      id: Date.now(),
      sku: form.sku.toUpperCase(),
      name: form.name,
      category: form.category,
      brand: form.brand,
      unit: form.unit,
      price: parseFloat(form.price) || 0,
      cost: parseFloat(form.cost) || 0,
      barcode: form.barcode || '890' + Math.floor(1000000000 + Math.random() * 9000000000),
      reorderLevel: parseInt(form.reorderLevel, 10),
      status: 'ACTIVE',
      batch: 'BAT-' + new Date().getFullYear() + '-01'
    };
    setProducts([...products, newProd]);
    setAddModal(false);
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-editorial text-[#F5F3EE]">PRODUCT MASTER CATALOG</h1>
          <p className="text-xs text-[#A6A9AF] mt-1">
            SKUs, Barcodes, Unit Pricing, Categories, Batch Tracking, and Reorder Triggers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0B0D10] border border-[#1B1F27] text-xs">
            <Search className="w-3.5 h-3.5 text-[#6F737A]" />
            <input
              type="text"
              placeholder="Search SKU, Brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-xs text-[#F5F3EE] placeholder-[#6F737A] w-40"
            />
          </div>

          <button
            onClick={() => setAddModal(true)}
            className="bg-[#D6A85F] hover:bg-[#F0C982] text-black text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Product</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#0B0D10] border border-[#1B1F27] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101318] text-[#A6A9AF] uppercase text-[10px] tracking-wider border-b border-[#1B1F27]">
              <tr>
                <th className="py-3 px-4">SKU / Barcode</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category & Brand</th>
                <th className="py-3 px-4 text-right">Cost Price</th>
                <th className="py-3 px-4 text-right">Selling Price</th>
                <th className="py-3 px-4 text-right">Reorder Level</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B1F27] text-[#F5F3EE]">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#101318]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs text-[#D6A85F] font-semibold block">{prod.sku}</span>
                    <span className="font-mono text-[10px] text-[#6F737A] flex items-center gap-1">
                      <Barcode className="w-3 h-3" /> {prod.barcode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">
                    {prod.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="block text-xs text-[#F5F3EE]">{prod.category}</span>
                    <span className="text-[10px] text-[#A6A9AF]">{prod.brand}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#A6A9AF]">
                    ${prod.cost.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#6FAF8F]">
                    ${prod.price.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#D6A85F]">
                    {prod.reorderLevel} {prod.unit}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-[#6FAF8F]/10 text-[#6FAF8F] border border-[#6FAF8F]/30">
                      {prod.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {addModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#101318] border border-[#252830] rounded-xl p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-base font-bold font-editorial text-[#F5F3EE] mb-1">REGISTER PRODUCT SKU</h3>
            <p className="text-xs text-[#A6A9AF] mb-4">Define product entity in logistra_product_db.</p>

            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">SKU</label>
                  <input
                    type="text"
                    placeholder="e.g. LOG-ROB-9021"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="Full title description"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Cost Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.cost}
                    onChange={(e) => setForm({ ...form, cost: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Selling Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Reorder Level</label>
                  <input
                    type="number"
                    value={form.reorderLevel}
                    onChange={(e) => setForm({ ...form, reorderLevel: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#1B1F27]">
                <button
                  type="button"
                  onClick={() => setAddModal(false)}
                  className="px-4 py-2 rounded bg-[#101318] text-[#A6A9AF] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#D6A85F] hover:bg-[#F0C982] text-black font-semibold text-xs transition-colors"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
