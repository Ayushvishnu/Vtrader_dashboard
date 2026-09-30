import React, { useMemo, useState } from "react";
import "./VittalokhiDashboard.css";

const dashboardData = [
  {
    id: 1,
    client: "Rahul Menon",
    code: "RM10245",

    brokerBalance: 325000,
    deposit: 450000,

    equityValue: 458250,
    equityCount: 7,
    equityPnl: 28500,

    mtfBalance: 175000,
    mtfUsage: 42.5,
    perStockAmount: 64285.71,

    foValue: 185000,
    foCount: 3,
    foPnl: 12450,
  },

  {
    id: 2,
    client: "Nikhil Joseph",
    code: "NJ40582",

    brokerBalance: 410000,
    deposit: 520000,

    equityValue: 488000,
    equityCount: 9,
    equityPnl: -22000,

    mtfBalance: 225000,
    mtfUsage: 56.8,
    perStockAmount: 57777.78,

    foValue: 165000,
    foCount: 2,
    foPnl: -8400,
  },

  {
    id: 3,
    client: "Adithya Krishnan",
    code: "AK70123",

    brokerBalance: 525000,
    deposit: 675000,

    equityValue: 650000,
    equityCount: 11,
    equityPnl: -25000,

    mtfBalance: 310000,
    mtfUsage: 48.6,
    perStockAmount: 61363.64,

    foValue: 278000,
    foCount: 4,
    foPnl: 15750,
  },

  {
    id: 4,
    client: "Vishnu Krishnan",
    code: "VK38211",

    brokerBalance: 635000,
    deposit: 800000,

    equityValue: 748000,
    equityCount: 13,
    equityPnl: -52000,

    mtfBalance: 385000,
    mtfUsage: 61.2,
    perStockAmount: 61538.46,

    foValue: 425000,
    foCount: 7,
    foPnl: -22500,
  },

  {
    id: 5,
    client: "Anjali Nair",
    code: "AN78421",

    brokerBalance: 356000,
    deposit: 440000,

    equityValue: 452320,
    equityCount: 8,
    equityPnl: 22320,

    mtfBalance: 210000,
    mtfUsage: 39.8,
    perStockAmount: 55000,

    foValue: 255000,
    foCount: 4,
    foPnl: 13200,
  },

  {
    id: 6,
    client: "Mohammed Rafi",
    code: "MR90122",

    brokerBalance: 485000,
    deposit: 610000,

    equityValue: 598000,
    equityCount: 10,
    equityPnl: -12000,

    mtfBalance: 274000,
    mtfUsage: 52.4,
    perStockAmount: 61000,

    foValue: 330000,
    foCount: 5,
    foPnl: 14600,
  },
];

