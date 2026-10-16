/* ==========================================================================
   TRADINGVIEW DRAWING TOOLBAR SVG ICONS
   All icons have a default size of 20
   ========================================================================== */

/* --------------------------------------------------------------------------
   CURSOR & MAIN TOOLBAR UTILITIES
   -------------------------------------------------------------------------- */

export const CrosshairIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="12" y1="3.5" x2="12" y2="8.5" />
    <line x1="12" y1="15.5" x2="12" y2="20.5" />
    <line x1="3.5" y1="12" x2="8.5" y2="12" />
    <line x1="15.5" y1="12" x2="20.5" y2="12" />
  </svg>
);

export const MeasureRulerIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m5 19 14-14a2.12 2.12 0 0 0-3-3L2 16a2.12 2.12 0 0 0 3 3Z" />
    <line x1="6.5" y1="11.5" x2="8.5" y2="13.5" />
    <line x1="9.5" y1="8.5" x2="11.5" y2="10.5" />
    <line x1="12.5" y1="5.5" x2="14.5" y2="7.5" />
  </svg>
);

export const ZoomInIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="10.5" cy="10.5" r="6" />
    <line x1="10.5" y1="8" x2="10.5" y2="13" />
    <line x1="8" y1="10.5" x2="13" y2="10.5" />
    <line x1="15" y1="15" x2="20" y2="20" />
  </svg>
);

export const MagnetToolIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6 18V9a6 6 0 0 1 12 0v9h-3.5V9a2.5 2.5 0 0 0-5 0v9H6Z" />
    <line x1="6" y1="14" x2="9.5" y2="14" />
    <line x1="14.5" y1="14" x2="18" y2="14" />
  </svg>
);

export const PencilLockIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m14 3.5 3.5 3.5L7 17.5 2.5 19l1.5-4.5Z" />
    <rect x="13" y="14" width="7" height="6" rx="1.5" strokeWidth="1.2" />
    <path d="M15 14v-2a1.5 1.5 0 0 1 3 0v2" strokeWidth="1.2" />
  </svg>
);

export const UnlockAllIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="6" y="11" width="12" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v1" />
    <line x1="12" y1="14.5" x2="12" y2="16.5" />
  </svg>
);

export const LockAllIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="6" y="11" width="12" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <line x1="12" y1="14.5" x2="12" y2="16.5" />
  </svg>
);

export const EyeBrushIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2 10s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="10" r="2.5" />
    <path d="m16 17 4 4" strokeWidth="1.2" />
    <path d="m18 15 2 2" strokeWidth="1.2" />
  </svg>
);

export const EyeOffIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

export const BrushToolIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4.5 18c.5-3.5 3-7 8-8 .5 3.5-1 7.5-5 9-1.5.5-3-.5-3-1Z" />
    <path d="M12.5 10.5c1.5-1.5 2.5-1.5 3.5 0s1.5 2.5 3.5 1" />
  </svg>
);

export const TextSerifIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6 8.5V6h12v2.5" />
    <path d="M12 6v12" />
    <path d="M8.5 18h7" />
  </svg>
);

export const SmileyFaceIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="9.5" cy="10" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="10" r="0.8" fill="currentColor" stroke="none" />
    <path d="M9 14a4 4 0 0 0 6 0" />
  </svg>
);

/* --------------------------------------------------------------------------
   IMAGE 1: LINES & CHANNELS
   -------------------------------------------------------------------------- */

export const TrendLineIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="18" r="1.8" />
    <circle cx="18" cy="6" r="1.8" />
    <line x1="7.4" y1="16.6" x2="16.6" y2="7.4" />
  </svg>
);

export const RayIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="18" r="1.8" />
    <circle cx="13" cy="11" r="1.8" />
    <line x1="7.4" y1="16.6" x2="11.6" y2="12.4" />
    <line x1="14.4" y1="9.6" x2="20" y2="4" />
  </svg>
);

