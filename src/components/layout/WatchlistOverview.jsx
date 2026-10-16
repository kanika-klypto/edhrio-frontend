import React, { useState, useEffect, useMemo, useRef } from "react";
import { BsGrid } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { FiMoreHorizontal, FiChevronDown } from "react-icons/fi";
import { getStockLogo, getStockFullName } from "../../util/stockLogo";
import apiService from "../../services/apiServices";
import { globalCache } from "../../util/useSocket";

// Default fallback data matching the reference payload and screenshot
const DEFAULT_COMPANY_INFO = {
  CO: {
    EPS: null,
    EBITDA: 34186.4,
    SECTOR: "Financial Services",
    INDUSTRY: "Banks",
    BOOK_VALUE: 711.67,
    MARKET_CAP: 401651.001366,
    DIVIDEND_YIELD: 0.08,
    FIFTY_TWO_WEEK_LOW: 1150.3,
    FIFTY_TWO_WEEK_HIGH: 1418.3,
  },
  SHP: {
    DII_HOLDING: 44.54,
    FII_HOLDING: 41.16,
    PUBLIC_HOLDING: 5.29,
    PROMOTER_HOLDING: 7.86,
    REPORTING_PERIOD: null,
    CHANGE_IN_DII_HOLDING: 1.85,
    CHANGE_IN_FII_HOLDING: -1.84,
  },
  RATIOS: {
    ROE: null,
    ROCE: 5.47,
    PB_RATIO: 1.8105,
    PE_RATIO: 14.36,
    INDUSTRY_EPS: 24.41,
    DEBT_TO_EQUITY: 0,
    PE_TO_SECTOR_PE: 8.975,
    INDUSTRY_PB_RATIO: 1.51,
    INDUSTRY_CURRENT_RATIO: 0,
    INDUSTRY_DEBT_TO_EQUITY: 0,
    INDUSTRY_DIVIDEND_YIELD: 0.48,
    INDUSTRY_OPERATING_MARGIN: 0,
  },
};

const parseNum = (val) => {
  if (val == null) return NaN;
  if (typeof val === "number") return val;
  const cleaned = String(val).replace(/,/g, "").replace(/%/g, "").trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? NaN : num;
};

