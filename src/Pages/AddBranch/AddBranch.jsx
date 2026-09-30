import React, { useEffect, useMemo, useState } from "react";

import Swal from "sweetalert2";
import Pagination from "../../Components/Pagination/Pagination";
import "./AddBranch.css";

const initialBranches = [
  {
    id: 1,
    name: "Calicut Branch",
    location: "Calicut, Kerala",
    status: "ACTIVE",
  },

  {
    id: 2,
    name: "Kochi Branch",
    location: "Kochi, Kerala",
    status: "ACTIVE",
  },

  {
    id: 3,
    name: "Bangalore Branch",
    location: "Bangalore, Karnataka",
    status: "ACTIVE",
  },

  {
    id: 4,
    name: "Mumbai Branch",
    location: "Mumbai, Maharashtra",
    status: "ACTIVE",
  },

  {
    id: 5,
    name: "Chennai Branch",
    location: "Chennai, Tamil Nadu",
    status: "ACTIVE",
  },

  {
    id: 6,
    name: "Delhi Branch",
    location: "New Delhi",
    status: "INACTIVE",
  },

  {
    id: 7,
    name: "Hyderabad Branch",
    location: "Hyderabad, Telangana",
    status: "ACTIVE",
  },

  {
    id: 8,
    name: "Thrissur Branch",
    location: "Thrissur, Kerala",
    status: "ACTIVE",
  },

  {
    id: 9,
    name: "Kannur Branch",
    location: "Kannur, Kerala",
    status: "ACTIVE",
  },

  {
    id: 10,
    name: "Trivandrum Branch",
    location: "Thiruvananthapuram, Kerala",
    status: "ACTIVE",
  },

  {
    id: 11,
    name: "Kollam Branch",
    location: "Kollam, Kerala",
    status: "ACTIVE",
  },
];

function AddBranch() {
  const [branches, setBranches] = useState(initialBranches);

  const [branchName, setBranchName] = useState("");

  const [location, setLocation] = useState("");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [editBranch, setEditBranch] = useState(null);

  const [editName, setEditName] = useState("");

  const [editLocation, setEditLocation] = useState("");

  const branchesPerPage = 10;

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredBranches = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return branches;
    }

    return branches.filter(
      (branch) =>
        branch.name.toLowerCase().includes(query) ||
        branch.location.toLowerCase().includes(query),
    );
  }, [branches, search]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  // const totalPages = Math.max(
  //   1,
  //   Math.ceil(filteredBranches.length / branchesPerPage),
  // );

const totalPages = Math.ceil(
  filteredBranches.length / branchesPerPage
);



useEffect(() => {
  if (
    totalPages > 0 &&
    currentPage > totalPages
  ) {
    setCurrentPage(totalPages);
  }

  if (totalPages === 0) {
    setCurrentPage(1);
  }
}, [
  totalPages,
  currentPage,
]);

  // const startIndex = (currentPage - 1) * branchesPerPage;

  // const paginatedBranches = filteredBranches.slice(
  //   startIndex,
  //   startIndex + branchesPerPage,
  // );

  const startIndex =
  (currentPage - 1) *
  branchesPerPage;

