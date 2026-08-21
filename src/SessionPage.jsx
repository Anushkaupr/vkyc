import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SessionPage.css";

// Role-based access control helpers used to decide
import {
  PERMISSIONS,
  getCurrentRole,
  hasPermission,
} from "./role";

// Sidebar menu configuration.
const menuItems = [
  {
    name: "Dashboard",
    icon: "/dashboard.png",
    route: "/dashboard",
    permission: PERMISSIONS.DASHBOARD,
  },
  {
    name: "Appointments",
    icon: "/appointment.png",
    route: "/appointments",
    permission: PERMISSIONS.APPOINTMENTS,
  },
  {
    name: "Instant Session",
    icon: "/instant-session.png",
    route: "/instant-session",
    permission: PERMISSIONS.INSTANT_SESSION,
  },
  {
    name: "Customers",
    icon: "/customer.png",
    route: "/workflow",
    permission: PERMISSIONS.CUSTOMERS,
  },
  {
    name: "Sessions",
    icon: "/session.png",
    route: "/session",
    permission: PERMISSIONS.SESSIONS,
  },
  {
    name: "Reports",
    icon: "/report.png",
    route: "/report",
    permission: PERMISSIONS.REPORTS,
  },
  {
    name: "Administration",
    icon: "/administration.png",
    route: "/administration",
    permission: PERMISSIONS.ADMINISTRATION,
  },
];

// Mock session-history data used to populate
const sessions = [
  {
    reference: "REF12345678",
    customer: "Rahul Sharma",
    purpose: "Account Opening",
    date: "08 May 2024",
    status: "Completed",
    operator: "John Operator",
  },
  {
    reference: "REF12345677",
    customer: "Priya Singh",
    purpose: "Loan Application",
    date: "08 May 2024",
    status: "Completed",
    operator: "John Operator",
  },
  {
    reference: "REF12345676",
    customer: "Amit Kumar",
    purpose: "KYC Update",
    date: "07 May 2024",
    status: "Completed",
    operator: "John Operator",
  },
  {
    reference: "REF12345675",
    customer: "Neha Gupta",
    purpose: "Account Opening",
    date: "07 May 2024",
    status: "Cancelled",
    operator: "John Operator",
  },
  {
    reference: "REF12345674",
    customer: "Vikram Patel",
    purpose: "Loan Application",
    date: "06 May 2024",
    status: "Completed",
    operator: "John Operator",
  },
  {
    reference: "REF12345673",
    customer: "Sita Devi",
    purpose: "KYC Update",
    date: "06 May 2024",
    status: "Completed",
    operator: "John Operator",
  },
  {
    reference: "REF12345672",
    customer: "Rohan Verma",
    purpose: "Account Opening",
    date: "05 May 2024",
    status: "Completed",
    operator: "John Operator",
  },
];

// Documents uploaded by the customer during the KYC session.
const documents = [
  {
    name: "Aadhaar Card Front",
    type: "Identity Proof",
    uploadedBy: "Customer",
    date: "08 May 2024 10:15 AM",
    status: "Uploaded",
  },
  {
    name: "PAN Card",
    type: "Identity Proof",
    uploadedBy: "Customer",
    date: "08 May 2024 10:18 AM",
    status: "Uploaded",
  },
  {
    name: "Address Proof",
    type: "Address Proof",
    uploadedBy: "Customer",
    date: "08 May 2024 10:21 AM",
    status: "Pending Review",
  },
];

// Documents uploaded by the operator during the KYC session.
const operatorDocuments = [
  {
    name: "Account Opening Form",
    type: "Form",
    uploadedBy: "Operator",
    date: "08 May 2024 10:25 AM",
    status: "Accepted",
  },
];

// Snapshot labels displayed in the snapshot gallery.
const snapshots = [
  "Aadhaar Front",
  "Aadhaar Back",
  "PAN Card",
  "Selfie",
  "Profile Left",
  "Profile Right",
  "Live Photo",
  "Address Proof",
  "Signature",
  "Holding Document",
  "Additional Doc",
  "Final Photo",
];

// Predefined instructions that the operator
// can send to the customer.
const instructions = [
  "Please show your Aadhaar card",
  "Please show your PAN card",
  "Please show your address proof",
  "Please look at the camera",
  "Please remove your glasses",
  "Please turn left",
  "Please turn right",
];

