/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Swords, Flame, Trophy, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { WorldBox } from '../ui/WorldBox';

const ARENA_IMAGE = '/src/assets/images/pvp_arena_ruins_1790967062751.jpg';

interface PvPArenaSectionProps {
  onNextSection?: () => void;
}

export function PvPArenaSection({ onNextSection }: PvPArenaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll tracking for parallax and reveal triggers
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Layered vertical parallax
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [60, -50]);
  const visualTranslateY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const sunsetMistY = useTransform(scrollYProgress, [0, 1], [20, -70]);

  // Pointer interaction physics
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
      id="arena"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#070908] text-[#f4ede1] overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-32 sm:pb-40"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS TRANSITION FROM CAVERN TO OPEN MOUNTAIN SUNSET SKY            */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 inset-x-0 h-40 sm:h-56 pointer-events-none z-10 bg-gradient-to-b from-[#070908] via-[#0b0e0c]/85 to-transparent"
        aria-hidden="true"
      />

      {/* Warm Sunset Amber & Stone Hearth Horizon Glow */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : sunsetMistY }}
        className="absolute top-1/4 -left-1/4 w-[145%] h-[580px] pointer-events-none opacity-20 mix-blend-screen will-change-transform"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-radial from-[#d47a32]/25 via-[#4a382a]/20 to-transparent blur-3xl" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. DRAMATIC ASYMMETRIC COMPOSITION (Narrative Left, Arena Right)          */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ------------------------------------------------------------- */}
          {/* LEFT COLUMN (lg:col-span-5): Arena Narrative & Combat Ethos   */}
          {/* ------------------------------------------------------------- */}
          <motion.div
            style={{ y: isReducedMotion || isMobile ? 0 : textTranslateY }}
            className="lg:col-span-5 flex flex-col items-start text-left z-20"
          >
            <WorldBox variant="arena" className="w-full max-w-xl">
              {/* 1. Section Number Label (Unboxed text with warm ember dot) */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-4 sm:mb-5"
              >
                <span className="w-6 h-[1px] bg-[#c59f4e]/70" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm tracking-[0.24em] text-[#c59f4e] uppercase font-medium flex items-center gap-2">
                  05 / PVP ARENA
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d47a32] inline-block animate-pulse" />
                </span>
              </motion.div>

              {/* 2. Main Heading with Mask Reveal & Strong Visual Presence */}
              <div className="overflow-hidden mb-3 sm:mb-4">
                <motion.h2
                  initial={{ y: '115%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-[#f4ede1] uppercase leading-[1.08] [text-wrap:balance]"
                >
                  PVP ARENA
                </motion.h2>
              </div>

              {/* 3. Combat Subtitle: Step into the arena. */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Cinzel'] text-sm sm:text-base lg:text-lg text-[#d9cfbf] tracking-[0.16em] uppercase font-semibold mb-5 sm:mb-6 leading-snug"
              >
                Step into the arena.
              </motion.p>

              {/* 4. Supporting Descriptive Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm sm:text-base text-[#9fb0a8] font-normal leading-relaxed mb-5 sm:mb-6 max-w-lg"
              >
                When you're ready for a little competition, step into the PvP Arena and test your skills in a dedicated space built for battles.
              </motion.p>

              {/* 5. Protected Sanctuary Note (Clean unboxed banner) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xs bg-[#191512]/60 border border-[#4a382a]/50 text-xs text-[#d9cfbf] mb-6"
              >
                <Flame className="w-3.5 h-3.5 text-[#d47a32] shrink-0" />
                <span className="font-['Cinzel'] tracking-wider text-[11px] sm:text-xs uppercase font-semibold">
                  Voluntary opt-in combat · Zero survival grief
                </span>
              </motion.div>

              {/* 6. Arena Pillars (Unboxed metadata) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans text-[#798881] mb-8 pb-6 border-b border-[#242c29]/60 w-full"
              >
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Swords className="w-3.5 h-3.5 text-[#d47a32]" />
                  Dedicated Battleground
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Trophy className="w-3.5 h-3.5 text-[#c59f4e]" />
                  Friendly Duels
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#357256]" />
                  Safe Wilderness
                </span>
              </motion.div>

              {/* 7. Subtle CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={onNextSection}
                  icon={<Swords className="w-4 h-4 text-[#e0b759]" />}
                  className="tracking-[0.18em] uppercase text-xs sm:text-sm font-semibold py-3.5 px-7 hover:shadow-[0_0_24px_rgba(212,122,50,0.35)]"
                >
                  ENTER THE ARENA
                </Button>
              </motion.div>
            </WorldBox>
          </motion.div>

          {/* ------------------------------------------------------------------- */}
          {/* RIGHT COLUMN (lg:col-span-7): Large Arena Colosseum Visual          */}
          {/* ------------------------------------------------------------------- */}
          <motion.div
            style={{
              y: isReducedMotion || isMobile ? 0 : visualTranslateY,
              x: visualPointerX,
            }}
            className="lg:col-span-7 relative w-full will-change-transform"
          >
            {/* Architectural Frame Container with Hairline Stone Borders */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative group overflow-hidden rounded-xs bg-[#0b0f0d] border border-[#242c29]/90 shadow-[0_24px_55px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              {/* Corner Boundary Stone Markers */}
              <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-[#d47a32]/50 z-20 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-[#d47a32]/50 z-20 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-[#d47a32]/50 z-20 pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-[#d47a32]/50 z-20 pointer-events-none" />

              {/* Environmental Artwork Canvas */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px) brightness(0.65)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden"
              >
                <img
                  src={ARENA_IMAGE}
                  alt="Ancient stone colosseum arena ruins nestled in mountain pine forest at sunset with torchlight"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] saturate-[1.12] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Torch / Firelight Flicker Lighting Bloom */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-[#1f1510]/70 via-transparent to-[#d47a32]/18 mix-blend-screen pointer-events-none"
                  style={{ animation: 'lanternFlicker 5s ease-in-out infinite' }}
                  aria-hidden="true"
                />

                {/* Subtle Dust & Ember Motes Glow */}
                <div
                  className="absolute bottom-[28%] left-[46%] w-36 h-36 bg-[#e0b759]/15 rounded-full blur-2xl pointer-events-none mix-blend-screen"
                  aria-hidden="true"
                />

                {/* Vignette Edge Shading */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,9,8,0.72)_100%)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Status Indicator Label */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xs bg-[#090d0b]/85 border border-[#242c29]/70 flex items-center gap-2 text-[11px] font-mono text-[#d9cfbf]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d47a32] animate-pulse" />
                  <span>DEDICATED COLOSSEUM</span>
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d47a32]" />
                  <span className="font-sans text-[11px] sm:text-xs text-[#b4c0ba]">
                    Ancient amphitheater ruins · Test your battle tactics
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#56635e] uppercase tracking-wider">
                  CHAPTER 05
                </span>
              </div>
            </div>

            {/* Ambient Hearth Ember Background Glow */}
            <div
              className="absolute -bottom-8 -right-8 w-72 h-72 bg-[#4a382a]/30 blur-3xl rounded-full pointer-events-none -z-10"
              aria-hidden="true"
            />
          </motion.div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION OUTRO VIGNETTE / TRANSITION PREVIEW                            */}
      {/* ========================================================================= */}
      <div className="relative mt-24 sm:mt-32 max-w-4xl mx-auto px-6 text-center">
        <div className="h-10 w-[1px] bg-gradient-to-b from-[#4a382a] via-[#4a382a]/50 to-transparent mx-auto mb-6" aria-hidden="true" />
        <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#56635e]">
          WINTRO SMP · COMING SOON
        </span>
      </div>
    </section>
  );
}