export const InfoLineIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="18" r="1.8" />
    <circle cx="18" cy="6" r="1.8" />
    <line x1="7.4" y1="16.6" x2="16.6" y2="7.4" />
    <rect x="7" y="14" width="7" height="4.5" rx="1.5" strokeWidth="1.5" />
  </svg>
);

export const ExtendedLineIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="3" y1="21" x2="21" y2="3" />
    <circle cx="9" cy="15" r="1.8" />
    <circle cx="15" cy="9" r="1.8" />
  </svg>
);

export const TrendAngleIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="18" r="1.8" />
    <circle cx="18" cy="7" r="1.8" />
    <line x1="7.4" y1="16.6" x2="16.6" y2="8.4" />
    <line x1="7.8" y1="18" x2="19" y2="18" />
    <path d="M12 18a6 6 0 0 0-2-3.8" strokeWidth="1.5" />
  </svg>
);

export const HorizontalLineIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="3" y1="12" x2="10" y2="12" />
    <circle cx="12" cy="12" r="1.8" />
    <line x1="14" y1="12" x2="21" y2="12" />
  </svg>
);

export const HorizontalRayIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="12" r="1.8" />
    <line x1="8" y1="12" x2="21" y2="12" />
  </svg>
);

export const VerticalLineIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="12" y1="3" x2="12" y2="10" />
    <circle cx="12" cy="12" r="1.8" />
    <line x1="12" y1="14" x2="12" y2="21" />
  </svg>
);

export const CrossLineIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="12" y1="3" x2="12" y2="10" />
    <line x1="12" y1="14" x2="12" y2="21" />
    <line x1="3" y1="12" x2="10" y2="12" />
    <line x1="14" y1="12" x2="21" y2="12" />
    <circle cx="12" cy="12" r="1.8" />
  </svg>
);

export const ParallelChannelIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="18" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="17" cy="8" r="1.6" />
    <line x1="7.2" y1="16.8" x2="10.8" y2="13.2" />
    <line x1="13.2" y1="10.8" x2="19" y2="5" />
    <line x1="5" y1="13" x2="15.8" y2="2.2" />
  </svg>
);

export const RegressionTrendIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="6" y1="18" x2="18" y2="11.5" />
    <line x1="6" y1="13.5" x2="18" y2="7" />
    <line x1="6" y1="13.5" x2="6" y2="18" />
    <line x1="18" y1="7" x2="18" y2="11.5" />
    <circle cx="6" cy="18" r="1.6" />
    <circle cx="18" cy="7" r="1.6" />
  </svg>
);

export const FlatTopBottomIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="18" r="1.6" />
    <circle cx="18" cy="18" r="1.6" />
    <line x1="7.8" y1="18" x2="16.2" y2="18" />
    <circle cx="6" cy="14" r="1.6" />
    <circle cx="18" cy="7" r="1.6" />
    <line x1="7.4" y1="13.2" x2="16.6" y2="7.8" />
  </svg>
);

export const DisjointChannelIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="13.5" r="1.6" />
    <circle cx="18" cy="6" r="1.6" />
    <line x1="7.4" y1="12.8" x2="16.6" y2="6.8" />
    <circle cx="6" cy="16.5" r="1.6" />
    <circle cx="18" cy="20" r="1.6" />
    <line x1="7.4" y1="16.8" x2="16.6" y2="19.7" />
  </svg>
);

/* --------------------------------------------------------------------------
   IMAGE 2: FIBONACCI
   -------------------------------------------------------------------------- */

export const FibonacciLinesIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="4" y1="6" x2="16.5" y2="6" />
    <circle cx="18" cy="6" r="1.5" />
    <line x1="4" y1="10" x2="17" y2="10" />
    <line x1="4" y1="14" x2="17" y2="14" />
    <circle cx="5.5" cy="18" r="1.5" />
    <line x1="7" y1="18" x2="17" y2="18" />
  </svg>
);

