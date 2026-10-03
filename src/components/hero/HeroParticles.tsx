/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: 'gold' | 'emerald' | 'diamond';
}

/**
 * Lightweight atmospheric ambient particles (spores / fireflies).
 * Strictly limited in count (~16 total) and purely GPU-accelerated for smooth 60fps
 * on low-end machines and full accessibility with prefers-reduced-motion.
 */
export function HeroParticles() {
  const particles = useMemo<Particle[]>(() => {
    const items: Particle[] = [];
    const colors: ('gold' | 'emerald' | 'diamond')[] = ['gold', 'emerald', 'diamond'];

    // Exactly 16 particles for peak performance
    for (let i = 0; i < 16; i++) {
      items.push({
        id: i,
        x: Math.round(((i * 6.25 + 3.1) % 100) * 10) / 10,
        y: Math.round(((i * 7.1 + 12) % 90) * 10) / 10,
        size: i % 3 === 0 ? 3 : 2,
        duration: 9 + (i % 7) * 2,
        delay: (i * 0.8) % 6,
        opacity: 0.25 + (i % 4) * 0.15,
        color: colors[i % colors.length],
      });
    }
    return items;
  }, []);

  const colorMap = {
    gold: 'bg-[#e6ce8a] shadow-[0_0_8px_rgba(230,206,138,0.6)]',
    emerald: 'bg-[#4f9b77] shadow-[0_0_8px_rgba(79,155,119,0.5)]',
    diamond: 'bg-[#6fe0fa] shadow-[0_0_8px_rgba(111,224,250,0.6)]',
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-20"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full transition-opacity will-change-transform ${colorMap[p.color]}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `sporeDrift ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
