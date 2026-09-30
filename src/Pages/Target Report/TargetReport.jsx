import React, { useMemo, useState } from "react";
import "./TargetReport.css";

const money = (value) =>
  value == null || value === ""
    ? "—"
    : `₹${Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`;

const percentage = (value) =>
  value == null || value === "" ? "0.00%" : `${Number(value).toFixed(2)}%`;

function TargetReport() {
  // =====================================================
  // DEMO ROLE
  // =====================================================

  const isAdmin = true;
  const isRM = false;
  const isDealer = false;

  // =====================================================
  // DEMO PEOPLE
  // =====================================================

  const rmPeople = [
    {
      id: "RM001",
      name: "Arun Kumar",
    },
    {
      id: "RM002",
      name: "Nikhil Joseph",
    },
    {
      id: "RM003",
      name: "Faisal Ahmed",
    },
    {
      id: "RM004",
      name: "Sneha Pillai",
    },
  ];

  const dealerPeople = [
    {
      id: "DL001",
      name: "Rahul Menon",
      rmId: "RM001",
      rmName: "Arun Kumar",
    },
    {
      id: "DL002",
      name: "Adithya Krishnan",
      rmId: "RM002",
      rmName: "Nikhil Joseph",
    },
    {
      id: "DL003",
      name: "Vishnu Raj",
      rmId: "RM003",
      rmName: "Faisal Ahmed",
    },
    {
      id: "DL004",
      name: "Akshay Kumar",
      rmId: "RM004",
      rmName: "Sneha Pillai",
    },
  ];

  // =====================================================
  // DEMO REPORT DATA
  // =====================================================

  const rmReportData = [
    {
      rm_id: "RM001",
      rm_name: "Arun Kumar",

      instrument_type: "EQUITY",
      month: "2026-09",
      date: "2026-09-21",

      monthly_target: 10000000,
      monthly_achieved: 8200000,

      daily_target: 500000,
      daily_achieved: 420000,

      dealer_allocated: 7500000,
      unallocated_target: 2500000,

      achieved: 8200000,
      achievement_remaining: 1800000,

      progress_percentage: 82,

      incentive: 82000,
    },
    {
      rm_id: "RM002",
      rm_name: "Nikhil Joseph",

      instrument_type: "EQUITY",
      month: "2026-09",
      date: "2026-09-21",

      monthly_target: 9000000,
      monthly_achieved: 6750000,

      daily_target: 450000,
      daily_achieved: 310000,

      dealer_allocated: 7000000,
      unallocated_target: 2000000,

      achieved: 6750000,
      achievement_remaining: 2250000,

      progress_percentage: 75,

      incentive: 67500,
    },
    {
      rm_id: "RM003",
      rm_name: "Faisal Ahmed",

      instrument_type: "FUTURE",
      month: "2026-09",
      date: "2026-09-21",

      monthly_target: 8000000,
      monthly_achieved: 7200000,

      daily_target: 400000,
      daily_achieved: 365000,

      dealer_allocated: 6500000,
      unallocated_target: 1500000,

      achieved: 7200000,
      achievement_remaining: 800000,

      progress_percentage: 90,

      incentive: 72000,
    },
    {
      rm_id: "RM004",
      rm_name: "Sneha Pillai",

      instrument_type: "OPTION",
      month: "2026-09",
      date: "2026-09-21",

      monthly_target: 1000,
      monthly_achieved: 780,

      daily_target: 50,
      daily_achieved: 42,

      dealer_allocated: 800,
      unallocated_target: 200,

      achieved: 780,
      achievement_remaining: 220,

      progress_percentage: 78,

      incentive: 25000,
    },
  ];

  const dealerReportData = [
    {
      dealer_id: "DL001",
      dealer_name: "Rahul Menon",

      rm_id: "RM001",
      rm_name: "Arun Kumar",

      instrument_type: "EQUITY",
      month: "2026-09",
      date: "2026-09-21",

      monthly_target: 3500000,
      monthly_achieved: 2900000,

      daily_target: 175000,
      daily_achieved: 148000,

      achieved: 2900000,
      achievement_remaining: 600000,

      progress_percentage: 82.86,

      incentive: 29000,
    },
    {
      dealer_id: "DL002",
      dealer_name: "Adithya Krishnan",

      rm_id: "RM002",
      rm_name: "Nikhil Joseph",

      instrument_type: "EQUITY",
      month: "2026-09",
      date: "2026-09-21",

      monthly_target: 3000000,
      monthly_achieved: 2180000,

      daily_target: 150000,
      daily_achieved: 108000,

      achieved: 2180000,
      achievement_remaining: 820000,

      progress_percentage: 72.67,

      incentive: 21800,
    },
    {
      dealer_id: "DL003",
      dealer_name: "Vishnu Raj",

      rm_id: "RM003",
      rm_name: "Faisal Ahmed",

      instrument_type: "FUTURE",
      month: "2026-09",
      date: "2026-09-21",

      monthly_target: 2800000,
      monthly_achieved: 2450000,

      daily_target: 140000,
      daily_achieved: 126000,

      achieved: 2450000,
      achievement_remaining: 350000,

      progress_percentage: 87.5,

      incentive: 24500,
    },
    {
      dealer_id: "DL004",
      dealer_name: "Akshay Kumar",

      rm_id: "RM004",
      rm_name: "Sneha Pillai",

      instrument_type: "OPTION",
      month: "2026-09",
      date: "2026-09-21",

      monthly_target: 400,
      monthly_achieved: 315,

      daily_target: 20,
      daily_achieved: 17,

      achieved: 315,
      achievement_remaining: 85,

      progress_percentage: 78.75,

      incentive: 12000,
    },
  ];

  // =====================================================
  // STATE
  // =====================================================

  const [periodTab, setPeriodTab] = useState("monthly");

  const [detailTab, setDetailTab] = useState("rm");

  const [month, setMonth] = useState("2026-09");

  const [date, setDate] = useState("2026-09-21");

  const [instrument, setInstrument] = useState("EQUITY");

  const [person, setPerson] = useState("");

  // =====================================================
  // PEOPLE DROPDOWN
  // =====================================================

  const people = useMemo(() => {
    if (detailTab === "rm") {
      return rmPeople;
    }

    return dealerPeople;
  }, [detailTab]);

  // =====================================================
  // FILTER RM DATA
  // =====================================================

  const filteredRmRows = useMemo(() => {
    return rmReportData.filter((item) => {
      const matchesInstrument = item.instrument_type === instrument;

      const matchesPerson = !person || item.rm_id === person;

      const matchesMonth = !month || item.month === month;

      const matchesDate = !date || item.date === date;

      return matchesInstrument && matchesPerson && matchesMonth && matchesDate;
    });
  }, [instrument, person, month, date]);

  // =====================================================
  // FILTER DEALER DATA
  // =====================================================

  const filteredDealerRows = useMemo(() => {
    return dealerReportData.filter((item) => {
      const matchesInstrument = item.instrument_type === instrument;

      const matchesPerson = !person || item.dealer_id === person;

      const matchesMonth = !month || item.month === month;

      const matchesDate = !date || item.date === date;

      return matchesInstrument && matchesPerson && matchesMonth && matchesDate;
    });
  }, [instrument, person, month, date]);

  // =====================================================
  // CURRENT ROWS
  // =====================================================

  const currentRows = detailTab === "rm" ? filteredRmRows : filteredDealerRows;

  // =====================================================
  // SUMMARY
  // =====================================================

  const summary = useMemo(() => {
    const rows = currentRows;

    const monthlyTarget = rows.reduce(
      (total, item) => total + Number(item.monthly_target || 0),
      0,
    );

    const monthlyAchieved = rows.reduce(
      (total, item) => total + Number(item.monthly_achieved || 0),
      0,
    );

    const dailyTarget = rows.reduce(
      (total, item) => total + Number(item.daily_target || 0),
      0,
    );

    const dailyAchieved = rows.reduce(
      (total, item) => total + Number(item.daily_achieved || 0),
      0,
    );

    const monthlyProgress =
      monthlyTarget > 0 ? (monthlyAchieved / monthlyTarget) * 100 : 0;

    const dailyProgress =
      dailyTarget > 0 ? (dailyAchieved / dailyTarget) * 100 : 0;

    return {
      monthly_target: monthlyTarget,
      monthly_achieved: monthlyAchieved,
      monthly_progress_percentage: monthlyProgress,

      daily_target: dailyTarget,
      daily_achieved: dailyAchieved,
      daily_progress_percentage: dailyProgress,
    };
  }, [currentRows]);

  // =====================================================
  // SUMMARY CARDS
  // =====================================================

  const cards = [
    {
      label: "Monthly Target",
      value: summary.monthly_target,
      note: "Assigned for the selected month",
      icon: "fa-solid fa-bullseye",
      color: "monthly",
    },
    {
      label: "Monthly Achieved",
      value: summary.monthly_achieved,
      note: `${percentage(summary.monthly_progress_percentage)} of target`,
      icon: "fa-solid fa-trophy",
      color: "achieved",
    },
    {
      label: "Daily Target",
      value: summary.daily_target,
      note: date || "Latest reported day",
      icon: "fa-solid fa-chart-column",
      color: "daily",
    },
    {
      label: "Daily Achieved",
      value: summary.daily_achieved,
      note: `${percentage(summary.daily_progress_percentage)} of target`,
      icon: "fa-regular fa-clock",
      color: "daily-achieved",
    },
  ];

  // =====================================================
  // CHANGE DETAIL TAB
  // =====================================================

  const changeDetailTab = (newTab) => {
    setDetailTab(newTab);
    setPerson("");
  };

  return (
    <div className="target-report-page">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header className="target-report-header">
        <div className="target-report-heading">
          <span className="target-report-heading-icon">
            <i className="fa-solid fa-users-viewfinder" aria-hidden="true" />
          </span>

          <div>
            <h2>Target Report</h2>

            <p>Review RM and dealer targets and achievements.</p>
          </div>
        </div>
      </header>

      {/* ================================================= */}
      {/* FILTERS */}
      {/* ================================================= */}

      <div className="target-report-toolbar">
        <div className="target-report-filters">
          {/* PERSON */}

          <div className="target-report-filter">
            <label htmlFor="target-report-person">
              {detailTab === "rm" ? "Relationship Manager" : "Dealer"}
            </label>

            <select
              id="target-report-person"
              value={person}
              onChange={(event) => setPerson(event.target.value)}
            >
              <option value="">
                {detailTab === "rm" ? "All RMs" : "All Dealers"}
              </option>

              {people.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* MONTH */}

          <div className="target-report-filter">
            <label htmlFor="target-report-month">Month</label>

            <input
              id="target-report-month"
              type="month"
              value={month}
              onChange={(event) => {
                setMonth(event.target.value);
                setDate("");
              }}
            />
          </div>

          {/* DAY */}

          <div className="target-report-filter">
            <label htmlFor="target-report-date">Day</label>

            <input
              id="target-report-date"
              type="date"
              value={date}
              min={month ? `${month}-01` : undefined}
              max={
                month
                  ? `${month}-${new Date(
                      Number(month.slice(0, 4)),
                      Number(month.slice(5, 7)),
                      0,
                    ).getDate()}`
                  : undefined
              }
              onChange={(event) => {
                const value = event.target.value;

                setDate(value);

                if (value) {
                  setMonth(value.slice(0, 7));
                }
              }}
            />
          </div>

          {/* INSTRUMENT */}

          <div className="target-report-filter">
            <label htmlFor="target-report-instrument">Instrument Type</label>

            <select
              id="target-report-instrument"
              value={instrument}
              onChange={(event) => {
                setInstrument(event.target.value);

                setPerson("");
              }}
            >
              <option value="EQUITY">Equity</option>

              <option value="FUTURE">Future</option>

              <option value="OPTION">Option</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* SUMMARY CARDS */}
      {/* ================================================= */}

      <div className="row g-3 target-report-summary-row">
        {cards.map((item) => (
          <div className="col-12 col-md-6 col-xl-3" key={item.label}>
            <div
              className={`target-report-summary-card target-report-${item.color}`}
            >
              <div className="target-report-summary-top">
                <span>{item.label}</span>

                <i className={item.icon} aria-hidden="true" />
              </div>

              <strong>{money(item.value)}</strong>

              <small>{item.note}</small>
            </div>
          </div>
        ))}
      </div>

      {/* ================================================= */}
      {/* MONTHLY / DAILY */}
      {/* ================================================= */}

      <div className="target-report-period-tabs">
        <button
          type="button"
          className={periodTab === "monthly" ? "active" : ""}
          onClick={() => setPeriodTab("monthly")}
        >
          Monthly
        </button>

        <button
          type="button"
          className={periodTab === "daily" ? "active" : ""}
          onClick={() => setPeriodTab("daily")}
        >
          Daily
        </button>
      </div>

      {/* ================================================= */}
      {/* RM / DEALER TAB */}
      {/* ================================================= */}

      <div className="target-report-tabs">
        <button
          type="button"
          className={detailTab === "rm" ? "active" : ""}
          onClick={() => changeDetailTab("rm")}
        >
          RM Details
        </button>

        <button
          type="button"
          className={detailTab === "dealer" ? "active" : ""}
          onClick={() => changeDetailTab("dealer")}
        >
          Dealer Details
        </button>
      </div>

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      {detailTab === "rm" ? (
        <RMTable rows={filteredRmRows} period={periodTab} />
      ) : (
        <DealerTable rows={filteredDealerRows} period={periodTab} showRM />
      )}
    </div>
  );
}

