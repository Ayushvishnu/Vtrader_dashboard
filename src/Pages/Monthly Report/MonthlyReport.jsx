import React, { useEffect, useMemo, useState } from "react";

import Pagination from "../../Components/Pagination/Pagination";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Swal from "sweetalert2";

import "./MonthlyReport.css";

/* =====================================================
   DUMMY CLIENT DATA
===================================================== */

const clientOptions = [
  {
    id: "27451371234",
    name: "Muhsina",
  },
  {
    id: "RM10245",
    name: "Rahul Menon",
  },
  {
    id: "AN20981",
    name: "Arjun Nair",
  },
  {
    id: "NJ40582",
    name: "Nikhil Joseph",
  },
];

const financialYears = ["2026-2027", "2025-2026", "2024-2025"];

const monthlyData = [
  {
    id: 1,
    month: "April",
    shortMonth: "Apr",
    year: 2026,

    equityBooked: 0,
    equityRunning: 0,

    foBooked: 0,
    foRunning: 0,

    bookedTrades: [],

    runningTrades: [],
  },

  {
    id: 2,
    month: "May",
    shortMonth: "May",
    year: 2026,

    equityBooked: 0,
    equityRunning: 0,

    foBooked: 0,
    foRunning: 0,

    bookedTrades: [],

    runningTrades: [],
  },

  {
    id: 3,
    month: "June",
    shortMonth: "Jun",
    year: 2026,

    equityBooked: 0,
    equityRunning: 0,

    foBooked: 0,
    foRunning: 0,

    bookedTrades: [],

    runningTrades: [],
  },

  {
    id: 4,
    month: "July",
    shortMonth: "Jul",
    year: 2026,

    equityBooked: 0,
    equityRunning: 0,

    foBooked: 0,
    foRunning: 0,

    bookedTrades: [],

    runningTrades: [],
  },

  {
    id: 5,
    month: "August",
    shortMonth: "Aug",
    year: 2026,

    equityBooked: 0,
    equityRunning: 0,

    foBooked: 0,
    foRunning: 0,

    bookedTrades: [],

    runningTrades: [],
  },

  {
    id: 6,
    month: "September",
    shortMonth: "Sep",
    year: 2026,

    equityBooked: 750,
    equityRunning: -1030,

    foBooked: 7800,
    foRunning: 0,

    bookedTrades: [
      {
        id: 1,
        segment: "Equity",
        stock: "RELIANCE-EQ",
        pnl: 750,
        entryPrice: 1450,
        exitPrice: 1480,
        entryDate: "05-09-2026",
        exitDate: "12-09-2026",
      },

      {
        id: 2,
        segment: "F&O",
        stock: "NIFTY26SEP25000CE",
        pnl: 7800,
        entryPrice: 172,
        exitPrice: 292,
        entryDate: "15-09-2026",
        exitDate: "18-09-2026",
      },
    ],

    runningTrades: [
      {
        id: 1,
        segment: "Equity",
        stock: "TCS-EQ",
        pnl: -1030,
        entryPrice: 3285,
        ltp: 3182,
        entryDate: "20-09-2026",
      },
    ],
  },
];

/* =====================================================
   MONEY FORMAT
===================================================== */

