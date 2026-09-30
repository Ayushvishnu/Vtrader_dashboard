import React, {
  useMemo,
  useState,
} from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Swal from "sweetalert2";

import "./Growth.css";


/* =====================================================
   DEMO HIERARCHY
===================================================== */

const branchOptions = [
  {
    id: "BR001",
    name: "Calicut Branch",
  },
  {
    id: "BR002",
    name: "Kochi Branch",
  },
  {
    id: "BR003",
    name: "Bangalore Branch",
  },
  {
    id: "BR004",
    name: "Mumbai Branch",
  },
];


const rmOptions = [
  {
    id: "RM001",
    name: "Arun Kumar",
    branch: "BR001",
  },
  {
    id: "RM002",
    name: "Nikhil Joseph",
    branch: "BR001",
  },
  {
    id: "RM003",
    name: "Faisal Ahmed",
    branch: "BR002",
  },
  {
    id: "RM004",
    name: "Rahul Menon",
    branch: "BR003",
  },
  {
    id: "RM005",
    name: "Sneha Pillai",
    branch: "BR004",
  },
];


const dealerOptions = [
  {
    id: "DL001",
    name: "Dealer One",
    rm: "RM001",
    branch: "BR001",
  },
  {
    id: "DL002",
    name: "Dealer Two",
    rm: "RM001",
    branch: "BR001",
  },
  {
    id: "DL003",
    name: "Dealer Three",
    rm: "RM002",
    branch: "BR001",
  },
  {
    id: "DL004",
    name: "Dealer Four",
    rm: "RM003",
    branch: "BR002",
  },
  {
    id: "DL005",
    name: "Dealer Five",
    rm: "RM004",
    branch: "BR003",
  },
  {
    id: "DL006",
    name: "Dealer Six",
    rm: "RM005",
    branch: "BR004",
  },
];


/* =====================================================
   GRAPH DATA
===================================================== */

const segmentData = {
  Equity: [
    { month: "Jan 2026", value: 4.8 },
    { month: "Feb 2026", value: 7.2 },
    { month: "Mar 2026", value: 10.6 },
    { month: "Apr 2026", value: 13.2 },
    { month: "May 2026", value: 18.5 },
    { month: "Jun 2026", value: 22.8 },
    { month: "Jul 2026", value: 29.5 },
    { month: "Aug 2026", value: 34.8 },
    { month: "Sep 2026", value: 48.6 },
  ],

  Future: [
    { month: "Jan 2026", value: 0 },
    { month: "Feb 2026", value: 0 },
    { month: "Mar 2026", value: 0 },
    { month: "Apr 2026", value: 0 },
    { month: "May 2026", value: 0 },
    { month: "Jun 2026", value: 0 },
    { month: "Jul 2026", value: 0 },
    { month: "Aug 2026", value: 0 },
    { month: "Sep 2026", value: 45 },
  ],

  Option: [
    { month: "Jan 2026", value: 3 },
    { month: "Feb 2026", value: 5 },
    { month: "Mar 2026", value: 8 },
    { month: "Apr 2026", value: 11 },
    { month: "May 2026", value: 15 },
    { month: "Jun 2026", value: 21 },
    { month: "Jul 2026", value: 28 },
    { month: "Aug 2026", value: 33 },
    { month: "Sep 2026", value: 39 },
  ],
};


