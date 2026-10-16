import { useEffect, useRef, useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { TbTargetArrow, TbChartCandle } from "react-icons/tb";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { NavDropdown } from "./NavDropdown";

const products = [
  { label: "Smart Charts", href: "/chart", icon: FaChartLine },
  { label: "Scanner", href: "/dashboard", icon: TbTargetArrow },
  { label: "Option Chain", href: "/optionchain", icon: TbChartCandle },
  { label: "Compare Stocks", href: "/chart", icon: LuChartNoAxesCombined },
];

export function ProductsMenu({ mobile = false }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const onScroll = () => {
      setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="inline-block">
      <NavDropdown
        label="Products"
        items={products}
        isOpen={open}
        onToggle={() => setOpen((prev) => !prev)}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
