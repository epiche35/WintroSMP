/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Compass, Sparkles, MessageSquare, Copy, Check, Terminal, ExternalLink, ArrowUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { WorldBox } from '../ui/WorldBox';
import { SERVER_CONFIG } from '../../config/server.config';

const SUMMIT_IMAGE = '/src/assets/images/launch_summit_overlook_1790967339598.jpg';

export function LaunchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll tracking for parallax and reveal triggers
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  // Camera push-forward effect and vertical parallax
  const landscapeScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);
  const landscapeTranslateY = useTransform(scrollYProgress, [0, 1], [40, -30]);
  const contentTranslateY = useTransform(scrollYProgress, [0, 1], [60, -30]);
  const atmosphericMistY = useTransform(scrollYProgress, [0, 1], [10, -50]);

  // Pointer interaction physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 50 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const visualPointerX = useTransform(smoothMouseX, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-10, 10]);
  const visualPointerY = useTransform(smoothMouseY, [-1, 1], isReducedMotion || isMobile ? [0, 0] : [-8, 8]);

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
      id="launch"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#070908] text-[#f4ede1] overflow-hidden pt-28 sm:pt-36 lg:pt-44 pb-16"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS TRANSITION FROM COMMUNITY TO HIGH MOUNTAIN SUMMIT             */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 inset-x-0 h-44 sm:h-64 pointer-events-none z-10 bg-gradient-to-b from-[#070908] via-[#09110d]/90 to-transparent"
        aria-hidden="true"
      />

      {/* Atmospheric Horizon Mist */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : atmosphericMistY }}
        className="absolute top-1/4 inset-x-0 w-full h-[600px] pointer-events-none opacity-25 mix-blend-screen will-change-transform"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-radial from-[#e0b759]/20 via-[#1c382a]/20 to-transparent blur-3xl" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. GRAND SUMMIT OVERLOOK VISTA CANVAS                                     */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 sm:mb-24">
        <motion.div
          style={{
            y: isReducedMotion || isMobile ? 0 : landscapeTranslateY,
            x: visualPointerX,
          }}
          className="relative w-full overflow-hidden rounded-xs bg-[#0b0f0d] border border-[#242c29]/90 shadow-[0_30px_70px_rgba(0,0,0,0.85)] will-change-transform"
        >
          {/* Architectural Stone Corner Accents */}
          <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#c59f4e]/60 z-20 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#c59f4e]/60 z-20 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#c59f4e]/60 z-20 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#c59f4e]/60 z-20 pointer-events-none" />

          {/* Panoramic Landscape Image */}
          <motion.div
            style={{
              scale: isReducedMotion ? 1 : landscapeScale,
            }}
            initial={{ opacity: 0, filter: 'blur(14px) brightness(0.6)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[21/10] sm:aspect-[21/9] w-full overflow-hidden"
          >
            <img
              src={SUMMIT_IMAGE}
              alt="Panoramic Minecraft high mountain summit overlook gazing down upon the entire survival river valley at dusk"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] saturate-[1.12]"
            />

            {/* Subtle Sunset Gold Breathing overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-[#070908]/75 via-transparent to-[#e6ce8a]/20 mix-blend-screen pointer-events-none"
              aria-hidden="true"
            />

            {/* Global Vignette Edge Shading */}
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,9,8,0.75)_100%)] pointer-events-none"
              aria-hidden="true"
            />

            {/* Overlook Horizon Scrim */}
            <div
              className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070908] via-[#070908]/80 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {/* Quiet Vista Caption Bar */}
          <div className="p-4 sm:p-5 bg-[#090d0b]/90 border-t border-[#1b2320] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#798881]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c59f4e] animate-pulse" />
              <span className="font-sans text-[11px] sm:text-xs text-[#b4c0ba]">
                High summit overlook · The world you are about to enter
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#56635e] uppercase tracking-wider">
              CHAPTER 07 · FINALE
            </span>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DRAMATIC EDITORIAL LAUNCH CONTENT                                      */}
      {/* ========================================================================= */}
      <motion.div
        style={{ y: isReducedMotion || isMobile ? 0 : contentTranslateY }}
        className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center"
      >
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-4 sm:mb-6"
        >
          <span className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-[#c59f4e]/70" aria-hidden="true" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#c59f4e] uppercase font-medium">
            07 / LAUNCH
          </span>
          <span className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-[#c59f4e]/70" aria-hidden="true" />
        </motion.div>

        {/* Massive Display Title: WINTRO SMP */}
        <div className="overflow-hidden mb-3 sm:mb-4">
          <motion.h2
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Cinzel'] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[0.12em] sm:tracking-[0.16em] text-[#f4ede1] uppercase drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)] select-none"
          >
            {SERVER_CONFIG.wordmark}
          </motion.h2>
        </div>

        {/* Status: COMING SOON */}
        <div className="overflow-hidden mb-6 sm:mb-8">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="font-['Cinzel'] text-xs sm:text-sm md:text-base font-semibold tracking-[0.38em] text-[#e0b759] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              COMING SOON
            </span>
          </motion.div>
        </div>

        {/* Tagline: BUILD YOUR WORLD. PLAY YOUR WAY. */}
        <div className="overflow-hidden mb-8 sm:mb-10 max-w-2xl">
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm sm:text-base md:text-lg text-[#d8dfdc] tracking-[0.24em] uppercase font-medium leading-relaxed [text-wrap:balance]"
          >
            BUILD YOUR WORLD.
            <br className="hidden sm:inline" /> PLAY YOUR WAY.
          </motion.p>
        </div>

        {/* Official Launch Date Placeholder Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12 inline-flex items-center gap-2.5 px-4 py-2 rounded-xs bg-[#0b120e]/80 border border-[#243f31]/60 text-xs font-mono text-[#b4c0ba]"
        >
          <span className="w-2 h-2 rounded-full bg-[#c59f4e] animate-pulse" />
          <span className="tracking-wider">{SERVER_CONFIG.launchDatePlaceholder}</span>
        </motion.div>

        {/* Server Information Connection Area */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto mb-12 text-left"
        >
          <WorldBox variant="monolith" className="p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-[#1f2d24] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#e0b759]" />
                <span className="font-mono text-xs text-[#d9cfbf] uppercase tracking-wider font-semibold">
                  SERVER INFORMATION
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#798881] uppercase">
                JAVA & BEDROCK READY
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 bg-[#060807]/90 border border-[#1b2620] rounded-[5px]">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#798881]">
                  SERVER IP ADDRESS
                </div>
                <div className="font-mono text-sm text-[#f4ede1] tracking-wide mt-0.5">
                  {SERVER_CONFIG.connection.serverIpPlaceholder}
                </div>
              </div>

              <Button
                variant="stone"
                size="sm"
                onClick={() => copyToClipboard(SERVER_CONFIG.connection.serverIpPlaceholder, 'ip')}
                icon={copiedKey === 'ip' ? <Check className="w-3.5 h-3.5 text-[#4cbcd6]" /> : <Copy className="w-3.5 h-3.5 text-[#798881]" />}
                className="text-xs font-mono py-2 px-3 self-end sm:self-auto shrink-0"
              >
                {copiedKey === 'ip' ? 'Copied Placeholder' : 'Copy'}
              </Button>
            </div>

            <div className="mt-3.5 text-[11px] text-[#798881] font-sans flex items-center justify-between">
              <span>Bedrock port & connection details will announce on launch</span>
              <span className="font-mono text-[10px] text-[#3e7259] font-medium">OFFICIAL SMP</span>
            </div>
          </WorldBox>
        </motion.div>

        {/* Restrained CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none mb-20 sm:mb-28"
        >
          <Button
            variant="primary"
            size="lg"
            showArrow
            onClick={() => copyToClipboard(SERVER_CONFIG.connection.serverIpPlaceholder, 'join')}
            icon={copiedKey === 'join' ? <Check className="w-4 h-4 text-[#4cbcd6]" /> : <Compass className="w-4 h-4 text-[#e0b759]" />}
            className="tracking-[0.16em] uppercase text-xs sm:text-sm font-semibold py-3.5 px-7"
          >
            {copiedKey === 'join' ? 'COPIED PLACEHOLDER' : 'JOIN THE SERVER'}
          </Button>

          <Button
            variant="stone"
            size="lg"
            showArrow
            href={SERVER_CONFIG.socials.discord}
            icon={<MessageSquare className="w-4 h-4 text-[#e0b759]" />}
            className="tracking-[0.16em] uppercase text-xs sm:text-sm font-semibold py-3.5 px-7 hover:border-[#c59f4e]/50"
          >
            DISCORD
          </Button>

          <Button
            variant="stone"
            size="lg"
            showArrow
            onClick={() => copyToClipboard(SERVER_CONFIG.socials.youtube, 'youtube')}
            icon={copiedKey === 'youtube' ? <Check className="w-4 h-4 text-[#4cbcd6]" /> : <ExternalLink className="w-4 h-4 text-[#798881]" />}
            className="tracking-[0.16em] uppercase text-xs sm:text-sm font-semibold py-3.5 px-7"
          >
            {copiedKey === 'youtube' ? 'COPIED PLACEHOLDER' : 'YOUTUBE'}
          </Button>
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. FINAL MOMENT: Subtle visual fade toward darkness                       */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pt-16 pb-12 border-t border-[#141b18] flex flex-col items-center text-center">
        {/* Upward return trigger */}
        <button
          type="button"
          onClick={scrollToTop}
          className="mb-10 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#56635e] hover:text-[#e0b759] transition-colors cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>RETURN TO SUMMIT</span>
        </button>

        <div className="h-10 w-[1px] bg-gradient-to-b from-[#234b38] via-[#234b38]/40 to-transparent mb-6" aria-hidden="true" />
        
        {/* Final elegant closing lines */}
        <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#f4ede1] uppercase mb-2">
          {SERVER_CONFIG.name}
        </h3>

        <p className="font-['Cinzel'] text-xs sm:text-sm tracking-[0.32em] text-[#798881] uppercase font-semibold">
          THE WORLD AWAITS.
        </p>

        <div className="mt-8 text-[11px] font-sans text-[#3e4a44]">
          © {new Date().getFullYear()} {SERVER_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </section>
  );
}