const formatMoney = (value) => {
  const numericValue = Number(value) || 0;

  const sign = numericValue < 0 ? "-" : "";

  return `${sign}₹${Math.abs(numericValue).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

function MonthlyReport() {
  /* =====================================================
     FILTER
  ===================================================== */

  const [financialYear, setFinancialYear] = useState("");

  const [selectedClient, setSelectedClient] = useState("");

  const [appliedYear, setAppliedYear] = useState("2026-2027");

  const [appliedClient, setAppliedClient] = useState(clientOptions[0]);

  /* =====================================================
     VIEW MODE
  ===================================================== */

  const [viewMode, setViewMode] = useState("table");

  /* =====================================================
     MONTH DETAILS
  ===================================================== */

  const [expandedMonth, setExpandedMonth] = useState(null);

  /* =====================================================
     SEND MODAL
  ===================================================== */

  const [sendMonth, setSendMonth] = useState(null);

  const [reportType, setReportType] = useState("short");

  /* =====================================================
     PAGINATION
  ===================================================== */

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

const totalPages = Math.ceil(
  monthlyData.length /
    itemsPerPage
);

useEffect(() => {
  if (
    totalPages > 0 &&
    currentPage > totalPages
  ) {
    setCurrentPage(totalPages);
  }

  if (totalPages === 0) {
    setCurrentPage(1);
  }
}, [
  totalPages,
  currentPage,
]);




  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedMonths = monthlyData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /* =====================================================
     APPLY FILTER
  ===================================================== */

  const handleApply = () => {
    if (!financialYear || !selectedClient) {
      Swal.fire({
        icon: "warning",

        title: "Select Filters",

        text: "Please select financial year and client.",

        background: "#061923",

        color: "#ffffff",

        confirmButtonColor: "#00b985",
      });

      return;
    }

    const client = clientOptions.find((item) => item.id === selectedClient);

    setAppliedYear(financialYear);

    setAppliedClient(client);

    setCurrentPage(1);

    setExpandedMonth(null);

    Swal.fire({
      icon: "success",

      title: "Report Loaded",

      text: `${client.name}'s ${financialYear} report loaded.`,

      toast: true,

      position: "top-end",

      timer: 1700,

      showConfirmButton: false,

      background: "#061923",

      color: "#ffffff",
    });
  };

  /* =====================================================
     SEND
  ===================================================== */

  const openSendModal = (month) => {
    setSendMonth(month);

    setReportType("short");
  };

  const handleSendReport = () => {
    Swal.fire({
      icon: "success",

      title: "Report Sent",

      text: `${
        reportType === "short" ? "Short" : "Detailed"
      } report for ${sendMonth.month} ${sendMonth.year} sent successfully.`,

      toast: true,

      position: "top-end",

      timer: 2000,

      showConfirmButton: false,

      background: "#061923",

      color: "#ffffff",
    });

    setSendMonth(null);
  };

  /* =====================================================
     DETAILS
  ===================================================== */

  const handleToggleDetails = (monthId) => {
    setExpandedMonth((current) => (current === monthId ? null : monthId));
  };

  /* =====================================================
     GRAPH
  ===================================================== */

  const graphData = useMemo(() => {
    return monthlyData.map((month) => ({
      month: month.shortMonth,

      equity: month.equityBooked + month.equityRunning,

      fo: month.foBooked + month.foRunning,

      equityBooked: month.equityBooked,

      equityRunning: month.equityRunning,

      foBooked: month.foBooked,

      foRunning: month.foRunning,

      total:
        month.equityBooked +
        month.equityRunning +
        month.foBooked +
        month.foRunning,
    }));
  }, []);

  return (
    <div className="monthly-report-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="monthly-report-heading">
        <div className="monthly-report-heading-icon">
          <i className="fa-regular fa-calendar-days"></i>
        </div>

        <div>
          <h2>Client Monthly Report</h2>

          <p>View monthly client P&amp;L details and send reports</p>
        </div>
      </div>

      {/* =================================================
          FILTER
      ================================================= */}

      <section className="monthly-report-filter-card">
        <div className="row g-3 align-items-end">
          {/* YEAR */}

          <div className="col-12 col-lg-4">
            <div className="monthly-report-field">
              <label>Financial Year</label>

              <select
                value={financialYear}
                onChange={(event) => setFinancialYear(event.target.value)}
              >
                <option value="">Select Financial Year</option>

                {financialYears.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CLIENT */}

          <div className="col-12 col-lg-4">
            <div className="monthly-report-field">
              <label>Client</label>

              <select
                value={selectedClient}
                onChange={(event) => setSelectedClient(event.target.value)}
              >
                <option value="">Search client</option>

                {clientOptions.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.id} - {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* APPLY */}

          <div className="col-12 col-lg-4">
            <button
              type="button"
              className="monthly-report-apply-btn"
              disabled={!financialYear || !selectedClient}
              onClick={handleApply}
            >
              <i className="fa-solid fa-filter"></i>
              Apply
            </button>
          </div>
        </div>
      </section>

      {/* =================================================
          REPORT CARD
      ================================================= */}

      <section className="monthly-report-card">
        {/* HEADER */}

        <div className="monthly-report-card-header">
          <div>
            <h3>
              Monthly P&amp;L Report of {appliedClient.name} ({appliedClient.id}
              )
            </h3>

            <p>FY {appliedYear} · Client</p>
          </div>

          {/* VIEW SWITCH */}

          <div className="monthly-report-view-switch">
            <button
              type="button"
              className={viewMode === "table" ? "active" : ""}
              onClick={() => setViewMode("table")}
            >
              <i className="fa-solid fa-table-cells"></i>
              Table
            </button>

            <button
              type="button"
              className={viewMode === "graph" ? "active" : ""}
              onClick={() => setViewMode("graph")}
            >
              <i className="fa-solid fa-chart-column"></i>
              Graph
            </button>
          </div>
        </div>

        {/* =================================================
            TABLE VIEW
        ================================================= */}

        {viewMode === "table" && (
          <>
            <div className="monthly-report-table-wrap">
              <table className="monthly-report-table">
                <thead>
                  <tr>
                    <th>Month</th>

                    <th>Equity Booked</th>

                    <th>Equity Running</th>

                    <th>F&amp;O Booked</th>

                    <th>F&amp;O Running</th>

                    <th>Total P&amp;L</th>

                    <th>Send</th>

                    <th>Details</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedMonths.map((month) => {
                    const totalPnl =
                      month.equityBooked +
                      month.equityRunning +
                      month.foBooked +
                      month.foRunning;

                    const opened = expandedMonth === month.id;

                    return (
                      <React.Fragment key={month.id}>
                        {/* MONTH ROW */}

                        <tr
                          className={
                            opened
                              ? "monthly-report-main-row expanded"
                              : "monthly-report-main-row"
                          }
                        >
                          <td>
                            <div className="monthly-report-month">
                              <strong>{month.month}</strong>

                              <span>{month.year}</span>
                            </div>
                          </td>

                          <PnlCell value={month.equityBooked} />

                          <PnlCell value={month.equityRunning} />

                          <PnlCell value={month.foBooked} />

                          <PnlCell value={month.foRunning} />

                          <td>
                            <span
                              className={`monthly-report-total ${
                                totalPnl < 0 ? "loss" : ""
                              }`}
                            >
                              {formatMoney(totalPnl)}
                            </span>
                          </td>

                          {/* SEND */}

                          <td>
                            <button
                              type="button"
                              className="monthly-report-send-btn"
                              onClick={() => openSendModal(month)}
                            >
                              <i className="fa-regular fa-paper-plane"></i>
                              Send
                            </button>
                          </td>

                          {/* DETAILS */}

                          <td>
                            <button
                              type="button"
                              className={`monthly-report-details-btn ${
                                opened ? "active" : ""
                              }`}
                              onClick={() => handleToggleDetails(month.id)}
                            >
                              <i
                                className={
                                  opened
                                    ? "fa-solid fa-chevron-up"
                                    : "fa-solid fa-chevron-down"
                                }
                              ></i>
                            </button>
                          </td>
                        </tr>

                        {/* =====================================
                              EXPANDED DETAILS
                          ===================================== */}

                        {opened && (
                          <tr className="monthly-report-expanded-row">
                            <td colSpan="8">
                              <MonthDetails month={month} />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}

         <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(page) => {
    setCurrentPage(page);
    setExpandedMonth(null);
  }}
/>
          </>
        )}

        {/* =================================================
            GRAPH VIEW
        ================================================= */}

        {viewMode === "graph" && (
          <div className="monthly-report-graph-section">
            <div className="monthly-report-graph-heading">
              <h4>Financial Year P&amp;L</h4>

              <p>Equity and F&amp;O month-wise performance</p>
            </div>

            <div className="monthly-report-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={graphData}
                  margin={{
                    top: 25,
                    right: 30,
                    left: 15,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="rgba(130,180,185,.12)"
                  />

                  <XAxis
                    dataKey="month"
                    tick={{
                      fill: "#789099",
                      fontSize: 10,
                    }}
                    axisLine={{
                      stroke: "rgba(130,180,185,.22)",
                    }}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "#789099",
                      fontSize: 9,
                    }}
                    axisLine={{
                      stroke: "rgba(130,180,185,.22)",
                    }}
                    tickLine={false}
                    tickFormatter={(value) => {
                      if (Math.abs(value) >= 1000) {
                        return `₹${(value / 1000).toFixed(1)}K`;
                      }

                      return `₹${value}`;
                    }}
                  />

                  <ReferenceLine y={0} stroke="rgba(190,210,214,.35)" />

                  <Tooltip
                    content={<MonthlyGraphTooltip />}
                    cursor={{
                      fill: "rgba(0,217,160,.035)",
                    }}
                  />

                  <Legend
                    wrapperStyle={{
                      fontSize: "10px",
                      color: "#8ba0a7",
                    }}
                  />

                  <Bar
                    dataKey="equity"
                    name="Equity"
                    fill="#00a779"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={34}
                  />

                  <Bar
                    dataKey="fo"
                    name="F&O"
                    fill="#4ea7ca"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={34}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </section>

      {/* =================================================
          SEND MODAL
      ================================================= */}

      {sendMonth && (
        <div
          className="monthly-report-modal-overlay"
          onClick={() => setSendMonth(null)}
        >
          <div
            className="monthly-report-send-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {/* HEADER */}

            <div className="monthly-report-modal-header">
              <div className="monthly-report-modal-title">
                <div className="monthly-report-modal-icon">
                  <i className="fa-regular fa-paper-plane"></i>
                </div>

                <div>
                  <h3>Send Monthly Report</h3>

                  <p>Choose the report format before sending.</p>
                </div>
              </div>

              <button type="button" onClick={() => setSendMonth(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* BODY */}

            <div className="monthly-report-modal-body">
              <div className="monthly-report-selected-month">
                <span>Report</span>

                <strong>
                  {sendMonth.month} {sendMonth.year}
                </strong>
              </div>

              <h4>Select Report Type</h4>

              {/* SHORT */}

              <button
                type="button"
                className={`monthly-report-type-card ${
                  reportType === "short" ? "active" : ""
                }`}
                onClick={() => setReportType("short")}
              >
                <span className="monthly-report-radio"></span>

                <div className="monthly-report-type-icon">
                  <i className="fa-solid fa-chart-pie"></i>
                </div>

                <div>
                  <strong>Short Report</strong>

                  <p>Send the month-wise P&amp;L summary only.</p>
                </div>
              </button>

              {/* DETAILED */}

              <button
                type="button"
                className={`monthly-report-type-card ${
                  reportType === "detailed" ? "active" : ""
                }`}
                onClick={() => setReportType("detailed")}
              >
                <span className="monthly-report-radio"></span>

                <div className="monthly-report-type-icon">
                  <i className="fa-solid fa-list-check"></i>
                </div>

                <div>
                  <strong>Detailed Report</strong>

                  <p>Send booked and running trade details with the summary.</p>
                </div>
              </button>
            </div>

            {/* FOOTER */}

            <div className="monthly-report-modal-footer">
              <button
                type="button"
                className="monthly-report-modal-cancel"
                onClick={() => setSendMonth(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="monthly-report-modal-send"
                onClick={handleSendReport}
              >
                <i className="fa-regular fa-paper-plane"></i>
                Send Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =====================================================
   PNL CELL
===================================================== */

function PnlCell({ value }) {
  return (
    <td>
      <span className={`monthly-report-pnl ${value < 0 ? "loss" : ""}`}>
        {formatMoney(value)}
      </span>
    </td>
  );
}

/* =====================================================
   MONTH DETAILS
===================================================== */

function MonthDetails({ month }) {
  return (
    <div className="monthly-report-details-panel">
      {/* HEADER */}

      <div className="monthly-report-details-heading">
        <h4>
          {month.month} {month.year}
        </h4>

        <p>Detailed booked and running P&amp;L report</p>
      </div>

      {/* =================================================
          BOOKED
      ================================================= */}

      <div className="monthly-report-trade-section">
        <h5>Booked P&amp;L</h5>

        <div className="monthly-report-detail-table-wrap">
          <table className="monthly-report-detail-table">
            <thead>
              <tr>
                <th>Segment</th>

                <th>Stock</th>

                <th>P&amp;L</th>

                <th>Entry Price</th>

                <th>Exit Price</th>

                <th>Entry Date</th>

                <th>Exit Date</th>
              </tr>
            </thead>

            <tbody>
              {month.bookedTrades.length > 0 ? (
                month.bookedTrades.map((trade) => (
                  <tr key={trade.id}>
                    <td>
                      <span className="monthly-report-segment-badge">
                        {trade.segment}
                      </span>
                    </td>

                    <td className="monthly-report-stock-name">{trade.stock}</td>

                    <td>
                      <span
                        className={
                          trade.pnl < 0
                            ? "monthly-report-detail-loss"
                            : "monthly-report-detail-profit"
                        }
                      >
                        {formatMoney(trade.pnl)}
                      </span>
                    </td>

                    <td>{formatMoney(trade.entryPrice)}</td>

                    <td>{formatMoney(trade.exitPrice)}</td>

                    <td>{trade.entryDate}</td>

                    <td>{trade.exitDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="monthly-report-no-trades">
                    No booked trades
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================
          RUNNING
      ================================================= */}

      <div className="monthly-report-trade-section">
        <h5>Running P&amp;L</h5>

        <div className="monthly-report-detail-table-wrap">
          <table className="monthly-report-detail-table">
            <thead>
              <tr>
                <th>Segment</th>

                <th>Stock</th>

                <th>P&amp;L</th>

                <th>Entry Price</th>

                <th>LTP</th>

                <th>Entry Date</th>
              </tr>
            </thead>

            <tbody>
              {month.runningTrades.length > 0 ? (
                month.runningTrades.map((trade) => (
                  <tr key={trade.id}>
                    <td>
                      <span className="monthly-report-segment-badge">
                        {trade.segment}
                      </span>
                    </td>

                    <td className="monthly-report-stock-name">{trade.stock}</td>

                    <td>
                      <span
                        className={
                          trade.pnl < 0
                            ? "monthly-report-detail-loss"
                            : "monthly-report-detail-profit"
                        }
                      >
                        {formatMoney(trade.pnl)}
                      </span>
                    </td>

                    <td>{formatMoney(trade.entryPrice)}</td>

                    <td>{formatMoney(trade.ltp)}</td>

                    <td>{trade.entryDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="monthly-report-no-trades">
                    No running trades
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   CUSTOM GRAPH TOOLTIP
===================================================== */

function MonthlyGraphTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0]?.payload;

  if (!data) {
    return null;
  }

  return (
    <div className="monthly-report-chart-tooltip">
      <h4>{label} 2026</h4>

      {/* EQUITY */}

      <div className="monthly-report-tooltip-section">
        <strong className="equity">Equity</strong>

        <TooltipRow label="Booked" value={data.equityBooked} />

        <TooltipRow label="Running" value={data.equityRunning} />
      </div>

      {/* F&O */}

      <div className="monthly-report-tooltip-section">
        <strong className="fo">F&amp;O</strong>

        <TooltipRow label="Booked" value={data.foBooked} />

        <TooltipRow label="Running" value={data.foRunning} />
      </div>

      <div className="monthly-report-tooltip-total">
        <span>Total P&amp;L</span>

        <strong>{formatMoney(data.total)}</strong>
      </div>
    </div>
  );
}

function TooltipRow({ label, value }) {
  return (
    <div className="monthly-report-tooltip-row">
      <span>{label}</span>

      <b className={value < 0 ? "loss" : ""}>{formatMoney(value)}</b>
    </div>
  );
}

export default MonthlyReport;
