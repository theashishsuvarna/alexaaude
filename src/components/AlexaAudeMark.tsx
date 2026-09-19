import React from 'react';

interface AlexaAudeMarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'dark' | 'light' | 'gradient';
}

/**
 * Refined AlexaAude AI Mark:
 * Combines voice wave dynamics, AI intelligence spark, and smart home connectivity.
 */
export const AlexaAudeMark: React.FC<AlexaAudeMarkProps> = ({
  size = 'md',
  className = '',
  variant = 'dark',
}) => {
  const pixelSizes = {
    sm: 20,
    md: 28,
    lg: 36,
    xl: 44,
  };

  const dim = pixelSizes[size];

  return (
    <div
      className={`inline-flex items-center justify-center relative flex-shrink-0 select-none ${className}`}
      style={{ width: dim, height: dim }}
      aria-label="AlexaAude AI Mark"
    >
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle acoustic gradient */}
          <linearGradient id="alexaWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>

          {/* Core spark gradient */}
          <radialGradient id="sparkGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Base dark housing */}
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="10"
          fill="#0F172A"
          stroke="#1E293B"
          strokeWidth="1.2"
        />

        {/* Outer subtle orbital ring (Alexa voice-ring echo) */}
        <circle
          cx="18"
          cy="18"
          r="14"
          stroke="url(#alexaWaveGrad)"
          strokeWidth="1"
          strokeDasharray="1.5 2.5"
          opacity="0.55"
        />

        {/* 4 Voice wave frequency bars */}
        {/* Left bar (ambient) */}
        <rect x="9" y="15" width="2.2" height="6" rx="1.1" fill="#38BDF8" opacity="0.85" />

        {/* Mid-left bar (voice resonance) */}
        <rect x="13.5" y="10.5" width="2.2" height="15" rx="1.1" fill="#60A5FA" />

        {/* Mid-right bar (voice resonance) */}
        <rect x="20.3" y="10.5" width="2.2" height="15" rx="1.1" fill="#60A5FA" />

        {/* Right bar (ambient) */}
        <rect x="24.8" y="15" width="2.2" height="6" rx="1.1" fill="#38BDF8" opacity="0.85" />

        {/* Central 4-pointed AI intelligence spark */}
        <path
          d="M18 7 C18 12.5 12.5 18 7 18 C12.5 18 18 23.5 18 29 C18 23.5 23.5 18 29 18 C23.5 18 18 12.5 18 7 Z"
          fill="url(#alexaWaveGrad)"
          opacity="0.3"
        />

        {/* Sharp core micro spark */}
        <path
          d="M18 13.5 L19 17 L22.5 18 L19 19 L18 22.5 L17 19 L13.5 18 L17 17 Z"
          fill="#E0F2FE"
        />

        {/* Home node dot at base */}
        <circle cx="18" cy="28.5" r="1.2" fill="#38BDF8" />
      </svg>
    </div>
  );
};

interface AiInsightTagProps {
  label?: string;
  type?: 'insight' | 'smarthome' | 'family' | 'shopping' | 'travel' | 'treasury' | 'voice';
  className?: string;
}

/**
 * Standardized AI Visual Language Badge
 */
export const AiInsightTag: React.FC<AiInsightTagProps> = ({
  label,
  type = 'insight',
  className = '',
}) => {
  const configs = {
    insight: {
      defaultLabel: 'ALEXAAUDE AI INSIGHT',
      bg: 'bg-slate-900 text-cyan-300 border-slate-800',
      dot: 'bg-cyan-400',
    },
    smarthome: {
      defaultLabel: 'SMART HOME AI',
      bg: 'bg-slate-900 text-blue-300 border-slate-800',
      dot: 'bg-blue-400',
    },
    family: {
      defaultLabel: 'FAMILY AI',
      bg: 'bg-slate-900 text-indigo-300 border-slate-800',
      dot: 'bg-indigo-400',
    },
    shopping: {
      defaultLabel: 'SHOPPING PREDICTION AI',
      bg: 'bg-slate-900 text-emerald-300 border-slate-800',
      dot: 'bg-emerald-400',
    },
    travel: {
      defaultLabel: 'TRAVEL AI',
      bg: 'bg-slate-900 text-amber-300 border-slate-800',
      dot: 'bg-amber-400',
    },
    treasury: {
      defaultLabel: 'TREASURY AI',
      bg: 'bg-slate-900 text-purple-300 border-slate-800',
      dot: 'bg-purple-400',
    },
    voice: {
      defaultLabel: 'VOICE INTELLIGENCE',
      bg: 'bg-slate-900 text-sky-300 border-slate-800',
      dot: 'bg-sky-400',
    },
  };

  const current = configs[type] || configs.insight;
  const displayLabel = label || current.defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold tracking-wider uppercase border ${current.bg} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot} animate-pulse`} />
      <span>{displayLabel}</span>
    </span>
  );
};
