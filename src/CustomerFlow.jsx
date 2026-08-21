import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./CustomerFlow.css";

import {
  PERMISSIONS,
  getCurrentRole,
  hasPermission,
} from "./role";

//static data
const customerData = {
  name: "Rahul Sharma",
  cif: "CIF123456",
  phone: "9876543210",
  email: "rahul.sharma@email.com",
  address: "123, MG Road, Delhi - 110001",
  dob: "15 Mar 1990",
  fatherName: "Rajesh Sharma",
  idNumber: "A123456789",
  idType: "Aadhaar",
};

const accountsData = [
  {
    accountNo: "123456789012",
    productName: "Savings Account",
    accountType: "Primary",
    status: "Active",
    balance: "₹1,25,000.00",
  },
  {
    accountNo: "987654321098",
    productName: "Current Account",
    accountType: "Primary",
    status: "Active",
    balance: "₹2,85,400.00",
  },
  {
    accountNo: "112233445566",
    productName: "Fixed Deposit",
    accountType: "Term Deposit",
    status: "Active",
    balance: "₹5,00,000.00",
  },
  {
    accountNo: "556677889900",
    productName: "Credit Card",
    accountType: "Credit",
    status: "Active",
    balance: "₹75,000.00",
  },
];

const servicesData = [
  {
    id: 1,
    title: "Account Services",
    icon: "▣",
  },
  {
    id: 2,
    title: "Loan Services",
    icon: "◇",
  },
  {
    id: 3,
    title: "Card Services",
    icon: "▤",
  },
  {
    id: 4,
    title: "General Banking",
    icon: "♙",
  },
  {
    id: 5,
    title: "Wealth Services",
    icon: "♢",
  },
  {
    id: 6,
    title: "Other Services",
    icon: "⌂",
  },
];

const initialPurposes = [
  "Savings Account Opening",
  "KYC Update",
  "Loan Application",
  "Debit Card Issue",
];

const sessionData = {
  reference: "REF123459",
  sessionType: "Instant Session",
  operator: "John Operator",
  branch: "Head Office",
  validity: "30 Minutes",
  sessionLink:
    "https://kyc.Kamanabank.com/session/abf0c034ef56",
};

//sidebar menu items with permissions

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "/dashboard.png",
    route: "/dashboard",
    permission: PERMISSIONS.DASHBOARD,
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: "/appointment.png",
    route: "/appointments",
    permission: PERMISSIONS.APPOINTMENTS,
  },
  {
    id: "instant",
    label: "Instant Session",
    icon: "/instant-session.png",
    route: "/instant-session",
    permission: PERMISSIONS.INSTANT_SESSION,
  },
  {
    id: "customers",
    label: "Customers",
    icon: "/customer.png",
    route: "/workflow",
    permission: PERMISSIONS.CUSTOMERS,
  },
  {
    id: "sessions",
    label: "Sessions",
    icon: "/session.png",
    route: "/session",
    permission: PERMISSIONS.SESSIONS,
  },
  {
    id: "reports",
    label: "Reports",
    icon: "/report.png",
    route: "/report",
    permission: PERMISSIONS.REPORTS,
  },
  {
    id: "administration",
    label: "Administration",
    icon: "/administration.png",
    route: "/administration",
    permission: PERMISSIONS.ADMINISTRATION,
  },
];

