/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export type WorldBoxVariant =
  | 'forest'       // Peaceful Survival: carved dark forest stone + mossy iron
  | 'territory'    // Land Claiming: surveyor boundary marks + architectural corner lines
  | 'market'       // Redstone Shops: merchant ledger + spruce timber + copper/redstone insets
  | 'diamond'      // Diamond Economy: subterranean faceted bedrock + crystal edge lines
  | 'arena'        // PvP Arena: battle-worn obsidian slate + bronze brazier edge
  | 'hearth'       // Community: warm tavern spruce + amber lantern glow
  | 'monolith';    // Launch: grand summit monolith + gold leaf inlay

interface WorldBoxProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: WorldBoxVariant;
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function WorldBox({
  variant = 'forest',
  children,
  className = '',
  glowColor,
  ...props
}: WorldBoxProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(query.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  // Theme-specific styling profiles
  const variantStyles: Record<
    WorldBoxVariant,
    {
      container: string;
      cornerAccent: string;
      innerGlow: string;
      borderHighlight: string;
    }
  > = {
    forest: {
      container:
        'bg-[#080d0a]/88 backdrop-blur-xl border border-[#1f3629]/80 shadow-[0_16px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#385e49] hover:bg-[#0a110d]/92',
      cornerAccent: 'border-[#3f6b53]/60',
      innerGlow: 'from-[#193226]/15 via-transparent to-transparent',
      borderHighlight: 'group-hover:border-[#528d6d]/80',
    },
    territory: {
      container:
        'bg-[#090d0b]/88 backdrop-blur-xl border border-[#25372e]/80 shadow-[0_16px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(197,159,78,0.08)] hover:border-[#c59f4e]/45 hover:bg-[#0c120e]/92',
      cornerAccent: 'border-[#c59f4e]/50',
      innerGlow: 'from-[#c59f4e]/8 via-transparent to-transparent',
      borderHighlight: 'group-hover:border-[#c59f4e]/70',
    },
    market: {
      container:
        'bg-[#0a0d0c]/88 backdrop-blur-xl border border-[#2e3129]/80 shadow-[0_16px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(224,183,89,0.08)] hover:border-[#b88c42]/50 hover:bg-[#0e1210]/92',
      cornerAccent: 'border-[#d49942]/60',
      innerGlow: 'from-[#9e3a24]/10 via-transparent to-transparent',
      borderHighlight: 'group-hover:border-[#e0b759]/70',
    },
    diamond: {
      container:
        'bg-[#070e11]/88 backdrop-blur-xl border border-[#143d47]/80 shadow-[0_16px_50px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(76,188,214,0.1)] hover:border-[#226778] hover:bg-[#091317]/92',
      cornerAccent: 'border-[#4cbcd6]/60',
      innerGlow: 'from-[#4cbcd6]/10 via-transparent to-transparent',
      borderHighlight: 'group-hover:border-[#6fe0fa]/80',
    },
    arena: {
      container:
        'bg-[#0d0a08]/88 backdrop-blur-xl border border-[#3b271d]/80 shadow-[0_16px_50px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(212,122,50,0.08)] hover:border-[#633a25] hover:bg-[#120d0a]/92',
      cornerAccent: 'border-[#d47a32]/60',
      innerGlow: 'from-[#d47a32]/10 via-transparent to-transparent',
      borderHighlight: 'group-hover:border-[#f09248]/80',
    },
    hearth: {
      container:
        'bg-[#0a0c0b]/88 backdrop-blur-xl border border-[#2b352b]/80 shadow-[0_16px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(224,183,89,0.08)] hover:border-[#4d5e4d] hover:bg-[#0e120f]/92',
      cornerAccent: 'border-[#c59f4e]/60',
      innerGlow: 'from-[#c59f4e]/10 via-transparent to-transparent',
      borderHighlight: 'group-hover:border-[#e0b759]/80',
    },
    monolith: {
      container:
        'bg-[#080b09]/92 backdrop-blur-2xl border border-[#2a3830]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(224,183,89,0.15)] hover:border-[#c59f4e]/60 hover:bg-[#0b100d]/95',
      cornerAccent: 'border-[#c59f4e]/70',
      innerGlow: 'from-[#c59f4e]/12 via-transparent to-transparent',
      borderHighlight: 'group-hover:border-[#e0b759]/90',
    },
  };

  const style = variantStyles[variant];

  return (
    <motion.div
      whileHover={
        isReducedMotion
          ? undefined
          : {
              y: -3,
              scale: 1.006,
              transition: { type: 'spring', stiffness: 400, damping: 28 },
            }
      }
      className={`group relative rounded-[8px] p-6 sm:p-8 lg:p-10 transition-all duration-300 ease-out select-text ${style.container} ${className}`}
      {...props}
    >
      {/* 1. Subtle Ambient Top Sheen Glow */}
      <div
        className={`absolute inset-0 rounded-[7px] bg-gradient-to-b ${style.innerGlow} pointer-events-none`}
        aria-hidden="true"
      />

      {/* 2. Top-Left Architectural Corner Notch */}
      <div
        className={`absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 ${style.cornerAccent} rounded-tl-[4px] pointer-events-none transition-colors duration-200 ${style.borderHighlight}`}
        aria-hidden="true"
      />

      {/* 3. Top-Right Architectural Corner Notch */}
      <div
        className={`absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 ${style.cornerAccent} rounded-tr-[4px] pointer-events-none transition-colors duration-200 ${style.borderHighlight}`}
        aria-hidden="true"
      />

      {/* 4. Bottom-Left Architectural Corner Notch */}
      <div
        className={`absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 ${style.cornerAccent} rounded-bl-[4px] pointer-events-none transition-colors duration-200 ${style.borderHighlight}`}
        aria-hidden="true"
      />

      {/* 5. Bottom-Right Architectural Corner Notch */}
      <div
        className={`absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 ${style.cornerAccent} rounded-br-[4px] pointer-events-none transition-colors duration-200 ${style.borderHighlight}`}
        aria-hidden="true"
      />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
