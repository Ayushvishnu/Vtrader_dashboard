

import React, { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import "./Target.css";

const emptyCompanyForm = {
  instrument_type: "EQUITY",
  period_type: "MONTHLY",
  target_value: "",
  start_date: "",
  end_date: "",
  incentive_percentage: "",
  is_active: true,
};

const emptyAssignmentForm = {
  target: "",
  is_active: true,
};

function Target() {
  // =====================================================
  // DEMO ROLE
  // =====================================================

  const role = "admin";

  const isAdmin = true;
  const isRM = false;

  const canAssign = true;

  const recipientType = "RM";

  // =====================================================
  // DEMO SUMMARY VALUES
  // =====================================================

  const monthlyTarget = 30000000;
  const monthlyAchieved = 18750000;

  const dailyTarget = 1200000;
  const dailyAchieved = 845000;

  const formatAmount = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  // =====================================================
  // DEMO RM OPTIONS
  // =====================================================

  const recipientOptions = [
    {
      value: "RM001",
      label: "Arun Kumar",
    },
    {
      value: "RM002",
      label: "Nikhil Joseph",
    },
    {
      value: "RM003",
      label: "Faisal Ahmed",
    },
    {
      value: "RM004",
      label: "Sneha Pillai",
    },
    {
      value: "RM005",
      label: "Adithya Krishnan",
    },
  ];

  // =====================================================
  // COMPANY TARGETS
  // =====================================================

  const [targets, setTargets] = useState([
    {
      id: "TARGET001",

      instrument_type: "EQUITY",

      target_type: "VOLUME",

      period_type: "MONTHLY",

      target_value: "30000000",

      start_date: "2026-09-01",

      end_date: "2026-09-30",

      incentive_percentage: "1.0000",

      is_active: true,
    },

    {
      id: "TARGET002",

      instrument_type: "EQUITY",

      target_type: "VOLUME",

      period_type: "DAILY",

      target_value: "1200000",

      start_date: "2026-09-21",

      end_date: "2026-09-21",

      incentive_percentage: "0.5000",

      is_active: true,
    },

    {
      id: "TARGET003",

      instrument_type: "FUTURE",

      target_type: "VOLUME",

      period_type: "MONTHLY",

      target_value: "20000000",

      start_date: "2026-09-01",

      end_date: "2026-09-30",

      incentive_percentage: "0.7500",

      is_active: true,
    },

    {
      id: "TARGET004",

      instrument_type: "OPTION",

      target_type: "LOTS",

      period_type: "MONTHLY",

      target_value: "1000",

      start_date: "2026-09-01",

      end_date: "2026-09-30",

      incentive_percentage: "1.2500",

      is_active: true,
    },
  ]);

  // =====================================================
  // FORM STATES
  // =====================================================

  const [companyForm, setCompanyForm] =
    useState(emptyCompanyForm);

  const [assignmentForm, setAssignmentForm] =
    useState(emptyAssignmentForm);

  const [
    selectedRecipients,
    setSelectedRecipients,
  ] = useState([]);

  const [
    recipientValues,
    setRecipientValues,
  ] = useState({});

  // =====================================================
  // COMPANY FORM CHANGE
  // =====================================================

  const updateCompanyForm = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setCompanyForm((current) => ({
      ...current,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // ASSIGNMENT CHANGE
  // =====================================================

  const updateAssignmentForm = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setAssignmentForm(
      (current) => ({
        ...current,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );
  };

  // =====================================================
  // CREATE COMPANY TARGET - DEMO
  // =====================================================

  const handleCreateCompany = (
    event
  ) => {
    event.preventDefault();

    if (
      !companyForm.target_value ||
      !companyForm.start_date ||
      !companyForm.end_date
    ) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Please complete the target value and dates.",
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
      });

      return;
    }

    if (
      Number(
        companyForm.target_value
      ) <= 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Target",
        text: "Target value must be greater than zero.",
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
      });

      return;
    }

    if (
      companyForm.end_date <
      companyForm.start_date
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Dates",
        text: "End date must be on or after start date.",
      });

      return;
    }

    const targetType =
      companyForm.instrument_type ===
      "OPTION"
        ? "LOTS"
        : "VOLUME";

    const newTarget = {
      id: `TARGET${Date.now()}`,

      instrument_type:
        companyForm.instrument_type,

      target_type:
        targetType,

      period_type:
        companyForm.period_type,

      target_value:
        companyForm.target_value,

      start_date:
        companyForm.start_date,

      end_date:
        companyForm.end_date,

      incentive_percentage:
        companyForm.incentive_percentage ||
        "0.0000",

      is_active:
        companyForm.is_active,
    };

    setTargets((current) => [
      newTarget,
      ...current,
    ]);

    setCompanyForm(
      emptyCompanyForm
    );

    Swal.fire({
      icon: "success",
      title: "Created",
      text: "Company target created successfully.",
      toast: true,
      position: "top-end",
      timer: 2200,
      showConfirmButton: false,
    });
  };

  // =====================================================
  // ASSIGN TARGET - DEMO
  // =====================================================

  const handleAssign = (
    event
  ) => {
    event.preventDefault();

    if (!assignmentForm.target) {
      Swal.fire({
        icon: "warning",
        title: "Select Target",
        text: "Please select a company target.",
        toast: true,
        position: "top-end",
        timer: 2200,
        showConfirmButton: false,
      });

      return;
    }

    if (
      selectedRecipients.length === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Select Recipients",
        text: `Select at least one ${recipientType}.`,
        toast: true,
        position: "top-end",
        timer: 2200,
        showConfirmButton: false,
      });

      return;
    }

    const invalidRecipient =
      selectedRecipients.some(
        (recipient) =>
          !(
            Number(
              recipientValues[
                recipient.value
              ]
            ) > 0
          )
      );

    if (invalidRecipient) {
      Swal.fire({
        icon: "warning",
        title: "Enter Values",
        text: `Enter a target value for each ${recipientType}.`,
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
      });

      return;
    }

    const selectedTarget =
      targets.find(
        (target) =>
          target.id ===
          assignmentForm.target
      );

    const totalAssigned =
      selectedRecipients.reduce(
        (total, recipient) =>
          total +
          Number(
            recipientValues[
              recipient.value
            ] || 0
          ),
        0
      );

    if (
      selectedTarget &&
      totalAssigned >
        Number(
          selectedTarget.target_value
        )
    ) {
      Swal.fire({
        icon: "warning",
        title: "Target Limit Exceeded",
        text: `Assigned value (${totalAssigned.toLocaleString(
          "en-IN"
        )}) is greater than the selected target (${Number(
          selectedTarget.target_value
        ).toLocaleString(
          "en-IN"
        )}).`,
      });

      return;
    }

    Swal.fire({
      icon: "success",
      title: "Assigned",
      text: `Target assigned to ${
        selectedRecipients.length
      } ${recipientType}${
        selectedRecipients.length >
        1
          ? "s"
          : ""
      } successfully.`,
      toast: true,
      position: "top-end",
      timer: 2500,
      showConfirmButton: false,
    });

    setAssignmentForm(
      emptyAssignmentForm
    );

    setSelectedRecipients([]);

    setRecipientValues({});
  };

  // =====================================================
  // RESET ASSIGNMENT
  // =====================================================

  const resetAssignment = () => {
    setAssignmentForm(
      emptyAssignmentForm
    );

    setSelectedRecipients([]);

    setRecipientValues({});
  };

  return (
    <div className="target-page">

      {/* ================= HEADER ================= */}

      <div className="target-page-header">

        <div className="target-heading">

          <span className="target-heading-icon">

            <i
              className="fa-solid fa-bullseye"
              aria-hidden="true"
            />

          </span>

          <div>

            <h2>
              Target Assigning
            </h2>

            <p>
              Create company targets and assign them to relationship managers.
            </p>

          </div>

        </div>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="row g-3 target-summary-row">

        {/* MONTH TARGET */}

        <div className="col-12 col-md-6 col-xl-3">

          <div className="target-summary-card target-summary-monthly">

            <div className="target-summary-top">

              <span className="target-summary-label">
                This Month Target
              </span>

              <i
                className="fa-solid fa-bullseye"
                aria-hidden="true"
              />

            </div>

            <div className="target-summary-content">

              <strong>
                {formatAmount(
                  monthlyTarget
                )}
              </strong>

              <small>
                Total company target for this month
              </small>

            </div>

          </div>

        </div>

        {/* MONTH ACHIEVED */}

        <div className="col-12 col-md-6 col-xl-3">

          <div className="target-summary-card target-summary-achieved">

            <div className="target-summary-top">

              <span className="target-summary-label">
                Monthly Achieved
              </span>

              <i
                className="fa-solid fa-trophy"
                aria-hidden="true"
              />

            </div>

            <div className="target-summary-content">

              <strong>
                {formatAmount(
                  monthlyAchieved
                )}
              </strong>

              <small>
                {(
                  (monthlyAchieved /
                    monthlyTarget) *
                  100
                ).toFixed(1)}
                % of monthly target
              </small>

            </div>

          </div>

        </div>

        {/* DAILY TARGET */}

        <div className="col-12 col-md-6 col-xl-3">

          <div className="target-summary-card target-summary-daily">

            <div className="target-summary-top">

              <span className="target-summary-label">
                Daily Target
              </span>

              <i
                className="fa-solid fa-chart-column"
                aria-hidden="true"
              />

            </div>

            <div className="target-summary-content">

              <strong>
                {formatAmount(
                  dailyTarget
                )}
              </strong>

              <small>
                Company target for today
              </small>

            </div>

          </div>

        </div>

        {/* DAILY ACHIEVED */}

        <div className="col-12 col-md-6 col-xl-3">

          <div className="target-summary-card target-summary-daily-achieved">

            <div className="target-summary-top">

              <span className="target-summary-label">
                Daily Achieved
              </span>

              <i
                className="fa-regular fa-clock"
                aria-hidden="true"
              />

            </div>

            <div className="target-summary-content">

              <strong>
                {formatAmount(
                  dailyAchieved
                )}
              </strong>

              <small>
                {(
                  (dailyAchieved /
                    dailyTarget) *
                  100
                ).toFixed(1)}
                % of daily target
              </small>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          COMPANY TARGET
      ===================================================== */}

      {isAdmin && (

        <section className="target-panel">

          <div className="target-panel-header">

            <div className="target-panel-heading">

              <span className="target-panel-icon">

                <i
                  className="fa-solid fa-gear"
                  aria-hidden="true"
                />

              </span>

              <div>

                <h3>
                  Company Target Setup
                </h3>

                <p>
                  Create a company target for an instrument and period.
                </p>

              </div>

            </div>

            <span className="target-panel-note">

              <i
                className="fa-solid fa-circle-info"
                aria-hidden="true"
              />

              Use this target when assigning to RMs.

            </span>

          </div>

          <div className="target-panel-body">

            <form
              onSubmit={
                handleCreateCompany
              }
              onReset={() =>
                setCompanyForm(
                  emptyCompanyForm
                )
              }
            >

              <div className="row g-3">

                {/* INSTRUMENT */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-instrument">

                      Instrument Type{" "}

                      <span>*</span>

                    </label>

                    <select
                      id="target-instrument"
                      name="instrument_type"
                      value={
                        companyForm.instrument_type
                      }
                      onChange={
                        updateCompanyForm
                      }
                    >

                      <option value="EQUITY">
                        Equity
                      </option>

                      <option value="FUTURE">
                        Future
                      </option>

                      <option value="OPTION">
                        Option
                      </option>

                    </select>

                    <small>
                      Choose the instrument for this target.
                    </small>

                  </div>

                </div>

                {/* TARGET TYPE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-type">

                      Target Type{" "}

                      <span>*</span>

                    </label>

                    <select
                      id="target-type"
                      value={
                        companyForm.instrument_type ===
                        "OPTION"
                          ? "LOTS"
                          : "VOLUME"
                      }
                      disabled
                    >

                      <option value="VOLUME">
                        Volume
                      </option>

                      <option value="LOTS">
                        Lots
                      </option>

                    </select>

                    <small>
                      How progress will be measured.
                    </small>

                  </div>

                </div>

                {/* PERIOD */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-period">

                      Period Type{" "}

                      <span>*</span>

                    </label>

                    <select
                      id="target-period"
                      name="period_type"
                      value={
                        companyForm.period_type
                      }
                      onChange={
                        updateCompanyForm
                      }
                    >

                      <option value="MONTHLY">
                        Monthly
                      </option>

                      <option value="DAILY">
                        Daily
                      </option>

                    </select>

                    <small>
                      Set a monthly or daily target.
                    </small>

                  </div>

                </div>

                {/* TARGET VALUE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-value">

                      Target Value{" "}

                      <span>*</span>

                    </label>

                    <input
                      id="target-value"
                      name="target_value"
                      value={
                        companyForm.target_value
                      }
                      onChange={
                        updateCompanyForm
                      }
                      type="number"
                      min="0.0001"
                      step="any"
                      placeholder="Enter target value"
                    />

                    <small>
                      Enter the total company target.
                    </small>

                  </div>

                </div>

                {/* START DATE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-start">

                      Start Date{" "}

                      <span>*</span>

                    </label>

                    <input
                      id="target-start"
                      name="start_date"
                      value={
                        companyForm.start_date
                      }
                      onChange={
                        updateCompanyForm
                      }
                      type="date"
                    />

                    <small>
                      Target period start date.
                    </small>

                  </div>

                </div>

                {/* END DATE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-end">

                      End Date{" "}

                      <span>*</span>

                    </label>

                    <input
                      id="target-end"
                      name="end_date"
                      value={
                        companyForm.end_date
                      }
                      onChange={
                        updateCompanyForm
                      }
                      type="date"
                      min={
                        companyForm.start_date ||
                        undefined
                      }
                    />

                    <small>
                      Target period end date.
                    </small>

                  </div>

                </div>

                {/* INCENTIVE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-incentive">
                      Incentive Percentage
                    </label>

                    <div className="target-input-suffix">

                      <input
                        id="target-incentive"
                        name="incentive_percentage"
                        value={
                          companyForm.incentive_percentage
                        }
                        onChange={
                          updateCompanyForm
                        }
                        type="number"
                        min="0"
                        step="0.0001"
                        placeholder="0.0000"
                      />

                      <span>%</span>

                    </div>

                    <small>
                      Incentive for achieving this target.
                    </small>

                  </div>

                </div>

                {/* ACTIVE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-active">
                      Active
                    </label>

                    <label className="target-switch">

                      <input
                        id="target-active"
                        name="is_active"
                        type="checkbox"
                        checked={
                          companyForm.is_active
                        }
                        onChange={
                          updateCompanyForm
                        }
                      />

                      <span
                        className="target-switch-track"
                        aria-hidden="true"
                      />

                      <span>
                        Make this target active
                      </span>

                    </label>

                  </div>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="target-form-actions">

                <button
                  type="reset"
                  className="target-reset-btn"
                >
                  <i
                    className="fa-solid fa-rotate-left"
                    aria-hidden="true"
                  />

                  Reset
                </button>

                <button
                  type="submit"
                  className="target-primary-btn"
                >
                  <i
                    className="fa-solid fa-circle-plus"
                    aria-hidden="true"
                  />

                  Create Company Target
                </button>

              </div>

            </form>

          </div>

        </section>

      )}

      {/* =====================================================
          ASSIGN TARGET
      ===================================================== */}

      {canAssign && (

        <section className="target-panel">

          <div className="target-panel-header">

            <div className="target-panel-heading">

              <span className="target-panel-icon">

                <i
                  className="fa-solid fa-user-group"
                  aria-hidden="true"
                />

              </span>

              <div>

                <h3>
                  Assign Target to{" "}
                  {recipientType}
                </h3>

                <p>
                  Allocate part of a target to relationship managers.
                </p>

              </div>

            </div>

            <span className="target-panel-note">

              <i
                className="fa-solid fa-circle-info"
                aria-hidden="true"
              />

              {recipientType} allocations should fit within the available target.

            </span>

          </div>

          <div className="target-panel-body">

            <form
              onSubmit={
                handleAssign
              }
              onReset={
                resetAssignment
              }
            >

              <div className="row g-3">

                {/* TARGET SELECT */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-assign-target">

                      Company Target{" "}

                      <span>*</span>

                    </label>

                    <select
                      id="target-assign-target"
                      name="target"
                      value={
                        assignmentForm.target
                      }
                      onChange={
                        updateAssignmentForm
                      }
                    >

                      <option value="">
                        Select target
                      </option>

                      {targets
                        .filter(
                          (target) =>
                            target.id &&
                            target.is_active !==
                              false
                        )
                        .map(
                          (target) => (

                          <option
                            key={
                              target.id
                            }
                            value={
                              target.id
                            }
                          >
                            {
                              target.instrument_type
                            }{" "}
                            ·{" "}
                            {
                              target.period_type
                            }{" "}
                            ·{" "}
                            {
                              target.target_type
                            }{" "}
                            ·{" "}
                            {
                              target.start_date
                            }{" "}
                            to{" "}
                            {
                              target.end_date
                            }
                          </option>

                        ))}

                    </select>

                    <small>
                      Select the target to allocate.
                    </small>

                  </div>

                </div>

                {/* RM MULTI SELECT */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-recipients">

                      Assign To RMs{" "}

                      <span>*</span>

                    </label>

                    <Select
                      inputId="target-recipients"
                      classNamePrefix="target-select"
                      isMulti
                      isSearchable
                      isClearable
                      closeMenuOnSelect={
                        false
                      }
                      options={
                        recipientOptions
                      }
                      value={
                        selectedRecipients
                      }
                      onChange={(
                        options
                      ) =>
                        setSelectedRecipients(
                          options ||
                            []
                        )
                      }
                      placeholder="Search and select RMs"
                      noOptionsMessage={() =>
                        "No RMs found"
                      }
                    />

                    <small>
                      Select one or more RMs.
                    </small>

                  </div>

                </div>

                {/* ACTIVE */}

                <div className="col-12 col-md-6 col-xl-3">

                  <div className="target-field">

                    <label htmlFor="target-assignment-active">
                      Active
                    </label>

                    <label className="target-switch">

                      <input
                        id="target-assignment-active"
                        name="is_active"
                        type="checkbox"
                        checked={
                          assignmentForm.is_active
                        }
                        onChange={
                          updateAssignmentForm
                        }
                      />

                      <span
                        className="target-switch-track"
                        aria-hidden="true"
                      />

                      <span>
                        Make this assignment active
                      </span>

                    </label>

                  </div>

                </div>

              </div>

              {/* INDIVIDUAL RM VALUES */}

              {selectedRecipients.length >
                0 && (

                <div className="row g-3 target-recipient-values">

                  {selectedRecipients.map(
                    (recipient) => (

                    <div
                      className="col-12 col-md-6 col-xl-3"
                      key={
                        recipient.value
                      }
                    >

                      <div className="target-field">

                        <label
                          htmlFor={`target-value-${recipient.value}`}
                        >
                          {
                            recipient.label
                          }{" "}
                          · Target Value{" "}

                          <span>*</span>
                        </label>

                        <input
                          id={`target-value-${recipient.value}`}
                          type="number"
                          min="0.0001"
                          step="any"
                          placeholder="Enter assigned value"
                          value={
                            recipientValues[
                              recipient.value
                            ] ?? ""
                          }
                          onChange={(
                            event
                          ) =>
                            setRecipientValues(
                              (
                                current
                              ) => ({
                                ...current,

                                [recipient.value]:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />

                      </div>

                    </div>

                  ))}

                </div>

              )}

              {/* ACTIONS */}

              <div className="target-form-actions">

                <button
                  type="reset"
                  className="target-reset-btn"
                >
                  <i
                    className="fa-solid fa-rotate-left"
                    aria-hidden="true"
                  />

                  Reset
                </button>

                <button
                  type="submit"
                  className="target-primary-btn"
                >
                  <i
                    className="fa-solid fa-user-plus"
                    aria-hidden="true"
                  />

                  Assign to{" "}
                  {recipientType}

                  {selectedRecipients.length >
                  1
                    ? "s"
                    : ""}
                </button>

              </div>

            </form>

          </div>

        </section>

      )}

    </div>
  );
}

export default Target;