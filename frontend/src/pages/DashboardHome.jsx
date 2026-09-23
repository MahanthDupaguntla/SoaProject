import React from 'react';
import {
  Boxes,
  Warehouse,
  ArrowLeftRight,
  GitCompare,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

const trendData = [
  { month: 'Apr', inventory: 10.8, transfers: 110 },
  { month: 'May', inventory: 11.2, transfers: 125 },
  { month: 'Jun', inventory: 11.5, transfers: 140 },
  { month: 'Jul', inventory: 11.9, transfers: 132 },
  { month: 'Aug', inventory: 12.1, transfers: 145 },
  { month: 'Sep', inventory: 12.4, transfers: 148 },
];

const distributionData = [
  { name: 'Delhi', units: 2800 },
  { name: 'Mumbai', units: 3400 },
  { name: 'Bengaluru', units: 2100 },
  { name: 'Hyderabad', units: 1900 },
  { name: 'Kolkata', units: 1400 },
  { name: 'Pune', units: 800 },
];

export default function DashboardHome() {
  const kpis = [
    { title: 'Total Inventory Units', value: '12,400,000', change: '+2.4%', icon: Boxes, color: 'text-[#F5F3EE]' },
    { title: 'Available Units', value: '11,840,000', change: '95.4%', icon: CheckCircle2, color: 'text-[#6FAF8F]' },
    { title: 'Reserved Stock', value: '420,000', change: 'In Orders', icon: Clock, color: 'text-[#D6A85F]' },
    { title: 'Low Stock Alerts', value: '14 Items', change: 'Action Req', icon: AlertTriangle, color: 'text-[#C89A52]' },
    { title: 'Active Warehouses', value: '24 Nodes', change: '100% Online', icon: Warehouse, color: 'text-[#F5F3EE]' },
    { title: 'Pending Transfers', value: '148 Shipments', change: 'In Transit', icon: ArrowLeftRight, color: 'text-[#617582]' },
    { title: 'Reconciliation Issues', value: '3 Shortages', change: 'Review Gate', icon: GitCompare, color: 'text-[#C86B67]' },
    { title: 'Security & Integrity', value: 'RS256 Active', change: 'Zero Breach', icon: ShieldCheck, color: 'text-[#6FAF8F]' },
  ];

  const recentActivity = [
    { action: 'Stock Received', desc: 'PO-8821 received at NORTH HUB (Delhi NCR)', time: '10 mins ago', type: 'in' },
    { action: 'Transfer Dispatched', desc: 'TRF-2026-0091: 40 units dispatched to WEST HUB', time: '42 mins ago', type: 'transfer' },
    { action: 'Discrepancy Detected', desc: 'Physical audit on LOG-PAL-4402 (-30 units shortage)', time: '1 hr ago', type: 'alert' },
    { action: 'Adjustment Approved', desc: 'Reconciliation REC-2026-0041 approved by Vikram S.', time: '3 hrs ago', type: 'ok' },
    { action: 'SAGA Reservation Confirmed', desc: 'Customer Order ORD-2026-0881 reserved 10 LiDAR units', time: '4 hrs ago', type: 'order' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-editorial text-[#F5F3EE]">LOGISTRA COMMAND CENTER</h1>
          <p className="text-xs text-[#A6A9AF] mt-1">
            Global real-time overview across all warehouse hubs, movements, and reconciliation audits.
          </p>
        </div>
        <div className="text-xs font-mono text-[#D6A85F] bg-[#101318] border border-[#252830] px-3.5 py-1.5 rounded-lg">
          Live Synced • UTC+05:30
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="p-5 rounded-xl bg-[#0B0D10] border border-[#1B1F27] relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-[#6F737A] font-medium">{kpi.title}</span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-bold font-editorial text-[#F5F3EE]">{kpi.value}</div>
              <div className="text-[11px] text-[#A6A9AF] mt-1 flex items-center gap-1 font-mono">
                {kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Trend Area Chart */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold font-editorial text-[#F5F3EE]">INVENTORY GROWTH & TRANSFERS</h2>
              <p className="text-xs text-[#6F737A] mt-0.5">Tracked units (millions) across six-month horizon</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#D6A85F]">
                <span className="w-2 h-2 rounded-full bg-[#D6A85F]"></span> Units (M)
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D6A85F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D6A85F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6F737A" fontSize={11} />
                <YAxis stroke="#6F737A" fontSize={11} domain={[9, 14]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#101318', borderColor: '#252830', fontSize: '12px', color: '#F5F3EE' }}
                />
                <Area type="monotone" dataKey="inventory" stroke="#D6A85F" strokeWidth={2} fillOpacity={1} fill="url(#goldGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Warehouse Distribution Bar Chart */}
        <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27]">
          <div className="mb-6">
            <h2 className="text-sm font-bold font-editorial text-[#F5F3EE]">HUB DISTRIBUTION</h2>
            <p className="text-xs text-[#6F737A] mt-0.5">Inventory units per regional warehouse (thousands)</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <XAxis dataKey="name" stroke="#6F737A" fontSize={10} />
                <YAxis stroke="#6F737A" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#101318', borderColor: '#252830', fontSize: '12px', color: '#F5F3EE' }}
                />
                <Bar dataKey="units" fill="#D6A85F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold font-editorial text-[#F5F3EE]">AUDITED ACTIVITY STREAM</h2>
          <span className="text-xs text-[#6F737A]">Live Event Feed</span>
        </div>
        <div className="divide-y divide-[#1B1F27]">
          {recentActivity.map((act, i) => (
            <div key={i} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#F5F3EE]">{act.action}</p>
                <p className="text-xs text-[#A6A9AF] mt-0.5">{act.desc}</p>
              </div>
              <span className="text-[11px] font-mono text-[#6F737A]">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
