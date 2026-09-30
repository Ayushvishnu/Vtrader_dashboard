import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";

import Swal from "sweetalert2";
import "./Clients.css";
import { useNavigate } from "react-router-dom";

const initialClients = [
  {
    id: 1,
    name: "Kartik Khorwal",
    code: "653526",
    pan: "BIS4667G32523",
    phone: "+91 9876543210",
    broker: "IIFL",
    rm: "-",
    strategy: "",
    group: "Premium",
    active: true,
  },
  {
    id: 2,
    name: "Kartik Khorwal",
    code: "653526",
    pan: "BIS4667G32523",
    phone: "+91 9876543210",
    broker: "IIFL",
    rm: "-",
    strategy: "",
    group: "Premium",
    active: false,
  },
  {
    id: 3,
    name: "Kartik Khorwal",
    code: "653526",
    pan: "BIS4667G32523",
    phone: "+91 9876543210",
    broker: "IIFL",
    rm: "-",
    strategy: "",
    group: "Premium",
    active: true,
  },
  {
    id: 4,
    name: "Kartik Khorwal",
    code: "653526",
    pan: "BIS4667G32523",
    phone: "+91 9876543210",
    broker: "IIFL",
    rm: "-",
    strategy: "",
    group: "Premium",
    active: false,
  },
  {
    id: 5,
    name: "Kartik Khorwal",
    code: "653526",
    pan: "BIS4667G32523",
    phone: "+91 9876543210",
    broker: "IIFL",
    rm: "-",
    strategy: "",
    group: "Premium",
    active: true,
  },
  {
    id: 6,
    name: "Kartik Khorwal",
    code: "653526",
    pan: "BIS4667G32523",
    phone: "+91 9876543210",
    broker: "IIFL",
    rm: "-",
    strategy: "",
    group: "Premium",
    active: false,
  },
  {
    id: 7,
    name: "Kartik Khorwal",
    code: "653526",
    pan: "BIS4667G32523",
    phone: "+91 9876543210",
    broker: "IIFL",
    rm: "-",
    strategy: "",
    group: "Premium",
    active: true,
  },
  {
    id: 8,
    name: "Kartik Khorwal",
    code: "653526",
    pan: "BIS4667G32523",
    phone: "+91 9876543210",
    broker: "IIFL",
    rm: "-",
    strategy: "",
    group: "Premium",
    active: false,
  },
  {
    id: 9,
    name: "Kartik Khorwal",
    code: "653526",
    pan: "BIS4667G32523",
    phone: "+91 9876543210",
    broker: "IIFL",
    rm: "-",
    strategy: "",
    group: "Premium",
    active: true,
  },
  {
    id: 10,
    name: "Kartik Khorwal",
    code: "653526",
    pan: "BIS4667G32523",
    phone: "+91 9876543210",
    broker: "IIFL",
    rm: "-",
    strategy: "",
    group: "Premium",
    active: false,
  },
];

