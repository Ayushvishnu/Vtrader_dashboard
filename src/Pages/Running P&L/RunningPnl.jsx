import React, { useMemo, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import "./RunningPnl.css";


const clientData = [
  {
    code: "RM10245",
    name: "Rahul Menon",

    bookedPnl: 18500,
    runningPnl: 6250,

    aum: 575000,
  },

  {
    code: "AN20981",
    name: "Arjun Nair",

    bookedPnl: 11200,
    runningPnl: 3800,

    aum: 425000,
  },

  {
    code: "NJ40582",
    name: "Nikhil Joseph",

    bookedPnl: -6800,
    runningPnl: 4200,

    aum: 510000,
  },

  {
    code: "FA10892",
    name: "Faisal Ahmed",

    bookedPnl: 21800,
    runningPnl: 7400,

    aum: 720000,
  },

  {
    code: "AK70123",
    name: "Adithya Krishnan",

    bookedPnl: 15750,
    runningPnl: 5650,

    aum: 650000,
  },

  {
    code: "SP98234",
    name: "Sneha Pillai",

    bookedPnl: 14200,
    runningPnl: 5100,

    aum: 590000,
  },
];


function RunningPnl() {
  const [selectedPnlClient, setSelectedPnlClient] =
    useState("SP98234");

  const [selectedAumClient, setSelectedAumClient] =
    useState("AK70123");


  /* =====================================================
     SELECTED CLIENTS
  ===================================================== */

  const pnlClient = useMemo(
    () =>
      clientData.find(
        (client) =>
          client.code ===
          selectedPnlClient
      ) || clientData[0],
    [selectedPnlClient]
  );


  const aumClient = useMemo(
    () =>
      clientData.find(
        (client) =>
          client.code ===
          selectedAumClient
      ) || clientData[0],
    [selectedAumClient]
  );


  /* =====================================================
     GRAPH DATA
  ===================================================== */

  const pnlChartData = [
    {
      client: pnlClient.code,

      bookedPnl:
        pnlClient.bookedPnl,

      runningPnl:
        pnlClient.runningPnl,
    },
  ];


  const aumChartData = [
    {
      client: aumClient.code,

      aum:
        aumClient.aum,
    },
  ];


  /* =====================================================
     FORMAT
  ===================================================== */

  const formatMoney = (value) =>
    `₹${Number(value).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;


  return (
    <div className="running-pnl-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="running-pnl-heading">

        <div className="running-pnl-heading-icon">

          <i className="fa-solid fa-chart-column"></i>

        </div>


        <div>

          <h2>
            Running P&amp;L
          </h2>

          <p>
            Monitor booked P&amp;L,
            running P&amp;L and client AUM
          </p>

        </div>

      </div>


      {/* =====================================================
          OVERALL P&L
      ===================================================== */}

      <section className="running-pnl-card">

        {/* HEADER */}

        <div className="running-pnl-card-header">

          <div>

            <h3>
              Overall P&amp;L
            </h3>

            <p>
              Booked and running P&amp;L comparison
            </p>

          </div>

        </div>


        <div className="row g-3 running-pnl-card-body">

          {/* ================= GRAPH ================= */}

          <div className="col-12 col-xl-7">

            <div className="running-pnl-chart-box">

              <ResponsiveContainer
                width="100%"
                height={285}
              >

                <BarChart
                  data={pnlChartData}
                  barCategoryGap="55%"
                  barGap={5}
                >

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="rgba(255,255,255,.07)"
                  />


                  <XAxis
                    dataKey="client"
                    tick={{
                      fill: "#8599a2",
                      fontSize: 10,
                    }}
                    tickLine={false}
                    axisLine={{
                      stroke:
                        "rgba(255,255,255,.09)",
                    }}
                  />


                  <YAxis
                    tick={{
                      fill: "#748b95",
                      fontSize: 9,
                    }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      `${value / 1000}K`
                    }
                  />


                  <Tooltip
                    cursor={{
                      fill:
                        "rgba(0,217,160,.025)",
                    }}
                    contentStyle={{
                      background:
                        "#061923",
                      border:
                        "1px solid rgba(0,217,160,.2)",
                      borderRadius:
                        "8px",
                      color:
                        "#ffffff",
                      fontSize:
                        "10px",
                    }}
                    formatter={(
                      value
                    ) =>
                      formatMoney(
                        value
                      )
                    }
                  />


                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    iconSize={7}
                    wrapperStyle={{
                      color:
                        "#8fa1a9",
                      fontSize:
                        "9px",
                      paddingBottom:
                        "15px",
                    }}
                  />


                  <Bar
                    dataKey="bookedPnl"
                    name="Booked P&L"
                    fill="#07816f"
                    maxBarSize={34}
                    radius={[
                      4,
                      4,
                      0,
                      0,
                    ]}
                  />


                  <Bar
                    dataKey="runningPnl"
                    name="Running P&L"
                    fill="#43e4af"
                    maxBarSize={34}
                    radius={[
                      4,
                      4,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* ================= CLIENT SELECT ================= */}

          <div className="col-12 col-xl-5">

            <div className="running-pnl-client-panel">

              <label>
                Select Client
              </label>


              {/* SELECT */}

              <select
                value={
                  selectedPnlClient
                }
                onChange={(event) =>
                  setSelectedPnlClient(
                    event.target.value
                  )
                }
              >

                {clientData.map(
                  (client) => (

                    <option
                      key={
                        client.code
                      }
                      value={
                        client.code
                      }
                    >
                      {client.code} -{" "}
                      {client.name}
                    </option>

                  )
                )}

              </select>


              {/* CLIENT BUTTONS */}

              <div className="running-pnl-client-grid">

                {clientData.map(
                  (client) => (

                    <button
                      type="button"
                      key={
                        client.code
                      }
                      className={
                        selectedPnlClient ===
                        client.code
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setSelectedPnlClient(
                          client.code
                        )
                      }
                    >
                      {client.code}
                    </button>

                  )
                )}

              </div>


              {/* SUMMARY */}

              <div className="running-pnl-summary">

                <div>

                  <span>
                    Booked P&amp;L
                  </span>

                  <strong
                    className={
                      pnlClient.bookedPnl >=
                      0
                        ? "positive"
                        : "negative"
                    }
                  >
                    {formatMoney(
                      pnlClient.bookedPnl
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    Running P&amp;L
                  </span>

                  <strong
                    className={
                      pnlClient.runningPnl >=
                      0
                        ? "positive"
                        : "negative"
                    }
                  >
                    {formatMoney(
                      pnlClient.runningPnl
                    )}
                  </strong>

                </div>


                <div className="total">

                  <span>
                    Total P&amp;L
                  </span>

                  <strong
                    className={
                      pnlClient.bookedPnl +
                        pnlClient.runningPnl >=
                      0
                        ? "positive"
                        : "negative"
                    }
                  >
                    {formatMoney(
                      pnlClient.bookedPnl +
                        pnlClient.runningPnl
                    )}
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          AUM BY CLIENT
      ===================================================== */}

      <section className="running-pnl-card">

        {/* HEADER */}

        <div className="running-pnl-card-header">

          <div>

            <h3>
              AUM by Client
            </h3>

            <p>
              Hold value for each client
            </p>

          </div>

        </div>


        <div className="row g-3 running-pnl-card-body">

          {/* ================= AUM GRAPH ================= */}

          <div className="col-12 col-xl-7">

            <div className="running-pnl-chart-box">

              <ResponsiveContainer
                width="100%"
                height={285}
              >

                <BarChart
                  data={
                    aumChartData
                  }
                  barCategoryGap="53%"
                >

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="rgba(255,255,255,.07)"
                  />


                  <XAxis
                    dataKey="client"
                    tick={{
                      fill: "#8599a2",
                      fontSize: 10,
                    }}
                    tickLine={false}
                    axisLine={{
                      stroke:
                        "rgba(255,255,255,.09)",
                    }}
                  />


                  <YAxis
                    tick={{
                      fill: "#748b95",
                      fontSize: 9,
                    }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      `${Math.round(
                        value / 1000
                      )}K`
                    }
                  />


                  <Tooltip
                    cursor={{
                      fill:
                        "rgba(0,217,160,.025)",
                    }}
                    contentStyle={{
                      background:
                        "#061923",
                      border:
                        "1px solid rgba(0,217,160,.2)",
                      borderRadius:
                        "8px",
                      color:
                        "#ffffff",
                      fontSize:
                        "10px",
                    }}
                    formatter={(
                      value
                    ) =>
                      formatMoney(
                        value
                      )
                    }
                  />


                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    iconSize={7}
                    wrapperStyle={{
                      color:
                        "#8fa1a9",
                      fontSize:
                        "9px",
                      paddingBottom:
                        "15px",
                    }}
                  />


                  <Bar
                    dataKey="aum"
                    name="Hold Value (AUM)"
                    fill="#137763"
                    maxBarSize={38}
                    radius={[
                      4,
                      4,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* ================= AUM CLIENT ================= */}

          <div className="col-12 col-xl-5">

            <div className="running-pnl-client-panel">

              <label>
                Select Client
              </label>


              <select
                value={
                  selectedAumClient
                }
                onChange={(event) =>
                  setSelectedAumClient(
                    event.target.value
                  )
                }
              >

                {clientData.map(
                  (client) => (

                    <option
                      key={
                        client.code
                      }
                      value={
                        client.code
                      }
                    >
                      {client.code} -{" "}
                      {client.name}
                    </option>

                  )
                )}

              </select>


              <div className="running-pnl-client-grid">

                {clientData.map(
                  (client) => (

                    <button
                      type="button"
                      key={
                        client.code
                      }
                      className={
                        selectedAumClient ===
                        client.code
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setSelectedAumClient(
                          client.code
                        )
                      }
                    >
                      {client.code}
                    </button>

                  )
                )}

              </div>


              <div className="running-pnl-summary aum-summary">

                <div>

                  <span>
                    Hold Value (AUM)
                  </span>

                  <strong className="positive">
                    {formatMoney(
                      aumClient.aum
                    )}
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default RunningPnl;