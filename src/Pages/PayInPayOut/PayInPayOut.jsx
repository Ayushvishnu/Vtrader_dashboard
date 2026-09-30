import React, {
  useMemo,
  useState,
} from "react";

import Pagination from "../../Components/Pagination/Pagination";
import Swal from "sweetalert2";

import "./PayInPayOut.css";


const clients = [
  {
    id: "RM10245",
    name: "Rahul Menon",
  },
  {
    id: "AN20981",
    name: "Arjun Nair",
  },
  {
    id: "NJ40582",
    name: "Nikhil Joseph",
  },
  {
    id: "FA10892",
    name: "Faisal Ahmed",
  },
  {
    id: "AK70123",
    name: "Adithya Krishnan",
  },
  {
    id: "SP98234",
    name: "Sneha Pillai",
  },
];


const initialTransactions = [
  {
    id: 1,
    clientCode: "RM10245",
    clientName: "Rahul Menon",
    type: "PAY_IN",
    amount: 150000,
    date: "2026-09-18",
    note: "",
  },

  {
    id: 2,
    clientCode: "AN20981",
    clientName: "Arjun Nair",
    type: "PAY_OUT",
    amount: 25000,
    date: "2026-09-17",
    note: "",
  },

  {
    id: 3,
    clientCode: "NJ40582",
    clientName: "Nikhil Joseph",
    type: "PAY_IN",
    amount: 75000,
    date: "2026-09-16",
    note: "",
  },

  {
    id: 4,
    clientCode: "FA10892",
    clientName: "Faisal Ahmed",
    type: "PAY_IN",
    amount: 100000,
    date: "2026-09-15",
    note: "",
  },

  {
    id: 5,
    clientCode: "AK70123",
    clientName: "Adithya Krishnan",
    type: "PAY_OUT",
    amount: 18000,
    date: "2026-09-14",
    note: "",
  },

  {
    id: 6,
    clientCode: "SP98234",
    clientName: "Sneha Pillai",
    type: "PAY_IN",
    amount: 120000,
    date: "2026-09-13",
    note: "",
  },

  {
    id: 7,
    clientCode: "RM10245",
    clientName: "Rahul Menon",
    type: "PAY_OUT",
    amount: 30000,
    date: "2026-09-12",
    note: "",
  },

  {
    id: 8,
    clientCode: "AN20981",
    clientName: "Arjun Nair",
    type: "PAY_IN",
    amount: 60000,
    date: "2026-09-11",
    note: "",
  },

  {
    id: 9,
    clientCode: "NJ40582",
    clientName: "Nikhil Joseph",
    type: "PAY_IN",
    amount: 90000,
    date: "2026-09-10",
    note: "",
  },

  {
    id: 10,
    clientCode: "FA10892",
    clientName: "Faisal Ahmed",
    type: "PAY_OUT",
    amount: 22000,
    date: "2026-09-09",
    note: "",
  },

  {
    id: 11,
    clientCode: "SP98234",
    clientName: "Sneha Pillai",
    type: "PAY_IN",
    amount: 45000,
    date: "2026-09-08",
    note: "",
  },
];


