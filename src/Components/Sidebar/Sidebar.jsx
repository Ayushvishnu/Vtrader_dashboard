import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const sidebarGroups = [
  {
    id: "trading",
    icon: "fa-solid fa-chart-line",

    items: [
      // {
      //   name: "Dashboard",
      //   path: "/dashboard",
      //   icon: "fa-solid fa-table-cells-large",
      // },
      {
        name: "Watchlist",
        path: "/watchlist",
        icon: "fa-regular fa-bookmark",
      },
      {
        name: "Clients",
        path: "/clients",
        icon: "fa-solid fa-users",
      },
      {
        name: "Global TradeBook",
        path: "/globaltradebook",
        icon: "fa-solid fa-arrow-trend-up",
      },
      {
        name: "Global Positions",
        path: "/globalpositions",
        icon: "fa-solid fa-earth-europe",
      },
      {
        name: "Global Holdings",
        path: "/globalholding",
        icon: "fa-solid fa-bookmark",
      },
      {
        name: "Notification",
        path: "/notification",
        icon: "fa-regular fa-bell",
      },
    ],
  },

  {
    id: "reports",
    icon: "fa-solid fa-layer-group",

    items: [
      {
        name: "Trader Dashboard",
        path: "/lokhidashboard",
        icon: "fa-solid fa-house fa-float",
      },

      {
        name: "Client vs Stock",
        path: "/clientvsstock",
        icon: "fa-brands fa-stack-overflow",
      },
      {
        name: "Reports",
        path: "/reports",
        icon: "fa-solid fa-file-lines",
      },

      {
        name: "Running P&L",
        path: "/runningp&l",
        icon: "fa-solid fa-chart-column",
      },

      {
        name: "Live P&L",
        path: "/livep&l",
        icon: "fa-solid fa-chart-line",
      },
      {
        name: " P&L Analysis",
        path: "/p&lanalysis",
        icon: "fa-solid fa-cubes-stacked",
      },

      {
        name: " Monthly Report",
        path: "/monthlyreport",
        icon: "fa-regular fa-calendar-days",
      },
    ],
  },

  {
    id: "messages",
    icon: "fa-solid fa-message",

    items: [
      {
        name: "Email Broadcast",
        path: "/broadcast",
        icon: "fa-solid fa-envelope",
      },
      {
        name: "Commission Mail",
        path: "/pnlclientmail",
        icon: "fa-solid fa-envelope-open-text",
      },
    ],
  },

  {
    id: "targets",
    icon: "fa-solid fa-bullseye",

    items: [
      {
        name: "Target",
        path: "/target",
        icon: "fa-solid fa-bullseye",
      },
      {
        name: "Target Report",
        path: "/target-report",
        icon: "fa-solid fa-users-viewfinder",
      },
      {
        name: "Growth",
        path: "/growth",
        icon: "fa-solid fa-seedling",
      },
    ],
  },

  {
    id: "Accounts",
    icon: "fa-solid fa-user-tag",
    items: [
      {
        name: "Add User",
        path: "/add-user",
        icon: "fa-solid fa-user-plus",
      },
      {
        name: "Add Group",
        path: "/add-group",
        icon: "fa-solid fa-user-group",
      },
      {
        name: "Add Strategy",
        path: "/add-strategy",
        icon: "fa-solid fa-plus",
      },
      {
        name: "Add Branch",
        path: "/add-branch",
        icon: "fa-solid fa-code-branch",
      },
      {
        name: "PayIn-PayOut",
        path: "/payin-out",
        icon: "fa-solid fa-wallet",
      },
     
    ],
  },
  {
    id:"Settings",
    icon:"fa-solid fa-gear",
    items:[
      {
        name:"Info",
        path:"/info",
        icon:"fa-solid fa-circle-question",
      }
    ]
  }
];

function Sidebar({ collapsed, onToggle }) {
  const [activeGroup, setActiveGroup] = useState("trading");

  const selectedGroup =
    sidebarGroups.find((group) => group.id === activeGroup) || sidebarGroups[0];

  const handleGroupClick = (groupId) => {
    setActiveGroup(groupId);

    if (collapsed) {
      onToggle();
    }
  };

  return (
    <aside
      className={`vitta-sidebar ${collapsed ? "vitta-sidebar-collapsed" : ""}`}
    >
      {/* ================= LOGO ================= */}

      <div className="vitta-sidebar-logo">
        <img src="/images/Logo.png" alt="Vitta Partner" />
      </div>

      {/* ================= SIDEBAR CONTENT ================= */}

  <div className="vitta-sidebar-content">

  {/* LEFT ICON RAIL */}
  <div className="sidebar-icon-rail">

    <button
      type="button"
      className="sidebar-collapse-btn"
      onClick={onToggle}
      title={
        collapsed
          ? "Expand Sidebar"
          : "Collapse Sidebar"
      }
    >
      <i className="fa-solid fa-bars"></i>
    </button>

    {sidebarGroups.map((group) => (
      <button
        key={group.id}
        type="button"
        title={group.id}
        className={`sidebar-icon-btn ${
          activeGroup === group.id
            ? "active"
            : ""
        }`}
        onClick={() =>
          handleGroupClick(group.id)
        }
      >
        <i className={group.icon}></i>
      </button>
    ))}

  </div>


  {/* RIGHT MENU */}
  {!collapsed && (
    <div className="sidebar-menu">

      <nav className="sidebar-menu-list">
        {selectedGroup.items.map(
          (item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({
                isActive,
              }) =>
                `sidebar-menu-item ${
                  isActive
                    ? "active"
                    : ""
                }`
              }
            >
              <i className={item.icon}></i>

              <span>
                {item.name}
              </span>
            </NavLink>
          )
        )}
      </nav>

    </div>
  )}


  {/* DASHBOARD REPORT */}
  <div className="sidebar-dashboard-report">

    {!collapsed && (
      <div className="sidebar-report-video">
        <img
          src="/images/pgrap2.jpg"
          alt="Dashboard graph"
        />
      </div>
    )}

    <NavLink
      to="/dashboard"
      className="sidebar-report-btn"
      title="Dashboard Report"
    >
      <i className="fa-solid fa-chart-line sidebar-report-main-icon"></i>

      {!collapsed && (
        <>
          <span>
            Dashboard Report
          </span>

          <i className="fa-solid fa-arrow-right"></i>
        </>
      )}
    </NavLink>

  </div>

</div>
    </aside>
  );
}

export default Sidebar;
