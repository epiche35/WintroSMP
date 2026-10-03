/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TopNav } from './components/navigation/TopNav';
import { CinematicHero } from './components/hero/CinematicHero';
import { PeacefulSurvivalSection } from './components/sections/PeacefulSurvivalSection';
import { LandClaimingSection } from './components/sections/LandClaimingSection';
import { RedstoneShopsSection } from './components/sections/RedstoneShopsSection';
import { DiamondEconomySection } from './components/sections/DiamondEconomySection';
import { PvPArenaSection } from './components/sections/PvPArenaSection';
import { CommunitySection } from './components/sections/CommunitySection';
import { LaunchSection } from './components/sections/LaunchSection';
import { CreatorFooter } from './components/footer/CreatorFooter';

export default function App() {
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070908] text-[#f4ede1] selection:bg-[#1f4a36] selection:text-[#f4ede1]">
      {/* 1. Floating Top Navigation */}
      <TopNav onNavClick={scrollToAnchor} />

      {/* 2. Seamless Cinematic Narrative Journey */}
      <main>
        {/* Chapter 00: World Entry Hero */}
        <CinematicHero
          onExploreClick={() => scrollToAnchor('world')}
          onFeaturesClick={() => scrollToAnchor('shops')}
        />

        {/* Chapter 01: Peaceful Survival */}
        <PeacefulSurvivalSection
          onExploreClick={() => scrollToAnchor('claiming')}
        />

        {/* Chapter 02: Land Claiming */}
        <LandClaimingSection
          onNextSection={() => scrollToAnchor('shops')}
        />

        {/* Chapter 03: Redstone Shops */}
        <RedstoneShopsSection
          onNextSection={() => scrollToAnchor('economy')}
        />

        {/* Chapter 04: Diamond Economy */}
        <DiamondEconomySection
          onNextSection={() => scrollToAnchor('arena')}
        />

        {/* Chapter 05: PvP Arena */}
        <PvPArenaSection
          onNextSection={() => scrollToAnchor('community')}
        />

        {/* Chapter 06: Community */}
        <CommunitySection
          onNextSection={() => scrollToAnchor('launch')}
        />

        {/* Chapter 07: Final Launch Finale */}
        <LaunchSection />
      </main>

      {/* 3. Final Creator Signature & Studio Credits */}
      <CreatorFooter />
    </div>
  );
}
