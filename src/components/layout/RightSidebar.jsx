import React from "react";
import { FiList, FiBriefcase, FiAlignLeft, FiLayers, FiMoreVertical, FiActivity } from "react-icons/fi";
import { BsLink45Deg } from "react-icons/bs";

const RightSidebar = ({ 
  isSidePanelOpen,
  isWatchlistOpen, 
  toggleWatchlist, 
  isDetailsOpen, 
  toggleDetails, 
  isAlertsOpen, 
  toggleAlerts,
  isDepthOpen,
  toggleDepth,
  isObjectTreeOpen,
  toggleObjectTree
}) => {
  const menuItems = [
    { id: 'watchlist', icon: <FiList size={20} />, label: "Watchlist", active: isWatchlistOpen },
    { id: 'objectTree', icon: <FiLayers size={20} />, label: "Object tree and data window", active: isObjectTreeOpen },
    { id: 'depth', icon: <FiActivity size={20} />, label: "Results", active: isDepthOpen },
    { id: 'details', icon: <FiAlignLeft size={20} />, label: "Scanner", active: isDetailsOpen },
    // { id: 'options', icon: <BsLink45Deg size={18} />, label: "Option\nChain" },
    // { id: 'more', icon: <FiMoreVertical size={20} />, label: "More" },
  ];

  return (
    <div
      className={`relative z-dropdown flex h-full w-14 shrink-0 flex-col items-center gap-1.5 bg-panel py-2 select-none overflow-hidden ${
        (isSidePanelOpen ?? isWatchlistOpen) ? "rounded-tl-none" : "rounded-tl-[10px]"
      }`}
    >
      {menuItems.map((item, idx) => (
        <button
          type="button"
          key={idx}
          id={`sidebar-${item.id}`}
          data-testid={`sidebar-${item.id}`}
          className={`flex h-[38px] w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-sm! border-0 p-0 transition-colors duration-150 ${
            item.active
              ? "bg-surface-3 text-fg rounded-sm!"
              : "bg-transparent text-fg-muted hover:bg-surface-3 hover:text-fg rounded-sm!"
          }`}
          title={item.label}
          onClick={() => {
            if (item.id === 'options') {
              window.open('/optionchain', '_blank');
            } else if (item.id === 'watchlist' && toggleWatchlist) {
              toggleWatchlist();
            } else if (item.id === 'objectTree' && toggleObjectTree) {
              toggleObjectTree();
            } else if (item.id === 'details' && toggleDetails) {
              toggleDetails();
            } else if (item.id === 'alerts' && toggleAlerts) {
              toggleAlerts();
            } else if (item.id === 'depth' && toggleDepth) {
              toggleDepth();
            }
          }}
        >
          {item.icon}
          {/* <span style={{ textAlign: "center", whiteSpace: "pre-line" }}>{item.label}</span> */}
        </button>
      ))}
    </div>
  );
};

export default RightSidebar;
