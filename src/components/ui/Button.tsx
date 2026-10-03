/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef, useState, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'stone' | 'diamond' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  showArrow?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      showArrow = false,
      href,
      target,
      rel,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
      const query = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(query.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      query.addEventListener('change', listener);
      return () => query.removeEventListener('change', listener);
    }, []);

    // Proportional spatial padding and typography
    const sizeClasses = {
      sm: 'px-4 py-2 text-xs tracking-[0.18em]',
      md: 'px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.2em]',
      lg: 'px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm tracking-[0.22em]',
    }[size];

    // Refined WINTRO SMP Button Language: smooth moderate rounding, subtle dual-layer borders, soft depth
    const variantClasses = {
      primary:
        'bg-gradient-to-b from-[#203f30] to-[#152a20] text-[#fbf7ee] border border-[#4e8267]/70 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-[#c59f4e]/85 hover:from-[#264c3a] hover:to-[#193226] hover:shadow-[0_6px_28px_rgba(35,75,56,0.45),inset_0_1px_0_rgba(224,183,89,0.25)]',
      stone:
        'bg-gradient-to-b from-[#131a17]/90 to-[#0a0f0d]/95 text-[#e5ddd1] border border-[#2b3933]/90 shadow-[0_4px_18px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-[#c59f4e]/50 hover:from-[#1b2520] hover:to-[#0f1512] hover:text-[#fbf7ee] hover:shadow-[0_6px_24px_rgba(0,0,0,0.65)]',
      diamond:
        'bg-gradient-to-b from-[#0e2126]/95 to-[#081518]/95 text-[#dff7fc] border border-[#1c6475]/70 shadow-[0_4px_20px_rgba(10,24,28,0.7),inset_0_1px_0_rgba(76,188,214,0.18)] hover:border-[#42c8e8]/90 hover:from-[#132c33] hover:to-[#0c1f24] hover:shadow-[0_6px_28px_rgba(66,200,232,0.25),inset_0_1px_0_rgba(76,188,214,0.3)]',
      ghost:
        'bg-transparent text-[#9fb0a8] hover:text-[#fbf7ee] hover:bg-[#13281e]/40 border border-transparent hover:border-[#234b38]/50',
    }[variant];

    const sharedMotionProps = {
      whileHover:
        isReducedMotion || disabled
          ? undefined
          : {
              y: -2.5,
              scale: 1.015,
              transition: { type: 'spring' as const, stiffness: 450, damping: 25 },
            },
      whileTap:
        isReducedMotion || disabled
          ? undefined
          : {
              scale: 0.98,
              y: 0,
              transition: { type: 'spring' as const, stiffness: 500, damping: 25 },
            },
    };

    const combinedClassName = `group relative inline-flex items-center justify-center gap-2.5 font-['Cinzel'] font-semibold uppercase whitespace-nowrap rounded-[5px] transition-colors duration-200 ease-out select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59f4e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070908] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${sizeClasses} ${variantClasses} ${className}`;

    const innerContent = (
      <>
        {/* Subtle Inner Sheen */}
        <span
          className="absolute inset-0 rounded-[4px] bg-gradient-to-t from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none"
          aria-hidden="true"
        />

        {/* Leading Icon */}
        {icon && (
          <span className="shrink-0 transition-transform duration-200 ease-out group-hover:scale-110">
            {icon}
          </span>
        )}

        {/* Button Label */}
        <span className="truncate relative z-10">{children}</span>

        {/* Trailing Directional Arrow with Spring Motion */}
        {showArrow && (
          <motion.span
            className="shrink-0 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5 text-[#c59f4e] relative z-10"
            aria-hidden="true"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.span>
        )}
      </>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          target={target ?? (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel ?? (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          className={combinedClassName}
          {...sharedMotionProps}
        >
          {innerContent}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        className={combinedClassName}
        {...sharedMotionProps}
        {...props}
      >
        {innerContent}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
