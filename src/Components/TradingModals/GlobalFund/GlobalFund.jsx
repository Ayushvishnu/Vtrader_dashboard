import React from "react";
import "./GlobalFund.css";

const globalFundData = [
  {
    id: 1,
    clientCode: "RM10245",
    clientName: "Rahul Menon",
    broker: "Alice Blue",
    available: 485000,
    usedMargin: 126500,
    cashLimit: 520000,
    reason: "Success",
    status: "success",
  },
  {
    id: 2,
    clientCode: "AN20981",
    clientName: "Arjun Nair",
    broker: "IIFL",
    available: 735000,
    usedMargin: 215000,
    cashLimit: 800000,
    reason: "Success",
    status: "success",
  },
  {
    id: 3,
    clientCode: "NJ40582",
    clientName: "Nikhil Joseph",
    broker: "Alice Blue",
    available: null,
    usedMargin: null,
    cashLimit: null,
    reason: "Broker session expired",
    status: "failed",
  },
  {
    id: 4,
    clientCode: "FA10892",
    clientName: "Faisal Ahmed",
    broker: "IIFL",
    available: 420000,
    usedMargin: 98500,
    cashLimit: 450000,
    reason: "Success",
    status: "success",
  },
  {
    id: 5,
    clientCode: "AK70123",
    clientName: "Adithya Krishnan",
    broker: "Alice Blue",
    available: null,
    usedMargin: null,
    cashLimit: null,
    reason: "Broker account not logged in",
    status: "notLogged",
  },
  {
    id: 6,
    clientCode: "SP98234",
    clientName: "Sneha Pillai",
    broker: "IIFL",
    available: 625000,
    usedMargin: 175500,
    cashLimit: 680000,
    reason: "Success",
    status: "success",
  },
  {
    id: 7,
    clientCode: "VR11882",
    clientName: "Vishnu Raj",
    broker: "Alice Blue",
    available: null,
    usedMargin: null,
    cashLimit: null,
    reason: "Invalid broker token",
    status: "failed",
  },
  {
    id: 8,
    clientCode: "MD88210",
    clientName: "Meera Das",
    broker: "IIFL",
    available: 910000,
    usedMargin: 287500,
    cashLimit: 950000,
    reason: "Success",
    status: "success",
  },
];

function GlobalFund({
  show,
  onClose,
}) {
  if (!show) {
    return null;
  }

  const totalAccounts =
    globalFundData.length;

  const successAccounts =
    globalFundData.filter(
      (item) =>
        item.status === "success"
    ).length;

  const failedAccounts =
    globalFundData.filter(
      (item) =>
        item.status === "failed"
    ).length;

  const notLoggedAccounts =
    globalFundData.filter(
      (item) =>
        item.status === "notLogged"
    ).length;


  const formatMoney = (value) => {
    if (value == null) {
      return "-";
    }

    return `₹${Number(
      value
    ).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };


  return (
    <div
      className="global-fund-overlay"
      onMouseDown={onClose}
    >
      <div
        className="global-fund-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* ================= HEADER ================= */}

        <div className="global-fund-header">

          <div className="global-fund-title-wrap">

            <div className="global-fund-title-icon">
              <i className="fa-solid fa-wallet"></i>
            </div>

            <div>
              <h3>
                Global Fund
              </h3>

              <p>
                Client-wise fund and margin overview
              </p>
            </div>

          </div>


          <button
            type="button"
            className="global-fund-close-btn"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

        </div>


        {/* ================= SUMMARY ================= */}

        <div className="global-fund-summary">

          <FundSummaryCard
            title="Total Broker Accounts"
            value={totalAccounts}
            icon="fa-solid fa-wallet"
            type="total"
          />

          <FundSummaryCard
            title="Success Accounts"
            value={successAccounts}
            icon="fa-solid fa-circle-check"
            type="success"
          />

          <FundSummaryCard
            title="Failed Accounts"
            value={failedAccounts}
            icon="fa-solid fa-circle-xmark"
            type="failed"
          />

          <FundSummaryCard
            title="Not Logged In Accounts"
            value={notLoggedAccounts}
            icon="fa-solid fa-users"
            type="notLogged"
          />

        </div>


        {/* ================= TABLE ================= */}

        <div className="global-fund-table-wrap">

          <table className="global-fund-table">

            <thead>
              <tr>
                <th>SL. NO.</th>
                <th>CLIENT</th>
                <th>BROKER</th>
                <th>AVAILABLE</th>
                <th>USED MARGIN</th>
                <th>CASH LIMIT</th>
                <th>REASON</th>
              </tr>
            </thead>


            <tbody>

              {globalFundData.map(
                (item, index) => (

                  <tr key={item.id}>

                    <td>

                      <span className="global-fund-slno">
                        {index + 1}
                      </span>

                    </td>


                    <td>

                      <div className="global-fund-client">

                        <strong>
                          {item.clientCode}
                        </strong>

                        <span>
                          {item.clientName}
                        </span>

                      </div>

                    </td>


                    <td>
                      {item.broker}
                    </td>


                    <td>
                      {formatMoney(
                        item.available
                      )}
                    </td>


                    <td>
                      {formatMoney(
                        item.usedMargin
                      )}
                    </td>


                    <td>
                      {formatMoney(
                        item.cashLimit
                      )}
                    </td>


                    <td>

                      <span
                        className={`global-fund-reason ${item.status}`}
                      >
                        {item.reason}
                      </span>

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


function FundSummaryCard({
  title,
  value,
  icon,
  type,
}) {
  return (
    <div
      className={`global-fund-summary-card ${type}`}
    >

      <div>
        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>
      </div>


      <div className="global-fund-summary-icon">
        <i className={icon}></i>
      </div>

    </div>
  );
}

export default GlobalFund;