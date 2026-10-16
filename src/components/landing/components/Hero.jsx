import { useState } from "react";
import { Link } from "react-router-dom";
import { CandleChart } from "./CandleChart";
import { FaPlayCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Reveal, MaskLines } from "./motion";

const formatPrice = (number) =>
  number.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
export function Hero() {
  const [quote, setQuote] = useState({
    price: 24532.4,
    change: 0.84,
  });
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pt-36"
    >
      <div className="bg-grid absolute inset-0"></div>
      <div className="glow-teal absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2"></div>
      <div className="grain"></div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-5">
          <Reveal delay={0.55}>
            <span
              className="inline-flex items-center gap-2 rounded-full border-1 border-teal/25 bg-teal-light px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-teal"
              data-testid="hero-status-badge"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal"></span>
              Real-time order flow engine
            </span>
          </Reveal>
          <h1
            className="mt-6! font-extrabold! leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-5xl xl:text-7xl"
            data-testid="hero-title"
          >
            <MaskLines
              lines={[
                "Trade what you",
                <>
                  <span className="text-teal">see</span>, not what
                </>,
                "you guess.",
              ]}
            />
          </h1>
          <Reveal delay={0.9}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-inksoft sm:text-lg">
              The charting terminal for 2.4M+ traders institutional-grade
              data, community ideas and sub-8ms execution in one clean
              workspace.
            </p>
          </Reveal>
          <Reveal delay={1.05}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/chart"
                data-testid="hero-cta-launch"
                className="group inline-flex !no-underline hover:!no-underline items-center gap-2 rounded-full bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-hover"
              >
                Launch terminal
                <FaArrowRight />
              </Link>
              <Link
                to="/chart"
                data-testid="hero-cta-demo"
                className="inline-flex !no-underline hover:!no-underline items-center gap-2 rounded-full border-1 border-border bg-card px-6 py-3.5 text-base font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/30"
              >
                <FaPlayCircle />
                See it in action
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="relative lg:col-span-7">
          <Reveal delay={0.35} y={40}>
            <div className="relative rounded-2xl border-1 border-border bg-card shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      NIFTY 50 · 5m
                    </span>
                    <span
                      className="font-mono text-lg font-bold tabular-nums text-ink"
                      data-testid="hero-live-price-indicator"
                    >
                      {formatPrice(quote.price)}
                    </span>
                    <span
                      className={
                        quote.change >= 0
                          ? "rounded-md px-2 py-0.5 font-mono text-xs font-semibold bg-bull/10 text-bull"
                          : "rounded-md px-2 py-0.5 font-mono text-xs font-semibold bg-bear/10 text-bear"
                      }
                    >
                      {quote.change >= 0 ? "+" : ""}
                      {quote.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {["1m", "5m", "15m", "1D"].map((tf) => (
                      <button
                        key={tf}
                        data-testid={`hero-timeframe-${tf}`}
                        className={`rounded-md! px-2 py-1 font-mono text-xs! font-semibold transition-colors ${
                          tf === "5m"
                            ? "bg-ink text-white"
                            : "text-inksoft hover:bg-surface"
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                    <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-bull/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-bull">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-bull opacity-75"></span>
                        <span className="relative h-1.5 w-1.5 rounded-full bg-bull"></span>
                      </span>
                      Live
                    </span>
                  </div>
                </div>
                <div className="h-[340px] p-1 sm:h-[400px]">
                  <CandleChart onTick={setQuote} />
                </div>
                <div className="flex items-center gap-4 border-t border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-inksoft">
                  <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-4 rounded bg-teal"></span> EMA 20
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-4 rounded bg-amber-500"></span> EMA
                    50
                  </span>
                  <span className="ml-auto hidden sm:inline">
                    Simulated data for illustration
                  </span>
                </div>
              </div>
          </Reveal>
          <Reveal delay={0.6} y={20} className="absolute -left-3 top-10 hidden md:block lg:-left-8">
            <div
              className="flex items-center gap-3 rounded-xl border-1 border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur"
              data-testid="hero-fill-card"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bull/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check h-4 w-4 text-bull"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold text-ink">Order filled</p>
                <p className="font-mono text-xs text-bull">
                  +₹12,480 · BANKNIFTY
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.75} y={20} className="absolute -right-2 bottom-14 hidden md:block lg:-right-6">
            <div
              className="flex items-center gap-3 rounded-xl border-1 border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur"
              data-testid="hero-ideas-card"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trending-up h-4 w-4 text-teal"
                  aria-hidden="true"
                >
                  <path d="M16 7h6v6"></path>
                  <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold text-ink">
                  2,431 ideas today
                </p>
                <p className="font-mono text-xs text-inksoft">
                  community floor
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
