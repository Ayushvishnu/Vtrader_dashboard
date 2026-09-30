import React, { useState } from "react";
import "./TradeBook.css";

const demoTradeBookData = [
  {
    id: 1,
    clientCode: "CL001",
    orderId: "TRD10001",
    symbol: "RELIANCE-EQ",
    exchange: "NSE",
    side: "BUY",
    product: "INTRADAY",
    qty: 10,
    price: 1265.5,
    time: "10:14:22 AM",
  },
  {
    id: 2,
    clientCode: "CL001",
    orderId: "TRD10002",
    symbol: "IDEA-EQ",
    exchange: "NSE",
    side: "SELL",
    product: "DELIVERY",
    qty: 50,
    price: 14.4,
    time: "11:20:18 AM",
  },
  {
    id: 3,
    clientCode: "CL002",
    orderId: "TRD10003",
    symbol: "HDFCAMC-EQ",
    exchange: "NSE",
    side: "BUY",
    product: "DELIVERY",
    qty: 15,
    price: 2598.25,
    time: "12:05:44 PM",
  },
];

function TradeBook({
  show,
  onClose,
}) {
  const [clientCode, setClientCode] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  if (!show) {
    return null;
  }

  const handleSearch = () => {
    const value =
      clientCode.trim().toLowerCase();

    if (!value) {
      setSearchResults([]);
      setSearched(false);
      return;
    }

    const filtered =
      demoTradeBookData.filter(
        (item) =>
          item.clientCode
            .toLowerCase()
            .includes(value)
      );

    setSearchResults(filtered);
    setSearched(true);
  };

  const handleReset = () => {
    setClientCode("");
    setSearchResults([]);
    setSearched(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <div
      className="tradebook-overlay"
      onMouseDown={handleClose}
    >
      <div
        className="tradebook-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* ================= HEADER ================= */}

        <div className="tradebook-header">

          <div className="tradebook-title-wrap">

            <div className="tradebook-title-icon">
              <i className="fa-solid fa-table-list"></i>
            </div>

            <div>
              <h3>
                Client Trade Book
              </h3>

              <p>
                Search completed trades by client code
              </p>
            </div>

          </div>


          <button
            type="button"
            className="tradebook-close-btn"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

        </div>


        {/* ================= FILTER ================= */}

        <div className="tradebook-filter-section">

          <div className="row g-3 align-items-end">

            <div className="col-12 col-md-7">

              <label>
                Client Code
              </label>

              <input
                type="text"
                placeholder="Enter client code"
                value={clientCode}
                onChange={(event) =>
                  setClientCode(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter"
                  ) {
                    handleSearch();
                  }
                }}
              />

            </div>


            <div className="col-12 col-md-5">

              <div className="tradebook-filter-actions">

                <button
                  type="button"
                  className="tradebook-search-btn"
                  onClick={handleSearch}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>

                  Search
                </button>


                <button
                  type="button"
                  className="tradebook-reset-btn"
                  onClick={handleReset}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

              </div>

            </div>

          </div>


          <p className="tradebook-help-text">
            Enter a client code to view completed trades.
          </p>

        </div>


        {/* ================= CONTENT ================= */}

        <div className="tradebook-content">

          {!searched && (
            <div className="tradebook-empty-state">

              <div className="tradebook-empty-icon">
                <i className="fa-solid fa-receipt"></i>
              </div>

              <h4>
                Search trade book
              </h4>

              <p>
                Enter a client code to view completed trades.
              </p>

            </div>
          )}


          {searched &&
            searchResults.length === 0 && (
              <div className="tradebook-empty-state">

                <div className="tradebook-empty-icon">
                  <i className="fa-regular fa-folder-open"></i>
                </div>

                <h4>
                  No trades found
                </h4>

                <p>
                  No completed trades found for this client.
                </p>

              </div>
            )}


          {searched &&
            searchResults.length > 0 && (

              <div className="tradebook-table-wrap">

                <table className="tradebook-table">

                  <thead>
                    <tr>
                      <th>SL. NO.</th>
                      <th>ORDER ID</th>
                      <th>CLIENT CODE</th>
                      <th>SYMBOL</th>
                      <th>EXCHANGE</th>
                      <th>SIDE</th>
                      <th>PRODUCT</th>
                      <th>QTY</th>
                      <th>PRICE</th>
                      <th>TIME</th>
                    </tr>
                  </thead>

                  <tbody>

                    {searchResults.map(
                      (item, index) => (

                        <tr key={item.id}>

                          <td>
                            <span className="tradebook-slno">
                              {index + 1}
                            </span>
                          </td>


                          <td className="tradebook-order-id">
                            {item.orderId}
                          </td>


                          <td>
                            {item.clientCode}
                          </td>


                          <td className="tradebook-symbol">
                            {item.symbol}
                          </td>


                          <td>
                            {item.exchange}
                          </td>


                          <td
                            className={
                              item.side === "BUY"
                                ? "tradebook-buy"
                                : "tradebook-sell"
                            }
                          >
                            {item.side}
                          </td>


                          <td>
                            {item.product}
                          </td>


                          <td>
                            {item.qty}
                          </td>


                          <td>
                            ₹
                            {Number(
                              item.price
                            ).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>


                          <td>
                            {item.time}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

        </div>

      </div>
    </div>
  );
}

export default TradeBook;