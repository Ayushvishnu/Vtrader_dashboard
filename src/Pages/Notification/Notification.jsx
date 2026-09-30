import React, {
  useMemo,
  useState,
} from "react";

import "./Notification.css";


const todayNotifications = [
  {
    id: 1,
    time: "03:24 pm",
    alertType: "BUY AVG 2",
    stock: "NMDC",
    token: "15332",
    price: 77.9,
  },
  {
    id: 2,
    time: "03:23 pm",
    alertType: "BUY FRESH",
    stock: "CONCORDBIO",
    token: "18060",
    price: 1391.8,
  },
  {
    id: 3,
    time: "03:19 pm",
    alertType: "BUY FRESH",
    stock: "INDIAB",
    token: "14309",
    price: 803,
  },
  {
    id: 4,
    time: "03:19 pm",
    alertType: "BUY FRESH",
    stock: "INDHOTEL",
    token: "1512",
    price: 711,
  },
  {
    id: 5,
    time: "03:17 pm",
    alertType: "BUY FRESH",
    stock: "BANKBARODA",
    token: "4668",
    price: 227.9,
  },
  {
    id: 6,
    time: "03:17 pm",
    alertType: "BUY AVG 2",
    stock: "BAJAJ-AUTO",
    token: "16669",
    price: 10970,
  },
  {
    id: 7,
    time: "02:23 pm",
    alertType: "BUY FRESH",
    stock: "BHARTIHEXA",
    token: "23489",
    price: 1432.8,
  },
  {
    id: 8,
    time: "02:12 pm",
    alertType: "SELL",
    stock: "SBIN",
    token: "3045",
    price: 812.4,
  },
  {
    id: 9,
    time: "01:58 pm",
    alertType: "BUY FRESH",
    stock: "RELIANCE",
    token: "2885",
    price: 1468.25,
  },
  {
    id: 10,
    time: "01:44 pm",
    alertType: "BUY AVG 1",
    stock: "TCS",
    token: "11536",
    price: 3184.6,
  },
];


const previousNotifications = [
  {
    id: 101,
    time: "03:45 pm",
    alertType: "BUY FRESH",
    stock: "INFY",
    token: "1594",
    price: 1495.4,
  },
  {
    id: 102,
    time: "02:55 pm",
    alertType: "SELL",
    stock: "HDFCBANK",
    token: "1333",
    price: 1689.75,
  },
  {
    id: 103,
    time: "01:40 pm",
    alertType: "BUY AVG 2",
    stock: "MARUTI",
    token: "10999",
    price: 12648.5,
  },
];


