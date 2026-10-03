/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Compass, Sparkles, Trees, Mountain, Feather } from 'lucide-react';
import { Button } from '../ui/Button';
import { WorldBox } from '../ui/WorldBox';

const PEACEFUL_IMAGE = '/src/assets/images/peaceful_survival_world_1790966472990.jpg';

interface PeacefulSurvivalSectionProps {
  onExploreClick?: () => void;
}

export function PeacefulSurvivalSection({ onExploreClick }: PeacefulSurvivalSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll tracking for cinematic in-view triggers & parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax offsets
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const visualTranslateY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const bgMistTranslateY = useTransform(scrollYProgress, [0, 1], [20, -70]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.03, 1, 0.98]);

  // Pointer interaction for the environmental visual
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 50 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const visualPointerX = useTransform(smoothMouseX, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-8, 8]);
  const visualPointerY = useTransform(smoothMouseY, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-6, 6]);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (motionQuery.matches || window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="world"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#070908] text-[#f4ede1] overflow-hidden pt-28 sm:pt-36 lg:pt-44 pb-32 sm:pb-40"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS HERO TRANSITION: Gradient mist, tree shadows, and ambient fog */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 inset-x-0 h-44 sm:h-64 pointer-events-none z-10 bg-gradient-to-b from-[#070908] via-[#09110d]/90 to-transparent"
        aria-hidden="true"
      />

      {/* Atmospheric Mid-Valley Mist Sheet */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : bgMistTranslateY }}
        className="absolute top-1/4 -left-1/4 w-[150%] h-[600px] pointer-events-none opacity-25 mix-blend-screen will-change-transform"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-radial from-[#1e3c2c]/40 via-[#10241b]/20 to-transparent blur-3xl" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. ASYMMETRIC EDITORIAL LAYOUT                                            */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ------------------------------------------------------------- */}
          {/* LEFT COLUMN (lg:col-span-5): Editorial Narrative & Typography */}
          {/* ------------------------------------------------------------- */}
          <motion.div
            style={{ y: isReducedMotion || isMobile ? 0 : textTranslateY }}
            className="lg:col-span-5 flex flex-col items-start text-left z-20"
          >
            <WorldBox variant="forest" className="w-full max-w-xl">
              {/* 1. Section Label (Unboxed text with typographic separator) */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-4 sm:mb-5"
              >
                <span className="w-6 h-[1px] bg-[#c59f4e]/70" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm tracking-[0.24em] text-[#c59f4e] uppercase font-medium">
                  01 / PEACEFUL SURVIVAL
                </span>
              </motion.div>

              {/* 2. Oversized "PEACEFUL SURVIVAL" Heading with Mask Reveal */}
              <div className="overflow-hidden mb-3 sm:mb-4">
                <motion.h2
                  initial={{ y: '105%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-[#f4ede1] uppercase leading-[1.08] [text-wrap:balance]"
                >
                  PEACEFUL SURVIVAL
                </motion.h2>
              </div>

              {/* 3. Staggered Tagline: Explore. Build. Wander. Make the world yours. */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Cinzel'] text-sm sm:text-base lg:text-lg text-[#d9cfbf] tracking-[0.16em] uppercase font-semibold mb-5 sm:mb-6 leading-snug"
              >
                Explore. Build. Wander. Make the world yours.
              </motion.p>

              {/* 4. Supporting Descriptive Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm sm:text-base text-[#9fb0a8] font-normal leading-relaxed mb-6 sm:mb-7 max-w-lg"
              >
                WINTRO SMP is built for players who want to enjoy survival at their own pace. Explore the world, gather resources, create your base, and build something that feels like your own.
              </motion.p>

              {/* 5. Natural World Essence Pillars (Clean, unboxed metadata) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans text-[#798881] mb-8 pb-6 border-b border-[#242c29]/60 w-full"
              >
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Trees className="w-3.5 h-3.5 text-[#357256]" />
                  Pristine Wilderness
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Feather className="w-3.5 h-3.5 text-[#c59f4e]" />
                  Relaxed Pacing
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Mountain className="w-3.5 h-3.5 text-[#4cbcd6]" />
                  Infinite Horizon
                </span>
              </motion.div>

              {/* 6. Subtle CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={onExploreClick}
                  icon={<Compass className="w-4 h-4 text-[#e0b759]" />}
                  className="tracking-[0.18em] uppercase text-xs sm:text-sm font-semibold py-3.5 px-7"
                >
                  EXPLORE THE WORLD
                </Button>
              </motion.div>
            </WorldBox>
          </motion.div>

          {/* ------------------------------------------------------------------- */}
          {/* RIGHT COLUMN (lg:col-span-7): Large Environmental Visual Composition */}
          {/* ------------------------------------------------------------------- */}
          <motion.div
            style={{
              y: isReducedMotion || isMobile ? 0 : visualTranslateY,
              x: visualPointerX,
            }}
            className="lg:col-span-7 relative w-full will-change-transform"
          >
            {/* Visual Frame Container with Hairline Stone Borders & Ambient Depth */}
            <div className="relative group overflow-hidden rounded-xs bg-[#0b0f0d] border border-[#242c29]/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              {/* Subtle Corner Brackets for Handcrafted Architectural Touch */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#c59f4e]/40 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#c59f4e]/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#c59f4e]/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#c59f4e]/40 z-20 pointer-events-none" />

              {/* Environmental Artwork Canvas */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(14px) brightness(0.6)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ scale: isReducedMotion ? 1 : imageScale }}
                className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden"
              >
                <img
                  src={PEACEFUL_IMAGE}
                  alt="Peaceful survival valley with rustic wooden cabin, mossy cobblestone path and clear stream"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] saturate-[1.1] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Atmospheric Warm Sunlight Bloom */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-[#0a1711]/70 via-transparent to-[#e6ce8a]/20 mix-blend-screen pointer-events-none"
                  aria-hidden="true"
                />

                {/* Vignette Edge Shading */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,9,8,0.75)_100%)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Bottom Shadow Transition to blend with page base */}
                <div
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070908] via-[#070908]/70 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </motion.div>

              {/* Quiet Micro Caption (Unboxed, low key) */}
              <div className="p-4 sm:p-5 bg-[#090d0b]/90 border-t border-[#1b2320] flex items-center justify-between text-xs text-[#798881]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#357256]" />
                  <span className="font-sans text-[11px] sm:text-xs text-[#b4c0ba]">
                    Untouched biomes & natural building sanctuaries
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#56635e] uppercase tracking-wider">
                  CHAPTER 01
                </span>
              </div>
            </div>

            {/* Backing Ambient Depth Glow (Moss & Earth) */}
            <div
              className="absolute -bottom-8 -right-8 w-72 h-72 bg-[#173426]/30 blur-3xl rounded-full pointer-events-none -z-10"
              aria-hidden="true"
            />
          </motion.div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION OUTRO VIGNETTE / TRANSITION PREVIEW                            */}
      {/* ========================================================================= */}
      <div className="relative mt-24 sm:mt-32 max-w-4xl mx-auto px-6 text-center">
        <div className="h-10 w-[1px] bg-gradient-to-b from-[#234b38] via-[#234b38]/50 to-transparent mx-auto mb-6" aria-hidden="true" />
        <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#56635e]">
          WINTRO SMP · COMING SOON
        </span>
      </div>
    </section>
  );
}
