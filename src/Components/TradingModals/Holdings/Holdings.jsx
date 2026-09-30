import React, { useState } from "react";
import "./Holdings.css";

const demoHoldingData = [
  {
    clientCode: "CL001",
    symbol: "RELIANCE-EQ",
    exchange: "NSE",
    qty: 40,
    avgPrice: 1215.5,
    ltp: 1277,
    investedValue: 48620,
    currentValue: 51080,
    pnl: 2460,
  },
  {
    clientCode: "CL001",
    symbol: "IDEA-EQ",
    exchange: "NSE",
    qty: 200,
    avgPrice: 13.5,
    ltp: 14.33,
    investedValue: 2700,
    currentValue: 2866,
    pnl: 166,
  },
  {
    clientCode: "CL002",
    symbol: "HDFCAMC-EQ",
    exchange: "NSE",
    qty: 15,
    avgPrice: 2450,
    ltp: 2622.1,
    investedValue: 36750,
    currentValue: 39331.5,
    pnl: 2581.5,
  },
];

function Holdings({
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

    const filtered = demoHoldingData.filter((item) => {
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
      className="holdings-overlay"
      onMouseDown={handleClose}
    >
      <div
        className="holdings-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* ================= HEADER ================= */}

        <div className="holdings-header">

          <div className="holdings-title-wrap">

            <div className="holdings-title-icon">
              <i className="fa-solid fa-wallet"></i>
            </div>

            <div>
              <h3>Client Holdings</h3>

              <p>
                Search by client code or stock name
              </p>
            </div>

          </div>


          <button
            type="button"
            className="holdings-close-btn"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

        </div>


        {/* ================= FILTER ================= */}

        <div className="holdings-filter-section">

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
                  setClientCode(event.target.value)
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
                  setStockName(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

            </div>


            <div className="col-12 col-md-4">

              <div className="holdings-filter-actions">

                <button
                  type="button"
                  className="holdings-search-btn"
                  onClick={handleSearch}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>

                  Search
                </button>


                <button
                  type="button"
                  className="holdings-reset-btn"
                  onClick={handleReset}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

              </div>

            </div>

          </div>


          <p className="holdings-help-text">
            Search using either client code or stock name.
          </p>

        </div>


        {/* ================= CONTENT ================= */}

        <div className="holdings-content">

          {!searched && (
            <div className="holdings-empty-state">

              <div className="holdings-empty-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>

              <h4>
                Search holdings
              </h4>

              <p>
                Enter a client code or stock name to view holdings.
              </p>

            </div>
          )}


          {searched &&
            searchResults.length === 0 && (
              <div className="holdings-empty-state">

                <div className="holdings-empty-icon">
                  <i className="fa-regular fa-folder-open"></i>
                </div>

                <h4>
                  No holdings found
                </h4>

                <p>
                  Try another client code or stock name.
                </p>

              </div>
            )}


          {searched &&
            searchResults.length > 0 && (

              <div className="holdings-table-wrap">

                <table className="holdings-table">

                  <thead>
                    <tr>
                      <th>CLIENT CODE</th>
                      <th>SYMBOL</th>
                      <th>EXCHANGE</th>
                      <th>QTY</th>
                      <th>AVG PRICE</th>
                      <th>LTP</th>
                      <th>INVESTED VALUE</th>
                      <th>CURRENT VALUE</th>
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

                          <td className="holdings-symbol">
                            {item.symbol}
                          </td>

                          <td>
                            {item.exchange}
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

                          <td>
                            ₹
                            {Number(
                              item.investedValue
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
                              item.currentValue
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
                                ? "holdings-profit"
                                : "holdings-loss"
                            }
                          >
                            {item.pnl >= 0 ? "+" : ""}

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

export default Holdings;