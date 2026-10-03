/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface MetadataItem {
  label?: string;
  value: React.ReactNode;
}

interface MetadataRowProps {
  items: (string | React.ReactNode | MetadataItem)[];
  separator?: string;
  className?: string;
}

/**
 * Zero-Pill Metadata Discipline Component
 * Renders informational tags, statuses, and specs as clean unboxed text
 * separated by subtle typographic glyphs (·, /, -) rather than candy-colored pill chips.
 */
export function MetadataRow({ items, separator = '·', className = '' }: MetadataRowProps) {
  const filtered = items.filter(Boolean);

  return (
    <div className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#798881] font-sans ${className}`}>
      {filtered.map((item, index) => {
        const isLast = index === filtered.length - 1;
        const content =
          typeof item === 'object' && item !== null && 'value' in item ? (
            <span>
              {item.label && <span className="text-[#56635e] mr-1">{item.label}:</span>}
              <span className="text-[#b4c0ba]">{item.value}</span>
            </span>
          ) : (
            <span className="text-[#b4c0ba]">{item as React.ReactNode}</span>
          );

        return (
          <React.Fragment key={index}>
            <span className="inline-flex items-center">{content}</span>
            {!isLast && (
              <span className="text-[#4e5a55] select-none text-[10px]" aria-hidden="true">
                {separator}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
