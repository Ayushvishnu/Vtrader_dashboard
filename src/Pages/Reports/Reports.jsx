import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";

import "./Reports.css";


const initialReports = [
  {
    id: 1,

    customerName: "Rahul Menon",
    clientCode: "RM10245",
    broker: "Alice Blue",

    stockName: "RELIANCE-EQ",

    ltp: 1468.25,
    slPrice: 1400,
    orderPrice: 1435.5,
    netBuyPrice: 1438.2,
    targetPrice: 1520,

    quantity: 25,
    lotSize: 1,

    sellDate: "-",
    sellPrice: "-",
    netSellPrice: "-",

    bookedPnl: 0,

    status: "HOLD",

    runningPnl: 751.25,
    runningPnlPercentage: 2.08,

    indications: "Positive",
    value: 36706.25,

    intradaySellPrice: "-",

    portfolio: "Core",

    daysHold: 3,

    tradingType: "LONGTERM",

    fundingAmount: 0,
    charge: 0,

    actualBuyPrice: 1435.5,

    newBuyProductName: "DELIVERY",

    side: "BUY",
    tradeType: "LONGTERM",
    productName: "DELIVERY",
    date: "2026-09-21",
  },

  {
    id: 2,

    customerName: "Arjun Nair",
    clientCode: "AN20981",
    broker: "IIFL",

    stockName: "INFY-EQ",

    ltp: 1495.4,
    slPrice: 1450,
    orderPrice: 1478.8,
    netBuyPrice: 1481,
    targetPrice: 1540,

    quantity: 30,
    lotSize: 1,

    sellDate: "-",
    sellPrice: "-",
    netSellPrice: "-",

    bookedPnl: 0,

    status: "HOLD",

    runningPnl: 432,
    runningPnlPercentage: 0.97,

    indications: "Positive",
    value: 44862,

    intradaySellPrice: "-",

    portfolio: "Premium",

    daysHold: 6,

    tradingType: "LONGTERM",

    fundingAmount: 12000,
    charge: 250,

    actualBuyPrice: 1478.8,

    newBuyProductName: "DELIVERY",

    side: "BUY",
    tradeType: "LONGTERM",
    productName: "DELIVERY",
    date: "2026-09-18",
  },

  {
    id: 3,

    customerName: "Nikhil Joseph",
    clientCode: "NJ40582",
    broker: "Alice Blue",

    stockName: "SBIN-EQ",

    ltp: 812.4,
    slPrice: 790,
    orderPrice: 798.5,
    netBuyPrice: 800.1,
    targetPrice: 840,

    quantity: 50,
    lotSize: 1,

    sellDate: "2026-09-17",
    sellPrice: 825.75,
    netSellPrice: 823.9,

    bookedPnl: 1190,

    status: "EXIT",

    runningPnl: 0,
    runningPnlPercentage: 0,

    indications: "Closed",
    value: 40620,

    intradaySellPrice: 825.75,

    portfolio: "Growth",

    daysHold: 8,

    tradingType: "INTRADAY",

    fundingAmount: 0,
    charge: 180,

    actualBuyPrice: 798.5,

    newBuyProductName: "INTRADAY",

    side: "SELL",
    tradeType: "INTRADAY",
    productName: "INTRADAY",
    date: "2026-09-17",
  },

  {
    id: 4,

    customerName: "Faisal Ahmed",
    clientCode: "FA10892",
    broker: "IIFL",

    stockName: "TATAMOTORS-EQ",

    ltp: 964.35,
    slPrice: 930,
    orderPrice: 948.6,
    netBuyPrice: 950.2,
    targetPrice: 995,

    quantity: 40,
    lotSize: 1,

    sellDate: "-",
    sellPrice: "-",
    netSellPrice: "-",

    bookedPnl: 0,

    status: "PENDING_SELL",

    runningPnl: 566,
    runningPnlPercentage: 1.49,

    indications: "Watch",

    value: 38574,

    intradaySellPrice: "-",

    portfolio: "Momentum",

    daysHold: 2,

    tradingType: "LONGTERM",

    fundingAmount: 18000,
    charge: 275,

    actualBuyPrice: 948.6,

    newBuyProductName: "DELIVERY",

    side: "BUY",
    tradeType: "LONGTERM",
    productName: "DELIVERY",
    date: "2026-09-20",
  },
];


const emptyReportForm = {
  customerName: "",
  stockName: "",
  date: "",
  side: "",
  tradeType: "",
  productName: "",
};


