import React from 'react';

interface AlexaAudeMarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'dark' | 'light' | 'gradient';
}

/**
 * AlexaAude Brand Mark:
 * Pure geometric symbol communicating Family + Connection + Intelligence.
 * Three interrelated orbital nodes converging gracefully at a central nucleus,
 * representing household cohesion and contextual AI intelligence.
 * No waveforms, no microphones, no neon/cyberpunk elements.
 */
export const AlexaAudeMark: React.FC<AlexaAudeMarkProps> = ({
  size = 'md',
  className = '',
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
      aria-label="AlexaAude Brand Mark"
    >
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="aaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>

        {/* Outer housing container */}
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="9"
          fill="#0F172A"
          stroke="#1E293B"
          strokeWidth="1.2"
        />

        {/* Interconnected Family & Intelligence Orbital Geometry */}
        {/* Top Node & Connective Arc */}
        <circle cx="18" cy="11.5" r="3.2" fill="#38BDF8" />
        <path
          d="M18 14.7 C18 16.5 14.5 19 12 21"
          stroke="#60A5FA"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Bottom Left Node & Connective Arc */}
        <circle cx="11.5" cy="22.5" r="3" fill="#60A5FA" />
        <path
          d="M14.5 22.5 C16.5 22.5 19.5 22.5 21.5 22.5"
          stroke="#93C5FD"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Bottom Right Node & Connective Arc */}
        <circle cx="24.5" cy="22.5" r="3" fill="#3B82F6" />
        <path
          d="M23 20 C21 18 18 15 18 14.7"
          stroke="#60A5FA"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Central Connected Core (Intelligence Nucleus) */}
        <circle cx="18" cy="18.5" r="2.2" fill="#FFFFFF" />
        <circle
          cx="18"
          cy="18.5"
          r="4.5"
          stroke="#38BDF8"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.75"
        />
      </svg>
    </div>
  );
};

interface AiInsightTagProps {
  label?: string;
  type?: 'insight' | 'smarthome' | 'family' | 'shopping' | 'travel' | 'treasury' | 'orchestrator' | 'proactive';
  className?: string;
}

/**
 * Standardized AI & Household Intelligence Tag
 */
export const AiInsightTag: React.FC<AiInsightTagProps> = ({
  label,
  type = 'insight',
  className = '',
}) => {
  const configs = {
    insight: {
      defaultLabel: 'ALEXAAUDE INTELLIGENCE',
      bg: 'bg-slate-900 text-sky-300 border-slate-800',
      dot: 'bg-sky-400',
    },
    smarthome: {
      defaultLabel: 'HOME OPERATIONS',
      bg: 'bg-slate-900 text-blue-300 border-slate-800',
      dot: 'bg-blue-400',
    },
    family: {
      defaultLabel: 'FAMILY CONTEXT',
      bg: 'bg-slate-900 text-indigo-300 border-slate-800',
      dot: 'bg-indigo-400',
    },
    shopping: {
      defaultLabel: 'BUYING BRAIN',
      bg: 'bg-slate-900 text-emerald-300 border-slate-800',
      dot: 'bg-emerald-400',
    },
    travel: {
      defaultLabel: 'FAMILY TRAVEL',
      bg: 'bg-slate-900 text-amber-300 border-slate-800',
      dot: 'bg-amber-400',
    },
    treasury: {
      defaultLabel: 'FINANCIAL BRAIN',
      bg: 'bg-slate-900 text-purple-300 border-slate-800',
      dot: 'bg-purple-400',
    },
    orchestrator: {
      defaultLabel: 'FAMILY INTELLIGENCE',
      bg: 'bg-slate-900 text-cyan-300 border-slate-800',
      dot: 'bg-cyan-400',
    },
    proactive: {
      defaultLabel: 'PROACTIVE PLANNING',
      bg: 'bg-slate-900 text-emerald-300 border-slate-800',
      dot: 'bg-emerald-400',
    },
  };

  const current = (configs as any)[type] || configs.insight;
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
