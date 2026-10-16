import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { Spinner } from "./Spinner";
import apiService from "../../services/apiServices";
import { useDebounce } from "../../util/common";
import NSE from "../../assets/NSE.svg";
import BSE from "../../assets/BSE.svg";
import { getNotebookStrategies } from "../../services/notebookStrategyService";
import { getUser } from "../../pages/auth/protected";
import { getStockLogo } from "../../util/stockLogo";

const SymbolAvatar = ({ code, symbol, name }) => {
  const [imgError, setImgError] = useState(false);
  const logoSrc = getStockLogo(symbol, name, code);

  if (logoSrc && !imgError) {
    return (
      <img
        src={logoSrc}
        alt={name || symbol || "logo"}
        onError={() => setImgError(true)}
        className="size-6 shrink-0 rounded-full object-cover"
      />
    );
  }

  const initial = (name || symbol || code || "S").charAt(0).toUpperCase();
  return (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-(--brand-primary) text-xs font-bold text-white">
      {initial}
    </div>
  );
};

const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="px-3 pb-3 py-0 flex">
    <span className="flex items-center rounded-l-md border border-r-0 border-solid border-line bg-surface-2 px-3 text-fg-muted">
      <FiSearch />
    </span>
    <input
      type="text"
      autoFocus
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="min-w-0 flex-1 rounded-r-md border border-solid border-line bg-surface-2 px-3 py-1.5 font-[inherit] text-base text-fg outline-none transition-colors placeholder:text-fg-muted focus:border-accent"
    />
  </div>
);

/* Scrollable list area */
const ListArea = ({ children }) => (
  <div className="modal-scrollbar mt-2.5 flex-1 overflow-y-auto p-0!">
    {children}
  </div>
);

/* Clickable row (replaces ListGroup.Item action) */
const rowCls =
  "cursor-pointer border-0 border-b rounded-sm! border-solid border-line bg-surface-2 text-fg transition-colors duration-200 last:border-b-0 hover:bg-list-hover focus-visible:bg-surface focus-visible:outline-none";

const activateOnKey = (fn) => (e) => {
  if (e.target !== e.currentTarget) return; // ignore keys from nested controls
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};

const Row = ({ onActivate, className = "", selected = false, children }) => (
  <li
    role="button"
    tabIndex={0}
    onClick={onActivate}
    onKeyDown={activateOnKey(onActivate)}
    className={`${rowCls} ${selected ? "ring-1 ring-inset ring-gray-400 rounded-sm!" : ""} ${className}`}
  >
    {children}
  </li>
);

const List = ({ children }) => (
  <ul className="m-0 list-none px-1">{children}</ul>
);

/* ------------------------------------------------------------------ */

