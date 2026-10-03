/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Instagram,
  Facebook,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface ContactButtonProps {
  platform: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
  accentColor: string;
  isReducedMotion: boolean;
}

function ContactButton({
  platform,
  handle,
  href,
  icon,
  accentColor,
  isReducedMotion,
}: ContactButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={
        isReducedMotion
          ? undefined
          : {
              y: -2.5,
              scale: 1.015,
              transition: { type: 'spring', stiffness: 450, damping: 25 },
            }
      }
      whileTap={isReducedMotion ? undefined : { scale: 0.98 }}
      className="group relative flex items-center justify-between gap-4 px-4 py-3 rounded-[6px] bg-[#090d0b]/85 backdrop-blur-md border border-[#1e2a22]/85 shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-[#385b46] hover:bg-[#0d1410] transition-colors duration-200 cursor-pointer text-left select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59f4e]"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-[4px] bg-[#050807] border border-[#18231d] transition-transform duration-200 group-hover:scale-110"
        >
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#798881] group-hover:text-[#a5b4ac] transition-colors">
            {platform}
          </div>
          <div className="font-['Cinzel'] text-xs font-semibold tracking-[0.08em] text-[#e5ddd1] group-hover:text-[#fbf7ee] truncate transition-colors">
            {handle}
          </div>
        </div>
      </div>

      <span className="shrink-0 text-[#607168] group-hover:text-[#e0b759] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </motion.a>
  );
}

export function CreatorFooter() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(query.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  return (
    <motion.footer
      initial={isReducedMotion ? undefined : { opacity: 0, y: 32 }}
      whileInView={isReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Creator Credits and Studio Inquiries"
      className="relative z-20 w-full overflow-hidden bg-[#050706] border-t border-[#16231c]/80 text-[#f4ede1]"
    >
      {/* 1. Subtle Environmental Mist & Deep Canopy Gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(35,75,56,0.14),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Distant Forest Silhouette Accent */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 opacity-[0.035] pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full text-[#385b46]"
          fill="currentColor"
        >
          <path d="M0,120 L0,90 L30,40 L60,95 L110,30 L160,100 L210,50 L260,105 L320,35 L380,100 L440,45 L500,105 L560,30 L620,100 L680,40 L740,105 L800,25 L860,100 L920,45 L980,105 L1040,35 L1100,100 L1150,50 L1200,90 L1200,120 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Asymmetric Brand Signature with staggered scroll reveal */}
          <motion.div
            initial={isReducedMotion ? undefined : { opacity: 0, x: -14 }}
            whileInView={isReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Small Lead-In Label */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-5 h-[1px] bg-[#c59f4e]/60" aria-hidden="true" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-[#c59f4e] uppercase font-semibold">
                WEBSITE CRAFTED BY
              </span>
            </div>

            {/* Studio Hero Wordmark */}
            <h3 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.14em] text-[#f4ede1] uppercase leading-tight mb-2 select-text">
              ZYRO <span className="text-[#e0b759]">WEB STUDIO</span>
            </h3>

            {/* Studio Specialization Subtitle */}
            <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-[#8fa097] font-medium mb-6">
              Websites &amp; Digital Experiences
            </p>

            {/* Closing Invitation Line */}
            <div className="max-w-xl pl-3.5 border-l-2 border-[#2b4c39]/90 bg-gradient-to-r from-[#111e17]/40 to-transparent py-1.5 rounded-r-[4px]">
              <p className="font-['Cinzel'] text-xs sm:text-sm text-[#cbd6d0] tracking-[0.04em] leading-relaxed">
                &ldquo;Need a website for your server or business? Let&rsquo;s build it.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Channels with staggered scroll reveal */}
          <motion.div
            initial={isReducedMotion ? undefined : { opacity: 0, x: 14 }}
            whileInView={isReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-3 w-full"
          >
            <div className="text-[10px] font-mono tracking-[0.22em] text-[#607168] uppercase font-semibold mb-1">
              CONNECT &amp; INQUIRE
            </div>

            {/* 1. Instagram Button */}
            <ContactButton
              platform="INSTAGRAM"
              handle="@itzmezyro52"
              href="https://instagram.com/itzmezyro52"
              icon={<Instagram className="w-4 h-4 text-[#e0b759]" />}
              accentColor="#e0b759"
              isReducedMotion={isReducedMotion}
            />

            {/* 2. Facebook Button */}
            <ContactButton
              platform="FACEBOOK"
              handle="ItzMe Zyro"
              href="https://facebook.com/ItzMeZyro"
              icon={<Facebook className="w-4 h-4 text-[#4cbcd6]" />}
              accentColor="#4cbcd6"
              isReducedMotion={isReducedMotion}
            />

            {/* 3. WhatsApp Button */}
            <ContactButton
              platform="WHATSAPP"
              handle="9809633700"
              href="https://wa.me/9809633700"
              icon={<MessageCircle className="w-4 h-4 text-[#4ed98e]" />}
              accentColor="#4ed98e"
              isReducedMotion={isReducedMotion}
            />
          </motion.div>

        </div>

        {/* Faint Subtle Divider & Bottom Credit */}
        <motion.div
          initial={isReducedMotion ? undefined : { opacity: 0 }}
          whileInView={isReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 pt-8 border-t border-[#131d17] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-sans text-[#4e5c54]"
        >
          <div>
            <span>WINTRO SMP &mdash; Independent community server</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#c59f4e]/60" />
            <span>Digital architecture by Zyro Web Studio</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
