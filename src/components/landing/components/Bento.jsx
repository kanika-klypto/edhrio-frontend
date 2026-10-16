import { Reveal } from "./motion";

export function Bento() {
  return (
    <section id="features" className="scroll-mt-20 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">
            <span className="h-px w-6 bg-teal"></span>Features
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Everything a trader needs. Nothing that gets in the way.
          </h2>
        </Reveal>
        <div
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12 lg:gap-6"
          data-testid="bento-grid-container"
        >
          <Reveal className="md:col-span-7" delay={0}>
            <div
              className="group h-full rounded-2xl border-1 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 sm:p-8"
              data-testid="bento-card-orderflow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    Level 2 depth &amp; order flow
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-inksoft sm:text-base">
                    Visualize DOM heatmaps, cumulative delta and institutional
                    block orders — with zero lag.
                  </p>
                </div>
                <span className="rounded-full bg-teal-light px-3 py-1 font-mono whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-teal">
                  Institutional
                </span>
              </div>
              <div className="mt-6 space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="w-14 shrink-0 font-mono text-[11px] tabular-nums text-inksoft">
                    24,542
                  </span>
                  <div className="h-4 flex-1 overflow-hidden rounded-sm bg-surface">
                    <div className="h-full rounded-sm transition-all duration-500 bg-bull/60"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-14 shrink-0 font-mono text-[11px] tabular-nums text-inksoft">
                    24,541
                  </span>
                  <div className="h-4 flex-1 overflow-hidden rounded-sm bg-surface">
                    <div className="h-full rounded-sm transition-all duration-500 bg-bull/60"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-14 shrink-0 font-mono text-[11px] tabular-nums text-inksoft">
                    24,540
                  </span>
                  <div className="h-4 flex-1 overflow-hidden rounded-sm bg-surface">
                    <div className="h-full rounded-sm transition-all duration-500 bg-bull/60"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-14 shrink-0 font-mono text-[11px] tabular-nums text-inksoft">
                    24,543
                  </span>
                  <div className="h-4 flex-1 overflow-hidden rounded-sm bg-surface">
                    <div className="h-full rounded-sm transition-all duration-500 bg-bear/60"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-14 shrink-0 font-mono text-[11px] tabular-nums text-inksoft">
                    24,544
                  </span>
                  <div className="h-4 flex-1 overflow-hidden rounded-sm bg-surface">
                    <div className="h-full rounded-sm transition-all duration-500 bg-bear/60"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-14 shrink-0 font-mono text-[11px] tabular-nums text-inksoft">
                    24,545
                  </span>
                  <div className="h-4 flex-1 overflow-hidden rounded-sm bg-surface">
                    <div className="h-full rounded-sm transition-all duration-500 bg-bear/60"></div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.08}>
            <div
              className="group h-full rounded-2xl border-1 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 sm:p-8"
              data-testid="bento-card-pinescript"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    PineScript v5 &amp; Python IDE
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-inksoft sm:text-base">
                    Write, backtest and deploy custom strategies on real tick
                    data.
                  </p>
                </div>
                <span className="rounded-full bg-teal-light px-3 py-1 font-mono whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-teal">
                  Algo
                </span>
              </div>
              <pre className="mt-4! overflow-x-auto rounded-xl bg-ink p-3 font-mono dark:bg-secondary text-[11px] leading-relaxed text-white/80 sm:text-xs">
                <code>
                  <span className="text-white/40">
                    // PineScript v5 — runs in the cloud
                  </span>
                  <span></span>
                  <span className="text-amber-300">strategy</span>
                  <br />
                  ("Pulse Breakout", overlay=true)
                  <span>
                    <br />
                  </span>
                  long = ta.
                  <span className="text-teal">crossover</span>(close,
                  ta.ema(close, 20))
                  <span>
                    <br />
                  </span>
                  short = ta.
                  <span className="text-teal">crossunder</span>(close,
                  ta.ema(close, 50))
                  <span>
                    <br />
                  </span>
                  strategy.entry("L", strategy.long, when=long)
                </code>
              </pre>
            </div>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0}>
            <div
              className="group h-full rounded-2xl border-1 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 sm:p-8"
              data-testid="bento-card-riskguard"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold! tracking-tight text-ink sm:text-2xl">
                    Smart Risk Guard
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-inksoft sm:text-base">
                    Automated drawdown alerts, trailing stops and a live risk
                    exposure calculator.
                  </p>
                </div>
                <span className="rounded-full bg-teal-light px-3 py-1 font-mono whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-teal">
                  Risk AI
                </span>
              </div>
              <div className="mt-6 flex items-center gap-5">
                <svg viewBox="0 0 120 66" className="w-32">
                  <path
                    d="M10 60 A50 50 0 0 1 110 60"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="10"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M10 60 A50 50 0 0 1 62 10"
                    fill="none"
                    stroke="hsl(var(--candle-green))"
                    strokeWidth="10"
                    strokeLinecap="round"
                  ></path>
                  <circle cx="62" cy="60" r="5" className="fill-ink"></circle>
                  <line
                    x1="62"
                    y1="60"
                    x2="88"
                    y2="30"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="3"
                    strokeLinecap="round"
                  ></line>
                </svg>
                <div>
                  <p className="font-mono text-lg font-bold! text-ink">-0.6R</p>
                  <p className="text-xs text-inksoft">
                    portfolio heat · healthy
                  </p>
                  <p className="mt-1 inline-flex rounded-md bg-bull/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-bull">
                    Guard armed
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="md:col-span-7" delay={0.08}>
            <div
              className="group h-full rounded-2xl border-1 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 sm:p-8"
              data-testid="bento-card-multimonitor"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold! tracking-tight text-ink sm:text-2xl">
                    Multi-monitor canvas sync
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-inksoft sm:text-base">
                    Broadcast chart layouts, drawings and indicator sets across
                    up to 8 displays, in perfect sync.
                  </p>
                </div>
                <span className="rounded-full bg-teal-light px-3 py-1 font-mono whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-teal">
                  Multi-screen
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-lg border-1 border-border bg-surface p-2">
                  <svg viewBox="0 0 100 44" className="w-full">
                    <rect
                      x="5.5"
                      y="26"
                      width="5"
                      height="10"
                      rx="1"
                      className="fill-bear/70"
                    ></rect>
                    <rect
                      x="19.5"
                      y="19"
                      width="5"
                      height="17"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="33.5"
                      y="12"
                      width="5"
                      height="24"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="47.5"
                      y="25"
                      width="5"
                      height="11"
                      rx="1"
                      className="fill-bear/70"
                    ></rect>
                    <rect
                      x="61.5"
                      y="18"
                      width="5"
                      height="18"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="75.5"
                      y="11"
                      width="5"
                      height="25"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="89.5"
                      y="24"
                      width="5"
                      height="12"
                      rx="1"
                      className="fill-bear/70"
                    ></rect>
                  </svg>
                </div>
                <div className="rounded-lg border-1 border-border bg-surface p-2">
                  <svg viewBox="0 0 100 44" className="w-full">
                    <rect
                      x="5.5"
                      y="21"
                      width="5"
                      height="15"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="19.5"
                      y="14"
                      width="5"
                      height="22"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="33.5"
                      y="7"
                      width="5"
                      height="29"
                      rx="1"
                      className="fill-bear/70"
                    ></rect>
                    <rect
                      x="47.5"
                      y="20"
                      width="5"
                      height="16"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="61.5"
                      y="13"
                      width="5"
                      height="23"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="75.5"
                      y="26"
                      width="5"
                      height="10"
                      rx="1"
                      className="fill-bear/70"
                    ></rect>
                    <rect
                      x="89.5"
                      y="19"
                      width="5"
                      height="17"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                  </svg>
                </div>
                <div className="rounded-lg border-1 border-border bg-surface p-2">
                  <svg viewBox="0 0 100 44" className="w-full">
                    <rect
                      x="5.5"
                      y="16"
                      width="5"
                      height="20"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="19.5"
                      y="9"
                      width="5"
                      height="27"
                      rx="1"
                      className="fill-bear/70"
                    ></rect>
                    <rect
                      x="33.5"
                      y="22"
                      width="5"
                      height="14"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="47.5"
                      y="15"
                      width="5"
                      height="21"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="61.5"
                      y="8"
                      width="5"
                      height="28"
                      rx="1"
                      className="fill-bear/70"
                    ></rect>
                    <rect
                      x="75.5"
                      y="21"
                      width="5"
                      height="15"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                    <rect
                      x="89.5"
                      y="14"
                      width="5"
                      height="22"
                      rx="1"
                      className="fill-bull/70"
                    ></rect>
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
