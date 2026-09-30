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

import "./PnlAnalysis.css";


const analysisData = {
  group: {
    VITTA_CRI: {
      booked: 72350,
      running: 18420,

      chart: [
        {
          stock: "RELIANCE",
          bookedProfit: 6100,
          bookedLoss: 0,
          runningProfit: 2300,
          runningLoss: 0,
        },
        {
          stock: "TCS",
          bookedProfit: 4800,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -1000,
        },
        {
          stock: "INFY",
          bookedProfit: 2700,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -1800,
        },
        {
          stock: "HDFCBANK",
          bookedProfit: 5500,
          bookedLoss: 0,
          runningProfit: 1400,
          runningLoss: 0,
        },
        {
          stock: "SBIN",
          bookedProfit: 3900,
          bookedLoss: 0,
          runningProfit: 2700,
          runningLoss: 0,
        },
        {
          stock: "ITC",
          bookedProfit: 3300,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -900,
        },
        {
          stock: "LT",
          bookedProfit: 4600,
          bookedLoss: 0,
          runningProfit: 1900,
          runningLoss: 0,
        },
      ],
    },

    VITTA_WINDM: {
      booked: 51800,
      running: 12600,

      chart: [
        {
          stock: "RELIANCE",
          bookedProfit: 4300,
          bookedLoss: 0,
          runningProfit: 1800,
          runningLoss: 0,
        },
        {
          stock: "TCS",
          bookedProfit: 3500,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -850,
        },
        {
          stock: "INFY",
          bookedProfit: 2200,
          bookedLoss: 0,
          runningProfit: 900,
          runningLoss: 0,
        },
        {
          stock: "HDFCBANK",
          bookedProfit: 4100,
          bookedLoss: 0,
          runningProfit: 1600,
          runningLoss: 0,
        },
        {
          stock: "SBIN",
          bookedProfit: 3000,
          bookedLoss: 0,
          runningProfit: 1200,
          runningLoss: 0,
        },
      ],
    },

    VITTA_STARK: {
      booked: 38950,
      running: -6200,

      chart: [
        {
          stock: "RELIANCE",
          bookedProfit: 3200,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -700,
        },
        {
          stock: "TCS",
          bookedProfit: 2800,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -1100,
        },
        {
          stock: "INFY",
          bookedProfit: 2100,
          bookedLoss: 0,
          runningProfit: 800,
          runningLoss: 0,
        },
        {
          stock: "SBIN",
          bookedProfit: 2500,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -650,
        },
      ],
    },

    VITTA_SHARIAH: {
      booked: 28400,
      running: 8700,

      chart: [
        {
          stock: "RELIANCE",
          bookedProfit: 2900,
          bookedLoss: 0,
          runningProfit: 1000,
          runningLoss: 0,
        },
        {
          stock: "INFY",
          bookedProfit: 2400,
          bookedLoss: 0,
          runningProfit: 900,
          runningLoss: 0,
        },
        {
          stock: "HDFCBANK",
          bookedProfit: 3300,
          bookedLoss: 0,
          runningProfit: 1100,
          runningLoss: 0,
        },
      ],
    },

    GROWTH_PLUS: {
      booked: 46500,
      running: 11500,

      chart: [
        {
          stock: "TCS",
          bookedProfit: 3800,
          bookedLoss: 0,
          runningProfit: 1200,
          runningLoss: 0,
        },
        {
          stock: "INFY",
          bookedProfit: 3400,
          bookedLoss: 0,
          runningProfit: 1000,
          runningLoss: 0,
        },
        {
          stock: "LT",
          bookedProfit: 3900,
          bookedLoss: 0,
          runningProfit: 1400,
          runningLoss: 0,
        },
      ],
    },

    ALPHA_GROUP: {
      booked: 33900,
      running: -4400,

      chart: [
        {
          stock: "SBIN",
          bookedProfit: 3100,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -600,
        },
        {
          stock: "ITC",
          bookedProfit: 2500,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -900,
        },
        {
          stock: "LT",
          bookedProfit: 2900,
          bookedLoss: 0,
          runningProfit: 900,
          runningLoss: 0,
        },
      ],
    },
  },


  strategy: {
    "Growth Strategy": {
      booked: 85200,
      running: 22400,

      chart: [
        {
          stock: "RELIANCE",
          bookedProfit: 7200,
          bookedLoss: 0,
          runningProfit: 2600,
          runningLoss: 0,
        },
        {
          stock: "TCS",
          bookedProfit: 6100,
          bookedLoss: 0,
          runningProfit: 2100,
          runningLoss: 0,
        },
        {
          stock: "INFY",
          bookedProfit: 5600,
          bookedLoss: 0,
          runningProfit: 1900,
          runningLoss: 0,
        },
        {
          stock: "HDFCBANK",
          bookedProfit: 6800,
          bookedLoss: 0,
          runningProfit: 2300,
          runningLoss: 0,
        },
      ],
    },

    "Long Term Wealth": {
      booked: 64500,
      running: 15200,

      chart: [
        {
          stock: "RELIANCE",
          bookedProfit: 5500,
          bookedLoss: 0,
          runningProfit: 1900,
          runningLoss: 0,
        },
        {
          stock: "TCS",
          bookedProfit: 4700,
          bookedLoss: 0,
          runningProfit: 1500,
          runningLoss: 0,
        },
        {
          stock: "ITC",
          bookedProfit: 3600,
          bookedLoss: 0,
          runningProfit: 1300,
          runningLoss: 0,
        },
      ],
    },

    "Intraday Alpha": {
      booked: 41800,
      running: -7600,

      chart: [
        {
          stock: "RELIANCE",
          bookedProfit: 4100,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -900,
        },
        {
          stock: "SBIN",
          bookedProfit: 3600,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -1300,
        },
        {
          stock: "INFY",
          bookedProfit: 2900,
          bookedLoss: 0,
          runningProfit: 800,
          runningLoss: 0,
        },
      ],
    },

    "Balanced Portfolio": {
      booked: 55800,
      running: 9800,

      chart: [
        {
          stock: "HDFCBANK",
          bookedProfit: 5200,
          bookedLoss: 0,
          runningProfit: 1600,
          runningLoss: 0,
        },
        {
          stock: "TCS",
          bookedProfit: 4100,
          bookedLoss: 0,
          runningProfit: 1200,
          runningLoss: 0,
        },
        {
          stock: "LT",
          bookedProfit: 4500,
          bookedLoss: 0,
          runningProfit: 1500,
          runningLoss: 0,
        },
      ],
    },

    "Momentum Strategy": {
      booked: 69400,
      running: 19800,

      chart: [
        {
          stock: "RELIANCE",
          bookedProfit: 6200,
          bookedLoss: 0,
          runningProfit: 2300,
          runningLoss: 0,
        },
        {
          stock: "MARUTI",
          bookedProfit: 5800,
          bookedLoss: 0,
          runningProfit: 2100,
          runningLoss: 0,
        },
        {
          stock: "SBIN",
          bookedProfit: 4200,
          bookedLoss: 0,
          runningProfit: 1800,
          runningLoss: 0,
        },
      ],
    },
  },


  branch: {
    Calicut: {
      booked: 74500,
      running: 16400,

      chart: [
        {
          stock: "RELIANCE",
          bookedProfit: 6300,
          bookedLoss: 0,
          runningProfit: 2200,
          runningLoss: 0,
        },
        {
          stock: "TCS",
          bookedProfit: 5100,
          bookedLoss: 0,
          runningProfit: 1700,
          runningLoss: 0,
        },
        {
          stock: "INFY",
          bookedProfit: 4300,
          bookedLoss: 0,
          runningProfit: 1500,
          runningLoss: 0,
        },
      ],
    },

    Kochi: {
      booked: 62500,
      running: 12800,

      chart: [
        {
          stock: "HDFCBANK",
          bookedProfit: 5400,
          bookedLoss: 0,
          runningProfit: 1800,
          runningLoss: 0,
        },
        {
          stock: "SBIN",
          bookedProfit: 4600,
          bookedLoss: 0,
          runningProfit: 1400,
          runningLoss: 0,
        },
        {
          stock: "LT",
          bookedProfit: 3900,
          bookedLoss: 0,
          runningProfit: 1300,
          runningLoss: 0,
        },
      ],
    },

    Trivandrum: {
      booked: 48300,
      running: -5400,

      chart: [
        {
          stock: "RELIANCE",
          bookedProfit: 4200,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -900,
        },
        {
          stock: "TCS",
          bookedProfit: 3700,
          bookedLoss: 0,
          runningProfit: 0,
          runningLoss: -1300,
        },
        {
          stock: "INFY",
          bookedProfit: 3100,
          bookedLoss: 0,
          runningProfit: 900,
          runningLoss: 0,
        },
      ],
    },

    Kannur: {
      booked: 36900,
      running: 9200,

      chart: [
        {
          stock: "SBIN",
          bookedProfit: 3200,
          bookedLoss: 0,
          runningProfit: 1100,
          runningLoss: 0,
        },
        {
          stock: "ITC",
          bookedProfit: 2800,
          bookedLoss: 0,
          runningProfit: 1000,
          runningLoss: 0,
        },
      ],
    },
  },
};