function Growth() {
  /* =====================================================
     FORM VALUES
  ===================================================== */

  const [startDate, setStartDate] =
    useState("2026-01-01");

  const [endDate, setEndDate] =
    useState("2026-09-29");

  const [branch, setBranch] =
    useState("");

  const [rm, setRm] =
    useState("");

  const [dealer, setDealer] =
    useState("");


  /* =====================================================
     APPLIED VALUES
  ===================================================== */

  const [appliedFilters, setAppliedFilters] =
    useState({
      startDate: "2026-01-01",
      endDate: "2026-09-29",
      branch: "",
      rm: "",
      dealer: "",
    });


  /* =====================================================
     SEGMENT
  ===================================================== */

  const [segment, setSegment] =
    useState("Future");


  /* =====================================================
     DEPENDENT RM OPTIONS
  ===================================================== */

  const filteredRms =
    useMemo(() => {
      if (!branch) {
        return rmOptions;
      }

      return rmOptions.filter(
        (item) =>
          item.branch === branch
      );
    }, [branch]);


  /* =====================================================
     DEPENDENT DEALER OPTIONS
  ===================================================== */

  const filteredDealers =
    useMemo(() => {
      return dealerOptions.filter(
        (item) => {
          if (
            branch &&
            item.branch !== branch
          ) {
            return false;
          }

          if (
            rm &&
            item.rm !== rm
          ) {
            return false;
          }

          return true;
        }
      );
    }, [
      branch,
      rm,
    ]);


  /* =====================================================
     BRANCH CHANGE
  ===================================================== */

  const handleBranchChange = (
    event
  ) => {
    const value =
      event.target.value;

    setBranch(value);

    setRm("");
    setDealer("");
  };


  /* =====================================================
     RM CHANGE
  ===================================================== */

  const handleRmChange = (
    event
  ) => {
    const value =
      event.target.value;

    setRm(value);

    setDealer("");
  };


  /* =====================================================
     APPLY
  ===================================================== */

  const handleViewReport = () => {
    if (!startDate) {
      showWarning(
        "Start Date Required",
        "Please select a start date."
      );

      return;
    }

    if (!endDate) {
      showWarning(
        "End Date Required",
        "Please select an end date."
      );

      return;
    }

    if (
      new Date(startDate) >
      new Date(endDate)
    ) {
      showWarning(
        "Invalid Date Range",
        "Start date cannot be after end date."
      );

      return;
    }


    setAppliedFilters({
      startDate,
      endDate,
      branch,
      rm,
      dealer,
    });


    Swal.fire({
      icon: "success",
      title: "Report Updated",
      text:
        "Growth report filters applied successfully.",
      toast: true,
      position: "top-end",
      timer: 1600,
      showConfirmButton: false,
      background: "#061923",
      color: "#ffffff",
    });
  };


  /* =====================================================
     SCOPE TEXT
  ===================================================== */

  const scopeText =
    useMemo(() => {
      if (
        appliedFilters.dealer
      ) {
        const item =
          dealerOptions.find(
            (dealerItem) =>
              dealerItem.id ===
              appliedFilters.dealer
          );

        return item
          ? `Dealer: ${item.name}`
          : "Dealer";
      }


      if (
        appliedFilters.rm
      ) {
        const item =
          rmOptions.find(
            (rmItem) =>
              rmItem.id ===
              appliedFilters.rm
          );

        return item
          ? `RM: ${item.name}`
          : "RM";
      }


      if (
        appliedFilters.branch
      ) {
        const item =
          branchOptions.find(
            (branchItem) =>
              branchItem.id ===
              appliedFilters.branch
          );

        return item
          ? `Branch: ${item.name}`
          : "Branch";
      }


      return "Company";
    }, [appliedFilters]);


  /* =====================================================
     GRAPH DATA
  ===================================================== */

  const graphData =
    useMemo(() => {
      const base =
        segmentData[segment];

      /*
        Demo variation based on filters.
        Remove this when API data is connected.
      */

      let multiplier = 1;

      if (
        appliedFilters.branch
      ) {
        multiplier *= 0.78;
      }

      if (
        appliedFilters.rm
      ) {
        multiplier *= 0.72;
      }

      if (
        appliedFilters.dealer
      ) {
        multiplier *= 0.66;
      }


      return base.map(
        (item) => ({
          ...item,

          value:
            Number(
              (
                item.value *
                multiplier
              ).toFixed(2)
            ),
        })
      );
    }, [
      segment,
      appliedFilters,
    ]);


  const showWarning = (
    title,
    text
  ) => {
    Swal.fire({
      icon: "warning",
      title,
      text,
      background: "#061923",
      color: "#ffffff",
      confirmButtonColor:
        "#00b985",
    });
  };


  return (
    <div className="growth-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="growth-heading">

        <div className="growth-heading-icon">

          <i className="fa-solid fa-seedling"></i>

        </div>


        <div>

          <h2>
            Growth Analysis
          </h2>

          <p>
            Track trading growth based on monthly volume for Equity,
            Future and Option segments.
          </p>

        </div>

      </div>


      {/* =================================================
          FILTER CARD
      ================================================= */}

      <section className="growth-filter-card">

        <div className="row g-3 align-items-end">

          {/* START DATE */}

          <div className="col-12 col-md-6 col-xl">

            <div className="growth-field">

              <label>
                Start Date
              </label>


              <input
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* END DATE */}

          <div className="col-12 col-md-6 col-xl">

            <div className="growth-field">

              <label>
                End Date
              </label>


              <input
                type="date"
                value={endDate}
                onChange={(event) =>
                  setEndDate(
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* BRANCH */}

          <div className="col-12 col-md-6 col-xl">

            <div className="growth-field">

              <label>
                Branch
              </label>


              <select
                value={branch}
                onChange={
                  handleBranchChange
                }
              >

                <option value="">
                  All Branches
                </option>


                {branchOptions.map(
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


          {/* RM */}

          <div className="col-12 col-md-6 col-xl">

            <div className="growth-field">

              <label>
                RM
              </label>


              <select
                value={rm}
                onChange={
                  handleRmChange
                }
              >

                <option value="">
                  All RMs
                </option>


                {filteredRms.map(
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


          {/* DEALER */}

          <div className="col-12 col-md-6 col-xl">

            <div className="growth-field">

              <label>
                Dealer
              </label>


              <select
                value={dealer}
                onChange={(event) =>
                  setDealer(
                    event.target.value
                  )
                }
              >

                <option value="">
                  All Dealers
                </option>


                {filteredDealers.map(
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


          {/* BUTTON */}

          <div className="col-12 col-md-6 col-xl-auto">

            <button
              type="button"
              className="growth-view-btn"
              onClick={
                handleViewReport
              }
            >

              <i className="fa-solid fa-magnifying-glass"></i>

              View Report

            </button>

          </div>

        </div>

      </section>


      {/* =================================================
          GRAPH CARD
      ================================================= */}

      <section className="growth-chart-card">

        {/* TOP */}

        <div className="growth-chart-header">

          <div>

            <h3>
              Monthly Trading Growth
            </h3>


            <p>

              {appliedFilters.startDate}

              <span>
                to
              </span>

              {appliedFilters.endDate}

              <span className="growth-scope-dot">
                •
              </span>

              Scope:

              <strong>
                {scopeText}
              </strong>

            </p>

          </div>


          <div className="growth-chart-actions">

            {/* SEGMENT */}

            <div className="growth-segment-tabs">

              {[
                "Equity",
                "Future",
                "Option",
              ].map(
                (item) => (

                  <button
                    type="button"
                    key={item}
                    className={
                      segment === item
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSegment(
                        item
                      )
                    }
                  >
                    {item}
                  </button>

                )
              )}

            </div>


            {/* LEGEND */}

            <div className="growth-legend">

              <span></span>

              Monthly Volume

            </div>

          </div>

        </div>


        {/* =================================================
            CHART
        ================================================= */}

        <div className="growth-chart-container">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={graphData}
              margin={{
                top: 20,
                right: 24,
                bottom: 8,
                left: 8,
              }}
            >

              <defs>

                <linearGradient
                  id="growthFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#00be67"
                    stopOpacity={0.28}
                  />

                  <stop
                    offset="100%"
                    stopColor="#00be67"
                    stopOpacity={0.01}
                  />

                </linearGradient>

              </defs>


              <CartesianGrid
                strokeDasharray="4 4"
                stroke="rgba(130,180,185,.12)"
              />


              <XAxis
                dataKey="month"
                tick={{
                  fill: "#82969d",
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={{
                  stroke:
                    "rgba(135,185,190,.18)",
                }}
              />


              <YAxis
                domain={[
                  0,
                  60,
                ]}
                ticks={[
                  0,
                  15,
                  30,
                  45,
                  60,
                ]}
                tick={{
                  fill: "#82969d",
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  value === 0
                    ? "0"
                    : `${value.toFixed(
                        1
                      )}L`
                }
              />


              <Tooltip
                content={
                  <GrowthTooltip
                    segment={
                      segment
                    }
                  />
                }
                cursor={{
                  stroke:
                    "rgba(130,180,185,.28)",
                  strokeWidth: 1,
                }}
              />


              <Area
                type="monotone"
                dataKey="value"
                stroke="#00c17b"
                strokeWidth={3}
                fill="url(#growthFill)"
                activeDot={{
                  r: 7,
                  fill:
                    "#00c17b",
                  stroke:
                    "#061923",
                  strokeWidth:
                    3,
                }}
                dot={{
                  r: 5,
                  fill:
                    "#00c17b",
                  stroke:
                    "#061923",
                  strokeWidth:
                    2,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </section>

    </div>
  );
}


/* =====================================================
   TOOLTIP
===================================================== */

function GrowthTooltip({
  active,
  payload,
  label,
  segment,
}) {
  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }


  const value =
    payload[0]?.value ?? 0;


  return (
    <div className="growth-tooltip">

      <h4>
        {label}
      </h4>


      <div className="growth-tooltip-row">

        <span>
          {segment}
        </span>

        <strong>
          {value.toLocaleString(
            "en-IN"
          )}
        </strong>

      </div>

    </div>
  );
}


export default Growth;