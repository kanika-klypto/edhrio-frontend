import React, { useState, useRef, useEffect, useMemo } from "react";
import { FiMinus, FiMoreHorizontal, FiPlus, FiX } from "react-icons/fi";
import { BsGrid } from "react-icons/bs";
import { ListingModal } from "../tradingModals/ListingModal";
import { getStockLogo } from "../../util/stockLogo";
import Tooltip from "../common/Tooltip";

const KNOWN_FULL_NAMES = {
  NIFTY: "Nifty 50 Index",
  "NIFTY 50": "Nifty 50 Index",
  SENSEX: "S&P BSE Sensex Index",
  BANKNIFTY: "Nifty Bank Index",
  "NIFTY BANK": "Nifty Bank Index",
  SPX: "S&P 500 Index",
  "S&P 500": "S&P 500 Index",
  CNXIT: "Nifty IT Index",
  "NIFTY IT": "Nifty IT Index",
  ADANIENT: "Adani Enterprises Limited",
  POWERINDIA: "Hitachi Energy India Limited",
  ABB: "ABB India Limited",
  TCS: "Tata Consultancy Services Limited",
  RELIANCE: "Reliance Industries Limited",
  INFY: "Infosys Limited",
  HDFCBANK: "HDFC Bank Limited",
  ICICIBANK: "ICICI Bank Limited",
  SBIN: "State Bank of India",
  BHARTIARTL: "Bharti Airtel Limited",
  ITC: "ITC Limited",
  KOTAKBANK: "Kotak Mahindra Bank Limited",
  LT: "Larsen & Toubro Limited",
  AXISBANK: "Axis Bank Limited",
  HINDUNILVR: "Hindustan Unilever Limited",
  BAJFINANCE: "Bajaj Finance Limited",
  MARUTI: "Maruti Suzuki India Limited",
  TATAMOTORS: "Tata Motors Limited",
  SUNPHARMA: "Sun Pharmaceutical Industries Limited",
  TITAN: "Titan Company Limited",
  WIPRO: "Wipro Limited",
};

const getStockFullName = (stock) => {
  if (stock?.fullName) return stock.fullName;
  if (stock?.description) return stock.description;
  if (stock?.companyName) return stock.companyName;
  const sym = String(stock?.symbol || stock?.name || "").trim().toUpperCase();
  if (KNOWN_FULL_NAMES[sym]) return KNOWN_FULL_NAMES[sym];
  if (stock?.name && stock?.symbol && stock.name !== stock.symbol) return stock.name;
  return stock?.fullName || stock?.name || stock?.symbol || "";
};

const CustomCheckbox = ({ checked }) => (
  <span
    aria-hidden="true"
    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", verticalAlign: "middle" }}
    className={`h-3.5 w-3.5 shrink-0 rounded-xs mr-2 transition-colors duration-150 ${
      checked
        ? "bg-[var(--brand-primary)] border border-[var(--brand-primary)] text-white"
        : "border border-[#2a2e39] bg-[#12141a] hover:border-[#434651] dark:border-[#2a2e39] dark:bg-[#12141a] light:border-[#cbd5e1] light:bg-[#f8fafc]"
    }`}
  >
    <svg
      width="9"
      height="7"
      viewBox="0 0 9 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`stroke-white transition-opacity duration-100 ${checked ? "opacity-100" : "opacity-0"}`}
    >
      <path d="M1 3.2L3.2 5.5L7.8 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const CustomRadio = ({ checked }) => (
  <span
    aria-hidden="true"
    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", verticalAlign: "middle" }}
    className={`h-3.5 w-3.5 shrink-0 rounded-full mr-2 transition-colors duration-150 ${
      checked
        ? "border-2 border-[var(--brand-primary)] bg-transparent"
        : "border border-[#2a2e39] bg-[#12141a] hover:border-[#434651] dark:border-[#2a2e39] dark:bg-[#12141a] light:border-[#cbd5e1] light:bg-[#f8fafc]"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)] transition-opacity duration-100 ${
        checked ? "opacity-100" : "opacity-0"
      }`}
    />
  </span>
);

