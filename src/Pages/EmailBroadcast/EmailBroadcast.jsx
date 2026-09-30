import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";

import "./EmailBroadcast.css";


const clientOptions = [
  {
    id: 1,
    name: "Rahul Menon",
    code: "RM10245",
  },
  {
    id: 2,
    name: "Arjun Nair",
    code: "AN20981",
  },
  {
    id: 3,
    name: "Nikhil Joseph",
    code: "NJ40582",
  },
  {
    id: 4,
    name: "Faisal Ahmed",
    code: "FA10892",
  },
  {
    id: 5,
    name: "Adithya Krishnan",
    code: "AK70123",
  },
  {
    id: 6,
    name: "Sneha Pillai",
    code: "SP98234",
  },
];


const templateContent = {
  MARKET_UPDATE: {
    subject: "Market Update",

    message:
      "",
  },

  HOLIDAY_NOTICE: {
    subject: "Holiday Notice",

    message:
      "",
  },

  CUSTOM_MESSAGE: {
    subject: "",

    message: "",
  },
};


function EmailBroadcast() {
  const [selectedClients, setSelectedClients] =
    useState([]);

  const [clientSearch, setClientSearch] =
    useState("");

  const [showClientDropdown, setShowClientDropdown] =
    useState(false);

  const [sendCopy, setSendCopy] =
    useState(false);

  const [template, setTemplate] =
    useState("HOLIDAY_NOTICE");

  const [subject, setSubject] =
    useState(
      templateContent.HOLIDAY_NOTICE.subject
    );

  const [message, setMessage] =
    useState(
      templateContent.HOLIDAY_NOTICE.message
    );


  /* =====================================================
     CLIENT FILTER
  ===================================================== */

  const filteredClients = useMemo(() => {
    const query =
      clientSearch
        .trim()
        .toLowerCase();

    return clientOptions.filter(
      (client) => {

        const alreadySelected =
          selectedClients.some(
            (selected) =>
              selected.id ===
              client.id
          );

        if (alreadySelected) {
          return false;
        }

        if (!query) {
          return true;
        }

        return (
          client.name
            .toLowerCase()
            .includes(query) ||
          client.code
            .toLowerCase()
            .includes(query)
        );
      }
    );
  }, [
    clientSearch,
    selectedClients,
  ]);


  /* =====================================================
     ADD CLIENT
  ===================================================== */

  const handleAddClient = (
    client
  ) => {
    setSelectedClients(
      (current) => [
        ...current,
        client,
      ]
    );

    setClientSearch("");

    setShowClientDropdown(
      false
    );
  };


  /* =====================================================
     REMOVE CLIENT
  ===================================================== */

  const handleRemoveClient = (
    clientId
  ) => {
    setSelectedClients(
      (current) =>
        current.filter(
          (client) =>
            client.id !==
            clientId
        )
    );
  };


  /* =====================================================
     TEMPLATE CHANGE
  ===================================================== */

  const handleTemplateChange = (
    event
  ) => {
    const value =
      event.target.value;

    setTemplate(value);

    const selectedTemplate =
      templateContent[value];

    setSubject(
      selectedTemplate.subject
    );

    setMessage(
      selectedTemplate.message
    );
  };


  /* =====================================================
     SEND
  ===================================================== */

  const handleSendBroadcast =
    () => {

      if (
        selectedClients.length ===
        0
      ) {
        Swal.fire({
          icon: "warning",

          title:
            "Select Clients",

          text:
            "Please select at least one client.",

          background:
            "#061923",

          color:
            "#ffffff",

          confirmButtonColor:
            "#00b985",
        });

        return;
      }


      if (
        !subject.trim()
      ) {
        Swal.fire({
          icon: "warning",

          title:
            "Subject Required",

          text:
            "Please enter an email subject.",

          background:
            "#061923",

          color:
            "#ffffff",

          confirmButtonColor:
            "#00b985",
        });

        return;
      }


      if (
        !message.trim()
      ) {
        Swal.fire({
          icon: "warning",

          title:
            "Message Required",

          text:
            "Please enter the email message.",

          background:
            "#061923",

          color:
            "#ffffff",

          confirmButtonColor:
            "#00b985",
        });

        return;
      }


      Swal.fire({
        icon: "success",

        title:
          "Broadcast Sent",

        html: `
          <span style="color:#91a4ac">
            Email broadcast sent to
          </span>

          <br/>

          <strong style="color:#00d9a0">
            ${selectedClients.length} client${
              selectedClients.length > 1
                ? "s"
                : ""
            }
          </strong>
        `,

        background:
          "#061923",

        color:
          "#ffffff",

        confirmButtonColor:
          "#00b985",
      });
    };


  return (
    <div className="email-broadcast-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="email-broadcast-heading">

        <div className="email-broadcast-heading-icon">

          <i className="fa-solid fa-envelope"></i>

        </div>


        <div>

          <h2>
            Email Broadcast
          </h2>

          <p>
            Send emails to your selected clients
          </p>

        </div>

      </div>


      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="email-broadcast-card">

        {/* =====================================================
            01 RECIPIENTS
        ===================================================== */}

        <section className="broadcast-section">

          <SectionTitle
            number="1"
            title="Recipients"
            subtitle="Select the clients who should receive this email"
          />


          <div className="row g-3 broadcast-section-body">

            {/* CLIENT FIELD */}

            <div className="col-12 col-xl-7">

              <label className="broadcast-label">

                To (Clients)

                <span>
                  *
                </span>

              </label>


              <div className="broadcast-client-select-wrap">

                {/* SELECTED CLIENT TAGS */}

                <div className="broadcast-selected-clients">

                  {selectedClients.map(
                    (client) => (

                      <div
                        key={
                          client.id
                        }
                        className="broadcast-client-chip"
                      >

                        <div>

                          <strong>
                            {client.name}
                          </strong>

                          <small>
                            {
                              client.code
                            }
                          </small>

                        </div>


                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveClient(
                              client.id
                            )
                          }
                        >

                          <i className="fa-solid fa-xmark"></i>

                        </button>

                      </div>

                    )
                  )}

                </div>


                {/* SEARCH */}

                <div className="broadcast-client-search">

                  <i className="fa-solid fa-magnifying-glass"></i>

                  <input
                    type="text"
                    placeholder="Search and select clients"
                    value={
                      clientSearch
                    }
                    onFocus={() =>
                      setShowClientDropdown(
                        true
                      )
                    }
                    onChange={(
                      event
                    ) => {
                      setClientSearch(
                        event.target
                          .value
                      );

                      setShowClientDropdown(
                        true
                      );
                    }}
                  />


                  <i className="fa-solid fa-chevron-down broadcast-dropdown-arrow"></i>

                </div>


                {/* DROPDOWN */}

                {showClientDropdown && (

                  <div className="broadcast-client-dropdown">

                    {filteredClients.length >
                    0 ? (

                      filteredClients.map(
                        (client) => (

                          <button
                            key={
                              client.id
                            }
                            type="button"
                            onClick={() =>
                              handleAddClient(
                                client
                              )
                            }
                          >

                            <div>

                              <strong>
                                {
                                  client.name
                                }
                              </strong>

                              <span>
                                {
                                  client.code
                                }
                              </span>

                            </div>


                            <i className="fa-solid fa-plus"></i>

                          </button>

                        )
                      )

                    ) : (

                      <div className="broadcast-no-client">

                        No clients found

                      </div>

                    )}

                  </div>

                )}

              </div>


              <small className="broadcast-help-text">

                Select one or more clients.

              </small>

            </div>


            {/* RM / DEALER CC */}

            <div className="col-12 col-xl-5">

              <label className="broadcast-copy-box">

                <input
                  type="checkbox"
                  checked={
                    sendCopy
                  }
                  onChange={(
                    event
                  ) =>
                    setSendCopy(
                      event.target
                        .checked
                    )
                  }
                />


                <span className="broadcast-custom-checkbox">

                  <i className="fa-solid fa-check"></i>

                </span>


                <div>

                  <strong>
                    Send a copy to associated RM and Dealer
                  </strong>

                  <small>
                    They will receive the email as CC when selected.
                  </small>

                </div>

              </label>

            </div>

          </div>

        </section>


        {/* =====================================================
            02 EMAIL CONTENT
        ===================================================== */}

        <section className="broadcast-section">

          <SectionTitle
            number="2"
            title="Email Content"
            subtitle="Choose a template or write a custom message"
          />


          <div className="broadcast-section-body">

            <div className="row g-3">

              {/* TEMPLATE */}

              <div className="col-12 col-lg-4">

                <label className="broadcast-label">

                  Template

                </label>


                <select
                  className="broadcast-field"
                  value={
                    template
                  }
                  onChange={
                    handleTemplateChange
                  }
                >

                  <option value="MARKET_UPDATE">
                    Market Update
                  </option>


                  <option value="HOLIDAY_NOTICE">
                    Holiday Notice
                  </option>


                  <option value="CUSTOM_MESSAGE">
                    Custom Message
                  </option>

                </select>

              </div>


              {/* SUBJECT */}

              <div className="col-12 col-lg-8">

                <label className="broadcast-label">

                  Subject

                  <span>
                    *
                  </span>

                </label>


                <input
                  type="text"
                  className="broadcast-field"
                  placeholder="Enter email subject"
                  value={
                    subject
                  }
                  onChange={(
                    event
                  ) =>
                    setSubject(
                      event.target
                        .value
                    )
                  }
                />

              </div>

            </div>


            {/* MESSAGE */}

            <div className="broadcast-message-field">

              <div className="broadcast-message-heading">

                <label className="broadcast-label">

                  Message

                  <span>
                    *
                  </span>

                </label>


                <select className="broadcast-variable-select">

                  <option>
                    Date
                  </option>

                  <option>
                    Client Name
                  </option>

                  <option>
                    Client Code
                  </option>

                </select>

              </div>


              <textarea
                maxLength={5000}
                placeholder="Write your email message here..."
                value={
                  message
                }
                onChange={(
                  event
                ) =>
                  setMessage(
                    event.target
                      .value
                  )
                }
              ></textarea>


              <div className="broadcast-message-footer">

                <span>
                  Use {"{name}"}, {"{client_code}"} or {"{date}"}.
                </span>


                <span>
                  {message.length} / 5000
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            SEND FOOTER
        ===================================================== */}

        <div className="broadcast-send-footer">

          <div className="broadcast-send-label">

            <div className="broadcast-send-icon">

              <i className="fa-regular fa-eye"></i>

            </div>


            <div>

              <strong>
                Send
              </strong>

              <span>
                Review your email before sending
              </span>

            </div>

          </div>


          <button
            type="button"
            className="broadcast-send-btn"
            onClick={
              handleSendBroadcast
            }
          >

            <i className="fa-solid fa-paper-plane"></i>

            Send Broadcast

          </button>

        </div>

      </div>

    </div>
  );
}


function SectionTitle({
  number,
  title,
  subtitle,
}) {
  return (
    <div className="broadcast-section-title">

      <div className="broadcast-step-number">
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


export default EmailBroadcast;