import React, { useState } from 'react';
import {
  Globe,
  Lock,
  Workflow,
  CheckCircle,
  Boxes,
  Zap,
  ArrowRight,
} from 'lucide-react';

type CampusType = 'urban' | 'sprawling' | 'collegiate';

export const ScalableArchitecture: React.FC = () => {
  const [selectedCampusType, setSelectedCampusType] = useState<CampusType>('urban');

  const campusProfiles = {
    urban: {
      title: 'Dense vertical campus',
      subtitle: 'Multi-floor towers',
      specs: 'Elevator-aware routing, vertical Wi-Fi beamforming, skybridge indoor pathing.',
      avgBackupRadius: '45–90 m',
      radiusNote: 'Same or adjacent tower',
      primaryChallenges: 'Elevator waits, dense Wi-Fi channel overlaps, locked stairwells.',
      deploymentTime: 'Under 48 hours',
      deployNote: 'BIM / CAD map ingest',
    },
    sprawling: {
      title: 'Sprawling suburban campus',
      subtitle: '50+ separate pavilions',
      specs: 'Inter-building covered walkway routing, bicycle transit backup buffers, outdoor AP handoffs.',
      avgBackupRadius: '120–250 m',
      radiusNote: 'Adjacent quad buildings',
      primaryChallenges: 'Weather exposure while rerouting, cross-department lab permissions.',
      deploymentTime: 'Under 72 hours',
      deployNote: 'GIS + OpenStreetMap',
    },
    collegiate: {
      title: 'Historic collegiate',
      subtitle: 'Heritage architecture',
      specs: 'Thick stone wall penetration metrics, portable hot-swap AV carts, decentralized tutor rooms.',
      avgBackupRadius: '60–110 m',
      radiusNote: 'Quad cloisters & annexes',
      primaryChallenges: 'Limited power outlets, legacy wiring, heritage constraints.',
      deploymentTime: 'Instant onboarding',
      deployNote: 'No drilling or rewiring',
    },
  } as const;

  const pillars = [
    {\n      icon: Boxes,
      title: 'Universal resource abstraction',
      body: 'Crestron, Extron, Cisco, Aruba, PaperCut or Pharos — ResQ treats every system as a standardized node endpoint.',
      footer: 'Zero vendor lock-in',
      tone: 'cyan' as const,
    },
    {
      icon: Workflow,
      title: 'Dynamic topology graph',
      body: 'Campuses become weighted directed graphs where edges are real walk times through elevators, stairs, ramps, and construction blocks.',
      footer: 'ADA-compliant routing',
      tone: 'violet' as const,
    },
    {
      icon: Lock,
      title: 'Zero-knowledge access',
      body: 'Temporary cryptographic door passes, printer release tokens, and Wi-Fi failover credentials — without exposing student PII.',
      footer: 'SSO-ready',
      tone: 'emerald' as const,
    },
  ];

  const tones: Record<string, string> = {
    cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25',
    violet: 'text-violet-400 bg-violet-400/10 border-violet-400/25',
    emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
  };

  const profile = campusProfiles[selectedCampusType];

  return (
    <section id="scalable" className="py-14 sm:py-20 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="chip chip-cyan mb-3">
            <Globe className="w-3.5 h-3.5" />
            Campus-independent
          </span>
          <h2 className="text-[1.75rem] sm:text-4xl font-extrabold tracking-[-0.02em] t-heading leading-tight">
            Engineered to scale to any university
          </h2>
          <p className="mt-2.5 text-sm sm:text-base t-muted leading-relaxed">
            No custom hardware retrofits. No proprietary IT replacements. ResQ abstracts any campus into one interconnected resilience graph.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 mb-8 sm:mb-14">
          {pillars.map(({ icon: Icon, title, body, footer, tone }, i) => (
            <div key={title} className={`reveal reveal-d${i + 1} glass glass-edge glass-hover rounded-2xl p-5 sm:p-6 flex flex-col justify-between`}>
              <div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center mb-4 ${tones[tone]}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold t-heading">{title}</h3>
                <p className="text-[12px] sm:text-sm t-muted mt-2 leading-relaxed">{body}</p>
              </div>
              <div className="mt-4 pt-3 border-t divider text-[11px] t-accent font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{footer}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </div>
            </div>
          ))}
        </div>

        {/* Simulator */}
        <div className="reveal reveal-d4 glass glass-strong glass-edge rounded-2xl sm:rounded-3xl p-4 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b divider">
            <div>
              <span className="eyebrow t-accent">Scalability simulator</span>
              <h3 className="text-lg sm:text-2xl font-bold t-heading mt-1 leading-tight">
                Adapt to different campus morphologies
              </h3>
            </div>

            <div className="segmented scroll-x self-start md:self-auto max-w-full">
              {(['urban', 'sprawling', 'collegiate'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedCampusType(type)}
                  className={`segmented-item capitalize ${selectedCampusType === type ? 'segmented-item-active' : ''}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div key={selectedCampusType} className="swap-in mt-4 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="inner-panel rounded-xl p-3.5 col-span-2 lg:col-span-1">
              <span className="eyebrow t-faint">Layout profile</span>
              <p className="text-sm sm:text-[15px] font-bold t-heading mt-1.5">{profile.title}</p>
              <p className="text-[10px] t-faint mt-0.5">{profile.subtitle}</p>
            </div>

            <div className="inner-panel rounded-xl p-3.5">
              <span className="eyebrow t-faint">Reroute radius</span>
              <p className="text-base sm:text-lg font-bold t-accent font-mono mt-1.5">{profile.avgBackupRadius}</p>
              <p className="text-[10px] t-faint mt-0.5 leading-tight">{profile.radiusNote}</p>
            </div>

            <div className="inner-panel rounded-xl p-3.5">
              <span className="eyebrow t-faint">Onboarding</span>
              <p className="text-sm sm:text-[15px] font-bold t-up mt-1.5 leading-snug">{profile.deploymentTime}</p>
              <p className="text-[10px] t-faint mt-0.5">{profile.deployNote}</p>
            </div>

            <div className="inner-panel rounded-xl p-3.5 col-span-2 sm:col-span-1">
              <span className="eyebrow t-faint">Primary obstacle</span>
              <p className="text-[11px] sm:text-xs font-semibold t-warn mt-1.5 leading-relaxed">{profile.primaryChallenges}</p>
            </div>
          </div>

          <div className="mt-3.5 p-3.5 rounded-xl inner-panel flex items-start gap-2.5">
            <Zap className="w-4 h-4 t-accent shrink-0 mt-0.5" />
            <p className="text-[11px] sm:text-xs t-body leading-relaxed">
              <strong className="t-heading">Routing intelligence:</strong> {profile.specs}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