// =============================================================
// RM TABLE
// =============================================================

function RMTable({ rows, period, own = false }) {
  const isMonthly = period === "monthly";

  return (
    <section className="target-report-panel">
      <div className="target-report-panel-header">
        <div>
          <h3>{own ? "My Target Details" : "RM Target Details"}</h3>

          <p>
            {isMonthly
              ? "Monthly target and achievement details."
              : "Daily target and achievement details."}
          </p>
        </div>

        <span className="target-report-count">
          {rows.length} {rows.length === 1 ? "record" : "records"}
        </span>
      </div>

      <div className="target-report-table-wrap">
        <table className="target-report-table">
          <thead>
            <tr>
              {!own && <th>RM</th>}

              <th>{isMonthly ? "Monthly Target" : "Daily Target"}</th>

              <th>Dealer Allocated</th>

              <th>Unallocated</th>

              <th>Achieved</th>

              <th>Remaining</th>

              <th>Progress</th>

              {isMonthly && <th>Incentive</th>}
            </tr>
          </thead>

          <tbody>
            {rows.map((item, index) => {
              const target = isMonthly
                ? item.monthly_target
                : item.daily_target;

              const achieved = isMonthly
                ? item.monthly_achieved
                : item.daily_achieved;

              const remaining = Number(target || 0) - Number(achieved || 0);

              const progress =
                Number(target || 0) > 0
                  ? (Number(achieved || 0) / Number(target)) * 100
                  : 0;

              return (
                <tr key={item.rm_id ?? index}>
                  {!own && (
                    <td className="target-report-name">
                      {item.rm_name || "—"}
                    </td>
                  )}

                  <td>{money(target)}</td>

                  <td>{money(item.dealer_allocated)}</td>

                  <td>{money(item.unallocated_target)}</td>

                  <td className="target-report-positive">{money(achieved)}</td>

                  <td>{money(remaining)}</td>

                  <td>
                    <span className="target-report-percent">
                      {percentage(progress)}
                    </span>
                  </td>

                  {isMonthly && <td>{money(item.incentive)}</td>}
                </tr>
              );
            })}

            {!rows.length && (
              <tr>
                <td
                  colSpan={(own ? 6 : 7) + Number(isMonthly)}
                  className="target-report-empty"
                >
                  No RM target details found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// =============================================================
// DEALER TABLE
// =============================================================

function DealerTable({ rows, period, showRM = false, own = false }) {
  const isMonthly = period === "monthly";

  return (
    <section className="target-report-panel">
      <div className="target-report-panel-header">
        <div>
          <h3>{own ? "My Target Details" : "Dealer Target Details"}</h3>

          <p>
            {isMonthly
              ? "Monthly dealer target and achievement details."
              : "Daily dealer target and achievement details."}
          </p>
        </div>

        <span className="target-report-count">
          {rows.length} {rows.length === 1 ? "record" : "records"}
        </span>
      </div>

      <div className="target-report-table-wrap">
        <table className="target-report-table">
          <thead>
            <tr>
              {!own && <th>Dealer</th>}

              {showRM && <th>RM</th>}

              <th>{isMonthly ? "Monthly Target" : "Daily Target"}</th>

              <th>Achieved</th>

              <th>Remaining</th>

              <th>Progress</th>

              {isMonthly && <th>Incentive</th>}
            </tr>
          </thead>

          <tbody>
            {rows.map((item, index) => {
              const target = isMonthly
                ? item.monthly_target
                : item.daily_target;

              const achieved = isMonthly
                ? item.monthly_achieved
                : item.daily_achieved;

              const remaining = Number(target || 0) - Number(achieved || 0);

              const progress =
                Number(target || 0) > 0
                  ? (Number(achieved || 0) / Number(target)) * 100
                  : 0;

              return (
                <tr key={item.dealer_id ?? index}>
                  {!own && (
                    <td className="target-report-name">
                      {item.dealer_name || "—"}
                    </td>
                  )}

                  {showRM && <td>{item.rm_name || "—"}</td>}

                  <td>{money(target)}</td>

                  <td className="target-report-positive">{money(achieved)}</td>

                  <td>{money(remaining)}</td>

                  <td>
                    <span className="target-report-percent">
                      {percentage(progress)}
                    </span>
                  </td>

                  {isMonthly && <td>{money(item.incentive)}</td>}
                </tr>
              );
            })}

            {!rows.length && (
              <tr>
                <td
                  colSpan={
                    4 + Number(!own) + Number(showRM) + Number(isMonthly)
                  }
                  className="target-report-empty"
                >
                  No dealer target details found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TargetReport;
