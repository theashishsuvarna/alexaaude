import React from 'react';

interface MemberAvatarProps {
  member?: {
    id?: string;
    name?: string;
    nickname?: string;
    role?: string;
  } | null;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showStatusIndicator?: boolean;
  status?: string;
  rounded?: 'full' | 'xl' | '2xl';
}

export const MemberAvatar: React.FC<MemberAvatarProps> = ({
  member,
  name: explicitName,
  size = 'md',
  className = '',
  showStatusIndicator = false,
  status,
  rounded = 'full',
}) => {
  const memberName = explicitName || member?.name || member?.nickname || 'Family Member';
  const memberId = member?.id?.toLowerCase() || memberName.toLowerCase();
  const role = member?.role?.toLowerCase() || '';

  // Get clean initials
  let initials = 'FM';
  let diffBadge: React.ReactNode = null;

  if (memberId.includes('virat')) {
    initials = 'VK';
  } else if (memberId.includes('anushka')) {
    initials = 'AS';
  } else if (memberId.includes('vamika')) {
    // Differentiate Vamika from Virat (both VK) with stylized dot/glyph
    initials = 'V·K';
  } else if (memberId.includes('akaay')) {
    initials = 'AK';
  } else {
    const parts = memberName.trim().split(/\s+/);
    if (parts.length >= 2) {
      initials = `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    } else if (parts[0]) {
      initials = parts[0].slice(0, 2).toUpperCase();
    }
  }

  // Size styling map
  const sizeClasses = {
    xs: 'h-4 w-4 text-[8px] font-bold',
    sm: 'h-6 w-6 text-[10px] font-bold',
    md: 'h-8 w-8 text-xs font-bold',
    lg: 'h-10 w-10 text-xs font-bold',
    xl: 'h-12 w-12 text-sm font-bold',
    '2xl': 'h-14 w-14 text-base font-bold',
  };

  const roundedClasses = {
    full: 'rounded-full',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };

  // Professional, distinctive color identities per family member
  let colorTheme = 'bg-slate-900 text-slate-100 border-slate-700';

  if (memberId.includes('virat')) {
    // Father: Deep Indigo / Midnight Navy with crisp architectural blue border
    colorTheme = 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-indigo-100 border border-indigo-700/60 shadow-xs';
  } else if (memberId.includes('anushka')) {
    // Mother: Rich Wine / Rose Bronze with subtle warm border
    colorTheme = 'bg-gradient-to-br from-stone-900 via-rose-950 to-stone-900 text-rose-100 border border-rose-700/60 shadow-xs';
  } else if (memberId.includes('vamika')) {
    // Daughter: Vibrant Emerald / Deep Forest Teal with mint accent
    colorTheme = 'bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 text-emerald-200 border border-emerald-600/60 shadow-xs';
  } else if (memberId.includes('akaay')) {
    // Son / Toddler: Soft Cyan / Sky Azure with crisp arctic border
    colorTheme = 'bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 text-sky-200 border border-sky-600/60 shadow-xs';
  }

  const indicatorSize = size === '2xl' || size === 'xl' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2';

  return (
    <div className={`relative inline-flex items-center justify-center select-none flex-shrink-0 ${className}`}>
      <div
        className={`${sizeClasses[size]} ${roundedClasses[rounded]} ${colorTheme} flex items-center justify-center font-mono tracking-tight transition-transform duration-150`}
        title={memberName}
      >
        <span>{initials}</span>
      </div>

      {showStatusIndicator && status && (
        <span
          className={`absolute bottom-0 right-0 ${indicatorSize} rounded-full ring-2 ring-white ${
            status === 'working' || status === 'client_meeting'
              ? 'bg-blue-500'
              : status === 'school'
              ? 'bg-amber-500'
              : 'bg-emerald-500'
          }`}
        />
      )}
    </div>
  );
};
