import React from 'react';

interface AlexaAudeMarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'dark' | 'light' | 'gradient';
}

/**
 * AlexaAude Mark — abstract symbol representing family connection + intelligence.
 *
 * Design concept: three nodes arranged in a constellation, connected by lines,
 * with a subtle radial center. Evokes people, relationships, and networked
 * intelligence without referencing microphones, speakers, or voice UI.
 */
export const AlexaAudeMark: React.FC<AlexaAudeMarkProps> = ({
  size = 'md',
  className = '',
}) => {
  const pixelSizes = { sm: 20, md: 28, lg: 36, xl: 44 };
  const dim = pixelSizes[size];

  return (
    <div
      className={`inline-flex items-center justify-center relative flex-shrink-0 select-none ${className}`}
      style={{ width: dim, height: dim }}
      aria-label="AlexaAude"
    >
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Dark rounded-square base */}
        <rect x="1" y="1" width="34" height="34" rx="9" fill="#0F172A" />

        {/*
          Constellation symbol:
          - Three nodes: top-center, bottom-left, bottom-right
          - Connection lines between them
          - A small central node where the family converges
        */}

        {/* Connection lines — rendered behind nodes */}
        {/* Top to bottom-left */}
        <line x1="18" y1="10" x2="11" y2="24" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
        {/* Top to bottom-right */}
        <line x1="18" y1="10" x2="25" y2="24" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
        {/* Bottom-left to bottom-right */}
        <line x1="11" y1="24" x2="25" y2="24" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
        {/* Center connections */}
        <line x1="18" y1="10" x2="18" y2="19" stroke="#334155" strokeWidth="1" strokeLinecap="round" />
        <line x1="11" y1="24" x2="18" y2="19" stroke="#334155" strokeWidth="1" strokeLinecap="round" />
        <line x1="25" y1="24" x2="18" y2="19" stroke="#334155" strokeWidth="1" strokeLinecap="round" />

        {/* Outer nodes — family members */}
        <circle cx="18" cy="10" r="2.8" fill="#60A5FA" />
        <circle cx="11" cy="24" r="2.8" fill="#818CF8" />
        <circle cx="25" cy="24" r="2.8" fill="#34D399" />

        {/* Central intelligence node */}
        <circle cx="18" cy="19" r="2" fill="#F1F5F9" />
        <circle cx="18" cy="19" r="1" fill="#0F172A" />
      </svg>
    </div>
  );
};


interface AiInsightTagProps {
  label?: string;
  type?: 'insight' | 'smarthome' | 'family' | 'shopping' | 'travel' | 'treasury';
  className?: string;
}

/**
 * Standardized AI insight badge — minimal, no pulsing animations.
 */
export const AiInsightTag: React.FC<AiInsightTagProps> = ({
  label,
  type = 'insight',
  className = '',
}) => {
  const configs = {
    insight: {
      defaultLabel: 'AI INSIGHT',
      bg: 'bg-slate-900 text-slate-300 border-slate-700',
      dot: 'bg-blue-400',
    },
    smarthome: {
      defaultLabel: 'SMART HOME',
      bg: 'bg-slate-900 text-blue-300 border-slate-700',
      dot: 'bg-blue-400',
    },
    family: {
      defaultLabel: 'FAMILY',
      bg: 'bg-slate-900 text-indigo-300 border-slate-700',
      dot: 'bg-indigo-400',
    },
    shopping: {
      defaultLabel: 'SHOPPING',
      bg: 'bg-slate-900 text-emerald-300 border-slate-700',
      dot: 'bg-emerald-400',
    },
    travel: {
      defaultLabel: 'TRAVEL',
      bg: 'bg-slate-900 text-amber-300 border-slate-700',
      dot: 'bg-amber-400',
    },
    treasury: {
      defaultLabel: 'TREASURY',
      bg: 'bg-slate-900 text-purple-300 border-slate-700',
      dot: 'bg-purple-400',
    },
  };

  const current = configs[type] ?? configs.insight;
  const displayLabel = label || current.defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold tracking-wider uppercase border ${current.bg} ${className}`}
    >
      <span className={`h-1 w-1 rounded-full ${current.dot}`} />
      <span>{displayLabel}</span>
    </span>
  );
};
