import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Universal, theme-aware Tooltip component.
 * 
 * Usage:
 *   <Tooltip content="Settings" position="bottom">
 *     <button><FiMoreHorizontal /></button>
 *   </Tooltip>
 * 
 * Props:
 *   - content (string | ReactNode): Tooltip text/node
 *   - position: "top" | "bottom" | "left" | "right" (default: "top")
 *   - delay: hover delay in ms (default: 100)
 *   - disabled: boolean to disable tooltip
 *   - className: extra classes for tooltip bubble
 */
export const Tooltip = ({
  content,
  position = "top",
  delay = 100,
  disabled = false,
  className = "",
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState(null);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const gap = 6;

    let top = 0;
    let left = 0;

    switch (position) {
      case "bottom":
        top = triggerRect.bottom + gap;
        left = triggerRect.left + triggerRect.width / 2;
        break;
      case "left":
        top = triggerRect.top + triggerRect.height / 2;
        left = triggerRect.left - gap;
        break;
      case "right":
        top = triggerRect.top + triggerRect.height / 2;
        left = triggerRect.right + gap;
        break;
      case "top":
      default:
        top = triggerRect.top - gap;
        left = triggerRect.left + triggerRect.width / 2;
        break;
    }

    setCoords({ top, left });
  };

  const handleMouseEnter = () => {
    if (disabled || !content) return;
    timeoutRef.current = setTimeout(() => {
      calculatePosition();
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useLayoutEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible, position]);

  useEffect(() => {
    if (!isVisible) return;
    const handleScrollOrResize = () => setIsVisible(false);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isVisible]);

  // Transform classes depending on position
  const getTransformClass = () => {
    switch (position) {
      case "bottom":
        return "-translate-x-1/2";
      case "left":
        return "-translate-x-full -translate-y-1/2";
      case "right":
        return "-translate-y-1/2";
      case "top":
      default:
        return "-translate-x-1/2 -translate-y-full";
    }
  };

  // Triangle caret styles depending on position
  const renderCaret = () => {
    switch (position) {
      case "bottom":
        return (
          <div
            className="absolute -top-[4px] left-1/2 -translate-x-1/2 h-0 w-0 border-x-[4px] border-b-[4px] border-x-transparent"
            style={{ borderBottomColor: "var(--tooltip-bg, #3d3d3d)" }}
          />
        );
      case "left":
        return (
          <div
            className="absolute -right-[4px] top-1/2 -translate-y-1/2 h-0 w-0 border-y-[4px] border-l-[4px] border-y-transparent"
            style={{ borderLeftColor: "var(--tooltip-bg, #3d3d3d)" }}
          />
        );
      case "right":
        return (
          <div
            className="absolute -left-[4px] top-1/2 -translate-y-1/2 h-0 w-0 border-y-[4px] border-r-[4px] border-y-transparent"
            style={{ borderRightColor: "var(--tooltip-bg, #3d3d3d)" }}
          />
        );
      case "top":
      default:
        return (
          <div
            className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 h-0 w-0 border-x-[4px] border-t-[4px] border-x-transparent"
            style={{ borderTopColor: "var(--tooltip-bg, #3d3d3d)" }}
          />
        );
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-center justify-center"
      >
        {children}
      </div>

      {isVisible && coords && content && createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`pointer-events-none fixed z-[99999] flex items-center whitespace-nowrap rounded px-2 py-1 text-[11px] font-medium leading-none shadow-[0_2px_8px_rgba(0,0,0,0.5)] select-none transition-opacity duration-150 ${getTransformClass()} ${className}`}
          style={{
            top: coords.top,
            left: coords.left,
            backgroundColor: "var(--tooltip-bg, #3d3d3d)",
            color: "var(--text-primary)",
          }}
        >
          {renderCaret()}
          {content}
        </div>,
        document.body,
      )}
    </>
  );
};

export default Tooltip;
