import React, { useState } from 'react';
import {
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Clock,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { PredictiveAlert } from '../types';

interface PredictiveAIEngineProps {
  alerts: PredictiveAlert[];
  onTriggerSelfHealing: (id: string) => void;
}

export const PredictiveAIEngine: React.FC<PredictiveAIEngineProps> = ({
  alerts,
  onTriggerSelfHealing
}) => {
  const [activeAlertId, setActiveAlertId] = useState<string>(alerts[0]?.id ?? '');
  const [isSimulating, setIsSimulating] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const selectedAlert = alerts.find(a => a.id === activeAlertId) || alerts[0];

  if (!selectedAlert) return null;

  const handleSimulateMitigation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      onTriggerSelfHealing(selectedAlert.id);
      setSuccessNotice(`Pre-emptive backup locked for "${selectedAlert.facility}" — 0 student minutes lost.`);
      setTimeout(() => setSuccessNotice(null), 4200);
    }, 1200);
  };

  return (
    <section id="predictive" className="py-14 sm:py-20 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="chip chip-violet mb-3">
            <BrainCircuit className="w-3.5 h-3.5" />
            Predictive forewarning
          </span>
          <h2 className="text-[1.75rem] sm:text-4xl font-extrabold tracking-[-0.02em] t-heading leading-tight">
            Stop failures before they happen
          </h2>
          <p className="mt-2.5 text-sm sm:text-base t-muted leading-relaxed">
            ResQ studies historical breakdowns, thermal cycles, enrollment surges, and network load to forecast resource degradation up to 90 minutes ahead.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">

          {/* Alerts list */}
          <div className="reveal reveal-d1 lg:col-span-5 space-y-3 min-w-0">
            <div className="flex items-center justify-between px-1">
              <span className="eyebrow t-faint">Active risk predictions</span>
              <span className="text-[10px] t-accent font-mono">ResQ-Predict v3</span>
            </div>

            {alerts.map((alert) => {
              const isSelected = alert.id === selectedAlert.id;
              return (
                <button
                  key={alert.id}
                  onClick={() => setActiveAlertId(alert.id)}
                  className="selectable-row w-full p-3.5 sm:p-4 text-left"
                  data-selected={isSelected}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                      <h3 className="text-[13px] sm:text-sm font-bold t-heading truncate">{alert.facility}</h3>
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono font-bold t-warn shrink-0">
                      {alert.riskScore}%
                    </span>
                  </div>

                  <p className="mt-1.5 text-[11px] sm:text-xs t-body font-medium line-clamp-2">
                    {alert.predictedIssue}
                  </p>

                  <div className="mt-2.5">
                    <div className="risk-bar">
                      <span style={{ width: `${alert.riskScore}%` }} />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] sm:text-[11px] t-faint gap-2">
                    <span className="flex items-center gap-1 t-muted truncate">
                      <Clock className="w-3 h-3 t-accent shrink-0" />
                      {alert.timeWindow}
                    </span>
                    <span className="t-violet font-semibold shrink-0">{alert.confidence}% confidence</span>
                  </div>
                </button>
              );
            })}

            <div className="glass rounded-xl p-3.5 flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 t-accent shrink-0" />
              <p className="text-[11px] t-muted leading-relaxed">
                <span className="font-bold t-heading">Federated learning:</span> every report sharpens fault-trees across all campuses.
              </p>
            </div>
          </div>

          {/* Diagnostics */}
          <div className="reveal reveal-d2 lg:col-span-7 min-w-0">
            <div className="glass glass-strong glass-edge rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col h-full relative overflow-hidden">
              <div className="absolute -top-24 -left-16 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(139,92,246,0.16)' }} />

              <div key={selectedAlert.id} className="swap-in relative flex-1">
                <div className="flex items-center justify-between gap-2 pb-3.5 border-b divider">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold t-violet uppercase tracking-wider">
                    <Activity className="w-3.5 h-3.5" />
                    Diagnostics
                  </span>
                  <span className="chip chip-amber !px-2 !py-0.5 !text-[10px]">
                    Risk {selectedAlert.riskScore}%
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg sm:text-xl font-bold t-heading leading-tight">{selectedAlert.facility}</h3>
                  <p className="text-[13px] t-body mt-1">{selectedAlert.predictedIssue}</p>
                </div>

                {/* Risk meter */}
                <div className="mt-4 inner-panel rounded-xl p-3.5">
                  <div className="flex items-center justify-between text-[10px] font-semibold t-muted mb-2">
                    <span>Failure probability</span>
                    <span className="font-mono t-warn">{selectedAlert.riskScore}%</span>
                  </div>
                  <div className="risk-bar">
                    <span style={{ width: `${selectedAlert.riskScore}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[10px] t-faint">
                    <span>Safe</span>
                    <span>{selectedAlert.confidence}% model confidence</span>
                    <span>Critical</span>
                  </div>
                </div>

                {/* Telemetry */}
                <div className="mt-3.5 inner-panel rounded-xl p-3.5">
                  <div className="eyebrow t-faint mb-2">Anomalous telemetry</div>
                  <p className="text-[11px] sm:text-xs t-body leading-relaxed font-mono bg-[var(--bg-deep)] p-2.5 rounded-lg border border-[var(--line)]">
                    “{selectedAlert.triggerFactor}”
                  </p>
                </div>

                {/* Mitigation */}
                <div className="mt-3.5 p-3.5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07]">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold t-up uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Pre-emptive strategy ready
                  </div>
                  <p className="text-[11px] sm:text-[13px] t-body mt-1.5 leading-relaxed">
                    {selectedAlert.preEmptiveAction}
                  </p>
                </div>

                {successNotice && (
                  <div className="mt-3.5 p-3 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)] text-[11px] t-accent font-medium flex items-start gap-2 animate-[fade-in_0.3s_ease]">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-px" />
                    <span>{successNotice}</span>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="relative mt-5 pt-4 border-t divider flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[11px] t-faint">
                  Forecast window: <span className="t-heading font-semibold">{selectedAlert.timeWindow}</span>
                </div>

                <button
                  onClick={handleSimulateMitigation}
                  disabled={isSimulating}
                  className="btn btn-primary w-full sm:w-auto !py-3"
                >
                  <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Deploying failover…' : 'Lock pre-emptive backup'}</span>
                  <ChevronRight className="w-4 h-4 opacity-80" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
