/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Shield, Sparkles, Home, Fence, Eye, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { WorldBox } from '../ui/WorldBox';

const CLAIM_IMAGE = '/src/assets/images/land_claiming_homestead_1790966647174.jpg';

interface LandClaimingSectionProps {
  onNextSection?: () => void;
}

export function LandClaimingSection({ onNextSection }: LandClaimingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [boundaryHighlighted, setBoundaryHighlighted] = useState(false);

  // Scroll tracking for parallax and reveal triggers
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Layered vertical parallax
  const visualTranslateY = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [65, -55]);
  const ambientMistY = useTransform(scrollYProgress, [0, 1], [30, -60]);

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
      id="claiming"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#070908] text-[#f4ede1] overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-32 sm:pb-40"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS TRANSITION FROM PEACEFUL SURVIVAL                             */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 inset-x-0 h-40 sm:h-56 pointer-events-none z-10 bg-gradient-to-b from-[#070908] via-[#09100d]/80 to-transparent"
        aria-hidden="true"
      />

      {/* Atmospheric Warm Amber & Forest Mist Layer */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : ambientMistY }}
        className="absolute top-1/3 -right-1/4 w-[140%] h-[550px] pointer-events-none opacity-20 mix-blend-screen will-change-transform"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-radial from-[#4a382a]/30 via-[#173426]/20 to-transparent blur-3xl" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. ASYMMETRIC COMPOSITION (Visual Left, Editorial Right)                   */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ------------------------------------------------------------------- */}
          {/* LEFT COLUMN (lg:col-span-7): Environmental Visual with Protected Boundary */}
          {/* ------------------------------------------------------------------- */}
          <motion.div
            style={{
              y: isReducedMotion || isMobile ? 0 : visualTranslateY,
              x: visualPointerX,
            }}
            className="lg:col-span-7 relative w-full order-2 lg:order-1 will-change-transform"
          >
            {/* Architectural Frame with Hairline Stone Borders */}
            <div className="relative group overflow-hidden rounded-xs bg-[#0b0f0d] border border-[#242c29]/90 shadow-[0_24px_55px_rgba(0,0,0,0.75)]">
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
                  src={CLAIM_IMAGE}
                  alt="Player claimed craftsman homestead with wooden fence perimeter, stone path and wheat garden"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.06] saturate-[1.1] transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />

                {/* Subtle Protected Boundary Inset Frame Overlay (Toggled or Ambient) */}
                <div
                  className={`absolute inset-4 sm:inset-6 transition-all duration-700 pointer-events-none border ${
                    boundaryHighlighted
                      ? 'border-[#c59f4e]/70 shadow-[inset_0_0_30px_rgba(197,159,78,0.18)] bg-[#c59f4e]/5'
                      : 'border-[#c59f4e]/20 hover:border-[#c59f4e]/40 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  {/* Subtle Boundary Indicator Label */}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-[#090d0b]/80 border border-[#242c29]/60 flex items-center gap-1.5 text-[10px] font-mono text-[#d9cfbf]">
                    <span className={`w-1.5 h-1.5 rounded-full ${boundaryHighlighted ? 'bg-[#c59f4e] animate-pulse' : 'bg-[#357256]'}`} />
                    <span>{boundaryHighlighted ? 'PERIMETER HIGHLIGHTED' : 'SANCTUARY CLAIM'}</span>
                  </div>
                </div>

                {/* Warm Hearth Sunbeam Lighting */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-[#1f1711]/70 via-transparent to-[#e6ce8a]/15 mix-blend-screen pointer-events-none"
                  aria-hidden="true"
                />

                {/* Vignette Edge Shading */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,9,8,0.7)_100%)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Bottom Shadow Transition */}
                <div
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070908] via-[#070908]/75 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </motion.div>

              {/* Caption & Interactive Boundary Reveal Bar */}
              <div className="p-4 sm:p-5 bg-[#090d0b]/90 border-t border-[#1b2320] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#798881]">
                <div className="flex items-center gap-2">
                  <Fence className="w-4 h-4 text-[#c59f4e]" />
                  <span className="font-sans text-[11px] sm:text-xs text-[#b4c0ba]">
                    Self-defined homestead borders · Build fearlessly
                  </span>
                </div>

                {/* Boundary Highlight Toggle */}
                <button
                  type="button"
                  onClick={() => setBoundaryHighlighted(!boundaryHighlighted)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#c59f4e] hover:text-[#f4ede1] transition-colors cursor-pointer select-none"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{boundaryHighlighted ? 'Dim Boundary' : 'Inspect Boundary'}</span>
                </button>
              </div>
            </div>

            {/* Earth & Timber Ambient Depth Glow */}
            <div
              className="absolute -bottom-8 -left-8 w-72 h-72 bg-[#36281e]/35 blur-3xl rounded-full pointer-events-none -z-10"
              aria-hidden="true"
            />
          </motion.div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT COLUMN (lg:col-span-5): Narrative & Territorial Typography */}
          {/* ------------------------------------------------------------- */}
          <motion.div
            style={{ y: isReducedMotion || isMobile ? 0 : textTranslateY }}
            className="lg:col-span-5 flex flex-col items-start text-left z-20 order-1 lg:order-2"
          >
            <WorldBox variant="territory" className="w-full max-w-xl">
              {/* 1. Section Number Label (Unboxed text) */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-4 sm:mb-5"
              >
                <span className="w-6 h-[1px] bg-[#c59f4e]/70" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm tracking-[0.24em] text-[#c59f4e] uppercase font-medium">
                  02 / LAND CLAIMING
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
                  LAND CLAIMING
                </motion.h2>
              </div>

              {/* 3. Territorial Subtitle: Build your place. Protect what you create. */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Cinzel'] text-sm sm:text-base lg:text-lg text-[#d9cfbf] tracking-[0.16em] uppercase font-semibold mb-5 sm:mb-6 leading-snug"
              >
                Build your place. Protect what you create.
              </motion.p>

              {/* 4. Supporting Descriptive Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm sm:text-base text-[#9fb0a8] font-normal leading-relaxed mb-6 sm:mb-7 max-w-lg"
              >
                Choose a place in the world, build your home, and create a space that feels like yours. Land claiming helps players protect the places they create while they enjoy the survival experience.
              </motion.p>

              {/* 5. Territorial Essence Markers (Clean unboxed metadata) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans text-[#798881] mb-8 pb-6 border-b border-[#242c29]/60 w-full"
              >
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Home className="w-3.5 h-3.5 text-[#c59f4e]" />
                  Architectural Autonomy
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Shield className="w-3.5 h-3.5 text-[#357256]" />
                  Permanent Protection
                </span>
                <span className="text-[#3e4a44]" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-[#b4c0ba]">
                  <Fence className="w-3.5 h-3.5 text-[#4cbcd6]" />
                  Intuitive Boundaries
                </span>
              </motion.div>

              {/* 6. Subtle Action Control */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button
                  variant="stone"
                  size="lg"
                  showArrow
                  onClick={onNextSection}
                  icon={<Shield className="w-4 h-4 text-[#c59f4e]" />}
                  className="tracking-[0.18em] uppercase text-xs sm:text-sm font-semibold py-3.5 px-7 hover:border-[#c59f4e]/40"
                >
                  EXPLORE SANCTUARIES
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
        <div className="h-10 w-[1px] bg-gradient-to-b from-[#36281e] via-[#36281e]/50 to-transparent mx-auto mb-6" aria-hidden="true" />
        <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#56635e]">
          WINTRO SMP · COMING SOON
        </span>
      </div>
    </section>
  );
}
