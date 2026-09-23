import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  Warehouse,
  Package,
  ArrowLeftRight,
  GitCompare,
  ShoppingCart,
  BrainCircuit,
  BarChart3,
  ScrollText,
  LogOut,
  ChevronRight,
  ShieldAlert,
  Bell,
  Search
} from 'lucide-react';

export default function DashboardLayout({ user, onLogout }) {
  const location = useLocation();

  const navigation = [
    { name: 'Command Center', path: '/app', icon: LayoutDashboard },
    { name: 'Inventory & Stock', path: '/app/inventory', icon: Boxes },
    { name: 'Warehouses', path: '/app/warehouses', icon: Warehouse },
    { name: 'Products Catalog', path: '/app/products', icon: Package },
    { name: 'Inter-Hub Transfers', path: '/app/transfers', icon: ArrowLeftRight },
    { name: 'Stock Reconciliation', path: '/app/reconciliation', icon: GitCompare, highlight: true },
    { name: 'Orders & Fulfillment', path: '/app/orders', icon: ShoppingCart },
    { name: 'Smart AI Inventory', path: '/app/smart', icon: BrainCircuit },
    { name: 'Analytics & Reports', path: '/app/analytics', icon: BarChart3 },
    { name: 'Audit Trail', path: '/app/audit', icon: ScrollText },
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-[#F5F3EE] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B0D10] border-r border-[#1B1F27] flex flex-col fixed inset-y-0 z-30">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-[#1B1F27]">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#D6A85F] text-black font-bold flex items-center justify-center font-editorial text-sm">
              L
            </div>
            <div>
              <span className="font-editorial font-bold text-lg tracking-wider text-[#F5F3EE]">LOGISTRA</span>
              <span className="block text-[9px] uppercase tracking-widest text-[#D6A85F] -mt-1">Enterprise Core</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#101318] text-[#D6A85F] border border-[#D6A85F]/30 shadow-sm'
                    : 'text-[#A6A9AF] hover:text-[#F5F3EE] hover:bg-[#101318]/60'
                } ${item.highlight ? 'border-l-2 border-l-[#D6A85F]' : ''}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D6A85F]' : 'text-[#6F737A]'}`} />
                <span className="flex-1">{item.name}</span>
                {item.highlight && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F]"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-[#1B1F27] bg-[#080A0D]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#D6A85F]/20 border border-[#D6A85F]/40 flex items-center justify-center text-xs font-bold text-[#D6A85F]">
              {user?.username?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#F5F3EE] truncate">{user?.fullName || user?.username || 'Administrator'}</p>
              <p className="text-[10px] text-[#6FAF8F] uppercase tracking-wider">
                {user?.roles?.[0]?.replace('ROLE_', '') || 'SUPER ADMIN'}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs text-[#A6A9AF] hover:text-[#C86B67] hover:bg-[#C86B67]/10 transition-colors border border-transparent hover:border-[#C86B67]/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-[#0B0D10]/80 backdrop-blur border-b border-[#1B1F27] px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#6F737A]">System Status</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#6FAF8F]/10 border border-[#6FAF8F]/30 text-[10px] font-medium text-[#6FAF8F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6FAF8F] animate-pulse"></span>
              All 6 Microservices Operational
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101318] border border-[#1B1F27] text-xs text-[#A6A9AF]">
              <Search className="w-3.5 h-3.5 text-[#6F737A]" />
              <input
                type="text"
                placeholder="Search SKU, Warehouse, Bins..."
                className="bg-transparent outline-none text-xs text-[#F5F3EE] placeholder-[#6F737A] w-52"
              />
            </div>

            <div className="p-2 rounded-lg bg-[#101318] border border-[#1B1F27] text-[#A6A9AF] hover:text-[#F5F3EE] cursor-pointer relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D6A85F]"></span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested View */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
