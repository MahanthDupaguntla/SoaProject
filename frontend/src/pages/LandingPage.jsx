import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Boxes,
  Warehouse,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  GitCompare,
  Activity,
  CheckCircle2,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function LandingPage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  const hubs = [
    { code: 'NORTH HUB', city: 'Delhi NCR', units: '2.8M', accuracy: '99.8%', transfers: 34, status: 'OPTIMAL' },
    { code: 'WEST HUB', city: 'Mumbai', units: '3.4M', accuracy: '99.5%', transfers: 42, status: 'OPTIMAL' },
    { code: 'CENTRAL HUB', city: 'Hyderabad', units: '1.9M', accuracy: '99.7%', transfers: 21, status: 'OPTIMAL' },
    { code: 'EAST HUB', city: 'Kolkata', units: '1.4M', accuracy: '99.4%', transfers: 18, status: 'OPTIMAL' },
    { code: 'SOUTH HUB', city: 'Bengaluru', units: '2.1M', accuracy: '99.9%', transfers: 27, status: 'OPTIMAL' },
    { code: 'MID WEST HUB', city: 'Pune', units: '0.8M', accuracy: '99.6%', transfers: 6, status: 'OPTIMAL' },
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-[#F5F3EE] selection:bg-[#D6A85F] selection:text-black">
      {/* Top Navigation */}
      <nav className="border-b border-[#1B1F27] bg-[#050608]/90 backdrop-blur fixed top-0 inset-x-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#D6A85F] text-black font-bold flex items-center justify-center font-editorial text-base">
              L
            </div>
            <div>
              <span className="font-editorial font-bold text-xl tracking-widest text-[#F5F3EE]">LOGISTRA</span>
              <span className="block text-[8px] uppercase tracking-widest text-[#D6A85F] -mt-1">Multi-Warehouse Core</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-[#A6A9AF]">
            <a href="#network" className="hover:text-[#D6A85F] transition-colors">Global Network</a>
            <a href="#workflow" className="hover:text-[#D6A85F] transition-colors">Workflow</a>
            <a href="#reconciliation" className="hover:text-[#D6A85F] transition-colors">Reconciliation Engine</a>
            <a href="#architecture" className="hover:text-[#D6A85F] transition-colors">Architecture</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to="/app"
                className="bg-[#D6A85F] hover:bg-[#F0C982] text-black text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-[#D6A85F]/10"
              >
                <span>Command Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-[#D6A85F] hover:bg-[#F0C982] text-black text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-[#D6A85F]/10"
              >
                <span>Access System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden min-h-screen flex items-center">
        {/* Subtle cinematic radial ambiance */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#D6A85F]/5 rounded-full blur-[160px] pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1B1F27_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101318] border border-[#252830] text-[11px] font-medium text-[#D6A85F] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#D6A85F] animate-pulse"></span>
            ONE INVENTORY. EVERY LOCATION.
          </div>

          <h1 className="text-4xl md:text-7xl font-bold font-editorial tracking-tight text-[#F5F3EE] max-w-4xl mx-auto leading-tight md:leading-none">
            CONTROL <br />
            EVERY STOCK. <br />
            ACROSS <br />
            <span className="text-[#D6A85F] drop-shadow-[0_0_25px_rgba(214,168,95,0.3)]">EVERY WAREHOUSE.</span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-[#A6A9AF] max-w-2xl mx-auto font-light leading-relaxed">
            LOGISTRA is an intelligent multi-warehouse inventory platform designed to help organizations
            track, transfer, reconcile, and optimize stock across their entire warehouse network.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto bg-[#D6A85F] hover:bg-[#F0C982] text-black font-semibold text-sm px-8 py-4 rounded-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#D6A85F]/15"
            >
              <span>Explore LOGISTRA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#reconciliation"
              className="w-full sm:w-auto bg-[#101318] hover:bg-[#1B1F27] border border-[#252830] text-[#F5F3EE] text-sm px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>Watch Reconciliation Flow</span>
            </a>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-xl bg-[#0B0D10]/80 border border-[#1B1F27] backdrop-blur text-left">
              <span className="text-xs uppercase tracking-wider text-[#6F737A]">Tracked Volume</span>
              <div className="text-2xl font-bold font-editorial text-[#F5F3EE] mt-1">12.4M Units</div>
              <span className="text-[11px] text-[#6FAF8F] flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> Real-time sync
              </span>
            </div>
            <div className="p-5 rounded-xl bg-[#0B0D10]/80 border border-[#1B1F27] backdrop-blur text-left">
              <span className="text-xs uppercase tracking-wider text-[#6F737A]">Network Accuracy</span>
              <div className="text-2xl font-bold font-editorial text-[#D6A85F] mt-1">99.67%</div>
              <span className="text-[11px] text-[#6F737A] mt-1 block">Post-reconciliation</span>
            </div>
            <div className="p-5 rounded-xl bg-[#0B0D10]/80 border border-[#1B1F27] backdrop-blur text-left">
              <span className="text-xs uppercase tracking-wider text-[#6F737A]">Active Transfers</span>
              <div className="text-2xl font-bold font-editorial text-[#F5F3EE] mt-1">148 In-Transit</div>
              <span className="text-[11px] text-[#6F737A] mt-1 block">Zero stock loss</span>
            </div>
            <div className="p-5 rounded-xl bg-[#0B0D10]/80 border border-[#1B1F27] backdrop-blur text-left">
              <span className="text-xs uppercase tracking-wider text-[#6F737A]">Hub Facilities</span>
              <div className="text-2xl font-bold font-editorial text-[#F5F3EE] mt-1">24 Locations</div>
              <span className="text-[11px] text-[#6FAF8F] mt-1 block">6 Primary Hubs</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: GLOBAL NETWORK */}
      <section id="network" className="py-24 px-6 border-t border-[#1B1F27] bg-[#07090C]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D6A85F]">GLOBAL NETWORK</span>
            <h2 className="text-3xl md:text-4xl font-bold font-editorial mt-2 text-[#F5F3EE]">
              ONE INVENTORY. EVERY LOCATION.
            </h2>
            <p className="mt-4 text-sm text-[#A6A9AF]">
              Connect every warehouse node, stock movement, and inventory allocation through one intelligent network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubs.map((hub) => (
              <div
                key={hub.code}
                className="p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27] hover:border-[#D6A85F]/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6FAF8F] animate-pulse" />
                    <span className="text-xs font-mono text-[#D6A85F]">{hub.code}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#101318] border border-[#252830] text-[#A6A9AF]">
                    {hub.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#F5F3EE] group-hover:text-[#D6A85F] transition-colors font-editorial">
                  {hub.city}
                </h3>

                <div className="mt-6 pt-4 border-t border-[#1B1F27] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-[#6F737A] uppercase block">Inventory</span>
                    <span className="text-sm font-semibold text-[#F5F3EE]">{hub.units}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6F737A] uppercase block">Accuracy</span>
                    <span className="text-sm font-semibold text-[#6FAF8F]">{hub.accuracy}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6F737A] uppercase block">Transfers</span>
                    <span className="text-sm font-semibold text-[#D6A85F]">{hub.transfers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: WORKFLOW */}
      <section id="workflow" className="py-24 px-6 border-t border-[#1B1F27]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D6A85F]">WORKFLOW</span>
            <h2 className="text-3xl md:text-4xl font-bold font-editorial mt-2 text-[#F5F3EE]">
              EVERY MOVEMENT. TELLS A STORY.
            </h2>
            <p className="mt-4 text-sm text-[#A6A9AF]">
              An end-to-end journey from receipt to counting, optimization, and audit logging.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { step: '01', title: 'RECEIVE', desc: 'Goods checked with PO barcode match' },
              { step: '02', title: 'STORE', desc: 'Zone, rack, shelf & bin allocation' },
              { step: '03', title: 'TRANSFER', desc: 'Inter-hub transit with lockouts' },
              { step: '04', title: 'COUNT', desc: 'Physical audit cycle counting' },
              { step: '05', title: 'RECONCILE', desc: 'Auto discrepancy detection' },
              { step: '06', title: 'OPTIMIZE', desc: 'Smart AI reorder & rebalancing' }
            ].map((item) => (
              <div key={item.step} className="p-5 rounded-xl bg-[#0B0D10] border border-[#1B1F27] text-left">
                <span className="text-xs font-mono text-[#D6A85F]">{item.step}</span>
                <h4 className="text-sm font-bold font-editorial text-[#F5F3EE] mt-2">{item.title}</h4>
                <p className="text-xs text-[#6F737A] mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: RECONCILIATION — THE CENTERPIECE */}
      <section id="reconciliation" className="py-24 px-6 border-t border-[#1B1F27] bg-[#07090C] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D6A85F]">RECONCILIATION ENGINE</span>
            <h2 className="text-3xl md:text-5xl font-bold font-editorial mt-2 text-[#F5F3EE]">
              KNOW WHAT'S ACTUALLY THERE.
            </h2>
            <p className="mt-4 text-sm text-[#A6A9AF]">
              Precision stock audit engine comparing real book balance with physical inventory counts.
            </p>
          </div>

          {/* Exact discrepancy calculation display from requirement */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 rounded-2xl bg-[#0B0D10] border border-[#1B1F27] text-center">
              <span className="text-xs uppercase tracking-wider text-[#6F737A] font-mono">System Book Stock</span>
              <div className="text-4xl font-bold font-editorial text-[#F5F3EE] mt-2">1,000</div>
              <span className="text-xs text-[#A6A9AF] mt-2 block">Ledger recorded quantity</span>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B0D10] border border-[#1B1F27] text-center">
              <span className="text-xs uppercase tracking-wider text-[#6F737A] font-mono">Physical Audit Count</span>
              <div className="text-4xl font-bold font-editorial text-[#F5F3EE] mt-2">970</div>
              <span className="text-xs text-[#A6A9AF] mt-2 block">Floor verified quantity</span>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B0D10] border border-[#C86B67]/40 bg-[#C86B67]/5 text-center">
              <span className="text-xs uppercase tracking-wider text-[#C86B67] font-mono">Difference Detected</span>
              <div className="text-4xl font-bold font-editorial text-[#C86B67] mt-2">-30</div>
              <span className="text-xs font-semibold text-[#C86B67] mt-2 block uppercase tracking-wider">
                SHORTAGE STATE
              </span>
            </div>
          </div>

          {/* 6 Step Progression Workflow */}
          <div className="p-8 rounded-2xl bg-[#0B0D10] border border-[#1B1F27]">
            <span className="text-xs uppercase tracking-wider text-[#D6A85F] block mb-6 font-mono">
              RECONCILIATION WORKFLOW PROGRESSION
            </span>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-center">
              {[
                { name: '1. Physical Count', status: 'COMPLETED' },
                { name: '2. Difference Detected', status: 'ACTIVE', highlight: true },
                { name: '3. Manager Review', status: 'PENDING' },
                { name: '4. Approval Gate', status: 'PENDING' },
                { name: '5. Stock Adjustment', status: 'PENDING' },
                { name: '6. Immutable Audit', status: 'PENDING' },
              ].map((step, idx) => (
                <div
                  key={step.name}
                  className={`p-4 rounded-xl border text-xs font-medium ${
                    step.highlight
                      ? 'border-[#D6A85F] bg-[#D6A85F]/10 text-[#D6A85F]'
                      : 'border-[#1B1F27] bg-[#101318] text-[#A6A9AF]'
                  }`}
                >
                  <div>{step.name}</div>
                  <span className="text-[10px] mt-2 block opacity-70 font-mono">{step.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1B1F27] py-12 px-6 text-center text-xs text-[#6F737A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-editorial font-bold text-sm text-[#F5F3EE]">LOGISTRA</span>
            <span>— Multi-Warehouse Inventory Control & Stock Reconciliation System</span>
          </div>
          <div>
            <span>© 2026 LOGISTRA Core. Enterprise Microservices Architecture.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