export const FibExtensionIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="5" cy="18" r="1.5" />
    <circle cx="11" cy="7" r="1.5" />
    <line x1="6.2" y1="16.8" x2="9.8" y2="8.2" />
    <line x1="5" y1="11" x2="19" y2="11" />
    <line x1="5" y1="14.5" x2="19" y2="14.5" />
    <line x1="6.8" y1="18" x2="19" y2="18" />
  </svg>
);

export const FibChannelIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="5" cy="18" r="1.5" />
    <circle cx="18" cy="8" r="1.5" />
    <line x1="6.2" y1="17.2" x2="16.8" y2="8.8" />
    <circle cx="5" cy="13" r="1.5" />
    <line x1="6.2" y1="12.2" x2="18" y2="4" />
    <line x1="5" y1="21" x2="18" y2="12.5" />
  </svg>
);

export const FibTimeZoneIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="5" y1="4" x2="5" y2="20" />
    <line x1="9" y1="4" x2="9" y2="20" />
    <line x1="14" y1="4" x2="14" y2="20" />
    <line x1="19" y1="4" x2="19" y2="20" />
    <circle cx="5" cy="9" r="1.5" />
    <circle cx="9" cy="15" r="1.5" />
  </svg>
);

export const FibSpeedFanIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="5" y="5" width="14" height="14" />
    <circle cx="5" cy="19" r="1.5" />
    <line x1="5" y1="19" x2="19" y2="5" />
    <line x1="5" y1="19" x2="19" y2="10" />
    <line x1="5" y1="19" x2="14" y2="5" />
  </svg>
);

export const FibTimeExtensionIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M5 10v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4" />
    <circle cx="5" cy="10" r="1.5" />
    <circle cx="11" cy="18" r="1.5" />
    <line x1="15" y1="4" x2="15" y2="20" />
    <line x1="19" y1="4" x2="19" y2="20" />
  </svg>
);

export const FibCirclesIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="5.5" />
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="6" cy="18" r="1.5" />
    <circle cx="18" cy="6" r="1.5" />
  </svg>
);

export const FibSpiralIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="18" r="1.5" />
    <path d="M6 18c0-3 2.5-5 5.5-5s5.5 2 5.5 5-2 5.5-5.5 5.5-7-3-7-7.5 4-8.5 9-8.5" />
  </svg>
);

export const FibSpeedArcsIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 14a8 8 0 0 0 16 0" />
    <path d="M6.5 15a5.5 5.5 0 0 0 11 0" />
    <path d="M9 16a3 3 0 0 0 6 0" />
    <circle cx="12" cy="19" r="1.5" />
  </svg>
);

export const FibWedgeIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="5" cy="19" r="1.5" />
    <circle cx="17" cy="19" r="1.5" />
    <line x1="6.8" y1="19" x2="15.2" y2="19" />
    <path d="M5 19V6a13 13 0 0 1 13 13" />
    <line x1="5" y1="19" x2="14" y2="10" />
  </svg>
);

export const PitchfanIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="18" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="18" cy="6" r="1.5" />
    <line x1="6" y1="18" x2="19" y2="5" />
    <line x1="6" y1="18" x2="12" y2="4" />
    <line x1="6" y1="18" x2="20" y2="12" />
  </svg>
);

/* --------------------------------------------------------------------------
   IMAGE 3: GANN
   -------------------------------------------------------------------------- */

export const GannBoxIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="5" y="5" width="14" height="14" />
    <line x1="9.6" y1="5" x2="9.6" y2="19" />
    <line x1="14.3" y1="5" x2="14.3" y2="19" />
    <line x1="5" y1="9.6" x2="19" y2="9.6" />
    <line x1="5" y1="14.3" x2="19" y2="14.3" />
    <circle cx="5" cy="19" r="1.5" />
    <circle cx="19" cy="5" r="1.5" />
  </svg>
);

