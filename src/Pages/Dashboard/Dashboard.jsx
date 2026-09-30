import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./Dashboard.css";

const portfolioData = [
  { name: "VITTA_CRI", value: 62, clients: 87 },
  { name: "VITTA_WINDM", value: 15, clients: 21 },
  { name: "VITTA_STARK", value: 15, clients: 21 },
  { name: "VITTA_SHARIAH", value: 8, clients: 11 },
];

const portfolioColors = [
  "#0d806f",
  "#00c982",
  "#4fc7ad",
  "#b4eadc",
];

const pnlData = [
  { date: "01 May", pnl: 1200 },
  { date: "02 May", pnl: 1100 },
  { date: "03 May", pnl: -1400 },
  { date: "04 May", pnl: 1700 },
  { date: "05 May", pnl: 1500 },
  { date: "06 May", pnl: 3200 },
  { date: "07 May", pnl: -1600 },
  { date: "08 May", pnl: -1900 },
  { date: "09 May", pnl: -700 },
  { date: "10 May", pnl: 700 },
  { date: "11 May", pnl: 1000 },
  { date: "12 May", pnl: -650 },
  { date: "13 May", pnl: -550 },
  { date: "14 May", pnl: -1700 },
  { date: "15 May", pnl: -1200 },
  { date: "16 May", pnl: 1100 },
  { date: "17 May", pnl: 1500 },
  { date: "18 May", pnl: 2800 },
  { date: "19 May", pnl: 2700 },
  { date: "20 May", pnl: 3900 },
  { date: "21 May", pnl: -3000 },
];


