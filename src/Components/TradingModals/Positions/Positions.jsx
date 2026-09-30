import React, { useState } from "react";
import "./Positions.css";

const demoPositionData = [
  {
    clientCode: "CL001",
    symbol: "RELIANCE-EQ",
    exchange: "NSE",
    product: "INTRADAY",
    qty: 20,
    avgPrice: 1245,
    ltp: 1277,
    pnl: 640,
  },
  {
    clientCode: "CL001",
    symbol: "IDEA-EQ",
    exchange: "NSE",
    product: "DELIVERY",
    qty: 100,
    avgPrice: 13.8,
    ltp: 14.33,
    pnl: 53,
  },
  {
    clientCode: "CL002",
    symbol: "HDFCAMC-EQ",
    exchange: "NSE",
    product: "DELIVERY",
    qty: 15,
    avgPrice: 2450,
    ltp: 2622.1,
    pnl: 2581.5,
  },
];

function Positions({
  show,
  onClose,
}) {
  const [clientCode, setClientCode] = useState("");
  const [stockName, setStockName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  if (!show) {
    return null;
  }

  const handleSearch = () => {
    const clientValue =
      clientCode.trim().toLowerCase();

    const stockValue =
      stockName.trim().toLowerCase();

    if (!clientValue && !stockValue) {
      setSearchResults([]);
      setSearched(false);
      return;
    }

    const filtered = demoPositionData.filter((item) => {
      const clientMatch =
        !clientValue ||
        item.clientCode
          .toLowerCase()
          .includes(clientValue);

      const stockMatch =
        !stockValue ||
        item.symbol
          .toLowerCase()
          .includes(stockValue);

      return clientMatch && stockMatch;
    });

    setSearchResults(filtered);
    setSearched(true);
  };

  const handleReset = () => {
    setClientCode("");
    setStockName("");
    setSearchResults([]);
    setSearched(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <div
      className="positions-overlay"
      onMouseDown={handleClose}
    >
      <div
        className="positions-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* ================= HEADER ================= */}

        <div className="positions-header">

          <div className="positions-title-wrap">

            <div className="positions-title-icon">
              <i className="fa-solid fa-chart-column"></i>
            </div>

            <div>
              <h3>Client Positions</h3>

              <p>
                Search by client code or stock name
              </p>
            </div>

          </div>

          <button
            type="button"
            className="positions-close-btn"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

        </div>


        {/* ================= FILTER ================= */}

        <div className="positions-filter-section">

          <div className="row g-3 align-items-end">

            <div className="col-12 col-md-4">

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
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

            </div>


            <div className="col-12 col-md-4">

              <label>
                Stock / Product
              </label>

              <input
                type="text"
                placeholder="Enter stock name"
                value={stockName}
                onChange={(event) =>
                  setStockName(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

            </div>


            <div className="col-12 col-md-4">

              <div className="positions-filter-actions">

                <button
                  type="button"
                  className="positions-search-btn"
                  onClick={handleSearch}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>

                  Search
                </button>

                <button
                  type="button"
                  className="positions-reset-btn"
                  onClick={handleReset}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

              </div>

            </div>

          </div>

          <p className="positions-help-text">
            Search using either client code or stock name.
          </p>

        </div>


        {/* ================= CONTENT ================= */}

        <div className="positions-content">

          {!searched && (
            <div className="positions-empty-state">

              <div className="positions-empty-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>

              <h4>
                Search positions
              </h4>

              <p>
                Enter a client code or stock name to view positions.
              </p>

            </div>
          )}


          {searched &&
            searchResults.length === 0 && (
              <div className="positions-empty-state">

                <div className="positions-empty-icon">
                  <i className="fa-regular fa-folder-open"></i>
                </div>

                <h4>
                  No positions found
                </h4>

                <p>
                  Try another client code or stock name.
                </p>

              </div>
            )}


          {searched &&
            searchResults.length > 0 && (

              <div className="positions-table-wrap">

                <table className="positions-table">

                  <thead>
                    <tr>
                      <th>CLIENT CODE</th>
                      <th>SYMBOL</th>
                      <th>EXCHANGE</th>
                      <th>PRODUCT</th>
                      <th>QTY</th>
                      <th>AVG PRICE</th>
                      <th>LTP</th>
                      <th>P&amp;L</th>
                    </tr>
                  </thead>

                  <tbody>

                    {searchResults.map(
                      (item, index) => (

                        <tr
                          key={`${item.clientCode}-${item.symbol}-${index}`}
                        >
                          <td>
                            {item.clientCode}
                          </td>

                          <td className="positions-symbol">
                            {item.symbol}
                          </td>

                          <td>
                            {item.exchange}
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
                              item.avgPrice
                            ).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>

                          <td>
                            ₹
                            {Number(
                              item.ltp
                            ).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </td>

                          <td
                            className={
                              item.pnl >= 0
                                ? "positions-profit"
                                : "positions-loss"
                            }
                          >
                            {item.pnl >= 0
                              ? "+"
                              : ""}

                            ₹
                            {Number(
                              item.pnl
                            ).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
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

export default Positions;