const analysisOptions = {
  group: [
    "VITTA_CRI",
    "VITTA_WINDM",
    "VITTA_STARK",
    "VITTA_SHARIAH",
    "GROWTH_PLUS",
    "ALPHA_GROUP",
  ],

  strategy: [
    "Growth Strategy",
    "Long Term Wealth",
    "Intraday Alpha",
    "Balanced Portfolio",
    "Momentum Strategy",
  ],

  branch: [
    "Calicut",
    "Kochi",
    "Trivandrum",
    "Kannur",
  ],
};


function PnlAnalysis() {
  const [analysisType, setAnalysisType] =
    useState("group");

  const [selectedGroup, setSelectedGroup] =
    useState("VITTA_CRI");

  const [
    selectedStrategy,
    setSelectedStrategy,
  ] = useState("Growth Strategy");

  const [
    selectedBranch,
    setSelectedBranch,
  ] = useState("Calicut");


  const currentSelection = useMemo(() => {
    if (analysisType === "group") {
      return selectedGroup;
    }

    if (analysisType === "strategy") {
      return selectedStrategy;
    }

    return selectedBranch;
  }, [
    analysisType,
    selectedGroup,
    selectedStrategy,
    selectedBranch,
  ]);


  const currentData = useMemo(() => {
    return (
      analysisData[analysisType]?.[
        currentSelection
      ] || {
        booked: 0,
        running: 0,
        chart: [],
      }
    );
  }, [
    analysisType,
    currentSelection,
  ]);


  const handleSelection = (value) => {
    if (analysisType === "group") {
      setSelectedGroup(value);

      return;
    }

    if (analysisType === "strategy") {
      setSelectedStrategy(value);

      return;
    }

    setSelectedBranch(value);
  };


  const formatMoney = (value) =>
    `₹${Number(value).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;


  const totalPnl =
    currentData.booked +
    currentData.running;


  const selectorTitle =
    analysisType === "group"
      ? "Select Group"
      : analysisType === "strategy"
      ? "Select Strategy"
      : "Select Branch";


  return (
    <div className="pnl-analysis-page">

      {/* ================= PAGE HEADER ================= */}

      <div className="pnl-analysis-heading">

        <div className="pnl-analysis-heading-icon">

<i class="fa-solid fa-cubes-stacked"></i>
        </div>


        <div>

          <h2>
            P&amp;L Analysis by Group / Strategy / Branch
          </h2>

          <p>
            Analyze booked and running profit and loss across client segments
          </p>

        </div>

      </div>


      {/* ================= MAIN CARD ================= */}

      <section className="pnl-analysis-card">

        {/* CARD HEADER */}

        <div className="pnl-analysis-card-header">

          <div className="pnl-analysis-card-title-icon">

            <i className="fa-solid fa-arrow-trend-up"></i>

          </div>


          <div>

            <h3>
              Performance Analysis for Selected Segment
            </h3>

            <p>
              Compare booked and running profit and loss for the selected group,
              strategy, or branch
            </p>

          </div>

        </div>


        <div className="row g-3 pnl-analysis-body">

          {/* =====================================================
              LEFT
          ===================================================== */}

          <div className="col-12 col-xl-8">

            {/* TABS */}

            <div className="pnl-analysis-tabs">

              <button
                type="button"
                className={
                  analysisType === "group"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setAnalysisType("group")
                }
              >
                Group Wise
              </button>


              <button
                type="button"
                className={
                  analysisType === "strategy"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setAnalysisType(
                    "strategy"
                  )
                }
              >
                Strategy Wise
              </button>


              <button
                type="button"
                className={
                  analysisType === "branch"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setAnalysisType("branch")
                }
              >
                Branch Wise
              </button>

            </div>


            {/* CHART */}

            <div className="pnl-analysis-chart-card">

              <ResponsiveContainer
                width="100%"
                height={330}
              >

                <BarChart
                  data={currentData.chart}
                  barGap={3}
                  barCategoryGap="28%"
                >

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="rgba(255,255,255,0.065)"
                  />


                  <XAxis
                    dataKey="stock"
                    tick={{
                      fill: "#8498a1",
                      fontSize: 9,
                    }}
                    tickLine={false}
                    axisLine={{
                      stroke:
                        "rgba(255,255,255,0.08)",
                    }}
                  />


                  <YAxis
                    tick={{
                      fill: "#718892",
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
                    formatter={(value) =>
                      formatMoney(value)
                    }
                  />


                  <Legend
                    verticalAlign="bottom"
                    align="left"
                    iconType="circle"
                    iconSize={7}
                    wrapperStyle={{
                      color:
                        "#899da5",
                      fontSize:
                        "8px",
                      paddingTop:
                        "10px",
                    }}
                  />


                  <Bar
                    dataKey="bookedLoss"
                    name="Booked Loss"
                    fill="#dc2d2d"
                    maxBarSize={14}
                    radius={[
                      3,
                      3,
                      0,
                      0,
                    ]}
                  />


                  <Bar
                    dataKey="bookedProfit"
                    name="Booked Profit"
                    fill="#087d6b"
                    maxBarSize={14}
                    radius={[
                      3,
                      3,
                      0,
                      0,
                    ]}
                  />


                  <Bar
                    dataKey="runningLoss"
                    name="Running Loss"
                    fill="#ff6f83"
                    maxBarSize={14}
                    radius={[
                      3,
                      3,
                      0,
                      0,
                    ]}
                  />


                  <Bar
                    dataKey="runningProfit"
                    name="Running Profit"
                    fill="#42e2ad"
                    maxBarSize={14}
                    radius={[
                      3,
                      3,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* =====================================================
              RIGHT
          ===================================================== */}

          <div className="col-12 col-xl-4">

            <div className="pnl-analysis-side-panel">

              <label>
                {selectorTitle}
              </label>


              {/* SELECT */}

              <select
                value={currentSelection}
                onChange={(event) =>
                  handleSelection(
                    event.target.value
                  )
                }
              >

                {analysisOptions[
                  analysisType
                ].map((option) => (

                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>

                ))}

              </select>


              {/* BUTTON GRID */}

              <div className="pnl-analysis-option-grid">

                {analysisOptions[
                  analysisType
                ].map((option) => (

                  <button
                    type="button"
                    key={option}
                    className={
                      currentSelection ===
                      option
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handleSelection(option)
                    }
                  >
                    {option}
                  </button>

                ))}

              </div>


              {/* SUMMARY */}

              <div className="pnl-analysis-summary">

                <div>

                  <span>
                    Booked P&amp;L
                  </span>

                  <strong
                    className={
                      currentData.booked >= 0
                        ? "profit"
                        : "loss"
                    }
                  >
                    {formatMoney(
                      currentData.booked
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    Running P&amp;L
                  </span>

                  <strong
                    className={
                      currentData.running >= 0
                        ? "profit"
                        : "loss"
                    }
                  >
                    {formatMoney(
                      currentData.running
                    )}
                  </strong>

                </div>


                <div className="total">

                  <span>
                    Total P&amp;L
                  </span>

                  <strong
                    className={
                      totalPnl >= 0
                        ? "profit"
                        : "loss"
                    }
                  >
                    {formatMoney(
                      totalPnl
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

export default PnlAnalysis;