import { useState } from "react";
import { Reveal } from "./motion";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "For curious beginners",
    monthly: 0,
    yearly: 0,
    features: [
      "3 charts per layout",
      "Delayed market data",
      "10 indicators per chart",
      "Community access",
    ],
    action: "Start free",
  },
  {
    id: "pro",
    name: "Pro Trader",
    description: "For serious retail traders",
    monthly: 29,
    yearly: 23,
    features: [
      "Unlimited charts & layouts",
      "Real-time NSE · BSE · Crypto",
      "Unlimited indicators & alerts",
      "PineScript v5 backtesting",
      "Publish ideas & scripts",
    ],
    action: "Start 14-day trial",
    popular: true,
  },
  {
    id: "institutional",
    name: "Institutional",
    description: "For funds & prop desks",
    monthly: 99,
    yearly: 79,
    features: [
      "Everything in Pro Trader",
      "Multi-monitor canvas sync",
      "REST + WebSocket API",
      "DMA execution & Level 2",
      "Priority 24×7 support",
    ],
    action: "Talk to sales",
  },
];

function CheckIcon({ selected }) {
  return (
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
      className={`mt-0.5 h-4 w-4 shrink-0 ${selected ? "text-teal" : "text-inksoft"}`}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PricingCard({ plan, yearly, selected, onSelect }) {
  const price = yearly ? plan.yearly : plan.monthly;

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <article
      className={`pricing-card rounded-2xl! border-1 border-line bg-card p-7 sm:p-8 ${selected ? "pricing-card--selected" : "pricing-card--idle"}`}
      data-testid={`pricing-plan-${plan.id}`}
      role="radio"
      aria-checked={selected}
      aria-label={`Select ${plan.name} plan`}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={onKeyDown}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-ink">{plan.name}</h3>
        {plan.popular && (
          <span className="rounded-full bg-teal px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
            Most popular
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-inksoft">{plan.description}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span
          className="font-display text-5xl font-extrabold tracking-tight text-ink"
          data-testid={`pricing-price-${plan.id}`}
        >
          ${price}
        </span>
        <span className="text-sm text-inksoft">/mo</span>
      </div>
      <p className="mt-1 h-4 font-mono text-[11px] text-inksoft">
        {price > 0 ? `billed ${yearly ? "yearly" : "monthly"}` : ""}
      </p>
      <ul className="mt-3! space-y-3 border-t border-line pt-3! ">
        {plan.features.map((feature) => (
          <li className="flex items-start gap-3 text-sm text-ink" key={feature}>
            <CheckIcon selected={selected} />
            {feature}
          </li>
        ))}
      </ul>
      <button
        type="button"
        data-testid={`pricing-cta-${plan.id}`}
        className={`pricing-card-cta w-full rounded-full! py-3.5 text-sm font-semibold transition-colors duration-200 ${selected ? "bg-teal text-white shadow-lg shadow-teal/25 hover:bg-teal-hover" : "bg-ink text-white hover:bg-teal"}`}
        onClick={onSelect}
      >
        {plan.action}
      </button>
    </article>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <section
      id="pricing"
      className="scroll-mt-20 py-16 sm:py-24 lg:py-32"
      data-testid="pricing-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">
                <span className="h-px w-6 bg-teal" />
                Pricing
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Start free. Upgrade when you're ready.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div
              className="inline-flex items-center rounded-full! border-1 border-border bg-card p-1"
              role="group"
              aria-label="Billing period"
            >
              <button
                type="button"
                data-testid="pricing-toggle-monthly"
                aria-pressed={!yearly}
                onClick={() => setYearly(false)}
                className={`rounded-full! px-5 py-2 text-sm font-semibold transition-colors ${!yearly ? "bg-ink text-white" : "text-inksoft hover:text-ink"}`}
              >
                Monthly
              </button>
              <button
                type="button"
                data-testid="pricing-toggle-billing"
                aria-pressed={yearly}
                onClick={() => setYearly(true)}
                className={`rounded-full! px-5 py-2 text-sm font-semibold transition-colors ${yearly ? "bg-ink text-white" : "text-inksoft hover:text-ink"}`}
              >
                Yearly
              </button>
              <span
                className="ml-1 mr-2 inline-flex items-center px-1 font-mono text-[10px] font-bold leading-none text-teal"
                aria-label="Save 20 percent with yearly billing"
              >
                -20%
              </span>
            </div>
          </Reveal>
        </div>
        <div
          className="pricing-grid mt-12 grid gap-6 lg:grid-cols-3"
          role="radiogroup"
          aria-label="Pricing plan"
        >
          {plans.map((plan, i) => (
            <Reveal
              key={plan.id}
              delay={i * 0.08}
              className={plan.popular ? "lg:-mt-4" : ""}
            >
              <PricingCard
                plan={plan}
                yearly={yearly}
                selected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
