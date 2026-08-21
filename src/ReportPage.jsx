import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportPage.css";
import { PERMISSIONS, getCurrentRole, hasPermission } from "./role";

const menuItems = [
  { name: "Dashboard", icon: "/dashboard.png", route: "/dashboard", permission: PERMISSIONS.DASHBOARD },
  { name: "Appointments", icon: "/appointment.png", route: "/appointments", permission: PERMISSIONS.APPOINTMENTS },
  { name: "Instant Session", icon: "/instant-session.png", route: "/instant-session", permission: PERMISSIONS.INSTANT_SESSION },
  { name: "Customers", icon: "/customer.png", route: "/workflow", permission: PERMISSIONS.CUSTOMERS },
  { name: "Sessions", icon: "/session.png", route: "/session", permission: PERMISSIONS.SESSIONS },
  { name: "Reports", icon: "/report.png", route: "/report", permission: PERMISSIONS.REPORTS },
  { name: "Administration", icon: "/administration.png", route: "/administration", permission: PERMISSIONS.ADMINISTRATION },
];

const reportSections = [
  // Full pages based on the supplied report screenshots.
  { key: "analytics", name: "Analytics", permission: PERMISSIONS.REPORT_ANALYTICS, hasPage: true },
  { key: "sessions", name: "Session Reports", permission: PERMISSIONS.REPORT_SESSION_REPORTS, hasPage: true },
  { key: "operators", name: "Operator Performance", permission: PERMISSIONS.REPORT_OPERATOR_PERFORMANCE, hasPage: true },
  { key: "audit", name: "Audit Log", permission: PERMISSIONS.REPORT_AUDIT_LOG, hasPage: true },
  { key: "monitor", name: "Live Monitor", permission: PERMISSIONS.REPORT_LIVE_MONITOR, hasPage: true },
  { key: "ai", name: "AI Insights", permission: PERMISSIONS.REPORT_AI_INSIGHTS, hasPage: true },
  { key: "feedback", name: "Feedback", permission: PERMISSIONS.REPORT_FEEDBACK, hasPage: true },
  { key: "instructions", name: "Instruction Panel", permission: PERMISSIONS.REPORT_INSTRUCTION_PANEL, hasPage: true },
  { key: "completion", name: "Session Completion Summary", permission: PERMISSIONS.REPORT_SESSION_COMPLETION, hasPage: true },

  // Menu-only entries: no page was supplied, so no page is invented.
  { key: "device-analytics", name: "Device Analytics", permission: PERMISSIONS.REPORT_DEVICE_ANALYTICS, hasPage: false },
  { key: "audit-trail", name: "Audit Trail", permission: PERMISSIONS.REPORT_AUDIT_TRAIL, hasPage: false },
  { key: "usage", name: "Usage Analytics", permission: PERMISSIONS.REPORT_USAGE_ANALYTICS, hasPage: false },
  { key: "export", name: "Export", permission: PERMISSIONS.REPORT_EXPORT, hasPage: false },
];

const sessionRows = [
  ["REF12345678", "Rahul Sharma", "John Operator", "Instant Session", "Completed", "08 May 2026, 10:15 AM", "00:21:45"],
  ["REF12345677", "Priya Singh", "Anita Kumari", "Loan Application", "Completed", "08 May 2026, 11:05 AM", "00:18:30"],
  ["REF12345676", "Amit Kumar", "Vikram Patel", "KYC Update", "Completed", "08 May 2026, 11:30 AM", "00:16:20"],
  ["REF12345675", "Neha Gupta", "John Operator", "Account Opening", "In Progress", "08 May 2026, 12:10 PM", "00:10:10"],
  ["REF12345674", "Rohan Verma", "Anita Kumari", "Loan Application", "Cancelled", "08 May 2026, 12:45 PM", "-"],
  ["REF12345673", "Sita Devi", "Vikram Patel", "KYC Update", "Completed", "08 May 2026, 01:15 PM", "00:19:05"],
  ["REF12345672", "Vivek Tiwari", "John Operator", "Account Opening", "Completed", "08 May 2026, 02:05 PM", "00:30:30"],
  ["REF12345671", "Pooja Mehta", "Neha Gupta", "Instant Session", "Completed", "08 May 2026, 02:30 PM", "00:24:56"],
];

