/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useScroll } from 'motion/react';
import { HeroAtmosphere } from './HeroAtmosphere';
import { HeroParticles } from './HeroParticles';
import { HeroContent } from './HeroContent';

interface CinematicHeroProps {
  onExploreClick?: () => void;
  onFeaturesClick?: () => void;
}

export function CinematicHero({ onExploreClick, onFeaturesClick }: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#070908]"
    >
      {/* 1. Multi-plane layered environmental landscape */}
      <HeroAtmosphere scrollYProgress={scrollYProgress} />

      {/* 2. Micro-particle ambient spores / fireflies */}
      <HeroParticles />

      {/* 3. Primary cinematic typography & CTAs */}
      <HeroContent
        scrollYProgress={scrollYProgress}
        onExploreClick={onExploreClick}
        onFeaturesClick={onFeaturesClick}
      />
    </section>
  );
}
