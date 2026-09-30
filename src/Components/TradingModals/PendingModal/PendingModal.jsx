import React, { useState } from "react";
import "./PendingModal.css";

const demoPendingOrders = [
  {
    clientCode: "RM10245",
    clientName: "Rahul Menon",
    broker: "Alice Blue",
    orders: [
      {
        id: 1,
        orderId: "ALB10092101",
        symbol: "RELIANCE-EQ",
        exchange: "NSE",
        side: "BUY",
        product: "INTRADAY",
        type: "LIMIT",
        qty: 25,
        price: 1455.5,
        trigger: 0,
        status: "OPEN",
      },
      {
        id: 2,
        orderId: "ALB10092102",
        symbol: "TCS-EQ",
        exchange: "NSE",
        side: "SELL",
        product: "DELIVERY",
        type: "SL",
        qty: 10,
        price: 3160,
        trigger: 3175,
        status: "TRIGGER PENDING",
      },
    ],
  },

  {
    clientCode: "AN20981",
    clientName: "Arjun Nair",
    broker: "IIFL",
    orders: [
      {
        id: 3,
        orderId: "IIFL10092101",
        symbol: "INFY-EQ",
        exchange: "NSE",
        side: "BUY",
        product: "INTRADAY",
        type: "LIMIT",
        qty: 30,
        price: 1480,
        trigger: 0,
        status: "OPEN",
      },
      {
        id: 4,
        orderId: "IIFL10092102",
        symbol: "NIFTY26SEP25000CE",
        exchange: "NFO",
        side: "BUY",
        product: "NORMAL",
        type: "SL",
        qty: 65,
        price: 178,
        trigger: 176,
        status: "TRIGGER PENDING",
      },
    ],
  },
];