const operatorRows = [
  ["John Operator", "120", "98", "15", "7", "4.8", "96%"],
  ["Anita Kumari", "110", "88", "16", "6", "4.7", "90%"],
  ["Rahul Sharma", "105", "85", "12", "8", "4.6", "90%"],
  ["Vikram Patel", "95", "75", "14", "6", "4.5", "89%"],
  ["Neha Gupta", "85", "70", "10", "5", "4.4", "88%"],
  ["Priya Singh", "80", "65", "11", "4", "4.3", "87%"],
];

const auditRows = [
  ["08 May 2026, 10:15 AM", "John Operator", "Sessions", "Start Session", "REF12345678", "192.168.1.10"],
  ["08 May 2026, 10:37 AM", "John Operator", "Documents", "Upload Document", "Aadhaar Card", "192.168.1.10"],
  ["08 May 2026, 10:45 AM", "Anita Kumari", "Users", "Update User", "Edit User Role", "192.168.1.11"],
  ["08 May 2026, 11:02 AM", "Admin", "Configuration", "Update Setting", "Time Format", "192.168.1.15"],
  ["08 May 2026, 11:15 AM", "Vikram Patel", "Sessions", "End Session", "REF12345676", "192.168.1.12"],
  ["08 May 2026, 11:30 AM", "Rahul Sharma", "Documents", "Delete Document", "PAN Card", "192.168.1.13"],
  ["08 May 2026, 11:45 AM", "Admin", "Users", "Create User", "New Operator", "192.168.1.15"],
  ["08 May 2026, 12:05 PM", "Anita Kumari", "Sessions", "Cancel Session", "REF12345674", "192.168.1.11"],
];

const liveRows = [
  ["SES-60001", "Rahul Sharma", "John Operator", "In Progress", "08 May 2026, 10:15 AM", "06:04"],
  ["SES-60002", "Anita Kumari", "Anita Kumari", "In Progress", "08 May 2026, 10:12 AM", "04:12"],
  ["SES-60003", "Vikram Patel", "Vikram Patel", "Waiting", "08 May 2026, 10:10 AM", "-"],
  ["SES-60004", "Neha Gupta", "Rahul Sharma", "In Progress", "08 May 2026, 10:08 AM", "07:45"],
  ["SES-60005", "Priya Singh", "Neha Gupta", "Completed", "08 May 2026, 10:06 AM", "06:18"],
  ["SES-60006", "Amit Kumar", "John Operator", "Completed", "08 May 2026, 10:02 AM", "08:02"],
  ["SES-60007", "Ravi Kumar", "Vikram Patel", "Waiting", "08 May 2026, 09:58 AM", "-"],
  ["SES-60008", "Kavita Singh", "Anita Kumari", "In Progress", "08 May 2026, 09:56 AM", "09:09"],
];

const instructionTemplates = [
  { icon: "▣", title: "Please show your Aadhaar card", subtitle: "Request customer to show Aadhaar card" },
  { icon: "▤", title: "Please show your PAN card", subtitle: "Request customer to show PAN card" },
  { icon: "⌂", title: "Please show your address proof", subtitle: "Request customer to show address proof" },
  { icon: "◉", title: "Please look at the camera", subtitle: "Request customer to look at the camera" },
  { icon: "◌", title: "Please remove your glasses", subtitle: "Request customer to remove glasses" },
  { icon: "↶", title: "Please turn left", subtitle: "Request customer to turn left" },
  { icon: "↷", title: "Please turn right", subtitle: "Request customer to turn right" },
  { icon: "⌁", title: "Any other instruction", subtitle: "Send any custom instruction" },
];

const initialRecentInstructions = [
  ["10:15 AM", "Please show your Aadhaar card"],
  ["10:18 AM", "Please look at the camera"],
  ["10:20 AM", "Please remove your glasses"],
  ["10:22 AM", "Please turn left"],
  ["10:24 AM", "Thank you"],
];

