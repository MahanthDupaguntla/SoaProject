import React from 'react';
import { BrainCircuit, Sparkles, TrendingUp, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SmartInventoryPage() {
  const recommendations = [
    {
      type: 'REORDER RECOMMENDATION',
      product: 'Lithium-Iron Battery Module 48V (LOG-FORK-3305)',
      rule: 'Current stock (12 units) is below reorder threshold (15 units).',
      action: 'Generate Purchase Requisition for 30 units to Volt Energy Global.',
      confidence: '98% Confidence',
      severity: 'HIGH'
    },
    {
      type: 'INTER-HUB REBALANCING',
      product: 'Industrial LiDAR Sensor Unit Pro (LOG-IND-7701)',
      rule: 'NORTH HUB has excess (320 units, 140 days coverage) while WEST HUB has 160 units (18 days velocity).',
      action: 'Recommended Transfer: 60 units from NORTH HUB → WEST HUB.',
      confidence: '94% Velocity Match',
      severity: 'MEDIUM'
    },
    {
      type: 'ANOMALY DETECTION',
      product: 'High-Load Smart Poly-Pallet (LOG-PAL-4402)',
      rule: 'Physical Audit shortage discrepancy (-30 units, REC-2026-0042) exceeds historical variance threshold of ±2%.',
      action: 'Initiate supervisor secondary scan and lock quarantine bin Z2-R01-S1-B05.',
      confidence: 'Alert Active',
      severity: 'CRITICAL'
    },
    {
      type: 'DEAD STOCK PREDICTION',
      product: 'Legacy RFID Scanner Cradles',
      rule: 'Zero movement recorded over past 120 days across all 24 warehouse nodes.',
      action: 'Mark for liquidation discount or salvage return.',
      confidence: '100% Inactivity',
      severity: 'LOW'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#D6A85F]/10 border border-[#D6A85F]/30 text-[10px] font-mono text-[#D6A85F] mb-1">
          RULE-BASED & PREDICTIVE INTELLIGENCE
        </div>
        <h1 className="text-2xl font-bold font-editorial text-[#F5F3EE]">SMART INVENTORY ENGINE</h1>
        <p className="text-xs text-[#A6A9AF] mt-1">
          Automated demand forecasting, inter-hub transfer recommendations, stockout warnings, and dead stock detection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec, i) => (
          <div key={i} className="p-6 rounded-xl bg-[#0B0D10] border border-[#1B1F27] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D6A85F]">{rec.type}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  rec.severity === 'CRITICAL' ? 'bg-[#C86B67]/10 text-[#C86B67] border-[#C86B67]/30' :
                  rec.severity === 'HIGH' ? 'bg-[#C89A52]/10 text-[#C89A52] border-[#C89A52]/30' :
                  'bg-[#6FAF8F]/10 text-[#6FAF8F] border-[#6FAF8F]/30'
                }`}>
                  {rec.confidence}
                </span>
              </div>

              <h3 className="text-sm font-bold font-editorial text-[#F5F3EE] mb-2">{rec.product}</h3>
              
              <div className="p-3 rounded bg-[#101318] border border-[#252830] text-xs text-[#A6A9AF] mb-3">
                <span className="text-[#6F737A] block text-[10px] uppercase font-mono mb-1">Trigger Condition:</span>
                {rec.rule}
              </div>

              <div className="text-xs text-[#F5F3EE] font-medium flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D6A85F] flex-shrink-0 mt-0.5" />
                <span>{rec.action}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1B1F27] flex items-center justify-end">
              <button className="px-3 py-1.5 rounded bg-[#101318] hover:bg-[#1B1F27] border border-[#252830] text-xs text-[#D6A85F] flex items-center gap-1.5 transition-colors">
                <span>Execute Recommendation</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
