import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronRight,
  Radio,
  MapPin,
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Navigation,
  BrainCircuit,
  Globe2,
  Cpu,
  Check,
} from 'lucide-react';
import type { Theme } from '../theme';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReportModal: () => void;
  selectedCampus: string;
  setSelectedCampus: (campus: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const TABS = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'live-reroute', label: 'Backup Finder', icon: Navigation },
  { id: 'predictive', label: 'Predictive AI', icon: BrainCircuit },
  { id: 'scalable', label: 'Scale', icon: Globe2 },
  { id: 'architecture', label: 'System', icon: Cpu },
];

const CAMPUSES = [
  'Apex University - Metro Campus',
  'Stanford Tech & Science Park',
  'Imperial Institute of Technology',
  'State Polytechnic University',
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  selectedCampus,
  setSelectedCampus,
  theme,
  onToggleTheme,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Animated scroll progress along the top of the glass nav.
  useEffect(() => {
    const update = () => {
      const el = progressRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${progress})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="nav-shell">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-3">
          <div className="nav-inner glass-edge px-2.5 sm:px-3.5">
            <span ref={progressRef} className="scroll-progress" aria-hidden="true" />
            <div className="flex items-center justify-between gap-2 h-14 sm:h-16">

              {/* Brand */}
              <button
                onClick={() => go('overview')}
                className="flex items-center gap-2.5 min-w-0 rounded-xl pr-1 text-left"
              >
                <img
                  src="/resq-logo.svg"
                  alt=""
                  className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 drop-shadow-[0_6px_14px_rgba(16,185,129,0.22)]"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl sm:text-[1.35rem] font-black tracking-tight t-heading leading-none">
                      Res<span className="t-accent">Q</span>
                    </span>
                  </div>
                  <p className="hidden sm:block text-[10px] t-faint leading-tight mt-0.5 truncate">
                    Campus resilience protocol
                  </p>
                </div>
              </button>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-[var(--surface-1)] border border-[var(--line)]">
                {TABS.map(({ id, label }) => (\n                  <button
                    key={id}
                    onClick={() => go(id)}
                    className="nav-link"
                    data-active={activeTab === id}
                  >
                    {label}
                  </button>
                ))}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="hidden xl:flex items-center gap-1.5 h-9 pl-2.5 pr-1.5 rounded-xl bg-[var(--surface-1)] border border-[var(--line)] max-w-[15rem]">
                  <MapPin className="w-3.5 h-3.5 t-accent shrink-0" />
                  <select
                    aria-label="Campus selector"
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    className="bg-transparent t-body outline-none text-xs cursor-pointer truncate font-medium pr-1"
                  >
                    {CAMPUSES.map((campus) => (
                      <option key={campus} value={campus} style={{ background: 'var(--bg-soft)', color: 'var(--text)' }}>
                        {campus}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Theme toggle */}
                <button
                  onClick={onToggleTheme}
                  className="theme-btn"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Moon className="w-4 h-4 text-sky-600" />
                  )}
                </button>

                {/* Desktop report CTA */}
                <div className="hidden md:block">
                  <button
                    onClick={onOpenReportModal}
                    className="btn btn-danger btn-sm h-9 shrink-0"
                  >
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>Report Failure</span>
                    <ChevronRight className="w-3 h-3 opacity-80" />
                  </button>
                </div>

                {/* Mobile report icon */}
                <button
                  onClick={onOpenReportModal}
                  className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-white bg-gradient-to-br from-rose-500 to-red-600 shadow-md shadow-rose-500/25 active:scale-95 transition-transform"
                  aria-label="Report resource failure"
                >
                  <Radio className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--surface-1)] border border-[var(--line)] t-body hover:bg-[var(--surface-2)] transition-all"
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu sheet */}
      <div
        className="sheet-overlay lg:hidden"
        data-open={menuOpen}
        onClick={() => setMenuOpen(false)}
        inert={!menuOpen}
      >
        <div
          className="sheet-panel glass-edge"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b divider">
            <div className="flex items-center gap-2">
              <img src="/resq-logo.svg" alt="" className="w-7 h-7" />
              <span className="text-sm font-bold t-heading">Navigate ResQ</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center t-muted hover:bg-[var(--surface-2)] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="grid gap-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
                style={
                  activeTab === id
                    ? { background: 'var(--accent-soft)', color: 'var(--accent)' }
                    : { color: 'var(--text-2)' }
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {activeTab === id && <Check className="w-4 h-4" />}
              </button>
            ))}
          </nav>

          <div className="mt-3 pt-3 border-t divider space-y-2.5">
            <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-[var(--surface-1)] border border-[var(--line)]">
              <MapPin className="w-4 h-4 t-accent shrink-0" />
              <select
                aria-label="Campus selector"
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="flex-1 bg-transparent t-body outline-none text-xs cursor-pointer py-2"
              >
                {CAMPUSES.map((campus) => (
                  <option key={campus} value={campus} style={{ background: 'var(--bg-soft)', color: 'var(--text)' }}>
                    {campus}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { onOpenReportModal(); setMenuOpen(false); }}
                className="btn btn-danger flex-1 h-10"
              >
                <Radio className="w-4 h-4" />
                <span>Report a failure</span>
              </button>
              <button
                onClick={onToggleTheme}
                className="btn btn-glass h-10 w-11 shrink-0"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