export const GannSquareFixedIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="5" y="5" width="14" height="14" />
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="5" y1="19" x2="19" y2="5" />
    <line x1="5" y1="19" x2="19" y2="12" />
    <line x1="5" y1="19" x2="12" y2="5" />
    <circle cx="5" cy="19" r="1.5" />
  </svg>
);

export const GannSquareIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="5" y="5" width="14" height="14" />
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="5" y1="19" x2="19" y2="5" />
    <polygon points="12,5 19,12 12,19 5,12" strokeWidth="1.4" />
    <circle cx="5" cy="19" r="1.5" />
    <circle cx="19" cy="5" r="1.5" />
  </svg>
);

export const GannFanIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="5" cy="19" r="1.5" />
    <line x1="6.5" y1="18.5" x2="18.5" y2="6.5" />
    <circle cx="13" cy="12" r="1.5" />
    <line x1="6.5" y1="18" x2="19" y2="11" />
    <line x1="6.5" y1="18.8" x2="19" y2="16.5" />
    <line x1="5.5" y1="17.5" x2="8" y2="5" />
    <line x1="6" y1="17.5" x2="13" y2="5" />
  </svg>
);

/* --------------------------------------------------------------------------
   IMAGE 4: CHART PATTERNS, ELLIOTT WAVES & CYCLES
   -------------------------------------------------------------------------- */

export const HarmonicPatternIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="6" y1="18" x2="8" y2="8" />
    <line x1="8" y1="8" x2="12" y2="11" />
    <line x1="6" y1="18" x2="12" y2="11" />
    <line x1="12" y1="11" x2="17" y2="8" />
    <line x1="17" y1="8" x2="19" y2="16" />
    <line x1="12" y1="11" x2="19" y2="16" />
    <circle cx="6" cy="18" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="12" cy="11" r="1.5" />
    <circle cx="17" cy="8" r="1.5" />
    <circle cx="19" cy="16" r="1.5" />
  </svg>
);

export const CypherPatternIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="6" y1="17" x2="8" y2="8" />
    <line x1="8" y1="8" x2="12" y2="12" />
    <line x1="12" y1="12" x2="17" y2="7" />
    <line x1="17" y1="7" x2="19" y2="16" />
    <circle cx="6" cy="17" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="17" cy="7" r="1.5" />
    <circle cx="19" cy="16" r="1.5" />
    <path d="M12 18a1.5 1.5 0 1 1-1-1.4" strokeWidth="1.4" />
  </svg>
);

export const HeadAndShouldersIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="4" y1="17" x2="7" y2="10" />
    <line x1="7" y1="10" x2="10" y2="15" />
    <line x1="10" y1="15" x2="12" y2="6" />
    <line x1="12" y1="6" x2="14" y2="15" />
    <line x1="14" y1="15" x2="17" y2="10" />
    <line x1="17" y1="10" x2="20" y2="17" />
    <line x1="4" y1="17" x2="20" y2="17" />
    <circle cx="4" cy="17" r="1.3" />
    <circle cx="7" cy="10" r="1.3" />
    <circle cx="12" cy="6" r="1.3" />
    <circle cx="17" cy="10" r="1.3" />
    <circle cx="20" cy="17" r="1.3" />
  </svg>
);

export const AbcdPatternIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="5" y1="17" x2="9" y2="7" />
    <line x1="9" y1="7" x2="14" y2="15" />
    <line x1="14" y1="15" x2="19" y2="6" />
    <circle cx="5" cy="17" r="1.5" />
    <circle cx="9" cy="7" r="1.5" />
    <circle cx="14" cy="15" r="1.5" />
    <circle cx="19" cy="6" r="1.5" />
  </svg>
);

