import React, { useState } from 'react';
import {
  Projector,
  Wifi,
  Printer,
  Terminal,
  DoorClosed,
  Navigation,
  CheckCircle2,
  MapPin,
  Plus,
  ArrowRight,
  Share2,
  QrCode,
  ShieldCheck,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { CampusIssue } from '../types';

interface LiveRerouteProps {
  issues: CampusIssue[];
  selectedIssueId: string;
  onSelectIssue: (id: string) => void;
  onOpenReportModal: () => void;
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'projector', label: 'Projectors' },
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'printer', label: 'Printers' },
  { id: 'lab', label: 'Labs' },
  { id: 'classroom', label: 'Rooms' },
];

export const LiveReroute: React.FC<LiveRerouteProps> = ({
  issues,
  selectedIssueId,
  onSelectIssue,
  onOpenReportModal
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isCopied, setIsCopied] = useState(false);
  const [stepChecked, setStepChecked] = useState<Record<number, boolean>>({});

  const filteredIssues = filterCategory === 'all'
    ? issues
    : issues.filter(i => i.category === filterCategory);

  const activeIssue = issues.find(i => i.id === selectedIssueId) || issues[0];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'projector': return <Projector className="w-[18px] h-[18px] text-amber-400" />;
      case 'wifi': return <Wifi className="w-[18px] h-[18px] text-sky-400" />;
      case 'printer': return <Printer className="w-[18px] h-[18px] text-emerald-400" />;
      case 'lab': return <Terminal className="w-[18px] h-[18px] text-violet-400" />;
      case 'classroom': return <DoorClosed className="w-[18px] h-[18px] text-rose-400" />;
      default: return <AlertCircle className="w-[18px] h-[18px] text-cyan-400" />;
    }
  };

  const handleShareDirections = () => {
    navigator.clipboard?.writeText(`ResQ alternative: ${activeIssue.backupOption.name} at ${activeIssue.backupOption.location}. ${activeIssue.backupOption.walkTime}.`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="live-reroute" className="py-14 sm:py-20 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="reveal flex flex-col gap-5 sm:gap-6 mb-8 sm:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="max-w-2xl">
              <span className="chip chip-cyan mb-3">
                <Navigation className="w-3.5 h-3.5" />
                Real-time backup finder
              </span>
              <h2 className="text-[1.75rem] sm:text-4xl font-extrabold tracking-[-0.02em] t-heading leading-tight">
                Instant failover &amp; navigation engine
              </h2>
              <p className="mt-2 text-sm sm:text-base t-muted leading-relaxed">
                ResQ matches broken infrastructure with nearby pre-verified backup nodes, weighing occupancy, walk time, and hardware specs.
              </p>
            </div>

            <div className="segmented scroll-x self-start lg:self-auto max-w-full">
              {FILTERS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`segmented-item ${filterCategory === cat.id ? 'segmented-item-active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">

          {/* Incidents */}
          <div className="reveal reveal-d1 lg:col-span-5 space-y-3 min-w-0">
            <div className="flex items-center justify-between px-1">
              <span className="eyebrow t-faint">Detected incidents · {filteredIssues.length}</span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold t-up">
                <span className="status-dot" />
                Live sync
              </span>
            </div>

            <div className="space-y-2.5 max-h-[26rem] lg:max-h-[40rem] overflow-y-auto pr-1 custom-scrollbar">
              {filteredIssues.map((issue) => {
                const isSelected = issue.id === activeIssue.id;
                return (
                  <button
                    key={issue.id}
                    onClick={() => onSelectIssue(issue.id)}
                    className="selectable-row w-full p-3.5 sm:p-4 text-left"
                    data-selected={isSelected}
                  >
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-8 h-8 rounded-xl bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center shrink-0">
                          {getCategoryIcon(issue.category)}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[13px] sm:text-sm font-bold t-heading truncate leading-snug">{issue.title}</h3>
                          <p className="text-[11px] t-muted truncate">{issue.reportedLocation} · {issue.building}</p>
                        </div>
                      </div>

                      <span className={`chip shrink-0 !text-[9px] !px-2 !py-0.5 ${
                        issue.severity === 'high' ? 'chip-rose' : 'chip-amber'
                      }`}>
                        {issue.severity}
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] sm:text-xs t-body line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>

                    <div className="mt-2.5 pt-2 border-t divider flex items-center justify-between text-[10px] sm:text-[11px] t-faint">
                      <span className="flex items-center gap-1 t-accent font-semibold truncate">
                        <ArrowRight className="w-3 h-3 shrink-0" />
                        Backup ready: {issue.backupOption.distance}
                      </span>
                      <span className="shrink-0">{issue.timeReported}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={onOpenReportModal}
              className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[var(--line-strong)] hover:border-[var(--accent)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-xs t-body hover:t-accent font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4 t-accent" />
              <span>Simulate custom equipment failure</span>
            </button>
          </div>

          {/* Alternative recommendation */}
          <div className="reveal reveal-d2 lg:col-span-7 min-w-0">
            <div className="glass glass-strong glass-edge rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden">
              <div
                className="absolute -top-24 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'var(--accent-soft)' }}
              />

              {/* Status banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b divider">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="chip chip-rose !px-2 !py-0.5 !text-[10px]">
                      Primary failed
                    </span>
                    <span className="text-[10px] font-mono t-faint">{activeIssue.id}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold t-heading mt-1 truncate">
                    {activeIssue.reportedLocation}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-rose-300 truncate">{activeIssue.title}</p>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold self-start sm:self-auto shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified vacant</span>
                </div>
              </div>

              {/* Highlight card */}
              <div key={activeIssue.id} className="swap-in my-4 p-4 sm:p-5 rounded-2xl inner-panel relative overflow-hidden">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="eyebrow t-accent flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      Best alternative
                    </div>
                    <h4 className="text-lg sm:text-xl font-extrabold t-heading mt-1 leading-tight">
                      {activeIssue.backupOption.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs t-muted mt-0.5 flex items-center gap-1.5">
                      <span>📍 {activeIssue.backupOption.location}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <div className="text-xl sm:text-2xl font-black t-accent font-mono leading-none">
                      {activeIssue.backupOption.distance}
                    </div>
                    <div className="text-[10px] sm:text-xs t-faint font-medium mt-1 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {activeIssue.backupOption.walkTime}
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t divider grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {activeIssue.backupOption.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] t-body bg-[var(--surface-1)] px-2 py-1.5 rounded-md border border-[var(--line)]">
                      <ShieldCheck className="w-3 h-3 t-accent shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold t-faint uppercase tracking-wider">
                  <span>Navigation path</span>
                  <span className="font-normal normal-case tracking-normal">tap to mark reached</span>
                </div>

                <div className="space-y-2">
                  {activeIssue.backupOption.directions.map((step, idx) => {
                    const isDone = !!stepChecked[idx];
                    return (
                      <button
                        key={idx}
                        onClick={() => setStepChecked(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        className={`w-full text-left flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border transition-all ${
                          isDone
                            ? 'bg-emerald-500/10 border-emerald-500/30 t-faint'
                            : 'bg-[var(--surface-1)] border-[var(--line)] t-body hover:border-[var(--line-strong)]'
                        }`}
                      >
                        <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[var(--accent-soft)] t-accent border border-[var(--accent)]'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </span>
                        <span className={`text-[11px] sm:text-[13px] leading-relaxed ${isDone ? 'line-through opacity-70' : ''}`}>
                          {step}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 sm:mt-6 pt-4 border-t divider flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <button onClick={handleShareDirections} className="btn btn-glass btn-sm">
                    <Share2 className="w-3.5 h-3.5 t-accent" />
                    <span>{isCopied ? 'Copied!' : 'Share path'}</span>
                  </button>

                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--surface-1)] text-[11px] t-faint border border-[var(--line)]">
                    <QrCode className="w-3.5 h-3.5" />
                    Door pass auto-authorized
                  </span>
                </div>

                <div className="text-[11px] t-faint flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="t-up font-semibold">{activeIssue.backupOption.availability.split(' via')[0]}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
