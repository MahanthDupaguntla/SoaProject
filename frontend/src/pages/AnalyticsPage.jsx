import React from 'react';
import { BarChart3, TrendingUp, DollarSign, PackageCheck, AlertCircle, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const valuationData = [
  { name: 'Automation & Robotics', value: 595200 },
  { name: 'Storage & Pallets', value: 114000 },
  { name: 'Power Systems', value: 218250 },
  { name: 'General Supplies', value: 85000 },
];

const COLORS = ['#D6A85F', '#6FAF8F', '#C89A52', '#617582'];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-editorial text-[#F5F3EE]">ENTERPRISE ANALYTICS & VALUATION</h1>
          <p className="text-xs text-[#A6A9AF] mt-1">
            Real-time balance valuation, category breakdown, inventory turnover velocity, and loss prevention reports.
          </p>
        </div>

        <button className="bg-[#101318] hover:bg-[#1B1F27] border border-[#252830] text-[#F5F3EE] text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 self-start sm:self-auto transition-colors">
          <Download className="w-3.5 h-3.5 text-[#D6A85F]" />
          <span>Export Audit Report (PDF/CSV)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27]">
          <span className="text-[10px] uppercase font-mono text-[#6F737A]">Total Network Inventory Value</span>
          <div className="text-3xl font-bold font-editorial text-[#D6A85F] mt-2">$1,012,450.00</div>
          <span className="text-xs text-[#6FAF8F] mt-1 block">Assessed at Current FIFO Cost</span>
        </div>

        <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27]">
          <span className="text-[10px] uppercase font-mono text-[#6F737A]">Gross Stock Turnover Rate</span>
          <div className="text-3xl font-bold font-editorial text-[#F5F3EE] mt-2">6.8x / Year</div>
          <span className="text-xs text-[#A6A9AF] mt-1 block">Top velocity in West Hub</span>
        </div>

        <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27]">
          <span className="text-[10px] uppercase font-mono text-[#6F737A]">Reconciliation Accuracy Score</span>
          <div className="text-3xl font-bold font-editorial text-[#6FAF8F] mt-2">99.67%</div>
          <span className="text-xs text-[#A6A9AF] mt-1 block">Exceeds 99.5% enterprise SLA</span>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27]">
        <h2 className="text-sm font-bold font-editorial text-[#F5F3EE] mb-4">INVENTORY VALUATION BY PRODUCT CATEGORY</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={valuationData}>
              <XAxis dataKey="name" stroke="#6F737A" fontSize={11} />
              <YAxis stroke="#6F737A" fontSize={11} />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, 'Total Valuation']}
                contentStyle={{ backgroundColor: '#101318', borderColor: '#252830', fontSize: '12px', color: '#F5F3EE' }}
              />
              <Bar dataKey="value" fill="#D6A85F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
