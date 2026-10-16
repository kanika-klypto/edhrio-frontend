import { useEffect, useState, useRef } from "react";
import { FiActivity, FiMonitor, FiSliders } from "react-icons/fi";

const WATCHLIST = [
  ["NIFTY 50", "24,819.39", "+0.03%", true],
  ["BANKNIFTY", "52,881.10", "-0.11%", false],
  ["RELIANCE", "1,432.55", "+0.08%", true],
  ["HDFCBANK", "1,687.14", "-0.01%", false],
  ["TCS", "4,107.27", "-0.02%", false],
  ["INFY", "1,875.13", "-0.07%", false],
];

// 56 Intraday candles for NIFTY 50 (from 09:15 to 15:30)
const RAW_DELTAS = [
  8, 12, -6, 14, 22, -10, 16, 25, -12, -18,
  15, 20, 28, -8, -14, -22, 18, 30, 24, -15,
  -8, 14, 22, -16, -24, -12, 18, 26, 32, 14,
  -20, -18, -10, 15, 24, 18, -12, -26, -30, -14,
  16, 22, 18, -10, -15, 12, 20, 15, -18, -22,
  10, 18, 22, -14, 12, -8
];

const PRICE_MIN = 24580;
const PRICE_MAX = 24840;
const CHART_TOP_Y = 14;
const CHART_BOTTOM_Y = 176;

const priceToY = (price) => {
  const norm = (price - PRICE_MIN) / (PRICE_MAX - PRICE_MIN);
  return CHART_BOTTOM_Y - norm * (CHART_BOTTOM_Y - CHART_TOP_Y);
};

const yToPrice = (y) => {
  const norm = (CHART_BOTTOM_Y - y) / (CHART_BOTTOM_Y - CHART_TOP_Y);
  return +(PRICE_MIN + norm * (PRICE_MAX - PRICE_MIN)).toFixed(2);
};

let currentP = 24615.00;
const CANDLES = RAW_DELTAS.map((delta, i) => {
  const open = +currentP.toFixed(2);
  const close = +(open + delta).toFixed(2);
  const high = +(Math.max(open, close) + 6 + ((i * 3) % 7)).toFixed(2);
  const low = +(Math.min(open, close) - 6 - ((i * 5) % 6)).toFixed(2);
  const volume = 14 + ((i * 7) % 28) + (Math.abs(delta) > 18 ? 16 : 0);
  currentP = close;

  const hours = 9 + Math.floor((15 + i * 6.5) / 60);
  const mins = Math.floor((15 + i * 6.5) % 60);
  const timeStr = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

  const change = close - open;
  const changePct = ((change / open) * 100).toFixed(2);

  // SVG coordinates (56 candles across 520px width: from x=10 to x=510)
  const x = +(10 + i * (500 / 55)).toFixed(2);
  const openY = priceToY(open);
  const closeY = priceToY(close);
  const highY = priceToY(high);
  const lowY = priceToY(low);
  const bodyTop = Math.min(openY, closeY);
  const bodyHeight = Math.max(2, Math.abs(openY - closeY));

  return {
    index: i,
    x,
    open,
    high,
    low,
    close,
    volume,
    rising: close >= open,
    openY,
    closeY,
    highY,
    lowY,
    bodyTop,
    bodyHeight,
    time: timeStr,
    changePct: (change >= 0 ? "+" : "") + changePct + "%",
    openStr: open.toFixed(2),
    highStr: high.toFixed(2),
    lowStr: low.toFixed(2),
    closeStr: close.toFixed(2),
  };
});

// Compute 9-period EMA
let ema = CANDLES[0].close;
const EMA_POINTS = CANDLES.map((c, i) => {
  ema = c.close * (2 / 10) + ema * (1 - 2 / 10);
  const y = priceToY(ema);
  return `${i === 0 ? "M" : "L"} ${c.x} ${y.toFixed(2)}`;
}).join(" ");

const featureCards = [
  [
    FiMonitor,
    "Your whole toolkit",
    "Charts, option chains, AI agents and a code editor, side by side where you need them.",
  ],
  [
    FiSliders,
    "AI at your side",
    "Your agent the strategy and places trades on your behalf, within the limits and rules you set.",
  ],
  [
    FiActivity,
    "Runs in your browser",
    "Build, backtest and run your strategies with nothing to install. New features arrive on their own.",
  ],
];

