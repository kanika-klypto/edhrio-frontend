import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { TbTargetArrow, TbChartCandle } from "react-icons/tb";
import {
  LuChartNoAxesCombined,
  LuLightbulb,
  LuSlidersHorizontal,
  LuNewspaper,
  LuChartBar,
  LuInfo,
  LuCircleHelp,
  LuBriefcase,
} from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { Brand } from "./Brand";
import { NavSearch } from "./NavSearch";
import { NavDropdown } from "./NavDropdown";
import { ChartHeaderProfileMenu } from "../../layout/ChartHeaderProfileMenu";

const navConfig = [
  {
    id: "products",
    label: "Products",
    items: [
      { label: "Smart Charts", href: "/chart", icon: FaChartLine },
      { label: "Scanner", href: "/dashboard", icon: TbTargetArrow },
      { label: "Option Chain", href: "/optionchain", icon: TbChartCandle },
      { label: "Compare Stocks", href: "/chart", icon: LuChartNoAxesCombined },
    ],
  },
  {
    id: "community",
    label: "Community",
    items: [
      { label: "Trading Ideas", href: "/#community", icon: LuLightbulb },
      { label: "Indicator and strategies", href: "/#features", icon: LuSlidersHorizontal },
    ],
  },
  {
    id: "markets",
    label: "Markets",
    items: [
      { label: "News", href: "/#markets", icon: LuNewspaper },
      { label: "Indices", href: "/#platforms", icon: LuChartBar },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing",
  },
  {
    id: "more",
    label: "More",
    items: [
      { label: "About", href: "/#top", icon: LuInfo },
      { label: "Help", href: "/#community", icon: LuCircleHelp },
      { label: "Careers", href: "/#community", icon: LuBriefcase },
    ],
  },
];

export function HeaderTailwind({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const desktopNavRef = useRef(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Keep dropdown open until user clicks outside or scrolls the screen
  useEffect(() => {
    if (!activeDropdown) return;

    const handlePointerDown = (event) => {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    const handleScroll = () => {
      setActiveDropdown(null);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeDropdown]);

  const isLight = theme === "light";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-0! border-none! transition-all duration-200 ${
        isLight ? "bg-white!" : "bg-black!"
      } ${
        scrolled || open
          ? isLight
            ? "shadow-sm"
            : "shadow-sm shadow-white/5"
          : ""
      }`}
      style={{
        backgroundColor: isLight ? "#ffffff" : "#000000",
      }}
    >
      <nav
        className="mx-auto flex h-17 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <a href="/" className="shrink-0 no-underline" aria-label="Home">
          <Brand theme={theme} />
        </a>

        {/* Desktop Navigation */}
        <div
          ref={desktopNavRef}
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigation menus"
        >
          {navConfig.map((item) => {
            if (!item.items) {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="nav-link rounded-full px-3 py-2 text-sm font-medium !text-inksoft !no-underline transition-colors hover:bg-black/[0.05] dark:hover:!bg-white/[0.06] hover:!text-ink"
                  onClick={() => setActiveDropdown(null)}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <NavDropdown
                key={item.id}
                label={item.label}
                items={item.items}
                isOpen={activeDropdown === item.id}
                onToggle={() =>
                  setActiveDropdown((prev) => (prev === item.id ? null : item.id))
                }
                onClose={() => setActiveDropdown(null)}
                align={item.id === "more" ? "right" : "left"}
              />
            );
          })}
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2.5">
          <div className="hidden w-52 xl:block">
            <NavSearch />
          </div>
          <Link
            to="/pricing"
            className="site-nav-cta inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-accent! px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 no-underline! whitespace-nowrap text-white"
          >
            Start free <span aria-hidden="true">→</span>
          </Link>
          <ChartHeaderProfileMenu theme={theme} onToggleTheme={onToggleTheme} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-grid size-10 place-items-center rounded-full border-1 border-border bg-card text-ink lg:hidden cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path
                d={open ? "M18 6 6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div
          className={`border-t px-4 py-4 lg:hidden ${
            isLight
              ? "border-gray-200 bg-white"
              : "border-neutral-800 bg-black"
          }`}
        >
          <div className="mb-3">
            <NavSearch autoFocus />
          </div>
          <div className="flex flex-col gap-1">
            {navConfig.map((item) => {
              if (!item.items) {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => {
                      setOpen(false);
                      setMobileExpanded(null);
                    }}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-inksoft no-underline hover:bg-surface-2 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                );
              }

              const isExpanded = mobileExpanded === item.id;
              return (
                <div key={item.id} className="overflow-hidden rounded-lg">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded((prev) =>
                        prev === item.id ? null : item.id
                      )
                    }
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-inksoft hover:bg-surface-2 hover:text-ink cursor-pointer border-0 bg-transparent"
                  >
                    <span>{item.label}</span>
                    <FiChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div
                      className="my-1 flex flex-col gap-1 rounded-lg border border-border p-1.5"
                      style={{ backgroundColor: "var(--bg-secondary)" }}
                    >
                      {item.items.map((subItem) => {
                        const SubIcon = subItem.icon || subItem.Icon;
                        const isAnchor =
                          subItem.href &&
                          (subItem.href.startsWith("/#") ||
                            subItem.href.startsWith("#"));
                        const isInternal =
                          subItem.href &&
                          !isAnchor &&
                          subItem.href.startsWith("/");

                        const content = (
                          <span className="flex items-center gap-2.5">
                            {SubIcon && (
                              <SubIcon
                                size={16}
                                className="text-accent shrink-0"
                              />
                            )}
                            <span>{subItem.label}</span>
                          </span>
                        );

                        if (isInternal) {
                          return (
                            <Link
                              key={subItem.label}
                              to={subItem.href}
                              onClick={() => {
                                setOpen(false);
                                setMobileExpanded(null);
                              }}
                              className="rounded-md px-3 py-2 text-sm font-medium text-ink no-underline hover:bg-accent/10 hover:text-accent"
                            >
                              {content}
                            </Link>
                          );
                        }

                        return (
                          <a
                            key={subItem.label}
                            href={subItem.href || "#"}
                            onClick={() => {
                              setOpen(false);
                              setMobileExpanded(null);
                            }}
                            className="rounded-md px-3 py-2 text-sm font-medium text-ink no-underline hover:bg-accent/10 hover:text-accent"
                          >
                            {content}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
