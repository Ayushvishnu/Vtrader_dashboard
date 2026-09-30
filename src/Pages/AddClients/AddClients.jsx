import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./AddClients.css";

function AddClient() {
  const navigate = useNavigate();

  const initialForm = {
    clientName: "",
    panCard: "",
    phone: "",
    email: "",

    branch: "",
    rm: "",
    dealer: "",
    group: "",

    broker: "",
    brokerClientCode: "",
    brokerPassword: "",
    apiSecret: "",
    totpSecret: "",
    appCode: "",

    eqIntradayPercentage: "",
    eqLongTermPercentage: "",

    futureBrokerageType: "Percentage",
    futureBrokerageValue: "",

    optionBrokerageType: "Percentage",
    optionBrokerageValue: "",

    commissionType: "Percentage",
    commissionValue: "",
  };

  const [formData, setFormData] =
    useState(initialForm);

  const [showPassword, setShowPassword] =
    useState(false);


  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };


  /* =========================================
     RESET
  ========================================= */

  const handleReset = () => {
    setFormData(initialForm);
    setShowPassword(false);
  };


  /* =========================================
     WARNING
  ========================================= */

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

      confirmButtonColor: "#00b985",
    });
  };


  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();


    if (!formData.clientName.trim()) {
      showWarning(
        "Client Name Required",
        "Please enter the client name."
      );

      return;
    }


    if (!formData.panCard.trim()) {
      showWarning(
        "PAN Card Required",
        "Please enter the PAN card number."
      );

      return;
    }


    if (!formData.phone.trim()) {
      showWarning(
        "Phone Number Required",
        "Please enter the phone number."
      );

      return;
    }


    if (!formData.branch) {
      showWarning(
        "Branch Required",
        "Please select a branch."
      );

      return;
    }


    if (!formData.rm) {
      showWarning(
        "RM Required",
        "Please select an RM."
      );

      return;
    }


    if (!formData.dealer) {
      showWarning(
        "Dealer Required",
        "Please select a dealer."
      );

      return;
    }


    if (!formData.group) {
      showWarning(
        "Group Required",
        "Please select a group."
      );

      return;
    }


    if (!formData.broker) {
      showWarning(
        "Broker Required",
        "Please select a broker."
      );

      return;
    }


    if (
      !formData.brokerClientCode.trim()
    ) {
      showWarning(
        "Broker Client Code Required",
        "Please enter the broker client code."
      );

      return;
    }


    if (
      !formData.commissionValue
    ) {
      showWarning(
        "Commission Required",
        "Please enter the commission value."
      );

      return;
    }


    Swal.fire({
      icon: "success",

      title: "Client Created",

      html: `
        <strong
          style="color:#00d9a0"
        >
          ${formData.clientName}
        </strong>

        <br/>

        <span
          style="color:#8da1aa"
        >
          Client created successfully.
        </span>
      `,

      background: "#061923",

      color: "#ffffff",

      confirmButtonColor:
        "#00b985",

    }).then(() => {
      navigate("/clients");
    });
  };


  return (
    <div className="add-client-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="add-client-page-header">

        <div className="add-client-heading">

          <button
            type="button"
            className="add-client-back-btn"
            onClick={() =>
              navigate("/clients")
            }
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>


          <div className="add-client-heading-icon">

            <i className="fa-solid fa-user-plus"></i>

          </div>


          <div>

            <h2>
              Add Client
            </h2>

            <p>
              Create and configure a new client account
            </p>

          </div>

        </div>

      </div>


      <form
        className="add-client-form"
        onSubmit={handleSubmit}
      >

        {/* =====================================================
            01 CLIENT INFORMATION
        ===================================================== */}

        <div className="add-client-card">

          <SectionHeader
            number="01"
            title="Client Information"
            subtitle="Basic client details"
          />


          <div className="row g-3 add-client-fields">

            {/* CLIENT NAME */}

            <FormInput
              label="Client Name"
              required
              name="clientName"
              value={
                formData.clientName
              }
              placeholder="Enter client name"
              onChange={
                handleChange
              }
            />


            {/* PAN */}

            <FormInput
              label="PAN Card"
              required
              name="panCard"
              value={
                formData.panCard
              }
              placeholder="ABCDE1234F"
              onChange={
                handleChange
              }
            />


            {/* PHONE */}

            <FormInput
              label="Phone Number"
              required
              name="phone"
              value={
                formData.phone
              }
              placeholder="9876543210"
              onChange={
                handleChange
              }
            />


            {/* EMAIL */}

            <FormInput
              label="Email"
              name="email"
              type="email"
              value={
                formData.email
              }
              placeholder="client@gmail.com"
              onChange={
                handleChange
              }
            />


            {/* BRANCH */}

            <FormSelect
              label="Branch"
              required
              name="branch"
              value={
                formData.branch
              }
              placeholder="Select Branch"
              onChange={
                handleChange
              }
              options={[
                {
                  value: "BR001",
                  label:
                    "Calicut Branch",
                },
                {
                  value: "BR002",
                  label:
                    "Kochi Branch",
                },
                {
                  value: "BR003",
                  label:
                    "Trivandrum Branch",
                },
              ]}
            />


            {/* RM */}

            <FormSelect
              label="RM"
              required
              name="rm"
              value={
                formData.rm
              }
              placeholder="Select RM"
              onChange={
                handleChange
              }
              options={[
                {
                  value: "RM001",
                  label:
                    "Rahul Menon",
                },
                {
                  value: "RM002",
                  label:
                    "Arjun Nair",
                },
                {
                  value: "RM003",
                  label:
                    "Nikhil Joseph",
                },
              ]}
            />


            {/* DEALER */}

            <FormSelect
              label="Dealer"
              required
              name="dealer"
              value={
                formData.dealer
              }
              placeholder="Select Dealer"
              onChange={
                handleChange
              }
              options={[
                {
                  value: "DL001",
                  label:
                    "Dealer One",
                },
                {
                  value: "DL002",
                  label:
                    "Dealer Two",
                },
              ]}
            />


            {/* GROUP */}

            <FormSelect
              label="Group"
              required
              name="group"
              value={
                formData.group
              }
              placeholder="Select Group"
              onChange={
                handleChange
              }
              options={[
                {
                  value: "Premium",
                  label:
                    "Premium",
                },
                {
                  value: "Standard",
                  label:
                    "Standard",
                },
              ]}
            />

          </div>

        </div>


        {/* =====================================================
            02 BROKER ACCOUNT
        ===================================================== */}

        <div className="add-client-card">

          <SectionHeader
            number="02"
            title="Broker Account"
            subtitle="Broker connection details"
          />


          <div className="row g-3 add-client-fields">

            {/* BROKER */}

            <FormSelect
              label="Broker"
              required
              name="broker"
              value={
                formData.broker
              }
              placeholder="Select Broker"
              onChange={
                handleChange
              }
              columnClass="col-12 col-md-6 col-xl-4"
              options={[
                {
                  value: "IIFL",
                  label: "IIFL",
                },
                {
                  value:
                    "Alice Blue",
                  label:
                    "Alice Blue",
                },
                {
                  value:
                    "Angel One",
                  label:
                    "Angel One",
                },
              ]}
            />


            {/* CLIENT CODE */}

            <FormInput
              label="Broker Client Code"
              required
              name="brokerClientCode"
              value={
                formData
                  .brokerClientCode
              }
              placeholder="FAISAL001"
              onChange={
                handleChange
              }
            />


            {/* PASSWORD */}

            <div className="col-12 col-md-6 col-xl-4">

              <div className="add-client-field">

                <label>

                  Broker Password

                </label>


                <div className="add-client-password-wrap">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="brokerPassword"
                    value={
                      formData
                        .brokerPassword
                    }
                    placeholder="Broker password"
                    onChange={
                      handleChange
                    }
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
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

                </div>

              </div>

            </div>


            {/* API SECRET */}

            <FormInput
              label="API Secret"
              name="apiSecret"
              value={
                formData.apiSecret
              }
              placeholder="API secret"
              onChange={
                handleChange
              }
            />


            {/* TOTP */}

            <FormInput
              label="TOTP Secret"
              name="totpSecret"
              value={
                formData.totpSecret
              }
              placeholder="TOTP secret"
              onChange={
                handleChange
              }
            />


            {/* APP CODE */}

            <FormInput
              label="App Code"
              name="appCode"
              value={
                formData.appCode
              }
              placeholder="App code"
              onChange={
                handleChange
              }
            />

          </div>

        </div>


        {/* =====================================================
            03 BROKERAGE CONFIGURATION
        ===================================================== */}

        <div className="add-client-card">

          <SectionHeader
            number="03"
            title="Brokerage Configuration"
            subtitle="Configure equity, futures, and options brokerage"
          />


          <div className="row g-3 add-client-fields">

            {/* EQ INTRADAY */}

            <PercentageInput
              label="EQ Intraday Percentage"
              name="eqIntradayPercentage"
              value={
                formData
                  .eqIntradayPercentage
              }
              placeholder="0.25"
              onChange={
                handleChange
              }
            />


            {/* EQ LONG TERM */}

            <PercentageInput
              label="EQ Long-term Percentage"
              name="eqLongTermPercentage"
              value={
                formData
                  .eqLongTermPercentage
              }
              placeholder="0.50"
              onChange={
                handleChange
              }
            />


            {/* FUTURE TYPE */}

            <FormSelect
              label="Future Brokerage Type"
              name="futureBrokerageType"
              value={
                formData
                  .futureBrokerageType
              }
              onChange={
                handleChange
              }
              options={[
                {
                  value:
                    "Percentage",
                  label:
                    "Percentage",
                },
                {
                  value: "Flat",
                  label:
                    "Flat Amount",
                },
              ]}
            />


            {/* FUTURE VALUE */}

            <FormInput
              label="Future Brokerage Value"
              name="futureBrokerageValue"
              type="number"
              value={
                formData
                  .futureBrokerageValue
              }
              placeholder="Enter value"
              onChange={
                handleChange
              }
            />


            {/* OPTION TYPE */}

            <FormSelect
              label="Option Brokerage Type"
              name="optionBrokerageType"
              value={
                formData
                  .optionBrokerageType
              }
              onChange={
                handleChange
              }
              options={[
                {
                  value:
                    "Percentage",
                  label:
                    "Percentage",
                },
                {
                  value: "Flat",
                  label:
                    "Flat Amount",
                },
              ]}
            />


            {/* OPTION VALUE */}

            <FormInput
              label="Option Brokerage Value"
              name="optionBrokerageValue"
              type="number"
              value={
                formData
                  .optionBrokerageValue
              }
              placeholder="20.0000"
              onChange={
                handleChange
              }
            />

          </div>

        </div>


        {/* =====================================================
            04 COMMISSION & BROKERAGE
        ===================================================== */}

        <div className="add-client-card">

          <SectionHeader
            number="04"
            title="Commission & Brokerage"
            subtitle="Commission percentage of client per profit"
          />


          <div className="row g-3 add-client-fields">

            {/* COMMISSION TYPE */}

            <FormSelect
              label="Commission Type"
              name="commissionType"
              value={
                formData.commissionType
              }
              onChange={
                handleChange
              }
              columnClass="col-12 col-md-6"
              options={[
                {
                  value:
                    "Percentage",
                  label:
                    "Percentage",
                },
                {
                  value: "Flat",
                  label:
                    "Flat Amount",
                },
              ]}
            />


            {/* COMMISSION VALUE */}

            <PercentageInput
              label="Commission Value"
              required
              name="commissionValue"
              value={
                formData
                  .commissionValue
              }
              placeholder="0.05"
              onChange={
                handleChange
              }
              columnClass="col-12 col-md-6"
            />

          </div>

        </div>


        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="add-client-footer">

          <button
            type="button"
            className="add-client-reset-btn"
            onClick={
              handleReset
            }
          >
            <i className="fa-solid fa-rotate-left"></i>

            Reset
          </button>


          <button
            type="submit"
            className="add-client-submit-btn"
          >
            <i className="fa-solid fa-plus"></i>

            Create Client
          </button>

        </div>

      </form>

    </div>
  );
}


