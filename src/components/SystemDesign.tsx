import React from 'react';
import {
  Cpu,
  Workflow,
  Radio,
  ShieldCheck,
  Network,
  ArrowRight,
} from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Radio,
    title: 'Detection & ingestion',
    body: 'Pulls SNMP status from AV hubs, Wi-Fi controller AP metrics, printer syslog queues, and zero-click crowd signals.',
    footer: '<500ms edge polling',
    tone: 'cyan' as const,
  },
  {
    num: '02',
    icon: Network,
    title: 'Topology graph solver',
    body: 'An A* / Dijkstra engine weighs 3D indoor elevation, room schedules, door permissions, and walking distance.',
    footer: 'Shortest footstep weight',
    tone: 'sky' as const,
  },
  {
    num: '03',
    icon: Workflow,
    title: 'Predictive AI engine',
    body: 'Analyzes wear cycles, calendar shifts, and environmental thermals to reserve backups before equipment fails.',
    footer: 'Neural time-series forecast',
    tone: 'violet' as const,
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Zero-friction handover',
    body: 'Dispatches turn-by-turn indoor directions, door unlock tokens, and auto-spooled print jobs to student devices.',
    footer: 'Instant authorization',
    tone: 'emerald' as const,
  },
];

const toneClasses: Record<string, { icon: string; num: string; footer: string }> = {
  cyan: {
    icon: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25',
    num: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/25',
    footer: 't-accent',
  },
  sky: {
    icon: 'text-sky-400 bg-sky-400/10 border-sky-400/25',
    num: 'bg-sky-400/10 text-sky-400 border-sky-400/25',
    footer: 't-sky',
  },
  violet: {
    icon: 'text-violet-400 bg-violet-400/10 border-violet-400/25',
    num: 'bg-violet-400/10 text-violet-400 border-violet-400/25',
    footer: 't-violet',
  },
  emerald: {
    icon: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
    num: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/25',
    footer: 't-up',
  },
};

export const SystemDesign: React.FC = () => {
  return (
    <section id="architecture" className="py-14 sm:py-20 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="reveal text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="chip chip-cyan mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Under the hood
          </span>
          <h2 className="text-[1.75rem] sm:text-4xl font-extrabold tracking-[-0.02em] t-heading leading-tight">
            Autonomous four-tier resilience
          </h2>
          <p className="mt-2.5 text-sm sm:text-base t-muted leading-relaxed">
            Edge telemetry, topology solving, pre-emptive ML, and student handshakes coordinated in sub-second latency.
          </p>
        </div>

        <div className="relative">
          {/* Desktop connector */}
          <div className="hidden lg:block absolute top-[3.6rem] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[var(--line-strong)] to-transparent" />

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {STEPS.map(({ num, icon: Icon, title, body, footer, tone }, i) => {
              const t = toneClasses[tone];
              return (
                <div key={num} className={`reveal reveal-d${Math.min(i + 1, 6)} glass glass-edge glass-hover rounded-2xl p-4 sm:p-5 relative`}>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className={`w-8 h-8 rounded-lg font-mono font-bold flex items-center justify-center text-xs border ${t.num}`}>
                      {num}
                    </span>
                    <span className={`w-9 h-9 rounded-xl border flex items-center justify-center ${t.icon}`}>
                      <Icon className="w-[18px] h-[18px]" />
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-bold t-heading leading-snug">{title}</h3>
                  <p className="mt-1.5 text-[11px] sm:text-xs t-muted leading-relaxed">{body}</p>
                  <div className={`mt-3.5 pt-3 border-t divider text-[10px] sm:text-[11px] font-mono flex items-center gap-1.5 ${t.footer}`}>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                    <span className="truncate">{footer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
