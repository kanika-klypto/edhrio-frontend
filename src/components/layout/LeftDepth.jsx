import React from "react";
import { FiX } from "react-icons/fi";
import { Spinner } from "../tradingModals/Spinner";

const LeftDepth = ({
  onClose,
  predictResults,
  selectedCurrency,
  setSelectedCurrency,
  isPredicting,
  predictionStatus,
}) => {
  // console.log(
  //   "[DEBUG LeftDepth] Rendered with predictionStatus:",
  //   predictionStatus,
  //   "isPredicting:",
  //   isPredicting,
  // );

  const progressPercent =
    Number(predictionStatus?.processed) > 0 && Number(predictionStatus?.total)
      ? Math.round(
          (Number(predictionStatus.processed) /
            Number(predictionStatus.total)) *
            100,
        )
      : 0;

  const statusStr =
    typeof predictionStatus === "string"
      ? predictionStatus
      : predictionStatus?.phase || predictionStatus?.status || "";

  const isSuccess =
    statusStr?.toLowerCase() === "complete" ||
    statusStr?.toLowerCase() === "skipped" ||
    statusStr?.toLowerCase() === "done";

  return (
    <div
      className="flex h-full flex-col bg-panel font-[family-name:-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] text-[12px] text-fg rounded-tl-[10px] overflow-hidden"
      style={{ height: "100%" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-[16px] py-[12px]">
        <div className="flex items-center gap-2 font-semibold text-fg">
          <span>Strategy Results</span>
          {predictResults && predictResults.length > 0 && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-500 border border-blue-500/30">
              {predictResults.length}
            </span>
          )}
        </div>
        <FiX
          size={16}
          className="cursor-pointer text-fg-muted hover:text-fg transition-colors"
          onClick={onClose}
        />
      </div>

      {/* Progress bar */}
      {predictionStatus?.status === "running" && (
        <div className="px-3 py-2 border-b border-line bg-surface-2">
          <div className="flex justify-between text-[12px] mb-2 font-semibold text-fg">
            <span>
              {predictionStatus?.phase === "predicting"
                ? "Predicting AI..."
                : "Fetching Ticks..."}
            </span>
            <span>
              {predictionStatus?.total
                ? `${predictionStatus?.processed || 0} / ${predictionStatus?.total} (${progressPercent}%)`
                : "0 / 0 (0%)"}
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden bg-surface-3">
            <div
              className="h-full bg-green-500 transition-[width] duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* List */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {isPredicting &&
        (!predictionStatus || predictionStatus.status !== "running") ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : predictResults && predictResults.length > 0 ? (
          predictResults.map((item, idx) => {
            const type = item.response?.type || "UNKNOWN";
            const isCall = type.toUpperCase() === "CALL";

            // Check if this result is the currently selected chart symbol
            const isActive =
              (item?.symbol || "").toUpperCase() ===
              (
                selectedCurrency?.symbol ||
                selectedCurrency?.name ||
                ""
              ).toUpperCase();

            const timeStr = item.tick?.datetime || item.response?.entry_time;
            let displayTime = "N/A";
            if (timeStr) {
              try {
                const d = new Date(timeStr);
                displayTime = isNaN(d.getTime())
                  ? timeStr
                  : d.toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    });
              } catch (e) {
                displayTime = timeStr;
              }
            }

            return (
              <div
                key={item.uuid || idx}
                className={`
                    flex flex-col gap-1.5 px-3 py-2
                    border-b border-surface-2
                    cursor-pointer transition-colors
                    hover:bg-surface-2
                    ${isActive ? "bg-surface-2" : ""}
                  `}
                onClick={() => {
                  if (setSelectedCurrency && item.symbol) {
                    setSelectedCurrency({
                      name: item.symbol,
                      symbol: item.symbol,
                      segment: "NSE",
                      type: "currency",
                    });
                  }
                }}
              >
                {/* Row 1: Symbol + Trade Type Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[12px] text-fg">
                    {item?.symbol}
                  </span>
                  <span
                    className={`text-[12px] font-bold px-1.5 py-0.5 rounded ${
                      isCall
                        ? "bg-green-500/15 text-green-500 "
                        : "bg-red-500/15 text-red-500 "
                    }`}
                  >
                    {type}
                  </span>
                </div>

                {/* Row 2: Entry Price + Trend + RSI */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[12px] font-semibold ${
                      isCall ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ₹{item.response?.entry_price ?? "—"}
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    {item.response?.trend && (
                      <span
                        className={`text-[12px] ${
                          item.response.trend === "UP"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item.response.trend === "UP" ? "↑" : "↓"}{" "}
                        {item.response.trend}
                      </span>
                    )}
                    {item.response?.rsi && (
                      <span className="text-[12px] text-fg-muted">
                        RSI: {Number(item.response.rsi).toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 3: Time */}
                {/* <div className="text-[0.75rem] text-[var(--text-secondary)]">
                  {displayTime}
                </div> */}
              </div>
            );
          })
        ) : predictionStatus?.status === "running" ||
          predictionStatus?.phase === "predicting" ||
          predictionStatus?.phase === "starting" ||
          predictionStatus?.status === "starting" ? null : (
          <div className="mt-5 text-center text-[12px] text-fg-muted">
            No results available.
          </div>
        )}
      </div>

      {/* Footer */}
      {!isSuccess && (
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-line bg-surface-2">
          {statusStr && (
            <>
              <span className="whitespace-nowrap text-[12px] font-semibold px-2.5 py-1 rounded-md bg-yellow-500/15 text-yellow-500 border border-yellow-50 capitalize">
                Status: {statusStr}
              </span>
              <span className="whitespace-nowrap text-[12px] font-semibold px-2.5 py-1 rounded-md bg-blue-500/15 text-blue-500 border border-blue-500/30">
                Trades: {predictResults?.length || 0}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LeftDepth;
