import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";
import "./GlobalHoldings.css";


const initialHoldings = [
  {
    id: 1,
    client: "Rahul Menon",
    clientCode: "RM10245",
    broker: "Alice Blue",
    symbol: "RELIANCE-EQ",
    exchange: "NSE",
    product: "CNC",
    quantity: 25,
    buyPrice: 1456.5,
    reason: "Long Term",
    ltp: 1468.25,
  },

  {
    id: 2,
    client: "Arjun Nair",
    clientCode: "AN20981",
    broker: "IIFL",
    symbol: "INFY-EQ",
    exchange: "NSE",
    product: "CNC",
    quantity: 30,
    buyPrice: 1484.2,
    reason: "Portfolio",
    ltp: 1495.4,
  },

  {
    id: 3,
    client: "Nikhil Joseph",
    clientCode: "NJ40582",
    broker: "Alice Blue",
    symbol: "SBIN-EQ",
    exchange: "NSE",
    product: "CNC",
    quantity: 50,
    buyPrice: 818.9,
    reason: "Long Term",
    ltp: 812.4,
  },

  {
    id: 4,
    client: "Faisal Ahmed",
    clientCode: "FA10892",
    broker: "IIFL",
    symbol: "TATAMOTORS-EQ",
    exchange: "NSE",
    product: "CNC",
    quantity: 40,
    buyPrice: 950.2,
    reason: "Growth",
    ltp: 964.35,
  },

  {
    id: 5,
    client: "Sneha Pillai",
    clientCode: "SP98234",
    broker: "Alice Blue",
    symbol: "SUNPHARMA-EQ",
    exchange: "NSE",
    product: "CNC",
    quantity: 22,
    buyPrice: 1706.2,
    reason: "Portfolio",
    ltp: 1732.8,
  },

  {
    id: 6,
    client: "Adithya Krishnan",
    clientCode: "AK70123",
    broker: "IIFL",
    symbol: "MARUTI-EQ",
    exchange: "NSE",
    product: "CNC",
    quantity: 5,
    buyPrice: 12380.1,
    reason: "Momentum",
    ltp: 12648.5,
  },
];


