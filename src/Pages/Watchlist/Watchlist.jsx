import React, { useEffect, useState } from "react";

import Pagination from "../../Components/Pagination/Pagination";
import OrderModal from "../../Components/TradingModals/OrderModal/OrderModal";
import PendingModal from "../../Components/TradingModals/PendingModal/PendingModal";
import Positions from "../../Components/TradingModals/Positions/Positions";
import Holdings from "../../Components/TradingModals/Holdings/Holdings";
import GlobalFund from "../../Components/TradingModals/GlobalFund/GlobalFund";
import TradeBook from "../../Components/TradingModals/TradeBook/TradeBook";
import ActivityLogs from "../../Components/TradingModals/ActivityLogs/ActivityLogs";
import "./Watchlist.css";

import Swal from "sweetalert2";

const initialWatchlistData = [
  {
    id: 1,
    symbol: "IDEA-EQ",
    exchange: "NSE",
    instrument: "EQ",
    ltp: "14.33",
  },
  {
    id: 2,
    symbol: "HDFCAMC-EQ",
    exchange: "NSE",
    instrument: "EQ",
    ltp: "2622.1",
  },
  {
    id: 3,
    symbol: "RELIANCE-EQ",
    exchange: "NSE",
    instrument: "EQ",
    ltp: "1277",
  },
  {
    id: 4,
    symbol: "NIFTY01SEP2624500CE",
    exchange: "NFO",
    instrument: "OPTIDX",
    ltp: "2.7",
  },
  {
    id: 5,
    symbol: "FINNIFTY28SEP2624500CE",
    exchange: "NFO",
    instrument: "OPTIDX",
    ltp: "2709.3",
  },
  {
    id: 6,
    symbol: "MITTAL-EQ",
    exchange: "NSE",
    instrument: "EQ",
    ltp: "0.82",
  },
  {
    id: 7,
    symbol: "YESBANK-EQ",
    exchange: "NSE",
    instrument: "EQ",
    ltp: "22.83",
  },
  {
    id: 8,
    symbol: "NIFTY01SEP2625000PE",
    exchange: "BFO",
    instrument: "OPTIDX",
    ltp: "502.85",
  },
  {
    id: 9,
    symbol: "NIFTY01SEP2625000PY",
    exchange: "BFO",
    instrument: "OPTIDX",
    ltp: "508.85",
  },
];

const stockOptions = ["BANKNIFTY", "NIFTY", "SBIN", "TCS"];

const expiryOptions = [
  "24 SEP 2026",
  "01 OCT 2026",
  "08 OCT 2026",
  "29 OCT 2026",
];

const strikeOptions = ["5300", "5400", "5500", "67800", "68000", "68500"];