function PayInPayOut() {
  const [
    transactions,
    setTransactions,
  ] = useState(initialTransactions);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    modalType,
    setModalType,
  ] = useState(null);

  const [
    selectedClient,
    setSelectedClient,
  ] = useState("");

  const [
    amount,
    setAmount,
  ] = useState("");

  const [
    date,
    setDate,
  ] = useState("");

  const [
    note,
    setNote,
  ] = useState("");

  const itemsPerPage = 10;


  /* =====================================================
     FILTER
  ===================================================== */

  const filteredTransactions =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return transactions;
      }

      return transactions.filter(
        (item) =>
          item.clientName
            .toLowerCase()
            .includes(query) ||
          item.clientCode
            .toLowerCase()
            .includes(query)
      );
    }, [
      transactions,
      search,
    ]);


  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredTransactions.length /
          itemsPerPage
      )
    );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const paginatedTransactions =
    filteredTransactions.slice(
      startIndex,
      startIndex +
        itemsPerPage
    );


  /* =====================================================
     FORMAT MONEY
  ===================================================== */

  const formatMoney = (
    value
  ) =>
    `₹ ${Number(value).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;


  /* =====================================================
     OPEN MODAL
  ===================================================== */

  const openModal = (
    type
  ) => {
    setModalType(type);

    setSelectedClient("");
    setAmount("");
    setDate("");
    setNote("");
  };


  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const closeModal =
    () => {
      setModalType(null);
    };


  /* =====================================================
     SAVE TRANSACTION
  ===================================================== */

  const handleSaveTransaction =
    () => {

      if (
        !selectedClient
      ) {
        showWarning(
          "Select Client",
          "Please select a client."
        );

        return;
      }


      if (
        !amount ||
        Number(amount) <= 0
      ) {
        showWarning(
          "Enter Amount",
          "Please enter a valid amount."
        );

        return;
      }


      if (!date) {
        showWarning(
          "Select Date",
          "Please select a transaction date."
        );

        return;
      }


      const client =
        clients.find(
          (item) =>
            item.id ===
            selectedClient
        );


      const newTransaction = {
        id: Date.now(),

        clientCode:
          client.id,

        clientName:
          client.name,

        type:
          modalType === "ADD"
            ? "PAY_IN"
            : "PAY_OUT",

        amount:
          Number(amount),

        date,

        note:
          note.trim(),
      };


      setTransactions(
        (current) => [
          newTransaction,
          ...current,
        ]
      );


      setCurrentPage(1);

      closeModal();


      Swal.fire({
        icon: "success",

        title:
          modalType === "ADD"
            ? "Amount Added"
            : "Amount Withdrawn",

        text:
          modalType === "ADD"
            ? "Pay in transaction added successfully."
            : "Pay out transaction added successfully.",

        toast: true,

        position:
          "top-end",

        timer:
          2000,

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
            "Delete Transaction?",

          text:
            `Delete ${item.clientName}'s transaction?`,

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


      setTransactions(
        (current) =>
          current.filter(
            (transaction) =>
              transaction.id !==
              item.id
          )
      );
    };


  const showWarning = (
    title,
    text
  ) => {
    Swal.fire({
      icon: "warning",

      title,

      text,

      background:
        "#061923",

      color:
        "#ffffff",

      confirmButtonColor:
        "#00b985",
    });
  };


  return (
    <div className="payin-payout-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="payin-payout-heading">

        <div className="payin-payout-heading-icon">

          <i className="fa-solid fa-wallet"></i>

        </div>


        <div>

          <h2>
            PayIn / PayOut
          </h2>

          <p>
            Manage client deposits and withdrawals
          </p>

        </div>

      </div>


      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <section className="payin-payout-card">

        {/* HEADER */}

        <div className="payin-payout-card-header">

          <div>

            <h3>
              Client Transactions
            </h3>

            <p>
              View and manage all payment transactions
            </p>

          </div>


          <div className="payin-payout-header-actions">

            <button
              type="button"
              className="payin-add-btn"
              onClick={() =>
                openModal(
                  "ADD"
                )
              }
            >
              Add
            </button>


            <button
              type="button"
              className="payin-withdraw-btn"
              onClick={() =>
                openModal(
                  "WITHDRAW"
                )
              }
            >
              Withdraw
            </button>

          </div>

        </div>


        {/* SEARCH */}

        <div className="payin-payout-search-row">

          <div className="payin-payout-search">

            <i className="fa-solid fa-magnifying-glass"></i>


            <input
              type="text"
              placeholder="Search by client code or name"
              value={
                search
              }
              onChange={(
                event
              ) => {
                setSearch(
                  event.target.value
                );

                setCurrentPage(
                  1
                );
              }}
            />

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="payin-payout-table-wrap">

          <table className="payin-payout-table">

            <thead>

              <tr>

                <th>
                  SL NO
                </th>

                <th>
                  CUSTOMER
                </th>

                <th>
                  TRANSACTION TYPE
                </th>

                <th>
                  AMOUNT
                </th>

                <th>
                  DATE
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {paginatedTransactions.map(
                (
                  item,
                  index
                ) => (

                  <tr
                    key={
                      item.id
                    }
                  >

                    {/* SL */}

                    <td>

                      <span className="payin-payout-slno">

                        {startIndex +
                          index +
                          1}

                      </span>

                    </td>


                    {/* CUSTOMER */}

                    <td>

                      <div className="payin-payout-customer">

                        <strong>
                          {
                            item.clientName
                          }
                        </strong>


                        <span>
                          {
                            item.clientCode
                          }
                        </span>

                      </div>

                    </td>


                    {/* TYPE */}

                    <td>

                      <span
                        className={`payin-payout-type ${
                          item.type ===
                          "PAY_IN"
                            ? "payin"
                            : "payout"
                        }`}
                      >

                        {item.type ===
                        "PAY_IN"
                          ? "Pay In"
                          : "Pay Out"}

                      </span>

                    </td>


                    {/* AMOUNT */}

                    <td className="payin-payout-amount">

                      {formatMoney(
                        item.amount
                      )}

                    </td>


                    {/* DATE */}

                    <td>

                      {item.date}

                    </td>


                    {/* ACTION */}

                    <td>

                      <button
                        type="button"
                        className="payin-payout-delete"
                        onClick={() =>
                          handleDelete(
                            item
                          )
                        }
                      >

                        <i className="fa-solid fa-trash-can"></i>

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            PAGINATION
        ================================================= */}

        {/* <div className="payin-payout-pagination">

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

        </div> */}
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
      </section>


      {/* =====================================================
          ADD / WITHDRAW MODAL
      ===================================================== */}

      {modalType && (

        <div
          className="payin-payout-modal-overlay"
          onClick={
            closeModal
          }
        >

          <div
            className={`payin-payout-modal ${
              modalType ===
              "WITHDRAW"
                ? "withdraw-modal"
                : ""
            }`}
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="payin-payout-modal-header">

              <div>

                <h3>

                  {modalType ===
                  "ADD"
                    ? "Add Amount"
                    : "Withdraw Amount"}

                </h3>


                <p>

                  {modalType ===
                  "ADD"
                    ? "Add money to a client account"
                    : "Withdraw money from a client account"}

                </p>

              </div>


              <button
                type="button"
                className="payin-payout-modal-close"
                onClick={
                  closeModal
                }
              >

                <i className="fa-solid fa-xmark"></i>

              </button>

            </div>


            {/* BODY */}

            <div className="payin-payout-modal-body">

              {/* CLIENT */}

              <div className="payin-payout-field">

                <label>
                  Select Client
                </label>


                <select
                  value={
                    selectedClient
                  }
                  onChange={(
                    event
                  ) =>
                    setSelectedClient(
                      event.target
                        .value
                    )
                  }
                >

                  <option value="">
                    Select client
                  </option>


                  {clients.map(
                    (client) => (

                      <option
                        key={
                          client.id
                        }
                        value={
                          client.id
                        }
                      >

                        {client.id} - {client.name}

                      </option>

                    )
                  )}

                </select>

              </div>


              {/* AMOUNT / DATE */}

              <div className="row g-3 payin-payout-modal-row">

                <div className="col-12 col-sm-6">

                  <div className="payin-payout-field">

                    <label>
                      Amount
                    </label>


                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={
                        amount
                      }
                      onChange={(
                        event
                      ) =>
                        setAmount(
                          event.target
                            .value
                        )
                      }
                    />

                  </div>

                </div>


                <div className="col-12 col-sm-6">

                  <div className="payin-payout-field">

                    <label>
                      Date
                    </label>


                    <input
                      type="date"
                      value={
                        date
                      }
                      onChange={(
                        event
                      ) =>
                        setDate(
                          event.target
                            .value
                        )
                      }
                    />

                  </div>

                </div>

              </div>


              {/* NOTE */}

              <div className="payin-payout-field payin-payout-note">

                <label>
                  Note

                  <span>
                    (Optional)
                  </span>

                </label>


                <textarea
                  placeholder="Enter note"
                  value={
                    note
                  }
                  onChange={(
                    event
                  ) =>
                    setNote(
                      event.target
                        .value
                    )
                  }
                ></textarea>

              </div>

            </div>


            {/* FOOTER */}

            <div className="payin-payout-modal-footer">

              <button
                type="button"
                className="payin-payout-modal-cancel"
                onClick={
                  closeModal
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className={
                  modalType ===
                  "ADD"
                    ? "payin-payout-modal-add"
                    : "payin-payout-modal-withdraw"
                }
                onClick={
                  handleSaveTransaction
                }
              >

                {modalType ===
                "ADD"
                  ? "Add"
                  : "Withdraw"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


export default PayInPayOut;