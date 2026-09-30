import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import "./MainLayout.css";

function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(
      (currentValue) => !currentValue
    );
  };

  return (
    <div className="main-layout">
      <Navbar
        onMenuClick={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />

      <div className="main-layout-body">
        <Sidebar
          collapsed={sidebarCollapsed}
          onMenuClick={toggleSidebar}
        />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;