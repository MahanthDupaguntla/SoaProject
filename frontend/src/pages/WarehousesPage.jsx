import React, { useState } from 'react';
import { Warehouse, Plus, MapPin, Layers, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      code: 'WH-DEL-01',
      name: 'NORTH HUB',
      city: 'Delhi NCR',
      state: 'Delhi',
      country: 'India',
      manager: 'Vikram Singhania',
      capacity: 250000,
      utilization: 74,
      status: 'ACTIVE',
      zones: ['Z1-Robotics', 'Z2-Heavy Storage', 'Z3-Cold Zone']
    },
    {
      id: 2,
      code: 'WH-BOM-02',
      name: 'WEST HUB',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      manager: 'Ananya Deshmukh',
      capacity: 300000,
      utilization: 82,
      status: 'ACTIVE',
      zones: ['Z1-High Rack', 'Z2-Transit Dock', 'Z3-Quarantine']
    },
    {
      id: 3,
      code: 'WH-BLR-03',
      name: 'SOUTH HUB',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      manager: 'Rajesh Hegde',
      capacity: 280000,
      utilization: 68,
      status: 'ACTIVE',
      zones: ['Z1-Automated Racks', 'Z2-Assembly', 'Z3-Express Bay']
    },
    {
      id: 4,
      code: 'WH-HYD-04',
      name: 'CENTRAL HUB',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      manager: 'Sunita Rao',
      capacity: 210000,
      utilization: 61,
      status: 'ACTIVE',
      zones: ['Z1-Bulk Storage', 'Z2-Packaging', 'Z3-Buffer']
    },
    {
      id: 5,
      code: 'WH-CCU-05',
      name: 'EAST HUB',
      city: 'Kolkata',
      state: 'West Bengal',
      country: 'India',
      manager: 'Debashis Roy',
      capacity: 190000,
      utilization: 55,
      status: 'ACTIVE',
      zones: ['Z1-Pallet Racks', 'Z2-Receiving']
    },
    {
      id: 6,
      code: 'WH-PNQ-06',
      name: 'MID WEST HUB',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      manager: 'Kunal Patil',
      capacity: 175000,
      utilization: 79,
      status: 'ACTIVE',
      zones: ['Z1-Fast Mover Rack', 'Z2-Inspection']
    }
  ]);

  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({
    code: '',
    name: '',
    city: '',
    state: '',
    manager: '',
    capacity: 200000
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const newWh = {
      id: Date.now(),
      code: form.code.toUpperCase(),
      name: form.name.toUpperCase(),
      city: form.city,
      state: form.state,
      country: 'India',
      manager: form.manager,
      capacity: parseInt(form.capacity, 10),
      utilization: 10,
      status: 'ACTIVE',
      zones: ['Z1-General Rack', 'Z2-Transit Area']
    };
    setWarehouses([...warehouses, newWh]);
    setAddModal(false);
    setForm({ code: '', name: '', city: '', state: '', manager: '', capacity: 200000 });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-editorial text-[#F5F3EE]">WAREHOUSE NETWORK & LOCATIONS</h1>
          <p className="text-xs text-[#A6A9AF] mt-1">
            Hierarchy: Warehouse → Zone → Rack → Shelf → Bin. Capacity utilization and real-time node states.
          </p>
        </div>

        <button
          onClick={() => setAddModal(true)}
          className="bg-[#D6A85F] hover:bg-[#F0C982] text-black text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Warehouse Hub</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((wh) => (
          <div key={wh.id} className="p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27] relative group hover:border-[#D6A85F]/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-[#D6A85F] font-semibold">{wh.code}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#6FAF8F]/10 border border-[#6FAF8F]/30 text-[#6FAF8F] font-mono">
                {wh.status}
              </span>
            </div>

            <h3 className="text-xl font-bold font-editorial text-[#F5F3EE]">{wh.name}</h3>
            <p className="text-xs text-[#A6A9AF] flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#6F737A]" />
              {wh.city}, {wh.state}
            </p>

            <div className="mt-6 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#6F737A]">Utilization</span>
                  <span className="font-mono font-semibold text-[#F5F3EE]">{wh.utilization}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#101318] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      wh.utilization > 80 ? 'bg-[#C86B67]' : wh.utilization > 70 ? 'bg-[#D6A85F]' : 'bg-[#6FAF8F]'
                    }`}
                    style={{ width: `${wh.utilization}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#1B1F27] flex items-center justify-between text-xs">
                <span className="text-[#6F737A]">Manager:</span>
                <span className="text-[#F5F3EE] font-medium">{wh.manager}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6F737A]">Max Capacity:</span>
                <span className="font-mono text-[#F5F3EE]">{wh.capacity.toLocaleString()} Units</span>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {wh.zones.map((z, idx) => (
                  <span key={idx} className="text-[10px] bg-[#101318] border border-[#252830] px-2 py-0.5 rounded text-[#A6A9AF] font-mono">
                    {z}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {addModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#101318] border border-[#252830] rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold font-editorial text-[#F5F3EE] mb-1">ADD REGIONAL WAREHOUSE HUB</h3>
            <p className="text-xs text-[#A6A9AF] mb-4">Register new facility node in the global routing network.</p>

            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Code</label>
                  <input
                    type="text"
                    placeholder="e.g. WH-AMD-07"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Hub Name</label>
                  <input
                    type="text"
                    placeholder="e.g. GUJARAT HUB"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Ahmedabad"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">State</label>
                  <input
                    type="text"
                    placeholder="Gujarat"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Facility Manager</label>
                <input
                  type="text"
                  placeholder="Manager Full Name"
                  value={form.manager}
                  onChange={(e) => setForm({ ...form, manager: e.target.value })}
                  required
                  className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none"
                />
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
                  Register Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
