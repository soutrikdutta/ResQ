import React from 'react';
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  Navigation,
  Globe2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { CampusStats } from '../types';
import { AnimatedNumber } from './AnimatedNumber';

interface HeroProps {
  stats: CampusStats;
  onExploreLive: () => void;
  onOpenReportModal: () => void;
  onTryScenario: (category: 'projector' | 'wifi' | 'printer' | 'lab' | 'classroom') => void;
}

const SCENARIOS = [
  { id: 'projector', label: 'Broken projector', emoji: '📽️' },
  { id: 'wifi', label: 'No Wi-Fi', emoji: '📶' },
  { id: 'printer', label: 'Printer jam', emoji: '🖨️' },
  { id: 'lab', label: 'Lab unavailable', emoji: '💻' },
  { id: 'classroom', label: 'Room changed', emoji: '🚪' },
] as const;

export const Hero: React.FC<HeroProps> = ({
  stats,
  onExploreLive,
  onOpenReportModal,
  onTryScenario
}) => {
  const metrics = [
    {
      icon: Clock,
      value: stats.avgRerouteTimeSeconds,
      suffix: 's',
      decimals: 0,
      label: 'Avg. reroute time',
      hint: 'Nearest working backup',
      tone: 'cyan' as const,
    },
    {
      icon: CheckCircle2,
      value: stats.uptimePreservedPercentage,
      suffix: '%',
      decimals: 1,
      label: 'Class uptime',
      hint: 'Sessions protected',
      tone: 'emerald' as const,
    },
    {
      icon: Zap,
      value: stats.issuesResolvedToday,
      suffix: '',
      decimals: 0,
      label: 'Mitigated today',
      hint: '5 resource types',
      tone: 'violet' as const,
    },
    {
      icon: Globe2,
      value: stats.activeCampuses,
      suffix: '+',
      decimals: 0,
      label: 'Campuses live',
      hint: 'Campus-independent',
      tone: 'sky' as const,
    },
  ];

  const toneClass: Record<string, string> = {
    cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25',
    emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
    violet: 'text-violet-400 bg-violet-400/10 border-violet-400/25',
    sky: 'text-sky-400 bg-sky-400/10 border-sky-400/25',
  };

  return (
    <section id="overview" className="relative overflow-hidden pt-8 sm:pt-14 pb-14 sm:pb-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Brand eyebrow */}
        <div className="reveal flex items-center justify-center gap-3 mb-5 sm:mb-7">
          <span className="h-px w-7 sm:w-10" style={{ background: 'var(--line-strong)' }} />
          <span className="eyebrow t-faint">Campus resilience protocol</span>
          <span className="h-px w-7 sm:w-10" style={{ background: 'var(--line-strong)' }} />
        </div>

        {/* Hero copy */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="reveal reveal-d1 text-[2rem] leading-[1.12] xs:text-4xl sm:text-5xl lg:text-[4.1rem] font-extrabold tracking-[-0.03em] t-heading sm:leading-[1.05]">
            When campus resources fail,
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">ResQ routes you to the backup.</span>
          </h1>

          <p className="reveal reveal-d2 mt-4 sm:mt-6 text-[0.95rem] sm:text-lg t-muted max-w-2xl mx-auto leading-relaxed">
            Broken projectors, dead Wi-Fi zones, jammed printers, packed labs, sudden room changes.
            ResQ detects the failure, finds the closest working alternative, and walks you there.
          </p>

          {/* CTAs */}
          <div className="reveal reveal-d3 mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <button onClick={onExploreLive} className="btn btn-primary w-full sm:w-auto !py-3.5 !px-7">
              <Navigation className="w-4.5 h-4.5" />
              <span>Find my backup</span>
              <ArrowRight className="w-4 h-4 opacity-90" />
            </button>

            <button onClick={onOpenReportModal} className="btn btn-glass w-full sm:w-auto !py-3.5 !px-6">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-400" />
              <span>Simulate an incident</span>
            </button>
          </div>

          {/* Quick scenarios */}
          <div className="reveal reveal-d4 mt-8 sm:mt-10">
            <div className="flex items-center gap-2.5 mb-3 justify-center">
              <span className="eyebrow t-faint">Try a live scenario</span>
              <span className="hidden sm:block h-px w-14" style={{ background: 'var(--line)' }} />
            </div>
            <div className="scroll-x -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-2">
              <div className="flex sm:flex-wrap items-center gap-2 w-max sm:w-auto">
                {SCENARIOS.map((item) => (\n                  <button
                    key={item.id}
                    onClick={() => onTryScenario(item.id)}
                    className="scenario-pill group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--surface-1)] hover:bg-[var(--surface-2)] border border-[var(--line)] text-xs font-medium t-body hover:t-heading transition-all whitespace-nowrap"
                  >
                    <span className="text-sm">{item.emoji}</span>
                    <span>{item.label}</span>
                    <ArrowRight className="w-3 h-3 t-faint group-hover:t-accent group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live metrics */}
        <div className="mt-10 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {metrics.map(({ icon: Icon, value, label, hint, tone, suffix, decimals }, i) => (
            <div
              key={label}
              className={`reveal reveal-d${Math.min(i + 1, 6)} glass glass-edge glass-hover rounded-2xl p-3.5 sm:p-5 text-center sm:text-left`}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center mb-2.5 mx-auto sm:mx-0 ${toneClass[tone]}`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <AnimatedNumber
                value={value}
                decimals={decimals}
                suffix={suffix}
                className="block text-2xl sm:text-3xl font-extrabold t-heading font-mono tracking-tight"
              />
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider t-muted mt-1">{label}</div>
              <p className="hidden sm:block text-[11px] t-faint mt-1">{hint}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
