import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import InventoryPage from './pages/InventoryPage';
import WarehousesPage from './pages/WarehousesPage';
import ProductsPage from './pages/ProductsPage';
import TransfersPage from './pages/TransfersPage';
import ReconciliationPage from './pages/ReconciliationPage';
import OrdersPage from './pages/OrdersPage';
import SmartInventoryPage from './pages/SmartInventoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AuditLogsPage from './pages/AuditLogsPage';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('logistra_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('logistra_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('logistra_token');
    localStorage.removeItem('logistra_user');
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} onLogout={handleLogout} />} />
      <Route path="/login" element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/app" />} />
      
      {/* Protected Command Center */}
      <Route path="/app" element={user ? <DashboardLayout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}>
        <Route index element={<DashboardHome />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="warehouses" element={<WarehousesPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="transfers" element={<TransfersPage />} />
        <Route path="reconciliation" element={<ReconciliationPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="smart" element={<SmartInventoryPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="audit" element={<AuditLogsPage />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
