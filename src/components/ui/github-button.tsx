'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { GithubLogo } from '@phosphor-icons/react';
import { type Colors, Liquid } from '@/components/ui/liquid-gradient';
import { cn } from '@/lib/utils';

const COLORS: Colors = {
  color1: '#FFFFFF',
  color2: '#1E10C5',
  color3: '#9089E2',
  color4: '#FCFCFE',
  color5: '#F9F9FD',
  color6: '#B2B8E7',
  color7: '#0E2DCB',
  color8: '#0017E9',
  color9: '#4743EF',
  color10: '#7D7BF4',
  color11: '#0B06FC',
  color12: '#C5C1EA',
  color13: '#1403DE',
  color14: '#B6BAF6',
  color15: '#C1BEEB',
  color16: '#290ECB',
  color17: '#3F4CC0',
};

interface GitHubButtonProps {
  href?: string;
  className?: string;
}

export const GitHubButton: React.FC<GitHubButtonProps> = ({
  href = 'https://github.com/GitHpriyanshu23/priyanshu-portfolio',
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="group relative inline-flex items-center justify-center w-36 h-10 select-none cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Star Priyanshu's portfolio on GitHub"
      >
        {/* Ambient colored backdrop glow (no grey box/corners) */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-40 blur-md transition-all duration-500 group-hover:opacity-75 group-hover:blur-lg pointer-events-none" />

        {/* Outer subtle shadow */}
        <div className="absolute inset-0 rounded-xl bg-black/40 blur-sm pointer-events-none" />

        {/* Main button body with clean rounded clipping */}
        <div className="relative w-full h-full overflow-hidden rounded-xl border border-white/25 bg-[#030318] shadow-inner transition-transform duration-200 active:scale-95 pointer-events-none">
          {/* Base dark backdrop */}
          <span className="absolute inset-0 bg-[#060621] rounded-xl" />

          {/* Liquid gradient canvas */}
          <div className="absolute inset-0 overflow-hidden rounded-xl opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            <Liquid isHovered={isHovered} colors={COLORS} />
          </div>

          {/* Edge gloss / spark overlay */}
          <span className="absolute inset-0 rounded-xl border border-white/30 mix-blend-overlay pointer-events-none" />
          <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
        </div>

        {/* Interactive content layer */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 px-3 z-10 pointer-events-none">
          {/* Morphing Icon: GitHub -> Star on hover */}
          <div className="relative flex items-center justify-center size-5 shrink-0">
            <GithubLogo
              weight="fill"
              className={cn(
                'absolute inset-0 size-5 text-white fill-white transition-all duration-300 ease-out',
                isHovered
                  ? 'scale-0 rotate-[-45deg] opacity-0'
                  : 'scale-100 rotate-0 opacity-100 group-hover:scale-0 group-hover:rotate-[-45deg] group-hover:opacity-0'
              )}
            />
            <Star
              className={cn(
                'absolute inset-0 size-5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,1)] transition-all duration-300 ease-out',
                isHovered
                  ? 'scale-100 rotate-0 opacity-100'
                  : 'scale-0 rotate-45 opacity-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100'
              )}
            />
          </div>

          {/* Text with hover color highlight */}
          <span className={cn(
            'text-sm font-semibold tracking-wide text-white transition-colors duration-300',
            isHovered ? 'text-yellow-400' : 'group-hover:text-yellow-400'
          )}>
            GitHub
          </span>
        </div>
      </a>
    </div>
  );
};

export default GitHubButton;
