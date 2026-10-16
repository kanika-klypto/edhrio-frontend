import { useEffect } from "react";
import { Bento } from "./components/Bento";
import { Community } from "./components/Community";
import { Footer } from "./components/Footer";
import { HeaderTailwind } from './components/HeaderTailwind';
import { Hero } from "./components/Hero";
import { MarketMovers } from "./components/MarketMovers";
import { Newsletter } from "./components/Newsletter";
import { Platforms } from "./components/Platforms";
import { Pricing } from "./components/Pricing";
import { TopStories } from "./components/TopStories";
import { Ticker } from "./components/Ticker";
import { useLandingTheme } from "./useLandingTheme";

const shellClasses = [
  "min-h-screen bg-background text-ink antialiased",
  "[&_.font-display]:font-[family-name:var(--font-display)] [&_.font-mono]:font-[family-name:var(--font-mono)]",
  "[&_.site-header]:fixed [&_.site-header]:inset-x-0 [&_.site-header]:top-0 [&_.site-header]:z-50 [&_.site-header]:border-b [&_.site-header]:border-transparent [&_.site-header]:bg-background/90 [&_.site-header]:backdrop-blur-md",
  "[&_.site-header--scrolled]:border-border [&_.site-nav-actions]:ml-3 [&_.site-nav-actions]:flex [&_.site-nav-actions]:items-center [&_.site-nav-actions]:gap-2.5 [&_.site-nav-search]:w-[clamp(155px,17vw,215px)]",
  "[&_.brand-image]:block [&_.brand-image]:h-[28px] [&_.brand-image]:w-[82px] [&_.brand-image]:object-cover [&_.brand-image--footer]:h-8 [&_.brand-image--footer]:w-24",
  "[&_.products-menu]:relative [&_.profile-menu]:relative [&_.nav-search]:relative [&_.products-menu-trigger]:inline-flex [&_.products-menu-trigger]:items-center [&_.products-menu-trigger]:rounded-full [&_.products-menu-trigger]:px-3 [&_.products-menu-trigger]:py-2 [&_.products-menu-trigger]:text-sm [&_.products-menu-trigger]:text-inksoft",
  "[&_.products-menu-panel]:absolute [&_.products-menu-panel]:left-0 [&_.products-menu-panel]:top-full [&_.products-menu-panel]:z-[60] [&_.products-menu-panel]:min-w-56 [&_.products-menu-panel]:rounded-xl [&_.products-menu-panel]:border [&_.products-menu-panel]:border-border [&_.products-menu-panel]:bg-secondary [&_.products-menu-panel]:p-1.5 [&_.products-menu-panel]:shadow-xl",
  "[&_.products-menu-option]:flex [&_.products-menu-option]:w-full [&_.products-menu-option]:items-center [&_.products-menu-option]:gap-3 [&_.products-menu-option]:rounded-lg [&_.products-menu-option]:px-3 [&_.products-menu-option]:py-2.5 [&_.products-menu-option]:text-left [&_.products-menu-option]:text-sm [&_.products-menu-option]:text-ink hover:[&_.products-menu-option]:bg-accent/10",
  "[&_.nav-search-icon]:pointer-events-none [&_.nav-search-icon]:absolute [&_.nav-search-icon]:left-3 [&_.nav-search-icon]:top-3 [&_.nav-search-icon]:size-4 [&_.nav-search-icon]:text-inksoft [&_.nav-search-input]:h-10 [&_.nav-search-input]:w-full [&_.nav-search-input]:rounded-full [&_.nav-search-input]:border-1 [&_.nav-search-input]:border-border [&_.nav-search-input]:bg-card [&_.nav-search-input]:pl-9 [&_.nav-search-input]:pr-3 [&_.nav-search-input]:text-sm [&_.nav-search-input]:outline-none focus:[&_.nav-search-input]:border-accent",
  "[&_.nav-search-results]:absolute [&_.nav-search-results]:left-0 [&_.nav-search-results]:right-0 [&_.nav-search-results]:top-12 [&_.nav-search-results]:z-[60] [&_.nav-search-results]:rounded-xl [&_.nav-search-results]:border-1 [&_.nav-search-results]:border-border [&_.nav-search-results]:bg-secondary [&_.nav-search-results]:p-1.5 [&_.nav-search-results]:shadow-xl [&_.nav-search-results_a]:block [&_.nav-search-results_a]:rounded-lg [&_.nav-search-results_a]:px-3 [&_.nav-search-results_a]:py-2 [&_.nav-search-results_a]:text-sm",
  "[&_.profile-menu-trigger]:grid [&_.profile-menu-trigger]:size-10 [&_.profile-menu-trigger]:place-items-center [&_.profile-menu-trigger]:rounded-full! [&_.profile-menu-trigger]:border-1 [&_.profile-menu-trigger]:border-border [&_.profile-menu-trigger]:bg-card [&_.profile-menu-panel]:absolute [&_.profile-menu-panel]:right-0 [&_.profile-menu-panel]:top-12 [&_.profile-menu-panel]:z-[60] [&_.profile-menu-panel]:w-56 [&_.profile-menu-panel]:overflow-hidden [&_.profile-menu-panel]:rounded-xl [&_.profile-menu-panel]:border-1 [&_.profile-menu-panel]:border-border [&_.profile-menu-panel]:bg-secondary [&_.profile-menu-panel]:shadow-xl [&_.profile-sign-in]:block [&_.profile-sign-in]:w-full [&_.profile-sign-in]:px-3.5 [&_.profile-sign-in]:py-3 [&_.profile-sign-in]:text-left [&_.profile-theme-row]:flex [&_.profile-theme-row]:items-center [&_.profile-theme-row]:justify-between [&_.profile-theme-row]:border-t-1 [&_.profile-theme-row]:border-border [&_.profile-theme-row]:bg-surface-2 [&_.profile-theme-row]:px-3.5 [&_.profile-theme-row]:py-2.5",
  "[&_.theme-switch]:relative [&_.theme-switch]:inline-flex [&_.theme-switch]:w-9 [&_.theme-switch]:h-5 [&_.theme-switch-input]:absolute [&_.theme-switch-input]:inset-0 [&_.theme-switch-input]:z-10 [&_.theme-switch-input]:cursor-pointer [&_.theme-switch-input]:opacity-0 [&_.theme-switch-track]:block [&_.theme-switch-track]:h-5 [&_.theme-switch-track]:w-9 [&_.theme-switch-track]:rounded-full! [&_.theme-switch-track]:bg-slate-400 [&_.theme-switch-thumb]:absolute [&_.theme-switch-thumb]:left-0.5 [&_.theme-switch-thumb]:top-0.5 [&_.theme-switch-thumb]:size-4 [&_.theme-switch-thumb]:rounded-full! [&_.theme-switch-thumb]:bg-white [&_.theme-switch-thumb]:transition-transform [&_.theme-switch-input:checked+_.theme-switch-track]:bg-accent [&_.theme-switch-input:checked+_.theme-switch-track_.theme-switch-thumb]:translate-x-[16px]",
  "[&_.bg-grid]:bg-[linear-gradient(var(--border-color)_1px,transparent_1px),linear-gradient(90deg,var(--border-color)_1px,transparent_1px)] [&_.bg-grid]:bg-[size:32px_32px] [&_.bg-grid]:opacity-30 [&_.glow-teal]:bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--brand-primary)_16%,transparent),transparent_72%)]",
  "[&_.stock-ticker]:flex [&_.stock-ticker]:h-9 [&_.stock-ticker]:items-center [&_.stock-ticker]:overflow-hidden [&_.stock-ticker]:bg-panel [&_.stock-ticker]:text-fg [&_.stock-ticker-arrow]:grid [&_.stock-ticker-arrow]:h-9 [&_.stock-ticker-arrow]:w-8 [&_.stock-ticker-arrow]:place-items-center [&_.stock-ticker-arrow]:bg-panel [&_.stock-ticker-viewport]:min-w-0 [&_.stock-ticker-viewport]:flex-1 [&_.stock-ticker-viewport]:overflow-hidden [&_.stock-ticker-track]:flex [&_.stock-ticker-group]:flex [&_.stock-ticker-item]:inline-flex [&_.stock-ticker-item]:shrink-0 [&_.stock-ticker-item]:items-center [&_.stock-ticker-item]:gap-2 [&_.stock-ticker-item]:pr-5 [&_.stock-ticker-item]:font-mono [&_.stock-ticker-item]:text-xs [&_.stock-ticker-change--up]:text-success [&_.stock-ticker-change--down]:text-danger",
  "[&_.pricing-page]:min-h-screen [&_.pricing-page]:pt-16 [&_.pricing-card]:flex [&_.pricing-card]:h-full [&_.pricing-card]:flex-col [&_.pricing-card--selected]:border-accent [&_.pricing-card--selected]:shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--brand-primary)_40%,transparent)] [&_.pricing-card-cta]:mt-auto",
  "[&_.market-movers-grid]:grid [&_.market-movers-grid]:gap-9 lg:[&_.market-movers-grid]:grid-cols-2 [&_.market-mover-row]:grid [&_.market-mover-row]:grid-cols-[30px_minmax(0,1fr)_auto_auto] [&_.market-mover-row]:items-center [&_.market-mover-row]:gap-2.5 [&_.market-mover-row]:border-b [&_.market-mover-row]:border-border [&_.market-mover-row]:py-3 [&_.market-mover-avatar]:grid [&_.market-mover-avatar]:size-[30px] [&_.market-mover-avatar]:place-items-center [&_.market-mover-avatar]:rounded-full [&_.market-mover-avatar]:border [&_.market-mover-avatar]:border-border [&_.market-mover-avatar]:text-accent [&_.market-mover-identity]:min-w-0 [&_.market-mover-name]:block [&_.market-mover-name]:truncate [&_.market-mover-name]:font-semibold [&_.market-mover-symbol]:rounded [&_.market-mover-symbol]:bg-surface-2 [&_.market-mover-symbol]:px-1 [&_.market-mover-symbol]:font-mono [&_.market-mover-symbol]:text-[9px] [&_.market-mover-change]:min-w-20 [&_.market-mover-change]:rounded-md [&_.market-mover-change]:px-2 [&_.market-mover-change]:py-1.5 [&_.market-mover-change]:text-center [&_.market-mover-change]:font-mono [&_.market-mover-change]:text-[11px] [&_.market-mover-change]:text-white [&_.market-mover-change--up]:bg-success [&_.market-mover-change--down]:bg-danger",
  "[&_a.bg-ink]:!bg-accent [&_button.bg-ink]:!bg-accent [&_a.bg-ink:hover]:!bg-accent [&_button.bg-ink:hover]:!bg-accent [&_.mobile-search-panel]:border-b [&_.mobile-search-panel]:border-border [&_.mobile-search-panel]:bg-background [&_.mobile-search-panel]:px-4 [&_.mobile-search-panel]:pb-3 lg:[&_.mobile-search-panel]:hidden [&_.mobile-menu]:border-b [&_.mobile-menu]:border-border [&_.mobile-menu]:bg-background [&_.mobile-menu]:px-6 [&_.mobile-menu]:py-3 [&_.mobile-menu_a]:block [&_.mobile-menu_a]:py-2.5 [&_.mobile-menu-cta]:!mt-2 [&_.mobile-menu-cta]:!rounded-full [&_.mobile-menu-cta]:!bg-accent [&_.mobile-menu-cta]:!px-4 [&_.mobile-menu-cta]:!text-white",
].join(" ");