function Notification() {
  const [
    activeTab,
    setActiveTab,
  ] = useState("today");

  const [
    alertFilter,
    setAlertFilter,
  ] = useState("ALL");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const itemsPerPage = 8;


  const sourceData =
    activeTab === "today"
      ? todayNotifications
      : previousNotifications;


  const filteredNotifications =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();


      return sourceData.filter(
        (item) => {

          const matchesType =
            alertFilter === "ALL" ||
            item.alertType ===
              alertFilter;


          const matchesSearch =
            !query ||
            item.stock
              .toLowerCase()
              .includes(query) ||
            item.alertType
              .toLowerCase()
              .includes(query) ||
            item.token
              .toLowerCase()
              .includes(query);


          return (
            matchesType &&
            matchesSearch
          );
        }
      );
    }, [
      sourceData,
      alertFilter,
      search,
    ]);


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredNotifications.length /
          itemsPerPage
      )
    );


  const startIndex =
    (currentPage - 1) *
    itemsPerPage;


  const paginatedNotifications =
    filteredNotifications.slice(
      startIndex,
      startIndex +
        itemsPerPage
    );


  const formatMoney = (
    value
  ) =>
    `₹${Number(value).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;


  const handleTabChange = (
    tab
  ) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };


  return (
    <div className="notification-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="notification-heading">

        <div className="notification-heading-icon">

          <i className="fa-regular fa-bell"></i>

        </div>


        <div>

          <h2>
            Notification Center
          </h2>

          <p>
            Stay updated with real-time trading alerts from your strategies.
          </p>

        </div>

      </div>


      {/* =====================================================
          CONNECTION STATUS
      ===================================================== */}

      <div className="notification-connection">

        <i className="fa-solid fa-tower-broadcast"></i>

        <span>
          Connected. Waiting for the latest RSI alert...
        </span>

      </div>


      {/* =====================================================
          FILTER TOOLBAR
      ===================================================== */}

      <section className="notification-toolbar">

        {/* TODAY / PREVIOUS */}

        <div className="notification-tabs">

          <button
            type="button"
            className={
              activeTab ===
              "today"
                ? "active"
                : ""
            }
            onClick={() =>
              handleTabChange(
                "today"
              )
            }
          >
            Today
          </button>


          <button
            type="button"
            className={
              activeTab ===
              "previous"
                ? "active"
                : ""
            }
            onClick={() =>
              handleTabChange(
                "previous"
              )
            }
          >
            Previous
          </button>

        </div>


        {/* FILTERS */}

        <div className="notification-filters">

          <select
            value={
              alertFilter
            }
            onChange={(
              event
            ) => {
              setAlertFilter(
                event.target.value
              );

              setCurrentPage(1);
            }}
          >

            <option value="ALL">
              All Alert Types
            </option>

            <option value="BUY FRESH">
              Buy Fresh
            </option>

            <option value="BUY AVG 1">
              Buy Avg 1
            </option>

            <option value="BUY AVG 2">
              Buy Avg 2
            </option>

            <option value="SELL">
              Sell
            </option>

          </select>


          <div className="notification-search">

            <i className="fa-solid fa-magnifying-glass"></i>


            <input
              type="text"
              placeholder="Search stock or signal"
              value={
                search
              }
              onChange={(
                event
              ) => {
                setSearch(
                  event.target.value
                );

                setCurrentPage(1);
              }}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          NOTIFICATION TABLE CARD
      ===================================================== */}

      <section className="notification-card">

        <div className="notification-card-header">

          <div className="notification-card-title">

            <h3>

              {activeTab ===
              "today"
                ? "Today's Notifications"
                : "Previous Notifications"}

            </h3>


            <span className="notification-count">

              {filteredNotifications.length}

            </span>

          </div>


          <div className="notification-live">

            <span></span>

            Live Updates

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="notification-table-wrap">

          <table className="notification-table">

            <thead>

              <tr>

                <th>
                  TIME
                </th>

                <th>
                  ALERT TYPE
                </th>

                <th>
                  STOCK / SYMBOL
                </th>

                <th>
                  PRICE
                </th>

              </tr>

            </thead>


            <tbody>

              {paginatedNotifications.length >
              0 ? (

                paginatedNotifications.map(
                  (item) => (

                    <tr
                      key={
                        item.id
                      }
                    >

                      {/* TIME */}

                      <td className="notification-time">

                        {item.time}

                      </td>


                      {/* ALERT */}

                      <td>

                        <span
                          className={`notification-alert-badge ${getAlertClass(
                            item.alertType
                          )}`}
                        >

                          {
                            item.alertType
                          }

                        </span>

                      </td>


                      {/* STOCK */}

                      <td>

                        <div className="notification-stock">

                          <strong>
                            {
                              item.stock
                            }
                          </strong>


                          <span>
                            Token: {item.token}
                          </span>

                        </div>

                      </td>


                      {/* PRICE */}

                      <td className="notification-price">

                        {formatMoney(
                          item.price
                        )}

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="notification-empty"
                  >

                    No notifications found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="notification-pagination">

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

    </div>
  );
}


function getAlertClass(
  alertType
) {
  if (
    alertType ===
    "BUY FRESH"
  ) {
    return "buy-fresh";
  }


  if (
    alertType ===
    "BUY AVG 1" ||
    alertType ===
    "BUY AVG 2"
  ) {
    return "buy-average";
  }


  if (
    alertType === "SELL"
  ) {
    return "sell";
  }


  return "";
}


export default Notification;