const WatchlistAvatar = ({ stock, idx }) => {
  const [imgError, setImgError] = useState(false);
  const logoSrc = getStockLogo(stock?.symbol, stock?.name, stock?.token);

  if (logoSrc && !imgError) {
    return (
      <img
        src={logoSrc}
        alt={stock?.name || "logo"}
        onError={() => setImgError(true)}
        className="h-6 w-6 shrink-0 rounded-full object-cover"
      />
    );
  }

  const sym = String(stock?.symbol || stock?.name || "").toUpperCase();
  if (sym.includes("NIFTY 50") || sym === "NIFTY") {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1e2238] text-[10px] font-bold text-white">
        50
      </div>
    );
  }
  if (sym.includes("SENSEX")) {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0284c7] text-[9px] font-bold text-white">
        BSE
      </div>
    );
  }
  if (sym.includes("BANKNIFTY") || sym.includes("NIFTY BANK")) {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1e2238] text-[10px] font-bold text-white">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L2 6v2h20V6L12 1zm-8 8v9h3V9H4zm6 0v9h3V9h-3zm6 0v9h3V9h-3zM2 20v2h20v-2H2z" />
        </svg>
      </div>
    );
  }
  if (sym.includes("SPX") || sym.includes("S&P 500")) {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#b91c1c] text-[9px] font-bold text-white">
        500
      </div>
    );
  }
  if (sym.includes("CNXIT") || sym.includes("NIFTY IT")) {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1e2238] text-[10px] font-bold text-white">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 5h6v6H9V9z" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
        idx % 2 === 0 ? "bg-[var(--brand-primary)] text-white" : "bg-surface-2 text-fg"
      }`}
    >
      {stock?.name ? stock.name.substring(0, 1) : "S"}
    </div>
  );
};

const getSymbolKey = (symbol) =>
  String(symbol || "").replace(/\s+/g, " ").trim().toUpperCase();

const parseNumericValue = (val) => {
  if (val == null) return NaN;
  if (typeof val === "number") return val;
  const cleaned = String(val).replace(/,/g, "").replace(/%/g, "").trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? NaN : num;
};

const getStockChangeData = (stock, liveLtpBySymbol) => {
  const high = parseNumericValue(stock?.high);
  const low = parseNumericValue(stock?.low);
  const open = parseNumericValue(stock?.open);
  const prevClose = parseNumericValue(stock?.prevClose);

  const liveLtp =
    liveLtpBySymbol?.[getSymbolKey(stock?.name)] ??
    liveLtpBySymbol?.[getSymbolKey(stock?.symbol)] ??
    stock?.ltp;
  const numericLtp = parseNumericValue(liveLtp);
  const hasLtp = Number.isFinite(numericLtp);

  let change = 0;
  let percentChange = 0;

  const rawChange = parseNumericValue(stock?.change ?? stock?.chg ?? stock?.netChange);
  if (Number.isFinite(rawChange)) {
    change = rawChange;
  } else if (hasLtp && Number.isFinite(prevClose) && prevClose > 0) {
    change = numericLtp - prevClose;
  } else if (hasLtp && Number.isFinite(open) && open > 0) {
    change = numericLtp - open;
  } else if (Number.isFinite(high) && Number.isFinite(low) && high > 0 && low > 0) {
    change = high - low;
  }

  const rawPercent = parseNumericValue(stock?.changePercent ?? stock?.pChange ?? stock?.chgPcnt);
  if (Number.isFinite(rawPercent)) {
    percentChange = rawPercent;
  } else if (Number.isFinite(prevClose) && prevClose > 0) {
    percentChange = (change / prevClose) * 100;
  } else if (Number.isFinite(low) && low > 0) {
    percentChange = (change / low) * 100;
  }

  return { change, percentChange, numericLtp, hasLtp };
};

const WATCHLIST_SCROLL =
  "[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-surface " +
  "[&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb]:rounded-[4px]";

const ACTION_BTN =
  "border-none rounded-[4px]! py-[4px] px-[8px] text-[12px]! text-white cursor-pointer";

const DEFAULT_SETTINGS = {
  tableView: true,
  columns: {
    last: true,
    change: true,
    changePercent: true,
    volume: false,
    // extendedHours: false,
  },
  display: {
    logo: true,
    symbolOrName: "symbol", // "symbol" | "name"
  },
};

const LeftWatchlist = ({
  onClose,
  selectedCurrency,
  detailsList,
  onAddStock,
  onRemoveStock,
  setSelectedCurrency,
  liveLtpBySymbol,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsMenuRef = useRef(null);
  const settingsBtnRef = useRef(null);

  // Load / persist settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("watchlist_view_settings");
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const updateSettings = (partial) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem("watchlist_view_settings", JSON.stringify(next));
      return next;
    });
  };

  const updateColumn = (colKey, value) => {
    setSettings((prev) => {
      const next = {
        ...prev,
        columns: { ...prev.columns, [colKey]: value },
      };
      localStorage.setItem("watchlist_view_settings", JSON.stringify(next));
      return next;
    });
  };

  const updateDisplay = (dispKey, value) => {
    setSettings((prev) => {
      const next = {
        ...prev,
        display: { ...prev.display, [dispKey]: value },
      };
      localStorage.setItem("watchlist_view_settings", JSON.stringify(next));
      return next;
    });
  };

  // Close settings dropdown on click outside
  useEffect(() => {
    if (!isSettingsOpen) return;
    const handleClickOutside = (e) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(e.target) &&
        settingsBtnRef.current &&
        !settingsBtnRef.current.contains(e.target)
      ) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isSettingsOpen]);

  // Watchlist Sorting (Symbol, Last, Chg, Chg%, Vol)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "desc") {
          return { key, direction: "asc" };
        }
        if (prev.direction === "asc") {
          return { key, direction: "desc" };
        }
      }
      return { key, direction: key === "symbol" ? "asc" : "desc" };
    });
  };

  const sortedList = useMemo(() => {
    if (!Array.isArray(detailsList)) return [];
    if (!sortConfig.key || !sortConfig.direction) {
      return detailsList;
    }

    return [...detailsList].sort((a, b) => {
      if (sortConfig.key === "symbol") {
        const aText =
          settings.display.symbolOrName === "name"
            ? getStockFullName(a)
            : a.symbol || a.name || "";
        const bText =
          settings.display.symbolOrName === "name"
            ? getStockFullName(b)
            : b.symbol || b.name || "";
        const cmp = String(aText).localeCompare(String(bText), undefined, {
          numeric: true,
          sensitivity: "base",
        });
        return sortConfig.direction === "asc" ? cmp : -cmp;
      }

      if (sortConfig.key === "last") {
        const aLtp = getStockChangeData(a, liveLtpBySymbol).numericLtp;
        const bLtp = getStockChangeData(b, liveLtpBySymbol).numericLtp;
        const aNum = Number.isFinite(aLtp) ? aLtp : -Infinity;
        const bNum = Number.isFinite(bLtp) ? bLtp : -Infinity;
        return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
      }

      if (sortConfig.key === "change") {
        const aVal = getStockChangeData(a, liveLtpBySymbol).change;
        const bVal = getStockChangeData(b, liveLtpBySymbol).change;
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (sortConfig.key === "changePercent") {
        const aVal = getStockChangeData(a, liveLtpBySymbol).percentChange;
        const bVal = getStockChangeData(b, liveLtpBySymbol).percentChange;
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (sortConfig.key === "volume") {
        const aVal = parseNumericValue(a.volume ?? a.vol) || 0;
        const bVal = parseNumericValue(b.volume ?? b.vol) || 0;
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [detailsList, sortConfig, settings.display.symbolOrName, liveLtpBySymbol]);

  return (
    <div className="relative flex h-full w-full flex-col bg-panel font-[family-name:-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] text-[12px] text-fg select-none rounded-tl-[10px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-3 py-2.5">
        <div className="flex items-center gap-1.5 text-[14px] font-semibold text-fg">
          <span>Watchlist</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-fg-muted mt-0.5">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Action icons with universal Tooltips */}
        <div className="flex items-center gap-1">
          <Tooltip content="Add Symbol" position="bottom">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-fg-muted hover:bg-surface-2 hover:text-fg transition-colors"
            >
              <FiPlus size={16} />
            </button>
          </Tooltip>

          {/* <Tooltip content="Table view" position="bottom">
            <button
              id="watchlist-tableview-toggle-btn"
              type="button"
              onClick={() => updateSettings({ tableView: !settings.tableView })}
              className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full! transition-colors ${
                settings.tableView ? "text-fg bg-surface-2" : "text-fg-muted hover:bg-surface-2 hover:text-fg"
              }`}
            >
              <BsGrid size={15} />
            </button>
          </Tooltip> */}

          <Tooltip content="Settings" position="bottom">
            <button
              id="watchlist-settings-btn"
              ref={settingsBtnRef}
              type="button"
              onClick={() => setIsSettingsOpen((prev) => !prev)}
              className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm transition-colors ${
                isSettingsOpen ? "text-fg bg-surface-2" : "text-fg-muted hover:bg-surface-2 hover:text-fg"
              }`}
            >
              <FiMoreHorizontal size={16} />
            </button>
          </Tooltip>

          <Tooltip content="Close" position="bottom">
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-fg-muted hover:bg-surface-2 hover:text-fg transition-colors"
            >
              <FiX size={16} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Settings Dropdown Menu */}
      {isSettingsOpen && (
        <div
          id="watchlist-settings-dropdown"
          ref={settingsMenuRef}
          className="absolute right-3 top-11 z-[999] w-60 rounded-sm! border-0 bg-(--bg-secondary) p-2 shadow-dropdown flex flex-col animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Table view Switch */}
          <div className="flex items-center justify-between px-2 py-1.5 select-none">
            <span className="text-[13px] font-medium text-fg">Table view</span>
            <button
              id="watchlist-tableview-switch"
              type="button"
              role="switch"
              aria-checked={settings.tableView}
              onClick={() => updateSettings({ tableView: !settings.tableView })}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full! border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings.tableView ? "bg-[var(--brand-primary)]" : "bg-[#868993] dark:bg-[#50535e]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  settings.tableView ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="my-1.5 h-px bg-line" />

          {/* CUSTOMIZE COLUMNS Section */}
          <div className="flex flex-col gap-0.5">
            <div className="px-2 pt-1 pb-1 text-[11px] font-bold uppercase tracking-wider text-fg-muted">
              Customize Columns
            </div>

            <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-surface-2 rounded-xs select-none">
              <input
                type="checkbox"
                checked={settings.columns.last}
                onChange={(e) => updateColumn("last", e.target.checked)}
                className="hidden"
              />
              <CustomCheckbox checked={settings.columns.last} />
              <span className="text-[12px] text-fg select-none leading-none">Last</span>
            </label>

            <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-surface-2 rounded-xs select-none">
              <input
                type="checkbox"
                checked={settings.columns.change}
                onChange={(e) => updateColumn("change", e.target.checked)}
                className="hidden"
              />
              <CustomCheckbox checked={settings.columns.change} />
              <span className="text-[12px] text-fg select-none leading-none">Change</span>
            </label>

            <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-surface-2 rounded-xs select-none">
              <input
                type="checkbox"
                checked={settings.columns.changePercent}
                onChange={(e) => updateColumn("changePercent", e.target.checked)}
                className="hidden"
              />
              <CustomCheckbox checked={settings.columns.changePercent} />
              <span className="text-[12px] text-fg select-none leading-none">Change %</span>
            </label>

            <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-surface-2 rounded-xs select-none">
              <input
                type="checkbox"
                checked={settings.columns.volume}
                onChange={(e) => updateColumn("volume", e.target.checked)}
                className="hidden"
              />
              <CustomCheckbox checked={settings.columns.volume} />
              <span className="text-[12px] text-fg select-none leading-none">Volume</span>
            </label>

            {/* <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-surface-2 rounded-xs select-none">
              <input
                type="checkbox"
                checked={settings.columns.extendedHours}
                onChange={(e) => updateColumn("extendedHours", e.target.checked)}
                className="hidden"
              />
              <CustomCheckbox checked={settings.columns.extendedHours} />
              <span className="text-[12px] text-fg select-none leading-none">Extended Hours</span>
            </label> */}
          </div>

          <div className="my-1.5 h-px bg-line" />

          {/* SYMBOL DISPLAY Section */}
          <div className="flex flex-col gap-0.5">
            <div className="px-2 pt-1 pb-1 text-[11px] font-bold uppercase tracking-wider text-fg-muted">
              Symbol Display
            </div>

            <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-surface-2 rounded-xs select-none">
              <input
                type="checkbox"
                checked={settings.display.logo}
                onChange={(e) => updateDisplay("logo", e.target.checked)}
                className="hidden"
              />
              <CustomCheckbox checked={settings.display.logo} />
              <span className="text-[12px] text-fg select-none leading-none">Logo</span>
            </label>

            <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-surface-2 rounded-xs select-none">
              <input
                type="radio"
                name="symbolDisplayRadio"
                checked={settings.display.symbolOrName === "symbol"}
                onChange={() => updateDisplay("symbolOrName", "symbol")}
                className="hidden"
              />
              <CustomRadio checked={settings.display.symbolOrName === "symbol"} />
              <span className="text-[12px] text-fg select-none leading-none">Symbol</span>
            </label>

            <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-surface-2 rounded-xs select-none">
              <input
                type="radio"
                name="symbolDisplayRadio"
                checked={settings.display.symbolOrName === "name"}
                onChange={() => updateDisplay("symbolOrName", "name")}
                className="hidden"
              />
              <CustomRadio checked={settings.display.symbolOrName === "name"} />
              <span className="text-[12px] text-fg select-none leading-none">Name</span>
            </label>
          </div>
        </div>
      )}

      {/* Table Column Headers / Watchlist Header */}
      {settings.tableView ? (
        <div className="flex items-center justify-between border-b border-line px-3 py-1.5 text-[11px] font-medium text-fg-muted select-none">
          <button
            id="watchlist-sort-symbol"
            type="button"
            onClick={() => handleSort("symbol")}
            className={`flex items-center gap-1 min-w-[32px] truncate cursor-pointer transition-colors ${
              sortConfig.key === "symbol"
                ? "text-[var(--brand-primary)] font-semibold"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            <span className="truncate">{settings.display.symbolOrName === "name" ? "Name" : "Symbol"}</span>
            {sortConfig.key === "symbol" && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="currentColor" className="shrink-0">
                {sortConfig.direction === "asc" ? (
                  <path d="M4 0L8 6H0L4 0Z" />
                ) : (
                  <path d="M4 6L0 0H8L4 6Z" />
                )}
              </svg>
            )}
          </button>
          <div className="flex items-center gap-2 shrink min-w-0">
            {settings.columns.last && (
              <button
                type="button"
                onClick={() => handleSort("last")}
                className={`w-20 min-w-0 shrink text-right truncate cursor-pointer flex items-center justify-end gap-1 transition-colors ${
                  sortConfig.key === "last"
                    ? "text-[var(--brand-primary)] font-semibold"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                <span>Last</span>
                {sortConfig.key === "last" && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="currentColor" className="shrink-0">
                    {sortConfig.direction === "asc" ? (
                      <path d="M4 0L8 6H0L4 0Z" />
                    ) : (
                      <path d="M4 6L0 0H8L4 6Z" />
                    )}
                  </svg>
                )}
              </button>
            )}
            {settings.columns.change && (
              <button
                type="button"
                onClick={() => handleSort("change")}
                className={`w-16 min-w-0 shrink text-right truncate cursor-pointer flex items-center justify-end gap-1 transition-colors ${
                  sortConfig.key === "change"
                    ? "text-[var(--brand-primary)] font-semibold"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                <span>Chg</span>
                {sortConfig.key === "change" && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="currentColor" className="shrink-0">
                    {sortConfig.direction === "asc" ? (
                      <path d="M4 0L8 6H0L4 0Z" />
                    ) : (
                      <path d="M4 6L0 0H8L4 6Z" />
                    )}
                  </svg>
                )}
              </button>
            )}
            {settings.columns.changePercent && (
              <button
                type="button"
                onClick={() => handleSort("changePercent")}
                className={`w-16 min-w-0 shrink text-right truncate cursor-pointer flex items-center justify-end gap-1 transition-colors ${
                  sortConfig.key === "changePercent"
                    ? "text-[var(--brand-primary)] font-semibold"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                <span>Chg%</span>
                {sortConfig.key === "changePercent" && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="currentColor" className="shrink-0">
                    {sortConfig.direction === "asc" ? (
                      <path d="M4 0L8 6H0L4 0Z" />
                    ) : (
                      <path d="M4 6L0 0H8L4 6Z" />
                    )}
                  </svg>
                )}
              </button>
            )}
            {settings.columns.volume && (
              <button
                type="button"
                onClick={() => handleSort("volume")}
                className={`w-14 min-w-0 shrink text-right truncate cursor-pointer flex items-center justify-end gap-1 transition-colors ${
                  sortConfig.key === "volume"
                    ? "text-[var(--brand-primary)] font-semibold"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                <span>Vol</span>
                {sortConfig.key === "volume" && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="currentColor" className="shrink-0">
                    {sortConfig.direction === "asc" ? (
                      <path d="M4 0L8 6H0L4 0Z" />
                    ) : (
                      <path d="M4 6L0 0H8L4 6Z" />
                    )}
                  </svg>
                )}
              </button>
            )}
            {/* {settings.columns.extendedHours && (
              <span className="w-14 min-w-0 shrink text-right truncate">Ext</span>
            )} */}
          </div>
        </div>
      ) : (
        <div className="flex items-center border-b border-line px-3 py-1.5 text-[11px] font-medium text-fg-muted select-none">
          <button
            id="watchlist-sort-symbol-nontable"
            type="button"
            onClick={() => handleSort("symbol")}
            className={`flex items-center gap-1 cursor-pointer transition-colors ${
              sortConfig.key === "symbol"
                ? "text-[var(--brand-primary)] font-semibold"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            <span>{settings.display.symbolOrName === "name" ? "Name" : "Symbol"}</span>
            {sortConfig.key === "symbol" && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="currentColor" className="shrink-0">
                {sortConfig.direction === "asc" ? (
                  <path d="M4 0L8 6H0L4 0Z" />
                ) : (
                  <path d="M4 6L0 0H8L4 6Z" />
                )}
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Symbol List */}
      <div className={`flex-1 overflow-y-auto ${WATCHLIST_SCROLL}`}>
        {sortedList.length === 0 ? (
          <div className="px-4 py-8 text-center text-[12px] leading-relaxed text-fg-muted">
            Add symbols to your watchlist using the "+" button.
          </div>
        ) : (
          sortedList.map((stock, idx) => {
            const { change, percentChange, numericLtp, hasLtp } =
              getStockChangeData(stock, liveLtpBySymbol);

            const isPositive = change >= 0;
            const changeColor = isPositive ? "text-[#22ab94]" : "text-danger";

            const formattedLtp = hasLtp
              ? numericLtp.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "—";

            const formattedChange = (change > 0 ? "+" : "") + change.toFixed(2);
            const formattedPercent = (percentChange > 0 ? "+" : "") + percentChange.toFixed(2) + "%";

            const nonTableFormattedChange =
              change >= 0
                ? change.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "-" +
                  Math.abs(change).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });

            const nonTableFormattedPercent =
              percentChange >= 0
                ? percentChange.toFixed(2) + "%"
                : "-" + Math.abs(percentChange).toFixed(2) + "%";

            const isActive =
              (stock.token &&
                selectedCurrency?.token &&
                String(stock.token) === String(selectedCurrency.token)) ||
              (stock.symbol || stock.name || "").toUpperCase() ===
                (selectedCurrency?.symbol || selectedCurrency?.name || "").toUpperCase();

            const fullName = getStockFullName(stock);

            const primarySymbolText =
              settings.display.symbolOrName === "name"
                ? fullName
                : stock.symbol || stock.name;

            const secondarySymbolText =
              settings.display.symbolOrName === "name"
                ? stock.symbol || stock.name
                : fullName;

            // Non-table View: Two-line layout matching TradingView screenshot
            if (!settings.tableView) {
              return (
                <div
                  key={idx}
                  className={`group flex cursor-pointer items-center justify-between border-b border-surface-2 px-3 py-2 transition-colors hover:bg-surface-2 ${
                    isActive ? "bg-surface-2 ring-1 ring-inset ring-line/80 rounded-xs" : ""
                  }`}
                  onClick={() => setSelectedCurrency(stock)}
                >
                  {/* Left: Logo/Avatar + Two-line flex-col */}
                  <div className="flex min-w-[32px] flex-1 items-center gap-2.5 pr-2">
                    {settings.display.logo && (
                      <div className="shrink-0 flex items-center justify-center">
                        <WatchlistAvatar stock={stock} idx={idx} />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-col justify-center">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="truncate text-[13px] font-semibold text-fg">
                          {primarySymbolText}
                        </span>
                      </div>
                      <span className="truncate text-[11px] text-fg-muted">
                        {secondarySymbolText}
                      </span>
                    </div>
                  </div>

                  {/* Right: Two-line price/change flex-col items-end */}
                  <div className="flex shrink-0 min-w-0 flex-col items-end justify-center">
                    <span className="text-[13px] font-medium num text-fg truncate">
                      {formattedLtp}
                    </span>
                    <div className={`flex items-center gap-1.5 text-[11px] font-medium num ${changeColor} truncate`}>
                      <span>{nonTableFormattedChange}</span>
                      <span>{nonTableFormattedPercent}</span>
                    </div>
                  </div>
                </div>
              );
            }

            // Table View: multi-column table format
            return (
              <div
                key={idx}
                className={`group flex cursor-pointer items-center justify-between border-b border-surface-2 px-3 py-2 transition-colors hover:bg-surface-2 ${
                  isActive ? "bg-surface-2" : ""
                }`}
                onClick={() => setSelectedCurrency(stock)}
              >
                {/* Left: Symbol & Logo */}
                <div className="flex min-w-[32px] flex-1 items-center gap-2 pr-2">
                  {settings.display.logo && (
                    <div className="shrink-0 flex items-center justify-center">
                      <WatchlistAvatar stock={stock} idx={idx} />
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 items-center gap-1">
                    <span className="truncate text-[12px] font-semibold text-fg">
                      {primarySymbolText}
                    </span>
                  </div>
                </div>

                {/* Right: Columns */}
                <div className="flex items-center gap-2 shrink min-w-0">
                  {settings.columns.last && (
                    <span className="w-20 min-w-0 shrink text-right text-[12px] font-medium num text-fg truncate">
                      {formattedLtp}
                    </span>
                  )}
                  {settings.columns.change && (
                    <span className={`w-16 min-w-0 shrink text-right text-[12px] font-medium num ${changeColor} truncate`}>
                      {formattedChange}
                    </span>
                  )}
                  {settings.columns.changePercent && (
                    <span className={`w-16 min-w-0 shrink text-right text-[12px] font-medium num ${changeColor} truncate`}>
                      {formattedPercent}
                    </span>
                  )}
                  {settings.columns.volume && (
                    <span className="w-14 min-w-0 shrink text-right text-[12px] num text-fg-muted truncate">
                      {stock.volume ? stock.volume : "—"}
                    </span>
                  )}
                  {/* {settings.columns.extendedHours && (
                    <span className="w-14 min-w-0 shrink text-right text-[12px] num text-fg-muted truncate">
                      {stock.extHours ? stock.extHours : "—"}
                    </span>
                  )} */}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Listing Modal for Adding Symbols */}
      {isModalOpen && (
        <ListingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Symbol Search"
          setSelectedCurrency={setSelectedCurrency}
          renderActions={(stock) => {
            const isAdded = detailsList.some((item) => item.symbol === stock.symbol);
            return (
              <div className="flex gap-2">
                {!isAdded ? (
                  <button
                    className={`${ACTION_BTN} bg-accent`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onAddStock(stock);
                    }}
                    aria-label="Add to watchlist"
                  >
                    <FiPlus size={14} />
                  </button>
                ) : (
                  <button
                    className={`${ACTION_BTN} bg-[var(--text-secondary)]`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onRemoveStock(stock.symbol);
                    }}
                    aria-label="Remove from watchlist"
                  >
                    <FiMinus size={14} />
                  </button>
                )}
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default LeftWatchlist;