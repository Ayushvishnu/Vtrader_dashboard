import React, { useMemo, useState, useEffect } from "react";
import Pagination from "../../Components/Pagination/Pagination";

import Swal from "sweetalert2";


import "./AddGroup.css";


const initialGroups = [
  {
    id: 1,
    name: "Premium Clients",
    description:
      "High-value investment clients",
  },

  {
    id: 2,
    name: "Intraday Traders",
    description:
      "Clients actively trading intraday",
  },

  {
    id: 3,
    name: "Long Term Investors",
    description:
      "Clients focused on long term investments",
  },

  {
    id: 4,
    name: "Options Traders",
    description:
      "Clients primarily trading options",
  },

  {
    id: 5,
    name: "Equity Clients",
    description:
      "Clients focused on equity investments",
  },

  {
    id: 6,
    name: "Priority Desk",
    description:
      "Priority managed customer accounts",
  },
];


function AddGroup() {
  const [
    groups,
    setGroups,
  ] = useState(initialGroups);

  const [
    groupName,
    setGroupName,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    viewGroup,
    setViewGroup,
  ] = useState(null);

  const [
    editGroup,
    setEditGroup,
  ] = useState(null);

  const [
    editName,
    setEditName,
  ] = useState("");

  const [
    editDescription,
    setEditDescription,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const groupsPerPage = 10;


  /* =====================================================
     FILTER
  ===================================================== */

  const filteredGroups =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return groups;
      }

      return groups.filter(
        (group) =>
          group.name
            .toLowerCase()
            .includes(query) ||
          group.description
            .toLowerCase()
            .includes(query)
      );
    }, [
      groups,
      search,
    ]);


  /* =====================================================
     PAGINATION
  ===================================================== */