export const TrianglePatternIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="5,7 20,12 5,17" />
    <line x1="5" y1="7" x2="10" y2="15" />
    <line x1="10" y1="15" x2="14" y2="10" />
    <line x1="14" y1="10" x2="18" y2="13" />
    <circle cx="5" cy="7" r="1.3" />
    <circle cx="5" cy="17" r="1.3" />
    <circle cx="20" cy="12" r="1.3" />
  </svg>
);

export const ThreeDrivesPatternIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="4" y1="17" x2="8" y2="12" />
    <line x1="8" y1="12" x2="11" y2="15" />
    <line x1="11" y1="15" x2="15" y2="9" />
    <line x1="15" y1="9" x2="17" y2="12" />
    <line x1="17" y1="12" x2="20" y2="6" />
    <circle cx="4" cy="17" r="1.2" />
    <circle cx="8" cy="12" r="1.2" />
    <circle cx="15" cy="9" r="1.2" />
    <circle cx="20" cy="6" r="1.2" />
  </svg>
);

export const ElliottImpulseIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="4,18 7,12 10,15 14,8 17,11 20,6" />
    <circle cx="4" cy="18" r="1.3" />
    <circle cx="7" cy="12" r="1.3" />
    <circle cx="10" cy="15" r="1.3" />
    <circle cx="14" cy="8" r="1.3" />
    <circle cx="17" cy="11" r="1.3" />
    <circle cx="20" cy="6" r="1.3" />
    <text x="6.5" y="9" fontSize="6" fill="currentColor" stroke="none" fontWeight="bold">1</text>
    <text x="18.5" y="5" fontSize="6" fill="currentColor" stroke="none" fontWeight="bold">5</text>
  </svg>
);

export const ElliottCorrectionIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="5,17 10,8 14,14 19,7" />
    <circle cx="5" cy="17" r="1.3" />
    <circle cx="10" cy="8" r="1.3" />
    <circle cx="14" cy="14" r="1.3" />
    <circle cx="19" cy="7" r="1.3" />
    <text x="9" y="6" fontSize="6" fill="currentColor" stroke="none" fontWeight="bold">A</text>
    <text x="18" y="5" fontSize="6" fill="currentColor" stroke="none" fontWeight="bold">C</text>
  </svg>
);

export const ElliottTriangleIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="4,17 7,9 11,15 15,10 18,13" />
    <circle cx="4" cy="17" r="1.3" />
    <circle cx="7" cy="9" r="1.3" />
    <circle cx="11" cy="15" r="1.3" />
    <circle cx="15" cy="10" r="1.3" />
    <circle cx="18" cy="13" r="1.3" />
    <text x="6" y="7" fontSize="6" fill="currentColor" stroke="none" fontWeight="bold">A</text>
    <text x="17" y="9" fontSize="6" fill="currentColor" stroke="none" fontWeight="bold">E</text>
  </svg>
);

export const ElliottDoubleComboIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="4,17 7,11 11,15 15,9 19,13" />
    <circle cx="4" cy="17" r="1.3" />
    <circle cx="7" cy="11" r="1.3" />
    <circle cx="11" cy="15" r="1.3" />
    <circle cx="15" cy="9" r="1.3" />
    <circle cx="19" cy="13" r="1.3" />
    <text x="5.5" y="8" fontSize="5.5" fill="currentColor" stroke="none" fontWeight="bold">W</text>
    <text x="17.5" y="7" fontSize="5.5" fill="currentColor" stroke="none" fontWeight="bold">Y</text>
  </svg>
);

export const ElliottTripleComboIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="4,17 7,12 10,15 13,10 16,13 19,8" />
    <circle cx="4" cy="17" r="1.3" />
    <circle cx="7" cy="12" r="1.3" />
    <circle cx="10" cy="15" r="1.3" />
    <circle cx="13" cy="10" r="1.3" />
    <circle cx="16" cy="13" r="1.3" />
    <circle cx="19" cy="8" r="1.3" />
    <text x="5.5" y="8" fontSize="5.5" fill="currentColor" stroke="none" fontWeight="bold">W</text>
    <text x="17.5" y="6" fontSize="5.5" fill="currentColor" stroke="none" fontWeight="bold">Z</text>
  </svg>
);

