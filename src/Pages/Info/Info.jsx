import React from "react";

import "./Info.css";


const hotkeys = [
  {
    key: "F1",
    title: "Buy Order",
    description:
      "Opens the Buy Bulk Order modal for the selected stock.",
    action:
      "Opens Buy Order",
    icon:
      "fa-solid fa-arrow-trend-up",
    type:
      "buy",
  },

  {
    key: "F2",
    title: "Sell Order",
    description:
      "Opens the Sell Bulk Order modal for the selected stock.",
    action:
      "Opens Sell Order",
    icon:
      "fa-solid fa-arrow-trend-down",
    type:
      "sell",
  },

  {
    key: "F3",
    title: "Pending Orders",
    description:
      "Opens all pending orders with their client and order details.",
    action:
      "Opens Pending Orders",
    icon:
      "fa-regular fa-clock",
    type:
      "pending",
  },

  {
    key: "F4",
    title: "Client Positions",
    description:
      "Enter a client code to view that client's current positions.",
    action:
      "Opens Client Positions",
    icon:
      "fa-solid fa-chart-column",
    type:
      "default",
  },

  {
    key: "F5",
    title: "Client Holdings",
    description:
      "Enter a client code to view that client's holdings.",
    action:
      "Opens Client Holdings",
    icon:
      "fa-solid fa-wallet",
    type:
      "default",
  },

  {
    key: "F6",
    title: "Global Funds",
    description:
      "Opens the fund details of all available client broker accounts.",
    action:
      "Opens Global Funds",
    icon:
      "fa-solid fa-money-bill-transfer",
    type:
      "default",
  },

  {
    key: "F8",
    title: "Client Trade Book",
    description:
      "Enter a client code to view the completed trades of that client.",
    action:
      "Opens Client Trade Book",
    icon:
      "fa-solid fa-receipt",
    type:
      "default",
  },

  {
    key: "F10",
    title: "Activity Logs",
    description:
      "Opens the activity history and important system actions.",
    action:
      "Opens Activity Logs",
    icon:
      "fa-solid fa-list-check",
    type:
      "default",
  },
];


function Info() {
  return (
    <div className="info-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="info-heading">

        <div className="info-heading-icon">

          <i className="fa-regular fa-circle-question"></i>

        </div>


        <div>

          <h2>
            Hotkey Guide
            <span>.</span>
          </h2>

          <p>
            View all available keyboard shortcuts
          </p>

        </div>

      </div>


      {/* =====================================================
          HOW TO USE
      ===================================================== */}

      <section className="info-help-card">

        <div className="info-help-icon">

          <i className="fa-solid fa-bolt"></i>

        </div>


        <div>

          <h3>
            How to use hotkeys
          </h3>

          <p>
            Open the Watchlist page and press any function key shown below.
            The related modal will open immediately.
          </p>

        </div>

      </section>


      {/* =====================================================
          AVAILABLE HOTKEYS
      ===================================================== */}

      <section className="info-hotkeys-card">

        <div className="info-section-heading">

          <h3>
            Available Hotkeys
          </h3>

          <p>
            Click actions are also available from the Watchlist where applicable.
          </p>

        </div>


        <div className="row g-3 info-hotkeys-grid">

          {hotkeys.map(
            (item) => (

              <div
                key={
                  item.key
                }
                className="col-12 col-md-6 col-xl-3"
              >

                <div className="info-hotkey-card">

                  {/* TOP */}

                  <div className="info-hotkey-top">

                    <div
                      className={`info-hotkey-icon ${item.type}`}
                    >

                      <i
                        className={
                          item.icon
                        }
                      ></i>

                    </div>


                    <span className="info-key-badge">

                      {item.key}

                    </span>

                  </div>


                  {/* CONTENT */}

                  <div className="info-hotkey-content">

                    <h4>
                      {item.title}
                    </h4>

                    <p>
                      {item.description}
                    </p>

                  </div>


                  {/* ACTION */}

                  <div
                    className={`info-hotkey-action ${item.type}`}
                  >

                    <i className="fa-solid fa-arrow-right"></i>

                    <span>
                      {item.action}
                    </span>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          BOTTOM INFORMATION
      ===================================================== */}

      <div className="row g-3 info-bottom-row">

        {/* BUY / SELL */}

        <div className="col-12 col-lg-6">

          <div className="info-bottom-card">

            <div className="info-bottom-icon">

              <i className="fa-solid fa-circle-info"></i>

            </div>


            <div>

              <h4>
                Buy and Sell orders
              </h4>

              <p>
                Select a stock from the Watchlist before pressing F1 or F2.
                The selected stock will be shown inside the order modal.
              </p>

            </div>

          </div>

        </div>


        {/* LAPTOP KEYS */}

        <div className="col-12 col-lg-6">

          <div className="info-bottom-card">

            <div className="info-bottom-icon">

              <i className="fa-solid fa-laptop"></i>

            </div>


            <div>

              <h4>
                Laptop function keys
              </h4>

              <p>
                On some laptops, press the Fn key together with the hotkey.
                For example, use Fn + F4 to open Client Positions.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          ESC NOTE
      ===================================================== */}

      <div className="info-escape-note">

        <i className="fa-solid fa-xmark"></i>

        <span>
          Press
        </span>

        <kbd>
          Esc
        </kbd>

        <span>
          to close any open modal.
        </span>

      </div>

    </div>
  );
}


export default Info;