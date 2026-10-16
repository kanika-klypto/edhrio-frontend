import { FaRegLightbulb, FaRegMessage } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { Reveal } from "./motion";

const stats = [
  {
    id: "discord",
    testId: "community-discord-counter",
    Icon: FaRegMessage,
    value: "128K+",
    label: "Discord members",
  },
  {
    id: "telegram",
    testId: "community-telegram-counter",
    Icon: IoIosSend,
    value: "96K+",
    label: "Telegram traders",
  },
  {
    id: "ideas",
    testId: "community-ideas-counter",
    Icon: FaRegLightbulb,
    value: "40K",
    label: "Ideas per day",
  },
];

export function Community() {
  return (
    <section
      id="community"
      className="scroll-mt-20 py-16 sm:py-24 lg:py-32"
      data-testid="community-section"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">
              <span className="h-px w-6 bg-teal"></span>Community
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-3xl font-extrabold! tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Trade alone.
              <br />
              Win together.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className=" max-w-md text-sm sm:text-base leading-relaxed text-inksoft ">
              Every chart on Edhrio is a conversation. Share ideas, fork
              scripts and watch the community floor in real time.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-3 flex flex-wrap gap-2">
              {stats.map(({ id, testId, Icon, value, label }) => (
                <div
                  key={id}
                  className="flex items-center gap-3 rounded-xl border-1 border-border bg-card px-4 py-2"
                  data-testid={testId}
                >
                  <Icon className="size-5 text-teal" aria-hidden="true" />
                  <div>
                    <p className="font-display text-lg font-extrabold leading-none text-ink">
                      {value}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-inksoft">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-3 rounded-2xl border-1 border-border bg-card p-2">
              <p className="px-4 pt-3 font-mono text-[10px] font-bold uppercase tracking-wider text-inksoft">
                Live floor
              </p>
              <ul className="mt-1 divide-y divide-border/70">
                <li className="flex items-center gap-3 px-4 py-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-[10px] font-bold text-ink">
                    R
                  </span>
                  <p className="min-w-0 flex-1 truncate text-xs text-inksoft">
                    <span className="font-semibold text-ink">Rahul S.</span>{" "}
                    published an idea
                  </p>
                  <span className="rounded-md bg-teal-light px-2 py-0.5 font-mono text-[10px] font-semibold text-teal">
                    BANKNIFTY · Long
                  </span>
                  <span className="font-mono text-[10px] text-inksoft">2m</span>
                </li>
                <li className="flex items-center gap-3 px-4 py-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-[10px] font-bold text-ink">
                    E
                  </span>
                  <p className="min-w-0 flex-1 truncate text-xs text-inksoft">
                    <span className="font-semibold text-ink">Elena K.</span>{" "}
                    shorted
                  </p>
                  <span className="rounded-md bg-teal-light px-2 py-0.5 font-mono text-[10px] font-semibold text-teal">
                    EUR/USD · Short
                  </span>
                  <span className="font-mono text-[10px] text-inksoft">6m</span>
                </li>
                <li className="flex items-center gap-3 px-4 py-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-[10px] font-bold text-ink">
                    M
                  </span>
                  <p className="min-w-0 flex-1 truncate text-xs text-inksoft">
                    <span className="font-semibold text-ink">Marcus T.</span>{" "}
                    closed a position
                  </p>
                  <span className="rounded-md bg-teal-light px-2 py-0.5 font-mono text-[10px] font-semibold text-teal">
                    NVDA · +4.2%
                  </span>
                  <span className="font-mono text-[10px] text-inksoft">
                    11m
                  </span>
                </li>
                <li className="flex items-center gap-3 px-4 py-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface font-mono text-[10px] font-bold text-ink">
                    I
                  </span>
                  <p className="min-w-0 flex-1 truncate text-xs text-inksoft">
                    <span className="font-semibold text-ink">Ishita P.</span>{" "}
                    shared a script
                  </p>
                  <span className="rounded-md bg-teal-light px-2 py-0.5 font-mono text-[10px] font-semibold text-teal">
                    Pulse Breakout v2
                  </span>
                  <span className="font-mono text-[10px] text-inksoft">
                    18m
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div
            className="grid grid-cols-2 gap-4"
            data-testid="community-photo-grid"
          >
            <div className="group overflow-hidden rounded-2xl border-1 border-border bg-surface row-span-2 min-h-[240px]">
              <img
                alt="Trading terminal with live candlestick charts"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&amp;w=900&amp;auto=format&amp;fit=crop"
              />
            </div>
            <div className="group overflow-hidden rounded-2xl border-1 border-border bg-surface min-h-[150px]">
              <img
                alt="Traders working together in a modern office"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1629904869392-ae2a682d4d01?q=80&amp;w=900&amp;auto=format&amp;fit=crop"
              />
            </div>
            <div className="group overflow-hidden rounded-2xl border-1 border-border bg-surface min-h-[150px]">
              <img
                alt="Close-up of a market chart on a monitor"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1560221328-12fe60f83ab8?q=80&amp;w=900&amp;auto=format&amp;fit=crop"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

