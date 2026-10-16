import { useState } from "react";
import { Reveal } from "./motion";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <section
      id="newsletter"
      className="scroll-mt-20 pb-20 sm:pb-28"
      data-testid="newsletter-section"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-1 border-border  bg-card px-6 py-12 text-center sm:px-12 sm:py-16">
            <span className="absolute left-0 top-0 rounded-br-2xl bg-teal px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
              The Morning Pulse
            </span>
            <h2 className="mx-auto max-w-xl font-display text-3xl font-extrabold! tracking-tight text-ink sm:text-4xl">
              One email. Every market open. Zero noise.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-inksoft">
              Levels, gaps and the one chart that matters — in your inbox before
              the bell. Free, forever.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              data-testid="newsletter-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
            >
              <input
                required=""
                placeholder="you@example.com"
                data-testid="newsletter-email-input"
                className="h-12 flex-1 rounded-full border-1 border-border bg-background px-5 text-sm text-ink outline-none transition-colors placeholder:text-inksoft/70 focus:border-teal"
                type="email"
              />
              <button
                type="submit"
                data-testid="newsletter-submit-button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full! bg-ink px-7 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal"
              >
                Subscribe
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
                  className="lucide lucide-arrow-right h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </form>
            <p className="newsletter-confirmation" role="status">
              {subscribed ? "Thanks for subscribing." : ""}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
