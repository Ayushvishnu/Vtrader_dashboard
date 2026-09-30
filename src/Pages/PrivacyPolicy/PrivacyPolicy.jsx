import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css";

const privacySections = [
  {
    title: "Collection of Personal Data",
    description:
      "We collect personal data, such as your name, email address, phone number, and IP address, when you visit our website, contact us, or register for our services.",
  },
  {
    title: "Use of Personal Data",
    description:
      "We use personal data to provide and improve our services, communicate with you, and comply with regulatory requirements.",
  },
  {
    title: "Data Security",
    description:
      "We implement robust security measures to protect personal data from unauthorized access, disclosure, alteration, or destruction.",
  },
  {
    title: "Data Sharing",
    description:
      "We do not share personal data with third parties, except with your consent or to comply with regulatory requirements.",
  },
  {
    title: "Pricing Starting from ₹199",
    description:
      "Our prices are designed to offer exceptional value, with packages starting from just ₹199.",
  },
  {
    title: "No Refund Policy",
    description:
      "We do not offer a refund policy, ensuring that our services are tailored to meet your specific needs with clarity and commitment.",
  },
];

const termsSections = [
  {
    title: "Introduction",
    description:
      "These Terms and Conditions govern your use of our website and services.",
  },
  {
    title: "Intellectual Property",
    description:
      "Our website and services contain proprietary and confidential information, including intellectual property rights. You agree not to reproduce, distribute, or display any content without our prior written consent.",
  },
  {
    title: "Data Security",
    description:
      "We implement robust security measures to protect personal data from unauthorized access, disclosure, alteration, or destruction.",
  },
  {
    title: "Limitation of Liability",
    description:
      "Greeks Labs Technologies Ltd shall not be liable for any damages, losses, or expenses arising from your use of our website and services.",
  },
  {
    title: "Governing Law",
    description:
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of India.",
  },
  {
    title: "Changes to Terms",
    description:
      "We reserve the right to modify or update these Terms and Conditions at any time without prior notice.",
  },
];

const policyContent = {
  privacy: {
    title: "Privacy Policy",
    subtitle:
      "At Greeks Labs Technologies Ltd, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.",
    sections: privacySections,
    notice:
      "By continuing to use our website and services, you acknowledge that you have read and understood this Privacy Policy.",
  },
  terms: {
    title: "Terms & Conditions",
    subtitle:
      "Welcome to Greeks Labs Technologies Ltd. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions.",
    sections: termsSections,
    notice:
      "By using this website, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.",
  },
};

function PrivacyPolicy({ initialTab = "privacy" }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);

  const content = policyContent[activeTab];

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="policy-page">
      <div className="container-fluid">
        <div className="policy-wrapper">

          <div className="policy-topbar">
            <div className="policy-topbar-info">
              <span className="policy-topbar-icon">
                <i className="fa-solid fa-scale-balanced"></i>
              </span>

              <div>
                <span className="policy-kicker">
                  Legal Information
                </span>

                <p>
                  Privacy, security and terms of service
                </p>
              </div>
            </div>

            <div className="policy-topbar-actions">
              <div className="policy-tabs">
                <button
                  type="button"
                  aria-pressed={activeTab === "privacy"}
                  className={`policy-tab-btn ${
                    activeTab === "privacy" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("privacy")}
                >
                  <i className="fa-solid fa-shield-halved"></i>
                  Privacy Policy
                </button>

                <button
                  type="button"
                  aria-pressed={activeTab === "terms"}
                  className={`policy-tab-btn ${
                    activeTab === "terms" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("terms")}
                >
                  <i className="fa-solid fa-file-contract"></i>
                  Terms &amp; Conditions
                </button>
              </div>

              <button
                type="button"
                className="policy-back-btn"
                onClick={handleBack}
              >
                <i className="fa-solid fa-arrow-left"></i>
                Back to Home
              </button>
            </div>
          </div>

          <div
            className="policy-content-card"
            key={activeTab}
          >
            <div className="policy-header">
              <div className="policy-header-icon">
                <i
                  className={
                    activeTab === "privacy"
                      ? "fa-solid fa-user-shield"
                      : "fa-solid fa-file-signature"
                  }
                ></i>
              </div>

              <div className="policy-header-content">
                <span className="policy-header-label">
                  {activeTab === "privacy"
                    ? "Your privacy matters"
                    : "Please read carefully"}
                </span>

                <h1 className="policy-title">
                  {content.title}
                </h1>

                <p className="policy-description">
                  {content.subtitle}
                </p>
              </div>
            </div>

            <div className="policy-divider"></div>

            <div className="row g-4">
              {content.sections.map((section, index) => (
                <div
                  className="col-12 col-md-6"
                  key={section.title}
                >
                  <div className="policy-section">
                    <div className="policy-section-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="policy-section-content">
                      <h5>{section.title}</h5>
                      <p>{section.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="policy-notice">
              <span className="policy-notice-icon">
                <i className="fa-solid fa-circle-check"></i>
              </span>

              <p>{content.notice}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;