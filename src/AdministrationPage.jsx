import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdministrationPage.css";
import {
  FEATURE_GROUPS,
  PERMISSIONS,
  ROLE_OPTIONS,
  ROLES,
  getCurrentRole,
  getRolePermissions,
  hasPermission,
  resetRolePermissions,
  saveRolePermissions,
} from "./role";

const mainMenuItems = [
  { name: "Dashboard", icon: "/dashboard.png", route: "/dashboard", permission: PERMISSIONS.DASHBOARD },
  { name: "Appointments", icon: "/appointment.png", route: "/appointments", permission: PERMISSIONS.APPOINTMENTS },
  { name: "Instant Session", icon: "/instant-session.png", route: "/instant-session", permission: PERMISSIONS.INSTANT_SESSION },
  { name: "Customers", icon: "/customer.png", route: "/workflow", permission: PERMISSIONS.CUSTOMERS },
  { name: "Sessions", icon: "/session.png", route: "/session", permission: PERMISSIONS.SESSIONS },
  { name: "Reports", icon: "/report.png", route: "/report", permission: PERMISSIONS.REPORTS },
  { name: "Administration", icon: "/administration.png", route: "/administration", permission: PERMISSIONS.ADMINISTRATION },
];

const adminSections = [
  // Screenshot-backed Administration pages
  { name: "Audit Dashboard", permission: PERMISSIONS.ADMIN_AUDIT_DASHBOARD },
  { name: "Integrations", permission: PERMISSIONS.ADMIN_INTEGRATIONS },
  { name: "Usage Analytics", permission: PERMISSIONS.ADMINISTRATION },
  { name: "Risk Assessment", permission: PERMISSIONS.ADMIN_RISK_ASSESSMENT },
  { name: "Compliance Overview", permission: PERMISSIONS.ADMIN_COMPLIANCE },
  { name: "System Notification", permission: PERMISSIONS.ADMIN_NOTIFICATIONS },
  { name: "Data Privacy", permission: PERMISSIONS.ADMIN_DATA_PRIVACY },
  { name: "Escalation", permission: PERMISSIONS.ADMIN_ESCALATIONS },
  { name: "Operator Performance", permission: PERMISSIONS.ADMIN_OPERATOR_PERFORMANCE },
  { name: "Operator Dashboard", permission: PERMISSIONS.ADMIN_OPERATOR_DASHBOARD },
  { name: "Document", permission: PERMISSIONS.ADMIN_DOCUMENTS },

  // Existing full Administration pages
  { name: "API Logs", permission: PERMISSIONS.ADMIN_API_LOGS },
  { name: "Operator Admin", permission: PERMISSIONS.ADMINISTRATION },
  { name: "My Profile", permission: PERMISSIONS.ADMINISTRATION },
  { name: "Help and Documentation", permission: PERMISSIONS.ADMINISTRATION },
  { name: "System Health", permission: PERMISSIONS.ADMINISTRATION },
  { name: "Support Tickets", permission: PERMISSIONS.ADMINISTRATION },
  { name: "Activity Logs", permission: PERMISSIONS.ADMINISTRATION },
  { name: "License Management", permission: PERMISSIONS.ADMINISTRATION },
  { name: "Database Management", permission: PERMISSIONS.ADMINISTRATION },
  { name: "Backup and Restore", permission: PERMISSIONS.SETTINGS_BACKUP },
  { name: "Data Retention Policy", permission: PERMISSIONS.SETTINGS_RETENTION },
  { name: "Storage Management", permission: PERMISSIONS.SETTINGS_STORAGE },
  { name: "Notification Settings", permission: PERMISSIONS.SETTINGS_NOTIFICATIONS },
  { name: "Security Settings", permission: PERMISSIONS.SETTINGS_SECURITY },
  { name: "Integration Settings", permission: PERMISSIONS.SETTINGS_INTEGRATIONS },
  { name: "SMS Notification", permission: PERMISSIONS.ADMIN_NOTIFICATIONS },
  { name: "Email Notification", permission: PERMISSIONS.ADMIN_NOTIFICATIONS },
  { name: "Configuration Settings", permission: PERMISSIONS.ADMIN_SETTINGS },
  { name: "User", permission: PERMISSIONS.ADMIN_USERS },
  { name: "Role", permission: PERMISSIONS.ADMIN_ROLES },
  { name: "Setting", permission: PERMISSIONS.ADMIN_SETTINGS },
  { name: "Email Template", permission: PERMISSIONS.ADMIN_EMAIL_TEMPLATES },
  { name: "Services", permission: PERMISSIONS.ADMIN_SERVICES },

  // Menu-only items: shown in the sidebar, no invented page
  { name: "App Performance", permission: PERMISSIONS.ADMINISTRATION, menuOnly: true },
  { name: "Device Analytics", permission: PERMISSIONS.ADMINISTRATION, menuOnly: true },
  { name: "Webhooks", permission: PERMISSIONS.ADMIN_WEBHOOKS, menuOnly: true },
  { name: "Audit Trail", permission: PERMISSIONS.ADMINISTRATION, menuOnly: true },
  { name: "Branches", permission: PERMISSIONS.ADMIN_BRANCHES, menuOnly: true },
  { name: "Escalator", permission: PERMISSIONS.ADMINISTRATION, menuOnly: true },
  { name: "Retros", permission: PERMISSIONS.ADMINISTRATION, menuOnly: true },
];

const initialUsers = [
  { id: 1, name: "John Operator", username: "joperator", email: "john.operator@bank.com", role: "Operator", status: "Active" },
  { id: 2, name: "Priya Singh", username: "psingh", email: "priya.singh@bank.com", role: "Operator", status: "Active" },
  { id: 3, name: "Rahul Verma", username: "rverma", email: "rahul.verma@bank.com", role: "Reviewer", status: "Active" },
  { id: 4, name: "Anita Kumari", username: "akumari", email: "anita.kumari@bank.com", role: "Admin", status: "Active" },
  { id: 5, name: "Vikram Patel", username: "vpatel", email: "vikram.patel@bank.com", role: "Manager", status: "Inactive" },
  { id: 6, name: "Neha Gupta", username: "neha.g", email: "neha.gupta@bank.com", role: "Operator", status: "Active" },
];

const roles = [
  { id: 1, role: "Super Admin", description: "Full system access", users: 2, status: "Active" },
  { id: 2, role: "Admin", description: "Manage system settings", users: 5, status: "Active" },
  { id: 3, role: "Operator", description: "Handle KYC sessions", users: 28, status: "Active" },
  { id: 4, role: "Reviewer", description: "Review session & documents", users: 6, status: "Active" },
  { id: 5, role: "Auditor", description: "View reports and audit logs", users: 3, status: "Active" },
  { id: 6, role: "Viewer", description: "View only access", users: 4, status: "Inactive" },
];

const services = [
  { id: 1, name: "Account Opening", category: "Onboarding", duration: "30 mins", status: "Active" },
  { id: 2, name: "KYC Update", category: "Maintenance", duration: "20 mins", status: "Active" },
  { id: 3, name: "Loan Application", category: "Loans", duration: "45 mins", status: "Active" },
  { id: 4, name: "Card Issuance", category: "Cards", duration: "20 mins", status: "Active" },
  { id: 5, name: "Address Update", category: "Maintenance", duration: "15 mins", status: "Active" },
  { id: 6, name: "Nominee Update", category: "Maintenance", duration: "15 mins", status: "Inactive" },
];

const initialDocuments = [
  { id: 1, name: "Aadhaar Card", category: "Identity Proof", required: "Yes", status: "Active" },
  { id: 2, name: "PAN Card", category: "Identity Proof", required: "Yes", status: "Active" },
  { id: 3, name: "Passport", category: "Identity Proof", required: "Yes", status: "Active" },
  { id: 4, name: "Driving License", category: "Identity Proof", required: "No", status: "Active" },
  { id: 5, name: "Electricity Bill", category: "Address Proof", required: "Yes", status: "Active" },
  { id: 6, name: "Bank Statement", category: "Address Proof", required: "No", status: "Inactive" },
];

const emptyDocumentForm = {
  name: "",
  category: "Identity Proof",
  description: "",
  required: true,
  allowExpired: false,
  maxFileSize: "5",
  allowedFileTypes: "jpg, jpeg, png, pdf",
  status: "Active",
  requiredFields: {
    documentNumber: true,
    name: true,
    dateOfBirth: true,
    address: true,
    expiryDate: false,
  },
};

const templates = [
  { id: 1, name: "Session Link Email", subject: "Your Video KYC session link", type: "System", status: "Active" },
  { id: 2, name: "Session Reminder", subject: "Reminder: Your KYC session", type: "System", status: "Active" },
  { id: 3, name: "Session Completed", subject: "Your KYC session completed", type: "System", status: "Active" },
  { id: 4, name: "Document Rejected", subject: "Action required on documents", type: "System", status: "Active" },
  { id: 5, name: "Custom Message", subject: "Important information", type: "Custom", status: "Active" },
];

const emptyUserForm = {
  fullName: "",
  username: "",
  email: "",
  phone: "",
  role: ROLES.OPERATOR,
  branch: "Head Office",
  status: "Active",
  password: "",
  confirmPassword: "",
};