function Watchlist() {

  const [currentPage, setCurrentPage] =
  useState(1);

const itemsPerPage = 10;

  const [search, setSearch] = useState("");
  const [exchange, setExchange] = useState("ALL");
  const [instrument, setInstrument] = useState("ALL");

  const [addExchange, setAddExchange] = useState("");

  const [addInstrument, setAddInstrument] = useState("");

  const [addStock, setAddStock] = useState("");

  const [addExpiry, setAddExpiry] = useState("");

  const [addStrike, setAddStrike] = useState("");

  const [addOptionType, setAddOptionType] = useState("");

  const [selectedStock, setSelectedStock] = useState(null);

  const [activeModal, setActiveModal] = useState(null);

  const [orderSide, setOrderSide] = useState("BUY");
  const [deleteStock, setDeleteStock] = useState(null);

  const [watchlistData, setWatchlistData] = useState(initialWatchlistData);

  const handleDeleteStock = () => {
    if (!deleteStock) {
      return;
    }

    setWatchlistData((currentStocks) =>
      currentStocks.filter((item) => item.id !== deleteStock.id),
    );

    if (selectedStock?.id === deleteStock.id) {
      setSelectedStock(null);
    }

    setDeleteStock(null);
  };

  const resetAddStockFields = () => {
    setAddExchange("");
    setAddInstrument("");
    setAddStock("");
    setAddExpiry("");
    setAddStrike("");
    setAddOptionType("");
  };
  const handleAddStock = () => {
    if (!addExchange) {
      Swal.fire({
        icon: "warning",
        title: "Select Exchange",
        text: "Please select an exchange first.",
        background: "#061923",
        color: "#ffffff",
        confirmButtonColor: "#00b985",
      });

      return;
    }

    if (!addInstrument) {
      Swal.fire({
        icon: "warning",
        title: "Select Instrument",
        text: "Please select an instrument.",
        background: "#061923",
        color: "#ffffff",
        confirmButtonColor: "#00b985",
      });

      return;
    }

    if (!addStock) {
      Swal.fire({
        icon: "warning",
        title: "Select Stock",
        text: "Please select a stock.",
        background: "#061923",
        color: "#ffffff",
        confirmButtonColor: "#00b985",
      });

      return;
    }

    if (!addExpiry) {
      Swal.fire({
        icon: "warning",
        title: "Select Expiry",
        text: "Please select an expiry date.",
        background: "#061923",
        color: "#ffffff",
        confirmButtonColor: "#00b985",
      });

      return;
    }

    if (!addStrike) {
      Swal.fire({
        icon: "warning",
        title: "Select Strike",
        text: "Please select a strike price.",
        background: "#061923",
        color: "#ffffff",
        confirmButtonColor: "#00b985",
      });

      return;
    }

    if (!addOptionType) {
      Swal.fire({
        icon: "warning",
        title: "Select CE / PE",
        text: "Please select CE or PE.",
        background: "#061923",
        color: "#ffffff",
        confirmButtonColor: "#00b985",
      });

      return;
    }

    const [day, month, year] = addExpiry.split(" ");

    const expiryCode = `${day}${month}${year.slice(-2)}`;

    const generatedSymbol = `${addStock}${expiryCode}${addStrike}${addOptionType}`;

    const newStock = {
      id: Date.now(),

      symbol: generatedSymbol,

      exchange: addExchange,

      instrument: addInstrument,

      ltp: "0.00",
    };

    setWatchlistData((currentStocks) => [newStock, ...currentStocks]);

    Swal.fire({
      icon: "success",
      title: "Stock Added",
      html: `
      <strong style="color:#00d99a">
        ${generatedSymbol}
      </strong>
      <br/>
      <span style="color:#9eb0b8">
        Added to watchlist successfully.
      </span>
    `,
      background: "#061923",
      color: "#ffffff",
      confirmButtonColor: "#00b985",
    });

    setAddExchange("");
    setAddInstrument("");
    setAddStock("");
    setAddExpiry("");
    setAddStrike("");
    setAddOptionType("");
  };

  const getExpiryCode = (expiry) => {
    const [day, month, year] = expiry.split(" ");

    return `${day}${month}${year.slice(-2)}`;
  };

  /* ================= FILTER ================= */

  const filteredData = watchlistData.filter((item) => {
    const matchesSearch = item.symbol
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesExchange = exchange === "ALL" || item.exchange === exchange;

    const matchesInstrument =
      instrument === "ALL" || item.instrument === instrument;

    return matchesSearch && matchesExchange && matchesInstrument;
  });



const totalPages = Math.ceil(
  filteredData.length /
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

const paginatedData =
  filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );


  /* ================= OPEN ORDER ================= */

  const openOrderModal = (side, stockItem = selectedStock) => {
    if (!stockItem) {
      return;
    }

    setSelectedStock(stockItem);
    setOrderSide(side);
    setActiveModal("order");
  };

  /* ================= CLOSE ================= */

  const closeModal = () => {
    setActiveModal(null);
  };

  /* ================= HOT KEYS ================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      const tagName = event.target.tagName?.toLowerCase();

      const isTyping =
        tagName === "input" || tagName === "textarea" || tagName === "select";

      if (event.key === "Escape") {
        setActiveModal(null);
        return;
      }

      if (isTyping) {
        return;
      }

      if (event.key === "F1") {
        event.preventDefault();

        openOrderModal("BUY");
      }

      if (event.key === "F2") {
        event.preventDefault();

        openOrderModal("SELL");
      }

      if (event.key === "F3") {
        event.preventDefault();
        setActiveModal("pending");
      }
      if (event.key === "F4") {
        event.preventDefault();
        setActiveModal("positions");
      }

      if (event.key === "F5") {
        event.preventDefault();
        setActiveModal("holdings");
      }

      if (event.key === "F6") {
        event.preventDefault();
        setActiveModal("globalFund");
      }

      if (event.key === "F8") {
        event.preventDefault();
        setActiveModal("tradeBook");
      }

      if (event.key === "F10") {
        event.preventDefault();
        setActiveModal("activityLogs");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedStock]);

  return (
    <div className="watchlist-page">
      {/* ================= HEADER ================= */}

      <div className="watchlist-page-header">
        <div className="watchlist-title-wrap">
          <div className="watchlist-title-icon">
            <i className="fa-solid fa-layer-group"></i>
          </div>

          <div>
            <h2>Watchlist</h2>

            <p>Create and manage your watchlist</p>
          </div>
        </div>

        <div className="watchlist-header-note">
          <i className="fa-solid fa-sparkles"></i>

          <div>
            <strong>Opportunities don't happen.</strong>

            <span>You create them.</span>
          </div>
        </div>
      </div>

      {/* ================= TABLE CARD ================= */}

      <div className="watchlist-card">
        {/* ================= TOOLBAR ================= */}

        <div className="watchlist-toolbar">
          <div className="watchlist-filters">
            {/* SEARCH EXISTING WATCHLIST */}

            <div className="watchlist-search">
              <i className="fa-solid fa-magnifying-glass"></i>

              <input
                type="text"
                placeholder="Search Symbol"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            {/* 1. EXCHANGE */}

            <select
              value={addExchange}
              onChange={(event) => {
                setAddExchange(event.target.value);

                setAddInstrument("");
                setAddStock("");
                setAddExpiry("");
                setAddStrike("");
                setAddOptionType("");
              }}
            >
              <option value="">Select Exchange</option>

              <option value="NSE">NSE</option>

              <option value="NFO">NFO</option>

              <option value="BFO">BFO</option>
            </select>

            {/* 2. INSTRUMENT */}

            {addExchange && (
              <select
                value={addInstrument}
                onChange={(event) => {
                  setAddInstrument(event.target.value);

                  setAddStock("");
                  setAddExpiry("");
                  setAddStrike("");
                  setAddOptionType("");
                }}
              >
                <option value="">Select Instrument</option>

                <option value="EQ">EQ</option>

                <option value="OPTIDX">OPTIDX</option>
              </select>
            )}

            {/* 3. STOCK */}

            {addInstrument && (
              <select
                value={addStock}
                onChange={(event) => {
                  setAddStock(event.target.value);

                  setAddExpiry("");
                  setAddStrike("");
                  setAddOptionType("");
                }}
              >
                <option value="">Select Stock</option>

                <option value="BANKNIFTY">BANKNIFTY</option>

                <option value="NIFTY">NIFTY</option>

                <option value="SBIN">SBIN</option>

                <option value="TCS">TCS</option>
              </select>
            )}

            {/* 4. EXPIRY */}

            {addStock && (
              <select
                value={addExpiry}
                onChange={(event) => {
                  setAddExpiry(event.target.value);

                  setAddStrike("");
                  setAddOptionType("");
                }}
              >
                <option value="">Select Expiry</option>

                <option value="24 SEP 2026">24 SEP 2026</option>

                <option value="01 OCT 2026">01 OCT 2026</option>

                <option value="08 OCT 2026">08 OCT 2026</option>

                <option value="29 OCT 2026">29 OCT 2026</option>
              </select>
            )}

            {/* 5. STRIKE */}

            {addExpiry && (
              <select
                value={addStrike}
                onChange={(event) => {
                  setAddStrike(event.target.value);

                  setAddOptionType("");
                }}
              >
                <option value="">Select Strike</option>

                <option value="5300">5300</option>

                <option value="5400">5400</option>

                <option value="5500">5500</option>

                <option value="67800">67800</option>

                <option value="68000">68000</option>
              </select>
            )}

            {/* 6. CE / PE */}

            {addStrike && (
              <select
                value={addOptionType}
                onChange={(event) => setAddOptionType(event.target.value)}
              >
                <option value="">Select CE / PE</option>

                <option value="CE">CE</option>

                <option value="PE">PE</option>
              </select>
            )}
          </div>

          {/* ================= ADD STOCK ================= */}

          <button
            type="button"
            className="watchlist-add-btn"
            onClick={handleAddStock}
          >
            <i className="fa-solid fa-plus"></i>
            Add Stock
          </button>
        </div>

        {/* ================= TABLE ================= */}

        <div className="watchlist-table-wrap">
          <table className="watchlist-table">
            <thead>
              <tr>
                <th></th>

                <th>SL. NO.</th>

                <th>SYMBOL</th>

                <th>EXCHANGE</th>

                <th>INSTRUMENT</th>

                <th>LTP</th>

                <th className="watchlist-action-heading">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
{paginatedData.map((item, index) => (
                  <tr
                  key={item.id}
                  onClick={() => setSelectedStock(item)}
                  className={
                    selectedStock?.id === item.id
                      ? "watchlist-selected-row"
                      : ""
                  }
                >
                  {/* SELECTION */}

                  <td>
                    <span
                      className={`watchlist-row-selector ${
                        selectedStock?.id === item.id ? "active" : ""
                      }`}
                    ></span>
                  </td>

                  {/* SL NO */}

                  <td>
                    <span className="watchlist-slno">  {startIndex + index + 1}
</span>
                  </td>

                  {/* SYMBOL */}

                  <td className="watchlist-symbol">{item.symbol}</td>

                  {/* EXCHANGE */}

                  <td className="watchlist-muted">{item.exchange}</td>

                  {/* INSTRUMENT */}

                  <td className="watchlist-muted">{item.instrument}</td>

                  {/* LTP */}

                  <td className="watchlist-ltp">₹{item.ltp}</td>

                  {/* ACTIONS */}

                  <td>
                    <div className="watchlist-actions">
                      {/* BUY */}

                      <button
                        type="button"
                        className="watchlist-action-btn buy"
                        title="Buy"
                        onClick={(event) => {
                          event.stopPropagation();

                          openOrderModal("BUY", item);
                        }}
                      >
                        B
                      </button>

                      {/* SELL */}

                      <button
                        type="button"
                        className="watchlist-action-btn sell"
                        title="Sell"
                        onClick={(event) => {
                          event.stopPropagation();

                          openOrderModal("SELL", item);
                        }}
                      >
                        S
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        className="watchlist-action-btn delete"
                        title="Delete"
                        onClick={(event) => {
                          event.stopPropagation();

                          setDeleteStock(item);
                        }}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= FOOTER ================= */}

      <div className="watchlist-table-footer">

  <div className="watchlist-result-count">
    Showing{" "}
    {filteredData.length === 0
      ? 0
      : startIndex + 1}{" "}
    to{" "}
    {Math.min(
      startIndex + itemsPerPage,
      filteredData.length
    )}{" "}
    of{" "}
    {filteredData.length}{" "}
    results
  </div>

  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />

</div>
      </div>

      {/* =====================================================
          MODALS
      ===================================================== */}

      <OrderModal
        show={activeModal === "order"}
        side={orderSide}
        selectedStock={selectedStock}
        onClose={closeModal}
      />

      <PendingModal
        show={activeModal === "pending"}
        onClose={closeModal}
        stocks={watchlistData}
      />

      <Positions
        show={activeModal === "positions"}
        onClose={closeModal}
        stocks={watchlistData}
      />

      <Holdings
        show={activeModal === "holdings"}
        onClose={closeModal}
        stocks={watchlistData}
      />

      <GlobalFund show={activeModal === "globalFund"} onClose={closeModal} />

      <TradeBook show={activeModal === "tradeBook"} onClose={closeModal} />

      <ActivityLogs
        show={activeModal === "activityLogs"}
        onClose={closeModal}
      />

      {deleteStock && (
        <div
          className="remove-stock-overlay"
          onMouseDown={() => setDeleteStock(null)}
        >
          <div
            className="remove-stock-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="remove-stock-icon">
              <i className="fa-regular fa-trash-can"></i>
            </div>

            <h3>Remove Stock</h3>

            <p>Are you sure you want to remove</p>

            <strong className="remove-stock-symbol">
              {deleteStock.symbol}
            </strong>

            <p>from your watchlist?</p>

            <div className="remove-stock-actions">
              <button
                type="button"
                className="remove-stock-cancel"
                onClick={() => setDeleteStock(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="remove-stock-confirm"
                onClick={handleDeleteStock}
              >
                <i className="fa-regular fa-trash-can"></i>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
