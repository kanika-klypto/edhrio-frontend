import { useState, useEffect } from "react";
import { Reveal } from "./motion";
import { getStockLogo } from "../../../util/stockLogo";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const getMarketMoversUrl = () => {
  const baseUrl = (
    import.meta.env.VITE_MARKET_API_URL ||
    "http://localhost:4001"
  ).trim();

  if (baseUrl.endsWith("/api/market/movers")) {
    return baseUrl;
  }
  return `${baseUrl.replace(/\/+$/, "")}/api/market/movers`;
};

const mapStockItem = (item) => ({
  symbol: item.tradingSymbol || item.symbol || item.securityId || "",
  name: item.displayName || item.name || item.tradingSymbol || "",
  price: Number(item.ltp ?? item.price ?? 0),
  change: Number(item.changePercent ?? item.change ?? 0),
  logo: item.logo || item.logoUrl || item.imageUrl || item.icon || null,
  securityId: item.securityId || item.underlyingSecurityId || item.token || "",
});

function MoverAvatar({ stock }) {
  const [imgError, setImgError] = useState(false);
  const logoSrc = stock.logo || getStockLogo(stock.symbol, stock.name, stock.securityId);

  if (logoSrc && !imgError) {
    return (
      <span className="market-mover-avatar overflow-hidden p-0.5" aria-hidden="true">
        <img
          src={logoSrc}
          alt={stock.name || stock.symbol || "logo"}
          onError={() => setImgError(true)}
          className="size-full rounded-full object-contain"
        />
      </span>
    );
  }

  const initial = (stock.symbol || stock.name || "").trim().slice(0, 1).toUpperCase();

  return (
    <span className="market-mover-avatar text-xs font-bold" aria-hidden="true">
      {initial || "•"}
    </span>
  );
}

function MoverRow({ stock }) {
  const rising = stock.change >= 0;
  const direction = rising ? "up" : "down";

  return (
    <li className="market-mover-row">
      <MoverAvatar stock={stock} />
      <div className="market-mover-identity">
        <span className="market-mover-name" title={stock.name}>
          {stock.name}
        </span>
        <span className="market-mover-symbol">{stock.symbol}</span>
      </div>
      <span className="market-mover-price">
        {priceFormatter.format(stock.price)}
        <small> INR</small>
      </span>
      <span
        className={`market-mover-change market-mover-change--${direction}`}
        aria-label={`${direction} ${Math.abs(stock.change).toFixed(2)} percent`}
      >
        <span aria-hidden="true">{rising ? "▲" : "▼"}</span>{" "}
        {rising ? "+" : "−"}
        {Math.abs(stock.change).toFixed(2)}%
      </span>
    </li>
  );
}

function MoversList({ title, stocks = [], id, isLoading = false }) {
  const stockList = Array.isArray(stocks) ? stocks : [];

  return (
    <section className="market-mover-list" aria-labelledby={id}>
      <h3 id={id}>{title}</h3>
      {stockList.length > 0 ? (
        <ol>
          {stockList.map((stock, index) => (
            <MoverRow key={stock.symbol || index} stock={stock} />
          ))}
        </ol>
      ) : (
        <p className="py-6 text-center text-sm text-inksoft">
          {isLoading ? "Loading..." : "No data available"}
        </p>
      )}
    </section>
  );
}

export function MarketMovers() {
  const [gainersList, setGainersList] = useState([]);
  const [losersList, setLosersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMovers = async () => {
      try {
        setIsLoading(true);
        const url = getMarketMoversUrl();
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const data = json?.data || json;

        if (Array.isArray(data?.gainers)) {
          const mappedGainers = data.gainers.map(mapStockItem);
          if (isMounted) setGainersList(mappedGainers);
        } else if (isMounted) {
          setGainersList([]);
        }

        if (Array.isArray(data?.losers)) {
          const mappedLosers = data.losers.map(mapStockItem);
          if (isMounted) setLosersList(mappedLosers);
        } else if (isMounted) {
          setLosersList([]);
        }
      } catch (error) {
        console.warn("Failed to fetch market movers from API:", error.message);
        if (isMounted) {
          setGainersList([]);
          setLosersList([]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchMovers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="market-movers"
      className="market-movers bg-surface py-16 sm:py-24 lg:py-32"
      data-testid="market-movers-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">
            <span className="h-px w-6 bg-teal" />
            Market movers
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            The biggest moves, at a glance.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 text-sm text-inksoft">
            Live market figures directly from the market API.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="market-movers-grid mt-4 lg:mt-12">
            <MoversList
              title="Stock gainers"
              stocks={gainersList}
              id="market-gainers-heading"
              isLoading={isLoading}
            />
            <MoversList
              title="Stock losers"
              stocks={losersList}
              id="market-losers-heading"
              isLoading={isLoading}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
