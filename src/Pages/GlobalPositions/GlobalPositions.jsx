import React, {
  useEffect,
  useState,
} from "react";

import Pagination from "../../Components/Pagination/Pagination";

import "./GlobalPositions.css";

const positionData = [
  {
    id: 1,
    client: "Rahul Menon",
    clientCode: "RM10245",
    broker: "Alice Blue",
    symbol: "RELIANCE-EQ",
    exchange: "NSE",
    product: "INTRADAY",
    lotSize: 1,
    netQty: 25,
    buyPrice: 1455.5,
    sellPrice: 0,
    reason: "Open Position",
    ltp: 1468.25,
    pnl: 318.75,
  },

  {
    id: 2,
    client: "Arjun Nair",
    clientCode: "AN20981",
    broker: "IIFL",
    symbol: "INFY-EQ",
    exchange: "NSE",
    product: "DELIVERY",
    lotSize: 1,
    netQty: 30,
    buyPrice: 1480,
    sellPrice: 0,
    reason: "Open Position",
    ltp: 1492.4,
    pnl: 372,
  },

  {
    id: 3,
    client: "Nikhil Joseph",
    clientCode: "NJ40582",
    broker: "Alice Blue",
    symbol: "NIFTY26SEP25000CE",
    exchange: "NFO",
    product: "NORMAL",
    lotSize: 65,
    netQty: 65,
    buyPrice: 178,
    sellPrice: 0,
    reason: "Open Option Position",
    ltp: 186.5,
    pnl: 552.5,
  },

  {
    id: 4,
    client: "Faisal Ahmed",
    clientCode: "FA10892",
    broker: "IIFL",
    symbol: "BANKNIFTY26SEP54000CE",
    exchange: "NFO",
    product: "NORMAL",
    lotSize: 30,
    netQty: -30,
    buyPrice: 0,
    sellPrice: 325.4,
    reason: "Short Position",
    ltp: 318.2,
    pnl: 216,
  },

  {
    id: 5,
    client: "Sneha Pillai",
    clientCode: "SP98234",
    broker: "IIFL",
    symbol: "TATAMOTORS-EQ",
    exchange: "NSE",
    product: "INTRADAY",
    lotSize: 1,
    netQty: 50,
    buyPrice: 964.35,
    sellPrice: 0,
    reason: "Open Position",
    ltp: 958.1,
    pnl: -312.5,
  },
];