export default function SessionPage() {
  const navigate = useNavigate();
  const currentRole = getCurrentRole();
  const visibleMenuItems = menuItems.filter((item) =>
    hasPermission(currentRole, item.permission)
  );

  const [screen, setScreen] = useState("history");
  const [search, setSearch] = useState("");
  const [selectedSession, setSelectedSession] =
    useState(sessions[0]);
  const [documentTab, setDocumentTab] =
    useState("customer");
  const [notes, setNotes] = useState(
    "Customer is cooperative and provided documents clearly."
  );
  const [savedNotes, setSavedNotes] = useState([
    {
      author: "John Operator",
      text:
        "Customer is cooperative and provided documents clearly.",
      time: "08 May 2024, 10:25 AM",
    },
    {
      author: "John Operator",
      text: "Session started. Verified identity.",
      time: "08 May 2024, 10:18 AM",
    },
    {
      author: "System",
      text: "Session link sent to customer.",
      time: "08 May 2024, 10:00 AM",
    },
  ]);

  // Recalculate the displayed session list
  const filteredSessions = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return sessions;
    return sessions.filter((session) =>
      [
        session.reference,
        session.customer,
        session.purpose,
        session.date,
        session.status,
        session.operator,
      ].some((value) =>
        value.toLowerCase().includes(term)
      )
    );
  }, [search]);

  // Handles clicks on sidebar menu items
  const handleMenuClick = (item) => {
    if (item.name === "Sessions") {
      setScreen("history");
      return;
    }
    navigate(item.route);
  };

  const handleBrandClick = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  // Opens the selected session
  const openSession = (session) => {
    setSelectedSession(session);
    setScreen("dashboard");
  };

  const saveNote = () => {
    const cleanNote = notes.trim();
    if (!cleanNote) return;
    setSavedNotes((current) => [
      {
        author: "John Operator",
        text: cleanNote,
        time: "08 May 2024, 10:30 AM",
      },
      ...current,
    ]);
  };

  // SIDEBAR
  const Sidebar = () => (
    <aside className="session-sidebar">
      <div className="session-sidebar-top">

        {/* Brand / logo button */}
        <button
          type="button"
          className="session-brand"
          onClick={handleBrandClick}
        >
          <img
            src="/logo2.png"
            alt="Video KYC"
          />

          <span>Video KYC</span>
        </button>

        <div className="session-role-badge">
          Signed in as{" "}
          <strong>{currentRole}</strong>
        </div>

        <nav className="session-menu">
          {visibleMenuItems.map((item) => {
           
           // Sessions is the active page
            const active =
              item.name === "Sessions";

            return (
              <button
                key={item.name}
                type="button"
                className={
                  active
                    ? "session-menu-item active"
                    : "session-menu-item"
                }
                onClick={() =>
                  handleMenuClick(item)
                }
              >
                <span className="session-menu-icon">
                  <img
                    src={item.icon}
                    alt={`${item.name} icon`}
                  />
                </span>

                <span className="session-menu-label">
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <button
        type="button"
        className="session-logout"
        onClick={handleLogout}
      >
        <span className="session-logout-icon">
          ◉
        </span>

        <span>Logout</span>
      </button>
    </aside>
  );

  // REUSABLE COMPONENTS
  const BackButton = ({
    target = "dashboard",
    text = "Back",
  }) => (
    <button
      type="button"
      className="session-back-link"
      onClick={() => setScreen(target)}
    >
      ← {text}
    </button>
  );

  const CustomerAvatar = ({
    size = "medium",
  }) => (
    <div
      className={`session-customer-avatar ${size}`}
    >
      RS
    </div>
  );

  // SESSION HISTORY VIEW
  const HistoryView = () => (
    <div className="session-content">
      <div className="session-page-title">
        <h1>Session History</h1>
      </div>

      <section className="session-history-card">

        <div className="session-history-toolbar">
          <div className="session-search-box">
            <span>⌕</span>

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by Customer, Reference No."
            />
          </div>

          <button
            type="button"
            className="session-filter-button"
          >
            Filters
          </button>
        </div>

        {/* Session History table */}
        <div className="session-table-wrapper">
          <table className="session-history-table">
            <thead>
              <tr>
                <th>Reference No.</th>
                <th>Customer</th>
                <th>Purpose</th>
                <th>Date</th>
                <th>Status</th>
                <th>Operator</th>
              </tr>
            </thead>

            <tbody>
              {filteredSessions.map(
                (session) => (
                  <tr key={session.reference}>
                    <td>
                      <button
                        type="button"
                        className="session-reference-button"
                        onClick={() =>
                          openSession(session)
                        }
                      >
                        {session.reference}
                      </button>
                    </td>

                    <td>{session.customer}</td>

                    <td>{session.purpose}</td>

                    <td>{session.date}</td>
                    <td>
                      <span
                        className={
                          session.status ===
                          "Completed"
                            ? "session-status completed"
                            : "session-status cancelled"
                        }
                      >
                        {session.status}
                      </span>
                    </td>

                    <td>{session.operator}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination area */}
        <div className="session-history-footer">
          <span>
            Showing 1 to{" "}
            {filteredSessions.length} of 24
            entries
          </span>

          <div className="session-pagination">
            <button type="button">‹</button>

            <button
              type="button"
              className="active"
            >
              1
            </button>

            <button type="button">2</button>

            <button type="button">3</button>

            <button type="button">4</button>

            <button type="button">›</button>
          </div>
        </div>
      </section>
    </div>
  );

  // SESSION DASHBOARD
  const DashboardView = () => (
    <div className="session-content">

      {/* Session identifier and live status */}
      <div className="session-dashboard-heading">
        <div>
          <h1>
            Session ID:{" "}
            {selectedSession.reference}
          </h1>

          <div className="session-live-row">
            <span className="session-live-pill">
              ● Live
            </span>

            <span>00:18:42</span>

            <span className="session-recording-dot">
              ● Recording
            </span>
          </div>
        </div>
      </div>

      <div className="session-video-layout">
        <aside className="session-detail-column">
          <section className="session-panel">
            <h3>Customer Details</h3>

            <div className="session-customer-summary">
              <CustomerAvatar />

              <div>
                <strong>
                  {selectedSession.customer}
                </strong>

                <span>CIF123456</span>

                <span>9876543210</span>

                <span>
                  rahul.sharma@email.com
                </span>

                <span>
                  Mumbai, Maharashtra
                </span>
              </div>
            </div>
          </section>

          {/* Session information */}
          <section className="session-panel">
            <h3>Session Details</h3>

            <div className="session-info-list">
              <div>
                <span>Session Type</span>
                <strong>
                  Instant Session
                </strong>
              </div>

              <div>
                <span>Purpose</span>
                <strong>
                  {selectedSession.purpose}
                </strong>
              </div>

              <div>
                <span>Operator</span>
                <strong>
                  John Operator
                </strong>
              </div>

              <div>
                <span>Link Validity</span>
                <strong>
                  30 Minutes
                </strong>
              </div>

              <div>
                <span>Reference No.</span>
                <strong>
                  {selectedSession.reference}
                </strong>
              </div>
            </div>
          </section>
        </aside>

        <section className="session-video-area">
          <div className="session-video-stage">
            <div className="session-video-placeholder">
              <div className="session-video-person">
                <CustomerAvatar
                  size="large"
                />

                <strong>
                  {selectedSession.customer}
                </strong>
              </div>
              <div className="session-mini-video">
                JO
              </div>
            </div>

            <div className="session-video-controls">
              <button type="button">
                Mic
              </button>

              <button type="button">
                Stop Video
              </button>

              <button type="button">
                AutoFocus
              </button>

              <button type="button">
                Share Screen
              </button>

              <button type="button">
                Snapshot
              </button>

              <button
                type="button"
                className="danger"
              >
                End Call
              </button>
            </div>
          </div>

          {/* Session feature tabs */}
          <div className="session-tabs-card">
            <button
              type="button"
              className="active"
              onClick={() =>
                setScreen("documents")
              }
            >
              Documents (3)
            </button>

            <button
              type="button"
              onClick={() =>
                setScreen("snapshots")
              }
            >
              Snapshots (12)
            </button>

            <button
              type="button"
              onClick={() =>
                setScreen("instructions")
              }
            >
              Instructions
            </button>

            <button
              type="button"
              onClick={() =>
                setScreen("notes")
              }
            >
              Notes
            </button>

            <button
              type="button"
              onClick={() =>
                setScreen("consent")
              }
            >
              Policy Check
            </button>
          </div>

          <div className="session-document-mini-table">
            <div className="session-mini-row session-mini-head">
              <span>Document Name</span>
              <span>Type</span>
              <span>Uploaded By</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {documents.map((document) => (
              <div
                className="session-mini-row"
                key={document.name}
              >
                <span>{document.name}</span>

                <span>{document.type}</span>

                <span>
                  {document.uploadedBy}
                </span>

                <span>
                  {document.status}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setScreen(
                      "documentPreview"
                    )
                  }
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="session-action-column">
          {/* Session timer */}
          <section className="session-panel session-timer-panel">
            <h3>Session Timer</h3>

            <strong>00:18:42</strong>

            <span>Time Remaining</span>

            <small>11:41</small>
          </section>

          <section className="session-panel">
            <h3>Quick Actions</h3>

            <div className="session-quick-actions">
              <button
                type="button"
                onClick={() =>
                  setScreen("instructions")
                }
              >
                Send Instruction
              </button>

              <button
                type="button"
                onClick={() =>
                  setScreen("documents")
                }
              >
                Request Document
              </button>

              <button
                type="button"
                onClick={() =>
                  setScreen("snapshots")
                }
              >
                Capture Snapshot
              </button>

              <button
                type="button"
                className="danger-outline"
                onClick={() =>
                  setScreen("completion")
                }
              >
                End Session
              </button>
            </div>
          </section>

          {/* Connection status */}
          <section className="session-panel">
            <h3>Connection</h3>

            <div className="session-connection-row">
              <span>Customer</span>
              <strong>● Good</strong>
            </div>

            <div className="session-connection-row">
              <span>Network</span>
              <strong>● Good</strong>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );

  // DOCUMENT MANAGEMENT
  const DocumentsView = () => (
    <div className="session-content">
      <div className="session-page-title">
        <h1>Document Management</h1>
      </div>

      <section className="session-card">
        <div className="session-tab-row">
          <button
            type="button"
            className={
              documentTab === "customer"
                ? "active"
                : ""
            }
            onClick={() =>
              setDocumentTab("customer")
            }
          >
            Customer Documents (3)
          </button>

          <button
            type="button"
            className={
              documentTab === "operator"
                ? "active"
                : ""
            }
            onClick={() =>
              setDocumentTab("operator")
            }
          >
            Operator Documents (1)
          </button>
        </div>

        {/* Documents table */}
        <div className="session-table-wrapper">
          <table className="session-history-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Type</th>
                <th>Uploaded By</th>
                <th>Uploaded On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {(documentTab === "customer"
                ? documents
                : operatorDocuments
              ).map((document) => (
                <tr key={document.name}>
                  <td>{document.name}</td>

                  <td>{document.type}</td>

                  <td>
                    {document.uploadedBy}
                  </td>

                  <td>{document.date}</td>

                  <td>
                    <span
                      className={
                        document.status ===
                        "Pending Review"
                          ? "session-doc-status pending"
                          : "session-doc-status uploaded"
                      }
                    >
                      {document.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="session-table-action"
                      onClick={() =>
                        setScreen(
                          "documentPreview"
                        )
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="session-upload-card">
          <h3>Upload Document</h3>

          <div className="session-upload-zone">
            <strong>
              Drag and drop files here
            </strong>

            <button type="button">
              Browse Files
            </button>

            <span>
              Supported formats: JPG, PNG,
              PDF (Max 10MB)
            </span>
          </div>
        </div>
      </section>
    </div>
  );

  // DOCUMENT PREVIEW
  const DocumentPreviewView = () => (
    <div className="session-content">
      <BackButton target="documents" />
      <div className="session-page-title compact">
        <h1>Document Preview</h1>
      </div>

      <div className="session-preview-layout">
        <section className="session-preview-card">
          <h3>Aadhaar Card Front</h3>

          <div className="session-preview-toolbar">
            <span>1 / 1</span>
            <span>100%</span>
            <span>↻</span>
            <span>⛶</span>
          </div>

          <div className="session-aadhaar-placeholder">
            <div className="session-aadhaar-top">
              <span>
                GOVERNMENT OF INDIA
              </span>

              <span>आधार</span>
            </div>

            <div className="session-aadhaar-body">
              <CustomerAvatar />

              <div>
                <strong>
                  Rahul Sharma
                </strong>

                <span>
                  DOB: 15/03/1990
                </span>

                <span>
                  Gender: Male
                </span>
              </div>
            </div>

            <strong className="session-aadhaar-number">
              1234 5678 9012
            </strong>
          </div>
        </section>

        {/* Document metadata */}
        <aside className="session-preview-details">
          <h3>Document Details</h3>

          <div className="session-info-list">
            <div>
              <span>Type</span>
              <strong>
                Identity Proof
              </strong>
            </div>

            <div>
              <span>Uploaded By</span>
              <strong>Customer</strong>
            </div>

            <div>
              <span>Uploaded On</span>
              <strong>
                08 May 2024 10:15 AM
              </strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="green-text">
                Uploaded
              </strong>
            </div>

            <div>
              <span>Remarks</span>
              <strong>-</strong>
            </div>
          </div>

          {/* Document actions */}
          <div className="session-preview-actions">
            <button
              type="button"
              className="accept"
            >
              Accept
            </button>

            <button
              type="button"
              className="reject"
            >
              Reject
            </button>

            <button type="button">
              Download
            </button>
          </div>
        </aside>
      </div>
    </div>
  );

  // SNAPSHOTS
  const SnapshotsView = () => (
    <div className="session-content">
      <div className="session-page-title inline">
        <div>
          <h1>Snapshot Gallery</h1>
          <p>Total Snapshots: 12</p>
        </div>

        <button
          type="button"
          className="session-primary-button"
        >
          Capture New Snapshot
        </button>
      </div>

      <section className="session-card">
        <div className="session-snapshot-grid">
          {snapshots.map(
            (snapshot, index) => (
              <button
                type="button"
                className="session-snapshot-card"
                key={snapshot}
                onClick={() =>
                  setScreen(
                    "snapshotViewer"
                  )
                }
              >
                <div className="session-snapshot-image">
                  {index % 3 === 0
                    ? "RS"
                    : index % 3 === 1
                    ? "DOC"
                    : "IMG"}
                </div>

                <strong>
                  08 May 2024, 10:
                  {15 + index} AM
                </strong>

                <span>{snapshot}</span>
              </button>
            )
          )}
        </div>
      </section>
    </div>
  );

  // INSTRUCTIONS
  const InstructionsView = () => (
    <div className="session-content">
      <div className="session-page-title">
        <h1>Instruction Panel</h1>
      </div>

      <div className="session-instruction-layout">
        <section className="session-card">

          <div className="session-tab-row">
            <button
              type="button"
              className="active"
            >
              Quick Templates
            </button>

            <button type="button">
              Custom Message
            </button>
          </div>

          <div className="session-instruction-list">
            {instructions.map(
              (instruction) => (
                <button
                  type="button"
                  key={instruction}
                >
                  <span>◉</span>

                  <div>
                    <strong>
                      {instruction}
                    </strong>

                    <small>
                      Request customer to{" "}
                      {instruction
                        .toLowerCase()
                        .replace(
                          "please ",
                          ""
                        )}
                      .
                    </small>
                  </div>
                </button>
              )
            )}
          </div>
        </section>

        {/* Message preview and history */}
        <aside className="session-card session-message-preview">
          <h3>Message Preview</h3>

          <div className="session-message-box">
            Please show your Aadhaar card
            clearly to the camera.
          </div>

          <button
            type="button"
            className="session-primary-button full"
          >
            Send Instruction
          </button>

          <h3 className="recent-title">
            Recent Instructions
          </h3>

          <div className="session-recent-list">
            <div>
              <span>10:18 AM</span>
              <strong>
                Please show your Aadhaar card
              </strong>
            </div>

            <div>
              <span>10:18 AM</span>
              <strong>
                Please look at the camera
              </strong>
            </div>

            <div>
              <span>10:20 AM</span>
              <strong>
                Please remove your glasses
              </strong>
            </div>

            <div>
              <span>10:23 AM</span>
              <strong>
                Please turn left
              </strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

  // SESSION NOTES
  const NotesView = () => (
    <div className="session-content">
      <div className="session-page-title">
        <h1>Session Notes</h1>
      </div>

      <section className="session-card session-notes-card">

        {/* Notes category tabs */}
        <div className="session-tab-row">
          <button
            type="button"
            className="active"
          >
            Operator Notes
          </button>

          <button type="button">
            Supervisor Notes
          </button>
        </div>

        <h3>Add Note</h3>
        <textarea
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          className="session-notes-textarea"
        />
        <div className="session-notes-action">
          <button
            type="button"
            className="session-primary-button"
            onClick={saveNote}
          >
            Save Note
          </button>
        </div>

        <h3>Notes History</h3>
        <div className="session-notes-history">
          {savedNotes.map(
            (note, index) => (
              <div
                key={`${note.author}-${index}`}
              >
                <div className="session-note-meta">
                  <strong>
                    {note.author}
                  </strong>

                  <span>{note.time}</span>
                </div>

                <p>{note.text}</p>
              </div>
            )
          )}
        </div>
        <label className="session-outcome-label">
          Session Outcome

          <select>
            <option>
              Select Outcome
            </option>

            <option>
              Completed
            </option>

            <option>
              Pending Review
            </option>

            <option>
              Rejected
            </option>
          </select>
        </label>
      </section>
    </div>
  );

  // SESSION COMPLETION
  const CompletionView = () => (
    <div className="session-content">
      <BackButton />
      <div className="session-page-title compact">
        <h1>
          Session Completion Summary
        </h1>
      </div>

      {/* Success notification */}
      <section className="session-completion-success">
        <div className="session-success-icon">
          ✓
        </div>

        <div>
          <h2>
            Session Completed Successfully
          </h2>

          <p>
            The Video KYC session has been
            completed and saved.
          </p>
        </div>
      </section>

      {/* Completion information */}
      <div className="session-completion-grid">

        {/* Basic session summary */}
        <section className="session-card padded">
          <h3>Summary</h3>

          <div className="session-info-list">
            <div>
              <span>Reference No.</span>
              <strong>
                {selectedSession.reference}
              </strong>
            </div>

            <div>
              <span>Session Type</span>
              <strong>
                Instant Session
              </strong>
            </div>

            <div>
              <span>Customer</span>
              <strong>
                {selectedSession.customer}
              </strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>
                00:24:18
              </strong>
            </div>

            <div>
              <span>Operator</span>
              <strong>
                John Operator
              </strong>
            </div>

            <div>
              <span>Completed On</span>
              <strong>
                08 May 2024, 10:35 AM
              </strong>
            </div>
          </div>
        </section>

        {/* Completion statistics */}
        <section className="session-card padded">
          <h3>Details</h3>

          <div className="session-detail-checks">
            <div>
              <span>Recording</span>
              <strong>Saved</strong>
            </div>

            <div>
              <span>Documents</span>
              <strong>4 / 4</strong>
            </div>

            <div>
              <span>Snapshots</span>
              <strong>12</strong>
            </div>

            <div>
              <span>Instructions</span>
              <strong>7</strong>
            </div>

            <div>
              <span>Notes</span>
              <strong>3</strong>
            </div>
          </div>
        </section>
      </div>

      {/* Actions available after completion */}
      <section className="session-card padded session-next-steps">
        <h3>Next Steps</h3>

        <p>
          You can view the session details,
          download the recording if authorized,
          and generate reports.
        </p>

        <div>
          <button
            type="button"
            className="session-primary-button"
            onClick={() =>
              setScreen("dashboard")
            }
          >
            View Session Details
          </button>

          <button
            type="button"
            className="session-secondary-button"
            onClick={() =>
              setScreen("playback")
            }
          >
            Download Recording
          </button>

          <button
            type="button"
            className="session-secondary-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Go to Dashboard
          </button>
        </div>
      </section>
    </div>
  );

  // VIDEO PLAYBACK
  const PlaybackView = () => (
    <div className="session-content">
      <div className="session-page-title">
        <h1>Video Playback</h1>
      </div>
      <BackButton
        text="Back to Session Details"
      />

      <div className="session-playback-layout">
        <section>
          <div className="session-playback-video">
            <div className="session-video-person">
              <CustomerAvatar
                size="large"
              />

              <strong>
                Rahul Sharma
              </strong>
            </div>

            <div className="session-playback-bar">
              ▶ 00:06:54 / 00:30:15
            </div>
          </div>

          {/* Recording session information */}
          <section className="session-card padded">
            <h3>
              Session Information
            </h3>

            <div className="session-playback-info-grid">
              <div>
                <span>Reference No.</span>
                <strong>
                  {selectedSession.reference}
                </strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  08 May 2024
                </strong>
              </div>

              <div>
                <span>Customer</span>
                <strong>
                  Rahul Sharma
                </strong>
              </div>

              <div>
                <span>Start Time</span>
                <strong>10:15 AM</strong>
              </div>

              <div>
                <span>Session Type</span>
                <strong>
                  Instant Session
                </strong>
              </div>

              <div>
                <span>End Time</span>
                <strong>10:45 AM</strong>
              </div>

              <div>
                <span>Operator</span>
                <strong>
                  John Operator
                </strong>
              </div>

              <div>
                <span>Duration</span>
                <strong>
                  00:30:15
                </strong>
              </div>
            </div>
          </section>
        </section>

        {/* Important recording events */}
        <aside className="session-card padded">
          <h3>Timeline</h3>

          <div className="session-timeline">
            {[
              "Session Started",
              "Customer Joined",
              "Document Shared",
              "Aadhaar Front Captured",
              "Aadhaar Back Captured",
              "PAN Card Captured",
              "Photo Captured",
              "Consent Accepted",
              "Session Completed",
            ].map((item, index) => (
              <div key={item}>
                <span>
                  {`10:${15 + index * 3}`}
                </span>

                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );

  // RECORDING DETAILS
  const RecordingView = () => (
    <div className="session-content">
      <BackButton
        text="Back to Session Details"
      />

      <div className="session-page-title inline compact">
        <h1>Recording Details</h1>

        <span className="session-completed-pill">
          Completed
        </span>
      </div>

      {/* Recording metadata */}
      <section className="session-card padded">
        <h3>
          Recording Information
        </h3>

        <div className="session-recording-grid">
          <div>
            <span>Reference No.</span>
            <strong>
              {selectedSession.reference}
            </strong>
          </div>

          <div>
            <span>End Time</span>
            <strong>
              08 May 2024, 10:45 AM
            </strong>
          </div>

          <div>
            <span>Session Type</span>
            <strong>
              Instant Session
            </strong>
          </div>

          <div>
            <span>Duration</span>
            <strong>
              00:30:15
            </strong>
          </div>

          <div>
            <span>Customer</span>
            <strong>
              Rahul Sharma
            </strong>
          </div>

          <div>
            <span>File Size</span>
            <strong>
              256.8 MB
            </strong>
          </div>

          <div>
            <span>Operator</span>
            <strong>
              John Operator
            </strong>
          </div>

          <div>
            <span>Format</span>
            <strong>MP4</strong>
          </div>

          <div>
            <span>Start Time</span>
            <strong>
              08 May 2024, 10:15 AM
            </strong>
          </div>

          <div>
            <span>Resolution</span>
            <strong>
              1920 × 1080
            </strong>
          </div>
        </div>
      </section>

      {/* Recording control buttons */}
      <section className="session-card padded session-recording-actions">
        <h3>Recording Actions</h3>

        <div>
          <button
            type="button"
            className="session-secondary-button"
            onClick={() =>
              setScreen("playback")
            }
          >
            ▶ Play Recording
          </button>

          <button
            type="button"
            className="session-secondary-button"
          >
            ↓ Download Recording
          </button>

          <button
            type="button"
            className="session-secondary-button"
          >
            Share Recording
          </button>
        </div>
      </section>

      {/* Technical system information */}
      <section className="session-card padded">
        <h3>System Information</h3>

        <div className="session-info-list">
          <div>
            <span>Captured On</span>
            <strong>
              Web Application (Chrome 124)
            </strong>
          </div>

          <div>
            <span>IP Address</span>
            <strong>
              192.168.1.106
            </strong>
          </div>

          <div>
            <span>Network</span>
            <strong>Good</strong>
          </div>

          <div>
            <span>Storage Location</span>
            <strong>
              AWS S3 - video/2024/05/08/
            </strong>
          </div>

          <div>
            <span>Retention Period</span>
            <strong>7 Years</strong>
          </div>
        </div>
      </section>
    </div>
  );

  // SNAPSHOT VIEWER
  const SnapshotViewerView = () => (
    <div className="session-content">
      <BackButton
        text="Back to Session Details"
      />

      <div className="session-page-title inline compact">
        <div>
          <h1>Snapshot Viewer</h1>
          <p>Total Snapshots: 12</p>
        </div>

        <button
          type="button"
          className="session-primary-button"
        >
          Download All
        </button>
      </div>

      <section className="session-card padded">
        <div className="session-snapshot-grid viewer">

          {/* Show the first nine snapshots */}
          {snapshots
            .slice(0, 9)
            .map((snapshot, index) => (
              <div
                className="session-snapshot-card static"
                key={snapshot}
              >
                <div className="session-snapshot-image">
                  {index % 3 === 0
                    ? "RS"
                    : index % 3 === 1
                    ? "DOC"
                    : "IMG"}
                </div>

                <strong>
                  {`10:${
                    15 + index * 2
                  }:20`}
                </strong>

                <span>
                  {snapshot}
                </span>
              </div>
            ))}
        </div>
      </section>
    </div>
  );

  // CONSENT 
  const ConsentView = () => (
    <div className="session-content">
      <BackButton
        text="Back to Session Details"
      />

      <div className="session-page-title inline compact">
        <h1>Consent Details</h1>

        <span className="session-completed-pill">
          Accepted
        </span>
      </div>

      {/* Consent metadata */}
      <section className="session-card padded session-consent-card">
        <h3>Consent Information</h3>

        <div className="session-info-list">
          <div>
            <span>Consent Type</span>
            <strong>
              Terms & Conditions
            </strong>
          </div>

          <div>
            <span>Version</span>
            <strong>v2.3</strong>
          </div>

          <div>
            <span>Accepted On</span>
            <strong>
              08 May 2024, 10:24 AM
            </strong>
          </div>

          <div>
            <span>Accepted By</span>
            <strong>
              Rahul Sharma
            </strong>
          </div>

          <div>
            <span>
              Accepted From IP
            </span>

            <strong>
              192.168.1.105
            </strong>
          </div>

          <div>
            <span>User Agent</span>

            <strong>
              Mozilla/5.0
              (Windows NT 10.0)
            </strong>
          </div>
        </div>
      </section>

      <section className="session-card padded session-consent-card">
        <h3>Consent Document</h3>

        <div className="session-consent-document">
          <div>
            <strong>
              Terms_and_Conditions_v2.3.pdf
            </strong>

            <span>256 KB</span>
          </div>

          <button
            type="button"
            className="session-secondary-button"
          >
            Download
          </button>
        </div>
      </section>

      {/* Consent wording */}
      <section className="session-card padded session-consent-card">
        <h3>Consent Text</h3>

        <div className="session-consent-text">
          <p>
            I hereby confirm that the
            information provided by me is
            true and correct to the best of
            my knowledge and belief.
          </p>

          <p>
            I authorize the bank to collect,
            use and share my personal data,
            documents and video/audio
            recording for the purpose of
            Video KYC, identity verification
            and to comply with legal and
            regulatory requirements.
          </p>

          <p>
            I understand that the video
            recording of this session may
            be stored and retained as per
            the bank's policy.
          </p>
        </div>
      </section>
    </div>
  );

  // SCREEN RENDERING
  const renderScreen = () => {
    switch (screen) {
      case "history":
        return <HistoryView />;
      case "dashboard":
        return <DashboardView />;
      case "documents":
        return <DocumentsView />;
      case "documentPreview":
        return <DocumentPreviewView />;
      case "snapshots":
        return <SnapshotsView />;
      case "instructions":
        return <InstructionsView />;
      case "notes":
        return <NotesView />;
      case "completion":
        return <CompletionView />;
      case "playback":
        return <PlaybackView />;
      case "recording":
        return <RecordingView />;

      case "snapshotViewer":
        return <SnapshotViewerView />;
      case "consent":
        return <ConsentView />
      default:
        return <HistoryView />;
    }
  };

  // MAIN PAGE
  return (
    <div className="session-page">
      <Sidebar />
      <main className="session-main">
        {renderScreen()}
      </main>
    </div>
  );
}