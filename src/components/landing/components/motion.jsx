import { useEffect, useRef, useState } from "react";

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  as: Component = "div",
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const inlineStyle = {
    ...style,
    opacity: isRevealed ? 1 : 0,
    transform: isRevealed ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    willChange: isRevealed ? "auto" : "opacity, transform",
  };

  return (
    <Component
      ref={ref}
      className={`reveal-on-scroll ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={inlineStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function MaskLines({ lines, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setRevealed(true);
          }, 40);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-[0.04em] pb-[0.08em]">
          <span
            className="block"
            style={{
              transform: revealed ? "translateY(0%)" : "translateY(115%)",
              transition: `transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * 0.14}s`,
              willChange: "transform",
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-teal ${className}`}
    >
      <span className="h-px w-6 bg-teal"></span>
      {children}
    </span>
  );
}