const feedbackRows = [
  ["Rahul Sharma", "5 ★", "Agent Behavior", "Excellent support and very helpful.", "08 May 2026, 10:30 AM"],
  ["Anita Kumari", "4 ★", "Process Experience", "Smooth process, well guided.", "08 May 2026, 09:45 AM"],
  ["Vikram Patel", "3 ★", "Waiting Time", "Had to wait longer than expected.", "07 May 2026, 04:15 PM"],
  ["Neha Gupta", "5 ★", "Video Quality", "Clear video and good quality.", "07 May 2026, 05:50 PM"],
  ["Priya Singh", "2 ★", "Agent Behavior", "Agent was not responsive.", "07 May 2026, 02:10 PM"],
];

const feedbackRatingDistribution = [
  { label: "5 ★", percent: 58, count: 329, tone: "five" },
  { label: "4 ★", percent: 28, count: 159, tone: "four" },
  { label: "3 ★", percent: 9, count: 51, tone: "three" },
  { label: "2 ★", percent: 3, count: 17, tone: "two" },
  { label: "1 ★", percent: 2, count: 12, tone: "one" },
];

const feedbackCategories = [
  ["Agent Behavior", "35%", "blue"],
  ["Process Experience", "25%", "green"],
  ["Video Quality", "15%", "gold"],
  ["Waiting Time", "15%", "orange"],
  ["Others", "10%", "purple"],
];

function statusClass(value) {
  return String(value).trim().toLowerCase().replaceAll(" ", "-");
}

function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="report-page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="report-action-row">{actions}</div>}
    </div>
  );
}

function StatGrid({ items }) {
  return (
    <div className="report-stat-grid">
      {items.map(({ label, value, trend, tone = "up", icon }) => (
        <article className="report-stat" key={label}>
          <div className="report-stat-label-row">
            {icon && <span className="report-stat-icon">{icon}</span>}
            <span>{label}</span>
          </div>
          <strong>{value}</strong>
          {trend && <small className={tone}>{trend}</small>}
        </article>
      ))}
    </div>
  );
}

function LineChart({ single = false, labels = ["01 May", "08 May", "15 May", "22 May", "29 May"] }) {
  return (
    <div className="report-line-chart">
      <div className="report-chart-legend">
        <span><i className="blue" />Sessions</span>
        {!single && <span><i className="green" />Completed</span>}
      </div>
      <svg viewBox="0 0 820 270" preserveAspectRatio="none" aria-label="Trend chart">
        <line x1="20" y1="30" x2="20" y2="238" className="grid-axis" />
        <line x1="20" y1="238" x2="800" y2="238" className="grid-axis" />
        {[70, 110, 150, 190].map((y) => <line key={y} x1="20" y1={y} x2="800" y2={y} className="grid-line" />)}
        <polyline className="primary-line" points="25,190 125,132 225,174 325,112 425,152 525,101 625,66 790,139" />
        {!single && <polyline className="secondary-line" points="25,215 125,170 225,204 325,158 425,180 525,144 625,99 790,169" />}
      </svg>
      <div className="report-chart-labels">
        {labels.map((label) => <span key={label}>{label}</span>)}
      </div>
    </div>
  );
}

function Donut({ center = "68%", items = [
  ["Completed", "76%", "green"],
  ["In Progress", "14%", "blue"],
  ["Cancelled", "8%", "orange"],
  ["No Show", "2%", "gray"],
] }) {
  return (
    <div className="report-donut-wrap">
      <div className="report-donut"><span>{center}</span></div>
      <div className="report-donut-legend">
        {items.map(([label, value, color]) => (
          <div key={label}><span><i className={color} />{label}</span><strong>{value}</strong></div>
        ))}
      </div>
    </div>
  );
}

