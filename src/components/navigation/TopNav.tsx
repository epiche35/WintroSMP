/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from 'motion/react';
import {
  Compass,
  Trees,
  Shield,
  Store,
  Gem,
  Swords,
  Users,
  Sparkles,
} from 'lucide-react';
import { SERVER_CONFIG } from '../../config/server.config';

/**
 * Magnification & Motion Configuration
 * Centralized, configurable parameters for the continuous proximity waveform.
 */
export const MAGNIFICATION_CONFIG = {
  // Target Scale behavior: 1.0 to 1.7 based on cursor distance
  maxScale: 1.7,       // Hovered / closest item
  neighborScale: 1.32, // Nearby items (1.15 - 1.35)
  minScale: 1.0,       // Distant items (normal scale)

  // Distance thresholds (in pixels from item center)
  proximityRange: 160, // Point where scaling begins
  neighborRange: 55,   // Point where neighbor scaling peaks

  // Vertical spring lift (in pixels)
  maxLift: -8,

  // Label reveal distance threshold (in pixels)
  labelRevealDistance: 36,

  // Spring physics profile
  spring: {
    mass: 0.1,
    stiffness: 280,
    damping: 22,
  },
};

interface NavItemConfig {
  id: string;
  label: string;
  targetId: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'hero', label: 'HOME', targetId: 'top', icon: Compass },
  { id: 'world', label: 'SURVIVAL', targetId: 'world', icon: Trees },
  { id: 'claiming', label: 'CLAIMS', targetId: 'claiming', icon: Shield },
  { id: 'shops', label: 'SHOPS', targetId: 'shops', icon: Store },
  { id: 'economy', label: 'ECONOMY', targetId: 'economy', icon: Gem },
  { id: 'arena', label: 'PVP', targetId: 'arena', icon: Swords },
  { id: 'community', label: 'COMMUNITY', targetId: 'community', icon: Users },
  { id: 'launch', label: 'LAUNCH', targetId: 'launch', icon: Sparkles },
];

interface TopNavProps {
  onNavClick?: (sectionId: string) => void;
}

