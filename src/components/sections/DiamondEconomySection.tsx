/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Gem, Pickaxe, ArrowRightLeft, Hammer, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { WorldBox } from '../ui/WorldBox';

const CAVERN_IMAGE = '/src/assets/images/diamond_economy_cavern_1790966917312.jpg';

interface DiamondEconomySectionProps {
  onNextSection?: () => void;
}

export function DiamondEconomySection({ onNextSection }: DiamondEconomySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll tracking for parallax and reveal triggers
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Three-layer vertical parallax
  const visualTranslateY = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [65, -55]);
  const cavernMistY = useTransform(scrollYProgress, [0, 1], [20, -70]);

  // Pointer interaction physics for subtle crystalline glint and perspective
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 50 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const visualPointerX = useTransform(smoothMouseX, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-8, 8]);
  const visualPointerY = useTransform(smoothMouseY, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-6, 6]);
  const crystalGlintX = useTransform(smoothMouseX, [-1, 1], [20, 80]);
  const crystalGlintY = useTransform(smoothMouseY, [-1, 1], [30, 70]);

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
      id="economy"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#070908] text-[#f4ede1] overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-32 sm:pb-40"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS TRANSITION FROM MARKETPLACE INTO DEEP CAVERN                  */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 inset-x-0 h-40 sm:h-56 pointer-events-none z-10 bg-gradient-to-b from-[#070908] via-[#080d0b]/85 to-transparent"
        aria-hidden="true"
      />

      {/* Deep Subterranean Cyan & Charcoal Mist Layer */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : cavernMistY }}
        className="absolute top-1/4 -right-1/4 w-[140%] h-[560px] pointer-events-none opacity-20 mix-blend-screen will-change-transform"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-radial from-[#166073]/30 via-[#0a1711]/20 to-transparent blur-3xl" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. ASYMMETRIC COMPOSITION (Cavern Left, Economy Narrative Right)          */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ------------------------------------------------------------------- */}
          {/* LEFT COLUMN (lg:col-span-7): Mineral Cavern Visual Composition       */}
          {/* ------------------------------------------------------------------- */}
          <motion.div
            style={{
              y: isReducedMotion || isMobile ? 0 : visualTranslateY,
              x: visualPointerX,
            }}
            className="lg:col-span-7 relative w-full order-2 lg:order-1 will-change-transform"
          >
            {/* Architectural Stone Frame Container */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative group overflow-hidden rounded-xs bg-[#090c0a] border border-[#242c29]/90 shadow-[0_24px_55px_rgba(0,0,0,0.85)] cursor-pointer"
            >
              {/* Corner Boundary Stone Markers */}
              <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-[#4cbcd6]/40 z-20 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-[#4cbcd6]/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-[#4cbcd6]/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-[#4cbcd6]/40 z-20 pointer-events-none" />

              {/* Environmental Artwork Canvas */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px) brightness(0.65)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden"
              >
                <img
                  src={CAVERN_IMAGE}
                  alt="Deep Minecraft stone cavern with glowing raw diamond ore veins and wooden mineshaft supports"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.08] saturate-[1.1] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Subtle Cyan Crystal Glint on Pointer Hover */}
                <motion.div
                  className="absolute w-48 h-48 rounded-full pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-2xl"
                  style={{
                    left: `${isReducedMotion ? 50 : crystalGlintX}%`,
                    top: `${isReducedMotion ? 50 : crystalGlintY}%`,
                    background: 'radial-gradient(circle, rgba(76, 188, 214, 0.45) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* Warm Mineshaft Lantern Bloom in upper corner */}
                <div
                  className="absolute top-[18%] left-[28%] w-36 h-36 bg-[#e6ce8a]/18 blur-3xl rounded-full pointer-events-none mix-blend-screen"
                  aria-hidden="true"
                />

                {/* Vignette Edge Shading */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(7,9,8,0.75)_100%)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Status Indicator Label */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xs bg-[#090d0b]/85 border border-[#242c29]/70 flex items-center gap-2 text-[11px] font-mono text-[#d8f5fc]">
                  <Gem className="w-3.5 h-3.5 text-[#42c8e8]" />
                  <span>NATURAL MINERAL RESERVE</span>
                </div>

                {/* Bottom Shadow Transition */}
                <div
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070908] via-[#070908]/75 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </motion.div>

              {/* Caption Strip */}
              <div className="p-4 sm:p-5 bg-[#090d0b]/90 border-t border-[#1b2320] flex items-center justify-between text-xs text-[#798881]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cbcd6]" />
                  <span className="font-sans text-[11px] sm:text-xs text-[#b4c0ba]">
                    Hard-earned mining standard · Zero inflation
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#56635e] uppercase tracking-wider">
                  CHAPTER 04
                </span>
              </div>
            </div>

            {/* Ambient Background Diamond Glow */}
            <div
              className="absolute -bottom-8 -left-8 w-72 h-72 bg-[#166073]/25 blur-3xl rounded-full pointer-events-none -z-10"
              aria-hidden="true"
            />
          </motion.div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT COLUMN (lg:col-span-5): Narrative & Value Typography     */}
          {/* ------------------------------------------------------------- */}
          <motion.div
            style={{ y: isReducedMotion || isMobile ? 0 : textTranslateY }}
            className="lg:col-span-5 flex flex-col items-start text-left z-20 order-1 lg:order-2"
          >
            <WorldBox variant="diamond" className="w-full max-w-xl">
              {/* 1. Section Number Label (Unboxed text with subtle diamond accent) */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-4 sm:mb-5"
              >
                <span className="w-6 h-[1px] bg-[#c59f4e]/70" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm tracking-[0.24em] text-[#c59f4e] uppercase font-medium flex items-center gap-2">
                  04 / DIAMOND ECONOMY
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cbcd6] inline-block animate-pulse" />
                </span>
              </motion.div>

              {/* 2. Main Heading with Mask Reveal */}
              <div className="overflow-hidden mb-3 sm:mb-4">
                <motion.h2
                  initial={{ y: '105%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-[#f4ede1] uppercase leading-[1.08] [text-wrap:balance]"
                >
                  DIAMOND ECONOMY
                </motion.h2>
              </div>

              {/* 3. Value Subtitle: Every diamond has a story. */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Cinzel'] text-sm sm:text-base lg:text-lg text-[#d9cfbf] tracking-[0.16em] uppercase font-semibold mb-5 sm:mb-6 leading-snug"
              >
                Every diamond has a story.
              </motion.p>

              {/* 4. Supporting Descriptive Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm sm:text-base text-[#9fb0a8] font-normal leading-relaxed mb-6 sm:mb-7 max-w-lg"
              >
                Diamonds are the main currency of WINTRO SMP. Mine them, trade them, and use them as part of the player-driven world.
              </motion.p>

              {/* 5. Secondary Line: Mine. Trade. Build. */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-6 text-[#d8f5fc]"
              >
                <span className="font-['Cinzel'] tracking-[0.24em] text-xs sm:text-sm uppercase font-semibold text-[#42c8e8]">
                  Mine. Trade. Build.
                </span>
                <span className="h-[1px] w-12 bg-gradient-to-r from-[#4cbcd6]/60 to-transparent" aria-hidden="true" />
              </motion.div>

              {/* 6. Economy Pillars (Unboxed metadata) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans text-[#798881] mb-8 pb-6 border-b border-[#242c29]/60 w-full"
              >
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Pickaxe className="w-3.5 h-3.5 text-[#4cbcd6]" />
                  Mined Tangibility
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <ArrowRightLeft className="w-3.5 h-3.5 text-[#c59f4e]" />
                  Player Barter
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Hammer className="w-3.5 h-3.5 text-[#357256]" />
                  World Utility
                </span>
              </motion.div>

              {/* 7. Subtle Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button
                  variant="diamond"
                  size="lg"
                  showArrow
                  onClick={onNextSection}
                  icon={<Gem className="w-4 h-4 text-[#6fe0fa]" />}
                  className="tracking-[0.18em] uppercase text-xs sm:text-sm font-semibold py-3.5 px-7"
                >
                  EXPLORE ECONOMY
                </Button>
              </motion.div>
            </WorldBox>
          </motion.div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION OUTRO VIGNETTE / TRANSITION PREVIEW                            */}
      {/* ========================================================================= */}
      <div className="relative mt-24 sm:mt-32 max-w-4xl mx-auto px-6 text-center">
        <div className="h-10 w-[1px] bg-gradient-to-b from-[#166073] via-[#166073]/50 to-transparent mx-auto mb-6" aria-hidden="true" />
        <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#56635e]">
          WINTRO SMP · COMING SOON
        </span>
      </div>
    </section>
  );
}
