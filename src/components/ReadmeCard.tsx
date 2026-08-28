import React from 'react';
import type { ProfileField } from '../types';

interface ReadmeCardProps {
  username: string;
  asciiArt: string;
  fields: ProfileField[];
  cardBgColor?: string;
  asciiFontSize?: number;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ReadmeCard({
  username,
  asciiArt,
  fields,
  cardBgColor = '#0d1117',
  asciiFontSize = 7,
  cardRef,
}: ReadmeCardProps) {
  const maxKeyLen = Math.max(
    ...fields.filter((f) => !f.isSectionHeader).map((f) => f.key.length + 1),
    16
  );

  return (
    <div
      ref={cardRef}
      id="readme-card-container"
      style={{ backgroundColor: cardBgColor }}
      className="p-4 sm:p-6 rounded-xl text-neutral-100 font-mono select-none shadow-2xl border border-white/10 w-max max-w-none"
    >
      <div className="flex flex-row items-center gap-6 md:gap-8">
        
        {/* ASCII Art */}
        <div className="flex-shrink-0 flex items-center justify-center overflow-hidden">
          <pre
            className="ascii-art text-[#e6edf3] font-normal text-center"
            style={{
              fontSize: `${asciiFontSize}px`,
              lineHeight: 1.02,
            }}
          >
            {asciiArt || '  (upload a photo to generate)  '}
          </pre>
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col justify-center min-w-[320px] text-xs sm:text-[13px] leading-relaxed">
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#3fb950] font-bold">@{username || 'user'}</span>
            <span className="text-[#484f58] tracking-tighter flex-1 overflow-hidden whitespace-nowrap">
              ────────────────────────────────────────────
            </span>
          </div>

          <div className="space-y-1">
            {fields.map((field) => {
              if (field.isSectionHeader) {
                return (
                  <div key={field.id} className="pt-3 pb-1 flex items-center gap-2">
                    <span className="text-[#3fb950] font-semibold">- {field.key}</span>
                    <span className="text-[#484f58] tracking-tighter flex-1 overflow-hidden whitespace-nowrap">
                      ────────────────────────────────────────────
                    </span>
                  </div>
                );
              }

              const dotCount = Math.max(maxKeyLen - field.key.length + 12, 4);
              const dots = '.'.repeat(dotCount);

              return (
                <div key={field.id} className="flex items-center gap-2 font-mono">
                  <span className="text-[#484f58] text-[10px]">•</span>
                  <span className="text-[#f0883e] font-medium whitespace-nowrap">
                    {field.key}:
                  </span>
                  <span className="text-[#484f58] tracking-widest text-[11px] select-none">
                    {dots}
                  </span>
                  <span className="text-[#58a6ff] whitespace-nowrap">
                    {field.value}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
