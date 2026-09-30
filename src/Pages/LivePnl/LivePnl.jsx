

import React, {
  useMemo,
  useState,
} from "react";

import "./LivePnl.css";


const livePnlData = [
  {
    id: 1,

    segment: "EQUITY",

    client: "Rahul Menon",
    clientCode: "RM10245",

    stockName: "RELIANCE-EQ",

    ltp: 1468.25,
    avgPrice: 1456.5,

    quantity: 25,
    holdings: 25,

    pnl: 293.75,
    pnlPercentage: 0.81,

    portfolio:
      "Growth Strategy",

    status: "HOLD",

    days: 4,
  },

  {
    id: 2,

    segment: "EQUITY",

    client: "Arjun Nair",
    clientCode: "AN20981",

    stockName: "INFY-EQ",

    ltp: 1495.4,
    avgPrice: 1484.2,

    quantity: 30,
    holdings: 30,

    pnl: 336,
    pnlPercentage: 0.75,

    portfolio:
      "Long Term Wealth",

    status: "HOLD",

    days: 8,
  },

  {
    id: 3,

    segment: "EQUITY",

    client: "Faisal Ahmed",
    clientCode: "FA10892",

    stockName:
      "TATAMOTORS-EQ",

    ltp: 964.35,
    avgPrice: 950.2,

    quantity: 40,
    holdings: 0,

    pnl: 566,
    pnlPercentage: 1.49,

    portfolio:
      "Intraday Alpha",

    status: "EXIT",

    days: 1,
  },

  {
    id: 4,

    segment: "EQUITY",

    client: "Sneha Pillai",
    clientCode: "SP98234",

    stockName:
      "SUNPHARMA-EQ",

    ltp: 1732.8,
    avgPrice: 1706.2,

    quantity: 22,
    holdings: 22,

    pnl: 585.2,
    pnlPercentage: 1.56,

    portfolio:
      "Balanced Portfolio",

    status: "HOLD",

    days: 12,
  },

  {
    id: 5,

    segment: "EQUITY",

    client:
      "Adithya Krishnan",
    clientCode: "AK70123",

    stockName: "MARUTI-EQ",

    ltp: 12648.5,
    avgPrice: 12380.1,

    quantity: 5,
    holdings: 5,

    pnl: 1342,
    pnlPercentage: 2.17,

    portfolio:
      "Momentum Strategy",

    status:
      "PENDING_SELL",

    days: 6,
  },

  {
    id: 6,

    segment: "EQUITY",

    client:
      "Nikhil Joseph",
    clientCode: "NJ40582",

    stockName: "SBIN-EQ",

    ltp: 812.4,
    avgPrice: 818.9,

    quantity: 50,
    holdings: 50,

    pnl: -325,
    pnlPercentage: -0.79,

    portfolio:
      "Growth Strategy",

    status: "HOLD",

    days: 3,
  },

  {
    id: 7,

    segment: "EQUITY",

    client: "Rahul Menon",
    clientCode: "RM10245",

    stockName: "TCS-EQ",

    ltp: 3184.6,
    avgPrice: 3285,

    quantity: 10,
    holdings: 10,

    pnl: -1004,
    pnlPercentage: -3.06,

    portfolio:
      "Long Term Wealth",

    status:
      "PENDING_SELL",

    days: 15,
  },

  {
    id: 8,

    segment: "EQUITY",

    client: "Arjun Nair",
    clientCode: "AN20981",

    stockName:
      "HDFCBANK-EQ",

    ltp: 1689.75,
    avgPrice: 1774.95,

    quantity: 15,
    holdings: 15,

    pnl: -1278.75,
    pnlPercentage: -4.8,

    portfolio:
      "Balanced Portfolio",

    status: "HOLD",

    days: 9,
  },

  {
    id: 9,

    segment: "OPTION",

    client: "Rahul Menon",
    clientCode: "RM10245",

    stockName:
      "NIFTY26SEP25000CE",

    ltp: 186.5,
    avgPrice: 178,

    quantity: 65,
    holdings: 65,

    pnl: 552.5,
    pnlPercentage: 4.78,

    portfolio:
      "Momentum Strategy",

    status: "HOLD",

    days: 2,
  },

  {
    id: 10,

    segment: "OPTION",

    client: "Arjun Nair",
    clientCode: "AN20981",

    stockName:
      "NIFTY26SEP25000PE",

    ltp: 172.25,
    avgPrice: 180,

    quantity: 65,
    holdings: 65,

    pnl: -503.75,
    pnlPercentage: -4.31,

    portfolio:
      "Intraday Alpha",

    status:
      "PENDING_SELL",

    days: 1,
  },

  {
    id: 11,

    segment: "OPTION",

    client: "Faisal Ahmed",
    clientCode: "FA10892",

    stockName:
      "BANKNIFTY26SEP54000CE",

    ltp: 328.4,
    avgPrice: 315,

    quantity: 30,
    holdings: 30,

    pnl: 402,
    pnlPercentage: 4.25,

    portfolio:
      "Growth Strategy",

    status: "HOLD",

    days: 3,
  },

  {
    id: 12,

    segment: "OPTION",

    client: "Sneha Pillai",
    clientCode: "SP98234",

    stockName:
      "NIFTY26SEP24800PE",

    ltp: 92.5,
    avgPrice: 97.4,

    quantity: 65,
    holdings: 0,

    pnl: -318.5,
    pnlPercentage: -5.03,

    portfolio:
      "Balanced Portfolio",

    status: "EXIT",

    days: 1,
  },
];