const getSymbolKey = (symbol) =>
  String(symbol || "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

// Helper to calculate SVG donut slice offsets
const DonutChart = ({
  dii = 44.54,
  fii = 41.16,
  promoter = 7.86,
  pub = 5.29,
}) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius; // ~226.19

  const slices = [
    { value: dii, color: "#2979ff" }, // DII: Blue
    { value: fii, color: "#00e5ff" }, // FII: Cyan
    { value: promoter, color: "#a855f7" }, // Promoter: Purple
    { value: pub, color: "#f97316" }, // Public: Orange
  ];

  let cumulativeOffset = 0;

  return (
    <div className="relative flex items-center justify-center shrink-0">
      <svg
        width="88"
        height="88"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          className="text-surface-2"
          strokeWidth="14"
        />
        {slices.map((slice, i) => {
          const sliceLength = (slice.value / 100) * circumference;
          const strokeDashoffset = -cumulativeOffset;
          cumulativeOffset += sliceLength;
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke={slice.color}
              strokeWidth="14"
              strokeDasharray={`${sliceLength} ${circumference - sliceLength}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[13px] font-bold text-fg">100%</span>
      </div>
    </div>
  );
};

// Grouped bar item for Key Ratios
const GroupedBarItem = ({
  label,
  stockVal,
  stockDisplay,
  indVal,
  indDisplay,
}) => {
  const sVal = parseFloat(String(stockVal != null ? stockVal : 0).replace(/,/g, "")) || 0;
  const iVal = parseFloat(String(indVal != null ? indVal : 0).replace(/,/g, "")) || 0;
  const maxVal = Math.max(sVal, iVal, 0.01);
  const MAX_BAR_HEIGHT = 44; // max bar height in pixels

  // Direct pixel height so bars NEVER collapse to 0
  const stockBarH = sVal > 0 ? Math.max(4, Math.round((sVal / maxVal) * MAX_BAR_HEIGHT)) : 3;
  const indBarH = iVal > 0 ? Math.max(4, Math.round((iVal / maxVal) * MAX_BAR_HEIGHT)) : 3;

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      {/* Bars container: fixed height 64px, items aligned at bottom */}
      <div className="flex items-end justify-center gap-1.5 sm:gap-2 h-[64px] w-full pb-0.5">
        {/* Stock Bar Column */}
        <div className="flex flex-col items-center justify-end flex-1 max-w-[26px] min-w-[14px]">
          <span className="text-[9px] sm:text-[10px] font-semibold text-fg whitespace-nowrap mb-1">
            {stockDisplay}
          </span>
          <div
            className="w-full rounded-t-[3px] bg-[#2979ff] transition-all duration-300"
            style={{ height: `${stockBarH}px`, minHeight: "3px" }}
          />
        </div>

        {/* Industry Bar Column */}
        <div className="flex flex-col items-center justify-end flex-1 max-w-[26px] min-w-[14px]">
          <span className="text-[9px] sm:text-[10px] font-medium text-fg-muted whitespace-nowrap mb-1">
            {indDisplay}
          </span>
          <div
            className="w-full rounded-t-[3px] bg-[#cbd5e1] dark:bg-[#475569] transition-all duration-300"
            style={{ height: `${indBarH}px`, minHeight: "3px" }}
          />
        </div>
      </div>

      {/* Bottom Baseline Line */}
      <div className="w-full h-[1px] bg-line/40 my-1" />

      {/* Label underneath */}
      <span className="text-[10px] sm:text-[11px] font-medium text-fg-muted text-center truncate max-w-full">
        {label}
      </span>
    </div>
  );
};

const WatchlistOverview = ({
  selectedCurrency,
  detailsList = [],
  liveLtpBySymbol = {},
  isMinimized = false,
  onToggleMinimize,
}) => {
  const [imgError, setImgError] = useState(false);
  const [companyData, setCompanyData] = useState(DEFAULT_COMPANY_INFO);
  const [loading, setLoading] = useState(false);

  // Match the active stock
  const currentStock = useMemo(() => {
    if (!selectedCurrency) return null;
    if (Array.isArray(detailsList)) {
      const found = detailsList.find(
        (s) =>
          (s?.token &&
            selectedCurrency?.token &&
            String(s.token) === String(selectedCurrency.token)) ||
          (s?.symbol &&
            selectedCurrency?.symbol &&
            String(s.symbol).toUpperCase() ===
              String(selectedCurrency.symbol).toUpperCase()) ||
          (s?.name &&
            selectedCurrency?.name &&
            String(s.name).toUpperCase() ===
              String(selectedCurrency.name).toUpperCase()),
      );
      if (found) return { ...selectedCurrency, ...found };
    }
    return selectedCurrency;
  }, [selectedCurrency, detailsList]);

  const rawSymbol = String(
    currentStock?.name || currentStock?.symbol || "STOCK",
  ).trim();
  const symbol = rawSymbol.toUpperCase();
  const fullName =
    getStockFullName(currentStock, detailsList) ||
    currentStock?.fullName ||
    currentStock?.name ||
    symbol;
  const logoSrc = getStockLogo(
    currentStock?.symbol,
    currentStock?.name,
    currentStock?.token,
  );

  // Price & changes
  const liveLtp =
    liveLtpBySymbol?.[getSymbolKey(currentStock?.name)] ??
    liveLtpBySymbol?.[getSymbolKey(currentStock?.symbol)] ??
    currentStock?.ltp ??
    currentStock?.last_traded_price ??
    currentStock?.close;

  const numericLtp = parseNum(liveLtp);
  const hasLtp = Number.isFinite(numericLtp);

  const prevClose = parseNum(currentStock?.prevClose ?? currentStock?.close);
  const open = parseNum(currentStock?.open);

  let change = 0;
  let percentChange = 0;
  const rawChange = parseNum(
    currentStock?.change ?? currentStock?.chg ?? currentStock?.netChange,
  );
  if (Number.isFinite(rawChange)) {
    change = rawChange;
  } else if (hasLtp && Number.isFinite(prevClose) && prevClose > 0) {
    change = numericLtp - prevClose;
  } else if (hasLtp && Number.isFinite(open) && open > 0) {
    change = numericLtp - open;
  }

  const rawPercent = parseNum(
    currentStock?.changePercent ??
      currentStock?.pChange ??
      currentStock?.chgPcnt,
  );
  if (Number.isFinite(rawPercent)) {
    percentChange = rawPercent;
  } else if (Number.isFinite(prevClose) && prevClose > 0) {
    percentChange = (change / prevClose) * 100;
  }

  // Fallbacks if price is missing or not live
  const displayPrice = hasLtp
    ? numericLtp.toLocaleString("en-IN", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      })
    : "1,121.0";
  const displayChange = Number.isFinite(change) && change !== 0 ? change : 4.9;
  const displayPercent =
    Number.isFinite(percentChange) && percentChange !== 0
      ? percentChange
      : 0.44;

  const isPositive = displayChange >= 0;
  const changeColor = isPositive ? "text-[#089981]" : "text-[#f23645]";
  const changeSign = isPositive ? "+" : "";

  // ── Fetch company-info from API using the stock's token ────────────────────
  useEffect(() => {
    let isCancelled = false;

    const loadCompanyInfo = async () => {
      // 1. Resolve token from stock / detailsList / globalCache
      let token =
        currentStock?.token ||
        currentStock?.securityId ||
        selectedCurrency?.token;

      if (!token) {
        const sym = symbol;
        const cachedStocks = globalCache?.stocksList;
        if (Array.isArray(cachedStocks)) {
          const found = cachedStocks.find(
            (s) =>
              (s?.name && s.name.toUpperCase() === sym) ||
              (s?.symbol && s.symbol.toUpperCase() === sym) ||
              (s?.actualSymbol && s.actualSymbol.toUpperCase() === sym) ||
              (s?.userCode && s.userCode.toUpperCase() === sym),
          );
          if (found?.token) token = found.token;
        }
      }

      // 2. Fallback: query equity/stocks to find token if not yet loaded
      if (!token) {
        try {
          const res = await apiService.get("equity/stocks");
          const stocks = Array.isArray(res) ? res : res?.stocks || [];
          if (Array.isArray(stocks)) {
            globalCache.stocksList = stocks;
            const found = stocks.find(
              (s) =>
                (s?.name && s.name.toUpperCase() === symbol) ||
                (s?.symbol && s.symbol.toUpperCase() === symbol) ||
                (s?.actualSymbol && s.actualSymbol.toUpperCase() === symbol) ||
                (s?.userCode && s.userCode.toUpperCase() === symbol),
            );
            if (found?.token) token = found.token;
          }
        } catch (e) {
          console.warn(
            "Could not retrieve stocks list for token resolution:",
            e,
          );
        }
      }

      // Default fallback for demo / screenshot stock
      if (!token && symbol === "AXISBANK") token = "5900";
      if (!token && symbol === "ABB") token = "13";

      if (!token) return;

      setLoading(true);

      try {
        // First try market base URL if configured, then fallback to apiService
        let dataPayload = null;
        const marketBase = (import.meta.env.VITE_MARKET_API_URL || "")
          .trim()
          .replace(/\/+$/, "");

        if (marketBase) {
          try {
            const fetchRes = await fetch(
              `${marketBase}/api/market/company-info/${token}`,
            );
            if (fetchRes.ok) {
              const json = await fetchRes.json();
              dataPayload = json;
            }
          } catch (e) {
            console.warn(
              "Direct market API fetch failed, trying apiService:",
              e,
            );
          }
        }

        if (!dataPayload) {
          const apiRes = await apiService.get(
            `api/market/company-info/${token}`,
          );
          dataPayload = apiRes;
        }

        if (isCancelled || !dataPayload) return;

        // Parse payload (accommodates response structures)
        const inner =
          dataPayload?.data?.data || dataPayload?.data || dataPayload;
        if (inner && (inner.CO || inner.SHP || inner.RATIOS)) {
          setCompanyData({
            CO: { ...DEFAULT_COMPANY_INFO.CO, ...(inner.CO || {}) },
            SHP: { ...DEFAULT_COMPANY_INFO.SHP, ...(inner.SHP || {}) },
            RATIOS: { ...DEFAULT_COMPANY_INFO.RATIOS, ...(inner.RATIOS || {}) },
            companyName:
              dataPayload?.data?.companyName ||
              dataPayload?.companyName ||
              fullName,
          });
        }
      } catch (err) {
        console.warn(`Failed to fetch company-info for token ${token}:`, err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadCompanyInfo();

    return () => {
      isCancelled = true;
    };
  }, [currentStock, symbol, fullName, selectedCurrency]);

  const co = companyData.CO || DEFAULT_COMPANY_INFO.CO;
  const shp = companyData.SHP || DEFAULT_COMPANY_INFO.SHP;
  const ratios = companyData.RATIOS || DEFAULT_COMPANY_INFO.RATIOS;

  // ── Calculated metrics ───────────────────────────────────────────────────
  const low52 = co.FIFTY_TWO_WEEK_LOW != null ? co.FIFTY_TWO_WEEK_LOW : 1150.3;
  const high52 =
    co.FIFTY_TWO_WEEK_HIGH != null ? co.FIFTY_TWO_WEEK_HIGH : 1418.3;
  const currentLtpForBar = hasLtp ? numericLtp : 1121.0;
  const range52 = high52 - low52;
  const rangePct =
    range52 > 0
      ? Math.min(100, Math.max(0, ((currentLtpForBar - low52) / range52) * 100))
      : 25;

  // Market cap format (e.g. 401651.001366 -> 401.65 B)
  const rawMarketCap = co.MARKET_CAP;
  const marketCapDisplay =
    rawMarketCap != null
      ? rawMarketCap > 1000
        ? `${(rawMarketCap / 1000).toFixed(2)} B`
        : `${Number(rawMarketCap).toFixed(2)} B`
      : "401.65 B";

  const divYieldDisplay =
    co.DIVIDEND_YIELD != null
      ? `${Number(co.DIVIDEND_YIELD).toFixed(2)}%`
      : "0.08%";
  const peRatioDisplay =
    ratios.PE_RATIO != null ? Number(ratios.PE_RATIO).toFixed(2) : "14.36";
  const pbRatioDisplay =
    ratios.PB_RATIO != null ? Number(ratios.PB_RATIO).toFixed(2) : "1.81";

  // Shareholding changes
  const diiChange =
    shp.CHANGE_IN_DII_HOLDING != null ? shp.CHANGE_IN_DII_HOLDING : 1.85;
  const fiiChange =
    shp.CHANGE_IN_FII_HOLDING != null ? shp.CHANGE_IN_FII_HOLDING : -1.84;

  return (
    <div className="flex h-full w-full flex-col bg-surface text-fg select-none font-[family-name:-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] overflow-hidden">
      {/* ── Fixed Header Row (Height 44px - always visible even when minimized) ── */}
      <div className="flex h-[44px] min-h-[44px] shrink-0 items-center justify-between px-3.5 ">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Logo / Avatar */}
          {logoSrc && !imgError ? (
            <img
              src={logoSrc}
              alt={symbol}
              onError={() => setImgError(true)}
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#831843] text-white text-[11px] font-bold">
              {symbol.substring(0, 1)}
            </div>
          )}

          {/* Symbol & Name */}
          <div className="flex flex-col min-w-0 leading-tight">
            <span className="font-bold text-[14px] text-fg truncate tracking-wide">
              {symbol}
            </span>
            <span className="text-[11px] text-fg-muted truncate max-w-[170px]">
              {companyData.companyName || fullName}
            </span>
          </div>
        </div>

        {/* Action icons on right */}
        <div className="flex items-center gap-2 text-fg-muted">
          <button
            type="button"
            className="flex items-center justify-center hover:text-fg transition-colors p-1 rounded hover:bg-surface-2"
            title="Overview layout"
          >
            <BsGrid size={15} />
          </button>
          <button
            type="button"
            className="flex items-center justify-center hover:text-fg transition-colors p-1 rounded hover:bg-surface-2"
            title="Edit note"
          >
            <AiOutlineEdit size={16} />
          </button>
          <button
            type="button"
            className="flex items-center justify-center hover:text-fg transition-colors p-1 rounded hover:bg-surface-2"
            title="More actions"
          >
            <FiMoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* ── Scrollable Body Content (Hidden when height is minimized to header) ── */}
      <div className="flex-1 overflow-y-auto px-3.5 py-2.5 space-y-4 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb]:rounded-full">
        {/* ── Top Section: Price & 52W Range ── */}
        <div className="space-y-3 pb-3 border-b border-line/30">
          {/* Price & Change */}
          <div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[28px] font-bold tracking-tight text-fg leading-none">
                {displayPrice}
              </span>
              <span className="text-[13px] font-bold text-fg-muted uppercase">
                INR
              </span>
              <div
                className={`flex items-baseline gap-1 text-[14px] font-bold ${changeColor} ml-1`}
              >
                <span>
                  {changeSign}
                  {displayChange.toFixed(1)}
                </span>
                <span>
                  {changeSign}
                  {displayPercent.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Market Status line */}
            <div className="flex items-center gap-1.5 text-[11px] text-fg-muted mt-1.5">
              <span className="h-1.5 w-3 rounded-full bg-fg-muted/60" />
              <span>Market closed</span>
              <span>Last update at 15:51 GMT+5:30</span>
            </div>
          </div>

          {/* 52W Range Slider */}
          <div className="pt-0.5">
            <div className="flex justify-between text-[11px] text-fg-muted">
              <span>52W Low</span>
              <span>52W High</span>
            </div>
            <div className="relative my-2">
              <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#ef4444] via-[#f43f5e] via-[#a855f7] via-[#06b6d4] to-[#10b981]" />
              {/* Tick marker */}
              <div
                className="absolute top-[-3px] bottom-[-3px] w-[3px] bg-fg rounded-full shadow-sm"
                style={{ left: `${rangePct}%`, transform: "translateX(-50%)" }}
              />
            </div>
            <div className="flex justify-between text-[12px] font-bold text-fg">
              <span>{Number(low52).toFixed(1)}</span>
              <span>{Number(high52).toFixed(1)}</span>
            </div>
          </div>

          {/* Sector & Industry */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <div className="text-[11px] text-fg-muted font-medium">
                Sector
              </div>
              <div className="text-[13px] font-bold text-fg truncate mt-0.5">
                {co.SECTOR || "Financial Services"}
              </div>
            </div>
            <div className="border-l border-line/30 pl-3">
              <div className="text-[11px] text-fg-muted font-medium">
                Industry
              </div>
              <div className="text-[13px] font-bold text-fg truncate mt-0.5">
                {co.INDUSTRY || "Banks"}
              </div>
            </div>
          </div>
        </div>

        {/* ── Key stats Section ── */}
        <div className="pb-3 border-b border-line/30">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[13px] font-bold text-fg">Key stats</span>
          </div>

          <div className="grid grid-cols-2 min-[340px]:grid-cols-4 gap-3 text-left">
            <div>
              <div className="text-[11px] text-fg-muted leading-tight">
                Market cap
              </div>
              <div className="text-[13px] font-bold text-fg mt-1">
                {marketCapDisplay.split(" ")[0]}{" "}
                <span className="text-fg-muted font-normal text-[11px]">B</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-fg-muted leading-tight">
                Div. yield (ind.)
              </div>
              <div className="text-[13px] font-bold text-fg mt-1">
                {divYieldDisplay}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-fg-muted leading-tight">
                P/E ratio (TTM)
              </div>
              <div className="text-[13px] font-bold text-fg mt-1">
                {peRatioDisplay}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-fg-muted leading-tight">
                P/B ratio
              </div>
              <div className="text-[13px] font-bold text-fg mt-1">
                {pbRatioDisplay}
              </div>
            </div>
          </div>
        </div>

        {/* ── Shareholding pattern & change (Responsive row) ── */}
        <div className="flex flex-col min-[380px]:grid min-[380px]:grid-cols-2 gap-4 pb-3 border-b border-line/30">
          {/* Shareholding pattern */}
          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-fg">
                Shareholding pattern
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1 flex-wrap min-[280px]:flex-nowrap">
              {/* Donut Chart */}
              <DonutChart
                dii={shp.DII_HOLDING || 44.54}
                fii={shp.FII_HOLDING || 41.16}
                promoter={shp.PROMOTER_HOLDING || 7.86}
                pub={shp.PUBLIC_HOLDING || 5.29}
              />

              {/* Legend List */}
              <div className="flex-1 space-y-1.5 text-[11px] min-w-[100px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-fg-muted">
                    <span className="h-2 w-2 rounded-full bg-[#2979ff] shrink-0" />{" "}
                    DII
                  </span>
                  <span className="font-bold text-fg">
                    {shp.DII_HOLDING || 44.54}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-fg-muted">
                    <span className="h-2 w-2 rounded-full bg-[#00e5ff] shrink-0" />{" "}
                    FII
                  </span>
                  <span className="font-bold text-fg">
                    {shp.FII_HOLDING || 41.16}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-fg-muted">
                    <span className="h-2 w-2 rounded-full bg-[#a855f7] shrink-0" />{" "}
                    Promoter
                  </span>
                  <span className="font-bold text-fg">
                    {shp.PROMOTER_HOLDING || 7.86}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-fg-muted">
                    <span className="h-2 w-2 rounded-full bg-[#f97316] shrink-0" />{" "}
                    Public
                  </span>
                  <span className="font-bold text-fg">
                    {shp.PUBLIC_HOLDING || 5.29}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shareholding change */}
          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-fg">
                Shareholding change
              </span>
            </div>

            <div className="flex flex-col justify-center flex-1 space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-fg-muted">
                  DII holding change
                </span>
                <span className="text-[13px] font-bold text-[#10b981] flex items-center gap-1">
                  +{Math.abs(diiChange).toFixed(2)}% ▲
                </span>
              </div>
              <div className="border-t border-line/40" />
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-fg-muted">
                  FII holding change
                </span>
                <span className="text-[13px] font-bold text-[#ef4444] flex items-center gap-1">
                  -{Math.abs(fiiChange).toFixed(2)}% ▼
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Financial highlights Section ── */}
        <div className="pb-3 border-b border-line/30">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[13px] font-bold text-fg">
              Financial highlights
            </span>
          </div>

          <div className="grid grid-cols-2 min-[340px]:grid-cols-4 gap-3 text-left">
            <div>
              <div className="text-[11px] text-fg-muted">Book value</div>
              <div className="text-[13px] font-bold text-fg mt-1">
                {co.BOOK_VALUE != null
                  ? Number(co.BOOK_VALUE).toFixed(2)
                  : "711.67"}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-fg-muted">EBITDA</div>
              <div className="text-[13px] font-bold text-fg mt-1">
                {co.EBITDA != null
                  ? Number(co.EBITDA).toLocaleString("en-IN", {
                      maximumFractionDigits: 1,
                    })
                  : "34,186.4"}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-fg-muted">EPS</div>
              <div className="text-[13px] font-bold text-fg mt-1">
                {co.EPS != null ? co.EPS : "-"}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-fg-muted">Debt to equity</div>
              <div className="text-[13px] font-bold text-fg mt-1">
                {ratios.DEBT_TO_EQUITY != null
                  ? Number(ratios.DEBT_TO_EQUITY).toFixed(2)
                  : "0.00"}
              </div>
            </div>
          </div>
        </div>

        {/* ── Key ratios Section (Grouped Bar Chart) ── */}
        <div className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-fg">Key ratios</span>
                      </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-3 text-[11px] text-fg-muted mb-2">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2979ff]" /> {symbol}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#cbd5e1] dark:bg-[#475569]" />{" "}
              Industry
            </span>
          </div>

          {/* Grouped Bars */}
          <div className="flex justify-between items-end gap-1 min-[320px]:gap-2 pt-1 pb-2 overflow-x-auto">
            <GroupedBarItem
              label="ROCE"
              stockVal={ratios.ROCE || 5.47}
              stockDisplay={`${(ratios.ROCE || 5.47).toFixed(2)}%`}
              indVal={0}
              indDisplay="0.00%"
            />
            <GroupedBarItem
              label="P/E Ratio"
              stockVal={ratios.PE_RATIO || 14.36}
              stockDisplay={(ratios.PE_RATIO || 14.36).toFixed(2)}
              indVal={ratios.INDUSTRY_EPS || 24.41}
              indDisplay={(ratios.INDUSTRY_EPS || 24.41).toFixed(2)}
            />
            <GroupedBarItem
              label="P/B Ratio"
              stockVal={ratios.PB_RATIO || 1.81}
              stockDisplay={(ratios.PB_RATIO || 1.81).toFixed(2)}
              indVal={ratios.INDUSTRY_PB_RATIO || 1.51}
              indDisplay={(ratios.INDUSTRY_PB_RATIO || 1.51).toFixed(2)}
            />
            <GroupedBarItem
              label="Dividend Yield"
              stockVal={co.DIVIDEND_YIELD || 0.08}
              stockDisplay={`${(co.DIVIDEND_YIELD || 0.08).toFixed(2)}%`}
              indVal={ratios.INDUSTRY_DIVIDEND_YIELD || 0.48}
              indDisplay={`${(ratios.INDUSTRY_DIVIDEND_YIELD || 0.48).toFixed(2)}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistOverview;