const totalPages = Math.ceil(
  filteredGroups.length /
    groupsPerPage
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

  const startIndex =
    (currentPage - 1) *
    groupsPerPage;


  const paginatedGroups =
    filteredGroups.slice(
      startIndex,
      startIndex +
        groupsPerPage
    );


  /* =====================================================
     ADD GROUP
  ===================================================== */

  const handleAddGroup =
    () => {

      if (!groupName.trim()) {
        Swal.fire({
          icon:
            "warning",

          title:
            "Group Name Required",

          text:
            "Please enter a group name.",

          background:
            "#061923",

          color:
            "#ffffff",

          confirmButtonColor:
            "#00b985",
        });

        return;
      }


      const alreadyExists =
        groups.some(
          (group) =>
            group.name
              .trim()
              .toLowerCase() ===
            groupName
              .trim()
              .toLowerCase()
        );


      if (alreadyExists) {
        Swal.fire({
          icon:
            "warning",

          title:
            "Group Already Exists",

          text:
            "Please enter a different group name.",

          background:
            "#061923",

          color:
            "#ffffff",

          confirmButtonColor:
            "#00b985",
        });

        return;
      }


      const newGroup = {
        id:
          Date.now(),

        name:
          groupName.trim(),

        description:
          description.trim(),
      };


      setGroups(
        (current) => [
          newGroup,
          ...current,
        ]
      );


      setGroupName("");
      setDescription("");

      setCurrentPage(1);


      Swal.fire({
        icon:
          "success",

        title:
          "Group Added",

        text:
          "Group created successfully.",

        toast:
          true,

        position:
          "top-end",

        showConfirmButton:
          false,

        timer:
          2000,

        background:
          "#061923",

        color:
          "#ffffff",
      });
    };


  /* =====================================================
     OPEN EDIT
  ===================================================== */

  const openEditGroup =
    (group) => {

      setEditGroup(group);

      setEditName(
        group.name
      );

      setEditDescription(
        group.description
      );
    };


  /* =====================================================
     UPDATE GROUP
  ===================================================== */

  const handleUpdateGroup =
    () => {

      if (
        !editName.trim()
      ) {
        return;
      }


      setGroups(
        (current) =>
          current.map(
            (group) =>
              group.id ===
              editGroup.id
                ? {
                    ...group,

                    name:
                      editName.trim(),

                    description:
                      editDescription.trim(),
                  }
                : group
          )
      );


      setEditGroup(null);


      Swal.fire({
        icon:
          "success",

        title:
          "Group Updated",

        toast:
          true,

        position:
          "top-end",

        showConfirmButton:
          false,

        timer:
          1800,

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
    async (group) => {

      const result =
        await Swal.fire({
          icon:
            "warning",

          title:
            "Delete Group?",

          html: `
            <span style="color:#8fa1a8">
              Delete
            </span>

            <strong style="color:#ffffff">
              ${group.name}
            </strong>

            ?
          `,

          showCancelButton:
            true,

          confirmButtonText:
            "Delete",

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


      setGroups(
        (current) =>
          current.filter(
            (item) =>
              item.id !==
              group.id
          )
      );
    };


  return (
    <div className="addgroup-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="addgroup-heading">

        <div className="addgroup-heading-icon">

          <i className="fa-solid fa-user-group"></i>

        </div>


        <div>

          <h2>
            Create Group
            <span>.</span>
          </h2>

          <p>
            Create and manage client groups
          </p>

        </div>

      </div>


      {/* =====================================================
          GROUP INFORMATION
      ===================================================== */}

      <section className="addgroup-card">

        <div className="addgroup-card-header">

          <h3>
            Group Information
          </h3>

          <p>
            Enter the group name and description
          </p>

        </div>


        <div className="addgroup-card-body">

          <div className="row g-3">

            {/* NAME */}

            <div className="col-12 col-lg-5">

              <div className="addgroup-field">

                <label>
                  Name
                  <span>
                    *
                  </span>
                </label>


                <input
                  type="text"
                  placeholder="Enter group name"
                  value={
                    groupName
                  }
                  onChange={(
                    event
                  ) =>
                    setGroupName(
                      event.target.value
                    )
                  }
                />

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="col-12 col-lg-7">

              <div className="addgroup-field">

                <label>
                  Description
                </label>


                <textarea
                  placeholder="Enter group description"
                  value={
                    description
                  }
                  onChange={(
                    event
                  ) =>
                    setDescription(
                      event.target.value
                    )
                  }
                ></textarea>

              </div>

            </div>

          </div>


          <div className="addgroup-form-actions">

            <button
              type="button"
              className="addgroup-primary-btn"
              onClick={
                handleAddGroup
              }
            >

              <i className="fa-solid fa-plus"></i>

              Add Group

            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          GROUPS LIST
      ===================================================== */}

      <section className="addgroup-card addgroup-list-card">

        <div className="addgroup-list-header">

          <div>

            <h3>
              Groups
            </h3>

            <p>
              View and manage created groups
            </p>

          </div>


          <div className="addgroup-header-actions">

            <div className="addgroup-search">

              <i className="fa-solid fa-magnifying-glass"></i>


              <input
                type="text"
                placeholder="Search group name"
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


            <span className="addgroup-count">

              {filteredGroups.length} Groups

            </span>

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="addgroup-table-wrap">

          <table className="addgroup-table">

            <thead>

              <tr>

                <th>
                  SL NO.
                </th>

                <th>
                  NAME
                </th>

                <th>
                  DESCRIPTION
                </th>

                <th>
                  ACTIONS
                </th>

              </tr>

            </thead>


            <tbody>

              {paginatedGroups.length >
              0 ? (

                paginatedGroups.map(
                  (
                    group,
                    index
                  ) => (

                    <tr
                      key={
                        group.id
                      }
                    >

                      <td>

                        <span className="addgroup-slno">

                          {startIndex +
                            index +
                            1}

                        </span>

                      </td>


                      <td className="addgroup-name">

                        {group.name}

                      </td>


                      <td>

                        {
                          group.description ||
                          "-"
                        }

                      </td>


                      <td>

                        <div className="addgroup-actions">

                          <button
                            type="button"
                            className="addgroup-view-btn"
                            onClick={() =>
                              setViewGroup(
                                group
                              )
                            }
                          >

                            <i className="fa-regular fa-eye"></i>

                            View

                          </button>


                          <button
                            type="button"
                            className="addgroup-edit-btn"
                            onClick={() =>
                              openEditGroup(
                                group
                              )
                            }
                          >

                            <i className="fa-solid fa-pen"></i>

                            Edit

                          </button>


                          <button
                            type="button"
                            className="addgroup-delete-btn"
                            onClick={() =>
                              handleDelete(
                                group
                              )
                            }
                          >

                            <i className="fa-regular fa-trash-can"></i>

                            Delete

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="addgroup-empty"
                  >
                    No groups found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            PAGINATION
        ================================================= */}

     <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>

      </section>


{/* =====================================================
    VIEW GROUP MODAL
===================================================== */}

{viewGroup && (

  <div
    className="addgroup-modal-overlay"
    onClick={() =>
      setViewGroup(null)
    }
  >

    <div
      className="addgroup-details-modal"
      onClick={(event) =>
        event.stopPropagation()
      }
    >

      {/* ================= HEADER ================= */}

      <div className="addgroup-details-header">

        <div>

          <h3>
            Group Details
          </h3>

          <p>
            View the selected group information
          </p>

        </div>


        <button
          type="button"
          className="addgroup-details-close-icon"
          onClick={() =>
            setViewGroup(null)
          }
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

      </div>


      {/* ================= BODY ================= */}

      <div className="addgroup-details-body">

        {/* GROUP SUMMARY */}

        <div className="addgroup-details-summary">

          <div className="addgroup-details-group-left">

            <div className="addgroup-details-group-icon">

              <i className="fa-solid fa-user-group"></i>

            </div>


            <div>

              <span>
                Group Name
              </span>

              <h4>
                {viewGroup.name}
              </h4>

            </div>

          </div>


          <div className="addgroup-details-customer-count">

            <strong>
              {
                viewGroup.customers?.length ||
                3
              }
            </strong>

            <span>
              CUSTOMERS
            </span>

          </div>

        </div>


        {/* ================= ASSIGNED CUSTOMERS ================= */}

        <div className="addgroup-assigned-card">

          <div className="addgroup-assigned-heading">

            <h4>
              Assigned Customers
            </h4>

            <p>
              Customers and broker accounts assigned to this group
            </p>

          </div>


          <div className="addgroup-assigned-table-wrap">

            <table className="addgroup-assigned-table">

              <thead>

                <tr>

                  <th>
                    SL NO.
                  </th>

                  <th>
                    CUSTOMER NAME
                  </th>

                  <th>
                    BROKER
                  </th>

                  <th>
                    STRATEGY
                  </th>

                </tr>

              </thead>


              <tbody>

                {[
                  {
                    id: 1,

                    customer:
                      "Rahul Menon",

                    broker:
                      "Alice Blue",

                    brokerCode:
                      "ALICE",

                    strategy:
                      "Growth Strategy",
                  },

                  {
                    id: 2,

                    customer:
                      "Sneha Pillai",

                    broker:
                      "IIFL",

                    brokerCode:
                      "IIFL",

                    strategy:
                      "Balanced Portfolio",
                  },

                  {
                    id: 3,

                    customer:
                      "Adithya Krishnan",

                    broker:
                      "Alice Blue",

                    brokerCode:
                      "ALICE",

                    strategy:
                      "Momentum Strategy",
                  },
                ].map(
                  (
                    customer,
                    index
                  ) => (

                    <tr
                      key={
                        customer.id
                      }
                    >

                      {/* SL */}

                      <td>

                        <span className="addgroup-customer-sl">

                          {index + 1}

                        </span>

                      </td>


                      {/* CUSTOMER */}

                      <td className="addgroup-customer-name">

                        {
                          customer.customer
                        }

                      </td>


                      {/* BROKER */}

                      <td>

                        <div className="addgroup-broker-info">

                          <strong>
                            {
                              customer.broker
                            }
                          </strong>

                          <span>
                            {
                              customer.brokerCode
                            }
                          </span>

                        </div>

                      </td>


                      {/* STRATEGY */}

                      <td>

                        <span className="addgroup-strategy-badge">

                          {
                            customer.strategy
                          }

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


      {/* ================= FOOTER ================= */}

      <div className="addgroup-details-footer">

        <button
          type="button"
          onClick={() =>
            setViewGroup(null)
          }
        >
          Close
        </button>

      </div>

    </div>

  </div>

)}

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editGroup && (

        <div
          className="addgroup-modal-overlay"
          onClick={() =>
            setEditGroup(
              null
            )
          }
        >

          <div
            className="addgroup-modal"
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            <div className="addgroup-modal-header">

              <div>

                <h3>
                  Edit Group
                </h3>

                <p>
                  Update group information
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setEditGroup(
                    null
                  )
                }
              >

                <i className="fa-solid fa-xmark"></i>

              </button>

            </div>


            <div className="addgroup-modal-body">

              <div className="addgroup-field">

                <label>
                  Name
                  <span>
                    *
                  </span>
                </label>


                <input
                  type="text"
                  value={
                    editName
                  }
                  onChange={(
                    event
                  ) =>
                    setEditName(
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="addgroup-field addgroup-modal-description">

                <label>
                  Description
                </label>


                <textarea
                  value={
                    editDescription
                  }
                  onChange={(
                    event
                  ) =>
                    setEditDescription(
                      event.target.value
                    )
                  }
                ></textarea>

              </div>

            </div>


            <div className="addgroup-modal-footer">

              <button
                type="button"
                className="cancel"
                onClick={() =>
                  setEditGroup(
                    null
                  )
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className="save"
                onClick={
                  handleUpdateGroup
                }
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


export default AddGroup;