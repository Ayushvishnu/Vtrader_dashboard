
import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";

import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Watchlist from "./Pages/Watchlist/Watchlist";
import Clients from "./Pages/Clients/Clients";
import GlobalTradeBook from "./Pages/GlobalTradeBook/GlobalTradeBook";
import GlobalPositions from "./Pages/GlobalPositions/GlobalPositions";
import AddClient from "./Pages/AddClients/AddClients";

import VittalokhiDashboard from "./Pages/VittalokhiDashboard/VittalokhiDashboard";
import ClientVsStock from "./Pages/ClientVsStock/ClientVsStock";
import Reports from "./Pages/Reports/Reports";
import RunningPnl from "./Pages/Running P&L/RunningPnl";
import LivePnl from "./Pages/LivePnl/LivePnl";
import PnlAnalysis from "./Pages/PnlAnalysis/PnlAnalysis";

import EmailBroadcast from "./Pages/EmailBroadcast/EmailBroadcast";
import PnlClientMail from "./Pages/PnlClientMail/PnlClientMail";

import Target from "./Pages/Target/Target";
import TargetReport from "./Pages/Target Report/TargetReport";

import AddUser from "./Pages/Add User/AddUser";
import AddGroup from "./Pages/AddGroup/AddGroup";
import AddStrategy from "./Pages/AddStrategy/AddStrategy";
import AddBranch from "./Pages/AddBranch/AddBranch";

import PayInPayOut from "./Pages/PayInPayOut/PayInPayOut";
import Info from "./Pages/Info/Info";

import GlobalHoldings from "./Pages/GlobalHoldings/GlobalHoldings";
import Notification from "./Pages/Notification/Notification";

// import Auth from "./Pages/Auth/Auth";
import MonthlyReport from "./Pages/Monthly Report/MonthlyReport";
import Growth from "./Pages/Growth/Growth";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import "./App.css";

/* =====================================================
   MAIN DASHBOARD LAYOUT
===================================================== */

function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="app-layout">
      {/* SIDEBAR */}

      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />

      {/* MAIN CONTENT */}

      <main
        className={`app-main-content ${
          sidebarCollapsed ? "sidebar-is-collapsed" : ""
        }`}
      >
        {/* NAVBAR */}

        <Navbar />

        {/* DASHBOARD ROUTES */}

        <Routes>
          {/* DASHBOARD */}

          <Route path="/dashboard" element={<Dashboard />} />

          {/* TRADING */}

          <Route path="/watchlist" element={<Watchlist />} />

          <Route path="/clients" element={<Clients />} />

          <Route path="/addclients" element={<AddClient />} />

          <Route path="/globaltradebook" element={<GlobalTradeBook />} />

          <Route path="/globalpositions" element={<GlobalPositions />} />

          <Route path="/globalholding" element={<GlobalHoldings />} />

          {/* VITTALOKHI DASHBOARD */}

          <Route path="/lokhidashboard" element={<VittalokhiDashboard />} />

          {/* REPORTS */}

          <Route path="/clientvsstock" element={<ClientVsStock />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/runningp&l" element={<RunningPnl />} />

          <Route path="/livep&l" element={<LivePnl />} />

          <Route path="/p&lanalysis" element={<PnlAnalysis />} />

          {/* MAIL */}

          <Route path="/broadcast" element={<EmailBroadcast />} />

          <Route path="/pnlclientmail" element={<PnlClientMail />} />

          {/* TARGET */}

          <Route path="/target" element={<Target />} />

          <Route path="/target-report" element={<TargetReport />} />

          {/* ADMIN */}

          <Route path="/add-user" element={<AddUser />} />

          <Route path="/add-group" element={<AddGroup />} />

          <Route path="/add-strategy" element={<AddStrategy />} />

          <Route path="/add-branch" element={<AddBranch />} />

          {/* PAYIN / PAYOUT */}

          <Route path="/payin-out" element={<PayInPayOut />} />

          {/* INFO */}

          <Route path="/info" element={<Info />} />

          <Route path="/notification" element={<Notification />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />

          <Route path="/monthlyreport" element={<MonthlyReport />} />
          <Route path="/growth" element={<Growth />} />



        </Routes>
      </main>
    </div>
  );
}

/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <Routes>
      {/* =================================================
          LOGIN PAGE
          NO SIDEBAR
          NO NAVBAR
      ================================================= */}
      <Route path="/" element={<Landing />} />
<Route
        path="/privacy-policy"
        element={
          <PrivacyPolicy
            key="privacy"
            initialTab="privacy"
          />
        }
      />

      <Route
        path="/terms-conditions"
        element={
          <PrivacyPolicy
            key="terms"
            initialTab="terms"
          />
        }
      />


      {/* <Route path="/login" element={<Auth />} /> */}

      {/* =================================================
          DEFAULT URL
      ================================================= */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* =================================================
          ALL APPLICATION PAGES
      ================================================= */}

      <Route path="/*" element={<MainLayout />} />
    </Routes>
  );
}

export default App;