function VittalokhiDashboard() {
  const [clientSearch, setClientSearch] =
    useState("");

  const [positionSearch, setPositionSearch] =
    useState("");

  const [positionCount, setPositionCount] =
    useState(6);

  const [mismatchLimit, setMismatchLimit] =
    useState(3);

  const [positionFilter, setPositionFilter] =
    useState("ALL");

  const [mismatchFilter, setMismatchFilter] =
    useState("ALL");

  const [amountFilter, setAmountFilter] =
    useState(false);


  const formatMoney = (value) =>
    Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });


  const filteredData = useMemo(() => {
    return dashboardData.filter((item) => {
      const query =
        clientSearch.toLowerCase();

      const matchesClient =
        item.client
          .toLowerCase()
          .includes(query) ||
        item.code
          .toLowerCase()
          .includes(query);

      const matchesCountSearch =
        !positionSearch ||
        String(item.equityCount).includes(
          positionSearch
        );

      const totalCount =
        item.equityCount +
        item.foCount;

      const totalPnl =
        item.equityPnl +
        item.foPnl;

      const mismatchPercentage =
        item.deposit > 0
          ? Math.abs(
              (totalPnl /
                item.deposit) *
                100
            )
          : 0;

      let matchesPosition = true;

      if (positionFilter === "LOW") {
        matchesPosition =
          totalCount <= positionCount;
      }

      if (positionFilter === "HIGH") {
        matchesPosition =
          totalCount > positionCount;
      }


      let matchesMismatch = true;

      if (mismatchFilter === "LOW") {
        matchesMismatch =
          mismatchPercentage <=
          mismatchLimit;
      }

      if (mismatchFilter === "HIGH") {
        matchesMismatch =
          mismatchPercentage >
          mismatchLimit;
      }


      let matchesAmount = true;

      if (amountFilter) {
        matchesAmount =
          totalPnl < 0;
      }


      return (
        matchesClient &&
        matchesCountSearch &&
        matchesPosition &&
        matchesMismatch &&
        matchesAmount
      );
    });
  }, [
    clientSearch,
    positionSearch,
    positionCount,
    mismatchLimit,
    positionFilter,
    mismatchFilter,
    amountFilter,
  ]);


  const handleReset = () => {
    setClientSearch("");
    setPositionSearch("");

    setPositionCount(6);
    setMismatchLimit(3);

    setPositionFilter("ALL");
    setMismatchFilter("ALL");
    setAmountFilter(false);
  };


  return (
    <div className="vitta-million-dashboard">

      {/* ================= HEADER ================= */}

      <div className="million-dashboard-heading">

        <div className="million-dashboard-icon">
          <i className="fa-solid fa-chart-line"></i>
        </div>

        <div>
          <h2>
            Lokhi Dashboard
          </h2>

          <p>
            Monitor client holdings,
            deposits and positions
          </p>
        </div>

      </div>


      {/* ================= FILTER CARD ================= */}

      <div className="million-filter-card">

        <div className="row g-2 align-items-end">

          {/* CLIENT SEARCH */}

          <div className="col-12 col-md-6 col-xl">

            <label>
              Search by Client Code
            </label>

            <div className="million-search-input">

              <i className="fa-solid fa-magnifying-glass"></i>

              <input
                type="text"
                placeholder="Enter client code or name..."
                value={clientSearch}
                onChange={(event) =>
                  setClientSearch(
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* POSITION SEARCH */}

          <div className="col-12 col-md-6 col-xl">

            <label>
              Search by Position Count
            </label>

            <div className="million-search-input">

              <i className="fa-solid fa-magnifying-glass"></i>

              <input
                type="number"
                placeholder="Enter position count..."
                value={positionSearch}
                onChange={(event) =>
                  setPositionSearch(
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* POSITION COUNT */}

          <div className="col-12 col-md-4 col-xl">

            <label>
              Position Counts
            </label>

            <div className="million-number-field green">

              <i className="fa-solid fa-layer-group"></i>

              <input
                type="number"
                value={positionCount}
                onChange={(event) =>
                  setPositionCount(
                    Number(
                      event.target.value
                    )
                  )
                }
              />

            </div>

          </div>


          {/* MISMATCH */}

          <div className="col-12 col-md-4 col-xl">

            <label>
              Mismatch Limit (%)
            </label>

            <div className="million-percent-field">

              <input
                type="number"
                value={mismatchLimit}
                onChange={(event) =>
                  setMismatchLimit(
                    Number(
                      event.target.value
                    )
                  )
                }
              />

              <span>
                %
              </span>

            </div>

          </div>


          {/* APPLY */}

          <div className="col-8 col-md-3 col-xl-auto">

            <button
              type="button"
              className="million-apply-btn"
            >
              Apply
            </button>

          </div>


          {/* RESET */}

          <div className="col-4 col-md-auto">

            <button
              type="button"
              className="million-reset-btn"
              onClick={handleReset}
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>

          </div>

        </div>

      </div>


      {/* ================= QUICK FILTERS ================= */}

      <div className="row g-3 million-filter-panels">

        {/* POSITION COUNT */}

        <div className="col-12 col-lg-4">

          <div className="million-filter-panel position">

            <div className="million-filter-panel-heading">

              <div>
                <h4>
                  <i className="fa-solid fa-layer-group"></i>

                  Position Count
                </h4>

                <p>
                  Filter using position count
                </p>
              </div>

            </div>


            <div className="million-two-filter-buttons">

              <button
                type="button"
                className={
                  positionFilter ===
                  "LOW"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPositionFilter(
                    "LOW"
                  )
                }
              >
                ≤ {positionCount}
              </button>

              <button
                type="button"
                className={
                  positionFilter ===
                  "HIGH"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setPositionFilter(
                    "HIGH"
                  )
                }
              >
                &gt; {positionCount}
              </button>

            </div>

          </div>

        </div>


        {/* MISMATCH */}

        <div className="col-12 col-lg-4">

          <div className="million-filter-panel mismatch">

            <div className="million-filter-panel-heading">

              <div>
                <h4>
                  <i className="fa-solid fa-percent"></i>

                  Mismatch Percentage
                </h4>

                <p>
                  Filter using mismatch limit
                </p>
              </div>

            </div>


            <div className="million-two-filter-buttons">

              <button
                type="button"
                className={
                  mismatchFilter ===
                  "LOW"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setMismatchFilter(
                    "LOW"
                  )
                }
              >
                ≤ {mismatchLimit}%
              </button>

              <button
                type="button"
                className={
                  mismatchFilter ===
                  "HIGH"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setMismatchFilter(
                    "HIGH"
                  )
                }
              >
                &gt; {mismatchLimit}%
              </button>

            </div>

          </div>

        </div>


        {/* MISMATCH AMOUNT */}

        <div className="col-12 col-lg-4">

          <div className="million-filter-panel amount">

            <div className="million-filter-panel-heading">

              <div>
                <h4>
                  <i className="fa-solid fa-arrow-trend-down"></i>

                  Mismatch Amount
                </h4>

                <p>
                  Show negative mismatch values
                </p>
              </div>

            </div>


            <button
              type="button"
              className={`million-single-filter ${
                amountFilter
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setAmountFilter(
                  (current) =>
                    !current
                )
              }
            >
              Mismatch Amount &lt; 0
            </button>

          </div>

        </div>

      </div>


      {/* ================= TABLE ================= */}

      <div className="million-table-card">

        <div className="million-table-wrap">

          <table className="million-dashboard-table">

            <thead>

              <tr>

                <th>
                  SL.NO
                </th>

                <th>
                  CLIENT CODE
                </th>

                <th>
                  BROKER AVAILABLE BALANCE
                </th>

                <th>
                  SUM OF DEPOSIT
                </th>


                {/* EQUITY GROUP */}

                <th className="equity-column">
                  EQUITY POSITION VALUE
                </th>

                <th className="equity-column">
                  EQUITY POSITION COUNT
                </th>

                <th className="equity-column">
                  EQUITY TOTAL P&amp;L
                </th>


                <th>
                  MTF AVAILABLE BALANCE
                </th>

                <th>
                  MTF USAGE %
                </th>

                <th>
                  PER STOCK AMOUNT
                </th>


                {/* F&O GROUP */}

                <th className="fo-column">
                  F&amp;O POSITION VALUE
                </th>

                <th className="fo-column">
                  F&amp;O POSITION COUNT
                </th>

                <th className="fo-column">
                  F&amp;O P&amp;L
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredData.map(
                (item, index) => (

                  <tr key={item.id}>

                    <td>

                      <span className="million-slno">
                        {index + 1}
                      </span>

                    </td>


                    <td>

                      <div className="million-client">

                        <strong>
                          {item.client}
                        </strong>

                        <span>
                          {item.code}
                        </span>

                      </div>

                    </td>


                    <td>
                      ₹
                      {formatMoney(
                        item.brokerBalance
                      )}
                    </td>


                    <td>
                      ₹
                      {formatMoney(
                        item.deposit
                      )}
                    </td>


                    {/* EQUITY */}

                    <td className="equity-column">
                      ₹
                      {formatMoney(
                        item.equityValue
                      )}
                    </td>

                    <td className="equity-column equity-count">
                      {item.equityCount}
                    </td>

                    <td
                      className={`equity-column pnl-cell ${
                        item.equityPnl >= 0
                          ? "profit"
                          : "loss"
                      }`}
                    >
                      {item.equityPnl >= 0
                        ? "+"
                        : ""}

                      ₹
                      {formatMoney(
                        item.equityPnl
                      )}
                    </td>


                    {/* MTF */}

                    <td>
                      ₹
                      {formatMoney(
                        item.mtfBalance
                      )}
                    </td>

                    <td>
                      {item.mtfUsage}%
                    </td>

                    <td>
                      ₹
                      {formatMoney(
                        item.perStockAmount
                      )}
                    </td>


                    {/* F&O */}

                    <td className="fo-column">
                      ₹
                      {formatMoney(
                        item.foValue
                      )}
                    </td>

                    <td className="fo-column fo-count">
                      {item.foCount}
                    </td>

                    <td
                      className={`fo-column pnl-cell ${
                        item.foPnl >= 0
                          ? "profit"
                          : "loss"
                      }`}
                    >
                      {item.foPnl >= 0
                        ? "+"
                        : ""}

                      ₹
                      {formatMoney(
                        item.foPnl
                      )}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        {/* FOOTER */}

        <div className="million-table-footer">

          <span>
            Showing {filteredData.length} results
          </span>


          <div className="million-pagination">

            <button>
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button className="active">
              1 of 1
            </button>

            <button>
              <i className="fa-solid fa-chevron-right"></i>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default VittalokhiDashboard;