export const CyclicLinesIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="6" y1="4" x2="6" y2="20" />
    <line x1="11" y1="4" x2="11" y2="20" />
    <line x1="16" y1="4" x2="16" y2="20" />
    <line x1="4" y1="12" x2="8" y2="12" />
    <line x1="9" y1="12" x2="13" y2="12" />
    <line x1="14" y1="12" x2="18" y2="12" />
  </svg>
);

export const TimeCyclesIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 16c2.5-4 5-4 5 0s2.5 4 5 0 2.5-4 5 0" />
    <path d="M4 16c0 3 2.5 3 2.5 0s2.5-3 2.5 0 2.5 3 2.5 0 2.5-3 2.5 0" />
  </svg>
);

export const SineLineIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6 16c2-8 5-8 6 0s4 8 6 0" />
    <circle cx="5" cy="16" r="1.5" />
    <circle cx="19" cy="16" r="1.5" />
  </svg>
);

/* --------------------------------------------------------------------------
   IMAGE 5: FORECASTING, VOLUME-BASED & MEASURERS
   -------------------------------------------------------------------------- */

export const LongPositionIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="5.5" cy="6" r="1.5" />
    <line x1="7" y1="6" x2="18.5" y2="6" />
    <path d="M11 9.5v3.5h3" strokeWidth="1.2" />
    <line x1="5.5" y1="15" x2="18.5" y2="15" />
    <circle cx="5.5" cy="18.5" r="1.5" />
    <line x1="7" y1="18.5" x2="18.5" y2="18.5" />
  </svg>
);

export const ShortPositionIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="5.5" cy="6" r="1.5" />
    <line x1="7" y1="6" x2="18.5" y2="6" />
    <path d="M13.5 10c0-.8-.7-1.2-1.5-1.2s-1.5.4-1.5 1.2.7 1 1.5 1.2 1.5.4 1.5 1.2-.7 1.2-1.5 1.2-1.5-.4-1.5-1.2" strokeWidth="1.6" />
    <line x1="5.5" y1="15" x2="18.5" y2="15" />
    <circle cx="5.5" cy="18.5" r="1.5" />
    <line x1="7" y1="18.5" x2="18.5" y2="18.5" />
  </svg>
);

export const PositionForecastIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="7" y1="5" x2="7" y2="19" />
    <rect x="6" y="9" width="2" height="6" fill="currentColor" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <rect x="11" y="8" width="2" height="8" fill="currentColor" />
    <line x1="17" y1="6" x2="17" y2="18" />
    <circle cx="17" cy="8" r="1.3" />
    <circle cx="17" cy="16" r="1.3" />
  </svg>
);

export const BarsPatternIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="6" y1="6" x2="6" y2="18" />
    <rect x="5" y="9" width="2" height="6" fill="currentColor" />
    <line x1="11" y1="4" x2="11" y2="20" />
    <rect x="10" y="8" width="2" height="7" fill="currentColor" />
    <line x1="16" y1="7" x2="16" y2="17" />
    <rect x="15" y="10" width="2" height="5" fill="currentColor" />
  </svg>
);

export const GhostFeedIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="5" cy="17" r="1.5" />
    <polyline points="6.5,17 10,13 13,15 17,9 20,11" strokeDasharray="2 2" />
    <circle cx="20" cy="11" r="1.5" />
    <line x1="10" y1="10" x2="10" y2="16" />
    <line x1="17" y1="6" x2="17" y2="12" />
  </svg>
);