export function TopNav({ onNavClick }: TopNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // mouseX continuously tracks the horizontal cursor position without re-rendering React
  const mouseX = useMotionValue<number>(Infinity);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolledDeep, setIsScrolledDeep] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Accessibility & Responsive Touch Device Detection
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotion);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 2. Continuous Scroll-Based Active Section Tracker
  useEffect(() => {
    const sectionIds = ['world', 'claiming', 'shops', 'economy', 'arena', 'community', 'launch'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      setIsScrolledDeep(window.scrollY > 450);

      if (window.scrollY < 250) {
        setActiveSection('hero');
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Section Navigation
  const handleNavClick = (targetId: string) => {
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }

    if (onNavClick) {
      onNavClick(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const navHeight = 85;
        const targetPos = el.offsetTop - navHeight;
        window.scrollTo({ top: Math.max(0, targetPos), behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-2 sm:px-6 pointer-events-none select-none">
      <motion.div
        ref={containerRef}
        onMouseMove={(e) => {
          if (isReducedMotion || isMobile) return;
          // Directly set clientX motion value without triggering React component re-renders
          mouseX.set(e.clientX);
        }}
        onMouseLeave={() => {
          // Reset to Infinity so all items smoothly spring back to baseline scale and lifts
          mouseX.set(Infinity);
        }}
        animate={{
          opacity: isScrolledDeep ? 0.84 : 1,
        }}
        whileHover={{
          opacity: 1,
        }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto relative flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-full bg-[#0a0f0d]/85 backdrop-blur-xl border border-[#23382c]/75 shadow-[0_14px_45px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#385b46]/90 hover:shadow-[0_18px_55px_rgba(0,0,0,0.9)]"
      >
        {/* Ambient Subtle Hearth Underglow */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#c59f4e]/8 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Brand Home Wordmark Pill (Desktop only) */}
        <button
          type="button"
          onClick={() => handleNavClick('top')}
          className="hidden xl:flex items-center gap-1.5 pl-3 pr-3.5 py-1.5 font-['Cinzel'] text-xs font-bold tracking-[0.24em] text-[#f4ede1] hover:text-[#e0b759] transition-colors cursor-pointer border-r border-[#1e2a24]/80 mr-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59f4e] rounded-l-full"
          aria-label="Return to top of page"
        >
          <span>{SERVER_CONFIG.wordmark}</span>
        </button>

        {/* Stable Proximity Magnification Navigation Dock */}
        <nav aria-label="WINTRO SMP Navigation Dock" className="flex items-center gap-1 sm:gap-1.5">
          {NAV_ITEMS.map((item, index) => (
            <DockItem
              key={item.id}
              item={item}
              mouseX={mouseX}
              isFocused={focusedIndex === index}
              isActive={activeSection === item.id || (item.id === 'hero' && activeSection === 'top')}
              isReducedMotion={isReducedMotion || isMobile}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onClick={() => handleNavClick(item.targetId)}
            />
          ))}
        </nav>
      </motion.div>
    </header>
  );
}

// =========================================================================
// CONTINUOUS PROXIMITY MAGNIFICATION ITEM COMPONENT
// =========================================================================

interface DockItemProps {
  item: NavItemConfig;
  mouseX: MotionValue<number>;
  isFocused: boolean;
  isActive: boolean;
  isReducedMotion: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
}

function DockItem({
  item,
  mouseX,
  isFocused,
  isActive,
  isReducedMotion,
  onFocus,
  onBlur,
  onClick,
}: DockItemProps) {
  const itemRef = useRef<HTMLButtonElement>(null);

  // 1. Calculate Signed Distance between pointer and item center
  const distance = useTransform(mouseX, (val) => {
    if (isReducedMotion || val === Infinity) return Infinity;
    const el = itemRef.current;
    if (!el) return Infinity;
    const rect = el.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    return Math.abs(val - itemCenter);
  });

  // 2. Transform Distance -> Continuous Scale Waveform (1.0 to 1.7):
  // Nearest item: maxScale (1.7x), neighbors: neighborScale (~1.32x), distant: minScale (1.0x)
  const rawScale = useTransform(
    distance,
    [0, MAGNIFICATION_CONFIG.neighborRange, MAGNIFICATION_CONFIG.proximityRange],
    [MAGNIFICATION_CONFIG.maxScale, MAGNIFICATION_CONFIG.neighborScale, MAGNIFICATION_CONFIG.minScale],
    { clamp: true }
  );
  const scale = useSpring(rawScale, MAGNIFICATION_CONFIG.spring);

  // 3. Transform Distance -> Vertical Spring Lift:
  // Direct approach: -8px lift, neighbor approach: ~-3.5px lift, distant: 0px
  const rawLift = useTransform(
    distance,
    [0, MAGNIFICATION_CONFIG.neighborRange, MAGNIFICATION_CONFIG.proximityRange],
    [MAGNIFICATION_CONFIG.maxLift, MAGNIFICATION_CONFIG.maxLift * 0.45, 0],
    { clamp: true }
  );
  const y = useSpring(rawLift, MAGNIFICATION_CONFIG.spring);

  // 4. Transform Distance -> Label Opacity:
  // Dynamically fades in when within labelRevealDistance (36px), completely invisible otherwise
  const rawLabelOpacity = useTransform(
    distance,
    [MAGNIFICATION_CONFIG.labelRevealDistance * 0.45, MAGNIFICATION_CONFIG.labelRevealDistance],
    [1, 0],
    { clamp: true }
  );
  const labelOpacity = useSpring(rawLabelOpacity, {
    mass: 0.1,
    stiffness: 350,
    damping: 24,
  });

  // 5. Transform Distance -> Label Vertical Translate:
  // Moves smoothly from +4px to 0px as item magnifies
  const rawLabelY = useTransform(
    distance,
    [0, MAGNIFICATION_CONFIG.labelRevealDistance],
    [0, 4],
    { clamp: true }
  );
  const labelY = useSpring(rawLabelY, {
    mass: 0.1,
    stiffness: 350,
    damping: 24,
  });

  // 6. Transform Distance -> Label Scale:
  const rawLabelScale = useTransform(
    distance,
    [0, MAGNIFICATION_CONFIG.labelRevealDistance],
    [1, 0.88],
    { clamp: true }
  );
  const labelScale = useSpring(rawLabelScale, {
    mass: 0.1,
    stiffness: 350,
    damping: 24,
  });

  // 7. Transform Distance -> Continuous Blur-to-Sharp Transition
  const rawBlur = useTransform(
    distance,
    [0, MAGNIFICATION_CONFIG.labelRevealDistance],
    [0, 4],
    { clamp: true }
  );
  const labelFilter = useTransform(rawBlur, (b) => `blur(${b.toFixed(1)}px)`);

  const IconComponent = item.icon;

  return (
    // Stable slot container prevents layout shifts and guarantees consistent dock spacing
    <div className="relative flex flex-col items-center justify-center w-10 sm:w-11 h-10 sm:h-11">
      {/* Magnifying Navigation Button */}
      <motion.button
        ref={itemRef}
        type="button"
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          scale: isReducedMotion ? 1 : (isFocused ? MAGNIFICATION_CONFIG.maxScale : scale),
          y: isReducedMotion ? 0 : (isFocused ? MAGNIFICATION_CONFIG.maxLift : y),
        }}
        whileTap={isReducedMotion ? undefined : { scale: 0.94 }}
        className={`group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59f4e] ${
          isActive
            ? 'bg-[#183124]/90 text-[#f4ede1] border border-[#c59f4e]/60 shadow-[0_0_12px_rgba(197,159,78,0.25)]'
            : isFocused
            ? 'bg-[#16271e]/85 text-[#f4ede1] border border-[#3b5847]/80 shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
            : 'bg-[#0f1713]/40 text-[#8fa097] border border-transparent hover:text-[#f4ede1] hover:border-[#385b46]/60 hover:bg-[#14231b]/60'
        }`}
        aria-label={`Navigate to ${item.label}`}
      >
        {/* Active Section Dot Indicator */}
        {isActive && (
          <motion.div
            layoutId="activeNavIndicatorDot"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#c59f4e] shadow-[0_0_8px_rgba(197,159,78,0.9)] pointer-events-none"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}

        {/* Lucide Icon */}
        <IconComponent
          className={`w-4 h-4 transition-colors duration-150 ${
            isActive ? 'text-[#c59f4e]' : 'group-hover:text-[#f4ede1]'
          }`}
        />
      </motion.button>

      {/* Dynamically Revealed Text Label (Driven by Distance & Motion Values) */}
      <motion.div
        style={{
          opacity: isReducedMotion ? (isFocused ? 1 : 0) : (isFocused ? 1 : labelOpacity),
          y: isReducedMotion ? 0 : (isFocused ? 0 : labelY),
          scale: isReducedMotion ? 1 : (isFocused ? 1 : labelScale),
          filter: isReducedMotion ? 'none' : (isFocused ? 'blur(0px)' : labelFilter),
        }}
        className="absolute -bottom-7 pointer-events-none z-30 flex items-center justify-center whitespace-nowrap px-2 py-0.5 rounded-xs bg-[#080d0a]/95 border border-[#23382c]/85 shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
      >
        <span className="font-['Cinzel'] text-[10px] font-bold tracking-[0.22em] text-[#f4ede1] uppercase select-none">
          {item.label}
        </span>
      </motion.div>
    </div>
  );
}