/* MAIN COMPONENT */
export default function OperatorCustomerFlow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const instantMode = searchParams.get("mode") === "instant";
  const currentRole = getCurrentRole();

  const visibleMenuItems = menuItems.filter((item) =>
    hasPermission(currentRole, item.permission)
  );
  const [screen, setScreen] = useState("search");
  const [selectedServices, setSelectedServices] = useState([
    1, 2, 4,
  ]);
  const [selectedPurposes, setSelectedPurposes] =
    useState(initialPurposes);
  const [email, setEmail] = useState(customerData.email);
  const [emailSentCount, setEmailSentCount] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(272);

  /*TIMER */
  useEffect(() => {
    if (screen !== "waiting") return;

    const timer = setInterval(() => {
      setTimeRemaining((previous) => {
        if (previous <= 0) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      sec
    ).padStart(2, "0")}`;
  };

  /* SERVICES */
  const toggleService = (id) => {
    setSelectedServices((current) =>
      current.includes(id)
        ? current.filter((service) => service !== id)
        : [...current, id]
    );
  };

  const removePurpose = (purpose) => {
    setSelectedPurposes((current) =>
      current.filter((item) => item !== purpose)
    );
  };

  /* SESSION ACTIONS */
  const sendLink = () => {
    setScreen("sendLink");
  };

  const resendLink = () => {
    setEmailSentCount((count) => count + 1);
    setTimeRemaining(1800);
  };

  const cancelSession = () => {
    setTimeRemaining(272);
    setEmailSentCount(1);
    setScreen("search");
  };

  const activeSidebar = instantMode
    ? "instant"
    : screen === "search" || screen === "profile"
      ? "customers"
      : "instant";

  /* APP NAVIGATION */
  const handleMenuClick = (item) => {
    if (item.id === "customers") {
      navigate("/workflow");
      return;
    }

    navigate(item.route);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleBrandClick = () => {
    navigate("/dashboard");
  };

  /* CUSTOMER AVATAR */
  const CustomerAvatar = ({ large = false }) => (
    <div className={`customer-avatar ${large ? "avatar-large" : ""}`}>
      RS
    </div>
  );

  /* INFO ROW */
  const InfoRow = ({ label, value }) => (
    <div className="info-row">
      <span>{label}</span>

      <div className="info-value">
        <span className="colon">:</span>
        <strong>{value}</strong>
      </div>
    </div>
  );

  /* STEP INDICATOR */
  const SessionSteps = ({ current }) => {
    const steps = ["Summary", "Send Link", "Confirmation"];

    return (
      <div className="session-steps">
        {steps.map((step, index) => {
          const number = index + 1;

          return (
            <React.Fragment key={step}>
              <div
                className={`flow-step ${
                  current === number ? "active" : ""
                } ${current > number ? "completed" : ""}`}
              >
                <div className="flow-step-number">
                  {number}
                </div>

                <span>{step}</span>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`flow-line ${
                    current > number ? "completed" : ""
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  /*  SEARCH PAGE */

  const CustomerSearch = () => (
    <>
      <PageHeading
        title="Customer Search"
        subtitle="Search and select an existing customer"
      />

      <div className="content-card search-main-card">
        <div className="customer-type-tabs">
          <button className="customer-type active">
            Existing Customer
          </button>

          <button className="customer-type">
            New Customer
          </button>
        </div>

        <div className="section-block">
          <h3>Search Criteria</h3>

          <div className="search-form-grid">
            <div className="form-field">
              <label>Search By</label>

              <select>
                <option>Client Code / CIF</option>
                <option>Mobile Number</option>
                <option>Email Address</option>
              </select>
            </div>

            <div className="form-field">
              <label>Client Code / CIF</label>

              <div className="search-input-row">
                <input defaultValue={customerData.cif} />

                <button className="primary-btn">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="search-results-section">
          <h3>Search Results</h3>

          <button
            className="customer-result-card"
            onClick={() => setScreen("profile")}
          >
            <div className="customer-result-main">
              <CustomerAvatar />

              <div className="customer-result-details">
                <strong>{customerData.name}</strong>

                <span>{customerData.cif}</span>

                <span>{customerData.phone}</span>

                <span>{customerData.email}</span>
              </div>
            </div>

            <div className="customer-extra">
              <InfoRow
                label="Father's Name"
                value={customerData.fatherName}
              />

              <InfoRow
                label="Date of Birth"
                value={customerData.dob}
              />
            </div>
          </button>

          <div className="search-result-footer">
            <span>Showing 1 to 1 of 1 results</span>

            <div className="pagination">
              <button>‹</button>

              <button className="active-page">1</button>

              <button>›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  /* PROFILE PAGE*/

  const CustomerProfile = () => (
    <>
      <PageHeading
        title="Customer Profile"
        subtitle="View customer information and linked accounts"
        action={
          <button className="primary-btn small-btn">
            Edit
          </button>
        }
      />

      <div className="profile-top-grid">
        <div className="content-card profile-summary-card">
          <CustomerAvatar large />

          <div className="profile-main-info">
            <h2>{customerData.name}</h2>

            <span>{customerData.cif}</span>
            <span>{customerData.phone}</span>
            <span>{customerData.email}</span>
            <span>{customerData.address}</span>
          </div>
        </div>

        <div className="content-card personal-info-card">
          <h3>Personal Information</h3>

          <InfoRow
            label="Date of Birth"
            value={customerData.dob}
          />

          <InfoRow
            label="Father's Name"
            value={customerData.fatherName}
          />

          <InfoRow
            label="ID Number"
            value={customerData.idNumber}
          />

          <InfoRow
            label="ID Type"
            value={customerData.idType}
          />
        </div>
      </div>

      <div className="content-card accounts-section">
        <div className="account-tabs">
          <button className="active-tab">
            Linked Accounts
          </button>

          <button>KYC Information</button>

          <button>Recent Sessions</button>

          <button>Documents</button>
        </div>

        <div className="account-table-wrapper">
          <table className="account-table">
            <thead>
              <tr>
                <th>Account No.</th>
                <th>Product Name</th>
                <th>Account Type</th>
                <th>Status</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              {accountsData.map((account) => (
                <tr key={account.accountNo}>
                  <td>{account.accountNo}</td>
                  <td>{account.productName}</td>
                  <td>{account.accountType}</td>

                  <td>
                    <span className="active-status">
                      {account.status}
                    </span>
                  </td>

                  <td>{account.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="accounts-footer">
          <button>View All Accounts</button>
        </div>
      </div>

      <div className="page-actions right">
        <button
          className="primary-btn"
          onClick={() => setScreen("services")}
        >
          Start Session
        </button>
      </div>
    </>
  );

  /* SERVICE SELECTION */

  const ServiceSelection = () => (
    <>
      <PageHeading
        title="Service Category Selection"
        subtitle="Choose the services required for this session"
      />

      <div className="content-card service-content-card">
        <div className="service-progress">
          <div className="service-progress-step active">
            <span>1</span>
            <strong>Services</strong>
          </div>

          <div className="service-progress-line" />

          <div className="service-progress-step">
            <span>2</span>
            <strong>Session Summary</strong>
          </div>

          <div className="service-progress-line" />

          <div className="service-progress-step">
            <span>3</span>
            <strong>Send Link</strong>
          </div>
        </div>

        <div className="service-title">
          <h2>Select Service Categories & Purposes</h2>

          <p>
            Choose one or more services for this session
          </p>
        </div>

        <h3 className="small-section-title">
          Service Categories
        </h3>

        <div className="services-grid">
          {servicesData.map((service) => {
            const selected = selectedServices.includes(
              service.id
            );

            return (
              <button
                key={service.id}
                className={`service-card ${
                  selected ? "selected" : ""
                }`}
                onClick={() => toggleService(service.id)}
              >
                <div className="service-card-top">
                  <div className="service-icon">
                    {service.icon}
                  </div>

                  {selected && (
                    <span className="service-close">
                      ×
                    </span>
                  )}
                </div>

                <strong>{service.title}</strong>

                <small>
                  {selected ? "1 selected" : "0 selected"}
                </small>
              </button>
            );
          })}
        </div>

        <h3 className="small-section-title purpose-title">
          Selected Purposes ({selectedPurposes.length})
        </h3>

        <div className="purpose-tags">
          {selectedPurposes.map((purpose) => (
            <div className="purpose-tag" key={purpose}>
              <span>{purpose}</span>

              <button
                onClick={() => removePurpose(purpose)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <label className="other-purpose">
          <input type="checkbox" />

          <span>Other (Please specify)</span>
        </label>

        <input
          className="full-input"
          placeholder="Enter other purpose"
        />

        <div className="page-actions right">
          <button
            className="secondary-btn"
            onClick={() => setScreen("profile")}
          >
            Back
          </button>

          <button
            className="primary-btn"
            onClick={() => setScreen("summary")}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );

  /* SUMMARY */
  const SessionSummary = () => (
    <>
      <PageHeading
        title="Session Summary"
        subtitle="Review session information before sending the link"
      />

      <div className="content-card session-content">
        <SessionSteps current={1} />

        <div className="summary-grid">
          <div className="summary-box">
            <h3>Customer Details</h3>

            <div className="summary-customer">
              <CustomerAvatar />

              <div>
                <strong>{customerData.name}</strong>
                <span>{customerData.cif}</span>
                <span>{customerData.phone}</span>
                <span>{customerData.email}</span>
                <span>Head Office</span>
              </div>
            </div>
          </div>

          <div className="summary-box">
            <h3>Session Details</h3>

            <InfoRow
              label="Session Type"
              value={sessionData.sessionType}
            />

            <InfoRow
              label="Selected Services"
              value={selectedPurposes.length}
            />

            <InfoRow
              label="Operator"
              value={sessionData.operator}
            />

            <InfoRow
              label="Branch"
              value={sessionData.branch}
            />

            <InfoRow
              label="Link Validity"
              value={sessionData.validity}
            />

            <InfoRow
              label="Session Reference"
              value={sessionData.reference}
            />
          </div>
        </div>

        <div className="information-message">
          <span>ⓘ</span>

          <p>
            Please review the details before sending the
            link to customer.
          </p>
        </div>

        <div className="page-actions split">
          <button
            className="secondary-btn"
            onClick={() => setScreen("services")}
          >
            Edit Details
          </button>

          <button
            className="primary-btn"
            onClick={sendLink}
          >
            Send Link
          </button>
        </div>
      </div>
    </>
  );

  /* SEND EMAIL*/
  const SendEmailLink = () => (
    <>
      <PageHeading
        title="Send Email Link"
        subtitle="Send the secure Video KYC session link to the customer"
      />

      <div className="content-card session-content narrow-content">
        <SessionSteps current={2} />

        <div className="summary-grid">
          <div className="summary-box compact-summary">
            <h3>Customer Details</h3>

            <div className="summary-customer">
              <CustomerAvatar />

              <div>
                <strong>{customerData.name}</strong>
                <span>{customerData.cif}</span>
                <span>{customerData.phone}</span>
                <span>{customerData.email}</span>
              </div>
            </div>
          </div>

          <div className="summary-box compact-summary">
            <h3>Session Details</h3>

            <InfoRow
              label="Reference No."
              value={sessionData.reference}
            />

            <InfoRow
              label="Session Type"
              value={sessionData.sessionType}
            />

            <InfoRow
              label="Selected Services"
              value={selectedPurposes.length}
            />

            <InfoRow
              label="Link Validity"
              value={sessionData.validity}
            />
          </div>
        </div>

        <div className="form-field customer-email-field">
          <label>
            Customer Email <span className="required">*</span>
          </label>

          <div className="validated-input">
            <input
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <span>Valid Email</span>
          </div>
        </div>

        <div className="email-status-grid">
          <div className="email-status-card">
            <h3>Email Status</h3>

            <div className="delivery-status">
              <div className="check-circle">✓</div>

              <strong>Delivered</strong>

              <span>10:19:22 AM</span>
            </div>
          </div>

          <div className="email-status-card">
            <h3>Email Sent Count</h3>

            <strong className="sent-count">
              {emailSentCount}
            </strong>

            <p>Total emails sent for this session</p>
          </div>
        </div>

        <div className="session-link-area">
          <label>Session Link</label>

          <div className="session-link-box">
            <span className="link-symbol">⌂</span>

            <span className="actual-link">
              {sessionData.sessionLink}
            </span>

            <button
              onClick={() =>
                navigator.clipboard?.writeText(
                  sessionData.sessionLink
                )
              }
            >
              Copy Link
            </button>
          </div>

          <div className="link-expiry">
            <span>●</span>
            Link expires in 29:45 minutes
          </div>
        </div>

        <div className="triple-actions">
          <button
            className="secondary-btn"
            onClick={() => setScreen("summary")}
          >
            Back
          </button>

          <button
            className="primary-btn"
            onClick={resendLink}
          >
            Resend Link
          </button>

          <button
            className="danger-btn"
            onClick={cancelSession}
          >
            Cancel Session
          </button>
        </div>

        <button
          className="continue-button"
          onClick={() => setScreen("waiting")}
        >
          Continue to Waiting Room →
        </button>
      </div>
    </>
  );

  /* WAITING ROOM */

  const WaitingRoom = () => (
    <>
      <PageHeading
        title="Waiting Room (Operator)"
        subtitle="Monitor the customer while waiting for them to join"
      />

      <div className="content-card waiting-room-card">
        <div className="waiting-hero">
          <h2>Waiting for Customer to Join</h2>

          <p>
            The session link has been sent to the customer.
          </p>

          <div className="timer-circle">
            <div className="timer-circle-inner">
              <strong>
                {formatTime(timeRemaining)}
              </strong>

              <span>Time Remaining</span>

              <small>Link expires in</small>
            </div>
          </div>
        </div>

        <div className="waiting-details">
          <div className="waiting-customer">
            <CustomerAvatar />

            <div>
              <strong>{customerData.name}</strong>
              <span>{customerData.cif}</span>
              <span>{customerData.phone}</span>
            </div>
          </div>

          <div className="waiting-divider" />

          <div className="waiting-session-info">
            <InfoRow
              label="Reference No."
              value={sessionData.reference}
            />

            <InfoRow
              label="Session Type"
              value={sessionData.sessionType}
            />

            <InfoRow
              label="Link Validity"
              value={sessionData.validity}
            />

            <div className="info-row">
              <span>Email Status</span>

              <div className="info-value">
                <span className="colon">:</span>

                <strong className="delivered">
                  ● Delivered
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="waiting-stat-grid">
          <div className="waiting-small-card">
            <h3>Email Sent Count</h3>

            <strong>{emailSentCount}</strong>

            <p>Total emails sent for this session</p>
          </div>

          <div className="waiting-small-card">
            <h3>Customer Status</h3>

            <div className="customer-waiting-status">
              Waiting to join...

              <span>•••</span>
            </div>
          </div>
        </div>

        <div className="waiting-actions">
          <button
            className="outline-blue-btn"
            onClick={resendLink}
          >
            ↻ Resend Link
          </button>

          <button className="outline-blue-btn">
            ⟳ Refresh Status
          </button>

          <button
            className="outline-danger-btn"
            onClick={cancelSession}
          >
            ⊗ Cancel Session
          </button>
        </div>
      </div>
    </>
  );

  /* PAGE SELECTOR */
  const renderPage = () => {
    switch (screen) {
      case "search":
        return <CustomerSearch />;

      case "profile":
        return <CustomerProfile />;

      case "services":
        return <ServiceSelection />;

      case "summary":
        return <SessionSummary />;

      case "sendLink":
        return <SendEmailLink />;

      case "waiting":
        return <WaitingRoom />;

      default:
        return <CustomerSearch />;
    }
  };

  return (
    <div className="operator-app">
      {/* SIDEBAR */}
      <aside className="operator-sidebar">
        <div className="operator-sidebar-top">
          <button
            type="button"
            className="operator-brand"
            onClick={handleBrandClick}
          >
            <img
              src="/logo2.png"
              alt="Video KYC"
            />

            <span>Video KYC</span>
          </button>

          <div className="operator-role-badge">
            Signed in as <strong>{currentRole}</strong>
          </div>

          <nav className="operator-navigation">
            {visibleMenuItems.map((item) => {
              const isActive = activeSidebar === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`operator-nav-item ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(item)}
                >
                  <span className="operator-nav-icon">
                    <img
                      src={item.icon}
                      alt={`${item.label} icon`}
                    />
                  </span>

                  <span className="operator-nav-label">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <button
          type="button"
          className="operator-logout"
          onClick={handleLogout}
        >
          <span className="operator-logout-icon">
            ◉
          </span>

          <span>Logout</span>
        </button>
      </aside>
      <div className="operator-right">
        <main className="operator-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

/* PAGE HEADING */
function PageHeading({ title, subtitle, action }) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>

        {subtitle && <p>{subtitle}</p>}
      </div>

      {action && (
        <div className="page-heading-action">
          {action}
        </div>
      )}
    </div>
  );
}