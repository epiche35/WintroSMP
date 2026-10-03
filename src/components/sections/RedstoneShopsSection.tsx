/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Store, Gem, Zap, Sparkles, Box, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { WorldBox } from '../ui/WorldBox';

const MARKET_IMAGE = '/src/assets/images/redstone_shops_market_1790966773063.jpg';

interface RedstoneShopsSectionProps {
  onNextSection?: () => void;
}

export function RedstoneShopsSection({ onNextSection }: RedstoneShopsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeShopHighlight, setActiveShopHighlight] = useState(false);

  // Scroll tracking for parallax and reveal triggers
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Layered vertical parallax
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [60, -50]);
  const visualTranslateY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ambientMistY = useTransform(scrollYProgress, [0, 1], [25, -65]);

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
      id="shops"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#070908] text-[#f4ede1] overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-32 sm:pb-40"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS TRANSITION FROM HOMESTEAD INTO SPAWN MARKETPLACE              */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 inset-x-0 h-40 sm:h-56 pointer-events-none z-10 bg-gradient-to-b from-[#070908] via-[#0a0f0d]/85 to-transparent"
        aria-hidden="true"
      />

      {/* Atmospheric Amber Lantern & Warm Hearth Mist */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : ambientMistY }}
        className="absolute top-1/4 -left-1/4 w-[145%] h-[580px] pointer-events-none opacity-20 mix-blend-screen will-change-transform"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-radial from-[#e0b759]/25 via-[#234b38]/20 to-transparent blur-3xl" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. ASYMMETRIC COMPOSITION (Narrative Left, Market Visual Right)           */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ------------------------------------------------------------- */}
          {/* LEFT COLUMN (lg:col-span-5): Commerce Narrative & Typography  */}
          {/* ------------------------------------------------------------- */}
          <motion.div
            style={{ y: isReducedMotion || isMobile ? 0 : textTranslateY }}
            className="lg:col-span-5 flex flex-col items-start text-left z-20"
          >
            <WorldBox variant="market" className="w-full max-w-xl">
              {/* 1. Section Number Label (Unboxed text with redstone ember dot) */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-4 sm:mb-5"
              >
                <span className="w-6 h-[1px] bg-[#c59f4e]/70" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm tracking-[0.24em] text-[#c59f4e] uppercase font-medium flex items-center gap-2">
                  03 / REDSTONE SHOPS
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e05243] inline-block animate-pulse" />
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
                  REDSTONE SHOPS
                </motion.h2>
              </div>

              {/* 3. Commerce Subtitle: Build it. Stock it. Trade it. */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Cinzel'] text-sm sm:text-base lg:text-lg text-[#d9cfbf] tracking-[0.16em] uppercase font-semibold mb-5 sm:mb-6 leading-snug"
              >
                Build it. Stock it. Trade it.
              </motion.p>

              {/* 4. Supporting Descriptive Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm sm:text-base text-[#9fb0a8] font-normal leading-relaxed mb-5 sm:mb-6 max-w-lg"
              >
                Create your own shop around spawn and sell useful redstone items to other players. Build your shop your way and become part of the server's player-driven marketplace.
              </motion.p>

              {/* 5. Secondary Line: Diamonds are the main currency */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xs bg-[#0b1619]/60 border border-[#166073]/40 text-xs text-[#d8f5fc] mb-6"
              >
                <Gem className="w-3.5 h-3.5 text-[#42c8e8] shrink-0" />
                <span className="font-['Cinzel'] tracking-wider text-[11px] sm:text-xs uppercase font-semibold">
                  Diamonds are the main currency.
                </span>
              </motion.div>

              {/* 6. Marketplace Pillars (Unboxed metadata) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans text-[#798881] mb-8 pb-6 border-b border-[#242c29]/60 w-full"
              >
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Store className="w-3.5 h-3.5 text-[#c59f4e]" />
                  Spawn District Stalls
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Zap className="w-3.5 h-3.5 text-[#e05243]" />
                  Automated Redstone
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Box className="w-3.5 h-3.5 text-[#357256]" />
                  Player-Stocked Chests
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
                  icon={<Store className="w-4 h-4 text-[#e0b759]" />}
                  className="tracking-[0.18em] uppercase text-xs sm:text-sm font-semibold py-3.5 px-7"
                >
                  EXPLORE MARKETPLACE
                </Button>
              </motion.div>
            </WorldBox>
          </motion.div>

          {/* ------------------------------------------------------------------- */}
          {/* RIGHT COLUMN (lg:col-span-7): Large Marketplace Visual Composition */}
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
              onMouseEnter={() => setActiveShopHighlight(true)}
              onMouseLeave={() => setActiveShopHighlight(false)}
              className="relative group overflow-hidden rounded-xs bg-[#0b0f0d] border border-[#242c29]/90 shadow-[0_24px_55px_rgba(0,0,0,0.75)] cursor-pointer"
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
                  src={MARKET_IMAGE}
                  alt="Player-built wooden redstone shop stall in cozy spawn marketplace square with glowing lanterns and chests"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.06] saturate-[1.12] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Subtle Amber Lantern Glow & Firelight Bloom */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-[#1f1711]/70 via-transparent to-[#e6ce8a]/18 mix-blend-screen pointer-events-none"
                  style={{ animation: 'lanternFlicker 6s ease-in-out infinite' }}
                  aria-hidden="true"
                />

                {/* Soft Redstone Ember Accent Glow (Restrained) */}
                <div
                  className="absolute bottom-[24%] right-[32%] w-32 h-32 bg-[#e05243]/15 rounded-full blur-2xl pointer-events-none mix-blend-screen"
                  style={{ animation: 'redstonePulse 4s ease-in-out infinite' }}
                  aria-hidden="true"
                />

                {/* Vignette Edge Shading */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(7,9,8,0.72)_100%)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Interactive Subtle Trade Focus Pill Overlay on Hover */}
                <div
                  className={`absolute top-4 left-4 transition-all duration-300 pointer-events-none px-3 py-1.5 rounded-xs bg-[#090d0b]/85 border ${
                    activeShopHighlight ? 'border-[#e0b759]/60 text-[#f4ede1]' : 'border-[#242c29]/60 text-[#9fb0a8]'
                  } flex items-center gap-2 text-[11px] font-mono`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59f4e] animate-pulse" />
                  <span>SPAWN COMMERCE DISTRICT</span>
                </div>

                {/* Bottom Shadow Transition */}
                <div
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070908] via-[#070908]/75 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </motion.div>

              {/* Caption & Tactile Focus Strip */}
              <div className="p-4 sm:p-5 bg-[#090d0b]/90 border-t border-[#1b2320] flex items-center justify-between text-xs text-[#798881]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e05243]" />
                  <span className="font-sans text-[11px] sm:text-xs text-[#b4c0ba]">
                    Self-replenishing hopper systems & trade stalls
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#56635e] uppercase tracking-wider">
                  CHAPTER 03
                </span>
              </div>
            </div>

            {/* Ambient Background Warm Glow */}
            <div
              className="absolute -bottom-8 -right-8 w-72 h-72 bg-[#5a4533]/25 blur-3xl rounded-full pointer-events-none -z-10"
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
