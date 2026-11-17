import React from 'react';
import {
  ArrowRight,
  GitBranch,
  MessageCircle,
} from 'lucide-react';

const COLUMNS = [
  {
    title: 'Resource redundancies',
    links: [
      'AV & projector failover',
      'Mesh Wi-Fi deadzone rerouting',
      'Distributed cloud print spooling',
      'Compute & GPU lab load shifting',
      'Classroom evacuation & shift',
    ],
  },
  {
    title: 'Institutional scale',
    links: [
      'Campus-independent architecture',
      'BIM & CAD map ingestion',
      'SAML 2.0 / Shibboleth SSO',
      'Zero-knowledge door tokens',
      'Edge thermal telemetry sync',
    ],
  },
  {
    title: 'Platform governance',
    links: [
      'FERPA & GDPR compliance',
      'Campus IT administration API',
      'Autonomous incident auditing',
      'Student privacy safeguards',
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="pt-10 sm:pt-16 pb-8 sm:pb-12 border-t divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* CTA */}
        <div className="reveal glass glass-strong glass-edge rounded-2xl sm:rounded-3xl p-5 sm:p-10 relative overflow-hidden mb-10 sm:mb-16">
          <div
            className="absolute -top-20 -right-10 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'var(--accent-soft)' }}
          />
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
            <div className="max-w-xl">
              <span className="chip chip-cyan mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Campus onboarding open
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold tracking-[-0.02em] t-heading leading-tight">
                Eliminate campus downtime at your institution
              </h3>
              <p className="mt-2 text-[13px] sm:text-sm t-muted leading-relaxed">
                Connect your campus map, timetables, and resource APIs in under 48 hours — with zero hardware modifications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto shrink-0">
              <button
                onClick={() => alert('Pilot request logged! Our university onboarding team will reach out within 2 hours.')}
                className="btn btn-primary w-full sm:w-auto"
              >
                <span>Schedule a pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert('API documentation is available on request for pilot campuses.')}
                className="btn btn-glass w-full sm:w-auto"
              >
                <span>View API docs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7 sm:gap-8 pb-8 sm:pb-12 border-b divider">
          <div className="reveal reveal-d1 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img src="/resq-logo.svg" alt="" className="w-9 h-9" />
              <span className="text-xl font-black t-heading">
                Res<span className="t-accent">Q</span>
              </span>
            </div>
            <p className="mt-3 text-[11px] sm:text-xs t-muted leading-relaxed max-w-xs">
              AI-powered campus resilience. Instant emergency backup finder and predictive resource failover for higher education.
            </p>
            <div className="mt-3.5 flex items-center gap-2 text-[10px]">
              <span className="chip chip-emerald">
                <span className="status-dot" />
                All systems nominal
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="#overview"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg border border-[var(--line)] bg-[var(--surface-1)] flex items-center justify-center t-muted hover:t-heading hover:bg-[var(--surface-2)] transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" />
              </a>
              <a
                href="#overview"
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg border border-[var(--line)] bg-[var(--surface-1)] flex items-center justify-center t-muted hover:t-heading hover:bg-[var(--surface-2)] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {COLUMNS.map((column, i) => (
            <div key={column.title} className={`reveal reveal-d${i + 2}`}>
              <h4 className="text-[10px] sm:text-xs font-bold t-heading uppercase tracking-wider mb-3">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <button className="text-left text-[11px] sm:text-xs t-muted hover:t-accent transition-colors leading-snug">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs t-faint">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} ResQ Campus Resilience Protocol. Built for universities worldwide.
          </p>
          <div className="flex items-center gap-4">
            <button className="hover:t-body transition-colors">Security</button>
            <button className="hover:t-body transition-colors">API specs</button>
            <button className="hover:t-body transition-colors">Status</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
