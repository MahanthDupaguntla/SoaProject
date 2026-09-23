import React, { useState } from 'react';
import { ScrollText, ShieldCheck, Search, Filter } from 'lucide-react';

export default function AuditLogsPage() {
  const [logs] = useState([
    {
      id: 'AUD-99120',
      action: 'STOCK_ADJUSTMENT',
      details: 'Physical count shortage adjusted: LOG-PAL-4402 (-30 units)',
      actor: 'Vikram Singhania (Warehouse Manager)',
      ip: '10.0.4.12',
      service: 'inventory-service',
      timestamp: '2026-09-22 15:12:04'
    },
    {
      id: 'AUD-99119',
      action: 'SAGA_RESERVATION_CONFIRMED',
      details: 'Order ORD-2026-0881 reserved 10 units of LOG-IND-7701',
      actor: 'SagaCoordinator (order-service)',
      ip: '10.0.2.88',
      service: 'order-service',
      timestamp: '2026-09-22 14:48:19'
    },
    {
      id: 'AUD-99118',
      action: 'TRANSFER_DISPATCHED',
      details: 'TRF-2026-0091: 40 units in transit to WEST HUB',
      actor: 'Ananya Deshmukh',
      ip: '10.0.6.21',
      service: 'inventory-service',
      timestamp: '2026-09-22 14:30:00'
    },
    {
      id: 'AUD-99117',
      action: 'USER_AUTHENTICATED',
      details: 'JWT RS256 token issued for user: admin',
      actor: 'admin',
      ip: '192.168.1.100',
      service: 'auth-service',
      timestamp: '2026-09-22 13:10:45'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#6FAF8F]/10 border border-[#6FAF8F]/30 text-[10px] font-mono text-[#6FAF8F] mb-1">
          IMMUTABLE COMPLIANCE AUDIT LEDGER
        </div>
        <h1 className="text-2xl font-bold font-editorial text-[#F5F3EE]">ENTERPRISE AUDIT TRAIL</h1>
        <p className="text-xs text-[#A6A9AF] mt-1">
          All stock mutations, user logins, transfers, and reconciliation approvals are cryptographically tracked.
        </p>
      </div>

      <div className="bg-[#0B0D10] border border-[#1B1F27] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101318] text-[#A6A9AF] uppercase text-[10px] tracking-wider border-b border-[#1B1F27]">
              <tr>
                <th className="py-3 px-4">Audit ID</th>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Event Description</th>
                <th className="py-3 px-4">Performed By / Actor</th>
                <th className="py-3 px-4">Microservice</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B1F27] text-[#F5F3EE]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#101318]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#D6A85F]">
                    {log.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-[#101318] text-[#F5F3EE] border border-[#252830]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium">
                    {log.details}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#A6A9AF]">
                    {log.actor}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#617582]">
                    {log.service}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[11px] text-[#6F737A]">
                    {log.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
