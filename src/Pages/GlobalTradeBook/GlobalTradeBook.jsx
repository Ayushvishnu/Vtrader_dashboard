import React, {
  useEffect,
  useState,
} from "react";

import Pagination from "../../Components/Pagination/Pagination";

import "./GlobalTradeBook.css";

const tradeData = [
  {
    id: 1,
    client: "Ahmed Zain",
    clientCode: "REM10051",
    broker: "IIFL",
    symbol: "TATAPOWER-EQ",
    company: "TATA POWER CO LTD",
    exchange: "NSE",
    type: "EQUITY",
    side: "SELL",
    quantity: 1,
    price: 349.95,
    value: 349.95,
  },
  {
    id: 2,
    client: "Ahmed Zain",
    clientCode: "REM10054",
    broker: "IIFL",
    symbol: "TATAPOWER-EQ",
    company: "TATA POWER CO LTD",
    exchange: "NSE",
    type: "EQUITY",
    side: "BUY",
    quantity: 1,
    price: 349.95,
    value: 349.95,
  },
  {
    id: 3,
    client: "Ahmed Zain",
    clientCode: "REM10054",
    broker: "IIFL",
    symbol: "TATAPOWER-EQ",
    company: "TATA POWER CO LTD",
    exchange: "NSE",
    type: "EQUITY",
    side: "SELL",
    quantity: 1,
    price: 349.95,
    value: 349.95,
  },
  {
    id: 4,
    client: "Ahmed Zain",
    clientCode: "REM10054",
    broker: "IIFL",
    symbol: "TATAPOWER-EQ",
    company: "TATA POWER CO LTD",
    exchange: "NSE",
    type: "EQUITY",
    side: "BUY",
    quantity: 1,
    price: 349.95,
    value: 349.95,
  },
  {
    id: 5,
    client: "Ahmed Zain",
    clientCode: "REM10054",
    broker: "IIFL",
    symbol: "TATAPOWER-EQ",
    company: "TATA POWER CO LTD",
    exchange: "NSE",
    type: "EQUITY",
    side: "SELL",
    quantity: 1,
    price: 349.95,
    value: 349.95,
  },
];

function GlobalTradeBook() {
  const [currentPage, setCurrentPage] = useState(1);


const itemsPerPage = 10;

const totalPages = Math.ceil(
  tradeData.length /
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

const paginatedTrades =
  tradeData.slice(
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
    {
      title: "Total Trades",
      value: "4",
      subtitle: "Traders",
      icon: "fa-solid fa-users",
      type: "trades",
    },
  ];

  return (
    <div className="global-tradebook-page">

      {/* ================= HEADER ================= */}

      <div className="global-tradebook-heading">

        <div className="global-tradebook-heading-icon">
          <i className="fa-solid fa-arrow-trend-up"></i>
          {/* <i class="fa-solid fa-book-atlas"></i> */}
        </div>

        <div>
          <h2>Global TradeBook</h2>

          <p>
            View trades across all client accounts
          </p>
        </div>

      </div>


      {/* ================= SUMMARY CARDS ================= */}

      <div className="row g-3 global-tradebook-summary">

        {summaryCards.map((card) => (
          <div
            className="col-12 col-md-6 col-xl"
            key={card.title}
          >
            <div
              className={`global-tradebook-stat-card ${card.type}`}
            >

              <div>

                <div className="global-tradebook-stat-title">
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
          </div>
        ))}

      </div>


      {/* ================= TRADE DETAILS CARD ================= */}

      <div className="global-tradebook-card">

        {/* HEADER */}

        <div className="global-tradebook-card-header">

          <div>
            <h4>
              Trade Details
            </h4>

            <p>
              {tradeData.length} trades found
            </p>
          </div>


          <div className="global-tradebook-updated">

            <span className="global-updated-dot"></span>

            Updated

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="global-tradebook-table-wrap">

          <table className="global-tradebook-table">

            <thead>
              <tr>
                <th>SL. NO.</th>
                <th>Client</th>
                <th>Broker</th>
                <th>Symbol</th>
                <th>Company</th>
                <th>Exchange</th>
                <th>Type</th>
                <th>Side</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Value</th>
              </tr>
            </thead>


            <tbody>

{paginatedTrades.map(
  (trade, index) => (
                <tr key={trade.id}>

                  {/* SL NO */}

                  <td>
                    <span className="global-tradebook-slno">
                     {startIndex + index + 1}
                    </span>
                  </td>


                  {/* CLIENT */}

                  <td>

                    <div className="global-tradebook-client">

                      <strong>
                        {trade.client}
                      </strong>

                      <span>
                        {trade.clientCode}
                      </span>

                    </div>

                  </td>


                  {/* BROKER */}

                  <td>

                    <span className="global-tradebook-broker">
                      {trade.broker}
                    </span>

                  </td>


                  {/* SYMBOL */}

                  <td className="global-tradebook-symbol">
                    {trade.symbol}
                  </td>


                  {/* COMPANY */}

                  <td>
                    {trade.company}
                  </td>


                  {/* EXCHANGE */}

                  <td>
                    {trade.exchange}
                  </td>


                  {/* TYPE */}

                  <td>
                    {trade.type}
                  </td>


                  {/* SIDE */}

                  <td
                    className={
                      trade.side === "BUY"
                        ? "global-tradebook-buy"
                        : "global-tradebook-sell"
                    }
                  >
                    {trade.side}
                  </td>


                  {/* QUANTITY */}

                  <td>
                    {trade.quantity}
                  </td>


                  {/* PRICE */}

                  <td>
                    ₹
                    {Number(
                      trade.price
                    ).toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </td>


                  {/* VALUE */}

                  <td className="global-tradebook-value">
                    ₹
                    {Number(
                      trade.value
                    ).toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* ================= FOOTER ================= */}

        {/* <div className="global-tradebook-footer">

          <div className="global-tradebook-result-text">
            Showing 1 to 20 of 8,618 results
          </div>


          <div className="global-tradebook-pagination">

            <button
              type="button"
              title="First Page"
            >
              <i className="fa-solid fa-angles-left"></i>
            </button>


            <button
              type="button"
              title="Previous Page"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>


            {[1, 2, 3, 4, 5].map((page) => (

              <button
                type="button"
                key={page}
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>

            ))}


            <span className="global-tradebook-dots">
              ...
            </span>


            <button
              type="button"
              onClick={() =>
                setCurrentPage(431)
              }
              className={
                currentPage === 431
                  ? "active"
                  : ""
              }
            >
              431
            </button>


            <button
              type="button"
              title="Next Page"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(431, page + 1)
                )
              }
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>


            <button
              type="button"
              title="Last Page"
              onClick={() =>
                setCurrentPage(431)
              }
            >
              <i className="fa-solid fa-angles-right"></i>
            </button>

          </div>

        </div> */}





<div className="global-tradebook-footer">

  <div className="global-tradebook-result-text">
    Showing{" "}
    {tradeData.length === 0
      ? 0
      : startIndex + 1}{" "}
    to{" "}
    {Math.min(
      startIndex + itemsPerPage,
      tradeData.length
    )}{" "}
    of{" "}
    {tradeData.length}{" "}
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

export default GlobalTradeBook;