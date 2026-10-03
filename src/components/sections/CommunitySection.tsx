/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Users, Tent, Sparkles, MessageSquare, Compass, HeartHandshake, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { WorldBox } from '../ui/WorldBox';
import { SERVER_CONFIG } from '../../config/server.config';

const COMMUNITY_IMAGE = '/src/assets/images/community_village_square_1790967199145.jpg';

interface CommunitySectionProps {
  onNextSection?: () => void;
}

export function CommunitySection({ onNextSection }: CommunitySectionProps) {
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
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [65, -55]);
  const visualTranslateY = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const twilightMistY = useTransform(scrollYProgress, [0, 1], [20, -70]);

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
      id="community"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#070908] text-[#f4ede1] overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-32 sm:pb-40"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS TRANSITION FROM ARENA TO COZY TWILIGHT SETTLEMENT             */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 inset-x-0 h-40 sm:h-56 pointer-events-none z-10 bg-gradient-to-b from-[#070908] via-[#090e0c]/85 to-transparent"
        aria-hidden="true"
      />

      {/* Atmospheric Twilight Forest & Campfire Mist */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : twilightMistY }}
        className="absolute top-1/4 -right-1/4 w-[140%] h-[580px] pointer-events-none opacity-20 mix-blend-screen will-change-transform"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-radial from-[#e0b759]/20 via-[#1f3b2e]/25 to-transparent blur-3xl" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. ASYMMETRIC COMPOSITION (Village Left, Narrative Right)                 */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ------------------------------------------------------------------- */}
          {/* LEFT COLUMN (lg:col-span-7): Community Village Square Visual         */}
          {/* ------------------------------------------------------------------- */}
          <motion.div
            style={{
              y: isReducedMotion || isMobile ? 0 : visualTranslateY,
              x: visualPointerX,
            }}
            className="lg:col-span-7 relative w-full order-2 lg:order-1 will-change-transform"
          >
            {/* Architectural Frame Container with Hairline Stone Borders */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative group overflow-hidden rounded-xs bg-[#090c0a] border border-[#242c29]/90 shadow-[0_24px_55px_rgba(0,0,0,0.85)] cursor-pointer"
            >
              {/* Corner Boundary Stone Markers */}
              <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-[#c59f4e]/50 z-20 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-[#c59f4e]/50 z-20 pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-[#c59f4e]/50 z-20 pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-[#c59f4e]/50 z-20 pointer-events-none" />

              {/* Environmental Artwork Canvas */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px) brightness(0.65)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden"
              >
                <img
                  src={COMMUNITY_IMAGE}
                  alt="Thriving player-built Minecraft village settlement square with campfire plaza, timber cottages, lanterns, and gardens"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.06] saturate-[1.12] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Warm Hearth Campfire & Chimney Lighting Bloom */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-[#1f1711]/70 via-transparent to-[#e6ce8a]/18 mix-blend-screen pointer-events-none"
                  style={{ animation: 'lanternFlicker 6s ease-in-out infinite' }}
                  aria-hidden="true"
                />

                {/* Central Gathering Plaza Ember Bloom */}
                <div
                  className="absolute bottom-[24%] left-[45%] w-40 h-40 bg-[#d47a32]/15 rounded-full blur-3xl pointer-events-none mix-blend-screen"
                  aria-hidden="true"
                />

                {/* Vignette Edge Shading */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,9,8,0.72)_100%)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Status Indicator Label */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xs bg-[#090d0b]/85 border border-[#242c29]/70 flex items-center gap-2 text-[11px] font-mono text-[#d9cfbf]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#357256] animate-pulse" />
                  <span>SHARED WORLD SANCTUARY</span>
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59f4e]" />
                  <span className="font-sans text-[11px] sm:text-xs text-[#b4c0ba]">
                    Cooperative towns & organic player architecture
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#56635e] uppercase tracking-wider">
                  CHAPTER 06
                </span>
              </div>
            </div>

            {/* Ambient Hearth Background Glow */}
            <div
              className="absolute -bottom-8 -left-8 w-72 h-72 bg-[#2e624b]/25 blur-3xl rounded-full pointer-events-none -z-10"
              aria-hidden="true"
            />
          </motion.div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT COLUMN (lg:col-span-5): Narrative & Community Ethos     */}
          {/* ------------------------------------------------------------- */}
          <motion.div
            style={{ y: isReducedMotion || isMobile ? 0 : textTranslateY }}
            className="lg:col-span-5 flex flex-col items-start text-left z-20 order-1 lg:order-2"
          >
            <WorldBox variant="hearth" className="w-full max-w-xl">
              {/* 1. Section Number Label (Unboxed text with warm gold dot) */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-4 sm:mb-5"
              >
                <span className="w-6 h-[1px] bg-[#c59f4e]/70" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm tracking-[0.24em] text-[#c59f4e] uppercase font-medium flex items-center gap-2">
                  06 / COMMUNITY
                  <span className="w-1.5 h-1.5 rounded-full bg-[#357256] inline-block animate-pulse" />
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
                  COMMUNITY
                </motion.h2>
              </div>

              {/* 3. Community Subtitle: Build something worth coming back to. */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Cinzel'] text-sm sm:text-base lg:text-lg text-[#d9cfbf] tracking-[0.16em] uppercase font-semibold mb-5 sm:mb-6 leading-snug"
              >
                Build something worth coming back to.
              </motion.p>

              {/* 4. Supporting Descriptive Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm sm:text-base text-[#9fb0a8] font-normal leading-relaxed mb-6 sm:mb-7 max-w-lg"
              >
                Play alongside other builders, traders, explorers, and fighters. WINTRO SMP is designed around a shared world where players can create, trade, explore, and make their own stories.
              </motion.p>

              {/* 5. Atmospheric Line: BUILD. TRADE. EXPLORE. TOGETHER. */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-6 text-[#d9cfbf]"
              >
                <span className="font-['Cinzel'] tracking-[0.22em] text-xs sm:text-sm uppercase font-semibold text-[#e0b759]">
                  BUILD. TRADE. EXPLORE. TOGETHER.
                </span>
                <span className="h-[1px] w-12 bg-gradient-to-r from-[#c59f4e]/60 to-transparent" aria-hidden="true" />
              </motion.div>

              {/* 6. Community Pillars (Unboxed metadata) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans text-[#798881] mb-8 pb-6 border-b border-[#242c29]/60 w-full"
              >
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Users className="w-3.5 h-3.5 text-[#c59f4e]" />
                  Shared Living World
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Tent className="w-3.5 h-3.5 text-[#357256]" />
                  Player-Built Towns
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#4cbcd6]" />
                  Long-Term Sanctuary
                </span>
              </motion.div>

              {/* 7. Action Controls */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
              >
                {/* Primary Community Action Button: Discord with Framer Motion icon move & bg shift */}
                <motion.a
                  href={SERVER_CONFIG.socials.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={isReducedMotion ? undefined : 'hover'}
                  whileTap={isReducedMotion ? undefined : { scale: 0.98 }}
                  initial="rest"
                  animate="rest"
                  variants={{
                    rest: {
                      backgroundColor: 'rgba(25, 50, 38, 0.92)',
                      borderColor: 'rgba(78, 130, 103, 0.6)',
                      y: 0,
                      scale: 1,
                    },
                    hover: {
                      backgroundColor: 'rgba(38, 76, 58, 1)',
                      borderColor: 'rgba(224, 183, 89, 0.85)',
                      y: -2.5,
                      scale: 1.018,
                      boxShadow: '0 8px 30px rgba(35, 75, 56, 0.5), inset 0 1px 0 rgba(224, 183, 89, 0.3)',
                      transition: { type: 'spring', stiffness: 400, damping: 25 },
                    },
                  }}
                  className="group relative inline-flex items-center justify-center gap-2.5 font-['Cinzel'] font-semibold uppercase whitespace-nowrap rounded-[5px] border px-6 py-3 text-xs tracking-[0.16em] text-[#fbf7ee] shadow-[0_4px_20px_rgba(0,0,0,0.6)] select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59f4e] cursor-pointer"
                >
                  {/* Subtle Inner Glow Sheen */}
                  <span
                    className="absolute inset-0 rounded-[4px] bg-gradient-to-t from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Gentle icon move using Framer Motion */}
                  <motion.span
                    variants={{
                      rest: { x: 0, y: 0, rotate: 0, scale: 1 },
                      hover: {
                        x: 2,
                        y: -1.5,
                        rotate: [0, -5, 5, 0],
                        scale: 1.15,
                        transition: { type: 'spring', stiffness: 350, damping: 20 },
                      },
                    }}
                    className="shrink-0 text-[#e0b759] relative z-10"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </motion.span>

                  <span className="truncate relative z-10">JOIN THE DISCORD</span>

                  {/* Trailing Directional Arrow with gentle spring motion */}
                  <motion.span
                    variants={{
                      rest: { x: 0 },
                      hover: { x: 4, transition: { type: 'spring', stiffness: 400, damping: 22 } },
                    }}
                    className="shrink-0 inline-block text-[#c59f4e] relative z-10"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.span>
                </motion.a>
              </motion.div>
            </WorldBox>
          </motion.div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION OUTRO VIGNETTE / TRANSITION PREVIEW                            */}
      {/* ========================================================================= */}
      <div className="relative mt-24 sm:mt-32 max-w-4xl mx-auto px-6 text-center">
        <div className="h-10 w-[1px] bg-gradient-to-b from-[#2e624b] via-[#2e624b]/50 to-transparent mx-auto mb-6" aria-hidden="true" />
        <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#56635e]">
          WINTRO SMP · COMING SOON
        </span>
      </div>
    </section>
  );
}