function Reports() {
  const [reports, setReports] =
    useState(initialReports);

  const [csvFile, setCsvFile] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [instrument, setInstrument] =
    useState("ALL");

  const [showReportModal, setShowReportModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [selectedReport, setSelectedReport] =
    useState(null);

  const [editingReport, setEditingReport] =
    useState(null);

  const [reportForm, setReportForm] =
    useState(emptyReportForm);


  /* =====================================================
     FILTER
  ===================================================== */

  const filteredReports =
    useMemo(() => {
      return reports.filter((item) => {
        const query =
          search.toLowerCase();

        const matchesSearch =
          item.customerName
            .toLowerCase()
            .includes(query) ||
          item.clientCode
            .toLowerCase()
            .includes(query) ||
          item.stockName
            .toLowerCase()
            .includes(query);

        const matchesInstrument =
          instrument === "ALL" ||
          item.stockName.includes(
            instrument
          );

        return (
          matchesSearch &&
          matchesInstrument
        );
      });
    }, [
      reports,
      search,
      instrument,
    ]);


  /* =====================================================
     CSV
  ===================================================== */

  const handleCsvSubmit = () => {
    if (!csvFile) {
      Swal.fire({
        icon: "warning",
        title: "CSV File Not Chosen",
        text: "Please choose a CSV file before submitting.",
        background: "#061923",
        color: "#ffffff",
        confirmButtonColor: "#00b985",
      });

      return;
    }

    Swal.fire({
      icon: "success",
      title: "CSV Uploaded",
      text: `${csvFile.name} submitted successfully.`,
      background: "#061923",
      color: "#ffffff",
      confirmButtonColor: "#00b985",
    });
  };


  /* =====================================================
     OPEN ADD
  ===================================================== */

  const openAddReport = () => {
    setEditingReport(null);

    setReportForm(
      emptyReportForm
    );

    setShowReportModal(true);
  };


  /* =====================================================
     EDIT
  ===================================================== */

  const openEditReport = (
    report
  ) => {
    setEditingReport(report);

    setReportForm({
      customerName:
        report.customerName,

      stockName:
        report.stockName,

      date:
        report.date,

      side:
        report.side,

      tradeType:
        report.tradeType,

      productName:
        report.productName,
    });

    setShowReportModal(true);
  };


  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleReportFormChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setReportForm(
      (current) => ({
        ...current,

        [name]: value,
      })
    );
  };


  /* =====================================================
     SAVE REPORT
  ===================================================== */

  const handleSaveReport = () => {
    if (
      !reportForm.customerName
    ) {
      showWarning(
        "Select Customer",
        "Please select a customer."
      );

      return;
    }


    if (!reportForm.stockName) {
      showWarning(
        "Select Stock",
        "Please select or enter a stock."
      );

      return;
    }


    if (!reportForm.date) {
      showWarning(
        "Select Date",
        "Please select a date."
      );

      return;
    }


    if (!reportForm.side) {
      showWarning(
        "Select Side",
        "Please select BUY or SELL."
      );

      return;
    }


    if (!reportForm.tradeType) {
      showWarning(
        "Trade Type Required",
        "Please select a trade type."
      );

      return;
    }


    if (!reportForm.productName) {
      showWarning(
        "Product Required",
        "Please enter a product name."
      );

      return;
    }


    if (editingReport) {
      setReports(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              editingReport.id
                ? {
                    ...item,

                    ...reportForm,
                  }
                : item
          )
      );
    } else {
      const newReport = {
        id: Date.now(),

        ...reportForm,

        clientCode:
          "NEW001",

        broker:
          "IIFL",

        ltp: 0,
        slPrice: 0,
        orderPrice: 0,
        netBuyPrice: 0,
        targetPrice: 0,

        quantity: 0,
        lotSize: 1,

        sellDate: "-",
        sellPrice: "-",
        netSellPrice: "-",

        bookedPnl: 0,

        status: "HOLD",

        runningPnl: 0,

        runningPnlPercentage:
          0,

        indications: "-",

        value: 0,

        intradaySellPrice: "-",

        portfolio: "-",

        daysHold: 0,

        tradingType:
          reportForm.tradeType,

        fundingAmount: 0,

        charge: 0,

        actualBuyPrice: 0,

        newBuyProductName:
          reportForm.productName,
      };


      setReports(
        (current) => [
          newReport,
          ...current,
        ]
      );
    }


    setShowReportModal(false);


    Swal.fire({
      icon: "success",

      title: editingReport
        ? "Report Updated"
        : "Report Added",

      text: editingReport
        ? "Report updated successfully."
        : "Report added successfully.",

      background: "#061923",

      color: "#ffffff",

      confirmButtonColor:
        "#00b985",
    });
  };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = (
    report
  ) => {
    Swal.fire({
      icon: "warning",

      title: "Delete Report?",

      html: `
        Are you sure you want to delete
        <strong style="color:#00d9a0">
          ${report.stockName}
        </strong>
        ?
      `,

      showCancelButton: true,

      confirmButtonText:
        "Delete",

      cancelButtonText:
        "Cancel",

      confirmButtonColor:
        "#dc4854",

      cancelButtonColor:
        "#263942",

      background: "#061923",

      color: "#ffffff",

    }).then((result) => {
      if (
        result.isConfirmed
      ) {
        setReports(
          (current) =>
            current.filter(
              (item) =>
                item.id !==
                report.id
            )
        );
      }
    });
  };


  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (
    report
  ) => {
    setSelectedReport(
      report
    );

    setShowViewModal(true);
  };


  const showWarning = (
    title,
    text
  ) => {
    Swal.fire({
      icon: "warning",
      title,
      text,

      background: "#061923",

      color: "#ffffff",

      confirmButtonColor:
        "#00b985",
    });
  };


  const formatMoney = (
    value
  ) => {
    if (
      value === "-" ||
      value === null ||
      value === undefined
    ) {
      return "-";
    }

    return Number(
      value
    ).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,

        maximumFractionDigits: 2,
      }
    );
  };


  return (
    <div className="reports-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="reports-page-heading">

        <div className="reports-heading-icon">

          <i className="fa-solid fa-file-lines"></i>

        </div>


        <div>

          <h2>
            Report
          </h2>

          <p>
            View, filter and export trading reports
          </p>

        </div>

      </div>


      {/* =====================================================
          TOOL CARD
      ===================================================== */}

      <div className="reports-toolbar-card">

        {/* CSV ROW */}

        <div className="reports-import-row">

          <div>

            <label>
              Import CSV Manually
            </label>


            <div className="reports-file-row">

              <input
                type="file"
                accept=".csv"
                onChange={(
                  event
                ) =>
                  setCsvFile(
                    event
                      .target
                      .files[0] ||
                      null
                  )
                }
              />


              <button
                type="button"
                className="report-csv-submit-btn"
                onClick={
                  handleCsvSubmit
                }
              >
                Submit

                <i className="fa-solid fa-circle-check"></i>
              </button>

            </div>

          </div>


          <button
            type="button"
            className="report-download-btn"
          >
            Download

            <i className="fa-solid fa-download"></i>
          </button>

        </div>


        {/* FILTER ROW */}

        <div className="reports-filter-row">

          <div className="reports-search">

            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Search client or stock..."
              value={search}
              onChange={(
                event
              ) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>


          <div className="reports-filter-actions">

            <select
              value={
                instrument
              }
              onChange={(
                event
              ) =>
                setInstrument(
                  event.target.value
                )
              }
            >

              <option value="ALL">
                All Instruments
              </option>

              <option value="-EQ">
                Equity
              </option>

              <option value="NIFTY">
                NFO
              </option>

            </select>


            <button
              type="button"
              className="reports-clear-btn"
              onClick={() => {
                setSearch("");

                setInstrument(
                  "ALL"
                );
              }}
            >
              <i className="fa-solid fa-filter-circle-xmark"></i>

              Clear All Filters
            </button>


            <button
              type="button"
              className="reports-add-btn"
              onClick={
                openAddReport
              }
            >
              <i className="fa-solid fa-plus"></i>
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="reports-table-card">

        <div className="reports-table-wrap">

          <table className="reports-table">

            <thead>

              <tr>

                <th>SL NO</th>

                <th>
                  CUSTOMER NAME
                </th>

                <th>
                  CLIENT CODE
                </th>

                <th>BROKER</th>

                <th>
                  STOCK NAME
                </th>

                <th>LTP</th>

                <th>SL PRICE</th>

                <th>
                  ORDER PRICE
                </th>

                <th>
                  NET BUY PRICE
                </th>

                <th>
                  TARGET PRICE
                </th>

                <th>QUANTITY</th>

                <th>LOT SIZE</th>

                <th>SELL DATE</th>

                <th>SELL PRICE</th>

                <th>
                  NET SELL PRICE
                </th>

                <th>
                  BOOKED P&amp;L
                </th>

                <th>STATUS</th>

                <th>
                  RUNNING P&amp;L
                </th>

                <th>
                  RUNNING P&amp;L %
                </th>

                <th>
                  INDICATIONS
                </th>

                <th>VALUE</th>

                <th>
                  INTRADAY SELL PRICE
                </th>

                <th>
                  PORTFOLIO
                </th>

                <th>
                  DAYS HOLD
                </th>

                <th>
                  TRADING TYPE
                </th>

                <th>
                  FUNDING AMOUNT
                </th>

                <th>
                  CHARGE
                </th>

                <th>
                  ACTUAL BUY PRICE
                </th>

                <th>
                  NEW BUY PRODUCT NAME
                </th>

                <th>
                  ACTIONS
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredReports.map(
                (
                  report,
                  index
                ) => (

                  <tr
                    key={
                      report.id
                    }
                  >

                    <td>

                      <span className="report-slno">
                        {index + 1}
                      </span>

                    </td>


                    <td>
                      {report.customerName}
                    </td>

                    <td>
                      {report.clientCode}
                    </td>

                    <td>
                      {report.broker}
                    </td>

                    <td className="report-stock-name">
                      {report.stockName}
                    </td>

                    <td>
                      {formatMoney(
                        report.ltp
                      )}
                    </td>

                    <td>
                      {formatMoney(
                        report.slPrice
                      )}
                    </td>

                    <td>
                      {formatMoney(
                        report.orderPrice
                      )}
                    </td>

                    <td>
                      {formatMoney(
                        report.netBuyPrice
                      )}
                    </td>

                    <td>
                      {formatMoney(
                        report.targetPrice
                      )}
                    </td>


                    <td className="report-quantity">
                      {report.quantity}
                    </td>


                    <td>
                      {report.lotSize}
                    </td>


                    <td>
                      {report.sellDate}
                    </td>


                    <td>
                      {formatMoney(
                        report.sellPrice
                      )}
                    </td>


                    <td>
                      {formatMoney(
                        report.netSellPrice
                      )}
                    </td>


                    <td
                      className={
                        report.bookedPnl >
                        0
                          ? "report-profit"
                          : report.bookedPnl <
                            0
                          ? "report-loss"
                          : ""
                      }
                    >
                      {formatMoney(
                        report.bookedPnl
                      )}
                    </td>


                    <td>

                      <StatusBadge
                        status={
                          report.status
                        }
                      />

                    </td>


                    <td
                      className={
                        report.runningPnl >
                        0
                          ? "report-profit"
                          : report.runningPnl <
                            0
                          ? "report-loss"
                          : ""
                      }
                    >
                      {formatMoney(
                        report.runningPnl
                      )}
                    </td>


                    <td>
                      {
                        report.runningPnlPercentage
                      }
                      %
                    </td>


                    <td>
                      {report.indications}
                    </td>


                    <td>
                      {formatMoney(
                        report.value
                      )}
                    </td>


                    <td>
                      {formatMoney(
                        report.intradaySellPrice
                      )}
                    </td>


                    <td>
                      {report.portfolio}
                    </td>


                    <td>
                      {report.daysHold}
                    </td>


                    <td>
                      {report.tradingType}
                    </td>


                    <td>
                      {formatMoney(
                        report.fundingAmount
                      )}
                    </td>


                    <td>
                      {formatMoney(
                        report.charge
                      )}
                    </td>


                    <td>
                      {formatMoney(
                        report.actualBuyPrice
                      )}
                    </td>


                    <td>
                      {
                        report.newBuyProductName
                      }
                    </td>


                    {/* ACTION */}

                    <td>

                      <div className="report-actions">

                        <button
                          type="button"
                          className="report-action-btn view"
                          title="View"
                          onClick={() =>
                            handleView(
                              report
                            )
                          }
                        >
                          <i className="fa-regular fa-eye"></i>
                        </button>


                        <button
                          type="button"
                          className="report-action-btn edit"
                          title="Edit"
                          onClick={() =>
                            openEditReport(
                              report
                            )
                          }
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>


                        <button
                          type="button"
                          className="report-action-btn delete"
                          title="Delete"
                          onClick={() =>
                            handleDelete(
                              report
                            )
                          }
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        {/* FOOTER */}

        <div className="reports-table-footer">

          <span>
            1 to {filteredReports.length} of {filteredReports.length}
          </span>


          <div className="reports-pagination">

            <button>
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button className="active">
              1 of 1
            </button>

            <button>
              <i className="fa-solid fa-chevron-right"></i>
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          ADD / EDIT REPORT MODAL
      ===================================================== */}

      {showReportModal && (

        <div
          className="report-modal-overlay"
          onMouseDown={() =>
            setShowReportModal(
              false
            )
          }
        >

          <div
            className="report-form-modal"
            onMouseDown={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="report-modal-header">

              <h3>

                {editingReport
                  ? "Edit Report"
                  : "Add Report"}

              </h3>


              <button
                type="button"
                onClick={() =>
                  setShowReportModal(
                    false
                  )
                }
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

            </div>


            {/* BODY */}

            <div className="report-modal-body">

              <div className="row g-3">

                <ReportSelect
                  label="Customer"
                  name="customerName"
                  value={
                    reportForm.customerName
                  }
                  onChange={
                    handleReportFormChange
                  }
                  placeholder="Search customer"
                  options={[
                    "Rahul Menon",
                    "Arjun Nair",
                    "Nikhil Joseph",
                    "Faisal Ahmed",
                  ]}
                />


                <ReportInput
                  label="Stock"
                  name="stockName"
                  value={
                    reportForm.stockName
                  }
                  onChange={
                    handleReportFormChange
                  }
                  placeholder="Select or enter stock"
                />


                <ReportInput
                  label="Date"
                  type="date"
                  name="date"
                  value={
                    reportForm.date
                  }
                  onChange={
                    handleReportFormChange
                  }
                />


                <ReportSelect
                  label="Side"
                  name="side"
                  value={
                    reportForm.side
                  }
                  onChange={
                    handleReportFormChange
                  }
                  placeholder="Select side"
                  options={[
                    "BUY",
                    "SELL",
                  ]}
                />


                <ReportSelect
                  label="Trade Type"
                  name="tradeType"
                  value={
                    reportForm.tradeType
                  }
                  onChange={
                    handleReportFormChange
                  }
                  placeholder="Select trade type"
                  options={[
                    "INTRADAY",
                    "LONGTERM",
                  ]}
                />


                <ReportInput
                  label="Product Name"
                  name="productName"
                  value={
                    reportForm.productName
                  }
                  onChange={
                    handleReportFormChange
                  }
                  placeholder="Enter product name"
                />

              </div>

            </div>


            {/* FOOTER */}

            <div className="report-modal-footer">

              <button
                type="button"
                className="report-modal-close-btn"
                onClick={() =>
                  setShowReportModal(
                    false
                  )
                }
              >
                Close
              </button>


              <button
                type="button"
                className="report-modal-submit-btn"
                onClick={
                  handleSaveReport
                }
              >
                Submit
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {showViewModal &&
        selectedReport && (

        <div
          className="report-modal-overlay"
          onMouseDown={() =>
            setShowViewModal(
              false
            )
          }
        >

          <div
            className="report-view-modal"
            onMouseDown={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            <h2>
              {
                selectedReport.stockName
              }
            </h2>


            <ReportDetail
              label="Customer"
              value={
                selectedReport.customerName
              }
            />


            <ReportDetail
              label="Client Code"
              value={
                selectedReport.clientCode
              }
            />


            <ReportDetail
              label="Broker"
              value={
                selectedReport.broker
              }
            />


            <ReportDetail
              label="Status"
              value={
                selectedReport.status
              }
            />


            <ReportDetail
              label="Trade Type"
              value={
                selectedReport.tradeType
              }
            />


            <ReportDetail
              label="Product"
              value={
                selectedReport.productName
              }
            />


            <ReportDetail
              label="Running P&L"
              value={formatMoney(
                selectedReport.runningPnl
              )}
            />


            <button
              type="button"
              className="report-view-close-btn"
              onClick={() =>
                setShowViewModal(
                  false
                )
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


/* =====================================================
   HELPERS
===================================================== */

function StatusBadge({
  status,
}) {
  return (
    <span
      className={`report-status ${status
        .toLowerCase()
        .replaceAll("_", "-")}`}
    >
      {status.replaceAll(
        "_",
        " "
      )}
    </span>
  );
}


function ReportInput({
  label,
  ...props
}) {
  return (
    <div className="col-12 col-md-6">

      <div className="report-modal-field">

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


function ReportSelect({
  label,
  options,
  placeholder,
  ...props
}) {
  return (
    <div className="col-12 col-md-6">

      <div className="report-modal-field">

        <label>
          {label}
        </label>

        <select
          {...props}
        >

          <option value="">
            {placeholder}
          </option>

          {options.map(
            (option) => (

              <option
                key={
                  option
                }
                value={
                  option
                }
              >
                {option}
              </option>

            )
          )}

        </select>

      </div>

    </div>
  );
}


function ReportDetail({
  label,
  value,
}) {
  return (
    <div className="report-detail-row">

      <strong>
        {label}:
      </strong>

      <span>
        {value}
      </span>

    </div>
  );
}


export default Reports;