/* =====================================================
   SECTION HEADER
===================================================== */

function SectionHeader({
  number,
  title,
  subtitle,
}) {
  return (
    <div className="add-client-card-header">

      <div className="add-client-step-number">
        {number}
      </div>

      <div>

        <h3>
          {title}
        </h3>

        <p>
          {subtitle}
        </p>

      </div>

    </div>
  );
}


/* =====================================================
   INPUT
===================================================== */

function FormInput({
  label,
  required = false,
  columnClass =
    "col-12 col-md-6 col-xl-3",
  ...props
}) {
  return (
    <div className={columnClass}>

      <div className="add-client-field">

        <label>

          {label}

          {required && (
            <span className="required-star">
              *
            </span>
          )}

        </label>


        <input
          className="add-client-input"
          {...props}
        />

      </div>

    </div>
  );
}


/* =====================================================
   SELECT
===================================================== */

function FormSelect({
  label,
  required = false,
  options = [],
  placeholder,
  columnClass =
    "col-12 col-md-6 col-xl-3",
  ...props
}) {
  return (
    <div className={columnClass}>

      <div className="add-client-field">

        <label>

          {label}

          {required && (
            <span className="required-star">
              *
            </span>
          )}

        </label>


        <select
          className="add-client-select"
          {...props}
        >

          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}


          {options.map(
            (option) => (

              <option
                key={
                  option.value
                }
                value={
                  option.value
                }
              >
                {option.label}
              </option>

            )
          )}

        </select>

      </div>

    </div>
  );
}


/* =====================================================
   PERCENTAGE INPUT
===================================================== */

function PercentageInput({
  label,
  required = false,
  columnClass =
    "col-12 col-md-6 col-xl-3",
  ...props
}) {
  return (
    <div className={columnClass}>

      <div className="add-client-field">

        <label>

          {label}

          {required && (
            <span className="required-star">
              *
            </span>
          )}

        </label>


        <div className="percentage-input-wrap">

          <input
            type="number"
            className="add-client-input"
            {...props}
          />

          <span>
            %
          </span>

        </div>

      </div>

    </div>
  );
}


export default AddClient;