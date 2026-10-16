export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark theme"
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full! border-0 p-0 transition-colors duration-200 focus:outline-none ${
        isDark ? "bg-accent" : "bg-slate-400"
      }`}
      style={{ padding: 0, border: 'none', borderRadius: '9999px' }}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block size-4 rounded-full! bg-white shadow transition-transform duration-200 ${
          isDark ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
        style={{ borderRadius: '9999px' }}
      />
    </button>
  )
}