function PendingModal({
  show,
  onClose,
}) {
  const [pendingOrders, setPendingOrders] =
    useState(demoPendingOrders);

  const [selectedOrders, setSelectedOrders] =
    useState([]);

  const [editingOrder, setEditingOrder] =
    useState(null);


  if (!show) {
    return null;
  }


  /* ================= TOTAL COUNT ================= */

  const totalPendingOrders =
    pendingOrders.reduce(
      (total, client) =>
        total + client.orders.length,
      0
    );


  /* ================= SELECT ORDER ================= */

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((current) =>
      current.includes(orderId)
        ? current.filter(
            (id) => id !== orderId
          )
        : [...current, orderId]
    );
  };


  /* ================= SELECT BROKER ORDERS ================= */

  const handleSelectBrokerOrders = (
    orders
  ) => {
    const ids = orders.map(
      (order) => order.id
    );

    const allSelected = ids.every(
      (id) =>
        selectedOrders.includes(id)
    );

    if (allSelected) {
      setSelectedOrders(
        (current) =>
          current.filter(
            (id) => !ids.includes(id)
          )
      );
    } else {
      setSelectedOrders(
        (current) => [
          ...new Set([
            ...current,
            ...ids,
          ]),
        ]
      );
    }
  };


  /* ================= DELETE ================= */

  const handleDeleteOrder = (
    clientCode,
    orderId
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to cancel this pending order?"
      );

    if (!confirmDelete) {
      return;
    }

    setPendingOrders(
      (currentClients) =>
        currentClients
          .map((client) => {
            if (
              client.clientCode !==
              clientCode
            ) {
              return client;
            }

            return {
              ...client,
              orders:
                client.orders.filter(
                  (order) =>
                    order.id !==
                    orderId
                ),
            };
          })
          .filter(
            (client) =>
              client.orders.length > 0
          )
    );

    setSelectedOrders(
      (current) =>
        current.filter(
          (id) => id !== orderId
        )
    );
  };


  /* ================= OPEN EDIT ================= */

  const handleEditOrder = (
    clientCode,
    order
  ) => {
    setEditingOrder({
      ...order,
      clientCode,
    });
  };


  /* ================= EDIT CHANGE ================= */

  const handleEditChange = (
    field,
    value
  ) => {
    setEditingOrder(
      (current) => ({
        ...current,
        [field]: value,
      })
    );
  };


  /* ================= SAVE EDIT ================= */

  const handleSaveEdit = () => {
    if (!editingOrder) {
      return;
    }

    setPendingOrders(
      (currentClients) =>
        currentClients.map(
          (client) => {
            if (
              client.clientCode !==
              editingOrder.clientCode
            ) {
              return client;
            }

            return {
              ...client,

              orders:
                client.orders.map(
                  (order) =>
                    order.id ===
                    editingOrder.id
                      ? {
                          ...order,
                          qty:
                            Number(
                              editingOrder.qty
                            ),
                          price:
                            Number(
                              editingOrder.price
                            ),
                          trigger:
                            Number(
                              editingOrder.trigger
                            ),
                          type:
                            editingOrder.type,
                          product:
                            editingOrder.product,
                        }
                      : order
                ),
            };
          }
        )
    );

    setEditingOrder(null);
  };


  /* ================= BULK CANCEL ================= */

  const handleBulkCancel = () => {
    if (
      selectedOrders.length === 0
    ) {
      return;
    }

    const confirmCancel =
      window.confirm(
        `Cancel ${selectedOrders.length} selected orders?`
      );

    if (!confirmCancel) {
      return;
    }

    setPendingOrders(
      (currentClients) =>
        currentClients
          .map((client) => ({
            ...client,

            orders:
              client.orders.filter(
                (order) =>
                  !selectedOrders.includes(
                    order.id
                  )
              ),
          }))
          .filter(
            (client) =>
              client.orders.length > 0
          )
    );

    setSelectedOrders([]);
  };


  return (
    <div
      className="pending-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="pending-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* ================= HEADER ================= */}

        <div className="pending-modal-header">

          <div className="pending-title">

            <div className="pending-title-icon">
              <i className="fa-regular fa-clock"></i>
            </div>

            <div>
              <h3>
                Global Pending Orders
              </h3>

              <p>
                {totalPendingOrders} pending orders
              </p>
            </div>

          </div>


          <div className="pending-header-actions">

            <button
              type="button"
              className="pending-bulk-btn"
              disabled={
                selectedOrders.length ===
                0
              }
              onClick={() => {
                const firstSelected =
                  pendingOrders
                    .flatMap(
                      (client) =>
                        client.orders.map(
                          (order) => ({
                            ...order,
                            clientCode:
                              client.clientCode,
                          })
                        )
                    )
                    .find(
                      (order) =>
                        selectedOrders.includes(
                          order.id
                        )
                    );

                if (firstSelected) {
                  setEditingOrder(
                    firstSelected
                  );
                }
              }}
            >
              <i className="fa-solid fa-pen"></i>

              Bulk Modify
            </button>


            <button
              type="button"
              className="pending-bulk-btn cancel"
              disabled={
                selectedOrders.length ===
                0
              }
              onClick={
                handleBulkCancel
              }
            >
              <i className="fa-regular fa-circle-xmark"></i>

              Bulk Cancel
            </button>


            <button
              type="button"
              className="pending-close-btn"
              onClick={onClose}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

          </div>

        </div>


        {/* ================= BODY ================= */}

        <div className="pending-modal-body">

          {pendingOrders.length === 0 ? (

            <div className="pending-empty">
              <i className="fa-regular fa-circle-check"></i>

              <h4>
                No Pending Orders
              </h4>

              <p>
                All orders are completed or cancelled.
              </p>
            </div>

          ) : (

            pendingOrders.map(
              (client) => {

                const allSelected =
                  client.orders.every(
                    (order) =>
                      selectedOrders.includes(
                        order.id
                      )
                  );

                return (
                  <div
                    className="pending-client-card"
                    key={
                      client.clientCode
                    }
                  >

                    {/* CLIENT HEADER */}

                    <div className="pending-client-header">

                      <div className="pending-client-info">

                        <div className="pending-avatar">
                          {client.clientName
                            .charAt(0)}
                        </div>

                        <div>
                          <strong>
                            {client.clientName}
                          </strong>

                          <span>
                            1 broker account(s)
                          </span>
                        </div>

                      </div>


                      <span className="pending-count-badge">
                        {
                          client.orders
                            .length
                        }{" "}
                        Pending
                      </span>

                    </div>


                    {/* BROKER */}

                    <div className="pending-broker-card">

                      <div className="pending-broker-header">

                        <div>
                          <strong>
                            {client.broker}
                          </strong>

                          <span>
                            {
                              client.clientCode
                            }
                          </span>
                        </div>


                        <div className="pending-broker-status">

                          <span className="pending-success">
                            SUCCESS
                          </span>

                          <strong>
                            {
                              client.orders
                                .length
                            }{" "}
                            Orders
                          </strong>

                        </div>

                      </div>


                      {/* SELECT ALL */}

                      <div className="pending-select-all">

                        <label>
                          <input
                            type="checkbox"
                            checked={
                              allSelected
                            }
                            onChange={() =>
                              handleSelectBrokerOrders(
                                client.orders
                              )
                            }
                          />

                          <span>
                            Select all orders for{" "}
                            {
                              client.clientCode
                            }
                          </span>
                        </label>

                        <span>
                          {
                            client.orders
                              .length
                          }{" "}
                          order(s)
                        </span>

                      </div>


                      {/* TABLE */}

                      <div className="pending-table-wrap">

                        <table className="pending-table">

                          <thead>
                            <tr>
                              <th></th>
                              <th>SL. NO.</th>
                              <th>ORDER ID</th>
                              <th>SYMBOL</th>
                              <th>EXCHANGE</th>
                              <th>SIDE</th>
                              <th>PRODUCT</th>
                              <th>TYPE</th>
                              <th>QTY</th>
                              <th>PRICE</th>
                              <th>TRIGGER</th>
                              <th>STATUS</th>
                              <th>ACTIONS</th>
                            </tr>
                          </thead>


                          <tbody>

                            {client.orders.map(
                              (
                                order,
                                index
                              ) => (

                                <tr
                                  key={
                                    order.id
                                  }
                                >

                                  <td>
                                    <input
                                      type="checkbox"
                                      checked={selectedOrders.includes(
                                        order.id
                                      )}
                                      onChange={() =>
                                        handleSelectOrder(
                                          order.id
                                        )
                                      }
                                    />
                                  </td>


                                  <td>
                                    <span className="pending-sl-badge">
                                      {index +
                                        1}
                                    </span>
                                  </td>


                                  <td className="pending-order-id">
                                    {
                                      order.orderId
                                    }
                                  </td>


                                  <td>
                                    <strong>
                                      {
                                        order.symbol
                                      }
                                    </strong>
                                  </td>


                                  <td>
                                    {
                                      order.exchange
                                    }
                                  </td>


                                  <td
                                    className={
                                      order.side ===
                                      "BUY"
                                        ? "pending-buy"
                                        : "pending-sell"
                                    }
                                  >
                                    {
                                      order.side
                                    }
                                  </td>


                                  <td>
                                    {
                                      order.product
                                    }
                                  </td>


                                  <td>
                                    {
                                      order.type
                                    }
                                  </td>


                                  <td>
                                    {
                                      order.qty
                                    }
                                  </td>


                                  <td>
                                    ₹
                                    {Number(
                                      order.price
                                    ).toFixed(
                                      2
                                    )}
                                  </td>


                                  <td>
                                    ₹
                                    {Number(
                                      order.trigger
                                    ).toFixed(
                                      2
                                    )}
                                  </td>


                                  <td>

                                    <span
                                      className={`pending-status-badge ${
                                        order.status ===
                                        "OPEN"
                                          ? "open"
                                          : "trigger"
                                      }`}
                                    >
                                      {
                                        order.status
                                      }
                                    </span>

                                  </td>


                                  <td>

                                    <div className="pending-row-actions">

                                      {/* EDIT */}

                                      <button
                                        type="button"
                                        className="pending-edit-btn"
                                        title="Edit Order"
                                        onClick={() =>
                                          handleEditOrder(
                                            client.clientCode,
                                            order
                                          )
                                        }
                                      >
                                        <i className="fa-solid fa-pen"></i>
                                      </button>


                                      {/* DELETE */}

                                      <button
                                        type="button"
                                        className="pending-delete-btn"
                                        title="Cancel Order"
                                        onClick={() =>
                                          handleDeleteOrder(
                                            client.clientCode,
                                            order.id
                                          )
                                        }
                                      >
                                        <i className="fa-solid fa-xmark"></i>
                                      </button>

                                    </div>

                                  </td>

                                </tr>

                              )
                            )}

                          </tbody>

                        </table>

                      </div>

                    </div>

                  </div>
                );
              }
            )

          )}

        </div>


        {/* ================= EDIT MODAL ================= */}

        {editingOrder && (

          <div className="pending-edit-overlay">

            <div className="pending-edit-modal">

              <div className="pending-edit-header">

                <div>
                  <h4>
                    Modify Pending Order
                  </h4>

                  <p>
                    {
                      editingOrder.symbol
                    }
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEditingOrder(
                      null
                    )
                  }
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

              </div>


              <div className="pending-edit-body">

                <div className="row g-3">

                  <div className="col-6">

                    <label>
                      Quantity
                    </label>

                    <input
                      type="number"
                      value={
                        editingOrder.qty
                      }
                      onChange={(
                        event
                      ) =>
                        handleEditChange(
                          "qty",
                          event.target
                            .value
                        )
                      }
                    />

                  </div>


                  <div className="col-6">

                    <label>
                      Price
                    </label>

                    <input
                      type="number"
                      value={
                        editingOrder.price
                      }
                      onChange={(
                        event
                      ) =>
                        handleEditChange(
                          "price",
                          event.target
                            .value
                        )
                      }
                    />

                  </div>


                  <div className="col-6">

                    <label>
                      Trigger Price
                    </label>

                    <input
                      type="number"
                      value={
                        editingOrder.trigger
                      }
                      onChange={(
                        event
                      ) =>
                        handleEditChange(
                          "trigger",
                          event.target
                            .value
                        )
                      }
                    />

                  </div>


                  <div className="col-6">

                    <label>
                      Order Type
                    </label>

                    <select
                      value={
                        editingOrder.type
                      }
                      onChange={(
                        event
                      ) =>
                        handleEditChange(
                          "type",
                          event.target
                            .value
                        )
                      }
                    >
                      <option value="LIMIT">
                        LIMIT
                      </option>

                      <option value="SL">
                        SL
                      </option>

                      <option value="MARKET">
                        MARKET
                      </option>
                    </select>

                  </div>

                </div>

              </div>


              <div className="pending-edit-footer">

                <button
                  type="button"
                  className="pending-edit-cancel"
                  onClick={() =>
                    setEditingOrder(
                      null
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="pending-edit-save"
                  onClick={
                    handleSaveEdit
                  }
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );
}

export default PendingModal;