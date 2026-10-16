import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoSettingsOutline,
  IoCloseSharp,
} from "react-icons/io5";
import {
  CandlestickIcon,
  WaveIcon,
  FolderPlusIcon,
  CloneIcon,
  ChevronsUpDownIcon,
  FolderCogIcon,
} from "../../assets/icons";

export default function LeftObjectTree({
  onClose,
  selectedCurrency,
  timeframeValue,
  selectedIndicator = [],
  indicatorConfigs = {},
  indicatorConfigDefault = {},
  indicatorVisibility = {},
  toggleIndicatorVisibility,
  removeIndicator,
  setActiveBarIndicator,
  liveIndicatorData = {},
  candlesRef,
  liveLtpBySymbol = {},
}) {
  const [activeTab, setActiveTab] = useState("tree"); // "tree" | "data"
  const [isMainSeriesVisible, setIsMainSeriesVisible] = useState(true);

  // Symbol display info
  const rawSymbol = selectedCurrency?.name || selectedCurrency?.symbol || "NIFTY";
  const rawExchange =
    selectedCurrency?.exchange || selectedCurrency?.segment || "NSE";
  const exchange = rawExchange.replace(/_EQ$/, "").toUpperCase();
  const symbolDisplay = `${rawSymbol} · ${exchange}, ${timeframeValue || "1D"}`;

  // Helper to format indicator display name and configurations
  const getIndicatorLabel = (ind) => {
    const { id, type } = ind;
    const cfg = {
      ...(indicatorConfigDefault?.[type] || {}),
      ...(indicatorConfigs?.[id] || {}),
    };

    const configParts = [];

    if (cfg?.displayMode) configParts.push(cfg.displayMode);
    if (cfg?.maType && String(cfg.maType).trim().toLowerCase() !== "none") {
      configParts.push(cfg.maType);
    }
    const len = cfg?.length ?? cfg?.baseLen ?? "";
    if (len !== "" && len !== null && len !== undefined) {
      configParts.push(len);
    }
    if (cfg?.fastLength !== undefined && cfg?.slowLength !== undefined) {
      configParts.push(`${cfg.fastLength}, ${cfg.slowLength}`);
    }
    if (cfg?.signalLength !== undefined || cfg?.signalPeriod !== undefined) {
      configParts.push(cfg.signalLength ?? cfg.signalPeriod);
    }
    if (cfg?.conversionLength !== undefined) configParts.push(cfg.conversionLength);
    if (cfg?.baseLength !== undefined) configParts.push(cfg.baseLength);
    if (cfg?.spanBLength !== undefined) configParts.push(cfg.spanBLength);
    if (cfg?.atrLength !== undefined) configParts.push(cfg.atrLength);
    if (cfg?.factor !== undefined) configParts.push(cfg.factor);
    if (cfg?.source) {
      configParts.push(cfg.source);
    }

    // Special cases / display name overrides
    let baseName = type;
    if (type === "VOLUME" || type === "Volume") baseName = "Vol";
    if (cfg?.name && cfg.name !== type) baseName = cfg.name;

    if (configParts.length > 0) {
      return `${baseName} (${configParts.join(", ")})`;
    }
    return baseName;
  };

  // Extract latest candle data for Data Window tab
  const candles = Array.isArray(candlesRef?.current) ? candlesRef.current : [];
  const latestCandle = candles.length > 0 ? candles[candles.length - 1] : null;

  const currentClose =
    liveLtpBySymbol?.[rawSymbol] ??
    liveLtpBySymbol?.[selectedCurrency?.symbol] ??
    latestCandle?.close;
  const prevClose =
    candles.length > 1 ? candles[candles.length - 2]?.close : latestCandle?.open;

  const priceDiff =
    currentClose !== undefined && prevClose !== undefined
      ? currentClose - prevClose
      : 0;
  const percentDiff =
    prevClose && prevClose !== 0 ? (priceDiff / prevClose) * 100 : 0;
  const isPositive = priceDiff >= 0;

  const formatDataWindowDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(
      typeof timestamp === "number" && timestamp < 1e11
        ? timestamp * 1000
        : timestamp
    );
    if (isNaN(date.getTime())) return "-";
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const yearShort = date.toLocaleDateString("en-US", { year: "2-digit" });
    return `${weekday} ${day} ${month} '${yearShort}`;
  };

  const formatPrice = (p) => {
    if (p === undefined || p === null || isNaN(p)) return "-";
    return Number(p).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatVolume = (vol) => {
    if (vol === undefined || vol === null || isNaN(vol)) return "-";
    const num = Number(vol);
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)} M`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)} M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)} K`;
    return num.toLocaleString();
  };

  return (
    <div className="flex h-full w-full flex-col select-none bg-panel font-[family-name:-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] text-[12px] text-fg rounded-tl-[10px] overflow-hidden">
      {/* Header with Segmented Tab Control */}
      <div className="flex w-full items-center border-b border-line px-3 py-2">
        <div className="flex w-full items-center rounded-md! bg-surface-2 p-0.5 text-[11px]">
          <button
            type="button"
            id="tab-object-tree"
            onClick={() => setActiveTab("tree")}
            className={`flex-1 cursor-pointer py-1.5 text-center font-medium rounded-sm! transition-all duration-150 ${
              activeTab === "tree"
                ? "bg-surface-3 text-fg shadow-xs font-semibold"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            Object tree
          </button>
          <button
            type="button"
            id="tab-data-window"
            onClick={() => setActiveTab("data")}
            className={`flex-1 cursor-pointer py-1.5 text-center font-medium rounded-sm! transition-all duration-150 ${
              activeTab === "data"
                ? "bg-surface-3 text-fg shadow-xs font-semibold"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            Data window
          </button>
        </div>
      </div>

      {/* Sub-toolbar (matching TradingView object tree) */}
      {/* {activeTab === "tree" && (
        <div className="flex items-center justify-between border-b border-line px-3 py-1.5 text-fg-muted">
          <div className="flex items-center gap-3">
            <button
              type="button"
              title="New folder"
              className="flex cursor-pointer items-center justify-center p-0.5 rounded-sm hover:text-fg transition-colors"
            >
              <FolderPlusIcon size={16} />
            </button>
            <button
              type="button"
              title="Clone"
              className="flex cursor-pointer items-center justify-center p-0.5 rounded-sm hover:text-fg transition-colors"
            >
              <CloneIcon size={16} />
            </button>
            <button
              type="button"
              title="Expand / Collapse all"
              className="flex cursor-pointer items-center justify-center p-0.5 rounded-sm hover:text-fg transition-colors"
            >
              <ChevronsUpDownIcon size={16} />
            </button>
          </div>
          <div>
            <button
              type="button"
              title="Manage objects"
              className="flex cursor-pointer items-center justify-center p-0.5 rounded-sm hover:text-fg transition-colors"
            >
              <FolderCogIcon size={16} />
            </button>
          </div>
        </div>
      )} */}

      {/* Main Panel Body */}
      <div className="flex-1 overflow-y-auto px-1 py-1">
        {activeTab === "tree" ? (
          <div className="flex flex-col gap-0.5">
            {/* Primary Stock Item */}
            <div
              className={`group flex items-center justify-between rounded-sm px-2 py-2 transition-colors duration-100 hover:bg-surface-2 ${
                !isMainSeriesVisible ? "opacity-50" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                {/* Candlestick Icon */}
                <div className="flex size-5 shrink-0 items-center justify-center text-fg">
                  <CandlestickIcon size={16} />
                </div>
                {/* Stock Title */}
                <span className="truncate text-[13px] font-bold text-fg tracking-tight">
                  {symbolDisplay}
                </span>
              </div>

              {/* Action Icons on Hover */}
              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  title={isMainSeriesVisible ? "Hide series" : "Show series"}
                  onClick={() => setIsMainSeriesVisible((v) => !v)}
                  className="flex size-6 cursor-pointer items-center justify-center rounded-sm text-fg-muted hover:bg-surface-3 hover:text-fg"
                >
                  {isMainSeriesVisible ? (
                    <IoEyeOutline size={15} />
                  ) : (
                    <IoEyeOffOutline size={15} />
                  )}
                </button>
              </div>
            </div>

            {/* List of Indicators */}
            {selectedIndicator && selectedIndicator.length > 0 ? (
              selectedIndicator.map((ind) => {
                const { id } = ind;
                const isVisible = indicatorVisibility[id] !== false;
                const label = getIndicatorLabel(ind);

                return (
                  <div
                    key={id}
                    className={`group flex items-center justify-between rounded-sm px-2 py-1.5 transition-colors duration-100 hover:bg-surface-2 ${
                      !isVisible ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      {/* Sine Wave Curve Icon */}
                      <div className="flex size-5 shrink-0 items-center justify-center text-fg-muted">
                        <WaveIcon size={16} />
                      </div>

                      {/* Indicator Name */}
                      <span
                        className="truncate text-[12px] font-medium text-fg"
                        title={label}
                      >
                        {label}
                      </span>
                    </div>

                    {/* Action Controls */}
                    <div
                      className={`flex items-center gap-0.5 transition-opacity ${
                        !isVisible
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {/* Toggle Visibility */}
                      {toggleIndicatorVisibility && (
                        <button
                          type="button"
                          title={isVisible ? "Hide" : "Show"}
                          onClick={() => toggleIndicatorVisibility(id)}
                          className="flex size-6 cursor-pointer items-center justify-center rounded-sm text-fg-muted hover:bg-surface-3 hover:text-fg"
                        >
                          {isVisible ? (
                            <IoEyeOutline size={14} />
                          ) : (
                            <IoEyeOffOutline size={14} />
                          )}
                        </button>
                      )}

                      {/* Settings */}
                      {setActiveBarIndicator && (
                        <button
                          type="button"
                          title="Settings"
                          onClick={() => setActiveBarIndicator(id)}
                          className="flex size-6 cursor-pointer items-center justify-center rounded-sm text-fg-muted hover:bg-surface-3 hover:text-fg"
                        >
                          <IoSettingsOutline size={14} />
                        </button>
                      )}

                      {/* Delete */}
                      {removeIndicator && (
                        <button
                          type="button"
                          title="Remove"
                          onClick={() => removeIndicator(id)}
                          className="flex size-6 cursor-pointer items-center justify-center rounded-sm text-fg-muted hover:bg-surface-3 hover:text-danger"
                        >
                          <IoCloseSharp size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-6 text-center text-fg-muted">
                <p className="text-[11px]">No indicators present on canvas</p>
              </div>
            )}
          </div>
        ) : (
          /* Data Window Tab Content */
          <div className="flex flex-col">
            {/* Date Row */}
            <div className="flex items-center justify-between border-b border-1 border-line px-3 py-2 text-[12px]">
              <span className="text-fg-muted font-normal">Date</span>
              <span className="font-medium text-fg">
                {formatDataWindowDate(latestCandle?.time)}
              </span>
            </div>

            {/* Symbol Details Banner & Rows */}
            <div className="border-b border-1 border-line pb-2">
              {/* Header banner */}
              <div className="flex items-center gap-2 bg-[#172d47]/70 dark:bg-[#152a42] px-3 py-1.5 text-white">
                <CandlestickIcon size={15} className="text-white" />
                <span className="truncate text-[13px] font-bold text-white tracking-tight">
                  {rawSymbol} · {timeframeValue || "1D"} · {exchange}
                </span>
              </div>

              {/* Symbol OHLCV Metrics */}
              <div className="pt-1">
                <div className="flex items-center justify-between px-3 py-1 text-[12px]">
                  <span className="text-fg-muted">Open</span>
                  <span className="font-mono text-[#22ab94] font-medium">
                    {formatPrice(latestCandle?.open)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-1 text-[12px]">
                  <span className="text-fg-muted">High</span>
                  <span className="font-mono text-[#22ab94] font-medium">
                    {formatPrice(latestCandle?.high)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-1 text-[12px]">
                  <span className="text-fg-muted">Low</span>
                  <span className="font-mono text-[#22ab94] font-medium">
                    {formatPrice(latestCandle?.low)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-1 text-[12px]">
                  <span className="text-fg-muted">Close</span>
                  <span className="font-mono text-[#22ab94] font-medium">
                    {formatPrice(currentClose)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-1 text-[12px]">
                  <span className="text-fg-muted">Change</span>
                  <span
                    className={`font-mono font-medium ${
                      isPositive ? "text-[#22ab94]" : "text-[#f23645]"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {priceDiff.toFixed(2)} ({isPositive ? "+" : ""}
                    {percentDiff.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-1 text-[12px]">
                  <span className="text-fg-muted">Vol</span>
                  <span className="font-mono text-[#22ab94] font-medium">
                    {formatVolume(latestCandle?.volume)}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-1 text-[12px]">
                  <span className="text-fg-muted">Last day change</span>
                  <span
                    className={`font-mono font-medium ${
                      isPositive ? "text-[#22ab94]" : "text-[#f23645]"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {priceDiff.toFixed(2)} ({isPositive ? "+" : ""}
                    {percentDiff.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Indicator Sections */}
            {selectedIndicator && selectedIndicator.length > 0 ? (
              selectedIndicator.map((ind) => {
                const { id, type } = ind;
                const label = getIndicatorLabel(ind);
                const val = liveIndicatorData?.[id];

                return (
                  <div key={id} className="border-b border-1 border-line py-2">
                    {/* Indicator Header with wave icon & configurations */}
                    <div className="flex items-center gap-2 px-3 py-1 text-fg">
                      <WaveIcon size={15} className="text-fg-muted" />
                      <span
                        className="truncate text-[12px] font-semibold text-fg"
                        title={label}
                      >
                        {label}
                      </span>
                    </div>

                    {/* Indicator Values */}
                    <div className="pt-0.5">
                      {val !== undefined && val !== null ? (
                        typeof val === "object" ? (
                          Object.entries(val).map(([k, v]) => (
                            <div
                              key={k}
                              className="flex items-center justify-between px-3 py-1 text-[12px]"
                            >
                              <span className="text-fg-muted capitalize">
                                {k.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <span className="font-mono text-[#22ab94] font-medium">
                                {typeof v === "number" ? formatPrice(v) : String(v)}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center justify-between px-3 py-1 text-[12px]">
                            <span className="text-fg-muted">
                              {type === "VOLUME" || type === "Volume" ? "Volume" : type}
                            </span>
                            <span className="font-mono text-[#22ab94] font-medium">
                              {type === "VOLUME" || type === "Volume"
                                ? formatVolume(val)
                                : typeof val === "number"
                                ? formatPrice(val)
                                : String(val)}
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="flex items-center justify-between px-3 py-1 text-[12px]">
                          <span className="text-fg-muted">
                            {type === "VOLUME" || type === "Volume" ? "Volume" : type}
                          </span>
                          <span className="font-mono text-[#22ab94] font-medium">
                            {type === "VOLUME" || type === "Volume"
                              ? formatVolume(latestCandle?.volume)
                              : "-"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-4 text-center text-fg-muted text-[11px]">
                No active indicators
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
