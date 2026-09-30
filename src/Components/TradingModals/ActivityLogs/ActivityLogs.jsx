import React, { useState } from "react";
import "./ActivityLogs.css";

const demoActivityLogs = [
  {
    id: 1,
    clientCode: "RM10245",
    clientName: "Rahul Menon",
    time: "21 Sep 2026, 09:18 AM",
    broker: "Alice Blue",
    orderId: "ALB260921001",
    symbol: "RELIANCE-EQ",
    exchange: "NSE",
    instrumentType: "EQ",
    action: "PLACE ORDER",
    type: "BUY",
    orderType: "MARKET",
    product: "INTRADAY",
    qty: 25,
    price: 1455.5,
    status: "SUCCESS",
    reason: "Order placed successfully",
  },
  {
    id: 2,
    clientCode: "AN20981",
    clientName: "Arjun Nair",
    time: "21 Sep 2026, 09:22 AM",
    broker: "IIFL",
    orderId: "IIFL260921001",
    symbol: "INFY-EQ",
    exchange: "NSE",
    instrumentType: "EQ",
    action: "PLACE ORDER",
    type: "BUY",
    orderType: "LIMIT",
    product: "INTRADAY",
    qty: 30,
    price: 1480,
    status: "SUCCESS",
    reason: "Order placed successfully",
  },
  {
    id: 3,
    clientCode: "NJ40582",
    clientName: "Nikhil Joseph",
    time: "21 Sep 2026, 09:27 AM",
    broker: "Alice Blue",
    orderId: "ALB260921002",
    symbol: "SBIN-EQ",
    exchange: "NSE",
    instrumentType: "EQ",
    action: "PLACE ORDER",
    type: "BUY",
    orderType: "MARKET",
    product: "DELIVERY",
    qty: 40,
    price: 812.4,
    status: "SUCCESS",
    reason: "Executed successfully",
  },
  {
    id: 4,
    clientCode: "FA10892",
    clientName: "Faisal Ahmed",
    time: "21 Sep 2026, 09:31 AM",
    broker: "IIFL",
    orderId: "IIFL260921002",
    symbol: "TATAMOTORS-EQ",
    exchange: "NSE",
    instrumentType: "EQ",
    action: "PLACE ORDER",
    type: "BUY",
    orderType: "MARKET",
    product: "INTRADAY",
    qty: 50,
    price: 964.35,
    status: "SUCCESS",
    reason: "Order placed successfully",
  },
  {
    id: 5,
    clientCode: "RM10245",
    clientName: "Rahul Menon",
    time: "21 Sep 2026, 09:38 AM",
    broker: "Alice Blue",
    orderId: "ALB260921003",
    symbol: "NIFTY26SEP25000CE",
    exchange: "NFO",
    instrumentType: "OPTIDX",
    action: "PLACE ORDER",
    type: "BUY",
    orderType: "LIMIT",
    product: "NORMAL",
    qty: 65,
    price: 178,
    status: "PENDING",
    reason: "Waiting for price match",
  },
  {
    id: 6,
    clientCode: "SP98234",
    clientName: "Sneha Pillai",
    time: "21 Sep 2026, 09:43 AM",
    broker: "IIFL",
    orderId: "IIFL260921003",
    symbol: "BANKNIFTY26SEP54000CE",
    exchange: "NFO",
    instrumentType: "OPTIDX",
    action: "PLACE ORDER",
    type: "SELL",
    orderType: "SL",
    product: "NORMAL",
    qty: 30,
    price: 325.4,
    status: "TRIGGER PENDING",
    reason: "Waiting for trigger price",
  },
  {
    id: 7,
    clientCode: "RM10245",
    clientName: "Rahul Menon",
    time: "21 Sep 2026, 10:02 AM",
    broker: "Alice Blue",
    orderId: "ALB260921004",
    symbol: "RELIANCE-EQ",
    exchange: "NSE",
    instrumentType: "EQ",
    action: "MODIFY ORDER",
    type: "BUY",
    orderType: "LIMIT",
    product: "INTRADAY",
    qty: 25,
    price: 1460,
    status: "SUCCESS",
    reason: "Order modified successfully",
  },
  {
    id: 8,
    clientCode: "AN20981",
    clientName: "Arjun Nair",
    time: "21 Sep 2026, 10:15 AM",
    broker: "IIFL",
    orderId: "IIFL260921004",
    symbol: "HDFCBANK-EQ",
    exchange: "NSE",
    instrumentType: "EQ",
    action: "CANCEL ORDER",
    type: "SELL",
    orderType: "SL",
    product: "INTRADAY",
    qty: 20,
    price: 1689.75,
    status: "CANCELLED",
    reason: "Cancelled by dealer",
  },
  {
    id: 9,
    clientCode: "AK70123",
    clientName: "Adithya Krishnan",
    time: "21 Sep 2026, 10:24 AM",
    broker: "Alice Blue",
    orderId: "ALB260921005",
    symbol: "MARUTI-EQ",
    exchange: "NSE",
    instrumentType: "EQ",
    action: "PLACE ORDER",
    type: "BUY",
    orderType: "LIMIT",
    product: "DELIVERY",
    qty: 8,
    price: 12450,
    status: "FAILED",
    reason: "Insufficient funds",
  },
  {
    id: 10,
    clientCode: "SP98234",
    clientName: "Sneha Pillai",
    time: "21 Sep 2026, 10:41 AM",
    broker: "IIFL",
    orderId: "IIFL260921005",
    symbol: "SUNPHARMA-EQ",
    exchange: "NSE",
    instrumentType: "EQ",
    action: "EXIT POSITION",
    type: "SELL",
    orderType: "MARKET",
    product: "INTRADAY",
    qty: 12,
    price: 1732.8,
    status: "SUCCESS",
    reason: "Position exited successfully",
  },
];

