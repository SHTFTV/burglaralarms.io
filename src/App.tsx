/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SystemBuilder } from './components/SystemBuilder';
import { FloorplanZoneSimulator } from './components/FloorplanZoneSimulator';
import { VirtualKeypadPanel } from './components/VirtualKeypadPanel';
import { SecurityAssessmentAudit } from './components/SecurityAssessmentAudit';
import { HardwareTechMatrix } from './components/HardwareTechMatrix';
import { SirenSoundTester } from './components/SirenSoundTester';
import { MonitoringPlans } from './components/MonitoringPlans';
import { PermitAndKnowledgeHub } from './components/PermitAndKnowledgeHub';
import { QuoteModal } from './components/QuoteModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('builder');
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [currentQuoteData, setCurrentQuoteData] = useState<any>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [systemState] = useState<string>('ARMED_AWAY');

  const handleOpenQuote = (customData?: any) => {
    if (customData) {
      setCurrentQuoteData(customData);
    }
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuote={() => handleOpenQuote()}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        systemState={systemState}
      />

      {/* Hero Banner (Always visible or visible on home/builder) */}
      <HeroSection
        setActiveTab={setActiveTab}
        onOpenQuote={() => handleOpenQuote()}
        systemState={systemState}
      />

      {/* Main Interactive Views */}
      <main className="flex-1">
        {activeTab === 'builder' && (
          <SystemBuilder
            onOpenQuote={handleOpenQuote}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'simulator' && (
          <FloorplanZoneSimulator />
        )}

        {activeTab === 'keypad' && (
          <VirtualKeypadPanel />
        )}

        {activeTab === 'audit' && (
          <SecurityAssessmentAudit
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'tech' && (
          <HardwareTechMatrix />
        )}

        {activeTab === 'soundlab' && (
          <SirenSoundTester />
        )}

        {activeTab === 'monitoring' && (
          <MonitoringPlans
            onOpenQuote={handleOpenQuote}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'knowledge' && (
          <PermitAndKnowledgeHub />
        )}
      </main>

      {/* Quote / Formal Proposal Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        quoteData={currentQuoteData}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenQuote={() => handleOpenQuote()}
      />

    </div>
  );
}