const targetAnalysisDemoData = {
  company: {
    equity: {
      percentage: 72,
      achieved: "₹72,00,000.00",
      remaining: "₹28,00,000.00",
      monthlyTarget: "₹1,00,00,000.00",
      todayTarget: "₹4,00,000.00",
      todayAchieved: "₹3,12,000.00",
      todayPercentage: "78%",
    },

    future: {
      percentage: 58,
      achieved: "₹58,00,000.00",
      remaining: "₹42,00,000.00",
      monthlyTarget: "₹1,00,00,000.00",
      todayTarget: "₹5,00,000.00",
      todayAchieved: "₹2,90,000.00",
      todayPercentage: "58%",
    },

    option: {
      percentage: 81,
      achieved: "18,10,000 Lots",
      remaining: "4,10,000 Lots",
      monthlyTarget: "22,20,000 Lots",
      todayTarget: "500 Lots",
      todayAchieved: "450 Lots",
      todayPercentage: "90%",
    },
  },

  branches: [
    {
      id: "BR001",
      name: "Mumbai Central",

      targetData: {
        equity: {
          percentage: 68,
          achieved: "₹68,00,000.00",
          remaining: "₹32,00,000.00",
          monthlyTarget: "₹1,00,00,000.00",
          todayTarget: "₹4,00,000.00",
          todayAchieved: "₹2,75,000.00",
          todayPercentage: "69%",
        },

        future: {
          percentage: 54,
          achieved: "₹54,00,000.00",
          remaining: "₹46,00,000.00",
          monthlyTarget: "₹1,00,00,000.00",
          todayTarget: "₹5,00,000.00",
          todayAchieved: "₹2,70,000.00",
          todayPercentage: "54%",
        },

        option: {
          percentage: 74,
          achieved: "16,50,000 Lots",
          remaining: "5,70,000 Lots",
          monthlyTarget: "22,20,000 Lots",
          todayTarget: "500 Lots",
          todayAchieved: "405 Lots",
          todayPercentage: "81%",
        },
      },

      rms: [
        {
          id: "RM001",
          name: "Rahul Menon",

          targetData: {
            equity: {
              percentage: 82,
              achieved: "₹41,00,000.00",
              remaining: "₹9,00,000.00",
              monthlyTarget: "₹50,00,000.00",
              todayTarget: "₹2,00,000.00",
              todayAchieved: "₹1,72,000.00",
              todayPercentage: "86%",
            },

            future: {
              percentage: 66,
              achieved: "₹33,00,000.00",
              remaining: "₹17,00,000.00",
              monthlyTarget: "₹50,00,000.00",
              todayTarget: "₹2,50,000.00",
              todayAchieved: "₹1,65,000.00",
              todayPercentage: "66%",
            },

            option: {
              percentage: 87,
              achieved: "9,70,000 Lots",
              remaining: "1,50,000 Lots",
              monthlyTarget: "11,20,000 Lots",
              todayTarget: "250 Lots",
              todayAchieved: "224 Lots",
              todayPercentage: "90%",
            },
          },

          dealers: [
            {
              id: "DL001",
              name: "Dealer Arun",

              targetData: {
                equity: {
                  percentage: 91,
                  achieved: "₹22,75,000.00",
                  remaining: "₹2,25,000.00",
                  monthlyTarget: "₹25,00,000.00",
                  todayTarget: "₹1,00,000.00",
                  todayAchieved: "₹92,000.00",
                  todayPercentage: "92%",
                },

                future: {
                  percentage: 76,
                  achieved: "₹19,00,000.00",
                  remaining: "₹6,00,000.00",
                  monthlyTarget: "₹25,00,000.00",
                  todayTarget: "₹1,25,000.00",
                  todayAchieved: "₹95,000.00",
                  todayPercentage: "76%",
                },

                option: {
                  percentage: 94,
                  achieved: "5,20,000 Lots",
                  remaining: "35,000 Lots",
                  monthlyTarget: "5,55,000 Lots",
                  todayTarget: "125 Lots",
                  todayAchieved: "120 Lots",
                  todayPercentage: "96%",
                },
              },
            },

            {
              id: "DL002",
              name: "Dealer Nikhil",

              targetData: {
                equity: {
                  percentage: 73,
                  achieved: "₹18,25,000.00",
                  remaining: "₹6,75,000.00",
                  monthlyTarget: "₹25,00,000.00",
                  todayTarget: "₹1,00,000.00",
                  todayAchieved: "₹80,000.00",
                  todayPercentage: "80%",
                },

                future: {
                  percentage: 56,
                  achieved: "₹14,00,000.00",
                  remaining: "₹11,00,000.00",
                  monthlyTarget: "₹25,00,000.00",
                  todayTarget: "₹1,25,000.00",
                  todayAchieved: "₹70,000.00",
                  todayPercentage: "56%",
                },

                option: {
                  percentage: 80,
                  achieved: "4,50,000 Lots",
                  remaining: "1,15,000 Lots",
                  monthlyTarget: "5,65,000 Lots",
                  todayTarget: "125 Lots",
                  todayAchieved: "104 Lots",
                  todayPercentage: "83%",
                },
              },
            },
          ],
        },

        {
          id: "RM002",
          name: "Arjun Nair",

          targetData: {
            equity: {
              percentage: 54,
              achieved: "₹27,00,000.00",
              remaining: "₹23,00,000.00",
              monthlyTarget: "₹50,00,000.00",
              todayTarget: "₹2,00,000.00",
              todayAchieved: "₹1,03,000.00",
              todayPercentage: "52%",
            },

            future: {
              percentage: 42,
              achieved: "₹21,00,000.00",
              remaining: "₹29,00,000.00",
              monthlyTarget: "₹50,00,000.00",
              todayTarget: "₹2,50,000.00",
              todayAchieved: "₹1,05,000.00",
              todayPercentage: "42%",
            },

            option: {
              percentage: 61,
              achieved: "6,80,000 Lots",
              remaining: "4,20,000 Lots",
              monthlyTarget: "11,00,000 Lots",
              todayTarget: "250 Lots",
              todayAchieved: "181 Lots",
              todayPercentage: "72%",
            },
          },

          dealers: [
            {
              id: "DL003",
              name: "Dealer Faisal",

              targetData: {
                equity: {
                  percentage: 62,
                  achieved: "₹15,50,000.00",
                  remaining: "₹9,50,000.00",
                  monthlyTarget: "₹25,00,000.00",
                  todayTarget: "₹1,00,000.00",
                  todayAchieved: "₹62,000.00",
                  todayPercentage: "62%",
                },

                future: {
                  percentage: 48,
                  achieved: "₹12,00,000.00",
                  remaining: "₹13,00,000.00",
                  monthlyTarget: "₹25,00,000.00",
                  todayTarget: "₹1,25,000.00",
                  todayAchieved: "₹60,000.00",
                  todayPercentage: "48%",
                },

                option: {
                  percentage: 69,
                  achieved: "3,80,000 Lots",
                  remaining: "1,70,000 Lots",
                  monthlyTarget: "5,50,000 Lots",
                  todayTarget: "125 Lots",
                  todayAchieved: "91 Lots",
                  todayPercentage: "73%",
                },
              },
            },
          ],
        },
      ],
    },

    {
      id: "BR002",
      name: "Calicut",

      targetData: {
        equity: {
          percentage: 79,
          achieved: "₹79,00,000.00",
          remaining: "₹21,00,000.00",
          monthlyTarget: "₹1,00,00,000.00",
          todayTarget: "₹4,00,000.00",
          todayAchieved: "₹3,42,000.00",
          todayPercentage: "86%",
        },

        future: {
          percentage: 71,
          achieved: "₹71,00,000.00",
          remaining: "₹29,00,000.00",
          monthlyTarget: "₹1,00,00,000.00",
          todayTarget: "₹5,00,000.00",
          todayAchieved: "₹3,65,000.00",
          todayPercentage: "73%",
        },

        option: {
          percentage: 89,
          achieved: "19,75,000 Lots",
          remaining: "2,45,000 Lots",
          monthlyTarget: "22,20,000 Lots",
          todayTarget: "500 Lots",
          todayAchieved: "472 Lots",
          todayPercentage: "94%",
        },
      },

      rms: [
        {
          id: "RM003",
          name: "Nived P",

          targetData: {
            equity: {
              percentage: 88,
              achieved: "₹44,00,000.00",
              remaining: "₹6,00,000.00",
              monthlyTarget: "₹50,00,000.00",
              todayTarget: "₹2,00,000.00",
              todayAchieved: "₹1,82,000.00",
              todayPercentage: "91%",
            },

            future: {
              percentage: 78,
              achieved: "₹39,00,000.00",
              remaining: "₹11,00,000.00",
              monthlyTarget: "₹50,00,000.00",
              todayTarget: "₹2,50,000.00",
              todayAchieved: "₹2,00,000.00",
              todayPercentage: "80%",
            },

            option: {
              percentage: 93,
              achieved: "10,30,000 Lots",
              remaining: "70,000 Lots",
              monthlyTarget: "11,00,000 Lots",
              todayTarget: "250 Lots",
              todayAchieved: "238 Lots",
              todayPercentage: "95%",
            },
          },

          dealers: [
            {
              id: "DL004",
              name: "Dealer Akhil",

              targetData: {
                equity: {
                  percentage: 96,
                  achieved: "₹24,00,000.00",
                  remaining: "₹1,00,000.00",
                  monthlyTarget: "₹25,00,000.00",
                  todayTarget: "₹1,00,000.00",
                  todayAchieved: "₹98,000.00",
                  todayPercentage: "98%",
                },

                future: {
                  percentage: 84,
                  achieved: "₹21,00,000.00",
                  remaining: "₹4,00,000.00",
                  monthlyTarget: "₹25,00,000.00",
                  todayTarget: "₹1,25,000.00",
                  todayAchieved: "₹1,08,000.00",
                  todayPercentage: "86%",
                },

                option: {
                  percentage: 97,
                  achieved: "5,35,000 Lots",
                  remaining: "15,000 Lots",
                  monthlyTarget: "5,50,000 Lots",
                  todayTarget: "125 Lots",
                  todayAchieved: "123 Lots",
                  todayPercentage: "98%",
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

const todayTargetData = {
  equity: {
    name: "Equity",
    achieved: "₹1,87,50,000.00",
    dailyTarget: "₹2,50,00,000.00",
    percentage: 75,
    monthlyTarget: "₹30,00,00,000.00",
    monthlyAchieved: "₹28,64,50,000.00",
    monthlyPercentage: "95.5%",
  },

  future: {
    name: "Future",
    achieved: "₹1,45,00,000.00",
    dailyTarget: "₹2,50,00,000.00",
    percentage: 58,
    monthlyTarget: "₹25,00,00,000.00",
    monthlyAchieved: "₹17,75,00,000.00",
    monthlyPercentage: "71.0%",
  },

  option: {
    name: "Option",
    achieved: "810 Lots",
    dailyTarget: "1,000 Lots",
    percentage: 81,
    monthlyTarget: "22,200 Lots",
    monthlyAchieved: "18,100 Lots",
    monthlyPercentage: "81.5%",
  },
};

function Dashboard() {

const [activeTargetSegment, setActiveTargetSegment] =
  useState("equity");

const currentTodayTarget =
  todayTargetData[activeTargetSegment];

const [selectedBranch, setSelectedBranch] = useState("");
const [selectedRM, setSelectedRM] = useState("");
const [selectedDealer, setSelectedDealer] = useState("");





const branch = targetAnalysisDemoData.branches.find(
  (item) => item.id === selectedBranch
);

const rm = branch?.rms.find(
  (item) => item.id === selectedRM
);

const dealer = rm?.dealers.find(
  (item) => item.id === selectedDealer
);

const availableRMs = branch?.rms || [];
const availableDealers = rm?.dealers || [];

/*
  Priority:
  Dealer selected -> dealer data
  RM selected     -> RM data
  Branch selected -> branch data
  Nothing selected -> company data
*/
const currentTargetData =
  dealer?.targetData ||
  rm?.targetData ||
  branch?.targetData ||
  targetAnalysisDemoData.company;


const handleBranchChange = (event) => {
  const value = event.target.value;

  setSelectedBranch(value);

  // Reset dependent filters
  setSelectedRM("");
  setSelectedDealer("");
};


const handleRMChange = (event) => {
  const value = event.target.value;

  setSelectedRM(value);

  // Reset Dealer
  setSelectedDealer("");
};


const handleDealerChange = (event) => {
  setSelectedDealer(event.target.value);
};




  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}

      <div className="dashboard-heading">
        <div className="dashboard-heading-icon">
          <i className="fa-solid fa-table-cells-large"></i>


          {/* <i class="fa-solid fa-cubes-stacked"></i> */}

        </div>

        <div>
          <h2>Dashboards</h2>
          <p>
            Monitor clients, portfolios and trading performance
          </p>
        </div>
      </div>


      {/* ================= TOP CARDS ================= */}

      <div className="row g-3 dashboard-top-cards">

        <div className="col-12 col-md-6 col-xl-3">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon clients">
              <i className="fa-solid fa-users"></i>
            </div>

            <div>
              <span>Total Clients</span>

              <h3>140+</h3>

              <small>
                Active clients across all portfolios
              </small>
            </div>
          </div>
        </div>


        <div className="col-12 col-md-6 col-xl-3">
          <MarketCard
            name="NIFTY"
            value="23,830.75"
            change="225.85 (-0.94%)"
          />
        </div>


        <div className="col-12 col-md-6 col-xl-3">
          <MarketCard
            name="FINNIFTY"
            value="25,754.60"
            change="249.30 (-0.96%)"
          />
        </div>


        <div className="col-12 col-md-6 col-xl-3">
          <MarketCard
            name="BANKNIFTY"
            value="57,037.75"
            change="371.85 (-0.65%)"
          />
        </div>

      </div>


      {/* ================= MIDDLE SECTION ================= */}

      <div className="row g-3 mt-1">

        {/* PORTFOLIO */}

        <div className="col-12 col-xl-5">
          <div className="dashboard-card portfolio-card">

            <div className="dashboard-card-header">
              <h4>Clients by Portfolio</h4>

              <button>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </div>


            <div className="portfolio-content">

              <div className="portfolio-chart">
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={75}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={
                            portfolioColors[
                              index % portfolioColors.length
                            ]
                          }
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="portfolio-center">
                  <span>Total Clients</span>
                  <strong>140+</strong>
                </div>
              </div>


              <div className="portfolio-list">
                {portfolioData.map((item, index) => (
                  <div
                    className="portfolio-list-item"
                    key={item.name}
                  >
                    <div className="portfolio-name">
                      <span
                        className="portfolio-dot"
                        style={{
                          background:
                            portfolioColors[index],
                        }}
                      ></span>

                      {item.name}
                    </div>

                    <span>
                      {item.value}% ({item.clients})
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>


        {/* VOLUME */}

 {/* ================= TODAY TARGET ================= */}

<div className="col-12 col-xl-7">

  <div
    className={`dashboard-card today-target-card ${activeTargetSegment}`}
  >

    {/* ================= TOP ================= */}

    <div className="today-target-top">

      <div className="today-target-heading">
        <h4>Today's Target</h4>

        <p>
          Current trading performance
        </p>
      </div>


      {/* ================= SEGMENT TABS ================= */}

      <div className="today-target-tabs">

        <button
          type="button"
          className={
            activeTargetSegment === "equity"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTargetSegment("equity")
          }
        >
          <i className="fa-solid fa-chart-simple"></i>

          Equity
        </button>


        <button
          type="button"
          className={
            activeTargetSegment === "future"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTargetSegment("future")
          }
        >
          <i className="fa-solid fa-arrow-trend-up"></i>

          Future
        </button>


        <button
          type="button"
          className={
            activeTargetSegment === "option"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTargetSegment("option")
          }
        >
          <i className="fa-solid fa-link"></i>

          Option
        </button>

      </div>

    </div>


    {/* ================= MAIN ================= */}

    <div className="today-target-main">

      <div className="today-target-values">

        <span>
          Total Achieved ({currentTodayTarget.name})
        </span>

        <h2>
          {currentTodayTarget.achieved}
        </h2>


        <div className="today-daily-target">

          <span>
            Daily Target
          </span>

          <strong>
            {currentTodayTarget.dailyTarget}
          </strong>

        </div>

      </div>


      {/* ================= CIRCLE GRAPH ================= */}

      <div
        className="today-target-circle"
        style={{
          "--today-progress":
            `${currentTodayTarget.percentage}%`,
        }}
      >
        <div className="today-target-circle-inner">

          <strong>
            {currentTodayTarget.percentage.toFixed(1)}%
          </strong>

          <span>
            of daily target
          </span>

        </div>
      </div>

    </div>


    {/* ================= PROGRESS ================= */}

    <div className="today-target-progress">

      <div
        className="today-target-progress-fill"
        style={{
          width:
            `${Math.min(
              currentTodayTarget.percentage,
              100
            )}%`,
        }}
      ></div>

    </div>


    {/* ================= BOTTOM ================= */}

    <div className="today-target-footer">

      <div className="today-target-info">

        <div className="today-target-info-icon target">
          <i className="fa-solid fa-bullseye"></i>
        </div>

        <div>
          <span>
            Monthly Target
          </span>

          <strong>
            {currentTodayTarget.monthlyTarget}
          </strong>
        </div>

      </div>


      <div className="today-target-info">

        <div className="today-target-info-icon achieved">
          <i className="fa-solid fa-arrow-trend-up"></i>
        </div>

        <div>
          <span>
            Achieved Monthly Target
          </span>

          <strong>
            {currentTodayTarget.monthlyAchieved}
          </strong>
        </div>

      </div>


      <div className="today-target-info">

        <div className="today-target-info-icon percentage">
          <i className="fa-solid fa-percent"></i>
        </div>

        <div>
          <span>
            Percentage of Monthly Target
          </span>

          <strong>
            {currentTodayTarget.monthlyPercentage}
          </strong>
        </div>

      </div>

    </div>

  </div>

</div>

      </div>


      {/* ================= VALUE CARDS ================= */}

      {/* <div className="row g-3 mt-1">

        <div className="col-12 col-md-6">
          <div className="dashboard-value-card">
            <div className="value-icon">
              <i className="fa-solid fa-wallet"></i>
            </div>

            <div>
              <span>Total Sure Deposits</span>

              <h3>₹34,86,734.80</h3>

              <small>
                Overall client deposits
              </small>
            </div>
          </div>
        </div>


        <div className="col-12 col-md-6">
          <div className="dashboard-value-card">
            <div className="value-icon">
              <i className="fa-solid fa-chart-pie"></i>
            </div>

            <div>
              <span>Total Sure Value</span>

              <h3>₹4,11,66,533.76</h3>

              <small>
                Overall client holdings value
              </small>
            </div>
          </div>
        </div>

      </div> */}


      {/* ================= PNL CHART ================= */}

      {/* <div className="dashboard-card pnl-card mt-3">

        <div className="pnl-header">

          <div>
            <h4>Daily Profit & Loss</h4>
            <p>₹ Amount (in thousands)</p>
          </div>


          <div className="pnl-header-right">

            <div className="pnl-legends">
              <span>
                <i className="profit-dot"></i>
                Profit
              </span>

              <span>
                <i className="loss-dot"></i>
                Loss
              </span>
            </div>


            <select>
              <option>This Month</option>
              <option>Last Month</option>
            </select>

          </div>

        </div>


        <div className="pnl-chart">
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={pnlData}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#30434e"
              />

              <XAxis
                dataKey="date"
                tick={{ fill: "#82949e", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={3}
              />

              <YAxis
                tick={{ fill: "#82949e", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="pnl"
                radius={[2, 2, 0, 0]}
              >
                {pnlData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.pnl >= 0
                        ? "#00bf7d"
                        : "#ef4d4d"
                    }
                  />
                ))}
              </Bar>

            </BarChart>
          </ResponsiveContainer>
        </div>

      </div> */}

{/* ================= TARGET BASED ANALYSIS ================= */}

<div className="dashboard-card target-analysis-section mt-3">

  {/* ================= HEADER ================= */}

  <div className="target-analysis-header">

    <div>
      <h4>Target Based Analysis</h4>

      <p>
        Analyze target achievement by instrument and organizational hierarchy
      </p>
    </div>


    <div className="target-analysis-flow">

      <span>
        <i className="fa-solid fa-users"></i>
        Branch
      </span>



      <i className="fa-solid fa-arrow-right"></i>

      <span>RM</span>


      <i className="fa-solid fa-arrow-right"></i>

      <span>Dealer</span>


    </div>

  </div>


  {/* ================= FILTERS ================= */}

  <div className="row g-3 target-analysis-filters">

<div className="col-12 col-md-4">
  <div className="target-filter-box">

    <span className="target-filter-label">
      Branch
    </span>

    <select
      value={selectedBranch}
      onChange={handleBranchChange}
    >
      <option value="">
        Company - All Branches
      </option>

      {targetAnalysisDemoData.branches.map(
        (item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        )
      )}
    </select>

  </div>
</div>


  <div className="col-12 col-md-4">
  <div className="target-filter-box">

    <span className="target-filter-label">
      RM
    </span>

    <select
      value={selectedRM}
      onChange={handleRMChange}
      disabled={!selectedBranch}
    >
      <option value="">
        {selectedBranch
          ? "All RM"
          : "Select Branch First"}
      </option>

      {availableRMs.map((item) => (
        <option
          key={item.id}
          value={item.id}
        >
          {item.name}
        </option>
      ))}
    </select>

  </div>
</div>


<div className="col-12 col-md-4">
  <div className="target-filter-box">

    <span className="target-filter-label">
      Dealer
    </span>

    <select
      value={selectedDealer}
      onChange={handleDealerChange}
      disabled={!selectedRM}
    >
      <option value="">
        {selectedRM
          ? "All Dealers"
          : "Select RM First"}
      </option>

      {availableDealers.map((item) => (
        <option
          key={item.id}
          value={item.id}
        >
          {item.name}
        </option>
      ))}
    </select>

  </div>
</div>

  </div>


  {/* ================= TARGET CARDS ================= */}

  <div className="row g-3 mt-1">

    <div className="col-12 col-xl-4">
  <TargetAnalysisCard
  type="equity"
  icon="fa-solid fa-chart-simple"
  title="Equity Target"
  subtitle="Cash & Delivery Segment"

  percentage={
    currentTargetData.equity.percentage
  }

  achieved={
    currentTargetData.equity.achieved
  }

  remaining={
    currentTargetData.equity.remaining
  }

  monthlyTarget={
    currentTargetData.equity.monthlyTarget
  }

  todayTarget={
    currentTargetData.equity.todayTarget
  }

  todayAchieved={
    currentTargetData.equity.todayAchieved
  }

  todayPercentage={
    currentTargetData.equity.todayPercentage
  }
/>
    </div>


    <div className="col-12 col-xl-4">
      <TargetAnalysisCard
  type="future"
  icon="fa-solid fa-chart-column"
  title="Future Target"
  subtitle="F&O Futures Segment"

  percentage={
    currentTargetData.future.percentage
  }

  achieved={
    currentTargetData.future.achieved
  }

  remaining={
    currentTargetData.future.remaining
  }

  monthlyTarget={
    currentTargetData.future.monthlyTarget
  }

  todayTarget={
    currentTargetData.future.todayTarget
  }

  todayAchieved={
    currentTargetData.future.todayAchieved
  }

  todayPercentage={
    currentTargetData.future.todayPercentage
  }
/>
    </div>


    <div className="col-12 col-xl-4">
     <TargetAnalysisCard
  type="option"
  icon="fa-solid fa-chart-simple"
  title="Option Target"
  subtitle="F&O Options Segment (Lots)"

  percentage={
    currentTargetData.option.percentage
  }

  achieved={
    currentTargetData.option.achieved
  }

  remaining={
    currentTargetData.option.remaining
  }

  monthlyTarget={
    currentTargetData.option.monthlyTarget
  }

  todayTarget={
    currentTargetData.option.todayTarget
  }

  todayAchieved={
    currentTargetData.option.todayAchieved
  }

  todayPercentage={
    currentTargetData.option.todayPercentage
  }
/>
    </div>

  </div>

</div>

    </div>
  );
}


/* ================= MARKET CARD ================= */

function MarketCard({ name, value, change }) {
  return (
    <div className="dashboard-stat-card">

      <div className="dashboard-stat-icon market">
        <i className="fa-solid fa-arrow-trend-down"></i>
      </div>

      <div>
        <span>{name}</span>

        <h3>{value}</h3>

        <small className="market-loss">
          <i className="fa-solid fa-arrow-down"></i>
          {change}
        </small>
      </div>

    </div>
  );
}


/* ================= VOLUME INFO ================= */

function VolumeInfo({ icon, title, value }) {
  return (
    <div className="volume-info">

      <div className="volume-info-icon">
        <i className={icon}></i>
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>

    </div>
  );
}

function TargetAnalysisCard({
  type,
  icon,
  title,
  subtitle,
  percentage,
  achieved,
  remaining,
  monthlyTarget,
  todayTarget,
  todayAchieved,
  todayPercentage,
}) {
  return (
    <div className={`target-analysis-card ${type}`}>

      {/* TOP */}

      <div className="target-card-heading">

        <div className="target-card-title">

          <div className="target-card-icon">
            <i className={icon}></i>
          </div>

          <div>
            <h5>{title}</h5>
            <span>{subtitle}</span>
          </div>

        </div>


        <button
          type="button"
          className="target-card-more"
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>

      </div>


      {/* BODY */}

      <div className="target-card-body">

        {/* CIRCLE */}

        <div
          className="target-progress-circle"
          style={{
            "--progress": `${percentage}%`,
          }}
        >
          <div className="target-progress-inner">
            <strong>
              {percentage}%
            </strong>

            <span>
              Achieved
            </span>
          </div>
        </div>


        {/* DETAILS */}

        <div className="target-card-details">

          <div className="target-detail-row">
            <span className="target-detail-dot achieved"></span>

            <div>
              <small>Achieved</small>
              <strong>{achieved}</strong>
            </div>
          </div>


          <div className="target-detail-row">
            <span className="target-detail-dot remaining"></span>

            <div>
              <small>Remaining</small>
              <strong>{remaining}</strong>
            </div>
          </div>


          <div className="target-detail-row">
            <span className="target-detail-dot monthly"></span>

            <div>
              <small>Monthly Target</small>
              <strong>{monthlyTarget}</strong>
            </div>
          </div>

        </div>

      </div>


      {/* FOOTER */}

      <div className="target-card-footer">

        <div className="target-footer-item">

          <div className="target-footer-icon">
            <i className="fa-solid fa-bullseye"></i>
          </div>

          <div>
            <span>
              Today Target
            </span>

            <strong>
              {todayTarget}
            </strong>
          </div>

        </div>


        <div className="target-footer-divider"></div>


        <div className="target-footer-item">

          <div className="target-footer-icon">
            <i className="fa-solid fa-arrow-trend-up"></i>
          </div>

          <div>
            <span>
              Today Achieved
            </span>

            <strong>
              {todayAchieved}

              <small>
                ({todayPercentage})
              </small>
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;