function ActivityLogs({
  show,
  onClose,
}) {
  const [broker, setBroker] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");

  if (!show) {
    return null;
  }

  const filteredLogs = demoActivityLogs.filter((item) => {
    const matchesBroker =
      broker === "ALL" ||
      item.broker === broker;

    const matchesStatus =
      status === "ALL" ||
      item.status === status;

    const searchText =
      search.trim().toLowerCase();

    const matchesSearch =
      !searchText ||
      item.clientCode
        .toLowerCase()
        .includes(searchText) ||
      item.clientName
        .toLowerCase()
        .includes(searchText) ||
      item.symbol
        .toLowerCase()
        .includes(searchText) ||
      item.orderId
        .toLowerCase()
        .includes(searchText);

    return (
      matchesBroker &&
      matchesStatus &&
      matchesSearch
    );
  });

  const handleClear = () => {
    setBroker("ALL");
    setStatus("ALL");
    setSearch("");
  };

  const handleClose = () => {
    handleClear();
    onClose();
  };

  return (
    <div
      className="activity-logs-overlay"
      onMouseDown={handleClose}
    >
      <div
        className="activity-logs-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* ================= HEADER ================= */}

        <div className="activity-logs-header">

          <div className="activity-logs-title-wrap">

            <div className="activity-logs-title-icon">
              <i className="fa-solid fa-clock-rotate-left"></i>
            </div>

            <div>
              <h3>
                Activity Logs
              </h3>

              <p>
                {filteredLogs.length} activities
              </p>
            </div>

          </div>


          <button
            type="button"
            className="activity-logs-close-btn"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

        </div>


        {/* ================= FILTERS ================= */}

        <div className="activity-logs-filter-section">

          <div className="activity-logs-filter-grid">

            <div className="activity-filter-field">

              <label>
                Broker
              </label>

              <select
                value={broker}
                onChange={(event) =>
                  setBroker(
                    event.target.value
                  )
                }
              >
                <option value="ALL">
                  All Brokers
                </option>

                <option value="Alice Blue">
                  Alice Blue
                </option>

                <option value="IIFL">
                  IIFL
                </option>
              </select>

            </div>


            <div className="activity-filter-field">

              <label>
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value
                  )
                }
              >
                <option value="ALL">
                  All Status
                </option>

                <option value="SUCCESS">
                  Success
                </option>

                <option value="PENDING">
                  Pending
                </option>

                <option value="TRIGGER PENDING">
                  Trigger Pending
                </option>

                <option value="CANCELLED">
                  Cancelled
                </option>

                <option value="FAILED">
                  Failed
                </option>
              </select>

            </div>


            <div className="activity-filter-field search">

              <label>
                Search
              </label>

              <div className="activity-search-box">

                <i className="fa-solid fa-magnifying-glass"></i>

                <input
                  type="text"
                  placeholder="Client, code, symbol or order ID"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />

              </div>

            </div>


            <div className="activity-clear-wrap">

              <button
                type="button"
                className="activity-clear-btn"
                onClick={handleClear}
              >
                <i className="fa-solid fa-rotate-left"></i>

                Clear
              </button>

            </div>

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="activity-logs-table-area">

          <div className="activity-logs-table-wrap">

            <table className="activity-logs-table">

              <thead>
                <tr>
                  <th>SL. NO.</th>
                  <th>CLIENT</th>
                  <th>TIME</th>
                  <th>BROKER</th>
                  <th>ORDER ID</th>
                  <th>SYMBOL</th>
                  <th>EXCHANGE</th>
                  <th>INSTRUMENT TYPE</th>
                  <th>ACTION</th>
                  <th>TYPE</th>
                  <th>ORDER TYPE</th>
                  <th>PRODUCT</th>
                  <th>QTY</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th>REASON</th>
                </tr>
              </thead>


              <tbody>

                {filteredLogs.length > 0 ? (

                  filteredLogs.map(
                    (item, index) => (

                      <tr key={item.id}>

                        <td>
                          <span className="activity-log-slno">
                            {index + 1}
                          </span>
                        </td>


                        <td>

                          <div className="activity-log-client">

                            <strong>
                              {item.clientCode}
                            </strong>

                            <span>
                              {item.clientName}
                            </span>

                          </div>

                        </td>


                        <td>
                          {item.time}
                        </td>


                        <td>
                          {item.broker}
                        </td>


                        <td className="activity-order-id">
                          {item.orderId}
                        </td>


                        <td className="activity-symbol">
                          {item.symbol}
                        </td>


                        <td>
                          {item.exchange}
                        </td>


                        <td>
                          {item.instrumentType}
                        </td>


                        <td>
                          <span className="activity-action-badge">
                            {item.action}
                          </span>
                        </td>


                        <td
                          className={
                            item.type === "BUY"
                              ? "activity-buy"
                              : "activity-sell"
                          }
                        >
                          {item.type}
                        </td>


                        <td>
                          {item.orderType}
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

                          <span
                            className={`activity-status ${item.status
                              .toLowerCase()
                              .replaceAll(
                                " ",
                                "-"
                              )}`}
                          >
                            {item.status}
                          </span>

                        </td>


                        <td className="activity-reason">
                          {item.reason}
                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="16"
                      className="activity-no-data"
                    >
                      No activity logs found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ActivityLogs;