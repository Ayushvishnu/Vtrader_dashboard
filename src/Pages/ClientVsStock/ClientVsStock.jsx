import React, { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./ClientVsStock.css";


const clientOptions = [
  "TOTAL",
  "RM10245",
  "AN20981",
  "NJ40582",
  "FA10892",
  "AK70123",
  "SP98234",
];


const stockOptions = [
  "TOTAL",
  "RELIANCE",
  "TCS",
  "INFY",
  "HDFCBANK",
  "SBIN",
  "ICICIBANK",
  "TATAMOTORS",
  "AXISBANK",
  "SUNPHARMA",
  "MARUTI",
  "LT",
];


const stockWiseData = [
  {
    name: "RELIANCE",
    bookedProfit: 6200,
    bookedLoss: 0,
    runningProfit: 1800,
    runningLoss: 0,
  },
  {
    name: "TCS",
    bookedProfit: 4800,
    bookedLoss: 0,
    runningProfit: 0,
    runningLoss: -1200,
  },
  {
    name: "INFY",
    bookedProfit: 0,
    bookedLoss: -2200,
    runningProfit: 2700,
    runningLoss: 0,
  },
  {
    name: "HDFCBANK",
    bookedProfit: 5600,
    bookedLoss: 0,
    runningProfit: 1200,
    runningLoss: 0,
  },
  {
    name: "SBIN",
    bookedProfit: 4100,
    bookedLoss: 0,
    runningProfit: 2800,
    runningLoss: 0,
  },
  {
    name: "RELIANCE 2",
    bookedProfit: 3500,
    bookedLoss: 0,
    runningProfit: 0,
    runningLoss: -1100,
  },
  {
    name: "INFY 2",
    bookedProfit: 4600,
    bookedLoss: 0,
    runningProfit: 1900,
    runningLoss: 0,
  },
];


const clientWiseData = [
  {
    name: "RM10245",
    bookedProfit: 20500,
    bookedLoss: -2300,
    runningProfit: 8500,
    runningLoss: -1300,
  },
  {
    name: "AN20981",
    bookedProfit: 12500,
    bookedLoss: 0,
    runningProfit: 2100,
    runningLoss: -5200,
  },
  {
    name: "FA10892",
    bookedProfit: 22500,
    bookedLoss: 0,
    runningProfit: 7000,
    runningLoss: 0,
  },
  {
    name: "NJ40582",
    bookedProfit: 2400,
    bookedLoss: -7500,
    runningProfit: 8600,
    runningLoss: 0,
  },
  {
    name: "SP98234",
    bookedProfit: 14500,
    bookedLoss: 0,
    runningProfit: 5200,
    runningLoss: 0,
  },
  {
    name: "AK70123",
    bookedProfit: 10200,
    bookedLoss: 0,
    runningProfit: 0,
    runningLoss: -4200,
  },
];


function ClientVsStock() {
  const [selectedClient, setSelectedClient] =
    useState("TOTAL");

  const [selectedStock, setSelectedStock] =
    useState("TOTAL");


  const formatMoney = (value) =>
    `₹${Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;


  return (
    <div className="client-stock-page">

      {/* ================= HEADER ================= */}

      <div className="client-stock-page-header">

        <div className="client-stock-title">

          <div className="client-stock-title-icon">
<i class="fa-brands fa-stack-overflow"></i>  
        </div>

          <div>
            <h2>
              Client vs Stock P&amp;L
              <span> (Equity Based)</span>
            </h2>

            <p>
              Analyze client-wise and stock-wise profit and loss
            </p>
          </div>

        </div>


        <button
          type="button"
          className="client-stock-export-btn"
        >
          <i className="fa-solid fa-download"></i>

          Export
        </button>

      </div>


      {/* =====================================================
          STOCK-WISE P&L
      ===================================================== */}

      <section className="client-stock-card">

        <div className="client-stock-section-header">

          <div>

            <h3>
              <i className="fa-solid fa-arrow-trend-up"></i>

              Stock-wise P&amp;L for {selectedClient}
            </h3>

            <p>
              Stock performance for the selected client
            </p>

          </div>

        </div>


        <div className="row g-3">

          {/* LEFT CHART */}

          <div className="col-12 col-xl-8">

            <div className="client-stock-chart-card">

              <div className="client-stock-chart-nav">

                <button type="button">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>

                <span>
                  1 / 3
                </span>

                <button
                  type="button"
                  className="next"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>

              </div>


              <div className="client-stock-chart">

                <ResponsiveContainer
                  width="100%"
                  height={270}
                >
                  <BarChart
                    data={stockWiseData}
                    barGap={2}
                    barCategoryGap="28%"
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.06)"
                    />

                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: "#81949d",
                        fontSize: 9,
                      }}
                      axisLine={{
                        stroke:
                          "rgba(255,255,255,0.08)",
                      }}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{
                        fill: "#81949d",
                        fontSize: 9,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        background:
                          "#061923",
                        border:
                          "1px solid rgba(0,217,160,.2)",
                        borderRadius:
                          "8px",
                        fontSize:
                          "10px",
                      }}
                    />

                    <Bar
                      dataKey="bookedProfit"
                      fill="#087b69"
                      radius={[3, 3, 0, 0]}
                    />

                    <Bar
                      dataKey="bookedLoss"
                      fill="#d92626"
                      radius={[3, 3, 0, 0]}
                    />

                    <Bar
                      dataKey="runningProfit"
                      fill="#45e6b1"
                      radius={[3, 3, 0, 0]}
                    />

                    <Bar
                      dataKey="runningLoss"
                      fill="#ff7474"
                      radius={[3, 3, 0, 0]}
                    />

                  </BarChart>
                </ResponsiveContainer>

              </div>


              <ChartLegend />

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="col-12 col-xl-4">

            <div className="client-stock-side-panel">

              <label>
                Select Client
              </label>


              <select
                value={selectedClient}
                onChange={(event) =>
                  setSelectedClient(
                    event.target.value
                  )
                }
              >
                {clientOptions.map(
                  (client) => (
                    <option
                      key={client}
                      value={client}
                    >
                      {client}
                    </option>
                  )
                )}
              </select>


              <div className="client-stock-option-grid">

                {clientOptions.map(
                  (client) => (
                    <button
                      type="button"
                      key={client}
                      className={
                        selectedClient ===
                        client
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setSelectedClient(
                          client
                        )
                      }
                    >
                      {client}
                    </button>
                  )
                )}

              </div>


              <PnlSummary
                booked={73000}
                running={21100}
                total={94100}
                formatMoney={formatMoney}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CLIENT-WISE P&L
      ===================================================== */}

      <section className="client-stock-card">

        <div className="client-stock-section-header">

          <div>

            <h3>
              <i className="fa-solid fa-user"></i>

              Client-wise P&amp;L for {selectedStock}
            </h3>

            <p>
              Client performance for the selected stock
            </p>

          </div>

        </div>


        <div className="row g-3">

          {/* LEFT CHART */}

          <div className="col-12 col-xl-8">

            <div className="client-stock-chart-card">

              <div className="client-stock-chart-nav">

                <button type="button">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>

                <span>
                  1 / 1
                </span>

                <button
                  type="button"
                  className="next"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>

              </div>


              <div className="client-stock-chart">

                <ResponsiveContainer
                  width="100%"
                  height={270}
                >
                  <BarChart
                    data={clientWiseData}
                    barGap={2}
                    barCategoryGap="28%"
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.06)"
                    />

                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: "#81949d",
                        fontSize: 9,
                      }}
                      axisLine={{
                        stroke:
                          "rgba(255,255,255,0.08)",
                      }}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{
                        fill: "#81949d",
                        fontSize: 9,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        background:
                          "#061923",
                        border:
                          "1px solid rgba(0,217,160,.2)",
                        borderRadius:
                          "8px",
                        fontSize:
                          "10px",
                      }}
                    />

                    <Bar
                      dataKey="bookedProfit"
                      fill="#087b69"
                      radius={[3, 3, 0, 0]}
                    />

                    <Bar
                      dataKey="bookedLoss"
                      fill="#d92626"
                      radius={[3, 3, 0, 0]}
                    />

                    <Bar
                      dataKey="runningProfit"
                      fill="#45e6b1"
                      radius={[3, 3, 0, 0]}
                    />

                    <Bar
                      dataKey="runningLoss"
                      fill="#ff7474"
                      radius={[3, 3, 0, 0]}
                    />

                  </BarChart>
                </ResponsiveContainer>

              </div>


              <ChartLegend />

            </div>

          </div>


          {/* RIGHT */}

          <div className="col-12 col-xl-4">

            <div className="client-stock-side-panel">

              <label>
                Select Stock
              </label>


              <select
                value={selectedStock}
                onChange={(event) =>
                  setSelectedStock(
                    event.target.value
                  )
                }
              >
                {stockOptions.map(
                  (stock) => (
                    <option
                      key={stock}
                      value={stock}
                    >
                      {stock}
                    </option>
                  )
                )}
              </select>


              <div className="client-stock-option-grid stock-grid">

                {stockOptions.map(
                  (stock) => (
                    <button
                      type="button"
                      key={stock}
                      className={
                        selectedStock ===
                        stock
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setSelectedStock(
                          stock
                        )
                      }
                    >
                      {stock}
                    </button>
                  )
                )}

              </div>


              <PnlSummary
                booked={73000}
                running={21100}
                total={94100}
                formatMoney={formatMoney}
              />

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}


function ChartLegend() {
  return (
    <div className="client-stock-chart-legend">

      <LegendItem
        color="#087b69"
        text="Booked Profit"
      />

      <LegendItem
        color="#d92626"
        text="Booked Loss"
      />

      <LegendItem
        color="#45e6b1"
        text="Running Profit"
      />

      <LegendItem
        color="#ff7474"
        text="Running Loss"
      />

    </div>
  );
}


function LegendItem({
  color,
  text,
}) {
  return (
    <div className="client-stock-legend-item">

      <span
        style={{
          background: color,
        }}
      ></span>

      {text}

    </div>
  );
}


function PnlSummary({
  booked,
  running,
  total,
  formatMoney,
}) {
  return (
    <div className="client-stock-summary">

      <div>
        <span>
          Booked P&amp;L
        </span>

        <strong>
          {formatMoney(booked)}
        </strong>
      </div>


      <div>
        <span>
          Running P&amp;L
        </span>

        <strong>
          {formatMoney(running)}
        </strong>
      </div>


      <div className="total">
        <span>
          Total P&amp;L
        </span>

        <strong>
          {formatMoney(total)}
        </strong>
      </div>

    </div>
  );
}


export default ClientVsStock;