/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

// Layered image assets generated specifically for WINTRO SMP
const BACKGROUND_IMAGE = '/src/assets/images/hero_mountain_sky_1790965999291.jpg';
const MIDGROUND_IMAGE = '/src/assets/images/hero_forest_valley_1790966013649.jpg';

interface HeroAtmosphereProps {
  scrollYProgress?: any;
}

export function HeroAtmosphere({ scrollYProgress }: HeroAtmosphereProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse normalized coords (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for organic, non-mechanical pointer response
  const springConfig = { damping: 28, stiffness: 60, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    const handlePointerMove = (e: MouseEvent) => {
      if (motionQuery.matches || window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [mouseX, mouseY]);

  // Mouse parallax displacements (Strictly restrained to prevent vertigo)
  // Background: ~4-6px
  const bgX = useTransform(smoothMouseX, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-5, 5]);
  const bgY = useTransform(smoothMouseY, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-4, 4]);

  // Midground: ~10-12px
  const midX = useTransform(smoothMouseX, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-12, 12]);
  const midY = useTransform(smoothMouseY, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-9, 9]);

  // Foreground: ~18-22px
  const fgX = useTransform(smoothMouseX, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-22, 22]);
  const fgY = useTransform(smoothMouseY, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-14, 14]);

  // Scroll parallax transforms
  const bgScrollY = useTransform(scrollYProgress || useMotionValue(0), [0, 1], [0, 120]);
  const midScrollY = useTransform(scrollYProgress || useMotionValue(0), [0, 1], [0, 190]);
  const fgScrollY = useTransform(scrollYProgress || useMotionValue(0), [0, 1], [0, 270]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ========================================================= */}
      {/* 1. BACKGROUND LAYER: Distant Mountains, Dawn Sky & Sunbeams */}
      {/* ========================================================= */}
      <motion.div
        style={{
          x: bgX,
          y: isReducedMotion ? 0 : bgY,
          translateY: bgScrollY,
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1.02 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] will-change-transform"
      >
        <img
          src={BACKGROUND_IMAGE}
          alt="Minecraft blocky mountain range at sunrise with misty horizon"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] saturate-[1.1]"
        />

        {/* Atmospheric Sunlight Glow Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#e6ce8a]/15 via-transparent to-[#07120d]/80 mix-blend-screen"
          style={{ animation: 'sunlightBreathe 14s ease-in-out infinite alternate' }}
          aria-hidden="true"
        />

        {/* Sky to horizon tonal scrim */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#070908] via-[#07120d]/60 to-[#07120d]/30"
          aria-hidden="true"
        />
      </motion.div>

      {/* ========================================================= */}
      {/* 2. ATMOSPHERIC DRIFTING FOG LAYER 1 (Between BG and Mid) */}
      {/* ========================================================= */}
      <div
        className="absolute inset-x-0 bottom-[28%] h-[40%] pointer-events-none opacity-40 mix-blend-screen"
        style={{ animation: 'fogDriftSlow 32s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <div className="w-full h-full bg-gradient-to-t from-[#1b3427]/60 via-[#274c39]/30 to-transparent blur-2xl" />
      </div>

      {/* ========================================================= */}
      {/* 3. MIDGROUND LAYER: Pine Forest Valley, River & Cabin      */}
      {/* ========================================================= */}
      <motion.div
        style={{
          x: midX,
          y: isReducedMotion ? 0 : midY,
          translateY: midScrollY,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 bottom-0 h-[72%] sm:h-[65%] md:h-[60%] will-change-transform"
      >
        <div className="relative w-full h-full">
          <img
            src={MIDGROUND_IMAGE}
            alt="Lush Minecraft pine forest river valley with cozy wooden cabin"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-bottom filter brightness-[0.7] contrast-[1.12] saturate-[1.15]"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 18%, rgba(0,0,0,1) 45%, rgba(0,0,0,1) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 18%, rgba(0,0,0,1) 45%, rgba(0,0,0,1) 100%)',
            }}
          />

          {/* Warm lantern light bloom over cabin area */}
          <div
            className="absolute bottom-[28%] left-[48%] -translate-x-1/2 w-48 h-36 bg-[#e6ce8a]/20 blur-3xl rounded-full pointer-events-none mix-blend-screen"
            aria-hidden="true"
          />

          {/* Deep forest floor shadow blending */}
          <div
            className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#070908] via-[#070908]/90 to-transparent"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {/* ========================================================= */}
      {/* 4. ATMOSPHERIC DRIFTING FOG LAYER 2 (Midground to Foreground) */}
      {/* ========================================================= */}
      <div
        className="absolute inset-x-0 bottom-8 h-44 pointer-events-none opacity-50 mix-blend-screen"
        style={{ animation: 'fogDriftSlow 24s ease-in-out 4s infinite reverse' }}
        aria-hidden="true"
      >
        <div className="w-full h-full bg-gradient-to-t from-[#0d1e17]/80 via-[#173426]/40 to-transparent blur-xl" />
      </div>

      {/* ========================================================= */}
      {/* 5. FOREGROUND SILHOUETTE LAYER: Pine Boughs & Stone Ridge */}
      {/* ========================================================= */}
      <motion.div
        style={{
          x: fgX,
          y: isReducedMotion ? 0 : fgY,
          translateY: fgScrollY,
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none will-change-transform z-10"
      >
        {/* Left Spruce Pine Silhouette framing the screen */}
        <svg
          viewBox="0 0 400 900"
          className="absolute -left-6 bottom-0 h-[55%] md:h-[70%] max-w-[280px] md:max-w-[420px] text-[#050806] fill-current opacity-90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          {/* Stylized geometric Minecraft spruce bough steps */}
          <path d="M0,900 L120,900 L140,810 L190,810 L160,740 L230,740 L190,660 L270,660 L210,580 L290,580 L220,500 L270,500 L180,410 L230,410 L150,330 L190,330 L120,240 L150,240 L80,140 L100,140 L30,40 L0,0 Z" />
        </svg>

        {/* Right Stone Ledge & Reeds framing */}
        <svg
          viewBox="0 0 350 700"
          className="absolute -right-4 bottom-0 h-[45%] md:h-[60%] max-w-[220px] md:max-w-[340px] text-[#050806] fill-current opacity-85 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path d="M350,700 L140,700 L160,630 L100,630 L120,550 L60,550 L90,470 L20,470 L60,390 L10,390 L80,310 L40,310 L120,220 L90,220 L180,120 L150,120 L240,30 L350,0 Z" />
        </svg>

        {/* Foreground Bottom Horizon Vignette & Grass Ridge */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070908] via-[#070908]/90 to-transparent" />
      </motion.div>

      {/* Global Vignette (keeps text legible and focuses the eye) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,9,8,0.7)_85%,rgba(7,9,8,0.95)_100%)] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