function Table({ headers, rows, statusIndex = -1, linkIndex = -1, compact = false, action }) {
  return (
    <div className="report-table-wrap">
      <table className={`report-table ${compact ? "compact" : ""}`}>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}{action && <th>Action</th>}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cellIndex}-${cell}`}>
                  {cellIndex === linkIndex ? (
                    <button className="report-link" type="button">{cell}</button>
                  ) : cellIndex === statusIndex ? (
                    <span className={`report-status ${statusClass(cell)}`}>{cell}</span>
                  ) : cell}
                </td>
              ))}
              {action && <td>{action(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ReportPage() {
  const navigate = useNavigate();
  const [currentRole] = useState(() => getCurrentRole());
  const [section, setSection] = useState("analytics");
  const [search, setSearch] = useState("");
  const [sessionStatus, setSessionStatus] = useState("All Status");
  const [operatorFilter, setOperatorFilter] = useState("All Operators");
  const [auditModule, setAuditModule] = useState("All Modules");
  const [monitorStatus, setMonitorStatus] = useState("All Status");
  const [monitorOperator, setMonitorOperator] = useState("All Operators");
  const [instructionTab, setInstructionTab] = useState("templates");
  const [selectedInstruction, setSelectedInstruction] = useState(instructionTemplates[0].title);
  const [customInstruction, setCustomInstruction] = useState("");
  const [recentInstructions, setRecentInstructions] = useState(initialRecentInstructions);

  const can = (permission) => hasPermission(currentRole, permission);
  const visibleMenuItems = menuItems.filter((item) => can(item.permission));
  const visibleReportSections = reportSections.filter((item) => can(item.permission));
  const activeSection = visibleReportSections.some((item) => item.key === section)
    ? section
    : visibleReportSections[0]?.key;

  const filteredSessionRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return sessionRows.filter((row) => {
      const matchesSearch = !term || row.some((value) => String(value).toLowerCase().includes(term));
      const matchesStatus = sessionStatus === "All Status" || row[4] === sessionStatus;
      const matchesOperator = operatorFilter === "All Operators" || row[2] === operatorFilter;
      return matchesSearch && matchesStatus && matchesOperator;
    });
  }, [search, sessionStatus, operatorFilter]);

  const filteredAuditRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return auditRows.filter((row) => {
      const matchesSearch = !term || row.some((value) => String(value).toLowerCase().includes(term));
      return matchesSearch && (auditModule === "All Modules" || row[2] === auditModule);
    });
  }, [search, auditModule]);

  const filteredLiveRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return liveRows.filter((row) => {
      const matchesSearch = !term || row.some((value) => String(value).toLowerCase().includes(term));
      const matchesStatus = monitorStatus === "All Status" || row[3] === monitorStatus;
      const matchesOperator = monitorOperator === "All Operators" || row[2] === monitorOperator;
      return matchesSearch && matchesStatus && matchesOperator;
    });
  }, [search, monitorStatus, monitorOperator]);

  const handleMainMenu = (item) => {
    if (item.name === "Reports") {
      setSection(visibleReportSections[0]?.key || "analytics");
      return;
    }
    navigate(item.route);
  };

  const Sidebar = () => (
    <aside className="report-sidebar">
      <div className="report-sidebar-top">
        <button type="button" className="report-brand" onClick={() => navigate("/dashboard")}>
          <img src="/logo2.png" alt="Video KYC" />
          <span>Video KYC</span>
        </button>

        <div className="report-role-badge">Signed in as <strong>{currentRole}</strong></div>

        <nav className="report-menu">
          {visibleMenuItems.map((item) => (
            <React.Fragment key={item.name}>
              <button
                type="button"
                className={`report-menu-item ${item.name === "Reports" ? "active" : ""}`}
                onClick={() => handleMainMenu(item)}
              >
                <span className="report-menu-icon"><img src={item.icon} alt="" /></span>
                <span>{item.name}</span>
              </button>

              {item.name === "Reports" && (
                <div className="report-submenu">
                  {visibleReportSections.map((itemSection) => (
                    <button
                      type="button"
                      key={itemSection.key}
                      className={activeSection === itemSection.key ? "active" : ""}
                      onClick={() => {
                        setSearch("");
                        setSection(itemSection.key);
                      }}
                    >
                      {itemSection.name}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      <button type="button" className="report-logout" onClick={() => navigate("/login")}>
        <span className="report-logout-icon">◉</span>
        <span>Logout</span>
      </button>
    </aside>
  );

  const Analytics = () => (
    <>
      <PageHeader
        title="Analytics Dashboard"
        actions={<button className="report-secondary" type="button">08 May 2026 - 14 May 2026</button>}
      />
      <StatGrid items={[
        { label: "Total Sessions", value: "1,250", trend: "↑ 12.5%" },
        { label: "Completed Sessions", value: "950", trend: "↑ 10.3%" },
        { label: "In Progress", value: "180", trend: "↑ 8.1%" },
        { label: "Cancelled", value: "120", trend: "↓ 5.2%", tone: "down" },
      ]} />

      <section className="report-card report-chart-card">
        <div className="report-card-heading"><h2>Sessions Trend</h2><button type="button" className="report-secondary small">Daily⌄</button></div>
        <LineChart labels={["08 May", "09 May", "10 May", "11 May", "12 May", "13 May", "14 May"]} />
      </section>

      <div className="report-two-grid">
        <section className="report-card padded"><h2>Sessions by Status</h2><Donut center="76%" /></section>
        <section className="report-card padded">
          <h2>Top Operators</h2>
          <div className="report-rank-list">
            {[["John Operator", "245"], ["Anita Kumari", "210"], ["Rahul Sharma", "180"], ["Vikram Patel", "165"], ["Neha Gupta", "150"]].map(([name, value]) => (
              <div key={name}><span>{name}</span><strong>{value}</strong></div>
            ))}
          </div>
        </section>
      </div>
    </>
  );

  const SessionReports = () => (
    <>
      <PageHeader
        title="Session Reports"
        subtitle="View and export session reports"
        actions={<><button className="report-secondary" type="button">Export⌄</button><button className="report-primary" type="button">Filters</button></>}
      />
      <section className="report-card">
        <div className="report-filter-grid">
          <input aria-label="Date range" defaultValue="01 May 2026 - 31 May 2026" />
          <select value={sessionStatus} onChange={(e) => setSessionStatus(e.target.value)}>
            <option>All Status</option><option>Completed</option><option>In Progress</option><option>Cancelled</option>
          </select>
          <select value={operatorFilter} onChange={(e) => setOperatorFilter(e.target.value)}>
            <option>All Operators</option><option>John Operator</option><option>Anita Kumari</option><option>Vikram Patel</option><option>Neha Gupta</option>
          </select>
          <input className="report-filter-search" placeholder="Search reference, customer..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Table
          headers={["Reference No.", "Customer", "Operator", "Session Type", "Status", "Start Time", "Duration"]}
          rows={filteredSessionRows}
          linkIndex={0}
          statusIndex={4}
        />
        <div className="report-table-footer"><span>Showing 1 to {filteredSessionRows.length} of 125 entries</span><div><button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><button>…</button><button>16</button><button>›</button></div></div>
      </section>
    </>
  );

  const OperatorPerformance = () => (
    <>
      <PageHeader title="Operator Performance" actions={<><button className="report-secondary" type="button">01 May 2026 - 31 May 2026</button><button className="report-secondary" type="button">Export⌄</button></>} />
      <StatGrid items={[
        { label: "Total Operators", value: "25" },
        { label: "Avg. Sessions / Operator", value: "48" },
        { label: "Avg. Rating", value: "4.6", trend: "★" },
        { label: "SLA Compliance", value: "92%" },
      ]} />
      <section className="report-card">
        <Table headers={["Operator", "Total Sessions", "Completed", "In Progress", "Cancelled", "Avg. Rating", "SLA Compliance"]} rows={operatorRows} />
        <div className="report-centered-action"><button className="report-secondary" type="button">View All Operators</button></div>
      </section>
    </>
  );

  const AuditLog = () => (
    <>
      <PageHeader title="System Audit Log" actions={<button className="report-secondary" type="button">Export⌄</button>} />
      <section className="report-card">
        <div className="report-filter-grid audit">
          <input defaultValue="01 May 2026 - 31 May 2026" />
          <select value={auditModule} onChange={(e) => setAuditModule(e.target.value)}><option>All Modules</option><option>Sessions</option><option>Documents</option><option>Users</option><option>Configuration</option></select>
          <input placeholder="Search by user or action" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Table headers={["Date & Time", "User", "Module", "Action", "Details", "IP Address"]} rows={filteredAuditRows} />
        <div className="report-table-footer"><span>Showing 1 to {filteredAuditRows.length} of 342 entries</span><div><button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><button>…</button><button>43</button><button>›</button></div></div>
      </section>
    </>
  );

  const LiveMonitor = () => (
    <>
      <PageHeader title="KYC Session Monitoring" actions={<span className="report-live-pill">● Live</span>} />
      <StatGrid items={[
        { label: "Active Sessions", value: "42" },
        { label: "Waiting", value: "18" },
        { label: "Completed Today", value: "256" },
        { label: "Average Duration", value: "08:45 min" },
      ]} />
      <section className="report-card">
        <div className="report-filter-grid monitor">
          <input placeholder="Search sessions..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={monitorOperator} onChange={(e) => setMonitorOperator(e.target.value)}><option>All Operators</option><option>John Operator</option><option>Anita Kumari</option><option>Vikram Patel</option><option>Rahul Sharma</option><option>Neha Gupta</option></select>
          <select value={monitorStatus} onChange={(e) => setMonitorStatus(e.target.value)}><option>All Status</option><option>In Progress</option><option>Waiting</option><option>Completed</option></select>
          <button className="report-secondary" type="button">Filters⌄</button>
        </div>
        <Table
          headers={["Session ID", "Customer", "Operator", "Status", "Start Time", "Duration"]}
          rows={filteredLiveRows}
          linkIndex={0}
          statusIndex={3}
          action={() => <button className="report-eye" type="button">◉</button>}
        />
        <div className="report-table-footer"><span>Showing 1 to {filteredLiveRows.length} of 42 sessions</span><div><button>‹</button><button className="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><button>6</button><button>›</button></div></div>
      </section>
    </>
  );

  const AIInsights = () => (
    <>
      <PageHeader title="AI Verification Insights" actions={<button className="report-secondary" type="button">01 May 2026 - 31 May 2026</button>} />
      <StatGrid items={[
        { label: "Total Verifications", value: "1,250", trend: "↑ 14.6%" },
        { label: "Auto Approved", value: "950", trend: "↑ 10.0%" },
        { label: "Flagged by AI", value: "180", trend: "↑ 14.4%" },
        { label: "Manual Review", value: "120", trend: "↓ 5.9%", tone: "down" },
        { label: "Rejection Rate", value: "3.2%", trend: "↓ 6.4%", tone: "down" },
      ]} />
      <div className="report-two-grid ai-top">
        <section className="report-card padded">
          <h2>Verification by Type</h2>
          <Donut center="40%" items={[["Aadhaar", "40%", "blue"], ["PAN", "20%", "green"], ["Passport", "20%", "orange"], ["Driving License", "10%", "purple"], ["Others", "10%", "gray"]]} />
        </section>
        <section className="report-card padded">
          <h2>AI Confidence Score Distribution</h2>
          <div className="report-bars">
            {[["90-100%", 45], ["70-90%", 30], ["50-70%", 15], ["Below 50%", 10]].map(([label, value]) => (
              <div key={label}><span>{label}</span><div><i style={{ width: `${value}%` }} /></div><strong>{value}%</strong></div>
            ))}
          </div>
        </section>
      </div>
      <div className="report-two-grid">
        <section className="report-card padded">
          <h2>Top AI Flags</h2>
          <Table compact headers={["Flag Type", "Count", "% of Total"]} rows={[["Document Tampering", "65", "36.1%"], ["Face Mismatch", "48", "26.7%"], ["Invalid Document", "32", "17.8%"], ["Poor Image Quality", "25", "13.9%"], ["Others", "10", "5.5%"]]} />
        </section>
        <section className="report-card padded report-model-card">
          <h2>AI Model Performance</h2>
          <div className="report-score-circle">96.4%</div>
          <strong>Accuracy</strong>
          <div className="report-model-meta"><span>Model Version</span><b>v2.4.1</b><span>Last Updated</span><b>04 May 2026</b></div>
        </section>
      </div>
    </>
  );

  const Feedback = () => (
    <>
      <PageHeader
        title="Feedback & Ratings"
        actions={<button className="report-secondary" type="button">01 May 2026 - 31 May 2026</button>}
      />

      <div className="report-feedback-stat-grid">
        <article className="report-feedback-stat">
          <span>Total Feedback</span>
          <strong>568</strong>
          <small className="positive">↑ 11.2%</small>
        </article>
        <article className="report-feedback-stat">
          <span>Average Rating</span>
          <strong>4.6</strong>
          <small className="report-feedback-stars" aria-label="Five star rating">★★★★★</small>
        </article>
        <article className="report-feedback-stat">
          <span>Positive Feedback</span>
          <strong>452</strong>
          <small className="positive">↑ 79.4%</small>
        </article>
        <article className="report-feedback-stat">
          <span>Negative Feedback</span>
          <strong>116</strong>
          <small className="negative">↓ 20.4%</small>
        </article>
      </div>

      <div className="report-feedback-grid">
        <section className="report-card padded report-feedback-rating-card">
          <h2>Rating Distribution</h2>
          <div className="report-feedback-rating-list">
            {feedbackRatingDistribution.map(({ label, percent, count, tone }) => (
              <div className="report-feedback-rating-row" key={label}>
                <span className={`report-feedback-rating-label ${tone}`}>{label}</span>
                <div className="report-feedback-rating-track">
                  <i className={tone} style={{ width: `${percent}%` }} />
                </div>
                <strong>{percent}% ({count})</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="report-card padded report-feedback-category-card">
          <h2>Feedback by Category</h2>
          <div className="report-feedback-category-wrap">
            <div className="report-feedback-category-donut" aria-label="Feedback category distribution">
              <span />
            </div>
            <div className="report-feedback-category-legend">
              {feedbackCategories.map(([label, value, tone]) => (
                <div key={label}>
                  <span><i className={tone} />{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="report-card report-feedback-recent-card">
        <div className="report-card-heading table-heading">
          <h2>Recent Feedback</h2>
        </div>
        <Table
          headers={["Customer", "Rating", "Category", "Feedback", "Date"]}
          rows={feedbackRows}
        />
      </section>
    </>
  );

  const InstructionPanel = () => {
    const previewMessage = instructionTab === "custom"
      ? (customInstruction.trim() || "Type a custom instruction to preview it here.")
      : selectedInstruction;

    const sendInstruction = () => {
      const message = previewMessage.trim();
      if (!message || message === "Type a custom instruction to preview it here.") return;
      setRecentInstructions((items) => [["Now", message], ...items].slice(0, 5));
    };

    return (
      <div className="report-instruction-page">
        <PageHeader title="Instruction Panel" />

        <div className="report-instruction-tabs" role="tablist" aria-label="Instruction panel tabs">
          <button
            type="button"
            className={instructionTab === "templates" ? "active" : ""}
            onClick={() => setInstructionTab("templates")}
          >
            Quick Templates
          </button>
          <button
            type="button"
            className={instructionTab === "custom" ? "active" : ""}
            onClick={() => setInstructionTab("custom")}
          >
            Custom Message
          </button>
        </div>

        <div className="report-instruction-layout">
          <section className="report-instruction-list-card">
            {instructionTab === "templates" ? (
              instructionTemplates.map((template) => (
                <button
                  type="button"
                  key={template.title}
                  className={`report-instruction-template ${selectedInstruction === template.title ? "active" : ""}`}
                  onClick={() => setSelectedInstruction(template.title)}
                >
                  <span className="report-instruction-template-icon">{template.icon}</span>
                  <span className="report-instruction-template-copy">
                    <strong>{template.title}</strong>
                    <small>{template.subtitle}</small>
                  </span>
                </button>
              ))
            ) : (
              <div className="report-custom-instruction">
                <label htmlFor="custom-instruction-message">Custom Message</label>
                <textarea
                  id="custom-instruction-message"
                  value={customInstruction}
                  onChange={(event) => setCustomInstruction(event.target.value)}
                  placeholder="Type an instruction for the customer..."
                />
                <small>Write a short instruction that the operator can send during the session.</small>
              </div>
            )}
          </section>

          <aside className="report-instruction-side">
            <section className="report-message-preview-card">
              <div className="report-message-preview-heading">Message Preview</div>
              <div className="report-message-preview-body">{previewMessage}</div>
              <div className="report-message-preview-action">
                <button type="button" className="report-primary" onClick={sendInstruction}>Send Instruction</button>
              </div>
            </section>

            <section className="report-recent-instructions">
              <h2>Recent Instructions</h2>
              <div className="report-recent-instruction-list">
                {recentInstructions.map(([time, message], index) => (
                  <div key={`${time}-${message}-${index}`}>
                    <span>{time}</span>
                    <strong>{message}</strong>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    );
  };

  const SessionCompletionSummary = () => (
    <div className="report-completion-page">
      <button type="button" className="report-completion-back" onClick={() => setSection("sessions")}>
        ← Back
      </button>

      <h1 className="report-completion-title">Session Completion Summary</h1>

      <section className="report-completion-success">
        <div className="report-completion-check">✓</div>
        <div>
          <h2>Session Completed Successfully</h2>
          <p>The video KYC session has been completed and saved.</p>
        </div>
      </section>

      <div className="report-completion-grid">
        <section className="report-completion-card">
          <h2>Summary</h2>
          <dl className="report-summary-list">
            <div><dt>Reference No.</dt><dd>REF12345678</dd></div>
            <div><dt>Session Type</dt><dd>Instant Session</dd></div>
            <div><dt>Customer</dt><dd>Rahul Sharma</dd></div>
            <div><dt>Duration</dt><dd>00:24:38</dd></div>
            <div><dt>Operator</dt><dd>John Operator</dd></div>
            <div><dt>Completed On</dt><dd>08 May 2026, 10:35 AM</dd></div>
          </dl>
        </section>

        <section className="report-completion-card">
          <h2>Details</h2>
          <div className="report-completion-details">
            <div><span className="report-completion-detail-icon">▣</span><span>Recording</span><strong>Saved</strong></div>
            <div><span className="report-completion-detail-icon">▤</span><span>Documents</span><strong>4 / 4</strong></div>
            <div><span className="report-completion-detail-icon">◉</span><span>Snapshots</span><strong>12</strong></div>
            <div><span className="report-completion-detail-icon">☞</span><span>Instructions</span><strong>7</strong></div>
            <div><span className="report-completion-detail-icon">▧</span><span>Notes</span><strong>3</strong></div>
          </div>
        </section>
      </div>

      <section className="report-completion-next">
        <h2>Next Steps</h2>
        <p>You can view the session details, download the recording (if authorized) and generate reports.</p>
      </section>

      <div className="report-completion-actions">
        <button type="button" className="report-primary" onClick={() => setSection("sessions")}>View Session Details</button>
        <button type="button" className="report-secondary">Download Recording</button>
        <button type="button" className="report-secondary" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    </div>
  );

  const renderSection = () => {
    if (!activeSection) {
      return (
        <section className="report-card report-no-access">
          <h2>No Reports access</h2>
          <p>The current role does not have permission to display any report section.</p>
        </section>
      );
    }

    const activeReportConfig = visibleReportSections.find((item) => item.key === activeSection);

    // Menu-only items remain visible in the Reports submenu but do not
    // render a made-up page because no reference screen was supplied.
    if (activeReportConfig && !activeReportConfig.hasPage) return null;

    if (activeSection === "analytics") return <Analytics />;
    if (activeSection === "sessions") return <SessionReports />;
    if (activeSection === "operators") return <OperatorPerformance />;
    if (activeSection === "audit") return <AuditLog />;
    if (activeSection === "monitor") return <LiveMonitor />;
    if (activeSection === "ai") return <AIInsights />;
    if (activeSection === "feedback") return <Feedback />;
    if (activeSection === "instructions") return <InstructionPanel />;
    if (activeSection === "completion") return <SessionCompletionSummary />;

    // Items without a supplied screenshot stay as menu entries only.
    // We intentionally do not invent a dashboard/page for them.
    return null;
  };

  return (
    <div className="report-page">
      <Sidebar />
      <main className="report-main">
        <div className="report-content">{renderSection()}</div>
      </main>
    </div>
  );
}