const pnlFilters = [
  {
    id: "ALL",
    label: "All",
  },

  {
    id: "PROFIT_0_1",
    label: "0-1% Profit",
  },

  {
    id: "PROFIT_1_2",
    label: "1-2% Profit",
  },

  {
    id: "PROFIT_2_3",
    label: "2-3% Profit",
  },

  {
    id: "LOSS_0_1",
    label: "0-1% Loss",
  },

  {
    id: "LOSS_2_4",
    label: "2-4% Loss",
  },

  {
    id: "LOSS_ABOVE_4",
    label: "4% Above Loss",
  },
];


function LivePnl() {
  /* =====================================================
     DATA
  ===================================================== */

  const [pnlData, setPnlData] =
    useState(livePnlData);


  /* =====================================================
     FILTER STATES
  ===================================================== */

  const [segment, setSegment] =
    useState("EQUITY");

  const [portfolio, setPortfolio] =
    useState("ALL");

  const [status, setStatus] =
    useState("ALL");

  const [pnlFilter, setPnlFilter] =
    useState("ALL");

  const [search, setSearch] =
    useState("");

  const [
    stockSearch,
    setStockSearch,
  ] = useState("");

  const [
    daysFilter,
    setDaysFilter,
  ] = useState("ALL");


  /* =====================================================
     WHAT IF
  ===================================================== */

  const [
    whatIfValues,
    setWhatIfValues,
  ] = useState({});


  /* =====================================================
     MODALS
  ===================================================== */

  const [
    viewRecord,
    setViewRecord,
  ] = useState(null);

  const [
    deleteRecord,
    setDeleteRecord,
  ] = useState(null);


  /* =====================================================
     WHAT IF CHANGE
  ===================================================== */

  const handleWhatIfChange = (
    id,
    value
  ) => {
    setWhatIfValues(
      (current) => ({
        ...current,

        [id]: value,
      })
    );
  };


  /* =====================================================
     GET DISPLAY PNL
  ===================================================== */

  const getDisplayPnl = (
    item
  ) => {
    const whatIf =
      whatIfValues[item.id];


    if (
      whatIf === undefined ||
      whatIf === ""
    ) {
      return {
        pnl: item.pnl,

        percentage:
          item.pnlPercentage,
      };
    }


    const newLtp =
      Number(whatIf);


    if (
      Number.isNaN(newLtp)
    ) {
      return {
        pnl: item.pnl,

        percentage:
          item.pnlPercentage,
      };
    }


    const pnl =
      (newLtp -
        item.avgPrice) *
      item.quantity;


    const invested =
      item.avgPrice *
      item.quantity;


    const percentage =
      invested !== 0
        ? (pnl /
            invested) *
          100
        : 0;


    return {
      pnl,
      percentage,
    };
  };


  /* =====================================================
     FILTERED DATA
  ===================================================== */

  const filteredData =
    useMemo(() => {
      return pnlData.filter(
        (item) => {

          /* ================= SEGMENT ================= */

          const matchesSegment =
            item.segment ===
            segment;


          /* ================= PORTFOLIO ================= */

          const matchesPortfolio =
            portfolio ===
              "ALL" ||
            item.portfolio ===
              portfolio;


          /* ================= STATUS ================= */

          const matchesStatus =
            status ===
              "ALL" ||
            item.status ===
              status;


          /* ================= MAIN SEARCH ================= */

          const query =
            search
              .trim()
              .toLowerCase();


          const matchesSearch =
            !query ||
            item.client
              .toLowerCase()
              .includes(
                query
              ) ||
            item.clientCode
              .toLowerCase()
              .includes(
                query
              ) ||
            item.stockName
              .toLowerCase()
              .includes(
                query
              ) ||
            item.portfolio
              .toLowerCase()
              .includes(
                query
              );


          /* ================= STOCK SEARCH ================= */

          const stockQuery =
            stockSearch
              .trim()
              .toLowerCase();


          const matchesStock =
            !stockQuery ||
            item.stockName
              .toLowerCase()
              .includes(
                stockQuery
              );


          /* ================= DAYS ================= */

          let matchesDays =
            true;


          if (
            daysFilter ===
            "0_5"
          ) {
            matchesDays =
              item.days <= 5;
          }


          if (
            daysFilter ===
            "6_10"
          ) {
            matchesDays =
              item.days >= 6 &&
              item.days <= 10;
          }


          if (
            daysFilter ===
            "ABOVE_10"
          ) {
            matchesDays =
              item.days > 10;
          }


          /* ================= PNL RANGE ================= */

          const {
            percentage,
          } =
            getDisplayPnl(
              item
            );


          let matchesPnl =
            true;


          if (
            pnlFilter ===
            "PROFIT_0_1"
          ) {
            matchesPnl =
              percentage >= 0 &&
              percentage <= 1;
          }


          if (
            pnlFilter ===
            "PROFIT_1_2"
          ) {
            matchesPnl =
              percentage > 1 &&
              percentage <= 2;
          }


          if (
            pnlFilter ===
            "PROFIT_2_3"
          ) {
            matchesPnl =
              percentage > 2 &&
              percentage <= 3;
          }


          if (
            pnlFilter ===
            "LOSS_0_1"
          ) {
            matchesPnl =
              percentage < 0 &&
              percentage >= -1;
          }


          if (
            pnlFilter ===
            "LOSS_2_4"
          ) {
            matchesPnl =
              percentage <= -2 &&
              percentage >= -4;
          }


          if (
            pnlFilter ===
            "LOSS_ABOVE_4"
          ) {
            matchesPnl =
              percentage < -4;
          }


          return (
            matchesSegment &&
            matchesPortfolio &&
            matchesStatus &&
            matchesSearch &&
            matchesStock &&
            matchesDays &&
            matchesPnl
          );
        }
      );
    }, [
      pnlData,
      segment,
      portfolio,
      status,
      pnlFilter,
      search,
      stockSearch,
      daysFilter,
      whatIfValues,
    ]);


  /* =====================================================
     DELETE
  ===================================================== */

  const confirmDeleteRecord =
    () => {
      if (!deleteRecord) {
        return;
      }


      setPnlData(
        (current) =>
          current.filter(
            (item) =>
              item.id !==
              deleteRecord.id
          )
      );


      setDeleteRecord(
        null
      );
    };


  /* =====================================================
     MONEY FORMAT
  ===================================================== */

  const formatMoney = (
    value
  ) =>
    Number(value).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,

        maximumFractionDigits: 2,
      }
    );


  return (
    <div className="live-pnl-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="live-pnl-header">

        <div className="live-pnl-title">

          <div className="live-pnl-title-icon">

            <i className="fa-solid fa-chart-line"></i>

          </div>


          <div>

            <h2>
              Live P&amp;L
            </h2>

            <p>
              Track profit &amp; loss across your clients and holdings.
            </p>

          </div>

        </div>


        {/* ================= TOP FILTERS ================= */}

        <div className="live-pnl-top-filters">

          {/* PORTFOLIO */}

          <div className="live-pnl-top-select">

            <span>
              Portfolio:
            </span>


            <select
              value={
                portfolio
              }
              onChange={(
                event
              ) =>
                setPortfolio(
                  event.target
                    .value
                )
              }
            >

              <option value="ALL">
                All
              </option>


              <option value="Growth Strategy">
                Growth Strategy
              </option>


              <option value="Long Term Wealth">
                Long Term Wealth
              </option>


              <option value="Intraday Alpha">
                Intraday Alpha
              </option>


              <option value="Balanced Portfolio">
                Balanced Portfolio
              </option>


              <option value="Momentum Strategy">
                Momentum Strategy
              </option>

            </select>

          </div>


          {/* STATUS */}

          <div className="live-pnl-top-select">

            <span>
              Status:
            </span>


            <select
              value={
                status
              }
              onChange={(
                event
              ) =>
                setStatus(
                  event.target
                    .value
                )
              }
            >

              <option value="ALL">
                All
              </option>


              <option value="HOLD">
                Hold
              </option>


              <option value="EXIT">
                Exit
              </option>


              <option value="PENDING_SELL">
                Pending Sell
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* =====================================================
          SEGMENT TABS
      ===================================================== */}

      <div className="live-pnl-segment-tabs">

        <button
          type="button"
          className={
            segment ===
            "EQUITY"
              ? "active"
              : ""
          }
          onClick={() =>
            setSegment(
              "EQUITY"
            )
          }
        >
          Equity
        </button>


        <button
          type="button"
          className={
            segment ===
            "OPTION"
              ? "active"
              : ""
          }
          onClick={() =>
            setSegment(
              "OPTION"
            )
          }
        >
          Options
        </button>

      </div>


      {/* =====================================================
          PNL FILTERS
      ===================================================== */}

      <div className="live-pnl-range-filters">

        {pnlFilters.map(
          (filter) => (

            <button
              key={
                filter.id
              }
              type="button"
              className={
                pnlFilter ===
                filter.id
                  ? "active"
                  : ""
              }
              onClick={() =>
                setPnlFilter(
                  filter.id
                )
              }
            >

              {
                filter.label
              }

            </button>

          )
        )}

      </div>


      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="live-pnl-card">

        {/* =====================================================
            FILTER BAR
        ===================================================== */}

        <div className="live-pnl-table-filter">

          <div className="live-pnl-table-filter-left">

            {/* SEARCH */}

            <div className="live-pnl-search">

              <i className="fa-solid fa-magnifying-glass"></i>


              <input
                type="text"
                placeholder="Search by client code, client or script..."
                value={
                  search
                }
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
              />

            </div>


            {/* DAYS */}

            <select
              className="live-pnl-days"
              value={
                daysFilter
              }
              onChange={(
                event
              ) =>
                setDaysFilter(
                  event.target
                    .value
                )
              }
            >

              <option value="ALL">
                All Days
              </option>


              <option value="0_5">
                0 - 5 Days
              </option>


              <option value="6_10">
                6 - 10 Days
              </option>


              <option value="ABOVE_10">
                Above 10 Days
              </option>

            </select>

          </div>


          {/* STOCK SEARCH */}

          <div className="live-pnl-stock-search">

            <i className="fa-solid fa-magnifying-glass"></i>


            <input
              type="text"
              placeholder="Search by stock name..."
              value={
                stockSearch
              }
              onChange={(
                event
              ) =>
                setStockSearch(
                  event.target
                    .value
                )
              }
            />

          </div>

        </div>


        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="live-pnl-table-wrap">

          <table className="live-pnl-table">

            <thead>

              <tr>

                <th>
                  SL NO
                </th>

                <th>
                  CLIENT CODE
                </th>

                <th>
                  STOCK NAME
                </th>

                <th>
                  LTP (₹)
                </th>

                <th>
                  WHAT-IF LTP
                </th>

                <th>
                  QUANTITY
                </th>

                <th>
                  P&amp;L
                </th>

                <th>
                  HOLDINGS (QTY)
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredData.length >
              0 ? (

                filteredData.map(
                  (
                    item,
                    index
                  ) => {

                    const {
                      pnl,
                      percentage,
                    } =
                      getDisplayPnl(
                        item
                      );


                    return (

                      <tr
                        key={
                          item.id
                        }
                      >

                        {/* SL NO */}

                        <td>

                          <span className="live-pnl-slno">
                            {index + 1}
                          </span>

                        </td>


                        {/* CLIENT */}

                        <td className="live-pnl-client-code">

                          {
                            item.clientCode
                          }

                        </td>


                        {/* STOCK */}

                        <td className="live-pnl-stock-name">

                          {
                            item.stockName
                          }

                        </td>


                        {/* LTP */}

                        <td className="live-pnl-ltp">

                          ₹
                          {formatMoney(
                            item.ltp
                          )}

                        </td>


                        {/* WHAT IF */}

                        <td>

                          <input
                            type="number"
                            className="live-pnl-whatif"
                            placeholder="Enter LTP"
                            value={
                              whatIfValues[
                                item.id
                              ] ?? ""
                            }
                            onChange={(
                              event
                            ) =>
                              handleWhatIfChange(
                                item.id,
                                event
                                  .target
                                  .value
                              )
                            }
                          />

                        </td>


                        {/* QTY */}

                        <td>
                          {
                            item.quantity
                          }
                        </td>


                        {/* PNL */}

                        <td>

                          <div
                            className={`live-pnl-value ${
                              pnl >= 0
                                ? "profit"
                                : "loss"
                            }`}
                          >

                            <span>

                              {pnl >= 0
                                ? "+"
                                : ""}

                              ₹
                              {formatMoney(
                                pnl
                              )}

                              {" "}

                              (
                              {percentage >=
                              0
                                ? "+"
                                : ""}

                              {percentage.toFixed(
                                2
                              )}

                              %)

                            </span>


                            <i
                              className={`fa-solid ${
                                pnl >= 0
                                  ? "fa-arrow-trend-up"
                                  : "fa-arrow-trend-down"
                              }`}
                            ></i>

                          </div>

                        </td>


                        {/* HOLDINGS */}

                        <td>
                          {
                            item.holdings
                          }
                        </td>


                        {/* ACTION */}

                        <td>

                          <div className="live-pnl-actions">

                            {/* VIEW */}

                            <button
                              type="button"
                              className="live-pnl-view-btn"
                              title="View"
                              onClick={() =>
                                setViewRecord(
                                  item
                                )
                              }
                            >

                              <i className="fa-regular fa-eye"></i>

                            </button>


                            {/* DELETE */}

                            <button
                              type="button"
                              className="live-pnl-delete-btn"
                              title="Delete"
                              onClick={() =>
                                setDeleteRecord(
                                  item
                                )
                              }
                            >

                              <i className="fa-regular fa-trash-can"></i>

                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="live-pnl-empty"
                  >

                    <i className="fa-solid fa-chart-line"></i>


                    <strong>
                      No P&amp;L data found
                    </strong>


                    <span>
                      Try changing the selected filters.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="live-pnl-footer">

          <div>
            Showing{" "}
            {
              filteredData.length
            }{" "}
            results
          </div>


          <div className="live-pnl-pagination">

            <button
              type="button"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>


            <button
              type="button"
              className="active"
            >
              1 of 1
            </button>


            <button
              type="button"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {viewRecord && (

        <div
          className="live-pnl-modal-overlay"
          onMouseDown={() =>
            setViewRecord(
              null
            )
          }
        >

          <div
            className="live-pnl-view-modal"
            onMouseDown={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            <h2>

              {
                viewRecord.stockName
              }

            </h2>


            <div className="live-pnl-view-details">

              <ViewDetail
                label="Client"
                value={
                  viewRecord.client
                }
              />


              <ViewDetail
                label="Client Code"
                value={
                  viewRecord.clientCode
                }
              />


              <ViewDetail
                label="Portfolio"
                value={
                  viewRecord.portfolio
                }
              />


              <ViewDetail
                label="Status"
                value={
                  viewRecord.status.replaceAll(
                    "_",
                    " "
                  )
                }
              />


              <ViewDetail
                label="LTP"
                value={`₹${formatMoney(
                  viewRecord.ltp
                )}`}
              />


              <ViewDetail
                label="Quantity"
                value={
                  viewRecord.quantity
                }
              />


              <ViewDetail
                label="Running P&L"
                value={`${
                  viewRecord.pnl >=
                  0
                    ? "+"
                    : ""
                }₹${formatMoney(
                  viewRecord.pnl
                )}`}
                valueClass={
                  viewRecord.pnl >=
                  0
                    ? "positive"
                    : "negative"
                }
              />

            </div>


            <button
              type="button"
              className="live-pnl-view-close"
              onClick={() =>
                setViewRecord(
                  null
                )
              }
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteRecord && (

        <div
          className="live-pnl-modal-overlay"
          onMouseDown={() =>
            setDeleteRecord(
              null
            )
          }
        >

          <div
            className="live-pnl-delete-modal"
            onMouseDown={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* ICON */}

            <div className="live-pnl-delete-warning">

              <i className="fa-solid fa-exclamation"></i>

            </div>


            <h2>
              Delete P&amp;L Record?
            </h2>


            <p>

              Delete{" "}

              <strong>
                {
                  deleteRecord.stockName
                }
              </strong>

              {" "}for{" "}

              <strong>
                {
                  deleteRecord.clientCode
                }
              </strong>

              ?

            </p>


            <div className="live-pnl-delete-actions">

              <button
                type="button"
                className="live-pnl-confirm-delete"
                onClick={
                  confirmDeleteRecord
                }
              >
                Delete
              </button>


              <button
                type="button"
                className="live-pnl-cancel-delete"
                onClick={() =>
                  setDeleteRecord(
                    null
                  )
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =====================================================
   VIEW DETAIL
===================================================== */

function ViewDetail({
  label,
  value,
  valueClass = "",
}) {
  return (
    <div className="live-pnl-view-detail">

      <strong>
        {label}:
      </strong>


      <span
        className={
          valueClass
        }
      >
        {value}
      </span>

    </div>
  );
}


export default LivePnl;