function GlobalHoldings() {
  const [holdings, setHoldings] = useState(initialHoldings);

  const [currentPage, setCurrentPage] = useState(1);

  const [viewHolding, setViewHolding] = useState(null);

  const [editHolding, setEditHolding] = useState(null);


  const itemsPerPage = 10;


  /* =====================================================
     EDIT FORM
  ===================================================== */

  const [editForm, setEditForm] = useState({
    symbol: "",
    exchange: "",
    product: "",
    quantity: "",
    buyPrice: "",
    reason: "",
    ltp: "",
  });


  /* =====================================================
     SUMMARY
  ===================================================== */

  const summaryCards = [
    {
      title: "Broker Accounts",
      value: 4,
      subtitle: "Accounts",
      icon: "fa-solid fa-wallet",
      className: "broker",
    },

    {
      title: "Successful Accounts",
      value: 1,
      subtitle: "Accounts",
      icon: "fa-solid fa-circle-check",
      className: "success",
    },

    {
      title: "Failed Accounts",
      value: 1,
      subtitle: "Accounts",
      icon: "fa-solid fa-circle-xmark",
      className: "failed",
    },

    {
      title: "Not Logged In",
      value: 2,
      subtitle: "Clients",
      icon: "fa-solid fa-user-lock",
      className: "notlogged",
    },
  ];


  /* =====================================================
     CALCULATE P&L
  ===================================================== */

  const calculatePnl = (item) => {
    return (
      (Number(item.ltp) -
        Number(item.buyPrice)) *
      Number(item.quantity)
    );
  };


  const formatMoney = (value) =>
    `₹${Number(value).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;


  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      holdings.length /
        itemsPerPage
    )
  );


  const startIndex =
    (currentPage - 1) *
    itemsPerPage;


  const paginatedHoldings =
    useMemo(() => {
      return holdings.slice(
        startIndex,
        startIndex +
          itemsPerPage
      );
    }, [
      holdings,
      startIndex,
    ]);


  /* =====================================================
     OPEN EDIT
  ===================================================== */

  const handleOpenEdit = (
    item
  ) => {
    setEditHolding(item);

    setEditForm({
      symbol: item.symbol,
      exchange: item.exchange,
      product: item.product,
      quantity: item.quantity,
      buyPrice: item.buyPrice,
      reason: item.reason,
      ltp: item.ltp,
    });
  };


  /* =====================================================
     EDIT CHANGE
  ===================================================== */

  const handleEditChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setEditForm(
      (current) => ({
        ...current,

        [name]: value,
      })
    );
  };


  /* =====================================================
     UPDATE
  ===================================================== */

  const handleUpdateHolding =
    () => {

      if (
        !editForm.symbol.trim()
      ) {
        Swal.fire({
          icon: "warning",
          title:
            "Symbol Required",
          text:
            "Please enter the stock symbol.",
          background:
            "#061923",
          color: "#ffffff",
          confirmButtonColor:
            "#00b985",
        });

        return;
      }


      setHoldings(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              editHolding.id
                ? {
                    ...item,
                    ...editForm,

                    quantity:
                      Number(
                        editForm.quantity
                      ),

                    buyPrice:
                      Number(
                        editForm.buyPrice
                      ),

                    ltp:
                      Number(
                        editForm.ltp
                      ),
                  }
                : item
          )
      );


      setEditHolding(null);


      Swal.fire({
        icon: "success",
        title:
          "Holding Updated",

        toast: true,

        position:
          "top-end",

        timer: 1800,

        showConfirmButton:
          false,

        background:
          "#061923",

        color:
          "#ffffff",
      });
    };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete =
    async (item) => {

      const result =
        await Swal.fire({
          icon: "warning",

          title:
            "Delete Holding?",

          html: `
            <span style="color:#8fa1a8">
              Delete
            </span>

            <strong style="color:#ffffff">
              ${item.symbol}
            </strong>

            <br/>

            <small style="color:#71868f">
              ${item.clientCode}
            </small>
          `,

          showCancelButton:
            true,

          confirmButtonText:
            "Delete",

          cancelButtonText:
            "Cancel",

          confirmButtonColor:
            "#dc3545",

          cancelButtonColor:
            "#42545d",

          background:
            "#061923",

          color:
            "#ffffff",
        });


      if (
        !result.isConfirmed
      ) {
        return;
      }


      setHoldings(
        (current) =>
          current.filter(
            (holding) =>
              holding.id !==
              item.id
          )
      );


      Swal.fire({
        icon: "success",

        title:
          "Holding Deleted",

        toast: true,

        position:
          "top-end",

        timer: 1600,

        showConfirmButton:
          false,

        background:
          "#061923",

        color:
          "#ffffff",
      });
    };


  return (
    <div className="global-holdings-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="global-holdings-heading">

        <div className="global-holdings-heading-icon">

          {/* <i className="fa-solid fa-briefcase"></i> */}
<i class="fa-solid fa-bookmark"></i>
        </div>


        <div>

          <h2>
            Global Holdings
            <span>.</span>
          </h2>

          <p>
            View holdings across all client accounts
          </p>

        </div>

      </div>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="row g-3 global-holdings-summary-row">

        {summaryCards.map(
          (card) => (

            <div
              key={
                card.title
              }
              className="col-12 col-md-6 col-xl-3"
            >

              <div
                className={`global-holdings-summary-card ${card.className}`}
              >

                <div className="global-holdings-summary-top">

                  <span>
                    {card.title}
                  </span>


                  <i
                    className={
                      card.icon
                    }
                  ></i>

                </div>


                <strong>
                  {card.value}
                </strong>


                <small>
                  {card.subtitle}
                </small>

              </div>

            </div>

          )
        )}

      </div>


      {/* =====================================================
          HOLDINGS CARD
      ===================================================== */}

      <section className="global-holdings-card">

        <div className="global-holdings-card-header">

          <div>

            <h3>
              Client Holdings
            </h3>

            <p>
              {holdings.length} record
              {holdings.length !== 1
                ? "s"
                : ""}
            </p>

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="global-holdings-table-wrap">

          <table className="global-holdings-table">

            <thead>

              <tr>

                <th>
                  SL. NO.
                </th>

                <th>
                  CLIENT
                </th>

                <th>
                  BROKER
                </th>

                <th>
                  SYMBOL
                </th>

                <th>
                  EXCHANGE
                </th>

                <th>
                  PRODUCT
                </th>

                <th>
                  QUANTITY
                </th>

                <th>
                  BUY PRICE
                </th>

                <th>
                  REASON
                </th>

                <th>
                  LTP
                </th>

                <th>
                  P&amp;L
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {paginatedHoldings.length >
              0 ? (

                paginatedHoldings.map(
                  (
                    item,
                    index
                  ) => {

                    const pnl =
                      calculatePnl(
                        item
                      );


                    return (

                      <tr
                        key={
                          item.id
                        }
                      >

                        {/* SL */}

                        <td>

                          <span className="global-holdings-sl">

                            {startIndex +
                              index +
                              1}

                          </span>

                        </td>


                        {/* CLIENT */}

                        <td>

                          <div className="global-holdings-client">

                            <strong>
                              {
                                item.client
                              }
                            </strong>

                            <span>
                              {
                                item.clientCode
                              }
                            </span>

                          </div>

                        </td>


                        {/* BROKER */}

                        <td>
                          {item.broker}
                        </td>


                        {/* SYMBOL */}

                        <td className="global-holdings-symbol">

                          {item.symbol}

                        </td>


                        {/* EXCHANGE */}

                        <td>

                          <span className="global-holdings-exchange">

                            {item.exchange}

                          </span>

                        </td>


                        {/* PRODUCT */}

                        <td>
                          {item.product}
                        </td>


                        {/* QTY */}

                        <td>
                          {item.quantity}
                        </td>


                        {/* BUY */}

                        <td>

                          {formatMoney(
                            item.buyPrice
                          )}

                        </td>


                        {/* REASON */}

                        <td>

                          {item.reason}

                        </td>


                        {/* LTP */}

                        <td>

                          {formatMoney(
                            item.ltp
                          )}

                        </td>


                        {/* PNL */}

                        <td>

                          <span
                            className={
                              pnl >= 0
                                ? "global-holdings-profit"
                                : "global-holdings-loss"
                            }
                          >

                            {pnl >= 0
                              ? "+"
                              : ""}

                            {formatMoney(
                              pnl
                            )}

                          </span>

                        </td>


                        {/* ACTION */}

                        <td>

                          <div className="global-holdings-actions">

                            {/* VIEW */}

                            <button
                              type="button"
                              className="global-holdings-view-btn"
                              title="View"
                              onClick={() =>
                                setViewHolding(
                                  item
                                )
                              }
                            >

                              <i className="fa-regular fa-eye"></i>

                            </button>


                            {/* EDIT */}

                            <button
                              type="button"
                              className="global-holdings-edit-btn"
                              title="Edit"
                              onClick={() =>
                                handleOpenEdit(
                                  item
                                )
                              }
                            >

                              <i className="fa-regular fa-pen-to-square"></i>

                            </button>


                            {/* DELETE */}

                            <button
                              type="button"
                              className="global-holdings-delete-btn"
                              title="Delete"
                              onClick={() =>
                                handleDelete(
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
                    colSpan="12"
                    className="global-holdings-empty"
                  >

                    No holding details found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="global-holdings-pagination">

          <button
            type="button"
            disabled={
              currentPage <= 1
            }
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.max(
                    1,
                    page - 1
                  )
              )
            }
          >

            <i className="fa-solid fa-chevron-left"></i>

          </button>


          <span>
            {currentPage} of {totalPages}
          </span>


          <button
            type="button"
            disabled={
              currentPage >=
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                (page) =>
                  Math.min(
                    totalPages,
                    page + 1
                  )
              )
            }
          >

            <i className="fa-solid fa-chevron-right"></i>

          </button>

        </div>

      </section>


      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {viewHolding && (

        <div
          className="global-holdings-modal-overlay"
          onClick={() =>
            setViewHolding(
              null
            )
          }
        >

          <div
            className="global-holdings-view-modal"
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="global-holdings-modal-header">

              <div>

                <h3>
                  Holding Details
                </h3>

                <p>
                  View selected client holding information
                </p>

              </div>


              <button
                type="button"
                className="global-holdings-modal-close"
                onClick={() =>
                  setViewHolding(
                    null
                  )
                }
              >

                <i className="fa-solid fa-xmark"></i>

              </button>

            </div>


            {/* STOCK */}

            <div className="global-holdings-view-stock">

              <div className="global-holdings-view-stock-icon">

                <i className="fa-solid fa-chart-line"></i>

              </div>


              <div>

                <span>
                  Symbol
                </span>

                <h4>
                  {viewHolding.symbol}
                </h4>

              </div>

            </div>


            {/* BODY */}

            <div className="global-holdings-modal-body">

              <HoldingDetail
                label="Client"
                value={
                  viewHolding.client
                }
              />

              <HoldingDetail
                label="Client Code"
                value={
                  viewHolding.clientCode
                }
              />

              <HoldingDetail
                label="Broker"
                value={
                  viewHolding.broker
                }
              />

              <HoldingDetail
                label="Exchange"
                value={
                  viewHolding.exchange
                }
              />

              <HoldingDetail
                label="Product"
                value={
                  viewHolding.product
                }
              />

              <HoldingDetail
                label="Quantity"
                value={
                  viewHolding.quantity
                }
              />

              <HoldingDetail
                label="Buy Price"
                value={
                  formatMoney(
                    viewHolding.buyPrice
                  )
                }
              />

              <HoldingDetail
                label="LTP"
                value={
                  formatMoney(
                    viewHolding.ltp
                  )
                }
              />

              <HoldingDetail
                label="Reason"
                value={
                  viewHolding.reason
                }
              />


              <div className="global-holdings-detail-row">

                <span>
                  P&amp;L
                </span>

                <strong
                  className={
                    calculatePnl(
                      viewHolding
                    ) >= 0
                      ? "profit"
                      : "loss"
                  }
                >

                  {calculatePnl(
                    viewHolding
                  ) >= 0
                    ? "+"
                    : ""}

                  {formatMoney(
                    calculatePnl(
                      viewHolding
                    )
                  )}

                </strong>

              </div>

            </div>


            {/* FOOTER */}

            <div className="global-holdings-modal-footer">

              <button
                type="button"
                className="global-holdings-modal-cancel"
                onClick={() =>
                  setViewHolding(
                    null
                  )
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editHolding && (

        <div
          className="global-holdings-modal-overlay"
          onClick={() =>
            setEditHolding(
              null
            )
          }
        >

          <div
            className="global-holdings-edit-modal"
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="global-holdings-modal-header">

              <div>

                <h3>
                  Edit Holding
                </h3>

                <p>
                  Update the selected holding information
                </p>

              </div>


              <button
                type="button"
                className="global-holdings-modal-close"
                onClick={() =>
                  setEditHolding(
                    null
                  )
                }
              >

                <i className="fa-solid fa-xmark"></i>

              </button>

            </div>


            {/* BODY */}

            <div className="global-holdings-modal-body">

              <div className="row g-3">

                <HoldingInput
                  label="Symbol"
                  name="symbol"
                  value={
                    editForm.symbol
                  }
                  onChange={
                    handleEditChange
                  }
                />


                <HoldingInput
                  label="Exchange"
                  name="exchange"
                  value={
                    editForm.exchange
                  }
                  onChange={
                    handleEditChange
                  }
                />


                <HoldingInput
                  label="Product"
                  name="product"
                  value={
                    editForm.product
                  }
                  onChange={
                    handleEditChange
                  }
                />


                <HoldingInput
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={
                    editForm.quantity
                  }
                  onChange={
                    handleEditChange
                  }
                />


                <HoldingInput
                  label="Buy Price"
                  name="buyPrice"
                  type="number"
                  value={
                    editForm.buyPrice
                  }
                  onChange={
                    handleEditChange
                  }
                />


                <HoldingInput
                  label="LTP"
                  name="ltp"
                  type="number"
                  value={
                    editForm.ltp
                  }
                  onChange={
                    handleEditChange
                  }
                />


                <div className="col-12">

                  <div className="global-holdings-field">

                    <label>
                      Reason
                    </label>


                    <input
                      name="reason"
                      value={
                        editForm.reason
                      }
                      onChange={
                        handleEditChange
                      }
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* FOOTER */}

            <div className="global-holdings-modal-footer">

              <button
                type="button"
                className="global-holdings-modal-cancel"
                onClick={() =>
                  setEditHolding(
                    null
                  )
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className="global-holdings-modal-save"
                onClick={
                  handleUpdateHolding
                }
              >

                <i className="fa-solid fa-check"></i>

                Update Holding

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =====================================================
   DETAIL COMPONENT
===================================================== */

function HoldingDetail({
  label,
  value,
}) {
  return (
    <div className="global-holdings-detail-row">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


/* =====================================================
   INPUT COMPONENT
===================================================== */

function HoldingInput({
  label,
  ...props
}) {
  return (
    <div className="col-12 col-md-6">

      <div className="global-holdings-field">

        <label>
          {label}
        </label>

        <input
          {...props}
        />

      </div>

    </div>
  );
}


export default GlobalHoldings;