export const SectorIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="6" cy="18" r="1.6" />
    <circle cx="18" cy="18" r="1.6" />
    <circle cx="6" cy="6" r="1.6" />
    <line x1="7.6" y1="18" x2="16.4" y2="18" />
    <line x1="6" y1="7.6" x2="6" y2="16.4" />
    <path d="M6 6a12 12 0 0 1 12 12" />
  </svg>
);

export const AnchoredVwapIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="11" y1="4" x2="11" y2="20" />
    <rect x="9.5" y="8" width="3" height="8" fill="currentColor" />
    <path d="M5 16c3-6 7-6 10 0s4 3 5 0" />
    <circle cx="5" cy="16" r="1.3" />
  </svg>
);

export const FixedRangeVolumeProfileIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="5" y1="4" x2="5" y2="20" />
    <circle cx="5" cy="19" r="1.5" />
    <line x1="5" y1="8" x2="11" y2="8" />
    <line x1="5" y1="11" x2="14" y2="11" />
    <line x1="5" y1="14" x2="9" y2="14" />
    <line x1="17" y1="5" x2="17" y2="19" strokeDasharray="1.5 1.5" />
    <circle cx="17" cy="5" r="1.3" />
  </svg>
);

export const AnchoredVolumeProfileIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="8" y1="4" x2="8" y2="20" />
    <circle cx="5" cy="12" r="1.5" />
    <line x1="6.5" y1="12" x2="8" y2="12" />
    <line x1="8" y1="7" x2="15" y2="7" />
    <line x1="8" y1="10" x2="18" y2="10" />
    <line x1="8" y1="13" x2="14" y2="13" />
    <line x1="8" y1="16" x2="11" y2="16" />
  </svg>
);

export const PriceRangeIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="12" y1="6" x2="12" y2="18" />
    <line x1="7" y1="6" x2="17" y2="6" />
    <line x1="7" y1="18" x2="17" y2="18" />
    <circle cx="17" cy="6" r="1.5" />
    <circle cx="7" cy="18" r="1.5" />
  </svg>
);

export const DateRangeIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="6" y1="7" x2="6" y2="17" />
    <line x1="18" y1="7" x2="18" y2="17" />
    <circle cx="6" cy="17" r="1.5" />
    <circle cx="18" cy="7" r="1.5" />
  </svg>
);

export const DateAndPriceRangeIcon = ({ size = 28, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="5" y="5" width="14" height="14" />
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <circle cx="5" cy="19" r="1.5" />
    <circle cx="19" cy="5" r="1.5" />
  </svg>
);

/* --------------------------------------------------------------------------
   CHART & OBJECT TREE ICONS
   Icons placed here: CandlestickIcon, WaveIcon, FolderPlusIcon, CloneIcon,
   ChevronsUpDownIcon, FolderCogIcon
   -------------------------------------------------------------------------- */

export const CandlestickIcon = ({ size = 16, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="7" y1="2" x2="7" y2="7" />
    <rect x="4.5" y="7" width="5" height="10" rx="0.5" stroke="currentColor" fill="none" />
    <line x1="7" y1="17" x2="7" y2="22" />
    <line x1="17" y1="4" x2="17" y2="9" />
    <rect x="14.5" y="9" width="5" height="7" rx="0.5" stroke="currentColor" fill="currentColor" />
    <line x1="17" y1="16" x2="17" y2="20" />
  </svg>
);

export const WaveIcon = ({ size = 16, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2 12c3.5-6 6.5-6 10 0s6.5 6 10 0" />
  </svg>
);

export const FolderPlusIcon = ({ size = 16, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    <line x1="12" y1="10" x2="12" y2="16" />
    <line x1="9" y1="13" x2="15" y2="13" />
  </svg>
);

export const CloneIcon = ({ size = 16, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="13" height="13" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const ChevronsUpDownIcon = ({ size = 16, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
);

export const FolderCogIcon = ({ size = 16, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    <circle cx="15.5" cy="14.5" r="1.5" />
    <path d="m14.5 16-2.5 2.5" />
  </svg>
);
