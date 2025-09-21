import React from 'react';

const iconProps = {
  className: "w-8 h-8",
  strokeWidth: 2,
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};

// Completion Icon
export const CheckmarkIcon: React.FC = () => (
    <svg className="w-5 h-5 text-white" strokeWidth={3} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// General Icons
export const ExternalLinkIcon: React.FC = () => (
    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

export const StorybookOpenIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.125c0-3.337 2.688-6.042 6-6.042h6.75a.75.75 0 000-1.5H8.25c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h6.75a.75.75 0 000-1.5H8.25c-3.313 0-6-2.705-6-6.042zM21.75 12.125c0 3.337-2.688 6.042-6 6.042H9a.75.75 0 000 1.5h6.75c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5H9a.75.75 0 000 1.5h6.75c3.313 0 6 2.705 6 6.042z" />
    </svg>
);

// Kanda Icons
export const BookIcon: React.FC = () => (
  <svg {...iconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-3 0V7.75a1.5 1.5 0 011.5-1.5zM5.25 4.5A2.25 2.25 0 017.5 2.25h9A2.25 2.25 0 0118.75 4.5v15A2.25 2.25 0 0116.5 21.75h-9A2.25 2.25 0 015.25 19.5v-15z" />
  </svg>
);

export const CrownIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25l2.25-2.25 3 3 3-3 2.25 2.25M5.25 12l2.25 2.25 3-3 3 3 2.25-2.25M3 15h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15V6a2.25 2.25 0 012.25-2.25h10.5A2.25 2.25 0 0119.5 6v9" />
    </svg>
);

export const ForestIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.75l-7.5-7.5-7.5 7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V5.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 15.75l6-6 6 6" />
    </svg>
);

export const MonkeyIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75c-2.488 0-4.5-2.012-4.5-4.5s2.012-4.5 4.5-4.5 4.5 2.012 4.5 4.5-2.012 4.5-4.5 4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 000-1.5.75.75 0 000 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zM8.25 10.5s.75-3 3.75-3 3.75 3 3.75 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15.75a4.5 4.5 0 006 0" />
    </svg>
);

export const LeapIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l7.5-7.5 7.5 7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.5l7.5-7.5 7.5 7.5" />
    </svg>
);

export const WarIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0-15l-15 15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v19.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5" />
    </svg>
);

export const ScrollIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5c0 .621.504 1.125 1.125 1.125h14.25c.621 0 1.125-.504 1.125-1.125V3.75M3.75 3.75c0-1.328 1.072-2.375 2.375-2.375h11.25C18.673 1.375 19.75 2.422 19.75 3.75M12 1.375v2.375" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h9" />
    </svg>
);


// Character Icons
export const BowIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 4.5l-3.375 3.375m0 0l-3.375 3.375M12.375 7.875l3.375 3.375" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.375 21a8.25 8.25 0 01-8.25-8.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.625A8.25 8.25 0 0112.75 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 3L3 21" />
    </svg>
);

export const LotusIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-3.866 0-7-1.79-7-4 0-1.334 1.115-2.535 2.768-3.232m11.464 3.232C19.885 18.465 21 19.666 21 21c0 2.21-3.134 4-7 4s-7-1.79-7-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a4.5 4.5 0 00-4.5 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 17.25a4.5 4.5 0 00-4.5-4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 17c0-2.21 3.134-4 7-4s7 1.79 7 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 13c-1.933 0-3.5-1.79-3.5-4s1.567-4 3.5-4 3.5 1.79 3.5 4-1.567 4-3.5 4z" />
    </svg>
);

export const MaceIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v4.5m0 10.5v4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-4.5m-10.5 0H2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.364 6.636l-3.182 3.182m-6.364 0L4.636 6.636m12.728 9.546l-3.182-3.182m-6.364 0l-3.182 3.182" />
    </svg>
);

export const TenHeadsIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.5h-6a1.5 1.5 0 01-1.5-1.5v-1.5a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V6.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75a3 3 0 013-3h1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 6.75h1.5a3 3 0 013 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5a2.25 2.25 0 012.25-2.25h1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 2.25h1.5a2.25 2.25 0 012.25 2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 4.5a2.25 2.25 0 012.25-2.25h1.5" />
    </svg>
);

// Theme Icons
export const DharmaWheelIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m-6.75-9.75H3m18 0h-2.25m-11.25-4.5L5.625 5.625m12.75 0l-2.121 2.121M5.625 18.375l2.121-2.121m8.623-8.623l2.121-2.121" />
    </svg>
);

export const DivineIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l-1.5 1.5-1.5-1.5-1.5 1.5-1.5-1.5-1.5 1.5M11.25 19.5l-1.5-1.5-1.5 1.5-1.5-1.5-1.5 1.5-1.5-1.5M16.5 9.75l1.5-1.5 1.5 1.5 1.5-1.5 1.5 1.5 1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
    </svg>
);

export const BalanceIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-7.5-6h15M3 7.5h6.375c.621 0 1.125.504 1.125 1.125V12m0 0h-2.25m2.25 0V9.375c0-.621.504-1.125 1.125-1.125H21" />
    </svg>
);

export const TempleIcon: React.FC = () => (
    <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21V10.5h16.5V21" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 21v-6.75h3v6.75m3.75 0v-6.75h3v6.75" />
    </svg>
);

// Theme Toggle Icons
export const SunIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 100-10 5 5 0 000 10z" />
    </svg>
);

export const MoonIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className || "w-6 h-6"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);
