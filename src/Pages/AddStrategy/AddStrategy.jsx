import React, { useMemo, useState, useEffect } from "react";
import Pagination from "../../Components/Pagination/Pagination";

import Swal from "sweetalert2";

import "./AddStrategy.css";

const initialStrategies = [
  {
    id: 1,
    name: "Growth Strategy",
  },

  {
    id: 2,
    name: "Momentum Strategy",
  },

  {
    id: 3,
    name: "Long Term Wealth",
  },

  {
    id: 4,
    name: "Intraday Alpha",
  },

  {
    id: 5,
    name: "Balanced Portfolio",
  },

  {
    id: 6,
    name: "Value Investment",
  },

  {
    id: 7,
    name: "Options Premium",
  },

  {
    id: 8,
    name: "Equity Growth",
  },

  {
    id: 9,
    name: "Bluechip Portfolio",
  },

  {
    id: 10,
    name: "Priority Growth",
  },

  {
    id: 11,
    name: "Swing Strategy",
  },

  {
    id: 12,
    name: "Dividend Strategy",
  },
];

function AddStrategy() {
  const [strategies, setStrategies] = useState(initialStrategies);

  const [strategyName, setStrategyName] = useState("");

  const [search, setSearch] = useState("");

  const [editStrategy, setEditStrategy] = useState(null);

  const [editName, setEditName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const strategiesPerPage = 10;

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredStrategies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return strategies;
    }

    return strategies.filter((strategy) =>
      strategy.name.toLowerCase().includes(query),
    );
  }, [strategies, search]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.ceil(filteredStrategies.length / strategiesPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * strategiesPerPage;

  const paginatedStrategies = filteredStrategies.slice(
    startIndex,
    startIndex + strategiesPerPage,
  );

  /* =====================================================
     ADD STRATEGY
  ===================================================== */

  const handleAddStrategy = () => {
    if (!strategyName.trim()) {
      Swal.fire({
        icon: "warning",

        title: "Strategy Name Required",

        text: "Please enter a strategy name.",

        background: "#061923",

        color: "#ffffff",

        confirmButtonColor: "#00b985",
      });

      return;
    }

    const exists = strategies.some(
      (strategy) =>
        strategy.name.trim().toLowerCase() ===
        strategyName.trim().toLowerCase(),
    );

    if (exists) {
      Swal.fire({
        icon: "warning",

        title: "Strategy Already Exists",

        text: "Please enter a different strategy name.",

        background: "#061923",

        color: "#ffffff",

        confirmButtonColor: "#00b985",
      });

      return;
    }

    const newStrategy = {
      id: Date.now(),

      name: strategyName.trim(),
    };

    setStrategies((current) => [newStrategy, ...current]);

    setStrategyName("");

    setCurrentPage(1);

    Swal.fire({
      icon: "success",

      title: "Strategy Added",

      text: "Strategy created successfully.",

      toast: true,

      position: "top-end",

      timer: 2000,

      showConfirmButton: false,

      background: "#061923",

      color: "#ffffff",
    });
  };

  /* =====================================================
     OPEN EDIT
  ===================================================== */

  const handleOpenEdit = (strategy) => {
    setEditStrategy(strategy);

    setEditName(strategy.name);
  };

  /* =====================================================
     UPDATE
  ===================================================== */

  const handleUpdateStrategy = () => {
    if (!editName.trim()) {
      Swal.fire({
        icon: "warning",

        title: "Strategy Name Required",

        background: "#061923",

        color: "#ffffff",

        confirmButtonColor: "#00b985",
      });

      return;
    }

    setStrategies((current) =>
      current.map((strategy) =>
        strategy.id === editStrategy.id
          ? {
              ...strategy,

              name: editName.trim(),
            }
          : strategy,
      ),
    );

    setEditStrategy(null);

    Swal.fire({
      icon: "success",

      title: "Strategy Updated",

      toast: true,

      position: "top-end",

      timer: 1800,

      showConfirmButton: false,

      background: "#061923",

      color: "#ffffff",
    });
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (strategy) => {
    const result = await Swal.fire({
      icon: "warning",

      title: "Delete Strategy?",

      html: `
            <span style="color:#8da1aa">
              Delete
            </span>

            <strong style="color:#ffffff">
              ${strategy.name}
            </strong>

            ?
          `,

      showCancelButton: true,

      confirmButtonText: "Delete",

      confirmButtonColor: "#dc3545",

      cancelButtonColor: "#42545d",

      background: "#061923",

      color: "#ffffff",
    });

    if (!result.isConfirmed) {
      return;
    }

    setStrategies((current) =>
      current.filter((item) => item.id !== strategy.id),
    );
  };

  return (
    <div className="addstrategy-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="addstrategy-heading">
        <div className="addstrategy-heading-icon">
          <i className="fa-solid fa-chart-line"></i>
        </div>

        <div>
          <h2>
            Create Strategy
            <span>.</span>
          </h2>

          <p>Create and manage trading strategies</p>
        </div>
      </div>

      {/* =====================================================
          STRATEGY INFORMATION
      ===================================================== */}

      <section className="addstrategy-card">
        <div className="addstrategy-card-header">
          <h3>Strategy Information</h3>

          <p>Enter the name of the new trading strategy</p>
        </div>

        <div className="addstrategy-card-body">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-lg-6">
              <div className="addstrategy-field">
                <label>
                  Strategy Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter strategy name"
                  value={strategyName}
                  onChange={(event) => setStrategyName(event.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-lg-auto">
              <button
                type="button"
                className="addstrategy-primary-btn"
                onClick={handleAddStrategy}
              >
                <i className="fa-solid fa-plus"></i>
                Add Strategy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STRATEGIES
      ===================================================== */}

      <section className="addstrategy-card addstrategy-list-card">
        <div className="addstrategy-list-header">
          <div>
            <h3>Strategies</h3>

            <p>View and manage created strategies</p>
          </div>

          <div className="addstrategy-header-actions">
            <div className="addstrategy-search">
              <i className="fa-solid fa-magnifying-glass"></i>

              <input
                type="text"
                placeholder="Search strategy name"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);

                  setCurrentPage(1);
                }}
              />
            </div>

            <span className="addstrategy-count">
              {filteredStrategies.length} Strategies
            </span>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="addstrategy-table-wrap">
          <table className="addstrategy-table">
            <thead>
              <tr>
                <th>SL NO.</th>

                <th>STRATEGY NAME</th>

                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedStrategies.length > 0 ? (
                paginatedStrategies.map((strategy, index) => (
                  <tr key={strategy.id}>
                    <td>
                      <span className="addstrategy-slno">
                        {startIndex + index + 1}
                      </span>
                    </td>

                    <td className="addstrategy-name">{strategy.name}</td>

                    <td>
                      <div className="addstrategy-actions">
                        <button
                          type="button"
                          className="addstrategy-edit-btn"
                          onClick={() => handleOpenEdit(strategy)}
                        >
                          <i className="fa-solid fa-pen"></i>
                          Edit
                        </button>

                        <button
                          type="button"
                          className="addstrategy-delete-btn"
                          onClick={() => handleDelete(strategy)}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="addstrategy-empty">
                    No strategies found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {/* <div className="addstrategy-pagination">

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
          EDIT MODAL
      ===================================================== */}

      {editStrategy && (
        <div
          className="addstrategy-modal-overlay"
          onClick={() => setEditStrategy(null)}
        >
          <div
            className="addstrategy-edit-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {/* HEADER */}

            <div className="addstrategy-modal-header">
              <div>
                <h3>Edit Strategy</h3>

                <p>Update the selected strategy name</p>
              </div>

              <button
                type="button"
                className="addstrategy-modal-close"
                onClick={() => setEditStrategy(null)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* BODY */}

            <div className="addstrategy-modal-body">
              <div className="addstrategy-field">
                <label>
                  Strategy Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                />
              </div>
            </div>

            {/* FOOTER */}

            <div className="addstrategy-modal-footer">
              <button
                type="button"
                className="addstrategy-modal-cancel"
                onClick={() => setEditStrategy(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="addstrategy-modal-save"
                onClick={handleUpdateStrategy}
              >
                <i className="fa-solid fa-check"></i>
                Update Strategy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddStrategy;
