import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import Pagination from "../../Components/Pagination/Pagination";

import Swal from "sweetalert2";

import "./AddUser.css";


function AddUser() {
  /* =====================================================
     BASIC STATES
  ===================================================== */

  const [
    activeTab,
    setActiveTab,
  ] = useState(null);

  const [
    viewMode,
    setViewMode,
  ] = useState("table");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const usersPerPage = 10;

  const editModalRef =
    useRef();


  /* =====================================================
     DEMO ROLE
  ===================================================== */

  const loggedInRole =
    "platform_admin";


  const canAssignRM = [
    "admin",
    "platform_admin",
    "superuser",
  ].includes(
    loggedInRole
  );


  /* =====================================================
     RM DATA
  ===================================================== */

  const rmUsers = [
    {
      id: "RM001",
      first_name: "Arun",
      last_name: "Kumar",
      username: "arun.rm",
    },

    {
      id: "RM002",
      first_name: "Nikhil",
      last_name: "Joseph",
      username: "nikhil.rm",
    },

    {
      id: "RM003",
      first_name: "Faisal",
      last_name: "Ahmed",
      username: "faisal.rm",
    },
  ];


  /* =====================================================
     BRANCHES
  ===================================================== */

  const branches = [
    {
      id: "BR001",
      name: "Calicut",
      is_active: true,
    },

    {
      id: "BR002",
      name: "Kochi",
      is_active: true,
    },

    {
      id: "BR003",
      name: "Bangalore",
      is_active: true,
    },

    {
      id: "BR004",
      name: "Mumbai",
      is_active: true,
    },
  ];


  /* =====================================================
     USERS
  ===================================================== */

  const [
    getUser,
    setGetUser,
  ] = useState([
    {
      id: "USR001",

      email:
        "admin@milliondots.com",

      username:
        "admin",

      first_name:
        "System",

      last_name:
        "Admin",

      role:
        "admin",

      rm: "",

      branch: "",
    },

    {
      id: "USR002",

      email:
        "arun@milliondots.com",

      username:
        "arun.rm",

      first_name:
        "Arun",

      last_name:
        "Kumar",

      role:
        "rm",

      rm: "",

      branch:
        "BR001",
    },

    {
      id: "USR003",

      email:
        "nikhil@milliondots.com",

      username:
        "nikhil.rm",

      first_name:
        "Nikhil",

      last_name:
        "Joseph",

      role:
        "rm",

      rm: "",

      branch:
        "BR002",
    },

    {
      id: "USR004",

      email:
        "faisal@milliondots.com",

      username:
        "faisal.rm",

      first_name:
        "Faisal",

      last_name:
        "Ahmed",

      role:
        "rm",

      rm: "",

      branch:
        "BR003",
    },

    {
      id: "USR005",

      email:
        "rahul@milliondots.com",

      username:
        "rahul.dealer",

      first_name:
        "Rahul",

      last_name:
        "Menon",

      role:
        "dealer",

      rm:
        "RM001",

      branch: "",
    },

    {
      id: "USR006",

      email:
        "sneha@milliondots.com",

      username:
        "sneha.dealer",

      first_name:
        "Sneha",

      last_name:
        "Pillai",

      role:
        "dealer",

      rm:
        "RM002",

      branch: "",
    },

    {
      id: "USR007",

      email:
        "adithya@milliondots.com",

      username:
        "adithya.dealer",

      first_name:
        "Adithya",

      last_name:
        "Krishnan",

      role:
        "dealer",

      rm:
        "RM003",

      branch: "",
    },
  ]);


  /* =====================================================
     ADD USER
  ===================================================== */

  const initialAddUser = {
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    role: "",
    rm: "",
    branch: [],
  };


  const [
    addUser,
    setAddUser,
  ] = useState(
    initialAddUser
  );


  /* =====================================================
     EDIT USER
  ===================================================== */

  const [
    editUser,
    setEditUser,
  ] = useState({
    id: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    role: "",
  });


  /* =====================================================
     CHANGE PASSWORD
  ===================================================== */

  const [
    changePassword,
    setChangePassword,
  ] = useState({
    id: "",
    password: "",
  });


  const [
    showChangePassword,
    setShowChangePassword,
  ] = useState(false);


  const [
    showChangePasswordPassword,
    setShowChangePasswordPassword,
  ] = useState(false);


  /* =====================================================
     CHANGE FORM
  ===================================================== */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;


    setAddUser(
      (current) => ({
        ...current,

        [name]: value,

        ...(name ===
        "role"
          ? {
              rm: "",
              branch: [],
            }
          : {}),
      })
    );
  };


  /* =====================================================
     BRANCH
  ===================================================== */

  const handleBranchSelect = (
    event
  ) => {
    const branchId =
      event.target.value;


    if (!branchId) {
      return;
    }


    setAddUser(
      (current) => ({
        ...current,

        branch:
          current.branch.includes(
            branchId
          )
            ? current.branch
            : [
                ...current.branch,
                branchId,
              ],
      })
    );
  };


  const handleRemoveBranch = (
    branchId
  ) => {
    setAddUser(
      (current) => ({
        ...current,

        branch:
          current.branch.filter(
            (id) =>
              id !==
              branchId
          ),
      })
    );
  };


  /* =====================================================
     RESET
  ===================================================== */

  const handleResetForm =
    () => {
      setAddUser(
        initialAddUser
      );

      setShowPassword(
        false
      );
    };


  /* =====================================================
     ADD USER
  ===================================================== */

  const handleSubmitUsers =
    () => {

      if (
        !addUser.email ||
        !addUser.username ||
        !addUser.first_name ||
        !addUser.last_name ||
        !addUser.password ||
        !addUser.role ||
        (
          canAssignRM &&
          addUser.role ===
            "dealer" &&
          !addUser.rm
        ) ||
        (
          canAssignRM &&
          (
            addUser.role ===
              "rm" ||
            addUser.role ===
              "dealer"
          ) &&
          addUser.branch
            .length === 0
        )
      ) {
        Swal.fire({
          icon:
            "warning",

          title:
            "Enter All Inputs",

          text:
            "Please enter all required fields.",

          timer:
            3000,

          showConfirmButton:
            false,

          position:
            "top-end",

          toast:
            true,

          background:
            "#061923",

          color:
            "#ffffff",
        });

        return;
      }


      const emailExists =
        getUser.some(
          (user) =>
            user.email
              .toLowerCase() ===
            addUser.email
              .toLowerCase()
        );


      if (emailExists) {
        Swal.fire({
          icon:
            "warning",

          title:
            "Email Already Exists",

          text:
            "Please use another email address.",

          toast:
            true,

          position:
            "top-end",

          timer:
            2500,

          showConfirmButton:
            false,

          background:
            "#061923",

          color:
            "#ffffff",
        });

        return;
      }


      const usernameExists =
        getUser.some(
          (user) =>
            user.username
              .toLowerCase() ===
            addUser.username
              .toLowerCase()
        );


      if (
        usernameExists
      ) {
        Swal.fire({
          icon:
            "warning",

          title:
            "Username Already Exists",

          text:
            "Please choose another username.",

          toast:
            true,

          position:
            "top-end",

          timer:
            2500,

          showConfirmButton:
            false,

          background:
            "#061923",

          color:
            "#ffffff",
        });

        return;
      }


      const newUser = {
        id:
          `USR${Date.now()}`,

        email:
          addUser.email,

        username:
          addUser.username,

        first_name:
          addUser.first_name,

        last_name:
          addUser.last_name,

        role:
          addUser.role,

        rm:
          addUser.role ===
          "dealer"
            ? addUser.rm
            : "",

        branch:
          addUser.branch,
      };


      setGetUser(
        (current) => [
          newUser,
          ...current,
        ]
      );


      setCurrentPage(1);


      Swal.fire({
        icon:
          "success",

        title:
          "User Added",

        text:
          "User added successfully.",

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


      handleResetForm();
    };


  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete =
    async (id) => {

      const result =
        await Swal.fire({
          icon:
            "warning",

          title:
            "Delete User?",

          text:
            "Are you sure you want to delete this user?",

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


      setGetUser(
        (current) =>
          current.filter(
            (user) =>
              user.id !== id
          )
      );


      Swal.fire({
        icon:
          "success",

        title:
          "Deleted",

        text:
          "User deleted successfully.",

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
     EDIT
  ===================================================== */

  const handleChangeEdit = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;


    setEditUser(
      (current) => ({
        ...current,

        [name]:
          value,
      })
    );
  };


  const openModalEdit = (
    user
  ) => {
    setEditUser({
      id: user.id,
      email:
        user.email,
      username:
        user.username,
      first_name:
        user.first_name,
      last_name:
        user.last_name,
      role:
        user.role,
    });
  };


  const handleUpdateUser =
    () => {

      if (
        !editUser.first_name ||
        !editUser.last_name ||
        !editUser.username ||
        !editUser.email ||
        !editUser.role
      ) {
        Swal.fire({
          icon:
            "warning",

          title:
            "Required Fields",

          text:
            "Please complete all user details.",

          background:
            "#061923",

          color:
            "#ffffff",

          confirmButtonColor:
            "#00b985",
        });

        return;
      }


      setGetUser(
        (current) =>
          current.map(
            (user) =>
              user.id ===
              editUser.id
                ? {
                    ...user,

                    ...editUser,
                  }
                : user
          )
      );


      Swal.fire({
        icon:
          "success",

        title:
          "User Updated",

        text:
          "User details updated successfully.",

        toast:
          true,

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


      if (
        editModalRef.current
      ) {
        editModalRef.current.click();
      }
    };


  /* =====================================================
     CHANGE PASSWORD
  ===================================================== */

  const openChangePasswordModal =
    (user) => {

      setChangePassword({
        id:
          user.id,

        password:
          "",
      });


      setShowChangePasswordPassword(
        false
      );

      setShowChangePassword(
        true
      );
    };


  const handleChangePassword =
    () => {

      if (
        !changePassword.password.trim()
      ) {
        Swal.fire({
          icon:
            "warning",

          title:
            "Password Required",

          text:
            "Please enter a new password.",

          toast:
            true,

          position:
            "top-end",

          timer:
            2500,

          showConfirmButton:
            false,

          background:
            "#061923",

          color:
            "#ffffff",
        });

        return;
      }


      if (
        changePassword.password
          .length < 6
      ) {
        Swal.fire({
          icon:
            "warning",

          title:
            "Password Too Short",

          text:
            "Password must contain at least 6 characters.",

          toast:
            true,

          position:
            "top-end",

          timer:
            2500,

          showConfirmButton:
            false,

          background:
            "#061923",

          color:
            "#ffffff",
        });

        return;
      }


      Swal.fire({
        icon:
          "success",

        title:
          "Password Changed",

        text:
          "User password changed successfully.",

        toast:
          true,

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


      setShowChangePassword(
        false
      );
    };


  /* =====================================================
     FILTER
  ===================================================== */

  const filteredUsers =
    getUser.filter(
      (user) => {

        const matchesRole =
          !activeTab ||
          user.role ===
            activeTab;


        const search =
          searchText
            .toLowerCase();


        const matchesSearch =
          user.username
            ?.toLowerCase()
            .includes(
              search
            ) ||
          user.email
            ?.toLowerCase()
            .includes(
              search
            ) ||
          user.first_name
            ?.toLowerCase()
            .includes(
              search
            ) ||
          user.last_name
            ?.toLowerCase()
            .includes(
              search
            );


        return (
          matchesRole &&
          matchesSearch
        );
      }
    );


  /* =====================================================
     INITIALS
  ===================================================== */

  const getInitials = (
    user
  ) => {
    return `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();
  };


  /* =====================================================
     PAGINATION
  ===================================================== */

const totalPages = Math.ceil(
  filteredUsers.length /
    usersPerPage
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
  usersPerPage;

const paginatedUsers =
  filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );


  return (
    <div className="adduser-wrapper">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="adduser-title">

        <div className="adduser-title-icon">

          <i className="fa-solid fa-user-plus"></i>

        </div>


        <div>

          <h2>
            Add Users
            <span>.</span>
          </h2>

          <p>
            Create a new RM, dealer, or admin user
          </p>

        </div>

      </div>


      {/* =================================================
          USER FORM
      ================================================= */}

      <div className="adduser-form-card">

        <div className="adduser-form-header">

          <h3>
            User Information
          </h3>

          <p>
            Enter the basic account details
          </p>

        </div>


        <div className="row g-3">

          {/* FIRST NAME */}

          <UserField
            label="First Name"
            icon="fa-regular fa-user"
          >

            <input
              name="first_name"
              value={
                addUser.first_name
              }
              onChange={
                handleChange
              }
              placeholder="Enter first name"
            />

          </UserField>


          {/* LAST NAME */}

          <UserField
            label="Last Name"
            icon="fa-regular fa-id-card"
          >

            <input
              name="last_name"
              value={
                addUser.last_name
              }
              onChange={
                handleChange
              }
              placeholder="Enter last name"
            />

          </UserField>


          {/* USERNAME */}

          <UserField
            label="Username"
            icon="fa-solid fa-user-tag"
          >

            <input
              name="username"
              value={
                addUser.username
              }
              onChange={
                handleChange
              }
              placeholder="Enter username"
            />

          </UserField>


          {/* EMAIL */}

          <UserField
            label="Email Address"
            icon="fa-regular fa-envelope"
          >

            <input
              type="email"
              name="email"
              value={
                addUser.email
              }
              onChange={
                handleChange
              }
              placeholder="Enter email address"
            />

          </UserField>


          {/* ROLE */}

          <UserField
            label="Role"
            icon="fa-solid fa-user-shield"
          >

            <select
              name="role"
              value={
                addUser.role
              }
              onChange={
                handleChange
              }
            >

              <option value="">
                Select user role
              </option>

              <option value="admin">
                Admin
              </option>

              <option value="rm">
                RM
              </option>

              <option value="dealer">
                Dealer
              </option>

            </select>

          </UserField>


          {/* PASSWORD */}

          <UserField
            label="Password"
            icon="fa-solid fa-key"
          >

            <input
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={
                addUser.password
              }
              onChange={
                handleChange
              }
              placeholder="Enter password"
            />


            <button
              type="button"
              className="adduser-password-eye"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >

              <i
                className={
                  showPassword
                    ? "fa-regular fa-eye-slash"
                    : "fa-regular fa-eye"
                }
              ></i>

            </button>

          </UserField>


          {/* RM BRANCH */}

          {canAssignRM &&
            addUser.role ===
              "rm" && (

            <div className="col-12 col-md-4">

              <div className="adduser-field">

                <label>
                  Branch <span>*</span>
                </label>


                <div className="adduser-input-wrapper">

                  <i className="fa-solid fa-code-branch"></i>


                  <select
                    value=""
                    onChange={
                      handleBranchSelect
                    }
                  >

                    <option value="">
                      Select Branch
                    </option>


                    {branches
                      .filter(
                        (branch) =>
                          !addUser.branch.includes(
                            branch.id
                          )
                      )
                      .map(
                        (branch) => (

                          <option
                            key={
                              branch.id
                            }
                            value={
                              branch.id
                            }
                          >
                            {branch.name}
                          </option>

                        )
                      )}

                  </select>

                </div>


                <div className="adduser-selected-branches">

                  {addUser.branch.map(
                    (id) => {

                      const branch =
                        branches.find(
                          (item) =>
                            item.id ===
                            id
                        );


                      return (
                        <div
                          key={id}
                          className="adduser-branch-chip"
                        >

                          {branch?.name}


                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveBranch(
                                id
                              )
                            }
                          >

                            <i className="fa-solid fa-xmark"></i>

                          </button>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>

            </div>

          )}


          {/* DEALER BRANCH */}

          {canAssignRM &&
            addUser.role ===
              "dealer" && (

            <>

              <div className="col-12 col-md-4">

                <div className="adduser-field">

                  <label>
                    Branch <span>*</span>
                  </label>


                  <div className="adduser-input-wrapper">

                    <i className="fa-solid fa-code-branch"></i>


                    <select
                      value={
                        addUser.branch[
                          0
                        ] || ""
                      }
                      onChange={(
                        event
                      ) =>
                        setAddUser(
                          (current) => ({
                            ...current,

                            branch:
                              event.target.value
                                ? [
                                    event.target.value,
                                  ]
                                : [],

                            rm: "",
                          })
                        )
                      }
                    >

                      <option value="">
                        Select Branch
                      </option>


                      {branches.map(
                        (branch) => (

                          <option
                            key={
                              branch.id
                            }
                            value={
                              branch.id
                            }
                          >
                            {branch.name}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                </div>

              </div>


              <div className="col-12 col-md-4">

                <div className="adduser-field">

                  <label>
                    RM <span>*</span>
                  </label>


                  <div className="adduser-input-wrapper">

                    <i className="fa-solid fa-user-tie"></i>


                    <select
                      name="rm"
                      value={
                        addUser.rm
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        addUser.branch
                          .length === 0
                      }
                    >

                      <option value="">
                        {addUser.branch
                          .length === 0
                          ? "Select Branch First"
                          : "Select RM"}
                      </option>


                      {rmUsers.map(
                        (rm) => (

                          <option
                            key={
                              rm.id
                            }
                            value={
                              rm.id
                            }
                          >
                            {rm.first_name}{" "}
                            {rm.last_name}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                </div>

              </div>

            </>

          )}

        </div>


        {/* ACTIONS */}

        <div className="adduser-form-actions">

          <button
            type="button"
            className="adduser-cancel-btn"
            onClick={
              handleResetForm
            }
          >
            Cancel
          </button>


          <button
            type="button"
            className="adduser-submit-btn"
            onClick={
              handleSubmitUsers
            }
          >

            <i className="fa-solid fa-user-plus"></i>

            Add User

          </button>

        </div>

      </div>


      {/* =================================================
          USERS
      ================================================= */}

      <div className="adduser-users-card">

        <div className="adduser-users-header">

          <div>

            <h3>
              Added Users
            </h3>

            <p>
              View and manage all registered users
            </p>

          </div>


          <div className="adduser-header-actions">

            <div className="adduser-view-switch">

              <button
                type="button"
                className={
                  viewMode ===
                  "grid"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setViewMode(
                    "grid"
                  )
                }
              >
                <i className="fa-solid fa-grip"></i>
              </button>


              <button
                type="button"
                className={
                  viewMode ===
                  "table"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setViewMode(
                    "table"
                  )
                }
              >
                <i className="fa-solid fa-table"></i>
              </button>

            </div>


            <span className="adduser-count">

              {filteredUsers.length} Users

            </span>

          </div>

        </div>


        {/* FILTER */}

        <div className="adduser-tabs">

          <div className="adduser-role-filters">

            {[
              "admin",
              "rm",
              "dealer",
            ].map(
              (role) => (

                <button
                  key={role}
                  type="button"
                  className={
                    activeTab ===
                    role
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setActiveTab(
                      role
                    );

                    setCurrentPage(
                      1
                    );
                  }}
                >

                  {role === "rm"
                    ? "RM"
                    : role
                        .charAt(0)
                        .toUpperCase() +
                      role.slice(1)}

                </button>

              )
            )}


            <button
              type="button"
              className="adduser-clear-filter"
              onClick={() =>
                setActiveTab(
                  null
                )
              }
            >

              <i className="fa-solid fa-xmark"></i>

            </button>

          </div>


          <div className="adduser-search">

            <i className="fa-solid fa-magnifying-glass"></i>


            <input
              type="text"
              placeholder="Search username or email..."
              value={
                searchText
              }
              onChange={(
                event
              ) => {
                setSearchText(
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

        {viewMode ===
          "table" && (

          <div className="table-responsive adduser-table-responsive">

            <table className="table mb-0 adduser-table">

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Username</th>

                  <th>Email Address</th>

                  <th>Role</th>

                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {paginatedUsers.map(
                  (user) => (

                    <tr
                      key={
                        user.id
                      }
                    >

                      <td>

                        <div className="adduser-user">

                          <span className="adduser-avatar">

                            {getInitials(
                              user
                            )}

                          </span>


                          <span className="adduser-name">

                            {user.first_name}{" "}
                            {user.last_name}

                          </span>

                        </div>

                      </td>


                      <td>
                        {user.username}
                      </td>


                      <td>
                        {user.email}
                      </td>


                      <td>

                        <span
                          className={`adduser-role ${user.role}`}
                        >

                          {user.role}

                        </span>

                      </td>


                      <td>

                        <div className="adduser-user-actions">

                          <button
                            className="adduser-edit-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#editUserModal"
                            onClick={() =>
                              openModalEdit(
                                user
                              )
                            }
                          >

                            <i className="fa-regular fa-pen-to-square"></i>

                          </button>


                          <button
                            className="adduser-password-btn"
                            onClick={() =>
                              openChangePasswordModal(
                                user
                              )
                            }
                          >

                            <i className="fa-solid fa-key"></i>

                          </button>


                          <button
                            className="adduser-delete-btn"
                            onClick={() =>
                              handleDelete(
                                user.id
                              )
                            }
                          >

                            <i className="fa-solid fa-trash-can"></i>

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}


        {/* =================================================
            GRID
        ================================================= */}

        {viewMode ===
          "grid" && (

          <div className="adduser-grid">

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-5 g-3">

              {paginatedUsers.map(
                (user) => (

                  <div
                    className="col"
                    key={
                      user.id
                    }
                  >

                    <div className="adduser-grid-card">

                      <div className="adduser-grid-top">

                        <span className="adduser-grid-avatar">

                          {getInitials(
                            user
                          )}

                        </span>


                        <span
                          className={`adduser-role ${user.role}`}
                        >

                          {user.role}

                        </span>

                      </div>


                      <h4>
                        {user.first_name}{" "}
                        {user.last_name}
                      </h4>


                      <div className="adduser-grid-detail">

                        <i className="fa-solid fa-at"></i>

                        {user.username}

                      </div>


                      <div className="adduser-grid-detail">

                        <i className="fa-regular fa-envelope"></i>

                        {user.email}

                      </div>


                      <div className="adduser-grid-actions">

                        <button
                          className="adduser-grid-edit"
                          data-bs-toggle="modal"
                          data-bs-target="#editUserModal"
                          onClick={() =>
                            openModalEdit(
                              user
                            )
                          }
                        >
                          <i className="fa-solid fa-pen"></i>

                          Edit
                        </button>


                        <button
                          className="adduser-grid-password"
                          onClick={() =>
                            openChangePasswordModal(
                              user
                            )
                          }
                        >

                          <i className="fa-solid fa-key"></i>

                        </button>


                        <button
                          className="adduser-grid-delete"
                          onClick={() =>
                            handleDelete(
                              user.id
                            )
                          }
                        >

                          <i className="fa-solid fa-trash"></i>

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}


        {/* =================================================
            PAGINATION
        ================================================= */}

 <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>

      </div>


      {/* =================================================
          EDIT MODAL
      ================================================= */}

      <div
        className="modal fade"
        id="editUserModal"
        data-bs-backdrop="static"
        tabIndex="-1"
      >

        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title">
                Edit User
              </h5>


              <button
                ref={
                  editModalRef
                }
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>

            </div>


            <div className="modal-body">

              <div className="row g-3">

                {[
                  [
                    "First Name",
                    "first_name",
                  ],

                  [
                    "Last Name",
                    "last_name",
                  ],

                  [
                    "Username",
                    "username",
                  ],

                  [
                    "Email",
                    "email",
                  ],
                ].map(
                  ([
                    label,
                    name,
                  ]) => (

                    <div
                      className="col-md-6"
                      key={
                        name
                      }
                    >

                      <label className="form-label">
                        {label}
                      </label>


                      <input
                        className="form-control"
                        name={
                          name
                        }
                        value={
                          editUser[
                            name
                          ]
                        }
                        onChange={
                          handleChangeEdit
                        }
                      />

                    </div>

                  )
                )}


                <div className="col-12">

                  <label className="form-label">
                    Role
                  </label>


                  <select
                    className="form-select"
                    name="role"
                    value={
                      editUser.role
                    }
                    onChange={
                      handleChangeEdit
                    }
                  >

                    <option value="admin">
                      Admin
                    </option>

                    <option value="rm">
                      RM
                    </option>

                    <option value="dealer">
                      Dealer
                    </option>

                  </select>

                </div>

              </div>

            </div>


            <div className="modal-footer">

              <button
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>


              <button
                className="btn btn-success"
                onClick={
                  handleUpdateUser
                }
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          PASSWORD MODAL
      ================================================= */}

      {showChangePassword && (

        <div
          className="adduser-password-overlay"
          onClick={() =>
            setShowChangePassword(
              false
            )
          }
        >

          <div
            className="adduser-password-modal"
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            <div className="adduser-password-modal-header">

              <div className="adduser-password-icon">

                <i className="fa-solid fa-key"></i>

              </div>


              <div>

                <h5>
                  Change Password
                </h5>

                <p>
                  Set a new password for this user
                </p>

              </div>


              <button
                className="adduser-password-close"
                onClick={() =>
                  setShowChangePassword(
                    false
                  )
                }
              >

                <i className="fa-solid fa-xmark"></i>

              </button>

            </div>


            <div className="adduser-password-modal-body">

              <label>
                New Password <span>*</span>
              </label>


              <div className="adduser-password-input">

                <i className="fa-solid fa-lock"></i>


                <input
                  type={
                    showChangePasswordPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    changePassword.password
                  }
                  onChange={(
                    event
                  ) =>
                    setChangePassword(
                      {
                        ...changePassword,

                        password:
                          event.target
                            .value,
                      }
                    )
                  }
                  placeholder="Enter new password"
                />


                <button
                  className="change-password-eye"
                  onClick={() =>
                    setShowChangePasswordPassword(
                      !showChangePasswordPassword
                    )
                  }
                >

                  <i
                    className={
                      showChangePasswordPassword
                        ? "fa-regular fa-eye-slash"
                        : "fa-regular fa-eye"
                    }
                  ></i>

                </button>

              </div>

            </div>


            <div className="adduser-password-modal-footer">

              <button
                className="adduser-password-cancel"
                onClick={() =>
                  setShowChangePassword(
                    false
                  )
                }
              >
                Cancel
              </button>


              <button
                className="adduser-password-save"
                onClick={
                  handleChangePassword
                }
              >

                <i className="fa-solid fa-key"></i>

                Change Password

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =====================================================
   REUSABLE FIELD
===================================================== */

function UserField({
  label,
  icon,
  children,
}) {
  return (
    <div className="col-12 col-md-4">

      <div className="adduser-field">

        <label>
          {label} <span>*</span>
        </label>


        <div className="adduser-input-wrapper">

          <i className={icon}></i>

          {children}

        </div>

      </div>

    </div>
  );
}


export default AddUser;