const paginatedBranches =
  filteredBranches.slice(
    startIndex,
    startIndex + branchesPerPage
  );

  /* =====================================================
     ADD BRANCH
  ===================================================== */

  const handleAddBranch = () => {
    if (!branchName.trim()) {
      showWarning("Branch Name Required", "Please enter a branch name.");

      return;
    }

    if (!location.trim()) {
      showWarning("Location Required", "Please enter the branch location.");

      return;
    }

    const exists = branches.some(
      (branch) =>
        branch.name.trim().toLowerCase() === branchName.trim().toLowerCase(),
    );

    if (exists) {
      showWarning("Branch Already Exists", "Please enter another branch name.");

      return;
    }

    const newBranch = {
      id: Date.now(),

      name: branchName.trim(),

      location: location.trim(),

      status: "ACTIVE",
    };

    setBranches((current) => [newBranch, ...current]);

    setBranchName("");
    setLocation("");

    setCurrentPage(1);

    Swal.fire({
      icon: "success",

      title: "Branch Added",

      text: "Branch created successfully.",

      toast: true,

      position: "top-end",

      showConfirmButton: false,

      timer: 2000,

      background: "#061923",

      color: "#ffffff",
    });
  };

  /* =====================================================
     OPEN EDIT
  ===================================================== */

  const openEditBranch = (branch) => {
    setEditBranch(branch);

    setEditName(branch.name);

    setEditLocation(branch.location);
  };

  /* =====================================================
     UPDATE BRANCH
  ===================================================== */

  const handleUpdateBranch = () => {
    if (!editName.trim()) {
      showWarning("Branch Name Required", "Please enter a branch name.");

      return;
    }

    if (!editLocation.trim()) {
      showWarning("Location Required", "Please enter the branch location.");

      return;
    }

    setBranches((current) =>
      current.map((branch) =>
        branch.id === editBranch.id
          ? {
              ...branch,

              name: editName.trim(),

              location: editLocation.trim(),
            }
          : branch,
      ),
    );

    setEditBranch(null);

    Swal.fire({
      icon: "success",

      title: "Branch Updated",

      text: "Branch details updated successfully.",

      toast: true,

      position: "top-end",

      showConfirmButton: false,

      timer: 1800,

      background: "#061923",

      color: "#ffffff",
    });
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (branch) => {
    const result = await Swal.fire({
      icon: "warning",

      title: "Delete Branch?",

      html: `
            <span style="color:#8fa1a8">
              Delete
            </span>

            <strong style="color:#ffffff">
              ${branch.name}
            </strong>

            ?
          `,

      showCancelButton: true,

      confirmButtonText: "Delete",

      cancelButtonText: "Cancel",

      confirmButtonColor: "#dc3545",

      cancelButtonColor: "#42545d",

      background: "#061923",

      color: "#ffffff",
    });

    if (!result.isConfirmed) {
      return;
    }

    setBranches((current) => current.filter((item) => item.id !== branch.id));
  };

  /* =====================================================
     ALERT
  ===================================================== */

  const showWarning = (title, text) => {
    Swal.fire({
      icon: "warning",

      title,

      text,

      background: "#061923",

      color: "#ffffff",

      confirmButtonColor: "#00b985",
    });
  };

  return (
    <div className="addbranch-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="addbranch-heading">
        <div className="addbranch-heading-icon">
          <i className="fa-solid fa-code-branch"></i>
        </div>

        <div>
          <h2>
            Create Branch
            <span>.</span>
          </h2>

          <p>Create and manage business branches</p>
        </div>
      </div>

      {/* =====================================================
          BRANCH INFORMATION
      ===================================================== */}

      <section className="addbranch-card">
        <div className="addbranch-card-header">
          <h3>Branch Information</h3>

          <p>Enter the branch name and its location</p>
        </div>

        <div className="addbranch-card-body">
          <div className="row g-3 align-items-end">
            {/* BRANCH NAME */}

            <div className="col-12 col-md-5">
              <div className="addbranch-field">
                <label>
                  Branch Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter branch name"
                  value={branchName}
                  onChange={(event) => setBranchName(event.target.value)}
                />
              </div>
            </div>

            {/* LOCATION */}

            <div className="col-12 col-md-5">
              <div className="addbranch-field">
                <label>
                  Location
                  <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter branch location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </div>
            </div>

            {/* ADD BUTTON */}

            <div className="col-12 col-md-2">
              <button
                type="button"
                className="addbranch-primary-btn"
                onClick={handleAddBranch}
              >
                <i className="fa-solid fa-plus"></i>
                Add Branch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BRANCH LIST
      ===================================================== */}

      <section className="addbranch-card addbranch-list-card">
        <div className="addbranch-list-header">
          <div>
            <h3>Branches</h3>

            <p>View all created branches</p>
          </div>

          <div className="addbranch-header-actions">
            <div className="addbranch-search">
              <i className="fa-solid fa-magnifying-glass"></i>

              <input
                type="text"
                placeholder="Search branch name or location"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);

                  setCurrentPage(1);
                }}
              />
            </div>

            <span className="addbranch-count">
              {filteredBranches.length} Branches
            </span>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="addbranch-table-wrap">
          <table className="addbranch-table">
            <thead>
              <tr>
                <th>SL NO.</th>

                <th>BRANCH NAME</th>

                <th>LOCATION</th>

                <th>STATUS</th>

                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedBranches.length > 0 ? (
                paginatedBranches.map((branch, index) => (
                  <tr key={branch.id}>
                    {/* SL */}

                    <td>
                      <span className="addbranch-slno">
                        {startIndex + index + 1}
                      </span>
                    </td>

                    {/* BRANCH */}

                    <td className="addbranch-name">{branch.name}</td>

                    {/* LOCATION */}

                    <td>{branch.location}</td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={`addbranch-status ${
                          branch.status === "ACTIVE" ? "active" : "inactive"
                        }`}
                      >
                        {branch.status}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="addbranch-actions">
                        <button
                          type="button"
                          className="addbranch-edit-btn"
                          onClick={() => openEditBranch(branch)}
                        >
                          <i className="fa-solid fa-pen"></i>
                          Edit
                        </button>

                        <button
                          type="button"
                          className="addbranch-delete-btn"
                          onClick={() => handleDelete(branch)}
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
                  <td colSpan="5" className="addbranch-empty">
                    No branches found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {/* <div className="addbranch-pagination">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <span>
            {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
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
          EDIT BRANCH MODAL
      ===================================================== */}

      {editBranch && (
        <div
          className="addbranch-modal-overlay"
          onClick={() => setEditBranch(null)}
        >
          <div
            className="addbranch-edit-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {/* HEADER */}

            <div className="addbranch-modal-header">
              <div>
                <h3>Edit Branch</h3>

                <p>Update the selected branch information</p>
              </div>

              <button
                type="button"
                className="addbranch-modal-close"
                onClick={() => setEditBranch(null)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* BODY */}

            <div className="addbranch-modal-body">
              <div className="addbranch-field">
                <label>
                  Branch Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                />
              </div>

              <div className="addbranch-field addbranch-edit-location">
                <label>
                  Location
                  <span>*</span>
                </label>

                <input
                  type="text"
                  value={editLocation}
                  onChange={(event) => setEditLocation(event.target.value)}
                />
              </div>
            </div>

            {/* FOOTER */}

            <div className="addbranch-modal-footer">
              <button
                type="button"
                className="addbranch-modal-cancel"
                onClick={() => setEditBranch(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="addbranch-modal-save"
                onClick={handleUpdateBranch}
              >
                <i className="fa-solid fa-check"></i>
                Update Branch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBranch;