const responsiveClasses = '[&_.site-nav-search]:hidden sm:[&_.site-nav-search]:block [&_.site-mobile-search-button]:grid [&_.site-mobile-search-button]:size-10 [&_.site-mobile-search-button]:place-items-center [&_.site-mobile-search-button]:rounded-full [&_.site-mobile-search-button]:border [&_.site-mobile-search-button]:border-border sm:[&_.site-mobile-search-button]:hidden [&_.mobile-menu]:flex [&_.mobile-menu]:flex-col [&_.mobile-menu]:gap-0.5 lg:[&_.mobile-menu]:hidden max-md:[&_.market-movers-grid]:grid-cols-1';

const referenceClasses = 'dark:!bg-black dark:[&_.bg-surface]:!bg-black dark:[&_.bg-background]:!bg-black dark:[&_.bg-card]:!bg-black dark:[&_.products-menu-panel]:!border-[#2c2c2c] dark:[&_.products-menu-panel]:!bg-secondary [&_.products-menu-panel]:mt-2 dark:[&_.nav-dropdown-panel]:!border-[#2c2c2c] dark:[&_.nav-dropdown-panel]:!bg-secondary [&_.nav-dropdown-panel]:mt-2 dark:[&_.stock-ticker]:!bg-black dark:[&_.stock-ticker-arrow]:!bg-black [&_p]:!mb-0 [&_h1]:!mb-0 [&_h2]:!mb-0 [&_h3]:!mb-0 [&_h4]:!mb-0 [&_ul]:!mb-0 [&_ul]:!pl-0 [&_[data-testid=hero-fill-card]]:!px-3 [&_[data-testid=hero-fill-card]]:!py-2 [&_[data-testid=hero-ideas-card]]:!px-3 [&_[data-testid=hero-ideas-card]]:!py-2 [&_[data-testid=hero-cta-demo]]:!border-accent [&_[data-testid=hero-cta-demo]]:!bg-transparent [&_[data-testid=hero-cta-demo]]:!text-accent [&_[data-testid=hero-cta-demo]>span]:!bg-accent [&_[data-testid=hero-cta-demo]>span]:!text-black [&_footer_a]:!text-inksoft [&_footer_a]:!no-underline [&_footer_a:hover]:!text-accent [&_footer_a:hover]:!no-underline';

export default function LandingShell({ pricingOnly = false }) {
  const { theme, toggleTheme } = useLandingTheme();

  useEffect(() => {
    document.title = pricingOnly ? "Pricing | Klypto" : "Klypto - See the market clearly";
  }, [pricingOnly]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pricingOnly]);

  return (
    <div className={`${shellClasses} ${responsiveClasses} ${referenceClasses}`}>
      <HeaderTailwind theme={theme} onToggleTheme={toggleTheme} />
      {pricingOnly ? <main className="pricing-page"><Pricing /></main> : <main className="landing-page [&>section:not(#markets):not(#top)]:!py-14 sm:[&>section:not(#markets):not(#top)]:!py-16 [&>#top]:!pb-16 [&>#top]:!pt-24 lg:[&>#top]:!pt-28"><Hero /><Ticker /><TopStories /><Bento /><Platforms /><MarketMovers /><Community /><Newsletter /></main>}
      <Footer theme={theme} />
    </div>
  );
}
