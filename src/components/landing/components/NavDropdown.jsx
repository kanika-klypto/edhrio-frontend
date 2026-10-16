import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

export function NavDropdown({
  label,
  items = [],
  isOpen = false,
  onToggle,
  onClose,
  align = "left",
  panelId,
}) {
  const resolvedPanelId = panelId || `nav-dropdown-${label.toLowerCase()}`;

  return (
    <div className="nav-dropdown relative inline-block">
      <button
        type="button"
        className={`nav-dropdown-trigger nav-link inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors cursor-pointer border-0 outline-none ${
          isOpen
            ? "!text-ink bg-black/[0.05] dark:!bg-white/[0.06]"
            : "!text-inksoft hover:bg-black/[0.05] dark:hover:!bg-white/[0.06] hover:!text-ink"
        }`}
        aria-expanded={isOpen}
        aria-controls={resolvedPanelId}
        onClick={onToggle}
      >
        <span>{label}</span>
        {/* <FiChevronDown
          size={14}
          className={`nav-dropdown-chevron transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        /> */}
      </button>

      {isOpen && (
        <div
          id={resolvedPanelId}
          role="menu"
          aria-label={label}
          className={`nav-dropdown-panel absolute top-full z-[60] mt-2 min-w-56 rounded-xl border border-border p-1.5 shadow-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          {items.map((item) => {
            const Icon = item.icon || item.Icon;
            const isAnchor =
              item.href &&
              (item.href.startsWith("/#") || item.href.startsWith("#"));
            const isInternal =
              item.href && !isAnchor && item.href.startsWith("/");

            const content = (
              <>
                {Icon && (
                  <span className="nav-dropdown-item-icon text-accent inline-flex items-center justify-center shrink-0">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                )}
                <span>{item.label}</span>
              </>
            );

            if (isInternal) {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  role="menuitem"
                  className="nav-dropdown-item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink !no-underline transition-colors hover:bg-accent/10 hover:text-accent"
                  onClick={onClose}
                >
                  {content}
                </Link>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href || "#"}
                role="menuitem"
                className="nav-dropdown-item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink !no-underline transition-colors hover:bg-accent/10 hover:text-accent"
                onClick={(e) => {
                  onClose?.();
                  if (item.onClick) item.onClick(e);
                }}
              >
                {content}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