function WorkspacePreview() {
  const [isReady, setIsReady] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [mouseY, setMouseY] = useState(100);
  const svgRef = useRef(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const svgX = Math.max(0, Math.min(520, ((e.clientX - rect.left) / rect.width) * 520));
    const svgY = Math.max(0, Math.min(224, ((e.clientY - rect.top) / rect.height) * 224));
    setMouseY(svgY);

    // Find closest candle index
    const idx = Math.max(0, Math.min(CANDLES.length - 1, Math.round((svgX - 10) / (500 / 55))));
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  const activeCandle = hoveredIdx !== null ? CANDLES[hoveredIdx] : CANDLES[CANDLES.length - 1];
  const cursorPrice = yToPrice(mouseY).toFixed(2);

  return (
    <div
      className={`group flex min-h-0 w-full flex-col overflow-hidden rounded-lg border-1 border-line bg-surface shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-[transform,box-shadow,opacity] duration-500 ease-out hover:border-(--brand-primary-hover) hover:shadow-[0_22px_46px_rgba(0,0,0,0.14)] ${
        isReady ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {/* Header */}
      <div className="flex h-8 shrink-0 items-center justify-between bg-surface-2 px-3 text-[8px] text-fg-muted transition-colors duration-300 group-hover:bg-surface-3">
        <span className="flex items-center gap-2">
          <i className="size-1.5 rounded-full bg-(--brand-primary-hover) motion-safe:animate-pulse" />
          Interface preview
        </span>
        
      </div>

      {/* Toolbar */}
      <div className="shrink-0 border-b border-line px-2 py-1.5">
        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap text-[7px] font-medium text-fg-muted [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 rounded bg-(--brand-primary-hover)/15 px-2 py-1 font-semibold">
            NIFTY 50
          </span>

          {["1m", "5m", "1d", "1M", "12M", "EMA", "B", "S"].map(
            (item, index) => (
              <span
                key={item}
                className={`shrink-0 rounded border-1 px-1.5 py-1 transition-colors duration-200 hover:border-(--brand-primary-hover) ${
                  index === 0 || item === "EMA"
                    ? "border-(--brand-primary-hover) bg-(--brand-primary-hover)/15 font-semibold "
                    : "border-line text-fg-muted hover:text-fg"
                }`}
              >
                {item}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Main layout */}
      <div className="grid min-h-0 flex-1 grid-cols-[5.7rem_minmax(0,1fr)]">
        {/* Watchlist */}
        <div className="min-w-0 border-r border-line px-2 py-2 text-[8px]">
          <div className="pb-2.5 flex items-center justify-between border-b border-line font-semibold uppercase tracking-wide text-fg-muted">
            Watchlist
            <i className="size-1 rounded-full bg-bull" />
          </div>

          <div className="space-y-0.5 mt-2">
            {WATCHLIST.map(([name, price, change, positive]) => (
              <div
                key={name}
                className=" transition-transform duration-200 hover:translate-x-0.5"
              >
                <p className="font-semibold text-fg">{name}</p>
                <div className="flex -mt-3 justify-between font-mono text-[7px]">
                  <span
                    className={positive ? "text-bull font-semibold" : "text-bear font-semibold"}
                  >
                    {price}
                  </span>
                  <span
                    className={positive ? "text-bull font-semibold" : "text-bear font-semibold"}
                  >
                    {change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart area */}
        <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
          {/* OHLC header reflecting active candle */}
          <div className="flex h-8 shrink-0 items-center justify-between border-b border-line px-2 font-mono text-[7px] whitespace-nowrap text-fg-muted">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-semibold text-fg">NIFTY 50</span>
              <span>O <span className={activeCandle.rising ? "text-[#089981]" : "text-[#f23645]"}>{activeCandle.openStr}</span></span>
              <span>H <span className="text-fg">{activeCandle.highStr}</span></span>
              <span>L <span className="text-fg">{activeCandle.lowStr}</span></span>
              <span>C <span className={activeCandle.rising ? "text-[#089981]" : "text-[#f23645]"}>{activeCandle.closeStr}</span></span>
              <span className={`font-semibold ${activeCandle.rising ? "text-[#089981]" : "text-[#f23645]"}`}>
                {activeCandle.changePct}
              </span>
            </div>
            {hoveredIdx !== null ? (
              <span className="rounded bg-(--brand-primary-hover)/15 px-1 py-0.5 text-[6.5px] font-semibold text-(--brand-primary-hover)">
                {activeCandle.time}
              </span>
            ) : (
              <span className="text-[6.5px] text-fg-muted font-medium">LIVE</span>
            )}
          </div>

          {/* Responsive SVG chart with Crosshair */}
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <svg
              ref={svgRef}
              viewBox="0 0 520 224"
              preserveAspectRatio="none"
              className="block h-[clamp(10rem,30vh,16rem)] w-full flex-none cursor-crosshair select-none"
              role="img"
              aria-label="Interactive NIFTY 50 candlestick chart preview"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                <clipPath id="price-chart-clip">
                  <rect x="0" y="0" width="520" height="184" />
                </clipPath>
                <clipPath id="volume-chart-clip">
                  <rect x="0" y="186" width="520" height="38" />
                </clipPath>
              </defs>

              {/* Horizontal price grid lines */}
              {[42, 86, 130, 174].map((line) => (
                <line
                  key={line}
                  x1="0"
                  x2="520"
                  y1={line}
                  y2={line}
                  stroke="var(--border-color)"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
              ))}

              {/* Candlesticks (56 candles) */}
              <g clipPath="url(#price-chart-clip)">
                {CANDLES.map((candle, index) => {
                  const isHovered = hoveredIdx === index;
                  return (
                    <g
                      key={index}
                      className={`transition-opacity duration-300 ease-out ${
                        isReady ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 18}ms` }}
                    >
                      {/* Upper and lower wick */}
                      <line
                        x1={candle.x}
                        x2={candle.x}
                        y1={candle.highY}
                        y2={candle.lowY}
                        stroke={candle.rising ? "#089981" : "#f23645"}
                        strokeWidth={isHovered ? "2" : "1.2"}
                      />
                      {/* Candle real body */}
                      <rect
                        x={candle.x - 2.6}
                        y={candle.bodyTop}
                        width="5.2"
                        height={candle.bodyHeight}
                        fill={candle.rising ? "#089981" : "#f23645"}
                        rx="0.5"
                      />
                    </g>
                  );
                })}

                {/* 9-period EMA line */}
                <path
                  d={EMA_POINTS}
                  fill="none"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`[stroke-dasharray:720] transition-[stroke-dashoffset,stroke] duration-[1000ms,700ms] delay-[700ms,700ms] ease-in-out ${
                    isReady
                      ? "[stroke-dashoffset:0] stroke-[var(--brand-primary,#2962ff)]"
                      : "[stroke-dashoffset:720] stroke-[var(--brand-primary,#2962ff)]"
                  }`}
                />
              </g>

              {/* Volume bars at bottom */}
              <g clipPath="url(#volume-chart-clip)">
                {CANDLES.map((candle, index) => {
                  const volHeight = Math.max(3, Math.min(34, candle.volume * 0.65));
                  return (
                    <rect
                      key={`volume-${index}`}
                      x={candle.x - 2.6}
                      y={224 - volHeight}
                      width="5.2"
                      height={volHeight}
                      fill={candle.rising ? "#089981" : "#f23645"}
                      fillOpacity={hoveredIdx === index ? "0.85" : "0.4"}
                      rx="0.5"
                      className={`transition-opacity duration-300 ${
                        isReady ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 18}ms` }}
                    />
                  );
                })}
              </g>

              {/* Interactive Crosshair & Cursor Badges */}
              {hoveredIdx !== null && (
                <g className="pointer-events-none">
                  {/* Vertical crosshair line */}
                  <line
                    x1={activeCandle.x}
                    x2={activeCandle.x}
                    y1={0}
                    y2={224}
                    stroke="var(--border-color)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.9"
                  />
                  {/* Horizontal crosshair line */}
                  <line
                    x1={0}
                    x2={520}
                    y1={mouseY}
                    y2={mouseY}
                    stroke="var(--border-color)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.9"
                  />
                  {/* Close price dot on active candle */}
                  <circle
                    cx={activeCandle.x}
                    cy={activeCandle.closeY}
                    r="3.5"
                    fill="var(--brand-primary, #2962ff)"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  {/* Bottom time pill */}
                  <g transform={`translate(${Math.max(2, Math.min(468, activeCandle.x - 25))}, 210)`}>
                    <rect
                      width="50"
                      height="12"
                      rx="2"
                      fill="var(--bg-secondary, #1e222d)"
                      stroke="var(--border-color)"
                      strokeWidth="0.8"
                    />
                    <text
                      x="25"
                      y="9"
                      textAnchor="middle"
                      fontSize="6.5"
                      fontFamily="monospace"
                      fill="var(--text-primary, #ffffff)"
                    >
                      {activeCandle.time}
                    </text>
                  </g>
                  {/* Right axis price pill */}
                  <g transform={`translate(464, ${Math.max(2, Math.min(208, mouseY - 7))})`}>
                    <rect
                      width="54"
                      height="14"
                      rx="2"
                      fill="var(--bg-secondary, #1e222d)"
                      stroke="var(--border-color)"
                      strokeWidth="0.8"
                    />
                    <text
                      x="27"
                      y="10"
                      textAnchor="middle"
                      fontSize="7"
                      fontFamily="monospace"
                      fontWeight="600"
                      fill="var(--text-primary, #ffffff)"
                    >
                      {cursorPrice}
                    </text>
                  </g>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthWorkspacePreview() {
  return (
    <div className="flex h-fit min-h-fit flex-col gap-3">
      <WorkspacePreview />
      {/* <div className="grid shrink-0 grid-cols-3 gap-3">
        {featureCards.map(([Icon, title, description]) => (
          <div
            key={title}
            className="flex min-h-fit gap-2 rounded-md border-1 border-line bg-surface-2 p-2.5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-primary-hover)] hover:bg-surface-3"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded bg-(--brand-primary-hover)/15 text-(--brand-primary-hover)">
              <Icon size={11} />
            </span>
            <p className="m-0 text-[9px] leading-4 text-fg-muted">
              <strong className="font-semibold text-fg">{title}</strong>{" "}
              {description}
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
}
