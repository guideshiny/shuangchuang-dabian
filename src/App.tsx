import React, { useState } from 'react';
import SelectorScreen from './screens/SelectorScreen';
import PrepScreen from './screens/PrepScreen';
import SessionScreen from './screens/SessionScreen';
import ReportScreen from './screens/ReportScreen';
import { Project, ModeDef } from './types';

export default function App() {
  const [view, setView] = useState<'selector' | 'prep' | 'session' | 'report'>('selector');
  const [project, setProject] = useState<Project | null>(null);
  const [mode, setMode] = useState<ModeDef | null>(null);
  const [isReplay, setIsReplay] = useState(false);

  const handleStartPrep = (p: Project, m: ModeDef) => {
    setProject(p);
    setMode(m);
    setIsReplay(false);
    setView('prep');
  };

  const handleStartSession = () => {
    setView('session');
  };

  const handleViewReport = (p: Project, m: ModeDef) => {
    setProject(p);
    setMode(m);
    setView('report');
  };

  const handleFinish = () => {
    setView('report');
  };

  const handleRestart = () => {
    setView('selector');
    setProject(null);
    setMode(null);
    setIsReplay(false);
  };

  const handleReplay = () => {
    setIsReplay(true);
    setView('prep');
  };

  return (
    <>
      {/* Global Header */}
      <header className="h-16 px-6 flex items-center justify-between z-10 relative bg-transparent">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[--color-primary] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <span className="text-[16px] font-bold text-[--color-text-primary] tracking-wide">MockDefense AI</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-0">
        {view === 'selector' && (
          <SelectorScreen onStart={handleStartPrep} onViewReport={handleViewReport} />
        )}

        {view === 'prep' && project && mode && (
          <PrepScreen 
            project={project} 
            mode={mode} 
            onStartSession={handleStartSession} 
            onBack={() => setView('selector')}
            skipAnalysis={isReplay}
          />
        )}
        
        {view === 'session' && project && mode && (
          <SessionScreen project={project} mode={mode} onFinish={handleFinish} />
        )}
        
        {view === 'report' && project && mode && (
          <ReportScreen project={project} mode={mode} onRestart={handleRestart} onReplay={handleReplay} />
        )}
      </main>
    </>
  );
}

