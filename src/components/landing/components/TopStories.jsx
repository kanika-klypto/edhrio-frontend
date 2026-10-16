import { useState, useEffect } from "react";
import { LuChevronRight, LuX, LuTrendingUp, LuTrendingDown, LuMinus, LuExternalLink, LuClock } from "react-icons/lu";
import { Reveal } from "./motion";
import { getStockLogo } from "../../../util/stockLogo";

const getMarketNewsUrl = () => {
  const baseUrl = (
    import.meta.env.VITE_MARKET_API_URL ||
    "http://localhost:4001"
  ).trim();

  if (baseUrl.endsWith("/api/market/news")) {
    return baseUrl;
  }
  return `${baseUrl.replace(/\/+$/, "")}/api/market/news`;
};

function formatTimeAgo(dateString) {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return String(dateString);

  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - date.getTime());
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "Just now";
  if (diffMins < 60) return `${diffMins} mins ago`;
  if (diffHours === 1) return "1 hour ago";
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function StoryIcon({ story }) {
  const [imgError, setImgError] = useState(false);
  const symbol = (story.displaySymbol || story.smSymbol || story.stockName || "").toUpperCase();
  const category = (story.category || "").toUpperCase();

  // 1. Check if stock logo exists in local assets or story object
  const logoSrc = story.logo || getStockLogo(symbol, story.stockName, story.isinCode);
  if (logoSrc && !imgError) {
    return (
      <span className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 border-1 border-border">
        <img
          src={logoSrc}
          alt={symbol}
          onError={() => setImgError(true)}
          className="size-full object-contain"
        />
      </span>
    );
  }

  // 2. Fallback initials badge
  const initial = (symbol || category || "N").slice(0, 2).trim();
  const sentimentColor =
    story.sentiment === "positive"
      ? "bg-success/20 text-success border-success/30"
      : story.sentiment === "negative"
      ? "bg-danger/20 text-danger border-danger/30"
      : "bg-surface-2 text-inksoft border-border";

  return (
    <span
      className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold border-1 ${sentimentColor}`}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

function StoryCard({ story, onSelect }) {
  const timeAgo = formatTimeAgo(story.publishDate);
  const sourceName = story.source || (story.category ? story.category.replace(/_/g, " ") : "Edhrio News");

  return (
    <article
      onClick={() => onSelect(story)}
      className="group flex flex-col text-left cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
    >
      {/* Top Meta Line: Icon + Time Ago · Source */}
      <div className="flex items-center gap-2 text-xs text-inksoft">
        <StoryIcon story={story} />
        <span className="truncate">
          {timeAgo} <span className="text-inksoft/60">·</span> {sourceName}
        </span>
      </div>

      {/* Story Headline */}
      <h3 className="mt-2 text-sm sm:text-base! font-medium leading-[1.38] tracking-tight text-ink group-hover:text-accent transition-colors line-clamp-3">
        {story.title}
      </h3>
    </article>
  );
}

export function TopStories() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const url = getMarketNewsUrl();
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const json = await response.json();
        const rawItems = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json)
          ? json
          : [];

        if (rawItems.length > 0 && isMounted) {
          const mapped = rawItems.map((item) => {
            const newsObj = item.newsObject || {};
            return {
              displaySymbol: item.displaySymbol || item.smSymbol || item.stockName || "",
              smSymbol: item.smSymbol || item.displaySymbol || "",
              stockName: item.stockName || "",
              title: item.title || newsObj.title || item.text || "",
              text: item.text || newsObj.text || "",
              publishDate: item.publishDate || json.updatedAt || new Date().toISOString(),
              source: item.source || (item.category ? item.category.replace(/_/g, " ") : "Edhrio Market"),
              category: item.category || item.subCategory || "Market",
              sentiment: item.sentiment || newsObj.overallSentiment || "neutral",
              isinCode: item.isinCode || "",
            };
          });
          setStories(mapped);
        }
      } catch (err) {
        console.warn("Using fallback news items due to API:", err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-10 sm:py-14 bg-background text-ink" aria-labelledby="top-stories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching screenshot: Top stories > */}
        <Reveal>
          <div className="flex items-center justify-between mb-7 sm:mb-9">
            <h2
              id="top-stories-heading"
              className="group inline-flex items-center gap-1.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink transition-colors"
            >
              <span>Top stories</span>
              <LuChevronRight
                className="size-5 text-inksoft transition-transform group-hover:translate-x-1 group-hover:text-accent"
                aria-hidden="true"
              />
            </h2>
            {isLoading && (
              <span className="text-xs text-inksoft font-mono animate-pulse">
                Updating...
              </span>
            )}
          </div>
        </Reveal>

        {/* 3-column Responsive Grid */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-7 sm:gap-y-9">
            {Array.isArray(stories) && stories.length > 0 ? (
              stories.map((story, idx) => (
                <StoryCard
                  key={`${story.title}-${idx}`}
                  story={story}
                  onSelect={(s) => setSelectedStory(s)}
                />
              ))
            ) : isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex flex-col gap-2.5 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="size-5 rounded-full bg-surface-2" />
                    <div className="h-3 w-28 rounded bg-surface-2" />
                  </div>
                  <div className="h-4 w-5/6 rounded bg-surface-2" />
                  <div className="h-4 w-3/4 rounded bg-surface-2" />
                </div>
              ))
            ) : (
              <p className="col-span-full py-8 text-center text-sm text-inksoft">
                No market stories available at this time.
              </p>
            )}
          </div>
        </Reveal>
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedStory(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-7"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedStory(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-inksoft hover:bg-surface-2 hover:text-ink transition-colors"
              aria-label="Close story details"
            >
              <LuX className="size-5" />
            </button>

            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <StoryIcon story={selectedStory} />
              {selectedStory.displaySymbol && (
                <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-xs font-semibold text-accent">
                  {selectedStory.displaySymbol}
                </span>
              )}
              {selectedStory.category && (
                <span className="rounded bg-surface-2 px-2 py-0.5 text-xs text-inksoft">
                  {selectedStory.category.replace(/_/g, " ")}
                </span>
              )}
              {selectedStory.sentiment && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    selectedStory.sentiment === "positive"
                      ? "bg-success/15 text-success"
                      : selectedStory.sentiment === "negative"
                      ? "bg-danger/15 text-danger"
                      : "bg-surface-2 text-inksoft"
                  }`}
                >
                  {selectedStory.sentiment === "positive" ? (
                    <LuTrendingUp className="size-3" />
                  ) : selectedStory.sentiment === "negative" ? (
                    <LuTrendingDown className="size-3" />
                  ) : (
                    <LuMinus className="size-3" />
                  )}
                  {selectedStory.sentiment.toUpperCase()}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-display text-lg sm:text-xl font-bold leading-snug text-ink mb-3">
              {selectedStory.title}
            </h3>

            {/* Meta */}
            <div className="flex items-center gap-2 text-xs text-inksoft mb-4">
              <LuClock className="size-3.5" />
              <span>{formatTimeAgo(selectedStory.publishDate)}</span>
              <span>·</span>
              <span>{selectedStory.source || "Edhrio News"}</span>
            </div>

            {/* Content text */}
            <div className="border-t border-border pt-4 text-sm text-ink leading-relaxed">
              <p>{selectedStory.text || selectedStory.title}</p>
            </div>

            {/* Footer action */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Default export for flexibility
export default TopStories;