function Clients() {
  const navigate = useNavigate();

  const [clients, setClients] = useState(initialClients);

  const [viewMode, setViewMode] = useState("grid");

  const [search, setSearch] = useState("");

  const [rmFilter, setRmFilter] = useState("ALL");

  const [groupFilter, setGroupFilter] = useState("ALL");

  const [strategyFilter, setStrategyFilter] = useState("ALL");

  const [brokerFilter, setBrokerFilter] = useState("ALL");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const query = search.toLowerCase();

      const matchesSearch =
        client.name.toLowerCase().includes(query) ||
        client.code.toLowerCase().includes(query) ||
        client.pan.toLowerCase().includes(query);

      const matchesRm = rmFilter === "ALL" || client.rm === rmFilter;

      const matchesGroup =
        groupFilter === "ALL" || client.group === groupFilter;

      const matchesStrategy =
        strategyFilter === "ALL" || client.strategy === strategyFilter;

      const matchesBroker =
        brokerFilter === "ALL" || client.broker === brokerFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && client.active) ||
        (statusFilter === "INACTIVE" && !client.active);

      return (
        matchesSearch &&
        matchesRm &&
        matchesGroup &&
        matchesStrategy &&
        matchesBroker &&
        matchesStatus
      );
    });
  }, [
    clients,
    search,
    rmFilter,
    groupFilter,
    strategyFilter,
    brokerFilter,
    statusFilter,
  ]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleToggleStatus = (clientId) => {
    setClients((current) =>
      current.map((client) =>
        client.id === clientId
          ? {
              ...client,
              active: !client.active,
            }
          : client,
      ),
    );
  };

  const handleStrategyChange = (clientId, value) => {
    setClients((current) =>
      current.map((client) =>
        client.id === clientId
          ? {
              ...client,
              strategy: value,
            }
          : client,
      ),
    );
  };

  const handleGroupChange = (clientId, value) => {
    setClients((current) =>
      current.map((client) =>
        client.id === clientId
          ? {
              ...client,
              group: value,
            }
          : client,
      ),
    );
  };

  const handleDelete = (client) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Client?",
      html: `
        Are you sure you want to delete
        <strong style="color:#00d9a0">
          ${client.name}
        </strong>?
      `,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d94854",
      cancelButtonColor: "#263942",
      background: "#061923",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        setClients((current) =>
          current.filter((item) => item.id !== client.id),
        );

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Client removed successfully.",
          background: "#061923",
          color: "#ffffff",
          confirmButtonColor: "#00b985",
        });
      }
    });
  };

  const handleRetry = (client) => {
    Swal.fire({
      icon: "success",
      title: "Retry Started",
      text: `Retrying ${client.name}`,
      background: "#061923",
      color: "#ffffff",
      confirmButtonColor: "#00b985",
    });
  };

  const handleRetryAll = () => {
    Swal.fire({
      icon: "info",
      title: "Retry All",
      text: "Retry started for all client accounts.",
      background: "#061923",
      color: "#ffffff",
      confirmButtonColor: "#00b985",
    });
  };

  return (
    <div className="clients-page">
      {/* ================= HEADER ================= */}

      {/* <div className="clients-header">

        <div>
          <h2>
            Clients
          </h2>

          <p>
            View and manage your Clients
          </p>
        </div>


        <div className="clients-header-actions">


          <div className="clients-search">

            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>



          <button
            type="button"
            className="clients-view-btn"
            onClick={() =>
              setViewMode((current) =>
                current === "grid"
                  ? "table"
                  : "grid"
              )
            }
          >
            <i
              className={
                viewMode === "grid"
                  ? "fa-solid fa-table-list"
                  : "fa-solid fa-grip"
              }
            ></i>

            {viewMode === "grid"
              ? "Table View"
              : "Grid View"}
          </button>



          <button
            type="button"
            className="clients-add-btn"
            onClick={() => navigate("/addclients")}
          >
            <i className="fa-solid fa-plus"></i>

            Add Client
          </button>

        </div>

      </div> */}
      <div className="clients-header">
        <div className="clients-heading">
          <div className="clients-heading-icon">
            <i className="fa-solid fa-users"></i>
          </div>

          <div>
            <h2>Clients</h2>

            <p>View and manage your Clients</p>
          </div>
        </div>

        <div className="clients-header-actions">
          <div className="clients-search">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <button
            type="button"
            className="clients-view-btn"
            onClick={() =>
              setViewMode((current) => (current === "grid" ? "table" : "grid"))
            }
          >
            <i
              className={
                viewMode === "grid"
                  ? "fa-solid fa-table-list"
                  : "fa-solid fa-grip"
              }
            ></i>

            {viewMode === "grid" ? "Table View" : "Grid View"}
          </button>

          <button
            type="button"
            className="clients-add-btn"
            onClick={() => navigate("/addclients")}
          >
            <i className="fa-solid fa-plus"></i>
            Add Client
          </button>
        </div>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="clients-filter-row">
        <div className="clients-filter-group">
          <select
            value={rmFilter}
            onChange={(event) => setRmFilter(event.target.value)}
          >
            <option value="ALL">All RMs</option>

            <option value="RM 1">RM 1</option>

            <option value="RM 2">RM 2</option>
          </select>

          <select
            value={groupFilter}
            onChange={(event) => setGroupFilter(event.target.value)}
          >
            <option value="ALL">All Groups</option>

            <option value="Premium">Premium</option>

            <option value="Standard">Standard</option>
          </select>

          <select
            value={strategyFilter}
            onChange={(event) => setStrategyFilter(event.target.value)}
          >
            <option value="ALL">All Strategies</option>

            <option value="Momentum">Momentum</option>

            <option value="Growth">Growth</option>

            <option value="Intraday">Intraday</option>
          </select>

          <select
            value={brokerFilter}
            onChange={(event) => setBrokerFilter(event.target.value)}
          >
            <option value="ALL">All Brokers</option>

            <option value="IIFL">IIFL</option>

            <option value="Alice Blue">Alice Blue</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="ALL">All Status</option>

            <option value="ACTIVE">Active</option>

            <option value="INACTIVE">In-Active</option>
          </select>
        </div>

        <button
          type="button"
          className="clients-retry-all-btn"
          onClick={handleRetryAll}
        >
          <i className="fa-solid fa-rotate"></i>
          Retry All
        </button>
      </div>

      {/* =====================================================
          GRID VIEW
      ===================================================== */}

      {viewMode === "grid" && (
        <div className="row g-3 clients-grid-row">
          {paginatedClients.map((client, index) => (
            <div className="col-12 col-md-6 col-xl-3" key={client.id}>
              <div className="client-card">
                {/* CARD TOP */}

                <div className="client-card-top">
                  <div className="client-profile">
                    <div className="client-avatar">M</div>

                    <div>
                      <h4>{client.name}</h4>

                      <span>#{client.code}</span>
                    </div>
                  </div>

                  <div className="client-status-wrap">
                    <span
                      className={`client-status ${
                        client.active ? "active" : "inactive"
                      }`}
                    >
                      <i className="fa-solid fa-circle"></i>

                      {client.active ? "Active" : "In-Active"}
                    </span>

                    <button
                      type="button"
                      className={`client-switch ${
                        client.active ? "active" : ""
                      }`}
                      onClick={() => handleToggleStatus(client.id)}
                    >
                      <span></span>
                    </button>
                  </div>
                </div>

                {/* DETAILS */}

                <div className="client-info-grid">
                  <ClientInfo label="Pan" value={client.pan} />

                  <ClientInfo label="Phone" value={client.phone} />

                  <ClientInfo label="Broker" value={client.broker} />

                  <ClientInfo label="RM" value={client.rm} />
                </div>

                {/* STRATEGY GROUP */}

                <div className="client-select-row">
                  <div>
                    <label>Strategy</label>

                    <select
                      value={client.strategy}
                      onChange={(event) =>
                        handleStrategyChange(client.id, event.target.value)
                      }
                    >
                      <option value="">Select Strategy</option>

                      <option value="Momentum">Momentum</option>

                      <option value="Growth">Growth</option>

                      <option value="Intraday">Intraday</option>
                    </select>
                  </div>

                  <div>
                    <label>Group</label>

                    <select
                      className="group-select"
                      value={client.group}
                      onChange={(event) =>
                        handleGroupChange(client.id, event.target.value)
                      }
                    >
                      <option value="Premium">Premium</option>

                      <option value="Standard">Standard</option>
                    </select>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="client-card-actions">
                  <button className="client-action-btn edit">
                    <i className="fa-solid fa-pen"></i>
                    Edit
                  </button>

                  <button className="client-action-btn trade">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                    Trade
                  </button>

                  <button
                    className="client-action-btn retry"
                    onClick={() => handleRetry(client)}
                  >
                    <i className="fa-solid fa-rotate"></i>
                    Retry
                  </button>

                  <button
                    className="client-action-btn delete"
                    onClick={() => handleDelete(client)}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================
          TABLE VIEW
      ===================================================== */}

      {viewMode === "table" && (
        <div className="clients-table-card">
          <div className="clients-table-header">
            <div>
              <h4>Client Details</h4>

              <p>{filteredClients.length} clients found</p>
            </div>
          </div>

          <div className="clients-table-wrap">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>SL. NO.</th>

                  <th>CLIENT</th>

                  <th>PAN</th>

                  <th>PHONE</th>

                  <th>BROKER</th>

                  <th>RM</th>

                  <th>STRATEGY</th>

                  <th>GROUP</th>

                  <th>STATUS</th>

                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((client, index) => (
                  <tr key={client.id}>
                    <td>
                      <span className="client-table-slno">{startIndex + index + 1}</span>
                    </td>

                    <td>
                      <div className="client-table-user">
                        <div className="client-table-avatar">M</div>

                        <div>
                          <strong>{client.name}</strong>

                          <span>#{client.code}</span>
                        </div>
                      </div>
                    </td>

                    <td>{client.pan}</td>

                    <td>{client.phone}</td>

                    <td>{client.broker}</td>

                    <td>{client.rm}</td>

                    <td>
                      <select
                        className="client-table-select"
                        value={client.strategy}
                        onChange={(event) =>
                          handleStrategyChange(client.id, event.target.value)
                        }
                      >
                        <option value="">Select Strategy</option>

                        <option value="Momentum">Momentum</option>

                        <option value="Growth">Growth</option>

                        <option value="Intraday">Intraday</option>
                      </select>
                    </td>

                    <td>
                      <select
                        className="client-table-select group"
                        value={client.group}
                        onChange={(event) =>
                          handleGroupChange(client.id, event.target.value)
                        }
                      >
                        <option value="Premium">Premium</option>

                        <option value="Standard">Standard</option>
                      </select>
                    </td>

                    <td>
                      <div className="client-table-status-wrap">
                        <span
                          className={`client-status ${
                            client.active ? "active" : "inactive"
                          }`}
                        >
                          <i className="fa-solid fa-circle"></i>

                          {client.active ? "Active" : "In-Active"}
                        </span>

                        <button
                          className={`client-switch ${
                            client.active ? "active" : ""
                          }`}
                          onClick={() => handleToggleStatus(client.id)}
                        >
                          <span></span>
                        </button>
                      </div>
                    </td>

                    <td>
                      <div className="client-table-actions">
                        <button
                          className="client-table-action edit"
                          title="Edit"
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>

                        <button
                          className="client-table-action trade"
                          title="Trade"
                        >
                          <i className="fa-solid fa-arrow-trend-up"></i>
                        </button>

                        <button
                          className="client-table-action retry"
                          title="Retry"
                          onClick={() => handleRetry(client)}
                        >
                          <i className="fa-solid fa-rotate"></i>
                        </button>

                        <button
                          className="client-table-action delete"
                          title="Delete"
                          onClick={() => handleDelete(client)}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="clients-table-footer">

  <div className="clients-table-result-text">
    Showing{" "}
    {filteredClients.length === 0
      ? 0
      : startIndex + 1}{" "}
    to{" "}
    {Math.min(
      startIndex + itemsPerPage,
      filteredClients.length
    )}{" "}
    of{" "}
    {filteredClients.length}{" "}
    results
  </div>

  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />

</div>
        </div>
        
      )}
      
    </div>
    
    
  );
}

function ClientInfo({ label, value }) {
  return (
    <div className="client-info-item">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

export default Clients;
