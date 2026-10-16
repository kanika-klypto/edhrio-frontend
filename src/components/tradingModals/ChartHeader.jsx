import { VscGraphLine } from "react-icons/vsc";
import { LuLibrary } from "react-icons/lu";
import { FiEye, FiEyeOff, FiSettings, FiCpu, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { ListingModal } from "./ListingModal";
import apiService from "../../services/apiServices";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { chartOptions } from "../../util/common";
import { Navigate, useNavigate } from "react-router-dom";
import { CgMaximizeAlt } from "react-icons/cg";
import { MdOutlineFullscreenExit } from "react-icons/md";
import { TbCalendarShare } from "react-icons/tb";
import GoToDateDialog from "../layout/GoToDateDialog";
import { BsFillAlarmFill } from "react-icons/bs";
import { PiStarFourLight } from "react-icons/pi";
import { FaCode } from "react-icons/fa6";
import Swal from "sweetalert2";
import { isAuthenticated, logout, getUser } from "../../pages/auth/protected";
import ChartHeaderProfileMenu from "./ChartHeaderProfileMenu";

const BTN_LAYOUT =
  "flex items-center gap-[5px] border-none py-0 px-[10px] h-[35px] whitespace-nowrap cursor-pointer text-[12px]! font-semibold rounded-[6px]!";
const BTN = `${BTN_LAYOUT} text-fg`;
const BTN_GHOST = `${BTN} relative border-1 border-(--brand-primary) bg-transparent hover:after:absolute hover:after:inset-x-0 hover:after:top-1/2 hover:after:h-[28px] hover:after:-translate-y-1/2 hover:after:rounded-[6px] hover:after:bg-surface-2 [&>*]:relative [&>*]:z-[1]`;
const BTN_SYMBOL =
  "flex items-center gap-[5px] border-none py-0 px-[14px] h-[28px] bg-surface-3 whitespace-nowrap cursor-pointer text-[12px]! font-bold rounded-[20px]! text-fg";
// exit-fullscreen button
const BTN_EXIT = `${BTN_LAYOUT} bg-[rgba(239,68,68,0.1)] text-[#ef4444]`;

// was `.chart-header-bar > button` + `.chart-header-utility-actions > button`
const BTN_SPACING =
  "[&>button]:relative [&>button]:mx-1! [&>button:first-child]:ml-0! " +
  "[&>button+button]:before:content-[''] [&>button+button]:before:absolute [&>button+button]:before:-left-1 " +
  "[&>button+button]:before:top-[7px] [&>button+button]:before:w-px [&>button+button]:before:h-[22px] " +
  "[&>button+button]:before:bg-line";

// was .hide-text-md / .hide-below-lg
const HIDE_MD = "[@media(max-width:992px)]:hidden";

// was .sleek-scroll
const SLEEK_SCROLL =
  "[&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent " +
  "[&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb]:rounded-[4px] " +
  "[&::-webkit-scrollbar-thumb:hover]:bg-fg-muted";

// radix dropdown (was d.dropdownContent, minWidth set per usage)
const DD_CONTENT =
  "bg-(--bg-secondary) border-1 shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-[6px] z-[999] rounded-sm!";
// radix dropdown item (was d.dropdownItem)
const DD_ITEM =
  "flex items-center gap-[8px] py-[8px] px-[12px] rounded-sm! text-[12px]! cursor-pointer border-none w-full transition-colors";
const DD_ITEM_ACTIVE = "rounded-sm! bg-[#f2f2f2] text-black hover:bg-[#f2f2f2] hover:text-black";
const DD_ITEM_IDLE = "rounded-sm! bg-transparent text-fg-muted hover:bg-[#2e2e2e] hover:text-white";
const DD_CHECK = "text-black text-[0.7rem]";



export default function ChartHeader({
  timeframeValue,
  setTimeframeValue,
  selectedCurrency,
  selectedIndicator,
  setSelectedIndicator,
  setSelectedCurrency,
  toggleIndicator,
  setChartType,
  chartType,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  setAlertResult,
  alertResult,
  addAlert,
  onOpenScanner,
  onSelectStrategy,
  onToggleStrategyVisuals,
  onOpenStrategyEditor,
  areStrategyVisualsVisible,
  hasActiveStrategy,
  isFullscreen,
  onToggleFullscreen,
  onGoToDate,
  onAgentClick,
  onCodeClick,
}) {
  const [timeframe, setTimeframe] = useState(60);
  const [showGoToDate, setShowGoToDate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const active = chartOptions.find((c) => c.value === chartType);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = tomorrow.toISOString().split("T")[0];

  const [modalConfig, setModalConfig] = useState({
    open: false,
    title: "",
    items: [],
    initialSearch: "",
  });

  const openModal = (title, items, initialSearch = "") =>
    setModalConfig({ open: true, title, items, initialSearch });
  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, open: false, initialSearch: "" }));

  async function fetchTimeframe() {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.post("/equity/getTimeFrames");
      setTimeframe(response.data);
      setTimeframeValue(timeframeValue);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to fetch timeframes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTimeframe();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;
      const isTypingInFormField =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.isContentEditable;
      const isInsideCodeEditor =
        activeElement?.closest?.(".code-editor-panel") ||
        activeElement?.closest?.(".monaco-editor") ||
        activeElement?.classList?.contains("inputarea");

      // Check if key is alphabetic and no modifier keys are active
      if (/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Prevent opening if the user is typing in a field or inside Monaco/code editor.
        if (isTypingInFormField || isInsideCodeEditor) {
          return;
        }

        // Open symbol search modal and pass the pressed key
        e.preventDefault();
        openModal("Symbol Search", undefined, e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="flex w-full flex-col text-[14px]"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div
        className={`flex flex-wrap items-center px-2 py-px ${BTN_SPACING} [@media(max-width:768px)]:px-[16px] [@media(max-width:768px)]:py-[8px] [@media(max-width:768px)]:[&>*]:grow [@media(max-width:768px)]:[&>*]:justify-center [@media(max-width:768px)]:[&>*]:text-center`}
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        {/* Symbol button */}
        <button
          title="Symbol Search"
          onClick={() => openModal("Symbol Search")}
          className={BTN_SYMBOL}
        >
          {selectedCurrency?.name || "TCS"}
        </button>

        {/* Timeframe dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={`${BTN_GHOST} justify-between`}
              title={timeframeValue || "5m"}
            >
              <span>{timeframeValue || "5m"}</span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="start"
              className={`${SLEEK_SCROLL} ${DD_CONTENT} max-h-[400px] min-w-[130px] overflow-y-auto`}
              sideOffset={6}
            >
              {(!timeframe || Object.keys(timeframe)?.length === 0) && (
                <DropdownMenu.Item asChild>
                  <button
                    onClick={() => setTimeframeValue("5m")}
                    className={`${DD_ITEM} ${
                      timeframeValue === "5m" ? DD_ITEM_ACTIVE : DD_ITEM_IDLE
                    }`}
                  >
                    <span className="flex-1 text-left">5 Minute</span>
                    {timeframeValue === "5m" && (
                      <span className={DD_CHECK}>✓</span>
                    )}
                  </button>
                </DropdownMenu.Item>
              )}
              {timeframe &&
                Object.entries(timeframe)?.map(([group, items]) => (
                  <div key={group}>
                    <div className="px-[12px] pt-[6px] pb-[2px] text-left text-[0.7rem] font-bold text-fg-muted uppercase opacity-70">
                      {group}
                    </div>
                    {items?.map((item) => (
                      <DropdownMenu.Item key={item?.seconds} asChild>
                        <button
                          onClick={() => setTimeframeValue(item?.value)}
                          className={`${DD_ITEM} ${
                            timeframeValue === item?.value
                              ? DD_ITEM_ACTIVE
                              : DD_ITEM_IDLE
                          }`}
                        >
                          <span className="flex-1 text-left">{item?.label}</span>
                          {timeframeValue === item?.value && (
                            <span className={DD_CHECK}>✓</span>
                          )}
                        </button>
                      </DropdownMenu.Item>
                    ))}
                  </div>
                ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* Chart type dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className={BTN_GHOST} title={active?.label}>
              {active?.icon && <active.icon size={14} />}
              {/* <span>{active?.label}</span> */}
              {/* <FiChevronDown size={13} /> */}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="start"
              sideOffset={6}
              className={`${DD_CONTENT} min-w-[160px]`}
            >
              {chartOptions?.map((item) => (
                <DropdownMenu.Item key={item.value} asChild>
                  <button
                    onClick={() => setChartType(item.value)}
                    className={`${DD_ITEM} ${
                      chartType === item.value ? DD_ITEM_ACTIVE : DD_ITEM_IDLE
                    }`}
                  >
                    <item.icon size={14} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {chartType === item.value && (
                      <span className={DD_CHECK}>✓</span>
                    )}
                  </button>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        {/* Indicators */}
        <button
          className={BTN_GHOST}
          title="Indicators"
          onClick={() => openModal("Indicators")}
        >
          <VscGraphLine size={14} />
          <span className={HIDE_MD}>Indicators</span>
        </button>

        <button
          className={BTN_GHOST}
          title="Strategies"
          onClick={() => openModal("Strategies")}
        >
          <LuLibrary size={14} />
          <span className={HIDE_MD}>Strategies</span>
        </button>

        {hasActiveStrategy && (
          <>
            <button
              title={
                areStrategyVisualsVisible
                  ? "Hide strategy visuals"
                  : "Show strategy visuals"
              }
              onClick={onToggleStrategyVisuals}
              className={BTN}
            >
              {areStrategyVisualsVisible ? (
                <FiEyeOff size={14} />
              ) : (
                <FiEye size={14} />
              )}
              <span>{areStrategyVisualsVisible ? "Hide" : "Show"}</span>
            </button>

            <button
              title="Open strategy editor"
              onClick={onOpenStrategyEditor}
              className={BTN}
            >
              <FiSettings size={14} />
            </button>
          </>
        )}

        {/* Spacer */}
        {/* <div style={{ flex: 1 }} /> */}
        <button
          className={BTN_GHOST}
          title="Create Alert"
          onClick={onOpenScanner}
        >
          <BsFillAlarmFill className="mr-1" size={14} />
          <span className={HIDE_MD}>Create Alert</span>
        </button>

        <div
          className={`ml-auto flex items-center ${BTN_SPACING}`}
        >
          <button
            className={BTN_GHOST}
            title="Open Agent"
            onClick={onAgentClick}
          >
            <PiStarFourLight size={14} />
            <span className={HIDE_MD}>Agent</span>
          </button>

          <button
            className={BTN_GHOST}
            title="Open Code Editor"
            onClick={onCodeClick}
          >
            <FaCode size={14} />
            <span className={HIDE_MD}>Code Editor</span>
          </button>

          {!isFullscreen && (
            <button
              className={BTN_GHOST}
              title="Maximize Chart"
              onClick={onToggleFullscreen}
            >
              <CgMaximizeAlt size={15} />
            </button>
          )}

          {isFullscreen && (
            <button
              className={BTN_EXIT}
              title="Exit Fullscreen (Esc)"
              onClick={onToggleFullscreen}
            >
              <MdOutlineFullscreenExit size={15} />
              EXIT
            </button>
          )}

          <button
            className={BTN_GHOST}
            title="Go to"
            onClick={() => setShowGoToDate(true)}
          >
            <TbCalendarShare size={14} />
          </button>
          <ChartHeaderProfileMenu />
        </div>
      </div>

      <ListingModal
        isOpen={modalConfig.open}
        onClose={closeModal}
        title={modalConfig.title}
        initialSearch={modalConfig.initialSearch}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        selectedIndicator={selectedIndicator}
        setSelectedIndicator={setSelectedIndicator}
        toggleIndicator={toggleIndicator}
        setAlertResult={setAlertResult}
        alertResult={alertResult}
        timeframeValue={timeframeValue}
        onSelectStrategy={async (strategy) => {
          if (typeof onSelectStrategy === "function") {
            await onSelectStrategy(strategy);
          }
          closeModal();
        }}
        onSubmit={(data) => {
          if (addAlert) addAlert(data);
          closeModal();
        }}
      />

      {showGoToDate && (
        <GoToDateDialog
          onClose={() => setShowGoToDate(false)}
          onGoTo={(date) => {
            if (onGoToDate) onGoToDate(date);
          }}
        />
      )}
    </div>
  );
}