export default function AdministrationPage() {
  const navigate = useNavigate();
  const [currentRole] = useState(() => getCurrentRole());
  const [permissionVersion, setPermissionVersion] = useState(0);

  const [section, setSection] = useState("Audit Dashboard");
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(initialUsers);
  const [documentTypes, setDocumentTypes] = useState(initialDocuments);
  const [selectedUser, setSelectedUser] = useState(initialUsers[0]);
  const [selectedDocument, setSelectedDocument] = useState(initialDocuments[0]);
  const [documentMode, setDocumentMode] = useState("edit");
  const [documentForm, setDocumentForm] = useState({
    ...emptyDocumentForm,
    name: initialDocuments[0].name,
    category: initialDocuments[0].category,
    required: initialDocuments[0].required === "Yes",
    status: initialDocuments[0].status,
    description: "Unique Identification Authority of India (UIDAI) issued Aadhaar Card.",
  });
  const [userForm, setUserForm] = useState(emptyUserForm);
  const [settingsTab, setSettingsTab] = useState("General");
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolePermissionDraft, setRolePermissionDraft] = useState([]);

  const [generalSettings, setGeneralSettings] = useState({
    bankName: "Your Bank",
    timeZone: "(UTC+05:30) Asia/Kolkata",
    dateFormat: "DD MMM YYYY",
    timeFormat: "12 Hours (hh:mm AM/PM)",
    language: "English",
  });

  const [sessionSettings, setSessionSettings] = useState({
    defaultValidity: "30 Minutes",
    maxSessionDuration: "60 Minutes",
    waitingTimeout: "15 Minutes",
    autoRecord: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    minimumLength: "8",
    uppercase: true,
    lowercase: true,
    numbers: true,
    specialCharacters: true,
    passwordExpiry: "90",
    maxLoginAttempts: "5",
    lockDuration: "30",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    sessionScheduled: true,
    sessionReminder: true,
    sessionCompleted: true,
    documentUploaded: true,
    documentVerified: true,
    sessionCancelled: true,
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    apiBaseUrl: "https://api.yourbank.com/v1",
    apiKey: "************************",
    apiSecret: "************************",
    timeout: "30",
    environment: "Production",
  });

  const normalizedSearch = search.trim().toLowerCase();

  // Re-read localStorage permissions whenever the Role Management editor saves or resets.
  const can = (permission) => {
    void permissionVersion;
    return hasPermission(currentRole, permission);
  };

  const visibleMainMenuItems = mainMenuItems.filter((item) => can(item.permission));
  const visibleAdminSections = adminSections.filter((item) => can(item.permission));
  const activeAdminSection = visibleAdminSections.some((item) => item.name === section)
    ? section
    : visibleAdminSections[0]?.name;

  const filteredUsers = useMemo(() => {
    if (!normalizedSearch) return users;
    return users.filter((user) =>
      [user.name, user.username, user.email, user.role, user.status]
        .some((value) => value.toLowerCase().includes(normalizedSearch))
    );
  }, [normalizedSearch, users]);

  const filteredRoles = useMemo(() => {
    if (!normalizedSearch) return roles;
    return roles.filter((role) =>
      [role.role, role.description, role.status]
        .some((value) => String(value).toLowerCase().includes(normalizedSearch))
    );
  }, [normalizedSearch]);

  const filteredServices = useMemo(() => {
    if (!normalizedSearch) return services;
    return services.filter((service) =>
      [service.name, service.category, service.duration, service.status]
        .some((value) => value.toLowerCase().includes(normalizedSearch))
    );
  }, [normalizedSearch]);

  const filteredDocuments = useMemo(() => {
    if (!normalizedSearch) return documentTypes;
    return documentTypes.filter((document) =>
      [document.name, document.category, document.required, document.status]
        .some((value) => value.toLowerCase().includes(normalizedSearch))
    );
  }, [normalizedSearch, documentTypes]);

  const filteredTemplates = useMemo(() => {
    if (!normalizedSearch) return templates;
    return templates.filter((template) =>
      [template.name, template.subject, template.type, template.status]
        .some((value) => value.toLowerCase().includes(normalizedSearch))
    );
  }, [normalizedSearch]);

  const handleMainMenuClick = (item) => {
    if (item.name === "Administration") {
      setSection(visibleAdminSections.find((entry) => !entry.menuOnly)?.name || visibleAdminSections[0]?.name || "Audit Dashboard");
      setView("list");
      setSearch("");
      return;
    }

    navigate(item.route);
  };

  const handleSectionClick = (name) => {
    setSection(name);
    setView("list");
    setSearch("");

    if (name === "Notification Settings") setSettingsTab("Notifications");
    if (name === "Security Settings") setSettingsTab("Security");
    if (name === "Integration Settings") setSettingsTab("Integrations");
    if (name === "Configuration Settings" || name === "Setting") setSettingsTab("General");
  };

  const Status = ({ value }) => (
    <span className={value === "Active" ? "admin-status active" : "admin-status inactive"}>
      {value}
    </span>
  );

  const PageHeader = ({ title, action }) => (
    <div className="admin-page-header">
      <h1>{title}</h1>
      {action}
    </div>
  );

  const SearchBar = ({ placeholder }) => (
    <div className="admin-search-box">
      <span>⌕</span>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );

  const Pager = () => (
    <div className="admin-pagination">
      <button type="button">‹</button>
      <button type="button" className="active">1</button>
      <button type="button">2</button>
      <button type="button">3</button>
      <button type="button">›</button>
    </div>
  );

  const renderSidebar = () => (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-scroll">
        <button
          type="button"
          className="admin-brand"
          onClick={() => navigate("/dashboard")}
        >
          <img src="/logo2.png" alt="Video KYC" />
          <span>Video KYC</span>
        </button>

        <div className="admin-role-badge">Signed in as: <strong>{currentRole}</strong></div>

        <nav className="admin-main-menu">
          {visibleMainMenuItems.map((item) => (
            <React.Fragment key={item.name}>
              <button
                type="button"
                className={
                  item.name === "Administration"
                    ? "admin-main-menu-item active"
                    : "admin-main-menu-item"
                }
                onClick={() => handleMainMenuClick(item)}
              >
                <span className="admin-main-menu-icon">
                  <img src={item.icon} alt="" />
                </span>

                <span className="admin-main-menu-label">
                  {item.name}
                </span>
              </button>

              {item.name === "Administration" && (
                <div className="admin-submenu">
                  {visibleAdminSections.map(({ name }) => (
                    <button
                      key={name}
                      type="button"
                      className={activeAdminSection === name ? "active" : ""}
                      onClick={() => handleSectionClick(name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      <button
        type="button"
        className="admin-logout"
        onClick={() => navigate("/login")}
      >
        <span className="admin-logout-icon">◉</span>
        <span>Logout</span>
      </button>
    </aside>
  );

  const openCreateUser = () => {
    setUserForm(emptyUserForm);
    setView("createUser");
  };

  const openEditUser = (user) => {
    setSelectedUser(user);
    setUserForm({
      fullName: user.name,
      username: user.username,
      email: user.email,
      phone: "9876543210",
      role: user.role,
      branch: "Head Office",
      status: user.status,
      password: "",
      confirmPassword: "",
    });
    setView("editUser");
  };

  const handleUserFormChange = (event) => {
    const { name, value } = event.target;
    setUserForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveUser = (event) => {
    event.preventDefault();

    if (view === "createUser") {
      setUsers((current) => [
        ...current,
        {
          id: Date.now(),
          name: userForm.fullName,
          username: userForm.username,
          email: userForm.email,
          role: userForm.role,
          status: userForm.status,
        },
      ]);
    } else {
      setUsers((current) =>
        current.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                name: userForm.fullName,
                username: userForm.username,
                email: userForm.email,
                role: userForm.role,
                status: userForm.status,
              }
            : user
        )
      );
    }

    setView("list");
  };

  const renderUsers = () => {
    if (view === "createUser" || view === "editUser") {
      const isCreate = view === "createUser";

      return (
        <>
          <PageHeader title={isCreate ? "Create User" : "Edit User"} />

          <button
            type="button"
            className="admin-back-button"
            onClick={() => setView("list")}
          >
            ← Back to User List
          </button>

          <form className="admin-form-card" onSubmit={saveUser}>
            <div className="admin-form-section">
              <h2>User Information</h2>

              <div className="admin-form-grid">
                <label className="admin-field">
                  <span>Full Name *</span>
                  <input
                    name="fullName"
                    value={userForm.fullName}
                    onChange={handleUserFormChange}
                    placeholder="Enter full name"
                    required
                  />
                </label>

                <label className="admin-field">
                  <span>Username *</span>
                  <input
                    name="username"
                    value={userForm.username}
                    onChange={handleUserFormChange}
                    placeholder="Enter username"
                    required
                  />
                </label>

                <label className="admin-field">
                  <span>Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleUserFormChange}
                    placeholder="Enter email address"
                    required
                  />
                </label>

                <label className="admin-field">
                  <span>Phone Number</span>
                  <input
                    name="phone"
                    value={userForm.phone}
                    onChange={handleUserFormChange}
                    placeholder="Enter phone number"
                  />
                </label>

                <label className="admin-field">
                  <span>Role *</span>
                  <select
                    name="role"
                    value={userForm.role}
                    onChange={handleUserFormChange}
                  >
                    {ROLE_OPTIONS.map((roleName) => (
                      <option key={roleName} value={roleName}>{roleName}</option>
                    ))}
                  </select>
                </label>

                <label className="admin-field">
                  <span>Branch *</span>
                  <select
                    name="branch"
                    value={userForm.branch}
                    onChange={handleUserFormChange}
                  >
                    <option>Head Office</option>
                    <option>Kathmandu Branch</option>
                    <option>Pokhara Branch</option>
                  </select>
                </label>
              </div>

              <div className="admin-radio-row">
                <strong>Status</strong>

                {["Active", "Inactive"].map((status) => (
                  <label key={status}>
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={userForm.status === status}
                      onChange={handleUserFormChange}
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>

            <div className="admin-form-section">
              <h2>{isCreate ? "Security Information" : "Security"}</h2>

              {isCreate ? (
                <div className="admin-form-grid">
                  <label className="admin-field">
                    <span>Password *</span>
                    <input
                      type="password"
                      name="password"
                      value={userForm.password}
                      onChange={handleUserFormChange}
                      required
                    />
                  </label>

                  <label className="admin-field">
                    <span>Confirm Password *</span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={userForm.confirmPassword}
                      onChange={handleUserFormChange}
                      required
                    />
                  </label>
                </div>
              ) : (
                <label className="admin-checkbox-row">
                  <input type="checkbox" />
                  Check to reset password
                </label>
              )}
            </div>

            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setView("list")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-primary-button"
              >
                {isCreate ? "Save User" : "Update User"}
              </button>
            </div>
          </form>
        </>
      );
    }

    if (view === "userDetails") {
      return (
        <>
          <PageHeader
            title="User Details"
            action={
              <button
                type="button"
                className="admin-primary-button"
                onClick={() => openEditUser(selectedUser)}
              >
                Edit User
              </button>
            }
          />

          <button
            type="button"
            className="admin-back-button"
            onClick={() => setView("list")}
          >
            ← Back to User List
          </button>

          <section className="admin-card admin-user-details-card">
            <div className="admin-user-avatar">
              {selectedUser.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="admin-user-details-main">
              <h2>{selectedUser.name}</h2>
              <Status value={selectedUser.status} />
              <span>◉ {selectedUser.role}</span>
              <span>✉ {selectedUser.email}</span>
              <span>◉ 9876543210</span>
            </div>

            <div className="admin-user-meta">
              <div>
                <span>Username</span>
                <strong>{selectedUser.username}</strong>
              </div>
              <div>
                <span>Branch</span>
                <strong>Head Office</strong>
              </div>
              <div>
                <span>Joined On</span>
                <strong>15 Jan 2026, 06:30 AM</strong>
              </div>
              <div>
                <span>Last Login</span>
                <strong>08 May 2026, 10:10 AM</strong>
              </div>
            </div>
          </section>

          <section className="admin-card admin-user-profile-card">
            <div className="admin-tabs">
              <button className="active">Profile</button>
              <button>Roles & Permissions</button>
              <button>Activity Log</button>
              <button>Session Access</button>
            </div>

            <div className="admin-profile-details">
              <div><span>Employee ID</span><strong>EMP10045</strong></div>
              <div><span>Date of Birth</span><strong>12 Aug 1990</strong></div>
              <div><span>Address</span><strong>123, Green Street, Mumbai, Maharashtra - 400001</strong></div>
              <div><span>Gender</span><strong>Male</strong></div>
              <div><span>Status</span><strong className="admin-green">Active</strong></div>
            </div>
          </section>
        </>
      );
    }

    return (
      <>
        <PageHeader
          title="User List"
          action={
            <button
              type="button"
              className="admin-primary-button"
              onClick={openCreateUser}
            >
              + Add User
            </button>
          }
        />

        <section className="admin-card">
          <div className="admin-toolbar">
            <SearchBar placeholder="Search by Name, Email or Username" />
            <button type="button" className="admin-secondary-button">
              Filters
            </button>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><Status value={user.status} /></td>
                    <td>
                      <div className="admin-row-actions">
                        <button type="button" onClick={() => openEditUser(user)}>✎</button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUser(user);
                            setView("userDetails");
                          }}
                        >
                          ◉
                        </button>
                        <button
                          type="button"
                          className="danger"
                          onClick={() =>
                            setUsers((current) =>
                              current.filter((item) => item.id !== user.id)
                            )
                          }
                        >
                          ♲
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-table-footer">
            <span>Showing 1 to {filteredUsers.length} of 25 entries</span>
            <Pager />
          </div>
        </section>
      </>
    );
  };

  const openRolePermissionEditor = (role) => {
    setSelectedRole(role);

    if (role.role === ROLES.SUPER_ADMIN) {
      setRolePermissionDraft(
        FEATURE_GROUPS.flatMap((group) =>
          group.features.map((feature) => feature.permission)
        )
      );
    } else {
      setRolePermissionDraft(getRolePermissions(role.role));
    }

    setView("rolePermissions");
  };

  const toggleRolePermission = (permission) => {
    if (selectedRole?.role === ROLES.SUPER_ADMIN) return;

    setRolePermissionDraft((current) =>
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission]
    );
  };

  const togglePermissionGroup = (features) => {
    if (selectedRole?.role === ROLES.SUPER_ADMIN) return;

    const permissions = features.map((feature) => feature.permission);
    const allSelected = permissions.every((permission) =>
      rolePermissionDraft.includes(permission)
    );

    setRolePermissionDraft((current) => {
      if (allSelected) {
        return current.filter((permission) => !permissions.includes(permission));
      }

      return [...new Set([...current, ...permissions])];
    });
  };

  const savePermissionsForRole = () => {
    if (!selectedRole || selectedRole.role === ROLES.SUPER_ADMIN) {
      setView("list");
      return;
    }

    saveRolePermissions(selectedRole.role, rolePermissionDraft);
    setPermissionVersion((value) => value + 1);
    setView("list");
  };

  const restoreDefaultPermissions = () => {
    if (!selectedRole || selectedRole.role === ROLES.SUPER_ADMIN) return;

    resetRolePermissions(selectedRole.role);
    setRolePermissionDraft(getRolePermissions(selectedRole.role));
    setPermissionVersion((value) => value + 1);
  };

  const renderRoles = () => {
    if (view === "rolePermissions" && selectedRole) {
      const locked = selectedRole.role === ROLES.SUPER_ADMIN;

      return (
        <>
          <PageHeader title={`Permissions - ${selectedRole.role}`} />

          <button
            type="button"
            className="admin-back-button"
            onClick={() => setView("list")}
          >
            ← Back to Role Management
          </button>

          <section className="admin-card admin-role-permissions-card">
            <div className="admin-role-permissions-intro">
              <div>
                <h2>{selectedRole.role}</h2>
                <p>
                  Choose which frontend screens and menu items this role can see.
                  Changes are stored in localStorage because this project has no backend.
                </p>
              </div>
              <span className={locked ? "admin-permission-lock locked" : "admin-permission-lock"}>
                {locked ? "Full access - locked" : `${rolePermissionDraft.length} permissions selected`}
              </span>
            </div>

            <div className="admin-permission-groups">
              {FEATURE_GROUPS.map((group) => {
                const groupPermissions = group.features.map((feature) => feature.permission);
                const allSelected = locked || groupPermissions.every((permission) =>
                  rolePermissionDraft.includes(permission)
                );

                return (
                  <div className="admin-permission-group" key={group.key}>
                    <div className="admin-permission-group-header">
                      <div>
                        <h3>{group.label}</h3>
                        <span>{group.features.length} features</span>
                      </div>

                      <button
                        type="button"
                        className="admin-permission-group-toggle"
                        disabled={locked}
                        onClick={() => togglePermissionGroup(group.features)}
                      >
                        {allSelected ? "Clear group" : "Select group"}
                      </button>
                    </div>

                    <div className="admin-permission-list">
                      {group.features.map((feature) => (
                        <label className="admin-permission-item" key={feature.permission}>
                          <input
                            type="checkbox"
                            disabled={locked}
                            checked={locked || rolePermissionDraft.includes(feature.permission)}
                            onChange={() => toggleRolePermission(feature.permission)}
                          />
                          <span>
                            <strong>{feature.label}</strong>
                            <small>{feature.permission}</small>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="admin-form-actions admin-role-permission-actions">
              {!locked && (
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={restoreDefaultPermissions}
                >
                  Restore Defaults
                </button>
              )}

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setView("list")}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-primary-button"
                onClick={savePermissionsForRole}
              >
                {locked ? "Done" : "Save Permissions"}
              </button>
            </div>
          </section>
        </>
      );
    }

    return (
      <>
        <PageHeader
          title="Role Management"
          action={
            <button
              type="button"
              className="admin-primary-button"
            >
              + Add Role
            </button>
          }
        />

        <section className="admin-card">
          <div className="admin-toolbar">
            <SearchBar placeholder="Search Role..." />
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Role Name</th>
                  <th>Description</th>
                  <th>Users</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRoles.map((role) => (
                  <tr key={role.id}>
                    <td>{role.role}</td>
                    <td>{role.description}</td>
                    <td>{role.users}</td>
                    <td><Status value={role.status} /></td>
                    <td>
                      <div className="admin-row-actions admin-role-row-actions">
                        <button
                          type="button"
                          className="admin-permission-button"
                          onClick={() => openRolePermissionEditor(role)}
                        >
                          Permissions
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-table-footer">
            <span>Showing 1 to {filteredRoles.length} of {filteredRoles.length} entries</span>
            <Pager />
          </div>
        </section>
      </>
    );
  };

  const renderServices = () => (
    <>
      <PageHeader
        title="Service Management"
        action={
          <button
            type="button"
            className="admin-primary-button"
          >
            + Add Service
          </button>
        }
      />

      <section className="admin-card">
        <div className="admin-toolbar">
          <SearchBar placeholder="Search Service..." />

          <select className="admin-toolbar-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{service.category}</td>
                  <td>{service.duration}</td>
                  <td><Status value={service.status} /></td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button">✎</button>
                      <button type="button" className="danger">♲</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-table-footer">
          <span>Showing 1 to {filteredServices.length} of {filteredServices.length} entries</span>
          <Pager />
        </div>
      </section>
    </>
  );


  const documentToForm = (document) => ({
    ...emptyDocumentForm,
    name: document.name,
    category: document.category,
    description:
      document.description ||
      "Unique document used for Video KYC verification.",
    required: document.required === "Yes",
    allowExpired: document.allowExpired ?? false,
    maxFileSize: document.maxFileSize || "5",
    allowedFileTypes:
      document.allowedFileTypes || "jpg, jpeg, png, pdf",
    status: document.status,
    requiredFields: {
      ...emptyDocumentForm.requiredFields,
      ...(document.requiredFields || {}),
    },
  });

  const openCreateDocument = () => {
    setDocumentMode("create");
    setSelectedDocument(null);
    setDocumentForm({
      ...emptyDocumentForm,
      requiredFields: {
        ...emptyDocumentForm.requiredFields,
      },
    });
    setView("documentConfig");
  };

  const openEditDocument = (document) => {
    setDocumentMode("edit");
    setSelectedDocument(document);
    setDocumentForm(documentToForm(document));
    setView("documentConfig");
  };

  const handleDocumentFormChange = (event) => {
    const { name, value, type, checked } = event.target;

    setDocumentForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleRequiredDocumentField = (field) => {
    setDocumentForm((current) => ({
      ...current,
      requiredFields: {
        ...current.requiredFields,
        [field]: !current.requiredFields[field],
      },
    }));
  };

  const saveDocumentType = (event) => {
    event.preventDefault();

    const savedDocument = {
      id:
        documentMode === "create"
          ? Date.now()
          : selectedDocument.id,
      name: documentForm.name.trim(),
      category: documentForm.category,
      description: documentForm.description.trim(),
      required: documentForm.required ? "Yes" : "No",
      allowExpired: documentForm.allowExpired,
      maxFileSize: documentForm.maxFileSize,
      allowedFileTypes: documentForm.allowedFileTypes.trim(),
      status: documentForm.status,
      requiredFields: {
        ...documentForm.requiredFields,
      },
    };

    if (documentMode === "create") {
      setDocumentTypes((current) => [
        ...current,
        savedDocument,
      ]);
    } else {
      setDocumentTypes((current) =>
        current.map((document) =>
          document.id === selectedDocument.id
            ? savedDocument
            : document
        )
      );
    }

    setSelectedDocument(savedDocument);
    setView("list");
  };

  const renderDocuments = () => {
    if (view === "documentConfig") {
      const isCreate = documentMode === "create";

      const requiredFieldOptions = [
        ["documentNumber", "Document Number"],
        ["name", "Name"],
        ["dateOfBirth", "Date of Birth"],
        ["address", "Address"],
        ["expiryDate", "Expiry Date"],
      ];

      return (
        <>
          <PageHeader title="Document Configuration" />

          <button
            type="button"
            className="admin-back-button"
            onClick={() => setView("list")}
          >
            ← Back to Document Types
          </button>

          <form
            className="admin-card admin-document-config"
            onSubmit={saveDocumentType}
          >
            <div className="admin-config-title-row">
              <div>
                <h2>
                  {isCreate
                    ? "New Document Type"
                    : documentForm.name}
                </h2>

                <p>
                  {isCreate
                    ? "Create a document type and define how it will be used during Video KYC."
                    : "Update the configuration for this document type."}
                </p>
              </div>

              <Status value={documentForm.status} />
            </div>

            <div className="admin-document-config-fields">
              <label className="admin-document-config-row">
                <span>Document Type Name *</span>

                <input
                  name="name"
                  value={documentForm.name}
                  onChange={handleDocumentFormChange}
                  placeholder="Enter document type name"
                  required
                />
              </label>

              <label className="admin-document-config-row">
                <span>Category *</span>

                <select
                  name="category"
                  value={documentForm.category}
                  onChange={handleDocumentFormChange}
                >
                  <option>Identity Proof</option>
                  <option>Address Proof</option>
                  <option>Income Proof</option>
                  <option>Financial Document</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="admin-document-config-row admin-document-description-row">
                <span>Description</span>

                <textarea
                  name="description"
                  value={documentForm.description}
                  onChange={handleDocumentFormChange}
                  placeholder="Enter document description"
                />
              </label>

              <div className="admin-document-config-row">
                <span>Required</span>

                <label className="admin-switch-with-text">
                  <span className="admin-switch">
                    <input
                      type="checkbox"
                      name="required"
                      checked={documentForm.required}
                      onChange={handleDocumentFormChange}
                    />
                    <span />
                  </span>

                  <strong>
                    {documentForm.required ? "Yes" : "No"}
                  </strong>
                </label>
              </div>

              <div className="admin-document-config-row">
                <span>Allow Expired</span>

                <label className="admin-switch-with-text">
                  <span className="admin-switch">
                    <input
                      type="checkbox"
                      name="allowExpired"
                      checked={documentForm.allowExpired}
                      onChange={handleDocumentFormChange}
                    />
                    <span />
                  </span>

                  <strong>
                    {documentForm.allowExpired ? "Yes" : "No"}
                  </strong>
                </label>
              </div>

              <label className="admin-document-config-row">
                <span>Max File Size *</span>

                <div className="admin-input-suffix">
                  <input
                    type="number"
                    min="1"
                    name="maxFileSize"
                    value={documentForm.maxFileSize}
                    onChange={handleDocumentFormChange}
                    required
                  />
                  <span>MB</span>
                </div>
              </label>

              <label className="admin-document-config-row">
                <span>Allowed File Types *</span>

                <input
                  name="allowedFileTypes"
                  value={documentForm.allowedFileTypes}
                  onChange={handleDocumentFormChange}
                  placeholder="jpg, jpeg, png, pdf"
                  required
                />
              </label>

              <label className="admin-document-config-row">
                <span>Status</span>

                <select
                  name="status"
                  value={documentForm.status}
                  onChange={handleDocumentFormChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </label>
            </div>

            <div className="admin-required-fields-section">
              <h3>Required Fields</h3>

              <p>
                Choose the information the operator must verify
                for this document type.
              </p>

              <div className="admin-required-fields">
                {requiredFieldOptions.map(([field, label]) => (
                  <label key={field}>
                    <input
                      type="checkbox"
                      checked={documentForm.requiredFields[field]}
                      onChange={() =>
                        toggleRequiredDocumentField(field)
                      }
                    />

                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setView("list")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-primary-button"
              >
                {isCreate
                  ? "Create Document Type"
                  : "Update"}
              </button>
            </div>
          </form>
        </>
      );
    }

    return (
      <>
        <PageHeader
          title="Document Type Management"
          action={
            <button
              type="button"
              className="admin-primary-button"
              onClick={openCreateDocument}
            >
              + Add Document Type
            </button>
          }
        />

        <section className="admin-card">
          <div className="admin-toolbar">
            <SearchBar placeholder="Search Document Type..." />
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Document Type</th>
                  <th>Category</th>
                  <th>Required</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((document) => (
                  <tr key={document.id}>
                    <td>{document.name}</td>
                    <td>{document.category}</td>
                    <td>{document.required}</td>
                    <td>
                      <Status value={document.status} />
                    </td>

                    <td>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          title="Edit document type"
                          onClick={() =>
                            openEditDocument(document)
                          }
                        >
                          ✎
                        </button>

                        <button
                          type="button"
                          className="danger"
                          title="Delete document type"
                          onClick={() =>
                            setDocumentTypes((current) =>
                              current.filter(
                                (item) =>
                                  item.id !== document.id
                              )
                            )
                          }
                        >
                          ♲
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-table-footer">
            <span>
              Showing 1 to {filteredDocuments.length} of{" "}
              {documentTypes.length} entries
            </span>

            <Pager />
          </div>
        </section>
      </>
    );
  };

  const renderEmailTemplates = () => (
    <>
      <PageHeader
        title="Email Template Management"
        action={
          <button
            type="button"
            className="admin-primary-button"
          >
            + New Template
          </button>
        }
      />

      <section className="admin-card">
        <div className="admin-toolbar">
          <SearchBar placeholder="Search Template..." />

          <select className="admin-toolbar-select">
            <option>All Templates</option>
            <option>System</option>
            <option>Custom</option>
          </select>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Template Name</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTemplates.map((template) => (
                <tr key={template.id}>
                  <td>{template.name}</td>
                  <td>{template.subject}</td>
                  <td>{template.type}</td>
                  <td><Status value={template.status} /></td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button">✎</button>
                      <button type="button" className="danger">♲</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-table-footer">
          <span>Showing 1 to {filteredTemplates.length} of {filteredTemplates.length} entries</span>
          <Pager />
        </div>
      </section>
    </>
  );

  const renderSettings = (pageTitle = "Configuration Settings", forcedTab = null) => {
    const tabs = [
      { name: "General", permission: PERMISSIONS.SETTINGS_GENERAL },
      { name: "Session", permission: PERMISSIONS.SETTINGS_SESSION },
      { name: "Security", permission: PERMISSIONS.SETTINGS_SECURITY },
      { name: "Notifications", permission: PERMISSIONS.SETTINGS_NOTIFICATIONS },
      { name: "Integrations", permission: PERMISSIONS.SETTINGS_INTEGRATIONS },
    ].filter((tab) => can(tab.permission));

    const requestedTab = forcedTab || settingsTab;
    const activeSettingsTab = tabs.some((tab) => tab.name === requestedTab)
      ? requestedTab
      : tabs[0]?.name;

    const renderGeneral = () => (
      <div className="admin-settings-body">
        <h2>General Settings</h2>

        <label className="admin-setting-row">
          <span>Bank Name</span>
          <input
            value={generalSettings.bankName}
            onChange={(event) =>
              setGeneralSettings((current) => ({
                ...current,
                bankName: event.target.value,
              }))
            }
          />
        </label>

        <label className="admin-setting-row">
          <span>Time Zone</span>
          <select
            value={generalSettings.timeZone}
            onChange={(event) =>
              setGeneralSettings((current) => ({
                ...current,
                timeZone: event.target.value,
              }))
            }
          >
            <option>(UTC+05:30) Asia/Kolkata</option>
            <option>(UTC+05:45) Asia/Kathmandu</option>
          </select>
        </label>

        <label className="admin-setting-row">
          <span>Date Format</span>
          <select
            value={generalSettings.dateFormat}
            onChange={(event) =>
              setGeneralSettings((current) => ({
                ...current,
                dateFormat: event.target.value,
              }))
            }
          >
            <option>DD MMM YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
          </select>
        </label>

        <label className="admin-setting-row">
          <span>Time Format</span>
          <select
            value={generalSettings.timeFormat}
            onChange={(event) =>
              setGeneralSettings((current) => ({
                ...current,
                timeFormat: event.target.value,
              }))
            }
          >
            <option>12 Hours (hh:mm AM/PM)</option>
            <option>24 Hours (HH:mm)</option>
          </select>
        </label>

        <label className="admin-setting-row">
          <span>Language</span>
          <select
            value={generalSettings.language}
            onChange={(event) =>
              setGeneralSettings((current) => ({
                ...current,
                language: event.target.value,
              }))
            }
          >
            <option>English</option>
            <option>Nepali</option>
          </select>
        </label>
      </div>
    );

    const renderSession = () => (
      <div className="admin-settings-body">
        <h2>Session Settings</h2>

        <label className="admin-setting-row">
          <span>Default Link Validity</span>
          <select
            value={sessionSettings.defaultValidity}
            onChange={(event) =>
              setSessionSettings((current) => ({
                ...current,
                defaultValidity: event.target.value,
              }))
            }
          >
            <option>15 Minutes</option>
            <option>30 Minutes</option>
            <option>45 Minutes</option>
            <option>60 Minutes</option>
          </select>
        </label>

        <label className="admin-setting-row">
          <span>Max Session Duration</span>
          <select
            value={sessionSettings.maxSessionDuration}
            onChange={(event) =>
              setSessionSettings((current) => ({
                ...current,
                maxSessionDuration: event.target.value,
              }))
            }
          >
            <option>30 Minutes</option>
            <option>45 Minutes</option>
            <option>60 Minutes</option>
          </select>
        </label>

        <label className="admin-setting-row">
          <span>Waiting Timeout</span>
          <select
            value={sessionSettings.waitingTimeout}
            onChange={(event) =>
              setSessionSettings((current) => ({
                ...current,
                waitingTimeout: event.target.value,
              }))
            }
          >
            <option>10 Minutes</option>
            <option>15 Minutes</option>
            <option>20 Minutes</option>
          </select>
        </label>

        <div className="admin-toggle-setting-row">
          <div>
            <strong>Automatic Recording</strong>
            <span>Automatically record Video KYC sessions.</span>
          </div>

          <label className="admin-switch">
            <input
              type="checkbox"
              checked={sessionSettings.autoRecord}
              onChange={(event) =>
                setSessionSettings((current) => ({
                  ...current,
                  autoRecord: event.target.checked,
                }))
              }
            />
            <span />
          </label>
        </div>
      </div>
    );

    const renderSecurity = () => (
      <div className="admin-settings-body">
        <h2>Password Policy</h2>

        <label className="admin-setting-row">
          <span>Minimum Length</span>
          <input
            value={securitySettings.minimumLength}
            onChange={(event) =>
              setSecuritySettings((current) => ({
                ...current,
                minimumLength: event.target.value,
              }))
            }
          />
        </label>

        {[
          ["uppercase", "Require Uppercase"],
          ["lowercase", "Require Lowercase"],
          ["numbers", "Require Numbers"],
          ["specialCharacters", "Require Special Characters"],
        ].map(([key, label]) => (
          <div className="admin-toggle-setting-row" key={key}>
            <strong>{label}</strong>

            <label className="admin-switch">
              <input
                type="checkbox"
                checked={securitySettings[key]}
                onChange={(event) =>
                  setSecuritySettings((current) => ({
                    ...current,
                    [key]: event.target.checked,
                  }))
                }
              />
              <span />
            </label>
          </div>
        ))}

        <label className="admin-setting-row">
          <span>Password Expiry (Days)</span>
          <input
            value={securitySettings.passwordExpiry}
            onChange={(event) =>
              setSecuritySettings((current) => ({
                ...current,
                passwordExpiry: event.target.value,
              }))
            }
          />
        </label>

        <h2 className="admin-settings-subheading">Account Lock Policy</h2>

        <label className="admin-setting-row">
          <span>Max Login Attempts</span>
          <input
            value={securitySettings.maxLoginAttempts}
            onChange={(event) =>
              setSecuritySettings((current) => ({
                ...current,
                maxLoginAttempts: event.target.value,
              }))
            }
          />
        </label>

        <label className="admin-setting-row">
          <span>Lock Duration (Minutes)</span>
          <input
            value={securitySettings.lockDuration}
            onChange={(event) =>
              setSecuritySettings((current) => ({
                ...current,
                lockDuration: event.target.value,
              }))
            }
          />
        </label>
      </div>
    );

    const renderNotifications = () => (
      <div className="admin-settings-body">
        <h2>Notification Settings</h2>

        {[
          ["sessionScheduled", "Session Scheduled"],
          ["sessionReminder", "Session Reminder"],
          ["sessionCompleted", "Session Completed"],
          ["documentUploaded", "Document Uploaded"],
          ["documentVerified", "Document Verified"],
          ["sessionCancelled", "Session Cancelled"],
        ].map(([key, label]) => (
          <div className="admin-toggle-setting-row" key={key}>
            <div>
              <strong>{label}</strong>
              <span>Send notification when {label.toLowerCase()}.</span>
            </div>

            <label className="admin-switch">
              <input
                type="checkbox"
                checked={notificationSettings[key]}
                onChange={(event) =>
                  setNotificationSettings((current) => ({
                    ...current,
                    [key]: event.target.checked,
                  }))
                }
              />
              <span />
            </label>
          </div>
        ))}
      </div>
    );

    const renderIntegrations = () => (
      <div className="admin-settings-body">
        <h2>API Configuration</h2>

        <label className="admin-setting-row">
          <span>API Base URL</span>
          <input
            value={integrationSettings.apiBaseUrl}
            onChange={(event) =>
              setIntegrationSettings((current) => ({
                ...current,
                apiBaseUrl: event.target.value,
              }))
            }
          />
        </label>

        <label className="admin-setting-row">
          <span>API Key</span>
          <input
            value={integrationSettings.apiKey}
            onChange={(event) =>
              setIntegrationSettings((current) => ({
                ...current,
                apiKey: event.target.value,
              }))
            }
          />
        </label>

        <label className="admin-setting-row">
          <span>API Secret</span>
          <input
            value={integrationSettings.apiSecret}
            onChange={(event) =>
              setIntegrationSettings((current) => ({
                ...current,
                apiSecret: event.target.value,
              }))
            }
          />
        </label>

        <label className="admin-setting-row">
          <span>Timeout (Seconds)</span>
          <input
            value={integrationSettings.timeout}
            onChange={(event) =>
              setIntegrationSettings((current) => ({
                ...current,
                timeout: event.target.value,
              }))
            }
          />
        </label>

        <label className="admin-setting-row">
          <span>Environment</span>
          <select
            value={integrationSettings.environment}
            onChange={(event) =>
              setIntegrationSettings((current) => ({
                ...current,
                environment: event.target.value,
              }))
            }
          >
            <option>Production</option>
            <option>Staging</option>
            <option>Development</option>
          </select>
        </label>
      </div>
    );

    return (
      <>
        <PageHeader title={pageTitle} />

        <section className="admin-card admin-settings-card">
          {!forcedTab && (
            <div className="admin-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  type="button"
                  className={activeSettingsTab === tab.name ? "active" : ""}
                  onClick={() => setSettingsTab(tab.name)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          )}

          {activeSettingsTab === "General" && renderGeneral()}
          {activeSettingsTab === "Session" && renderSession()}
          {activeSettingsTab === "Security" && renderSecurity()}
          {activeSettingsTab === "Notifications" && renderNotifications()}
          {activeSettingsTab === "Integrations" && renderIntegrations()}

          <div className="admin-form-actions">
            <button type="button" className="admin-primary-button">
              Save Changes
            </button>
          </div>
        </section>
      </>
    );
  };


  const VizStatGrid = ({ items, five = false }) => (
    <div className={`admin-viz-stat-grid ${five ? "five" : ""}`}>
      {items.map(({ label, value, trend, tone = "up" }) => (
        <article className="admin-viz-stat" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          {trend && <small className={tone}>{trend}</small>}
        </article>
      ))}
    </div>
  );

  const VizTable = ({ headers, rows, statusIndex = -1, linkIndex = -1, action = false }) => (
    <div className="admin-viz-table-wrap">
      <table className="admin-viz-table">
        <thead>
          <tr>
            {headers.map((header) => <th key={header}>{header}</th>)}
            {action && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>
                  {cellIndex === linkIndex ? (
                    <button type="button" className="admin-viz-link">{cell}</button>
                  ) : cellIndex === statusIndex ? (
                    <span className={`admin-viz-status ${String(cell).toLowerCase().replaceAll(" ", "-")}`}>{cell}</span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
              {action && <td><button type="button" className="admin-viz-eye">◉</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const VizLineChart = ({ green = false, audit = false }) => (
    <div className="admin-viz-line-chart">
      <svg viewBox="0 0 820 250" preserveAspectRatio="none" aria-label="Trend chart">
        {[40, 85, 130, 175, 220].map((y) => (
          <line key={y} x1="28" y1={y} x2="800" y2={y} className="admin-viz-grid-line" />
        ))}
        {audit ? (
          <>
            <polyline className="admin-viz-line blue" points="30,172 125,98 225,104 320,135 415,88 515,145 610,78 700,100 795,42" />
            <polyline className="admin-viz-line orange" points="30,220 125,190 225,209 320,196 415,204 515,207 610,178 700,194 795,168" />
          </>
        ) : (
          <>
            <polyline className={`admin-viz-line ${green ? "green" : "blue"}`} points="30,185 125,155 225,92 320,144 415,74 515,100 610,101 700,42 795,124" />
            {!green && <polyline className="admin-viz-line green" points="30,208 125,176 225,151 320,188 415,146 515,159 610,134 700,145 795,88" />}
          </>
        )}
      </svg>
      <div className="admin-viz-chart-labels">
        <span>01 May</span><span>08 May</span><span>15 May</span><span>22 May</span><span>29 May</span>
      </div>
    </div>
  );

  const VizDonut = ({ variant = "default", center = "" }) => (
    <div className="admin-viz-donut-wrap">
      <div className={`admin-viz-donut ${variant}`}>{center && <span>{center}</span>}</div>
    </div>
  );

  const renderAuditDashboard = () => {
    const rows = [
      ["08 May 2026, 10:15 AM", "Failed Login Attempt", "john.operator", "Multiple failed login attempts", "192.168.1.10"],
      ["08 May 2026, 09:56 AM", "Unauthorized Access", "unknown", "Access to restricted module", "192.168.1.22"],
      ["07 May 2026, 11:02 PM", "Data Export", "admin", "Large data export performed", "192.168.1.15"],
      ["07 May 2026, 06:45 PM", "Permission Change", "admin", "Role permission updated", "192.168.1.15"],
      ["07 May 2026, 06:00 PM", "Document Delete", "john.operator", "Document deleted", "192.168.1.10"],
    ];
    return (
      <>
        <PageHeader title="System Audit Dashboard" action={<button className="admin-secondary-button" type="button">01 May 2026 - 31 May 2026　▣</button>} />
        <VizStatGrid items={[
          { label: "Total Events", value: "32,458" },
          { label: "Critical Events", value: "256", trend: "↑ 0.77%", tone: "down" },
          { label: "Warning Events", value: "1,245", trend: "↓ 3.82%", tone: "warning" },
          { label: "Info Events", value: "30,957", trend: "↑ 16.35%" },
        ]} />
        <div className="admin-viz-two-grid audit">
          <section className="admin-viz-card padded">
            <h2>Events Over Time</h2>
            <div className="admin-viz-legend"><span><i className="critical" />Critical</span><span><i className="warning" />Warning</span><span><i className="info" />Info</span></div>
            <VizLineChart audit />
          </section>
          <section className="admin-viz-card padded">
            <h2>Top Event Categories</h2>
            <div className="admin-viz-category-list">
              {[["Login / Logout", "40%"], ["Data Access", "22%"], ["Configuration Change", "15%"], ["Document Access", "12%"], ["Others", "11%"]].map(([name, value]) => (
                <div key={name}><span>{name}</span><strong>{value}</strong></div>
              ))}
            </div>
          </section>
        </div>
        <section className="admin-viz-card">
          <h2 className="admin-viz-card-title">Recent Critical Events</h2>
          <VizTable headers={["Date & Time", "Event", "User", "Details", "IP Address"]} rows={rows} />
        </section>
      </>
    );
  };

  const renderIntegrationHealth = () => {
    const rows = [
      ["Aadhaar eKYC", "Healthy", "120 ms", "99.95%", "08 May 2026, 10:00 AM"],
      ["PAN Verification", "Healthy", "98 ms", "99.90%", "08 May 2026, 10:02 AM"],
      ["Face Match API", "Healthy", "150 ms", "98.80%", "08 May 2026, 10:05 AM"],
      ["SMS Gateway", "Degraded", "450 ms", "96.50%", "08 May 2026, 10:08 AM"],
      ["Email Service", "Healthy", "200 ms", "99.80%", "08 May 2026, 10:10 AM"],
      ["Document OCR", "Down", "-", "0%", "08 May 2026, 10:12 AM"],
      ["Storage Service", "Healthy", "110 ms", "99.95%", "08 May 2026, 10:15 AM"],
      ["Payment Gateway", "Degraded", "380 ms", "97.50%", "08 May 2026, 10:18 AM"],
      ["Notification Service", "Healthy", "130 ms", "99.90%", "08 May 2026, 10:20 AM"],
      ["Video Streaming", "Healthy", "140 ms", "99.85%", "08 May 2026, 10:22 AM"],
      ["Webhook Service", "Healthy", "95 ms", "99.90%", "08 May 2026, 10:25 AM"],
      ["AI Risk Engine", "Healthy", "210 ms", "99.70%", "08 May 2026, 10:28 AM"],
    ];
    return (
      <>
        <PageHeader title="Integration Health" action={<button className="admin-secondary-button" type="button">Refresh</button>} />
        <p className="admin-viz-updated">Last Updated: 08 May 2026, 10:20 AM</p>
        <VizStatGrid items={[
          { label: "Total Integrations", value: "12" },
          { label: "Healthy", value: "9", trend: "75%" },
          { label: "Degraded", value: "2", trend: "17%", tone: "warning" },
          { label: "Down", value: "1", trend: "8%", tone: "down" },
        ]} />
        <section className="admin-viz-card">
          <h2 className="admin-viz-card-title">Integration Status</h2>
          <VizTable headers={["Service", "Status", "Response Time", "Uptime", "Last Checked"]} rows={rows} statusIndex={1} action />
        </section>
      </>
    );
  };

  const renderMobileUsage = () => (
    <>
      <PageHeader title="Mobile App Usage" action={<button className="admin-secondary-button" type="button">01 May 2026 - 31 May 2026　▣</button>} />
      <VizStatGrid items={[
        { label: "Total App Users", value: "8,932", trend: "↑ 13.4%" },
        { label: "Active Users", value: "6,745", trend: "↑ 11.0%" },
        { label: "Sessions", value: "15,230", trend: "↑ 9.2%" },
        { label: "Crash Rate", value: "0.45%", trend: "↓ 0.12%" },
      ]} />
      <div className="admin-viz-two-grid">
        <section className="admin-viz-card padded"><h2>Users Over Time</h2><VizLineChart /></section>
        <section className="admin-viz-card padded">
          <h2>Top Devices</h2>
          <div className="admin-viz-donut-row">
            <VizDonut variant="devices" />
            <div className="admin-viz-category-list compact">
              <div><span><i className="dot blue" />Android</span><strong>72%</strong></div>
              <div><span><i className="dot green" />iOS</span><strong>26%</strong></div>
              <div><span><i className="dot gray" />Others</span><strong>2%</strong></div>
            </div>
          </div>
        </section>
      </div>
      <div className="admin-viz-two-grid">
        <section className="admin-viz-card padded">
          <h2>Top App Versions</h2>
          <div className="admin-viz-bars">
            {[["Version 2.4.1", "65%"], ["Version 2.3.0", "20%"], ["Version 2.2.5", "10%"], ["Others", "5%"]].map(([label, value]) => (
              <div key={label}><span>{label}</span><i><b style={{ width: value }} /></i><strong>{value}</strong></div>
            ))}
          </div>
        </section>
        <section className="admin-viz-card padded">
          <h2>Top Countries</h2>
          <div className="admin-viz-country-list">
            {[["🇮🇳", "India", "79%"], ["🇺🇸", "United States", "8%"], ["🇦🇪", "UAE", "4%"], ["🇬🇧", "United Kingdom", "2%"], ["🌐", "Others", "7%"]].map(([flag, country, pct]) => (
              <div key={country}><span>{flag}　{country}</span><strong>{pct}</strong></div>
            ))}
          </div>
        </section>
      </div>
    </>
  );

  const renderRiskAssessmentPage = () => {
    const rows = [
      ["RISK-1001", "Vikram Patel", "85", "High", "Completed", "08 May 2026"],
      ["RISK-1002", "Neha Gupta", "65", "Medium", "Completed", "08 May 2026"],
      ["RISK-1003", "Pooja Mehta", "92", "High", "Completed", "07 May 2026"],
      ["RISK-1004", "Amit Kumar", "45", "Low", "Completed", "07 May 2026"],
      ["RISK-1005", "Ravi Kumar", "75", "Medium", "Completed", "06 May 2026"],
      ["RISK-1006", "Kavita Singh", "30", "Low", "Completed", "06 May 2026"],
    ];
    return (
      <>
        <PageHeader title="Risk Assessment" action={<button className="admin-primary-button" type="button">+ New Assessment</button>} />
        <section className="admin-viz-card">
          <div className="admin-viz-toolbar">
            <input placeholder="⌕  Search assessments..." />
            <select><option>All Risk Levels</option><option>High</option><option>Medium</option><option>Low</option></select>
            <button type="button" className="admin-secondary-button">Filters⌄</button>
          </div>
          <VizTable headers={["Assessment ID", "Customer", "Risk Score", "Risk Level", "Status", "Date"]} rows={rows} linkIndex={0} statusIndex={4} action />
        </section>
        <div className="admin-viz-two-grid risk-bottom">
          <section className="admin-viz-card padded">
            <h2>Risk Distribution</h2>
            <div className="admin-viz-donut-row">
              <VizDonut variant="risk" />
              <div className="admin-viz-category-list compact">
                <div><span><i className="dot red" />High (81-100)</span><strong>18 (30%)</strong></div>
                <div><span><i className="dot orange" />Medium (40-80)</span><strong>24 (40%)</strong></div>
                <div><span><i className="dot green" />Low (0-39)</span><strong>18 (30%)</strong></div>
              </div>
            </div>
          </section>
          <section className="admin-viz-card padded admin-viz-big-metric">
            <span>Average Risk Score</span><strong>62</strong><small>↑ 5.2% from last month</small>
          </section>
        </div>
      </>
    );
  };

  const renderCompliancePage = () => {
    const rows = [
      ["COMP-1001", "KYC", "Vikram Patel", "Compliant", "08 May 2026, 10:15 AM"],
      ["COMP-1002", "AML", "Neha Gupta", "Non-Compliant", "08 May 2026, 09:45 AM"],
      ["COMP-1003", "Data Privacy", "Pooja Mehta", "Compliant", "07 May 2026, 04:30 PM"],
      ["COMP-1004", "KYC", "Amit Kumar", "Pending Review", "07 May 2026, 08:30 PM"],
    ];
    return (
      <>
        <PageHeader title="Compliance Overview" action={<button className="admin-secondary-button" type="button">01 May 2026 - 31 May 2026　▣</button>} />
        <VizStatGrid items={[
          { label: "Overall Compliance", value: "92%", trend: "↑ 4.8%" },
          { label: "Compliant", value: "1,104" },
          { label: "Non-Compliant", value: "96", tone: "down" },
          { label: "Pending Review", value: "50" },
        ]} />
        <div className="admin-viz-two-grid">
          <section className="admin-viz-card padded"><h2>Compliance Trend</h2><VizLineChart green /></section>
          <section className="admin-viz-card padded">
            <h2>Compliance by Type</h2>
            <div className="admin-viz-donut-row">
              <VizDonut variant="compliance" />
              <div className="admin-viz-category-list compact">
                <div><span><i className="dot blue" />KYC</span><strong>40%</strong></div>
                <div><span><i className="dot green" />AML</span><strong>30%</strong></div>
                <div><span><i className="dot orange" />Data Privacy</span><strong>20%</strong></div>
                <div><span><i className="dot gray" />Others</span><strong>10%</strong></div>
              </div>
            </div>
          </section>
        </div>
        <section className="admin-viz-card">
          <h2 className="admin-viz-card-title">Recent Compliance Checks</h2>
          <VizTable headers={["Check ID", "Type", "Entity", "Status", "Checked On"]} rows={rows} linkIndex={0} statusIndex={3} action />
        </section>
      </>
    );
  };

  const renderSystemNotificationsPage = () => {
    const rows = [
      ["System Maintenance", "System", "Scheduled maintenance on 10 May 2026", "10:30 AM"],
      ["High Risk Alert", "Alert", "High risk detected for customer ID 12345", "09:15 AM"],
      ["New Feature Released", "System", "New analytics dashboard is now available", "Yesterday, 04:20 PM"],
      ["Document Expiry", "Alert", "Document expiring in 7 days for ID 67890", "Yesterday, 11:10 AM"],
      ["Backup Completed", "System", "Daily system backup completed successfully", "08 May 2026, 06:00 AM"],
      ["SLA Breach Warning", "Alert", "SLA breach warning for operator John", "08 May 2026, 06:45 PM"],
    ];
    return (
      <>
        <PageHeader title="System Notifications" action={<div className="admin-viz-actions"><button className="admin-secondary-button">▣ Mark all as read</button><button className="admin-secondary-button">⚙</button></div>} />
        <section className="admin-viz-card">
          <div className="admin-viz-tabs"><button className="active">All</button><button>Unread</button><button>Alerts</button><button>System</button></div>
          <VizTable headers={["Title", "Type", "Message", "Time"]} rows={rows} action />
        </section>
        <VizStatGrid items={[
          { label: "Total Notifications", value: "128" },
          { label: "Unread", value: "12", tone: "down" },
          { label: "Alerts", value: "28", tone: "down" },
          { label: "System", value: "88" },
        ]} />
      </>
    );
  };

  const renderPrivacyPage = () => {
    const rows = [
      ["DPR-1001", "Vikram Patel", "Access Request", "Completed", "08 May 2026"],
      ["DPR-1002", "Neha Gupta", "Deletion Request", "In Progress", "08 May 2026"],
      ["DPR-1003", "Pooja Mehta", "Correction Request", "Pending Review", "07 May 2026"],
      ["DPR-1004", "Amit Kumar", "Access Request", "Completed", "07 May 2026"],
      ["DPR-1005", "Ravi Kumar", "Deletion Request", "In Progress", "06 May 2026"],
      ["DPR-1006", "Kavita Singh", "Correction Request", "Completed", "06 May 2026"],
    ];
    return (
      <>
        <PageHeader title="Data Privacy Requests" action={<button className="admin-primary-button">+ New Request</button>} />
        <section className="admin-viz-card">
          <div className="admin-viz-tabs"><button className="active">All</button><button>Access Request</button><button>Correction Request</button><button>Deletion Request</button></div>
          <div className="admin-viz-toolbar"><input placeholder="⌕  Search requests..." /><select><option>All Types</option></select><button className="admin-secondary-button">Filters⌄</button></div>
          <VizTable headers={["Request ID", "Customer", "Type", "Status", "Requested On"]} rows={rows} linkIndex={0} statusIndex={3} action />
        </section>
        <VizStatGrid five items={[
          { label: "Total Requests", value: "48" },
          { label: "Completed", value: "20" },
          { label: "In Progress", value: "16", tone: "down" },
          { label: "Pending Review", value: "8" },
          { label: "Rejected", value: "4", tone: "down" },
        ]} />
      </>
    );
  };

  const renderEscalationPage = () => {
    const rows = [
      ["ESC-0001", "Vikram Patel", "Document mismatch", "High", "Open", "Anita Kumari"],
      ["ESC-0002", "Neha Gupta", "Poor video quality", "Medium", "In Progress", "Rahul Sharma"],
      ["ESC-0003", "Pooja Mehta", "ID proof not clear", "High", "Open", "Priya Singh"],
      ["ESC-0004", "Amit Kumar", "Session disconnected", "Low", "Resolved", "John Operator"],
      ["ESC-0005", "Ravi Kumar", "Address mismatch", "Medium", "In Progress", "Anita Kumari"],
      ["ESC-0006", "Kavita Singh", "Face not recognized", "High", "Open", "Vikram Patel"],
    ];
    return (
      <>
        <PageHeader title="Escalation Management" action={<button className="admin-primary-button">+ New Escalation</button>} />
        <section className="admin-viz-card">
          <div className="admin-viz-tabs"><button className="active">Open</button><button>In Progress</button><button>Resolved</button><button>Closed</button></div>
          <div className="admin-viz-toolbar"><input placeholder="⌕  Search escalations..." /><select><option>All Priorities</option></select><button className="admin-secondary-button">Filters⌄</button></div>
          <VizTable headers={["Escalation ID", "Customer", "Issue", "Priority", "Status", "Assigned To"]} rows={rows} linkIndex={0} statusIndex={4} action />
        </section>
        <div className="admin-viz-two-grid risk-bottom">
          <section className="admin-viz-card padded"><h2>Escalation Summary</h2><div className="admin-viz-donut-row"><VizDonut variant="escalation" /><div className="admin-viz-category-list compact"><div><span><i className="dot blue" />Open</span><strong>18 (45%)</strong></div><div><span><i className="dot green" />In Progress</span><strong>10 (25%)</strong></div><div><span><i className="dot darkgreen" />Resolved</span><strong>8 (20%)</strong></div><div><span><i className="dot orange" />Closed</span><strong>4 (10%)</strong></div></div></div></section>
          <section className="admin-viz-card padded admin-viz-big-metric"><span>Average Resolution Time</span><strong>2h 45m</strong><small>↑ 15.6% from last month</small></section>
        </div>
      </>
    );
  };

  const renderOperatorPerformancePage = () => (
    <>
      <PageHeader title="Operator Performance Details" action={<button className="admin-secondary-button">01 May 2026 - 31 May 2026　▣</button>} />
      <section className="admin-viz-card admin-viz-operator-profile">
        <div className="admin-viz-avatar">RS</div>
        <div className="admin-viz-operator-copy"><h2>Rahul Sharma <span>Active</span></h2><p>Operator ID: OP1001</p><p>rahul.sharma@bank.com</p><button type="button">Update</button></div>
        <div className="admin-viz-rating"><span>Overall Rating</span><strong>4.7</strong><b>★★★★★</b><small>(105 Ratings)</small></div>
      </section>
      <VizStatGrid five items={[
        { label: "Total Sessions", value: "128", trend: "↑ 14.4%" },
        { label: "Completed", value: "98", trend: "76.6%" },
        { label: "In Progress", value: "20", trend: "15.6%", tone: "warning" },
        { label: "Cancelled", value: "10", trend: "↓ 7.8%", tone: "down" },
        { label: "SLA Compliance", value: "92%", trend: "↑ 6.3%" },
      ]} />
      <section className="admin-viz-card padded"><h2>Daily Trend</h2><VizLineChart /></section>
      <section className="admin-viz-card">
        <h2 className="admin-viz-card-title">Service Wise Performance</h2>
        <VizTable headers={["Service", "Total Sessions", "Completed", "Completion %", "Avg. Rating"]} rows={[
          ["KYC Verification", "60", "48", "80%", "4.8"],
          ["Video KYC", "40", "32", "80%", "4.6"],
          ["Account Opening", "20", "14", "70%", "4.5"],
          ["Document Update", "8", "4", "50%", "4.2"],
        ]} />
      </section>
    </>
  );

  const renderOperatorDashboardPage = () => (
    <>
      <PageHeader title="Operator Dashboard" action={<button className="admin-secondary-button">01 May 2026 - 31 May 2026　▣</button>} />
      <VizStatGrid items={[
        { label: "Sessions Handled", value: "128", trend: "↑ 14.4%" },
        { label: "Completed", value: "98", trend: "↑ 15.2%" },
        { label: "In Progress", value: "20", trend: "↓ 5.3%", tone: "warning" },
        { label: "Avg. Rating", value: "4.7", trend: "↑ 0.2" },
      ]} />
      <div className="admin-viz-two-grid">
        <section className="admin-viz-card padded"><h2>Sessions Over Time</h2><VizLineChart /></section>
        <section className="admin-viz-card padded"><h2>Today's Summary</h2><div className="admin-viz-category-list"><div><span>Assigned</span><strong>14</strong></div><div><span>Completed</span><strong>10</strong></div><div><span>In Progress</span><strong>3</strong></div><div><span>Cancelled</span><strong>1</strong></div></div></section>
      </div>
    </>
  );

  const renderApiLogsPage = () => (
    <>
      <PageHeader title="API Logs" />
      <section className="admin-viz-card">
        <div className="admin-viz-toolbar"><input defaultValue="01 May 2026 - 31 May 2026" /><select><option>All Status</option><option>200</option><option>400</option><option>500</option></select><button className="admin-primary-button">Filters</button></div>
        <VizTable headers={["Date & Time", "Endpoint", "Method", "Status", "Response Time", "IP Address"]} rows={[
          ["08 May 2026, 10:15 AM", "/api/v1/sessions", "POST", "200", "245 ms", "192.168.1.10"],
          ["08 May 2026, 10:14 AM", "/api/v1/documents", "POST", "200", "312 ms", "192.168.1.10"],
          ["08 May 2026, 10:12 AM", "/api/v1/customers", "GET", "200", "128 ms", "192.168.1.15"],
          ["08 May 2026, 10:11 AM", "/api/v1/notifications", "POST", "500", "-", "192.168.1.12"],
          ["08 May 2026, 10:10 AM", "/api/v1/sessions/123", "GET", "200", "96 ms", "192.168.1.15"],
          ["08 May 2026, 10:08 AM", "/api/v1/exports", "POST", "200", "279 ms", "192.168.1.10"],
        ]} />
      </section>
    </>
  );

  const renderStoragePage = () => (
    <>
      <PageHeader title="Storage Management" />
      <VizStatGrid items={[
        { label: "Total Storage", value: "256 GB", trend: "Allocated" },
        { label: "Used Storage", value: "128.45 GB", trend: "50.2% Used" },
        { label: "Available Storage", value: "127.55 GB", trend: "49.8% Free" },
        { label: "Growth This Month", value: "8.6 GB", trend: "↑ 5.4%" },
      ]} />
      <div className="admin-viz-two-grid">
        <section className="admin-viz-card padded"><h2>Storage Usage</h2><div className="admin-viz-donut-row"><VizDonut variant="storage" center="50%" /><div className="admin-viz-category-list compact"><div><span>Recordings</span><strong>64.2 GB</strong></div><div><span>Documents</span><strong>38.7 GB</strong></div><div><span>Snapshots</span><strong>18.3 GB</strong></div><div><span>Others</span><strong>7.2 GB</strong></div></div></div></section>
        <section className="admin-viz-card"><h2 className="admin-viz-card-title">Storage Details</h2><VizTable headers={["Category", "File Count", "Used Storage", "Percentage"]} rows={[["Recordings", "1,245", "64.2 GB", "50.0%"], ["Documents", "3,856", "38.7 GB", "30.2%"], ["Snapshots", "12,542", "18.3 GB", "14.3%"], ["Others", "2,145", "7.2 GB", "5.5%"]]} /></section>
      </div>
    </>
  );

  const renderRetentionPage = () => (
    <>
      <PageHeader title="Data Retention Policy" action={<button className="admin-primary-button">+ Add Rule</button>} />
      <section className="admin-viz-card">
        <VizTable headers={["Data Type", "Retention Period", "Action After Expiry", "Status"]} rows={[
          ["Session Recordings", "365 days", "Auto Delete", "Active"],
          ["Documents", "730 days", "Archive", "Active"],
          ["Snapshots", "365 days", "Auto Delete", "Active"],
          ["Chat Logs", "180 days", "Auto Delete", "Inactive"],
          ["Audit Logs", "1095 days", "Archive", "Active"],
        ]} statusIndex={3} action />
      </section>
    </>
  );

  const renderBackupPage = () => (
    <>
      <PageHeader title="Backup and Restore" action={<button className="admin-primary-button">Run Backup</button>} />
      <section className="admin-viz-card">
        <div className="admin-viz-tabs"><button className="active">Backup</button><button>Restore</button></div>
        <h2 className="admin-viz-card-title">Backup History</h2>
        <VizTable headers={["Backup Date & Time", "Type", "Size", "Status"]} rows={[
          ["08 May 2026, 02:00 AM", "Full Backup", "12.45 GB", "Completed"],
          ["07 May 2026, 02:00 AM", "Full Backup", "12.32 GB", "Completed"],
          ["06 May 2026, 02:00 AM", "Incremental", "2.15 GB", "Completed"],
          ["05 May 2026, 02:00 AM", "Full Backup", "12.18 GB", "Failed"],
          ["04 May 2026, 02:00 AM", "Incremental", "2.05 GB", "Completed"],
        ]} statusIndex={3} />
      </section>
    </>
  );

  const renderCommunicationPage = (kind) => {
    const isSms = kind === "SMS";
    const rows = isSms ? [
      ["Session Link SMS", "When session is scheduled", "Your Video KYC session link is {{link}}.", "Active"],
      ["OTP SMS", "When OTP is generated", "Your OTP is {{otp}}.", "Active"],
      ["Session Reminder SMS", "1 hour before session", "Reminder: your KYC session is at {{time}}.", "Active"],
      ["Document Reject SMS", "When document is rejected", "Please upload {{doc_name}} again.", "Active"],
    ] : [
      ["Session Link Email", "When session is scheduled", "Customer", "Active"],
      ["Session Reminder", "1 hour before session", "Customer", "Active"],
      ["Session Completed", "When session is completed", "Customer", "Active"],
      ["Document Rejected", "When document is rejected", "Customer", "Active"],
      ["Feedback Request", "After session completed", "Customer", "Active"],
    ];
    return (
      <>
        <PageHeader title={`${kind} Notification`} action={<button className="admin-primary-button">+ New {isSms ? "SMS Template" : "Notification"}</button>} />
        <section className="admin-viz-card"><VizTable headers={isSms ? ["Template Name", "Trigger", "Message Preview", "Status"] : ["Notification Name", "Trigger", "Recipients", "Status"]} rows={rows} statusIndex={3} action /></section>
      </>
    );
  };

  const renderProfilePage = () => (
    <>
      <PageHeader title="My Profile" />;
      <section className="admin-viz-card admin-viz-profile-page">
        <div className="admin-viz-avatar large">AN</div>
        <div><h2>Administrator</h2><p>admin@Kamanabank.com</p><p>Super Admin</p></div>
        <button className="admin-primary-button">Edit Profile</button>
      </section>
      <section className="admin-viz-card padded"><h2>Profile Information</h2><div className="admin-feature-controls"><label className="admin-setting-row"><span>Full Name</span><input defaultValue="Administrator" /></label><label className="admin-setting-row"><span>Email</span><input defaultValue="admin@Kamanabank.com" /></label><label className="admin-setting-row"><span>Phone</span><input defaultValue="+91 98765 43210" /></label></div></section>
    </>
  );

  const renderHelpPage = () => (
    <>
      <PageHeader title="Help and Documentation" />
      <section className="admin-viz-card padded"><div className="admin-viz-help-search">⌕ <input placeholder="Search help articles and documentation..." /></div></section>
      <div className="admin-viz-help-grid">{["Getting Started", "User & Role Management", "KYC Sessions", "Integrations & APIs", "Security & Compliance", "Troubleshooting"].map((item) => <section className="admin-viz-card admin-viz-help-card" key={item}><h2>{item}</h2><p>View guides, procedures and reference documentation for {item.toLowerCase()}.</p><button className="admin-viz-link">View documentation →</button></section>)}</div>
    </>
  );

  const renderLicensePage = () => (
    <>
      <PageHeader title="License Management" />
      <VizStatGrid items={[{ label: "License", value: "Enterprise" }, { label: "Seats", value: "100" }, { label: "Assigned", value: "68" }, { label: "Available", value: "32" }]} />
      <section className="admin-viz-card"><h2 className="admin-viz-card-title">License Details</h2><VizTable headers={["Product", "Plan", "Seats", "Renewal Date", "Status"]} rows={[["Video KYC Platform", "Enterprise", "100", "31 Dec 2026", "Active"], ["AI Verification", "Enterprise Add-on", "100", "31 Dec 2026", "Active"], ["Audit & Compliance", "Enterprise Add-on", "25", "31 Dec 2026", "Active"]]} statusIndex={4} /></section>
    </>
  );

  const renderMenuOnlyPage = () => (
    <section className="admin-menu-only-space" aria-hidden="true" />
  );

  const featureRows = {
    "API Logs": [
      ["GET /api/v1/sessions", "GET", "200", "142 ms", "19 Aug 2026, 10:32 AM"],
      ["POST /api/v1/customer", "POST", "201", "218 ms", "19 Aug 2026, 10:28 AM"],
      ["POST /api/v1/kyc/verify", "POST", "200", "386 ms", "19 Aug 2026, 10:19 AM"],
      ["GET /api/v1/documents", "GET", "200", "124 ms", "19 Aug 2026, 10:14 AM"],
    ],
    "Support Tickets": [
      ["TKT-1042", "Video session unable to connect", "High", "Open", "Anita Kumari"],
      ["TKT-1041", "Document upload validation", "Medium", "In Progress", "John Operator"],
      ["TKT-1040", "Email notification delayed", "Low", "Resolved", "Support Team"],
    ],
    "Activity Logs": [
      ["19 Aug 2026, 10:31 AM", "Admin", "Updated notification settings", "Configuration"],
      ["19 Aug 2026, 10:22 AM", "John Operator", "Completed KYC session", "Sessions"],
      ["19 Aug 2026, 10:12 AM", "Admin", "Created operator account", "Users"],
    ],
    "Escalation": [
      ["ESC-2026-041", "Session review", "High", "Compliance Team", "Open"],
      ["ESC-2026-040", "Document mismatch", "Medium", "Senior Reviewer", "In Review"],
      ["ESC-2026-039", "Customer complaint", "Low", "Operations", "Resolved"],
    ],
    "Operator Performance": [
      ["John Operator", "120", "98", "4.8", "96%"],
      ["Anita Kumari", "110", "88", "4.7", "90%"],
      ["Neha Gupta", "85", "70", "4.4", "88%"],
    ],
    "Operator Admin": [
      ["John Operator", "Operator", "Head Office", "Active", "08:30 AM - 05:30 PM"],
      ["Priya Singh", "Operator", "Delhi Branch", "Active", "09:00 AM - 06:00 PM"],
      ["Neha Gupta", "Operator", "Mumbai Branch", "Active", "09:00 AM - 06:00 PM"],
    ],
    "System Health": [
      ["API Gateway", "Operational", "99.99%", "42 ms"],
      ["Video Service", "Operational", "99.97%", "68 ms"],
      ["Database", "Operational", "99.99%", "21 ms"],
      ["Notification Service", "Degraded", "99.81%", "184 ms"],
    ],
    "Database Management": [
      ["video_kyc_primary", "PostgreSQL", "42.6 GB", "Healthy", "Primary"],
      ["video_kyc_replica", "PostgreSQL", "42.4 GB", "Healthy", "Replica"],
      ["audit_archive", "PostgreSQL", "18.2 GB", "Healthy", "Archive"],
    ],
    "Backup and Restore": [
      ["BK-20260819-0200", "Full Backup", "19 Aug 2026, 02:00 AM", "42.8 GB", "Completed"],
      ["BK-20260818-0200", "Full Backup", "18 Aug 2026, 02:00 AM", "42.5 GB", "Completed"],
      ["BK-20260817-1400", "Incremental", "17 Aug 2026, 02:00 PM", "4.7 GB", "Completed"],
    ],
  };

  const featureHeaders = {
    "API Logs": ["Endpoint", "Method", "Status", "Response Time", "Date & Time"],
    "Support Tickets": ["Ticket", "Subject", "Priority", "Status", "Assigned To"],
    "Activity Logs": ["Date & Time", "User", "Activity", "Module"],
    "Escalation": ["Reference", "Type", "Priority", "Assigned To", "Status"],
    "Operator Performance": ["Operator", "Sessions", "Completed", "Rating", "SLA"],
    "Operator Admin": ["Operator", "Role", "Branch", "Status", "Shift"],
    "System Health": ["Service", "Status", "Uptime", "Latency"],
    "Database Management": ["Database", "Engine", "Size", "Status", "Role"],
    "Backup and Restore": ["Backup ID", "Type", "Created", "Size", "Status"],
  };

  const featureDescriptions = {
    "System Notification": "Manage system-wide notices, alerts, and administrative announcements.",
    "Data Privacy": "Review privacy controls, consent handling, masking, and personal-data safeguards.",
    "Compliance Overview": "Track compliance posture, controls, reviews, and outstanding actions.",
    "Risk Assessment": "Review operational, security, and KYC risk indicators and assessments.",
    "Operator Dashboard": "Monitor operator availability, workload, session progress, and service levels.",
    "My Profile": "View and maintain your administrator profile and account preferences.",
    "Help and Documentation": "Access product guidance, operating procedures, and support documentation.",
    "License Management": "Review active licenses, assigned seats, renewal dates, and usage.",
    "Data Retention Policy": "Configure retention periods for sessions, documents, logs, and backups.",
    "Storage Management": "Monitor storage consumption, quotas, archives, and cleanup policies.",
    "SMS Notification": "Configure SMS delivery, sender identity, templates, and event triggers.",
    "Email Notification": "Configure email delivery, sender settings, templates, and event triggers.",
  };

  const renderFeaturePage = (title) => {
    const rows = featureRows[title];
    const headers = featureHeaders[title];
    const description = featureDescriptions[title] || `Manage and monitor ${title.toLowerCase()} from this administration section.`;

    return (
      <>
        <PageHeader
          title={title}
          action={<button type="button" className="admin-primary-button">Refresh</button>}
        />

        <div className="admin-feature-summary-grid">
          <article className="admin-feature-summary-card">
            <span>Status</span>
            <strong>Active</strong>
            <small>Service available</small>
          </article>
          <article className="admin-feature-summary-card">
            <span>Today</span>
            <strong>128</strong>
            <small>Recorded events</small>
          </article>
          <article className="admin-feature-summary-card">
            <span>Attention</span>
            <strong>3</strong>
            <small>Items require review</small>
          </article>
        </div>

        <section className="admin-card admin-feature-card">
          <div className="admin-feature-intro">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          {rows && headers ? (
            <div className="admin-table-wrapper">
              <table className="admin-table admin-feature-table">
                <thead>
                  <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={`${title}-${rowIndex}`}>
                      {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-feature-controls">
              <label className="admin-setting-row">
                <span>Module Status</span>
                <select defaultValue="Enabled">
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </label>
              <label className="admin-setting-row">
                <span>Review Frequency</span>
                <select defaultValue="Daily">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </label>
              <label className="admin-setting-row">
                <span>Administrator Notes</span>
                <input placeholder={`Add notes for ${title}`} />
              </label>
            </div>
          )}
        </section>
      </>
    );
  };

  const renderContent = () => {
    if (!activeAdminSection) {
      return (
        <section className="admin-card admin-no-access">
          <h2>No Administration access</h2>
          <p>The current role does not have permission to display any Administration section.</p>
        </section>
      );
    }

    const sectionConfig = visibleAdminSections.find((item) => item.name === activeAdminSection);
    if (sectionConfig?.menuOnly) {
      return renderMenuOnlyPage(activeAdminSection);
    }

    switch (activeAdminSection) {
      case "Audit Dashboard":
        return renderAuditDashboard();
      case "Integrations":
        return renderIntegrationHealth();
      case "Usage Analytics":
        return renderMobileUsage();
      case "Risk Assessment":
        return renderRiskAssessmentPage();
      case "Compliance Overview":
        return renderCompliancePage();
      case "System Notification":
        return renderSystemNotificationsPage();
      case "Data Privacy":
        return renderPrivacyPage();
      case "Escalation":
        return renderEscalationPage();
      case "Operator Performance":
        return renderOperatorPerformancePage();
      case "Operator Dashboard":
        return renderOperatorDashboardPage();
      case "API Logs":
        return renderApiLogsPage();
      case "Storage Management":
        return renderStoragePage();
      case "Data Retention Policy":
        return renderRetentionPage();
      case "Backup and Restore":
        return renderBackupPage();
      case "SMS Notification":
        return renderCommunicationPage("SMS");
      case "Email Notification":
        return renderCommunicationPage("Email");
      case "My Profile":
        return renderProfilePage();
      case "Help and Documentation":
        return renderHelpPage();
      case "License Management":
        return renderLicensePage();
      case "User":
        return renderUsers();
      case "Role":
        return renderRoles();
      case "Services":
        return renderServices();
      case "Document":
        return renderDocuments();
      case "Email Template":
        return renderEmailTemplates();
      case "Setting":
      case "Configuration Settings":
        return renderSettings(activeAdminSection);
      case "Notification Settings":
        return renderSettings("Notification Settings", "Notifications");
      case "Security Settings":
        return renderSettings("Security Settings", "Security");
      case "Integration Settings":
        return renderSettings("Integration Settings", "Integrations");
      default:
        return renderFeaturePage(activeAdminSection);
    }
  };

  return (
    <div className="administration-page">
      {renderSidebar()}

      <main className="administration-main">
        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}