function GlobalPositions() {


const [positions, setPositions] =
  useState(positionData);

const [currentPage, setCurrentPage] =
  useState(1);

const itemsPerPage = 10;

const totalPages = Math.ceil(
  positions.length /
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

const startIndex =
  (currentPage - 1) *
  itemsPerPage;

const paginatedPositions =
  positions.slice(
    startIndex,
    startIndex + itemsPerPage
  );





  const summaryCards = [
    {
      title: "Total Clients",
      value: "284",
      subtitle: "Clients",
      icon: "fa-solid fa-user-group",
      type: "clients",
    },
    {
      title: "Broker Accounts",
      value: "263",
      subtitle: "Accounts",
      icon: "fa-solid fa-user-gear",
      type: "broker",
    },
    {
      title: "Success Accounts",
      value: "1,420",
      subtitle: "Accounts",
      icon: "fa-solid fa-user-check",
      type: "success",
    },
    {
      title: "Failed Accounts",
      value: "18",
      subtitle: "Accounts",
      icon: "fa-solid fa-user-xmark",
      type: "failed",
    },
  ];


  /* ================= EXIT POSITION ================= */

  const handleExit = (position) => {
    const confirmed = window.confirm(
      `Exit position for ${position.symbol}?`
    );

    if (!confirmed) {
      return;
    }

    setPositions((current) =>
      current.filter(
        (item) => item.id !== position.id
      )
    );
  };


  /* ================= ROLL OVER ================= */

  const handleRollOver = (position) => {
    alert(
      `Roll Over selected for ${position.symbol}`
    );
  };


  const formatMoney = (value) => {
    return `₹${Number(
      value || 0
    ).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };


  return (
    <div className="global-position-page">

      {/* ================= HEADING ================= */}

      <div className="global-position-heading">

        <div className="global-position-heading-icon">
          {/* <i className="fa-solid fa-chart-line"></i> */}
<i className="fa-solid fa-earth-europe"></i>        </div>

        <div>
          <h2>
            Global Positions
          </h2>

          <p>
            View open positions across all client accounts
          </p>
        </div>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="row g-3 global-position-summary">

        {summaryCards.map((card) => (

          <div
            className="col-12 col-md-6 col-xl-3"
            key={card.title}
          >

            <div
              className={`global-position-stat-card ${card.type}`}
            >

              <div className="global-position-stat-title">

                <span>
                  {card.title}
                </span>

                <i className={card.icon}></i>

              </div>


              <h3>
                {card.value}
              </h3>


              <small>
                {card.subtitle}
              </small>

            </div>

          </div>

        ))}

      </div>


      {/* ================= POSITION DETAILS ================= */}

      <div className="global-position-card">

        <div className="global-position-card-header">

          <div>
            <h4>
              Position Details
            </h4>

            <p>
              {positions.length} positions found
            </p>
          </div>


          <div className="global-position-updated">

            <span className="global-position-updated-dot"></span>

            Updated

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="global-position-table-wrap">

          <table className="global-position-table">

            <thead>
              <tr>
                <th>SL. NO.</th>
                <th>CLIENT</th>
                <th>BROKER</th>
                <th>SYMBOL</th>
                <th>EXCHANGE</th>
                <th>PRODUCT</th>
                <th>LOT SIZE</th>
                <th>NET QTY</th>
                <th>BUY PRICE</th>
                <th>SELL PRICE</th>
                <th>REASON</th>
                <th>LTP</th>
                <th>P&amp;L</th>
                <th>ACTION</th>
              </tr>
            </thead>


            <tbody>

             {paginatedPositions.map(
  (position, index) => (

                  <tr key={position.id}>

                    {/* SL NO */}

                    <td>
                      <span className="global-position-slno">
{startIndex + index + 1}                      </span>
                    </td>


                    {/* CLIENT */}

                    <td>

                      <div className="global-position-client">

                        <strong>
                          {position.client}
                        </strong>

                        <span>
                          {position.clientCode}
                        </span>

                      </div>

                    </td>


                    {/* BROKER */}

                    <td>
                      <span className="global-position-broker">
                        {position.broker}
                      </span>
                    </td>


                    {/* SYMBOL */}

                    <td className="global-position-symbol">
                      {position.symbol}
                    </td>


                    {/* EXCHANGE */}

                    <td>
                      <span
                        className={`global-position-exchange ${
                          position.exchange === "NFO"
                            ? "nfo"
                            : "nse"
                        }`}
                      >
                        {position.exchange}
                      </span>
                    </td>


                    {/* PRODUCT */}

                    <td>
                      {position.product}
                    </td>


                    {/* LOT SIZE */}

                    <td>
                      {position.lotSize}
                    </td>


                    {/* NET QTY */}

                    <td
                      className={
                        position.netQty >= 0
                          ? "global-position-positive-qty"
                          : "global-position-negative-qty"
                      }
                    >
                      {position.netQty}
                    </td>


                    {/* BUY PRICE */}

                    <td>
                      {position.buyPrice > 0
                        ? formatMoney(
                            position.buyPrice
                          )
                        : "-"}
                    </td>


                    {/* SELL PRICE */}

                    <td>
                      {position.sellPrice > 0
                        ? formatMoney(
                            position.sellPrice
                          )
                        : "-"}
                    </td>


                    {/* REASON */}

                    <td className="global-position-reason">
                      {position.reason}
                    </td>


                    {/* LTP */}

                    <td className="global-position-ltp">
                      {formatMoney(
                        position.ltp
                      )}
                    </td>


                    {/* P&L */}

                    <td
                      className={
                        position.pnl >= 0
                          ? "global-position-profit"
                          : "global-position-loss"
                      }
                    >
                      {position.pnl >= 0
                        ? "+"
                        : ""}

                      {formatMoney(
                        position.pnl
                      )}
                    </td>


                    {/* ACTION */}

                    <td>

                      <div className="global-position-actions">

                        {/* EXIT FOR ALL */}

                        <button
                          type="button"
                          className="global-position-exit-btn"
                          onClick={() =>
                            handleExit(position)
                          }
                        >
                          <i className="fa-solid fa-right-from-bracket"></i>

                          Exit
                        </button>


                        {/* ROLL OVER ONLY FOR NFO */}

                        {position.exchange ===
                          "NFO" && (

                          <button
                            type="button"
                            className="global-position-rollover-btn"
                            onClick={() =>
                              handleRollOver(
                                position
                              )
                            }
                          >
                            <i className="fa-solid fa-rotate"></i>

                            Roll Over
                          </button>

                        )}

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        {/* ================= FOOTER ================= */}

        {/* <div className="global-position-footer">

          <div className="global-position-result-text">
            Showing 1 to {positions.length} of 8,618 results
          </div>


          <div className="global-position-pagination">

            <button
              type="button"
              onClick={() =>
                setCurrentPage(1)
              }
            >
              <i className="fa-solid fa-angles-left"></i>
            </button>


            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(
                    1,
                    page - 1
                  )
                )
              }
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>


            {[1, 2, 3, 4, 5].map(
              (page) => (

                <button
                  type="button"
                  key={page}
                  className={
                    currentPage === page
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(
                      page
                    )
                  }
                >
                  {page}
                </button>

              )
            )}


            <span>
              ...
            </span>


            <button
              type="button"
              onClick={() =>
                setCurrentPage(
                  431
                )
              }
            >
              431
            </button>


            <button
              type="button"
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.min(
                      431,
                      page + 1
                    )
                )
              }
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>


            <button
              type="button"
              onClick={() =>
                setCurrentPage(
                  431
                )
              }
            >
              <i className="fa-solid fa-angles-right"></i>
            </button>

          </div>

        </div> */}
<div className="global-position-footer">

  <div className="global-position-result-text">
    Showing{" "}
    {positions.length === 0
      ? 0
      : startIndex + 1}{" "}
    to{" "}
    {Math.min(
      startIndex + itemsPerPage,
      positions.length
    )}{" "}
    of{" "}
    {positions.length}{" "}
    results
  </div>

  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />

</div>
      </div>

    </div>
  );
}

export default GlobalPositions;