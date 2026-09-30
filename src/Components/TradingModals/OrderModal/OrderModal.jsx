import React, { useState } from "react";
import "./OrderModal.css";

const demoCustomers = [
  {
    code: "CL001",
    name: "Rahul Menon",
    broker: "Alice Blue",
  },
  {
    code: "CL002",
    name: "Arjun Nair",
    broker: "IIFL",
  },
  {
    code: "CL003",
    name: "Nikhil Joseph",
    broker: "Angel One",
  },
];

const demoGroups = [
  "Momentum Group",
  "Growth Group",
  "Premium Group",
];

function OrderModal({
  show,
  side,
  selectedStock,
  onClose,
}) {
  const isBuy = side === "BUY";

  const [product, setProduct] = useState("Intraday");
  const [orderType, setOrderType] = useState("Market");
  const [validity, setValidity] = useState("DAY");

  const [price, setPrice] = useState("");
  const [triggerPrice, setTriggerPrice] = useState("");

  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const [selectedCustomers, setSelectedCustomers] = useState([]);

  if (!show) {
    return null;
  }

  const handleCustomerSelect = (customer) => {
    const alreadySelected = selectedCustomers.some(
      (item) => item.code === customer.code
    );

    if (alreadySelected) {
      return;
    }

    setSelectedCustomers((prev) => [
      ...prev,
      {
        ...customer,
        quantity: 1,
      },
    ]);

    setCustomerSearch("");
  };

  const handleQuantityChange = (code, value) => {
    setSelectedCustomers((prev) =>
      prev.map((item) =>
        item.code === code
          ? {
              ...item,
              quantity: value,
            }
          : item
      )
    );
  };

  const handleRemoveCustomer = (code) => {
    setSelectedCustomers((prev) =>
      prev.filter((item) => item.code !== code)
    );
  };

  const filteredCustomers = demoCustomers.filter((item) => {
    const text = customerSearch.toLowerCase();

    return (
      item.code.toLowerCase().includes(text) ||
      item.name.toLowerCase().includes(text)
    );
  });

  const handleClose = () => {
    setSelectedCustomers([]);
    setCustomerSearch("");
    setSelectedGroup("");
    setPrice("");
    setTriggerPrice("");

    onClose();
  };

  return (
    <div
      className="order-modal-overlay"
      onMouseDown={handleClose}
    >
      <div
        className={`order-modal ${isBuy ? "buy" : "sell"}`}
        onMouseDown={(event) => event.stopPropagation()}
      >

        {/* ================= HEADER ================= */}

        <div className="order-modal-header">

          <div className="order-modal-header-left">

            <h3>
              {isBuy ? "BUY BULK ORDER" : "SELL BULK ORDER"}
            </h3>

            <div className="order-modal-stock">

              <strong>
                {selectedStock?.symbol || "--"}
              </strong>

              <span>
                ₹
                {Number(
                  selectedStock?.ltp || 0
                ).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>

            </div>

          </div>


          <button
            type="button"
            className="order-modal-close"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

        </div>


        {/* ================= BODY ================= */}

        <div className="order-modal-body">

          {/* ROW 1 */}

          <div className="row g-3">

            <div className="col-12 col-md-4">

              <label>
                Symbol
              </label>

              <input
                type="text"
                value={selectedStock?.symbol || ""}
                readOnly
              />

            </div>


            <div className="col-12 col-md-4">

              <label>
                Product
              </label>

              <select
                value={product}
                onChange={(event) =>
                  setProduct(event.target.value)
                }
              >
                <option value="Intraday">
                  Intraday
                </option>

                <option value="Delivery">
                  Delivery
                </option>
              </select>

            </div>


            <div className="col-12 col-md-4">

              <label>
                Order Type
              </label>

              <select
                value={orderType}
                onChange={(event) =>
                  setOrderType(event.target.value)
                }
              >
                <option value="Market">
                  Market
                </option>

                <option value="Limit">
                  Limit
                </option>

                <option value="SL">
                  Stop Loss
                </option>
              </select>

            </div>

          </div>


          {/* ROW 2 */}

          <div className="row g-3 mt-1">

            <div className="col-12 col-md-4">

              <label>
                Price
              </label>

              <input
                type="number"
                placeholder={
                  orderType === "Market"
                    ? "Not required"
                    : "Enter price"
                }
                value={price}
                disabled={orderType === "Market"}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
              />

            </div>


            <div className="col-12 col-md-4">

              <label>
                Trigger Price
              </label>

              <input
                type="number"
                placeholder={
                  orderType === "SL"
                    ? "Enter trigger price"
                    : "Not required"
                }
                value={triggerPrice}
                disabled={orderType !== "SL"}
                onChange={(event) =>
                  setTriggerPrice(event.target.value)
                }
              />

            </div>


            <div className="col-12 col-md-4">

              <label>
                Validity
              </label>

              <select
                value={validity}
                onChange={(event) =>
                  setValidity(event.target.value)
                }
              >
                <option value="DAY">
                  DAY
                </option>

                <option value="IOC">
                  IOC
                </option>
              </select>

            </div>

          </div>


          {/* ================= CUSTOMER / GROUP ================= */}

          <div className="row g-3 mt-1">

            <div className="col-12 col-md-6">

              <label>
                Customers
              </label>

              <div className="order-customer-search">

                <input
                  type="text"
                  placeholder="Search customer code or name"
                  value={customerSearch}
                  onChange={(event) =>
                    setCustomerSearch(event.target.value)
                  }
                />

                <i className="fa-solid fa-chevron-down"></i>

                {customerSearch && (
                  <div className="order-customer-dropdown">

                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (

                        <button
                          key={customer.code}
                          type="button"
                          onClick={() =>
                            handleCustomerSelect(customer)
                          }
                        >

                          <div>
                            <strong>
                              {customer.code}
                            </strong>

                            <span>
                              {customer.name}
                            </span>
                          </div>

                          <small>
                            {customer.broker}
                          </small>

                        </button>

                      ))
                    ) : (
                      <div className="order-no-customer">
                        No customers found
                      </div>
                    )}

                  </div>
                )}

              </div>

            </div>


            <div className="col-12 col-md-6">

              <label>
                Group
              </label>

              <select
                value={selectedGroup}
                onChange={(event) =>
                  setSelectedGroup(event.target.value)
                }
              >
                <option value="">
                  Select customer group
                </option>

                {demoGroups.map((group) => (
                  <option
                    key={group}
                    value={group}
                  >
                    {group}
                  </option>
                ))}

              </select>

            </div>

          </div>


          {/* ================= SELECTED CUSTOMERS ================= */}

          <div className="selected-customers-card">

            <div className="selected-customers-header">

              <strong>
                Selected Customers
              </strong>

              <span>
                Selected: {selectedCustomers.length}
              </span>

            </div>


            <div className="selected-customers-table-wrap">

              <table className="selected-customers-table">

                <thead>
                  <tr>
                    <th>CLIENT CODE</th>
                    <th>CUSTOMER</th>
                    <th>BROKER</th>
                    <th>QUANTITY</th>
                    <th>REMOVE</th>
                  </tr>
                </thead>

                <tbody>

                  {selectedCustomers.length === 0 ? (

                    <tr>
                      <td
                        colSpan="5"
                        className="selected-customers-empty"
                      >
                        No customers selected
                      </td>
                    </tr>

                  ) : (

                    selectedCustomers.map((customer) => (

                      <tr key={customer.code}>

                        <td>
                          {customer.code}
                        </td>

                        <td>
                          {customer.name}
                        </td>

                        <td>
                          {customer.broker}
                        </td>

                        <td>

                          <input
                            type="number"
                            min="1"
                            value={customer.quantity}
                            onChange={(event) =>
                              handleQuantityChange(
                                customer.code,
                                event.target.value
                              )
                            }
                          />

                        </td>

                        <td>

                          <button
                            type="button"
                            className="remove-customer-btn"
                            onClick={() =>
                              handleRemoveCustomer(
                                customer.code
                              )
                            }
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>


        {/* ================= FOOTER ================= */}

        <div className="order-modal-footer">

          <button
            type="button"
            className="order-close-btn"
            onClick={handleClose}
          >
            Close
          </button>


          <button
            type="button"
            className={`order-submit-btn ${
              isBuy ? "buy" : "sell"
            }`}
          >
            Submit {isBuy ? "BUY" : "SELL"} Order
          </button>

        </div>

      </div>
    </div>
  );
}

export default OrderModal;