import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  LuChevronUp,
  LuChevronDown,
  LuTrash2,
} from "react-icons/lu";
import { toolGroups, cursorOptions } from "../../util/toolConfig";
import {
  PencilLockIcon,
  EyeBrushIcon,
  EyeOffIcon,
  MeasureRulerIcon,
  ZoomInIcon,
  MagnetToolIcon,
  UnlockAllIcon,
  LockAllIcon,
} from "../../assets/drawingIcons";

/* ==========================================================================
   STYLES
   ========================================================================== */

const iconBtn = (active, width = "w-[44px]", hover = "hover:text-fg") =>
  `flex h-[36px] ${width} shrink-0 cursor-pointer items-center justify-center rounded-sm! border-0 p-0transition-colors duration-150 ${
    active
      ? "bg-surface-3 text-fg"
      : `bg-transparent text-fg-muted hover:bg-surface-3 hover:text-fg ${hover}`
  }`;

/* ==========================================================================
   FLYOUT ARROW BUTTON (11x34, visible on hover with TradingView title tooltip)
   ========================================================================== */

const FlyoutArrowButton = ({ tooltipText, isOpen, isParentHovered, onClick }) => {
  const [isSelfHovered, setIsSelfHovered] = useState(false);
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);

  const isVisible = isOpen || isParentHovered || isSelfHovered;

  const handleMouseEnter = () => {
    setIsSelfHovered(true);
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.top + rect.height / 2,
        left: rect.right + 6,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsSelfHovered(false);
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={tooltipText}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute right-[1px] top-1/2 -translate-y-1/2 z-10 flex h-[32px] w-[7px] cursor-pointer items-center justify-center rounded-xs! border-0 p-0 text-fg-muted transition-all duration-150 hover:bg-surface-3 hover:text-fg ${
          isOpen
            ? "bg-surface-3 text-fg opacity-100"
            : isVisible
            ? "bg-transparent opacity-100 hover:bg-surface-3 hover:text-fg"
            : "bg-transparent opacity-0 pointer-events-none"
        }`}
      >
        <svg
          width="5"
          height="7"
          viewBox="0 0 5 7"
          fill="none"
          className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1L4 3.5L1 6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* TradingView-style Tooltip on hover (no border, no native title) */}
      {isSelfHovered && !isOpen && pos && tooltipText && createPortal(
        <div
          className="pointer-events-none fixed z-[9999] flex items-center whitespace-nowrap rounded-xs px-2.5 py-1.5 text-[12px] font-medium leading-none shadow-[0_2px_8px_rgba(0,0,0,0.5)] select-none"
          style={{
            top: pos.top,
            left: pos.left,
            transform: "translateY(-50%)",
            backgroundColor: "var(--tooltip-bg, #3d3d3d)",
            color: "var(--text-primary)",
          }}
        >
          {/* Caret pointing left */}
          <div
            className="absolute -left-[5px] top-1/2 -translate-y-1/2 h-0 w-0 border-y-[4px] border-r-[5px] border-y-transparent"
            style={{ borderRightColor: "var(--tooltip-bg, #3d3d3d)" }}
          />
          {tooltipText}
        </div>,
        document.body,
      )}
    </>
  );
};

/* ==========================================================================
   FLYOUT MENU ITEM
   ========================================================================== */

const MenuItem = ({ tool, isActive, onSelect }) => {
  const Icon = tool.icon;
  const labelText = tool.shortcut ? `${tool.label} (${tool.shortcut})` : tool.label;

  return (
    <button
      type="button"
      role="menuitem"
      aria-label={labelText}
      onClick={() => onSelect(tool)}
      className={`flex min-h-8 w-full cursor-pointer items-center gap-2.25 rounded-sm! border-0 px-2.5 text-left font-[inherit] text-xs transition-colors ${
        isActive
          ? "rounded-sm! bg-[#f2f2f2] text-black hover:bg-[#f2f2f2] hover:text-black"
          : "rounded-sm! bg-transparent text-fg-muted hover:bg-[#2e2e2e] hover:text-white"
      }`}
    >
      <Icon size={20} className="shrink-0" />
      <span className="flex-1">{tool.label}</span>
      {tool.shortcut && (
        <span
          className={`text-[12px] ${
            isActive ? "text-black/70" : "text-fg-muted"
          }`}
        >
          {tool.shortcut}
        </span>
      )}
    </button>
  );
};

/* ==========================================================================
   TOOL GROUP (split button + flyout)
   ========================================================================== */

const ToolGroup = ({ group, activeTool, onSelectTool, isOpen, setOpen }) => {
  const [selected, setSelected] = useState(group.sections[0].tools[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState(null);
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    for (const section of group.sections) {
      const match = section.tools.find((t) => t.id === activeTool);
      if (match) {
        setSelected(match);
        break;
      }
    }
  }, [activeTool, group]);

  const SelectedIcon = selected.icon;
  const selectedIsActive = activeTool === selected.id;

  /* Place the flyout beside the button, but keep it fully on screen.
     (fixed position, so the toolbar never clips it) */
  useLayoutEffect(() => {
    if (!isOpen) {
      setPos(null);
      return undefined;
    }

    const place = () => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      const menuHeight = menuRef.current?.offsetHeight ?? 0;
      if (!rect) return;
      const top = Math.max(
        8,
        Math.min(rect.top - 6, window.innerHeight - menuHeight - 8),
      );
      setPos({ top, left: rect.right + 4 });
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [isOpen]);

  const choose = (tool) => {
    setSelected(tool);
    onSelectTool(tool.id);
    setOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      data-tool-group
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex w-11 items-center justify-center"
    >
      <button
        type="button"
        aria-label={selected.label}
        onClick={() => onSelectTool(selected.id)}
        className={iconBtn(selectedIsActive, "w-11")}
      >
        <SelectedIcon size={28} />
      </button>
      <FlyoutArrowButton
        tooltipText={group.label}
        isOpen={isOpen}
        isParentHovered={isHovered}
        onClick={() => setOpen(!isOpen)}
      />

      {isOpen && createPortal(
        <div
          ref={menuRef}
          data-tool-group
          role="menu"
          aria-label={group.label}
          style={pos ? { top: pos.top, left: pos.left } : undefined}
          className={`custom-scrollbar fixed z-dropdown max-h-[calc(100dvh-1rem)] w-72 max-w-[calc(100vw-3.5rem)] overflow-y-auto rounded-sm bg-(--bg-secondary) p-2 shadow-dropdown ${
            pos ? "" : "invisible"
          }`}
        >
          {group.sections.map((section, index) => (
            <div key={section.title}>
              {index > 0 && <div className="my-1.75 h-px bg-line" />}
              <div className="px-1.5 pb-1.5 pt-0.5 text-[12px] font-bold uppercase tracking-wide text-fg-muted">
                {section.title}
              </div>
              {section.tools.map((tool) => (
                <MenuItem
                  key={tool.id}
                  tool={tool}
                  isActive={activeTool === tool.id}
                  onSelect={choose}
                />
              ))}
            </div>
          ))}
        </div>,
        document.body,
      )}
    </div>
  );
};

/* ==========================================================================
   CURSOR PICKER (Special split button for cross/dot/arrow)
   ========================================================================== */

const CursorPicker = ({
  activeTool,
  cursorStyle,
  setCursorStyle,
  setActiveTool,
  isOpen,
  setOpen,
}) => {
  const [pos, setPos] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);

  const selected =
    cursorOptions.find((c) => c.id === cursorStyle) || cursorOptions[0];
  const SelectedIcon = selected.icon;

  useLayoutEffect(() => {
    if (!isOpen) {
      setPos(null);
      return undefined;
    }

    const place = () => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      const menuHeight = menuRef.current?.offsetHeight ?? 0;
      if (!rect) return;
      setPos({
        top: Math.max(8, Math.min(rect.top, window.innerHeight - menuHeight - 8)),
        left: rect.right + 4,
      });
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [isOpen]);

  const choose = (option) => {
    setCursorStyle(option.id);
    setActiveTool("cursor");
    setOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      data-tool-group
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex w-[44px] items-center justify-center"
    >
      <button
        type="button"
        aria-label={`Cursor: ${selected.label}`}
        onClick={() => setActiveTool("cursor")}
        className={iconBtn(activeTool === "cursor", "w-[44px]")}
      >
        <SelectedIcon size={28} />
      </button>
      <FlyoutArrowButton
        tooltipText="Cursor style"
        isOpen={isOpen}
        isParentHovered={isHovered}
        onClick={() => setOpen(!isOpen)}
      />

      {isOpen && createPortal(
        <div
          ref={menuRef}
          data-tool-group
          role="menu"
          aria-label="Cursor style"
          style={pos ? { top: pos.top, left: pos.left } : undefined}
          className={`fixed z-dropdown w-32 rounded-sm bg-secondary p-1 shadow-dropdown ${
            pos ? "" : "invisible"
          }`}
        >
          {cursorOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = cursorStyle === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="menuitem"
                onClick={() => choose(option)}
                style={{ fontSize: "12px" }}
                className={`flex h-8 w-full cursor-pointer items-center gap-2 rounded-sm border-0 px-2 text-left text-xs transition-colors ${
                  isSelected
                    ? "rounded-sm! bg-[#f2f2f2] text-black hover:bg-[#f2f2f2] hover:text-black"
                    : "rounded-sm! bg-transparent text-fg-muted hover:bg-[#2e2e2e] hover:text-white"
                }`}
              >
                <Icon size={20} className="shrink-0" />
                <span style={{ fontSize: "12px" }}>{option.label}</span>
              </button>
            );
          })}
        </div>,
        document.body,
      )}
    </div>
  );
};

/* ==========================================================================
   TOOLBAR
   ========================================================================== */

const DrawingToolbar = ({
  activeTool,
  setActiveTool,
  clearAllDrawings,
  cursorStyle,
  setCursorStyle,
}) => {
  const [openGroup, setOpenGroup] = useState(null);

  /* Scroll management & overlay arrows */
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHoveringArrow, setIsHoveringArrow] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  /* States for utility buttons */
  const [magnetActive, setMagnetActive] = useState(false);
  const [stayDrawing, setStayDrawing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 4);
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
  };

  const handleScroll = () => {
    checkScroll();
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1500);
  };

  const handleWheel = () => {
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1500);
  };

  const scrollByAmount = (amount) => {
    scrollContainerRef.current?.scrollBy({ top: amount, behavior: "smooth" });
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      checkScroll();
    }, 1000);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  /* Shortcut functionality for Alt + T (Trendline) and Alt + H (Horizontal line) */
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInput =
        ["INPUT", "TEXTAREA", "SELECT"].includes(e.target?.tagName) ||
        e.target?.isContentEditable;
      if (isInput) return;

      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        if (e.code === "KeyT" || e.key?.toLowerCase() === "t") {
          e.preventDefault();
          setActiveTool((prev) => (prev === "trendLine" ? "cursor" : "trendLine"));
        } else if (e.code === "KeyH" || e.key?.toLowerCase() === "h") {
          e.preventDefault();
          setActiveTool((prev) => (prev === "horizontalLine" ? "cursor" : "horizontalLine"));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setActiveTool]);

  /* Only one flyout open at a time; close on outside click, wheel
     (chart zoom) outside the toolbar, or Escape. */
  useEffect(() => {
    if (!openGroup) return undefined;

    const closeIfOutside = (event) => {
      if (!event.target?.closest?.("[data-tool-group]")) setOpenGroup(null);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenGroup(null);
    };

    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("wheel", closeIfOutside, true);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("wheel", closeIfOutside, true);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openGroup]);

  const showUpArrow = canScrollUp && (isScrolling || isHoveringArrow);
  const showDownArrow = canScrollDown && (isScrolling || isHoveringArrow);

  return (
    <div
      className="relative z-dropdown flex h-full w-14 shrink-0 flex-col items-center bg-panel select-none rounded-tr-[10px] overflow-hidden"
      onWheel={handleWheel}
    >
      {/* Top Scroll Arrow (shown only when user scrolls) */}
      <button
        type="button"
        aria-label="Scroll up"
        onClick={() => scrollByAmount(-120)}
        onMouseEnter={() => setIsHoveringArrow(true)}
        onMouseLeave={() => setIsHoveringArrow(false)}
        className={`absolute left-0 right-0 top-0 z-20 flex h-6 w-full cursor-pointer items-center justify-center bg-[#50535e]/60 text-white hover:bg-[#50535e]/85 backdrop-blur-[2px] transition-all duration-200 ${
          showUpArrow ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <LuChevronUp size={16} strokeWidth={2.5} />
      </button>

      {/* Main Scrollable Toolbar Container (Scrollbar completely hidden) */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="no-scrollbar flex h-full w-full flex-col items-center gap-1.5 overflow-y-auto overflow-x-hidden px-1.5 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <CursorPicker
          activeTool={activeTool}
          cursorStyle={cursorStyle}
          setCursorStyle={setCursorStyle}
          setActiveTool={setActiveTool}
          isOpen={openGroup === "cursor"}
          setOpen={(open) => setOpenGroup(open ? "cursor" : null)}
        />

        {toolGroups.map((group) => (
          <ToolGroup
            key={group.id}
            group={group}
            activeTool={activeTool}
            onSelectTool={setActiveTool}
            isOpen={openGroup === group.id}
            setOpen={(open) => setOpenGroup(open ? group.id : null)}
          />
        ))}

        <div className="h-px w-6 bg-line shrink-0 my-0.5" />

        {/* Measure tool */}
        <button
          type="button"
          aria-label="Measure"
          onClick={() => setActiveTool((prev) => (prev === "measure" ? "cursor" : "measure"))}
          className={iconBtn(activeTool === "measure", "w-[44px]")}
        >
          <MeasureRulerIcon size={28} />
        </button>

        {/* Zoom in tool */}
        <button
          type="button"
          aria-label="Zoom In"
          onClick={() => setActiveTool((prev) => (prev === "zoomIn" ? "cursor" : "zoomIn"))}
          className={iconBtn(activeTool === "zoomIn", "w-[44px]")}
        >
          <ZoomInIcon size={28} />
        </button>

        <div className="h-px w-6 bg-line shrink-0 my-0.5" />

        {/* Magnet tool */}
        <button
          type="button"
          aria-label="Magnet Mode"
          onClick={() => setMagnetActive((prev) => !prev)}
          className={iconBtn(magnetActive, "w-[44px]")}
        >
          <MagnetToolIcon size={28} />
        </button>

        {/* Stay in Drawing Mode */}
        <button
          type="button"
          aria-label="Stay in Drawing Mode"
          onClick={() => setStayDrawing((prev) => !prev)}
          className={iconBtn(stayDrawing, "w-[44px]")}
        >
          <PencilLockIcon size={28} />
        </button>

        {/* Lock All Drawing Tools */}
        <button
          type="button"
          aria-label="Lock All Drawing Tools"
          onClick={() => setIsLocked((prev) => !prev)}
          className={iconBtn(isLocked, "w-[44px]")}
        >
          {isLocked ? <LockAllIcon size={28} /> : <UnlockAllIcon size={28} />}
        </button>

        {/* Hide All Drawings */}
        <button
          type="button"
          aria-label="Hide All Drawings"
          onClick={() => setIsHidden((prev) => !prev)}
          className={iconBtn(isHidden, "w-[44px]")}
        >
          {isHidden ? <EyeOffIcon size={28} /> : <EyeBrushIcon size={28} />}
        </button>

        <div className="h-px w-6 bg-line shrink-0 my-0.5" />

        {/* Clear All Drawings (Trash) */}
        <button
          type="button"
          aria-label="Clear all drawings"
          onClick={clearAllDrawings}
          className={iconBtn(false, "w-[44px]", "hover:text-danger")}
        >
          <LuTrash2 size={28} />
        </button>
      </div>

      {/* Bottom Scroll Arrow (shown only when user scrolls) */}
      <button
        type="button"
        aria-label="Scroll down"
        onClick={() => scrollByAmount(120)}
        onMouseEnter={() => setIsHoveringArrow(true)}
        onMouseLeave={() => setIsHoveringArrow(false)}
        className={`absolute bottom-0 left-0 right-0 z-20 flex h-6 w-full cursor-pointer items-center justify-center bg-[#50535e]/60 text-white hover:bg-[#50535e]/85 backdrop-blur-[2px] transition-all duration-200 ${
          showDownArrow ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <LuChevronDown size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default DrawingToolbar;