export const ListingModal = ({
  isOpen,
  onClose,
  title,
  selectedCurrency,
  setSelectedCurrency,
  selectedIndicator,
  setSelectedIndicator,
  toggleIndicator,
  setAlertResult,
  alertResult,
  initialSearch,
  renderActions,
  timeframeValue,
  onSubmit,
  onSelectStrategy,
}) => {
  const [indicators, setIndicators] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [savedStrategies, setSavedStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchIndicator, setSearchIndicator] = useState("");
  const [searchCurrency, setSearchCurrency] = useState("");

  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setDragPos({ x: 0, y: 0 });
    if (!isOpen) {
      setIsDragging(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      let newX = e.clientX - dragStartPos.current.x;
      let newY = e.clientY - dragStartPos.current.y;

      // Clamp the Y coordinate so the modal header cannot be dragged completely off-screen
      const maxY = window.innerHeight / 2 - 40;
      const minY = -(window.innerHeight / 2) + 40;

      if (newY > maxY) newY = maxY;
      if (newY < minY) newY = minY;

      setDragPos({ x: newX, y: newY });
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - dragPos.x,
      y: e.clientY - dragPos.y,
    };
  };

  const TABS = ["ALL", "EQUITY", "FUTURES", "INDICES"];
  const [activeTab, setActiveTab] = useState("ALL");
  const [equity, setEquity] = useState([]);
  const [futures, setFutures] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("listing-modal-open");
      if (title === "Symbol Search" && initialSearch) {
        setSearchCurrency(initialSearch);
      }
    } else {
      document.body.classList.remove("listing-modal-open");
      setSearchCurrency(""); // reset on close
      setSearchIndicator("");
    }
    return () => document.body.classList.remove("listing-modal-open");
  }, [isOpen, initialSearch, title]);

  const [indices, setIndices] = useState([]);

  const [rsiValue, setRsiValue] = useState({
    condition: "crossesAbove",
    value: "",
  });
  const [alertLoading, setAlertLoading] = useState(false);
  const [alertError, setAlertError] = useState(null);

  const handleSubmitAlert = () => {
    if (!rsiValue.value) return;

    if (onSubmit) {
      onSubmit(rsiValue);
    }
  };
  const debouncedIndicator = useDebounce(searchIndicator, 500);

  // 🔥 Fetch Indicators
  async function fetchIndicators() {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.post(`equity/getIndicators`);
      setIndicators(response?.data || []);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to fetch indicators");
    } finally {
      setLoading(false);
    }
  }

  // 🔥 Fetch Stocks (Currencies replaced)
  async function fetchCurrencies() {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get(`equity/stocks`);
      console.log("stocks API response:", response);

      setCurrencies(response?.stocks || []);
      setEquity(response?.stocks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // 🔥 Fetch Futures
  async function fetchFutures() {
    try {
      setLoading(true);
      const res = await apiService.get("futures/symbols");
      console.log("FUTURES:", res);
      setFutures(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchIndices() {
    try {
      setLoading(true);
      const res = await apiService.get("equity/indices");
      console.log("INDICES:", res);
      setIndices(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSavedStrategies() {
    setLoading(true);
    setError(null);

    try {
      const currentUser = getUser();
      const userId =
        currentUser?.id || currentUser?._id || currentUser?.userId || undefined;

      const response = await getNotebookStrategies({
        userId,
        limit: 100,
        offset: 0,
      });

      const rawStrategies = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.items)
            ? response.items
            : Array.isArray(response?.results)
              ? response.results
              : Array.isArray(response?.strategies)
                ? response.strategies
                : [];

      setSavedStrategies(rawStrategies);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to fetch saved strategies",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    if (title === "Indicators") {
      if (!indicators || indicators.length === 0) {
        fetchIndicators();
      }
      return;
    }

    if (title === "Strategies") {
      fetchSavedStrategies();
      return;
    }

    if (title === "Symbol Search") {
      if (activeTab === "ALL") {
        if (equity?.length === 0) fetchCurrencies();
        if (futures?.length === 0) fetchFutures();
      }
      if (activeTab === "EQUITY" && equity?.length === 0) {
        fetchCurrencies();
      }

      if (activeTab === "FUTURES" && futures?.length === 0) {
        fetchFutures();
      }

      if (activeTab === "INDICES" && indices?.length === 0) {
        fetchIndices();
      }
    }
  }, [title, activeTab, isOpen]);

  const filteredStrategies = (savedStrategies || [])
    .filter((strategy) => {
      if (!searchCurrency) return true;
      const search = searchCurrency.toLowerCase().trim();
      const strategyName = String(
        strategy?.name || strategy?.strategyName || "",
      ).toLowerCase();
      const symbol = String(
        strategy?.config?.symbol || strategy?.config?.lookupSymbol || "",
      ).toLowerCase();
      const timeframe = String(strategy?.config?.timeframe || "").toLowerCase();

      return (
        strategyName.includes(search) ||
        symbol.includes(search) ||
        timeframe.includes(search)
      );
    })
    .sort((a, b) => {
      const aTime = new Date(
        a?.updatedAt || a?.updated_at || a?.createdAt || a?.created_at || 0,
      ).getTime();
      const bTime = new Date(
        b?.updatedAt || b?.updated_at || b?.createdAt || b?.created_at || 0,
      ).getTime();
      return bTime - aTime;
    });

  // 🔍 Indicator Filter
  const filteredIndicators = (indicators ?? []).filter((item) => {
    if (!searchIndicator) return true;

    const search = searchIndicator.toLowerCase().trim();

    const label = item?.label?.toLowerCase() || "";
    const slug = item?.slug?.toLowerCase() || "";

    // 🔥 initials support (RSI -> "rsi", Moving Average -> "ma")
    const getInitials = (text) =>
      text
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toLowerCase();

    return (
      label.includes(search) ||
      slug.includes(search) ||
      getInitials(label).includes(search)
    );
  });

  // 🔥 Normalize + Merge
  const normalize = (item, type) => {
    if (type === "FUTURES") {
      return {
        name: item?.name,
        symbol: item?.symbol,
        token: item?.token,
        fullName: item?.fullName,
        segment: item?.segment,
        type,
        expiry: item?.expiry,
        high: item?.high,
        low: item?.low,
        ltp: item?.ltp,
      };
    }

    // EQUITY / OPTIONS
    return {
      name: item?.name,
      symbol: item?.actualSymbol, // ✅ equity uses this
      token: item?.token,
      fullName: item?.fullName,
      segment: item?.segment,
      type,
      high: item?.high,
      low: item?.low,
      ltp: item?.ltp,
    };
  };

  const mergedList = [
    ...equity?.map((e) => normalize(e, "EQUITY")),
    ...futures?.map((f) => normalize(f, "FUTURES")),
    ...indices?.map((i) => normalize(i, "INDICES")),
  ];

  // 🔥 Active List
  const getActiveList = () => {
    if (activeTab === "EQUITY")
      return equity?.map((e) => normalize(e, "EQUITY"));
    if (activeTab === "FUTURES")
      return futures?.map((f) => normalize(f, "FUTURES"));
    if (activeTab === "INDICES")
      return indices?.map((o) => normalize(o, "INDICES"));
    return mergedList;
  };

  // 🔍 Unified Filter
  const filteredList = getActiveList()?.filter((item) => {
    if (!searchCurrency) return true;

    const search = searchCurrency.toLowerCase();

    return (
      item?.name?.toLowerCase().includes(search) ||
      item?.fullName?.toLowerCase().includes(search) ||
      item?.symbol?.toLowerCase().includes(search) ||
      item?.segment?.toLowerCase().includes(search) ||
      item?.userCode?.toLowerCase().includes(search)
    );
  });

  const selectSymbol = (item) => {
    if (renderActions) return;
    setSelectedCurrency({
      symbol: item.symbol,
      name: item.name,
      token: item.token,
      segment: item.segment,
      type: item.type,
      userCode: item.userCode,
    });
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-black/60 p-3"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        background: "rgba(0, 0, 0, 0.6)",
      }}
      onClick={onClose}
    >
      <div
        className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col rounded-md border border-solid border-line bg-surface-2  text-fg shadow-modal"
        onClick={(e) => e.stopPropagation()}
        /* dynamic drag offset: the one thing that must stay inline */
        style={{
          transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
          width: "100%",
          maxWidth: "672px",
          maxHeight: "85vh",
          boxSizing: "border-box",
          background: "var(--bg-secondary)",
        }}
      >
        {/* Header */}
        <div
          className="flex cursor-move items-center justify-between p-3"
          onMouseDown={handleMouseDown}
        >
          <h2 className="m-0 select-none text-sm! font-bold! text-fg">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="flex cursor-pointer items-center border-0 bg-transparent p-0 text-fg-muted transition-colors hover:text-fg"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>

        {/* ================= SYMBOL SEARCH ================= */}
        {title === "Symbol Search" && (
          <div className="flex flex-1 flex-col overflow-hidden">
            <SearchInput
              placeholder="Search symbol..."
              value={searchCurrency}
              onChange={(e) => setSearchCurrency(e.target.value)}
            />
            {/* Tabs */}
            <div className=" px-3 text-xs inline-flex items-center self-start border-b border-solid border-line">
              {TABS?.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`-mb-px cursor-pointer whitespace-nowrap border-x-0 border-t-0 border-b-2 border-solid bg-transparent px-3 py-0.5 font-[inherit] text-xs tracking-wide outline-none transition-colors duration-150 ${
                      isActive
                        ? "border-accent font-semibold text-fg"
                        : "border-transparent font-normal text-fg-muted hover:text-fg"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <ListArea>
              {loading ? (
                <Spinner />
              ) : filteredList?.length > 0 ? (
                <List>
                  {filteredList?.map((item, index) => (
                    <Row
                      key={`${item.symbol}-${index}`}
                      onActivate={() => selectSymbol(item)}
                      selected={
                        !!selectedCurrency &&
                        selectedCurrency.symbol === item.symbol &&
                        selectedCurrency.token === item.token
                      }
                      className="px-2 py-1.5"
                    >
                      {/* mobile: name | actions, full name below. sm+: 3 columns */}
                      <div className="grid text-xs w-full grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] items-center">
                        <div className="flex min-w-0 items-center gap-2">
                          <SymbolAvatar
                            code={item?.code}
                            symbol={item?.symbol || item?.name}
                            name={item?.name}
                          />
                          <div className="truncate  font-medium uppercase">
                            {item?.name}
                            {item?.type === "FUTURES" && (
                              <span className="ml-1.5 text-xs-tight font-normal text-fg-muted">
                                {item.expiry}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="min-w-0 items-start! truncate">
                          {item?.fullName}
                        </div>

                        <div className="flex items-center justify-end gap-2">
                          {renderActions ? (
                            renderActions(item)
                          ) : (
                            <>
                              <small className=" text-fg-muted">
                                {item.segment}
                              </small>
                              <img
                                src={
                                  item.segment?.toLowerCase() === "nse"
                                    ? NSE
                                    : BSE
                                }
                                className="rounded-full"
                                alt={item.segment}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </Row>
                  ))}
                </List>
              ) : (
                <p className="py-3 text-center text-fg">No Data found</p>
              )}
            </ListArea>
          </div>
        )}

        {/* ================= STRATEGIES ================= */}
        {title === "Strategies" && (
          <div className="flex flex-1 flex-col overflow-hidden py-3">
            <SearchInput
              placeholder="Search saved strategies..."
              value={searchCurrency}
              onChange={(e) => setSearchCurrency(e.target.value)}
            />

            <ListArea>
              {loading ? (
                <Spinner />
              ) : error ? (
                <p className="py-3 text-center text-danger">{error}</p>
              ) : filteredStrategies.length > 0 ? (
                <List>
                  {filteredStrategies.map((strategy, index) => {
                    const strategyName =
                      strategy?.name ||
                      strategy?.strategyName ||
                      `Strategy ${index + 1}`;
                    const symbol =
                      strategy?.config?.symbol ||
                      strategy?.config?.lookupSymbol;
                    const timeframe =
                      strategy?.config?.timeframe || timeframeValue || "--";
                    const updatedAt =
                      strategy?.updatedAt ||
                      strategy?.updated_at ||
                      strategy?.createdAt ||
                      strategy?.created_at;

                    return (
                      <Row
                        key={
                          strategy?.id ||
                          strategy?._id ||
                          `${strategyName}-${index}`
                        }
                        onActivate={async () => {
                          if (typeof onSelectStrategy === "function") {
                            await onSelectStrategy(strategy);
                          }
                          onClose();
                        }}
                        className="px-3.5 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-start gap-2">
                            <SymbolAvatar symbol={strategyName} />
                            <div className="min-w-0">
                              <div className="truncate text-compact font-semibold">
                                {strategyName}
                              </div>
                              <div className="mt-0.75 text-xs-tight text-fg-muted">
                                {symbol} · {timeframe}
                              </div>
                            </div>
                          </div>
                          <div className="whitespace-nowrap text-right text-[10px] text-fg-muted">
                            {updatedAt
                              ? new Date(updatedAt).toLocaleDateString("en-IN")
                              : "Saved"}
                          </div>
                        </div>
                      </Row>
                    );
                  })}
                </List>
              ) : (
                <p className="py-3 text-center text-fg">
                  No saved strategies found
                </p>
              )}
            </ListArea>
          </div>
        )}

        {/* ================= INDICATORS ================= */}
        {title === "Indicators" && (
          <div className="mt-3 flex flex-1 flex-col overflow-hidden">
            <SearchInput
              placeholder="Search indicators"
              value={searchIndicator}
              onChange={(e) => setSearchIndicator(e.target.value)}
            />

            <ListArea>
              {loading ? (
                <Spinner />
              ) : filteredIndicators?.length > 0 ? (
                <List>
                  {filteredIndicators?.map((item, index) => (
                    <Row
                      key={index}
                      onActivate={() => {
                        if (toggleIndicator) {
                          toggleIndicator(item.slug);
                        }
                      }}
                      className="flex items-center justify-between px-3.5 py-2.5"
                    >
                      <span className="text-xs font-medium capitalize">
                        {item.label}
                      </span>
                    </Row>
                  ))}
                </List>
              ) : (
                <p className="text-fg-muted">No Data found</p>
              )}
            </ListArea>
          </div>
        )}

        {/* ================= ALERT ================= */}
        {title === "Alerts" && (
          <div className="mt-3 text-fg">
            <h5 className="mb-2 text-xl font-medium">Create RSI Alert</h5>

            {/* Condition */}
            <label htmlFor="alert-condition" className="mb-1 block text-sm">
              Condition
            </label>
            <select
              id="alert-condition"
              className="mb-3 block w-full rounded-md border border-solid border-line bg-surface-2 px-3 py-1.5 font-[inherit] text-base text-fg outline-none transition-colors focus:border-accent"
              value={rsiValue.condition}
              onChange={(e) =>
                setRsiValue({
                  ...rsiValue,
                  condition: e.target.value,
                })
              }
            >
              <option value="crossesAbove">Crosses Above</option>
              <option value="crossesBelow">Crosses Below</option>
              <option value="greaterThan">Greater Than</option>
              <option value="lessThan">Less Than</option>
            </select>

            {/* RSI Value */}
            <label htmlFor="alert-value" className="mb-1 block text-sm">
              RSI Value
            </label>
            <input
              id="alert-value"
              type="number"
              placeholder="Enter RSI Value (e.g. 70)"
              value={rsiValue.value}
              onChange={(e) =>
                setRsiValue({
                  ...rsiValue,
                  value: e.target.value,
                })
              }
              className="mb-3 box-border block w-full rounded-md border border-solid border-line bg-surface-2 px-3 py-1.5 font-[inherit] text-base text-fg outline-none transition-colors placeholder:text-fg-muted focus:border-accent"
            />

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmitAlert}
              disabled={alertLoading}
              className="w-full cursor-pointer rounded-md border-0 bg-accent px-3 py-1.5 font-[inherit] text-base text-white transition-opacity duration-150 enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-65"
            >
              {alertLoading ? "Scanning..." : "Start Scanner"}
            </button>

            {/* Result */}
            <div className="custom-scrollbar mt-3 max-h-72.5 overflow-y-auto">
              {alertError && (
                <div className="text-sm text-danger">{alertError}</div>
              )}

              {alertResult && (
                <pre className="text-xs">
                  {JSON.stringify(alertResult, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
