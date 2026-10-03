/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useTransform, useMotionValue } from 'motion/react';
import { Compass, Sparkles, ChevronDown } from 'lucide-react';
import { SERVER_CONFIG } from '../../config/server.config';
import { Button } from '../ui/Button';

interface HeroContentProps {
  scrollYProgress?: any;
  onExploreClick?: () => void;
  onFeaturesClick?: () => void;
}

export function HeroContent({
  scrollYProgress,
  onExploreClick,
  onFeaturesClick,
}: HeroContentProps) {
  // Gentle scroll upward movement and subtle fade for smooth cinematic transition
  const contentY = useTransform(scrollYProgress || useMotionValue(0), [0, 0.7], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress || useMotionValue(0), [0, 0.65], [1, 0]);
  const contentScale = useTransform(scrollYProgress || useMotionValue(0), [0, 0.7], [1, 0.96]);

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const target = document.getElementById('world-preview') || document.getElementById('world');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleFeatures = () => {
    if (onFeaturesClick) {
      onFeaturesClick();
    } else {
      const target = document.getElementById('features-preview') || document.getElementById('features');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      style={{
        y: contentY,
        opacity: contentOpacity,
        scale: contentScale,
      }}
      className="relative z-20 w-full max-w-5xl mx-auto px-6 pt-24 sm:pt-28 pb-16 flex flex-col items-center text-center justify-center min-h-[90vh]"
    >
      {/* 1. Main Title with Mask Reveal & Blur-to-Sharp */}
      <div className="overflow-hidden pb-2 mb-3 sm:mb-4">
        <motion.h1
          initial={{ y: '110%', opacity: 0, filter: 'blur(12px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 1.3,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-['Cinzel'] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[0.14em] sm:tracking-[0.18em] text-[#f4ede1] uppercase drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] select-none"
        >
          {SERVER_CONFIG.wordmark}
        </motion.h1>
      </div>

      {/* 2. "COMING SOON" Reveal */}
      <div className="overflow-hidden mb-5 sm:mb-6">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-center gap-3"
        >
          <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#c59f4e]/60" aria-hidden="true" />
          <span className="font-['Cinzel'] text-xs sm:text-sm md:text-base font-semibold tracking-[0.38em] text-[#e0b759] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            COMING SOON
          </span>
          <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#c59f4e]/60" aria-hidden="true" />
        </motion.div>
      </div>

      {/* 3. Tagline Staggered Reveal */}
      <div className="overflow-hidden mb-9 sm:mb-11 max-w-2xl">
        <motion.p
          initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 1.1,
            delay: 1.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-sans text-sm sm:text-base md:text-lg text-[#d8dfdc] tracking-[0.22em] uppercase font-medium leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] [text-wrap:balance]"
        >
          {SERVER_CONFIG.tagline}
        </motion.p>
      </div>

      {/* 4. Understated Cinematic CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 1.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md sm:max-w-none"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={handleExplore}
          showArrow
          icon={<Compass className="w-4 h-4 text-[#e0b759]" />}
          className="w-full sm:w-auto min-w-[210px] tracking-[0.16em] uppercase text-xs sm:text-sm font-semibold py-3.5 px-7"
        >
          EXPLORE THE WORLD
        </Button>

        <Button
          variant="stone"
          size="lg"
          onClick={handleFeatures}
          showArrow
          icon={<Sparkles className="w-4 h-4 text-[#4cbcd6]" />}
          className="w-full sm:w-auto min-w-[210px] tracking-[0.16em] uppercase text-xs sm:text-sm font-semibold py-3.5 px-7"
        >
          DISCOVER FEATURES
        </Button>
      </motion.div>

      {/* 5. Quiet Downward Environmental Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#798881] font-mono">
          SCROLL
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-[#798881] animate-bounce" />
      </motion.div>
    </motion.div>
  );
}
