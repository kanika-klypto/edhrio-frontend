import { LuGlobe, LuMonitor, LuSmartphone, LuCodeXml } from "react-icons/lu";
import { Reveal } from "./motion";

const tabs = [
  { id: "web", label: "Web terminal", icon: LuGlobe, active: true },
  { id: "desktop", label: "Desktop app", icon: LuMonitor, active: false },
  { id: "mobile", label: "Mobile", icon: LuSmartphone, active: false },
  { id: "api", label: "API & WebSockets", icon: LuCodeXml, active: false },
];

export function Platforms() {
  return (
    <section
      id="platforms"
      className="scroll-mt-20 bg-surface py-16 sm:py-24 lg:py-32"
      data-testid="platforms-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">
            <span className="h-px w-6 bg-teal"></span>Platforms
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            One market view. Every screen.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {tabs.map(({ id, label, icon: Icon, active }) => (
              <button
                key={id}
                role="tab"
                aria-selected={active ? "true" : "false"}
                data-testid={`platform-tab-${id}`}
                className={`inline-flex items-center gap-2 border-border rounded-full! border-1 px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? " bg-ink text-white"
                    : "  bg-card text-inksoft hover:border-ink/30 hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.2} data-testid="platform-mockup-display">
            <div className="rounded-xl border-1 border-border bg-card shadow-2xl shadow-ink/10">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-bear/70"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-bull/70"></span>
                </span>
                <span className="mx-auto rounded-md bg-surface px-4 py-1 font-mono text-[10px] text-inksoft">
                  edhrio.io/terminal
                </span>
              </div>
              <div className="grid grid-cols-5 gap-3 p-4">
                <div className="col-span-3 rounded-lg border-1 border-border p-3">
                  <svg
                    viewBox="0 0 300 110"
                    className="w-full"
                    preserveAspectRatio="none"
                  >
                    <g>
                      <line
                        x1="6"
                        y1="64.595234934311"
                        x2="6"
                        y2="62.60620301779067"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="3.5"
                        y="62.60620301779067"
                        width="5"
                        height="2"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="17.5"
                        y1="62.60620301779067"
                        x2="17.5"
                        y2="59.185368839370994"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="15"
                        y="59.185368839370994"
                        width="5"
                        height="3.4208341784196747"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="29"
                        y1="59.185368839370994"
                        x2="29"
                        y2="63.224939845283934"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="26.5"
                        y="59.185368839370994"
                        width="5"
                        height="4.03957100591294"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="40.5"
                        y1="63.224939845283934"
                        x2="40.5"
                        y2="56.78661148194612"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="38"
                        y="56.78661148194612"
                        width="5"
                        height="6.438328363337817"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="52"
                        y1="56.78661148194612"
                        x2="52"
                        y2="58.09477538442032"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="49.5"
                        y="56.78661148194612"
                        width="5"
                        height="2"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="63.5"
                        y1="58.09477538442032"
                        x2="63.5"
                        y2="49.51181697478496"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="61"
                        y="49.51181697478496"
                        width="5"
                        height="8.58295840963536"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="75"
                        y1="49.51181697478496"
                        x2="75"
                        y2="49.498221861649576"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="72.5"
                        y="49.498221861649576"
                        width="5"
                        height="2"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="86.5"
                        y1="49.498221861649576"
                        x2="86.5"
                        y2="40.56188277200293"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="84"
                        y="40.56188277200293"
                        width="5"
                        height="8.936339089646644"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="98"
                        y1="40.56188277200293"
                        x2="98"
                        y2="41.20218761793696"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="95.5"
                        y="40.56188277200293"
                        width="5"
                        height="2"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="109.5"
                        y1="41.20218761793696"
                        x2="109.5"
                        y2="33.85504382533671"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="107"
                        y="33.85504382533671"
                        width="5"
                        height="7.347143792600249"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="121"
                        y1="33.85504382533671"
                        x2="121"
                        y2="27.844890982190776"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="118.5"
                        y="27.844890982190776"
                        width="5"
                        height="6.0101528431459315"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="132.5"
                        y1="27.844890982190776"
                        x2="132.5"
                        y2="32.34898454727265"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="130"
                        y="27.844890982190776"
                        width="5"
                        height="4.504093565081874"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="144"
                        y1="32.34898454727265"
                        x2="144"
                        y2="29.377882486674267"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="141.5"
                        y="29.377882486674267"
                        width="5"
                        height="2.9711020605983833"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="155.5"
                        y1="29.377882486674267"
                        x2="155.5"
                        y2="36.774282988417156"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="153"
                        y="29.377882486674267"
                        width="5"
                        height="7.396400501742889"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="167"
                        y1="36.774282988417156"
                        x2="167"
                        y2="36.23034120661541"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="164.5"
                        y="36.23034120661541"
                        width="5"
                        height="2"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="178.5"
                        y1="36.23034120661541"
                        x2="178.5"
                        y2="45.32155870223349"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="176"
                        y="36.23034120661541"
                        width="5"
                        height="9.091217495618082"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="190"
                        y1="45.32155870223349"
                        x2="190"
                        y2="45.55351482382444"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="187.5"
                        y="45.32155870223349"
                        width="5"
                        height="2"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="201.5"
                        y1="45.55351482382444"
                        x2="201.5"
                        y2="54.416295552451174"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="199"
                        y="45.55351482382444"
                        width="5"
                        height="8.862780728626731"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="213"
                        y1="54.416295552451174"
                        x2="213"
                        y2="53.44062795112512"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="210.5"
                        y="53.44062795112512"
                        width="5"
                        height="2"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="224.5"
                        y1="53.44062795112512"
                        x2="224.5"
                        y2="51.24954059573352"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="222"
                        y="51.24954059573352"
                        width="5"
                        height="2.191087355391602"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="236"
                        y1="51.24954059573352"
                        x2="236"
                        y2="56.599862891709854"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="233.5"
                        y="51.24954059573352"
                        width="5"
                        height="5.3503222959763335"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="247.5"
                        y1="56.599862891709854"
                        x2="247.5"
                        y2="51.408994778216794"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="245"
                        y="51.408994778216794"
                        width="5"
                        height="5.19086811349306"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="259"
                        y1="51.408994778216794"
                        x2="259"
                        y2="53.76399984731224"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="256.5"
                        y="51.408994778216794"
                        width="5"
                        height="2.355005069095448"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="270.5"
                        y1="53.76399984731224"
                        x2="270.5"
                        y2="45.912020852006094"
                        stroke="#0f9d6c"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="268"
                        y="45.912020852006094"
                        width="5"
                        height="7.851978995306148"
                        rx="1"
                        fill="#0f9d6c"
                      ></rect>
                    </g>
                    <g>
                      <line
                        x1="282"
                        y1="45.912020852006094"
                        x2="282"
                        y2="46.233072722616356"
                        stroke="#e5484d"
                        strokeWidth="1"
                      ></line>
                      <rect
                        x="279.5"
                        y="45.912020852006094"
                        width="5"
                        height="2"
                        rx="1"
                        fill="#e5484d"
                      ></rect>
                    </g>
                  </svg>
                  <div className="mt-2 flex gap-1.5">
                    <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[9px] text-inksoft">
                      EMA 20
                    </span>
                    <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[9px] text-inksoft">
                      EMA 50
                    </span>
                    <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[9px] text-inksoft">
                      VWAP
                    </span>
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="rounded-lg border-1 border-border p-3">
                    <p className="font-mono text-[9px] uppercase text-inksoft">
                      Order ticket
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-1.5">
                      <span className="rounded bg-bull/10 py-1.5 text-center font-mono text-[10px] font-bold text-bull">
                        BUY
                      </span>
                      <span className="rounded bg-bear/10 py-1.5 text-center font-mono text-[10px] font-bold text-bear">
                        SELL
                      </span>
                    </div>
                    <div className="mt-1.5 h-7 rounded border-1 border-border bg-surface px-2 font-mono text-[10px] leading-7 text-inksoft">
                      Qty 50
                    </div>
                  </div>
                  <div className="rounded-lg border-1 border-border p-3">
                    <p className="font-mono text-[9px] uppercase text-inksoft">
                      Positions
                    </p>
                    <p className="mt-1 font-mono text-xs font-bold text-bull">
                      +₹12,480
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <h3 className="font-display text-2xl font-extrabold! tracking-tight text-ink sm:text-3xl">
              Zero-install, full power
            </h3>
            <p className="mt-4 text-base leading-relaxed text-inksoft sm:text-lg">
              The complete terminal in your browser — 100MB of chart memory,
              hotkeys and layouts that follow you anywhere.
            </p>
            <ul className="mt-6! space-y-3">
              <li className="flex items-center gap-3 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-light">
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
                    className="lucide lucide-check h-3 w-3 text-teal"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </span>
                No download, ever
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-light">
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
                    className="lucide lucide-check h-3 w-3 text-teal"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </span>
                Multi-chart layouts
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-light">
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
                    className="lucide lucide-check h-3 w-3 text-teal"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </span>
                Cloud-synced drawings
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
