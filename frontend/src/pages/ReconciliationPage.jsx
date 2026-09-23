import React, { useState } from 'react';
import {
  GitCompare,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldAlert,
  FileCheck,
  Plus
} from 'lucide-react';

export default function ReconciliationPage() {
  const [reconciliations, setReconciliations] = useState([
    {
      id: 1,
      countNumber: 'REC-2026-0042',
      sku: 'LOG-PAL-4402',
      productName: 'High-Load Smart Poly-Pallet (RFID)',
      warehouse: 'NORTH HUB (Delhi NCR)',
      systemQty: 1000,
      physicalQty: 970,
      difference: -30,
      status: 'SHORTAGE',
      workflowState: 'DIFFERENCE_DETECTED',
      countedBy: 'Suresh Kumar (Floor Auditor)',
      reviewedBy: null,
      approvedBy: null,
      notes: 'Shortage of 30 units detected during cycle count'
    },
    {
      id: 2,
      countNumber: 'REC-2026-0041',
      sku: 'LOG-IND-7701',
      productName: 'Industrial LiDAR Sensor Unit Pro',
      warehouse: 'WEST HUB (Mumbai)',
      systemQty: 160,
      physicalQty: 160,
      difference: 0,
      status: 'MATCHED',
      workflowState: 'MATCHED',
      countedBy: 'Anand Verma',
      reviewedBy: 'Ananya Deshmukh',
      approvedBy: 'System Administrator',
      notes: '100% accurate count. Verified with barcode scan.'
    },
    {
      id: 3,
      countNumber: 'REC-2026-0040',
      sku: 'LOG-FORK-3305',
      productName: 'Lithium-Iron Battery Module 48V',
      warehouse: 'SOUTH HUB (Bengaluru)',
      systemQty: 10,
      physicalQty: 12,
      difference: 2,
      status: 'EXCESS',
      workflowState: 'MANAGER_REVIEW',
      countedBy: 'Karthik Nair',
      reviewedBy: 'Rajesh Hegde',
      approvedBy: null,
      notes: 'Found 2 extra batteries in quarantine bay.'
    }
  ]);

  const [newCountModal, setNewCountModal] = useState(false);
  const [newCount, setNewCount] = useState({
    sku: 'LOG-IND-7701',
    warehouse: 'NORTH HUB (Delhi NCR)',
    systemQty: 320,
    physicalQty: 320,
    notes: 'Floor verification scan'
  });

  const handleCreateCount = (e) => {
    e.preventDefault();
    const sys = parseInt(newCount.systemQty, 10);
    const phys = parseInt(newCount.physicalQty, 10);
    const diff = phys - sys;
    let st = 'MATCHED';
    if (diff < 0) st = 'SHORTAGE';
    if (diff > 0) st = 'EXCESS';

    const item = {
      id: Date.now(),
      countNumber: 'REC-' + Math.floor(1000 + Math.random() * 9000),
      sku: newCount.sku,
      productName: newCount.sku === 'LOG-IND-7701' ? 'Industrial LiDAR Sensor Pro' : 'Logistra SKU Unit',
      warehouse: newCount.warehouse,
      systemQty: sys,
      physicalQty: phys,
      difference: diff,
      status: st,
      workflowState: diff === 0 ? 'MATCHED' : 'DIFFERENCE_DETECTED',
      countedBy: 'Active Auditor',
      notes: newCount.notes
    };

    setReconciliations([item, ...reconciliations]);
    setNewCountModal(false);
  };

  const advanceWorkflow = (id, nextState) => {
    setReconciliations(prev => prev.map(rec => {
      if (rec.id === id) {
        return {
          ...rec,
          workflowState: nextState,
          approvedBy: nextState === 'ADJUSTED' ? 'System Administrator' : rec.approvedBy,
          reviewedBy: nextState === 'MANAGER_REVIEW' ? 'Operations Manager' : rec.reviewedBy
        };
      }
      return rec;
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#D6A85F]/10 border border-[#D6A85F]/30 text-[10px] font-mono text-[#D6A85F] mb-1">
            CORE ENGINE • AUDIT & DIFFERENCE RECOVERY
          </div>
          <h1 className="text-2xl font-bold font-editorial text-[#F5F3EE]">
            PHYSICAL STOCK RECONCILIATION
          </h1>
          <p className="text-xs text-[#A6A9AF] mt-1">
            Formulas: <span className="font-mono text-[#F5F3EE]">difference = physicalQuantity - systemQuantity</span>.
            Shortage (&lt;0), Matched (0), Excess (&gt;0).
          </p>
        </div>

        <button
          onClick={() => setNewCountModal(true)}
          className="bg-[#D6A85F] hover:bg-[#F0C982] text-black text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-[#D6A85F]/10 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record Physical Count</span>
        </button>
      </div>

      {/* Featured Enterprise Reconciliation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27] relative overflow-hidden">
          <span className="text-[10px] uppercase font-mono text-[#6F737A]">Matched Audit Items</span>
          <div className="text-3xl font-bold font-editorial text-[#6FAF8F] mt-2">1,420 Items</div>
          <p className="text-xs text-[#A6A9AF] mt-1">Zero variance verified by cycle scanners.</p>
        </div>

        <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#C86B67]/30 bg-[#C86B67]/5 relative overflow-hidden">
          <span className="text-[10px] uppercase font-mono text-[#C86B67]">Shortage Discrepancies</span>
          <div className="text-3xl font-bold font-editorial text-[#C86B67] mt-2">1 Audit Critical</div>
          <p className="text-xs text-[#A6A9AF] mt-1">REC-2026-0042: -30 units difference pending approval.</p>
        </div>

        <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#D6A85F]/30 bg-[#D6A85F]/5 relative overflow-hidden">
          <span className="text-[10px] uppercase font-mono text-[#D6A85F]">Excess Detected</span>
          <div className="text-3xl font-bold font-editorial text-[#D6A85F] mt-2">+2 Units</div>
          <p className="text-xs text-[#A6A9AF] mt-1">Unlogged batches found during inspection.</p>
        </div>
      </div>

      {/* Reconciliation Records Table */}
      <div className="bg-[#0B0D10] border border-[#1B1F27] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#1B1F27] flex items-center justify-between">
          <h2 className="text-sm font-bold font-editorial text-[#F5F3EE]">AUDIT DISCREPANCY LEDGER</h2>
          <span className="text-xs font-mono text-[#6F737A]">6-Stage Approval Gates</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101318] text-[#A6A9AF] uppercase text-[10px] tracking-wider border-b border-[#1B1F27]">
              <tr>
                <th className="py-3 px-4">Audit ID / SKU</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4 text-right">System Book</th>
                <th className="py-3 px-4 text-right">Physical Count</th>
                <th className="py-3 px-4 text-right">Difference</th>
                <th className="py-3 px-4">Variance Status</th>
                <th className="py-3 px-4">Workflow Stage</th>
                <th className="py-3 px-4 text-right">Stage Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B1F27] text-[#F5F3EE]">
              {reconciliations.map((rec) => (
                <tr key={rec.id} className="hover:bg-[#101318]/50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-mono text-xs text-[#D6A85F] font-semibold">{rec.countNumber}</span>
                    <span className="block text-[11px] text-[#A6A9AF]">{rec.sku} — {rec.productName}</span>
                  </td>
                  <td className="py-4 px-4 text-xs font-medium">
                    {rec.warehouse}
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-xs text-[#A6A9AF]">
                    {rec.systemQty}
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-xs font-semibold text-[#F5F3EE]">
                    {rec.physicalQty}
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-xs font-bold">
                    <span className={
                      rec.difference === 0 ? 'text-[#6FAF8F]' :
                      rec.difference < 0 ? 'text-[#C86B67]' : 'text-[#D6A85F]'
                    }>
                      {rec.difference > 0 ? `+${rec.difference}` : rec.difference}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                      rec.status === 'MATCHED' ? 'bg-[#6FAF8F]/10 text-[#6FAF8F] border border-[#6FAF8F]/30' :
                      rec.status === 'SHORTAGE' ? 'bg-[#C86B67]/10 text-[#C86B67] border border-[#C86B67]/30' :
                      'bg-[#D6A85F]/10 text-[#D6A85F] border border-[#D6A85F]/30'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-[#F5F3EE] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F]"></span>
                      {rec.workflowState.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    {rec.workflowState === 'DIFFERENCE_DETECTED' && (
                      <button
                        onClick={() => advanceWorkflow(rec.id, 'MANAGER_REVIEW')}
                        className="px-2.5 py-1 rounded bg-[#101318] hover:bg-[#1B1F27] border border-[#252830] text-[11px] text-[#D6A85F]"
                      >
                        Submit to Manager
                      </button>
                    )}

                    {rec.workflowState === 'MANAGER_REVIEW' && (
                      <button
                        onClick={() => advanceWorkflow(rec.id, 'ADJUSTED')}
                        className="px-2.5 py-1 rounded bg-[#D6A85F] hover:bg-[#F0C982] text-black font-semibold text-[11px]"
                      >
                        Approve & Adjust
                      </button>
                    )}

                    {rec.workflowState === 'ADJUSTED' && (
                      <span className="text-[11px] text-[#6FAF8F] font-mono flex items-center justify-end gap-1">
                        <CheckCircle className="w-3 h-3" /> Reconciled
                      </span>
                    )}

                    {rec.workflowState === 'MATCHED' && (
                      <span className="text-[11px] text-[#6FAF8F] font-mono">Verified Match</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Physical Count Modal */}
      {newCountModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#101318] border border-[#252830] rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold font-editorial text-[#F5F3EE] mb-1">
              INITIATE AUDIT PHYSICAL COUNT
            </h3>
            <p className="text-xs text-[#A6A9AF] mb-4">
              Enter verified physical count. Difference formula will automatically execute.
            </p>

            <form onSubmit={handleCreateCount} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Product SKU</label>
                <select
                  value={newCount.sku}
                  onChange={(e) => setNewCount({ ...newCount, sku: e.target.value })}
                  className="w-full bg-[#0B0D10] border border-[#252830] text-xs text-[#F5F3EE] rounded px-3 py-2 outline-none"
                >
                  <option value="LOG-IND-7701">LOG-IND-7701 (LiDAR Sensor Unit Pro)</option>
                  <option value="LOG-PAL-4402">LOG-PAL-4402 (Poly-Pallet RFID)</option>
                  <option value="LOG-FORK-3305">LOG-FORK-3305 (Battery Module 48V)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Warehouse Facility</label>
                <select
                  value={newCount.warehouse}
                  onChange={(e) => setNewCount({ ...newCount, warehouse: e.target.value })}
                  className="w-full bg-[#0B0D10] border border-[#252830] text-xs text-[#F5F3EE] rounded px-3 py-2 outline-none"
                >
                  <option value="NORTH HUB (Delhi NCR)">NORTH HUB (Delhi NCR)</option>
                  <option value="WEST HUB (Mumbai)">WEST HUB (Mumbai)</option>
                  <option value="SOUTH HUB (Bengaluru)">SOUTH HUB (Bengaluru)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">System Book Qty</label>
                  <input
                    type="number"
                    value={newCount.systemQty}
                    onChange={(e) => setNewCount({ ...newCount, systemQty: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Physical Counted Qty</label>
                  <input
                    type="number"
                    value={newCount.physicalQty}
                    onChange={(e) => setNewCount({ ...newCount, physicalQty: e.target.value })}
                    required
                    className="w-full bg-[#0B0D10] border border-[#252830] focus:border-[#D6A85F] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A6A9AF] mb-1">Auditor Observations</label>
                <input
                  type="text"
                  value={newCount.notes}
                  onChange={(e) => setNewCount({ ...newCount, notes: e.target.value })}
                  required
                  className="w-full bg-[#0B0D10] border border-[#252830] rounded px-3 py-2 text-xs text-[#F5F3EE] outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#1B1F27]">
                <button
                  type="button"
                  onClick={() => setNewCountModal(false)}
                  className="px-4 py-2 rounded bg-[#101318] text-[#A6A9AF] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#D6A85F] hover:bg-[#F0C982] text-black font-semibold text-xs transition-colors"
                >
                  Run Difference Calculation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
