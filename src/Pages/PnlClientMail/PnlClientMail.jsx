import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";

import "./PnlClientMail.css";


const clientMailData = [
  {
    code: "RM10245",
    name: "Rahul Menon",
    commissionPercentage: 1,
    bookedPnl: 185000,
  },

  {
    code: "AN20981",
    name: "Arjun Nair",
    commissionPercentage: 1.25,
    bookedPnl: 142500,
  },

  {
    code: "NJ40582",
    name: "Nikhil Joseph",
    commissionPercentage: 0.75,
    bookedPnl: 98000,
  },

  {
    code: "FA10892",
    name: "Faisal Ahmed",
    commissionPercentage: 1.5,
    bookedPnl: 218000,
  },

  {
    code: "AK70123",
    name: "Adithya Krishnan",
    commissionPercentage: 1,
    bookedPnl: 163500,
  },

  {
    code: "SP98234",
    name: "Sneha Pillai",
    commissionPercentage: 1.2,
    bookedPnl: 176400,
  },
];


function PnlClientMail() {
  const [selectedClient, setSelectedClient] =
    useState("RM10245");

  const [selectedDate, setSelectedDate] =
    useState("2026-09-28");


  const currentClient = useMemo(
    () =>
      clientMailData.find(
        (client) =>
          client.code ===
          selectedClient
      ) || clientMailData[0],
    [selectedClient]
  );


  const commissionAmount =
    (currentClient.bookedPnl *
      currentClient.commissionPercentage) /
    100;


  const netBookedPnl =
    currentClient.bookedPnl -
    commissionAmount;


  const formatMoney = (value) =>
    `₹${Number(value).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;


  const handleSend = () => {
    if (!selectedDate) {
      Swal.fire({
        icon: "warning",
        title: "Select Date",
        text: "Please select a date.",
        background: "#061923",
        color: "#ffffff",
        confirmButtonColor: "#00b985",
      });

      return;
    }


    if (!selectedClient) {
      Swal.fire({
        icon: "warning",
        title: "Select Client",
        text: "Please select a client.",
        background: "#061923",
        color: "#ffffff",
        confirmButtonColor: "#00b985",
      });

      return;
    }


    Swal.fire({
      icon: "success",

      title: "P&L Mail Sent",

      html: `
        <span style="color:#8da1aa">
          Monthly P&L mail sent to
        </span>

        <br/>

        <strong style="color:#00d9a0">
          ${currentClient.name}
        </strong>

        <br/>

        <small style="color:#6f858e">
          ${currentClient.code}
        </small>
      `,

      background: "#061923",

      color: "#ffffff",

      confirmButtonColor: "#00b985",
    });
  };


  return (
    <div className="pnl-client-mail-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="pnl-client-mail-heading">

        <div className="pnl-client-mail-heading-icon">

          <i className="fa-solid fa-envelope-open-text"></i>

        </div>


        <div>

          <h2>
            P&amp;L Client Mail
          </h2>

          <p>
            Review client profit and loss details before sending the monthly mail.
          </p>

        </div>

      </div>


      {/* =====================================================
          MONTHLY SUMMARY
      ===================================================== */}

      <section className="pnl-mail-card">

        <div className="pnl-mail-card-body">

          <div className="pnl-mail-section-label">
            MONTHLY SUMMARY
          </div>


          <div className="row g-3">

            {/* DATE */}

            <div className="col-12 col-md-4">

              <div className="pnl-mail-field">

                <label>
                  Date
                </label>


                <input
                  type="date"
                  value={
                    selectedDate
                  }
                  onChange={(event) =>
                    setSelectedDate(
                      event.target.value
                    )
                  }
                />

              </div>

            </div>


            {/* CLIENT */}

            <div className="col-12 col-md-4">

              <div className="pnl-mail-field">

                <label>
                  Client
                </label>


                <select
                  value={
                    selectedClient
                  }
                  onChange={(event) =>
                    setSelectedClient(
                      event.target.value
                    )
                  }
                >

                  {clientMailData.map(
                    (client) => (

                      <option
                        key={
                          client.code
                        }
                        value={
                          client.code
                        }
                      >
                        {client.code} - {client.name}
                      </option>

                    )
                  )}

                </select>

              </div>

            </div>


            {/* COMMISSION */}

            <div className="col-12 col-md-4">

              <div className="pnl-mail-field">

                <label>
                  Commission %
                </label>


                <div className="pnl-mail-percent-input">

                  <input
                    type="text"
                    value={
                      currentClient.commissionPercentage
                    }
                    readOnly
                  />

                  <span>
                    %
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MONTHLY CALCULATION
      ===================================================== */}

      <section className="pnl-mail-card">

        <div className="pnl-mail-card-body">

          <div className="pnl-mail-calculation-header">

            <div>

              <div className="pnl-mail-section-label">
                MONTHLY CALCULATION
              </div>


              <h3>
                Commission Calculation
              </h3>


              <p>
                Commission is fixed for the selected client.
              </p>

            </div>


            <div className="pnl-mail-commission-badge">

              {currentClient.commissionPercentage}%

            </div>

          </div>


          {/* ================= ROWS ================= */}

          <div className="pnl-mail-calculation-list">

            {/* BOOKED */}

            <div className="pnl-mail-calculation-row">

              <span>
                Booked P&amp;L
              </span>

              <strong>
                {formatMoney(
                  currentClient.bookedPnl
                )}
              </strong>

            </div>


            {/* COMMISSION % */}

            <div className="pnl-mail-calculation-row">

              <span>
                Fixed Commission Percentage
              </span>

              <strong>
                {currentClient.commissionPercentage}%
              </strong>

            </div>


            {/* COMMISSION AMOUNT */}

            <div className="pnl-mail-calculation-row">

              <span>
                Commission Amount
              </span>

              <strong className="commission-value">
                {formatMoney(
                  commissionAmount
                )}
              </strong>

            </div>


            {/* NET */}

            <div className="pnl-mail-calculation-row net">

              <span>
                Net Booked P&amp;L
              </span>

              <strong>
                {formatMoney(
                  netBookedPnl
                )}
              </strong>

            </div>

          </div>


          {/* SEND */}

          <div className="pnl-mail-send-row">

            <button
              type="button"
              className="pnl-mail-send-btn"
              onClick={
                handleSend
              }
            >

              <i className="fa-solid fa-paper-plane"></i>

              Send

            </button>

          </div>

        </div>

      </section>

    </div>
  );
}


export default PnlClientMail;