import { useCallback, useEffect, useState } from 'react';
import {
  Home,
  Navigation,
  BrainCircuit,
  Globe,
  Radio,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveReroute } from './components/LiveReroute';
import { PredictiveAIEngine } from './components/PredictiveAIEngine';
import { ScalableArchitecture } from './components/ScalableArchitecture';
import { SystemDesign } from './components/SystemDesign';
import { ReportIncidentModal } from './components/ReportIncidentModal';
import { Footer } from './components/Footer';
import { INITIAL_ISSUES, PREDICTIVE_ALERTS, PLATFORM_STATS } from './data';
import { CampusIssue, PredictiveAlert, CampusStats } from './types';
import { subscribeToIncidents } from './services/resqService';
import { useTheme, useActiveSection, useMediaQuery, useScrollReveal } from './theme';

const SECTION_IDS = ['overview', 'live-reroute', 'predictive', 'scalable', 'architecture'];

export function App() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { active: activeTab, setActive: setActiveTab } = useActiveSection(
    SECTION_IDS,
    'overview',
    !isMobile
  );
  useScrollReveal(isMobile ? activeTab : 'desktop');
  const [selectedCampus, setSelectedCampus] = useState('Apex University - Metro Campus');
  const [issues, setIssues] = useState<CampusIssue[]>(INITIAL_ISSUES);
  const [alerts, setAlerts] = useState<PredictiveAlert[]>(PREDICTIVE_ALERTS);
  const [stats, setStats] = useState<CampusStats>(PLATFORM_STATS);
  const [selectedIssueId, setSelectedIssueId] = useState<string>(INITIAL_ISSUES[0].id);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportModalCategory, setReportModalCategory] = useState<'projector' | 'wifi' | 'printer' | 'lab' | 'classroom'>('projector');

  // Real-time Firestore sync listener
  useEffect(() => {
    const unsubscribe = subscribeToIncidents((liveIssues) => {
      if (liveIssues && liveIssues.length > 0) {
        setIssues(liveIssues);
        if (!selectedIssueId || !liveIssues.some(i => i.id === selectedIssueId)) {
          setSelectedIssueId(liveIssues[0].id);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Mobile screens start at the top; desktop sections scroll into view.
  useEffect(() => {
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [activeTab, isMobile]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    if (tabId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(tabId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isMobile, setActiveTab]);

  // Trigger scenario shortcut
  const handleTryScenario = (category: 'projector' | 'wifi' | 'printer' | 'lab' | 'classroom') => {
    const match = issues.find(i => i.category === category);
    if (match) {
      setSelectedIssueId(match.id);
      if (isMobile) {
        handleTabChange('live-reroute');
      } else {
        const element = document.getElementById('live-reroute');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setReportModalCategory(category);
      setIsReportModalOpen(true);
    }
  };

  // Add a newly reported failure
  const handleAddNewIssue = (newIssue: CampusIssue) => {
    setIssues(prev => [newIssue, ...prev.filter(i => i.id !== newIssue.id)]);
    setSelectedIssueId(newIssue.id);
    setStats(prev => ({
      ...prev,
      issuesResolvedToday: prev.issuesResolvedToday + 1
    }));

    if (isMobile) {
      handleTabChange('live-reroute');
    } else {
      const element = document.getElementById('live-reroute');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openReportModal = () => {
    setReportModalCategory('projector');
    setIsReportModalOpen(true);
  };

  const dockItems = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'live-reroute', label: 'Backup', icon: Navigation },
    { id: 'predictive', label: 'Predict', icon: BrainCircuit },
    { id: 'scalable', label: 'Scale', icon: Globe },
  ];

  const heroSection = (
    <Hero
      stats={stats}
      onExploreLive={() => handleTabChange('live-reroute')}
      onOpenReportModal={openReportModal}
      onTryScenario={handleTryScenario}
    />
  );

  const liveSection = (
    <LiveReroute
      issues={issues}
      selectedIssueId={selectedIssueId}
      onSelectIssue={setSelectedIssueId}
      onOpenReportModal={openReportModal}
    />
  );

  const predictiveSection = (
    <PredictiveAIEngine
      alerts={alerts}
      onTriggerSelfHealing={() => {
        setStats(prev => ({ ...prev, issuesResolvedToday: prev.issuesResolvedToday + 1 }));
      }}
    />
  );

  const scalableSection = <ScalableArchitecture />;
  const systemSection = <SystemDesign />;

  const isKnownView = ['live-reroute', 'predictive', 'scalable', 'architecture'].includes(activeTab);

  return (
    <div className="page-shell flex flex-col">
      {/* Ambient aurora background */}
      <div className="ambient" aria-hidden="true">
        <div className="ambient-blob ambient-blob-a" />
        <div className="ambient-blob ambient-blob-b" />
        <div className="ambient-blob ambient-blob-c" />
      </div>

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenReportModal={openReportModal}
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isMobile ? (
          <div key={activeTab} className="mobile-view">
            {activeTab === 'live-reroute' && liveSection}
            {activeTab === 'predictive' && predictiveSection}
            {activeTab === 'scalable' && scalableSection}
            {activeTab === 'architecture' && systemSection}
            {!isKnownView && heroSection}
          </div>
        ) : (
          <>
            {heroSection}
            {liveSection}
            {predictiveSection}
            {scalableSection}
            {systemSection}
          </>
        )}
      </main>

      {/* Incident Simulation Modal */}
      <ReportIncidentModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitIncident={handleAddNewIssue}
        defaultCategory={reportModalCategory}
      />

      {/* Footer is part of the desktop landing page; mobile uses dedicated screens. */}
      {!isMobile && <Footer />}

      {/* Mobile floating dock */}
      <div className="mobile-dock md:hidden">
        <div className="flex items-center gap-0.5">
          {dockItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              className="dock-item"
              data-active={activeTab === id}
              aria-label={label}
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
              <span>{label}</span>
            </button>
          ))}
          <button
            onClick={openReportModal}
            className="dock-item"
            aria-label="Report failure"
          >
            <span className="dock-report">
              <Radio className="w-3.5 h-3.5" />
            </span>
            <span>Report</span>
          </button>
        </div>
      </div>
      <div className="mobile-dock-spacer md:hidden" />
    </div>
  );
}

export default App;
