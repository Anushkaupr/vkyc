// =========================================================
// VIDEO KYC - ROLE BASED ACCESS CONTROL
// Updated for the final Reports + Administration menus
// =========================================================

export const ROLES = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  OPERATOR: "Operator",
  REVIEWER: "Reviewer",
  AUDITOR: "Auditor",
  VIEWER: "Viewer",
  CUSTOMER: "Customer",
};

export const PERMISSIONS = {
  // =======================================================
  // MAIN NAVIGATION
  // =======================================================
  DASHBOARD: "nav.dashboard",
  APPOINTMENTS: "nav.appointments",
  INSTANT_SESSION: "nav.instant_session",
  CUSTOMERS: "nav.customers",
  SESSIONS: "nav.sessions",
  REPORTS: "nav.reports",
  ADMINISTRATION: "nav.administration",

  // =======================================================
  // REPORTS
  // =======================================================
  REPORT_ANALYTICS: "reports.analytics",
  REPORT_SESSION_REPORTS: "reports.session_reports",
  REPORT_OPERATOR_PERFORMANCE: "reports.operator_performance",
  REPORT_AUDIT_LOG: "reports.audit_log",
  REPORT_LIVE_MONITOR: "reports.live_monitor",
  REPORT_AI_INSIGHTS: "reports.ai_insights",
  REPORT_FEEDBACK: "reports.feedback",

  REPORT_INSTRUCTION_PANEL:
    "reports.instruction_panel",

  REPORT_SESSION_COMPLETION:
    "reports.session_completion_summary",

  REPORT_DEVICE_ANALYTICS:
    "reports.device_analytics",

  REPORT_AUDIT_TRAIL:
    "reports.audit_trail",

  REPORT_USAGE_ANALYTICS:
    "reports.usage_analytics",

  REPORT_EXPORT:
    "reports.export",

  // Kept so older code does not break
  REPORT_RISK_ASSESSMENT:
    "reports.risk_assessment",

  REPORT_COMPLIANCE:
    "reports.compliance",

  // =======================================================
  // ADMINISTRATION - CORE MANAGEMENT
  // =======================================================
  ADMIN_USERS:
    "administration.users",

  ADMIN_ROLES:
    "administration.roles",

  ADMIN_BRANCHES:
    "administration.branches",

  ADMIN_SERVICES:
    "administration.services",

  ADMIN_DOCUMENTS:
    "administration.documents",

  ADMIN_EMAIL_TEMPLATES:
    "administration.email_templates",

  // Parent sections
  ADMIN_NOTIFICATIONS:
    "administration.notifications",

  ADMIN_SETTINGS:
    "administration.settings",

  ADMIN_INTEGRATIONS:
    "administration.integrations",

  // =======================================================
  // ADMINISTRATION - PLATFORM / ANALYTICS
  // =======================================================
  ADMIN_APP_PERFORMANCE:
    "administration.app_performance",

  ADMIN_USAGE_ANALYTICS:
    "administration.usage_analytics",

  ADMIN_DEVICE_ANALYTICS:
    "administration.device_analytics",

  ADMIN_WEBHOOKS:
    "administration.webhooks",

  ADMIN_API_LOGS:
    "administration.api_logs",

  ADMIN_AUDIT_TRAIL:
    "administration.audit_trail",

  ADMIN_AUDIT_DASHBOARD:
    "administration.audit_dashboard",

  // =======================================================
  // ADMINISTRATION - RISK / COMPLIANCE / PRIVACY
  // =======================================================
  ADMIN_RISK_ASSESSMENT:
    "administration.risk_assessment",

  ADMIN_COMPLIANCE:
    "administration.compliance",

  ADMIN_DATA_PRIVACY:
    "administration.data_privacy",

  ADMIN_ESCALATIONS:
    "administration.escalations",

  ADMIN_ESCALATOR:
    "administration.escalator",

  // =======================================================
  // ADMINISTRATION - OPERATOR MANAGEMENT
  // =======================================================
  ADMIN_OPERATOR_DASHBOARD:
    "administration.operator_dashboard",

  ADMIN_OPERATOR_SCHEDULE:
    "administration.operator_schedule",

  ADMIN_OPERATOR_PERFORMANCE:
    "administration.operator_performance",

  ADMIN_OPERATOR_ADMIN:
    "administration.operator_admin",

  // =======================================================
  // ADMINISTRATION - NOTIFICATIONS
  // =======================================================
  ADMIN_SYSTEM_NOTIFICATIONS:
    "administration.system_notifications",

  ADMIN_EMAIL_NOTIFICATIONS:
    "administration.email_notifications",

  ADMIN_SMS_NOTIFICATIONS:
    "administration.sms_notifications",

  // =======================================================
  // ADMINISTRATION - SUPPORT / PROFILE / OPERATIONS
  // =======================================================
  ADMIN_MY_PROFILE:
    "administration.my_profile",

  ADMIN_RETROS:
    "administration.retros",

  ADMIN_HELP_DOCUMENTATION:
    "administration.help_documentation",

  ADMIN_SYSTEM_HEALTH:
    "administration.system_health",

  ADMIN_SUPPORT_TICKETS:
    "administration.support_tickets",

  ADMIN_ACTIVITY_LOGS:
    "administration.activity_logs",

  ADMIN_LICENSE_MANAGEMENT:
    "administration.license_management",

  ADMIN_DATABASE_MANAGEMENT:
    "administration.database_management",

  ADMIN_DATA_EXPORT:
    "administration.data_export",

  // =======================================================
  // ADMINISTRATION SETTINGS
  // =======================================================
  SETTINGS_GENERAL:
    "settings.general",

  SETTINGS_SESSION:
    "settings.session",

  SETTINGS_SECURITY:
    "settings.security",

  SETTINGS_NOTIFICATIONS:
    "settings.notifications",

  SETTINGS_INTEGRATIONS:
    "settings.integrations",

  SETTINGS_STORAGE:
    "settings.storage",

  SETTINGS_RETENTION:
    "settings.retention",

  SETTINGS_BACKUP:
    "settings.backup",

  SETTINGS_COMPLIANCE:
    "settings.compliance",
};

// =========================================================
// FEATURE GROUPS
// These become the permission checkboxes in Role Management
// =========================================================

export const FEATURE_GROUPS = [
  {
    key: "mainNavigation",
    label: "Main Navigation",

    features: [
      {
        permission:
          PERMISSIONS.DASHBOARD,
        label: "Dashboard",
      },

      {
        permission:
          PERMISSIONS.APPOINTMENTS,
        label: "Appointments",
      },

      {
        permission:
          PERMISSIONS.INSTANT_SESSION,
        label: "Instant Session",
      },

      {
        permission:
          PERMISSIONS.CUSTOMERS,
        label: "Customers",
      },

      {
        permission:
          PERMISSIONS.SESSIONS,
        label: "Sessions",
      },

      {
        permission:
          PERMISSIONS.REPORTS,
        label: "Reports",
      },

      {
        permission:
          PERMISSIONS.ADMINISTRATION,
        label: "Administration",
      },
    ],
  },

  // =====================================================
  // REPORTS
  // =====================================================

  {
    key: "reports",
    label: "Reports",

    features: [
      {
        permission:
          PERMISSIONS.REPORT_ANALYTICS,
        label:
          "Analytics Dashboard",
      },

      {
        permission:
          PERMISSIONS.REPORT_SESSION_REPORTS,
        label:
          "Session Reports",
      },

      {
        permission:
          PERMISSIONS.REPORT_OPERATOR_PERFORMANCE,
        label:
          "Operator Performance",
      },

      {
        permission:
          PERMISSIONS.REPORT_AUDIT_LOG,
        label:
          "System Audit Log",
      },

      {
        permission:
          PERMISSIONS.REPORT_LIVE_MONITOR,
        label:
          "KYC Session Monitoring / Live Monitor",
      },

      {
        permission:
          PERMISSIONS.REPORT_AI_INSIGHTS,
        label:
          "AI Verification Insights",
      },

      {
        permission:
          PERMISSIONS.REPORT_FEEDBACK,
        label:
          "Feedback & Ratings",
      },

      {
        permission:
          PERMISSIONS.REPORT_INSTRUCTION_PANEL,
        label:
          "Instruction Panel",
      },

      {
        permission:
          PERMISSIONS.REPORT_SESSION_COMPLETION,
        label:
          "Session Completion Summary",
      },

      {
        permission:
          PERMISSIONS.REPORT_DEVICE_ANALYTICS,
        label:
          "Device Analytics",
      },

      {
        permission:
          PERMISSIONS.REPORT_AUDIT_TRAIL,
        label:
          "Audit Trail",
      },

      {
        permission:
          PERMISSIONS.REPORT_USAGE_ANALYTICS,
        label:
          "Usage Analytics",
      },

      {
        permission:
          PERMISSIONS.REPORT_EXPORT,
        label:
          "Export",
      },
    ],
  },

  // =====================================================
  // ADMINISTRATION - MANAGEMENT
  // =====================================================

  {
    key: "administrationCore",
    label:
      "Administration - Management",

    features: [
      {
        permission:
          PERMISSIONS.ADMIN_USERS,
        label:
          "User Management",
      },

      {
        permission:
          PERMISSIONS.ADMIN_ROLES,
        label:
          "Role Management",
      },

      {
        permission:
          PERMISSIONS.ADMIN_BRANCHES,
        label:
          "Branches",
      },

      {
        permission:
          PERMISSIONS.ADMIN_SERVICES,
        label:
          "Service Management",
      },

      {
        permission:
          PERMISSIONS.ADMIN_DOCUMENTS,
        label:
          "Document Management / Configuration",
      },

      {
        permission:
          PERMISSIONS.ADMIN_EMAIL_TEMPLATES,
        label:
          "Email Template Management",
      },

      {
        permission:
          PERMISSIONS.ADMIN_SETTINGS,
        label:
          "Setting / Configuration Settings",
      },

      {
        permission:
          PERMISSIONS.ADMIN_INTEGRATIONS,
        label:
          "Integration Health",
      },
    ],
  },

  // =====================================================
  // ADMINISTRATION - PLATFORM
  // =====================================================

  {
    key: "administrationPlatform",
    label:
      "Administration - Platform & Analytics",

    features: [
      {
        permission:
          PERMISSIONS.ADMIN_APP_PERFORMANCE,
        label:
          "App Performance",
      },

      {
        permission:
          PERMISSIONS.ADMIN_USAGE_ANALYTICS,
        label:
          "Mobile App Usage",
      },

      {
        permission:
          PERMISSIONS.ADMIN_DEVICE_ANALYTICS,
        label:
          "Device Analytics",
      },

      {
        permission:
          PERMISSIONS.ADMIN_WEBHOOKS,
        label:
          "Webhook Configuration",
      },

      {
        permission:
          PERMISSIONS.ADMIN_API_LOGS,
        label:
          "API Logs",
      },

      {
        permission:
          PERMISSIONS.ADMIN_AUDIT_TRAIL,
        label:
          "Audit Trail",
      },

      {
        permission:
          PERMISSIONS.ADMIN_AUDIT_DASHBOARD,
        label:
          "System Audit Dashboard",
      },

      {
        permission:
          PERMISSIONS.ADMIN_SYSTEM_HEALTH,
        label:
          "System Health Dashboard",
      },

      {
        permission:
          PERMISSIONS.ADMIN_ACTIVITY_LOGS,
        label:
          "Activity Log",
      },

      {
        permission:
          PERMISSIONS.ADMIN_DATABASE_MANAGEMENT,
        label:
          "Database Management",
      },

      {
        permission:
          PERMISSIONS.ADMIN_LICENSE_MANAGEMENT,
        label:
          "License Management",
      },

      {
        permission:
          PERMISSIONS.ADMIN_DATA_EXPORT,
        label:
          "Data Export",
      },
    ],
  },

  // =====================================================
  // RISK / COMPLIANCE / PRIVACY
  // =====================================================

  {
    key: "administrationRisk",
    label:
      "Administration - Risk, Compliance & Privacy",

    features: [
      {
        permission:
          PERMISSIONS.ADMIN_RISK_ASSESSMENT,
        label:
          "Risk Assessment",
      },

      {
        permission:
          PERMISSIONS.ADMIN_COMPLIANCE,
        label:
          "Compliance Overview",
      },

      {
        permission:
          PERMISSIONS.ADMIN_DATA_PRIVACY,
        label:
          "Data Privacy Requests",
      },

      {
        permission:
          PERMISSIONS.ADMIN_ESCALATIONS,
        label:
          "Escalation Management",
      },

      {
        permission:
          PERMISSIONS.ADMIN_ESCALATOR,
        label:
          "Escalator",
      },
    ],
  },

  // =====================================================
  // OPERATOR
  // =====================================================

  {
    key: "administrationOperator",
    label:
      "Administration - Operator",

    features: [
      {
        permission:
          PERMISSIONS.ADMIN_OPERATOR_DASHBOARD,
        label:
          "Operator Dashboard",
      },

      {
        permission:
          PERMISSIONS.ADMIN_OPERATOR_SCHEDULE,
        label:
          "Operator Schedule",
      },

      {
        permission:
          PERMISSIONS.ADMIN_OPERATOR_PERFORMANCE,
        label:
          "Operator Performance Details",
      },

      {
        permission:
          PERMISSIONS.ADMIN_OPERATOR_ADMIN,
        label:
          "Operator Admin",
      },
    ],
  },

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  {
    key:
      "administrationCommunication",

    label:
      "Administration - Notifications & Communication",

    features: [
      {
        permission:
          PERMISSIONS.ADMIN_NOTIFICATIONS,
        label:
          "Notifications",
      },

      {
        permission:
          PERMISSIONS.ADMIN_SYSTEM_NOTIFICATIONS,
        label:
          "System Notifications",
      },

      {
        permission:
          PERMISSIONS.ADMIN_EMAIL_NOTIFICATIONS,
        label:
          "Email Notifications",
      },

      {
        permission:
          PERMISSIONS.ADMIN_SMS_NOTIFICATIONS,
        label:
          "SMS Notifications",
      },
    ],
  },

  // =====================================================
  // PROFILE / HELP / SUPPORT
  // =====================================================

  {
    key:
      "administrationSupport",

    label:
      "Administration - Account & Support",

    features: [
      {
        permission:
          PERMISSIONS.ADMIN_MY_PROFILE,
        label:
          "My Profile / Account Profile",
      },

      {
        permission:
          PERMISSIONS.ADMIN_RETROS,
        label:
          "Retros",
      },

      {
        permission:
          PERMISSIONS.ADMIN_HELP_DOCUMENTATION,
        label:
          "Help & Documentation",
      },

      {
        permission:
          PERMISSIONS.ADMIN_SUPPORT_TICKETS,
        label:
          "Customer Support Tickets",
      },
    ],
  },

  // =====================================================
  // SETTINGS
  // =====================================================

  {
    key: "settings",
    label:
      "Administration Settings",

    features: [
      {
        permission:
          PERMISSIONS.SETTINGS_GENERAL,
        label:
          "General Settings",
      },

      {
        permission:
          PERMISSIONS.SETTINGS_SESSION,
        label:
          "Session Settings",
      },

      {
        permission:
          PERMISSIONS.SETTINGS_SECURITY,
        label:
          "Security Settings",
      },

      {
        permission:
          PERMISSIONS.SETTINGS_NOTIFICATIONS,
        label:
          "Notification Settings",
      },

      {
        permission:
          PERMISSIONS.SETTINGS_INTEGRATIONS,
        label:
          "Integration Settings",
      },

      {
        permission:
          PERMISSIONS.SETTINGS_STORAGE,
        label:
          "Storage Management",
      },

      {
        permission:
          PERMISSIONS.SETTINGS_RETENTION,
        label:
          "Data Retention Policy",
      },

      {
        permission:
          PERMISSIONS.SETTINGS_BACKUP,
        label:
          "Backup & Restore",
      },

      {
        permission:
          PERMISSIONS.SETTINGS_COMPLIANCE,
        label:
          "Compliance Settings",
      },
    ],
  },
];

// =========================================================
// LEGACY PERMISSIONS
// =========================================================

const LEGACY_PERMISSIONS = [
  PERMISSIONS.REPORT_RISK_ASSESSMENT,
  PERMISSIONS.REPORT_COMPLIANCE,
];

// =========================================================
// ALL PERMISSIONS
// =========================================================

export const ALL_PERMISSIONS = [
  ...new Set([
    ...FEATURE_GROUPS.flatMap(
      (group) =>
        group.features.map(
          (feature) =>
            feature.permission
        )
    ),

    ...LEGACY_PERMISSIONS,
  ]),
];

// =========================================================
// LOCAL STORAGE
// =========================================================
//
// V3 is intentional.
// It prevents old role selections from overriding
// all of the newly added permission defaults.
//
// =========================================================

const STORAGE_KEY =
  "videoKycRolePermissionsV3";

const CURRENT_ROLE_KEY =
  "videoKycCurrentRole";

// =========================================================
// REPORT FEATURE COLLECTION
// =========================================================

const REPORT_FEATURES = [
  PERMISSIONS.REPORTS,

  PERMISSIONS.REPORT_ANALYTICS,

  PERMISSIONS.REPORT_SESSION_REPORTS,

  PERMISSIONS.REPORT_OPERATOR_PERFORMANCE,

  PERMISSIONS.REPORT_AUDIT_LOG,

  PERMISSIONS.REPORT_LIVE_MONITOR,

  PERMISSIONS.REPORT_AI_INSIGHTS,

  PERMISSIONS.REPORT_FEEDBACK,

  PERMISSIONS.REPORT_INSTRUCTION_PANEL,

  PERMISSIONS.REPORT_SESSION_COMPLETION,

  PERMISSIONS.REPORT_DEVICE_ANALYTICS,

  PERMISSIONS.REPORT_AUDIT_TRAIL,

  PERMISSIONS.REPORT_USAGE_ANALYTICS,

  PERMISSIONS.REPORT_EXPORT,
];

// =========================================================
// ADMINISTRATION FEATURE COLLECTION
// =========================================================

const ADMIN_FEATURES = [
  PERMISSIONS.ADMINISTRATION,

  // Core
  PERMISSIONS.ADMIN_USERS,
  PERMISSIONS.ADMIN_ROLES,
  PERMISSIONS.ADMIN_BRANCHES,
  PERMISSIONS.ADMIN_SERVICES,
  PERMISSIONS.ADMIN_DOCUMENTS,
  PERMISSIONS.ADMIN_EMAIL_TEMPLATES,

  // Parent sections
  PERMISSIONS.ADMIN_NOTIFICATIONS,
  PERMISSIONS.ADMIN_SETTINGS,
  PERMISSIONS.ADMIN_INTEGRATIONS,

  // Platform
  PERMISSIONS.ADMIN_APP_PERFORMANCE,
  PERMISSIONS.ADMIN_USAGE_ANALYTICS,
  PERMISSIONS.ADMIN_DEVICE_ANALYTICS,
  PERMISSIONS.ADMIN_WEBHOOKS,
  PERMISSIONS.ADMIN_API_LOGS,
  PERMISSIONS.ADMIN_AUDIT_TRAIL,
  PERMISSIONS.ADMIN_AUDIT_DASHBOARD,

  // Risk
  PERMISSIONS.ADMIN_RISK_ASSESSMENT,
  PERMISSIONS.ADMIN_COMPLIANCE,
  PERMISSIONS.ADMIN_DATA_PRIVACY,
  PERMISSIONS.ADMIN_ESCALATIONS,
  PERMISSIONS.ADMIN_ESCALATOR,

  // Operators
  PERMISSIONS.ADMIN_OPERATOR_DASHBOARD,
  PERMISSIONS.ADMIN_OPERATOR_SCHEDULE,
  PERMISSIONS.ADMIN_OPERATOR_PERFORMANCE,
  PERMISSIONS.ADMIN_OPERATOR_ADMIN,

  // Notifications
  PERMISSIONS.ADMIN_SYSTEM_NOTIFICATIONS,
  PERMISSIONS.ADMIN_EMAIL_NOTIFICATIONS,
  PERMISSIONS.ADMIN_SMS_NOTIFICATIONS,

  // Profile / support
  PERMISSIONS.ADMIN_MY_PROFILE,
  PERMISSIONS.ADMIN_RETROS,
  PERMISSIONS.ADMIN_HELP_DOCUMENTATION,
  PERMISSIONS.ADMIN_SYSTEM_HEALTH,
  PERMISSIONS.ADMIN_SUPPORT_TICKETS,
  PERMISSIONS.ADMIN_ACTIVITY_LOGS,
  PERMISSIONS.ADMIN_LICENSE_MANAGEMENT,
  PERMISSIONS.ADMIN_DATABASE_MANAGEMENT,
  PERMISSIONS.ADMIN_DATA_EXPORT,

  // Settings
  PERMISSIONS.SETTINGS_GENERAL,
  PERMISSIONS.SETTINGS_SESSION,
  PERMISSIONS.SETTINGS_SECURITY,
  PERMISSIONS.SETTINGS_NOTIFICATIONS,
  PERMISSIONS.SETTINGS_INTEGRATIONS,
  PERMISSIONS.SETTINGS_STORAGE,
  PERMISSIONS.SETTINGS_RETENTION,
  PERMISSIONS.SETTINGS_BACKUP,
  PERMISSIONS.SETTINGS_COMPLIANCE,
];

// =========================================================
// DEFAULT ROLE PERMISSIONS
// =========================================================

const DEFAULT_ROLE_PERMISSIONS = {
  // =====================================================
  // SUPER ADMIN
  // =====================================================
  [ROLES.SUPER_ADMIN]: ["*"],

  // =====================================================
  // ADMIN
  // Everything
  // =====================================================
  [ROLES.ADMIN]: [
    PERMISSIONS.DASHBOARD,
    PERMISSIONS.APPOINTMENTS,
    PERMISSIONS.INSTANT_SESSION,
    PERMISSIONS.CUSTOMERS,
    PERMISSIONS.SESSIONS,

    ...REPORT_FEATURES,
    ...ADMIN_FEATURES,
  ],

  // =====================================================
  // OPERATOR
  // =====================================================
  [ROLES.OPERATOR]: [
    PERMISSIONS.DASHBOARD,

    PERMISSIONS.APPOINTMENTS,

    PERMISSIONS.INSTANT_SESSION,

    PERMISSIONS.CUSTOMERS,

    PERMISSIONS.SESSIONS,

    // Reports
    PERMISSIONS.REPORTS,

    PERMISSIONS.REPORT_SESSION_REPORTS,

    PERMISSIONS.REPORT_LIVE_MONITOR,

    PERMISSIONS.REPORT_INSTRUCTION_PANEL,

    PERMISSIONS.REPORT_SESSION_COMPLETION,

    // Administration
    PERMISSIONS.ADMINISTRATION,

    PERMISSIONS.ADMIN_OPERATOR_DASHBOARD,

    PERMISSIONS.ADMIN_OPERATOR_SCHEDULE,

    PERMISSIONS.ADMIN_OPERATOR_PERFORMANCE,

    PERMISSIONS.ADMIN_MY_PROFILE,

    PERMISSIONS.ADMIN_HELP_DOCUMENTATION,
  ],

  // =====================================================
  // REVIEWER
  // =====================================================
  [ROLES.REVIEWER]: [
    PERMISSIONS.DASHBOARD,

    PERMISSIONS.CUSTOMERS,

    PERMISSIONS.SESSIONS,

    // Reports
    PERMISSIONS.REPORTS,

    PERMISSIONS.REPORT_SESSION_REPORTS,

    PERMISSIONS.REPORT_AI_INSIGHTS,

    PERMISSIONS.REPORT_FEEDBACK,

    PERMISSIONS.REPORT_SESSION_COMPLETION,

    // Administration
    PERMISSIONS.ADMINISTRATION,

    PERMISSIONS.ADMIN_RISK_ASSESSMENT,

    PERMISSIONS.ADMIN_COMPLIANCE,

    PERMISSIONS.ADMIN_MY_PROFILE,

    PERMISSIONS.ADMIN_HELP_DOCUMENTATION,
  ],

  // =====================================================
  // AUDITOR
  // =====================================================
  [ROLES.AUDITOR]: [
    PERMISSIONS.DASHBOARD,

    // Reports
    PERMISSIONS.REPORTS,

    PERMISSIONS.REPORT_ANALYTICS,

    PERMISSIONS.REPORT_SESSION_REPORTS,

    PERMISSIONS.REPORT_AUDIT_LOG,

    PERMISSIONS.REPORT_AUDIT_TRAIL,

    PERMISSIONS.REPORT_DEVICE_ANALYTICS,

    PERMISSIONS.REPORT_USAGE_ANALYTICS,

    PERMISSIONS.REPORT_EXPORT,

    // Administration
    PERMISSIONS.ADMINISTRATION,

    PERMISSIONS.ADMIN_AUDIT_DASHBOARD,

    PERMISSIONS.ADMIN_AUDIT_TRAIL,

    PERMISSIONS.ADMIN_COMPLIANCE,

    PERMISSIONS.ADMIN_DATA_PRIVACY,

    PERMISSIONS.ADMIN_ACTIVITY_LOGS,

    PERMISSIONS.ADMIN_API_LOGS,

    PERMISSIONS.ADMIN_DATA_EXPORT,

    PERMISSIONS.ADMIN_SYSTEM_HEALTH,

    PERMISSIONS.ADMIN_MY_PROFILE,

    PERMISSIONS.ADMIN_HELP_DOCUMENTATION,
  ],

  // =====================================================
  // VIEWER
  // =====================================================
  [ROLES.VIEWER]: [
    PERMISSIONS.DASHBOARD,

    PERMISSIONS.REPORTS,

    PERMISSIONS.REPORT_ANALYTICS,

    PERMISSIONS.REPORT_SESSION_REPORTS,

    PERMISSIONS.REPORT_OPERATOR_PERFORMANCE,

    PERMISSIONS.REPORT_FEEDBACK,

    PERMISSIONS.REPORT_DEVICE_ANALYTICS,

    PERMISSIONS.REPORT_USAGE_ANALYTICS,
  ],

  // =====================================================
  // CUSTOMER
  // =====================================================
  [ROLES.CUSTOMER]: [],
};

// =========================================================
// ROLE OPTIONS
// =========================================================

export const ROLE_OPTIONS =
  Object.values(ROLES);

// =========================================================
// NORMALIZE ROLE
// =========================================================

export function normalizeRole(role) {
  if (
    role === null ||
    role === undefined
  ) {
    return null;
  }

  const rawRole =
    typeof role === "object"
      ? role.role ??
        role.name ??
        role.value ??
        role.label
      : role;

  if (
    rawRole === null ||
    rawRole === undefined
  ) {
    return null;
  }

  const clean =
    String(rawRole)
      .trim()
      .toLowerCase()
      .replace(/^roles\./, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ");

  if (!clean) {
    return null;
  }

  // Match displayed values:
  // "Super Admin", "Admin", "Operator",
  // "Reviewer", "Auditor", "Viewer", "Customer".
  const valueMatch =
    ROLE_OPTIONS.find(
      (item) =>
        item.toLowerCase() === clean
    );

  if (valueMatch) {
    return valueMatch;
  }

  // Also accept keys/forms such as:
  // SUPER_ADMIN, super_admin, super-admin,
  // AUDITOR, auditor, etc.
  const keyMatch =
    Object.entries(ROLES).find(
      ([key]) =>
        key
          .toLowerCase()
          .replace(/[_-]+/g, " ")
          .replace(/\s+/g, " ") ===
        clean
    );

  return keyMatch?.[1] || null;
}

// =========================================================
// READ STORED PERMISSION MAP
// =========================================================

function readStoredPermissionMap() {
  if (
    typeof window ===
    "undefined"
  ) {
    return {};
  }

  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    return raw
      ? JSON.parse(raw)
      : {};
  } catch (error) {
    console.error(
      "Unable to read role permissions:",
      error
    );

    return {};
  }
}

// =========================================================
// WRITE STORED PERMISSION MAP
// =========================================================

function writeStoredPermissionMap(
  map
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(map)
  );
}

// =========================================================
// AUTOMATICALLY ADD PARENT PERMISSIONS
// =========================================================

function withParentPermissions(
  permissions
) {
  const next =
    new Set(
      Array.isArray(permissions)
        ? permissions
        : []
    );

  // -------------------------------------------------------
  // REPORT CHILD
  // -------------------------------------------------------

  const hasReportChild =
    [...next].some(
      (permission) =>
        String(permission)
          .startsWith(
            "reports."
          )
    );

  if (hasReportChild) {
    next.add(
      PERMISSIONS.REPORTS
    );
  }

  // -------------------------------------------------------
  // ADMINISTRATION CHILD
  // -------------------------------------------------------

  const hasAdminChild =
    [...next].some(
      (permission) =>
        String(permission)
          .startsWith(
            "administration."
          ) ||
        String(permission)
          .startsWith(
            "settings."
          )
    );

  if (hasAdminChild) {
    next.add(
      PERMISSIONS.ADMINISTRATION
    );
  }

  // -------------------------------------------------------
  // SETTINGS CHILD
  // -------------------------------------------------------

  const hasSettingsChild =
    [...next].some(
      (permission) =>
        String(permission)
          .startsWith(
            "settings."
          )
    );

  if (hasSettingsChild) {
    next.add(
      PERMISSIONS.ADMIN_SETTINGS
    );
  }

  // -------------------------------------------------------
  // INTEGRATION CHILDREN
  // -------------------------------------------------------

  if (
    next.has(
      PERMISSIONS.ADMIN_WEBHOOKS
    ) ||
    next.has(
      PERMISSIONS.ADMIN_API_LOGS
    )
  ) {
    next.add(
      PERMISSIONS.ADMIN_INTEGRATIONS
    );

    next.add(
      PERMISSIONS.ADMINISTRATION
    );
  }

  // -------------------------------------------------------
  // NOTIFICATION CHILDREN
  // -------------------------------------------------------

  if (
    next.has(
      PERMISSIONS.ADMIN_SYSTEM_NOTIFICATIONS
    ) ||
    next.has(
      PERMISSIONS.ADMIN_EMAIL_NOTIFICATIONS
    ) ||
    next.has(
      PERMISSIONS.ADMIN_SMS_NOTIFICATIONS
    )
  ) {
    next.add(
      PERMISSIONS.ADMIN_NOTIFICATIONS
    );

    next.add(
      PERMISSIONS.ADMINISTRATION
    );
  }

  return [...next];
}

// =========================================================
// GET PERMISSIONS FOR ROLE
// =========================================================

export function getRolePermissions(
  role
) {
  const normalizedRole =
    normalizeRole(role);

  // Invalid roles never become Super Admin.
  if (!normalizedRole) {
    return [];
  }

  if (
    normalizedRole ===
    ROLES.SUPER_ADMIN
  ) {
    return ["*"];
  }

  const stored =
    readStoredPermissionMap();

  const custom =
    stored[normalizedRole];

  if (
    Array.isArray(custom)
  ) {
    return withParentPermissions(
      custom
    );
  }

  return withParentPermissions(
    DEFAULT_ROLE_PERMISSIONS[
      normalizedRole
    ] || []
  );
}

// =========================================================
// CHECK PERMISSION
// =========================================================

export function hasPermission(
  role,
  permission
) {
  const permissions =
    getRolePermissions(role);

  return (
    permissions.includes("*") ||
    permissions.includes(
      permission
    )
  );
}

// =========================================================
// SAVE CUSTOM ROLE PERMISSIONS
// =========================================================

export function saveRolePermissions(
  role,
  permissions
) {
  const normalizedRole =
    normalizeRole(role);

  if (!normalizedRole) {
    console.error(
      "Cannot save permissions for invalid role:",
      role
    );

    return false;
  }

  // Super Admin can never lose permissions.
  if (
    normalizedRole ===
    ROLES.SUPER_ADMIN
  ) {
    return false;
  }

  const stored =
    readStoredPermissionMap();

  const cleanPermissions =
    withParentPermissions(
      [
        ...new Set(
          Array.isArray(permissions)
            ? permissions
            : []
        ),
      ].filter(
        (permission) =>
          ALL_PERMISSIONS.includes(
            permission
          )
      )
    );

  writeStoredPermissionMap({
    ...stored,

    [normalizedRole]:
      cleanPermissions,
  });

  return true;
}

// =========================================================
// RESET ROLE PERMISSIONS
// =========================================================

export function resetRolePermissions(
  role
) {
  const normalizedRole =
    normalizeRole(role);

  if (!normalizedRole) {
    return false;
  }

  const stored =
    readStoredPermissionMap();

  delete stored[
    normalizedRole
  ];

  writeStoredPermissionMap(
    stored
  );

  return true;
}

// =========================================================
// GET CURRENT ROLE
// =========================================================

export function getCurrentRole() {
  if (
    typeof window ===
    "undefined"
  ) {
    return ROLES.SUPER_ADMIN;
  }

  // -------------------------------------------------------
  // 1. Explicit Video KYC role.
  // This is the primary role used by the frontend.
  // -------------------------------------------------------

  const directRole =
    window.localStorage.getItem(
      CURRENT_ROLE_KEY
    );

  const normalizedDirectRole =
    normalizeRole(directRole);

  if (normalizedDirectRole) {
    return normalizedDirectRole;
  }

  // -------------------------------------------------------
  // 2. Generic role fallback.
  // -------------------------------------------------------

  const simpleRole =
    window.localStorage.getItem(
      "role"
    );

  const normalizedSimpleRole =
    normalizeRole(simpleRole);

  if (normalizedSimpleRole) {
    window.localStorage.setItem(
      CURRENT_ROLE_KEY,
      normalizedSimpleRole
    );

    return normalizedSimpleRole;
  }

  // -------------------------------------------------------
  // 3. Stored user objects.
  // -------------------------------------------------------

  for (const key of [
    "user",
    "currentUser",
    "authUser",
  ]) {
    try {
      const raw =
        window.localStorage.getItem(
          key
        );

      if (!raw) {
        continue;
      }

      const user =
        JSON.parse(raw);

      const normalizedUserRole =
        normalizeRole(
          user?.role
        );

      if (normalizedUserRole) {
        window.localStorage.setItem(
          CURRENT_ROLE_KEY,
          normalizedUserRole
        );

        return normalizedUserRole;
      }
    } catch (error) {
      // Ignore malformed storage.
    }
  }

  // Development fallback
  return ROLES.SUPER_ADMIN;
}

// =========================================================
// SET CURRENT ROLE
// =========================================================

export function setCurrentRole(
  role
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return false;
  }

  const normalizedRole =
    normalizeRole(role);

  if (!normalizedRole) {
    console.error(
      "Invalid role:",
      role
    );

    return false;
  }

  // Keep BOTH keys synchronized.
  window.localStorage.setItem(
    CURRENT_ROLE_KEY,
    normalizedRole
  );

  window.localStorage.setItem(
    "role",
    normalizedRole
  );

  return true;
}

// =========================================================
// CLEAR CURRENT ROLE
// =========================================================

export function clearCurrentRole() {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.localStorage.removeItem(
    CURRENT_ROLE_KEY
  );

  window.localStorage.removeItem(
    "role"
  );
}

// =========================================================
// GET DEFAULT ROLE PERMISSIONS
// =========================================================

export function getDefaultRolePermissions(
  role
) {
  const normalizedRole =
    normalizeRole(role);

  if (!normalizedRole) {
    return [];
  }

  return (
    DEFAULT_ROLE_PERMISSIONS[
      normalizedRole
    ] || []
  );
}

// =========================================================
// DEVELOPMENT CONSOLE ROLE SWITCHER
// =========================================================
//
// USE THESE IN THE BROWSER CONSOLE:
//
// kycRole("Super Admin")
// kycRole("Admin")
// kycRole("Operator")
// kycRole("Reviewer")
// kycRole("Auditor")
// kycRole("Viewer")
// kycRole("Customer")
//
// Check current role:
// kycRole()
//
// Show all roles:
// kycRoles
//
// Inspect permissions:
// getKycPermissions("Auditor")
// =========================================================

if (
  typeof window !== "undefined"
) {
  window.kycRoles = [
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
    ROLES.OPERATOR,
    ROLES.REVIEWER,
    ROLES.AUDITOR,
    ROLES.VIEWER,
    ROLES.CUSTOMER,
  ];

  window.kycRole = (role) => {
    // No argument: return current role
    if (
      role === undefined ||
      role === null ||
      role === ""
    ) {
      const currentRole =
        getCurrentRole();

      console.log(
        "Current KYC role:",
        currentRole
      );

      return currentRole;
    }

    const normalizedRole =
      normalizeRole(role);

    if (!normalizedRole) {
      console.error(
        `Invalid role: "${role}"`
      );

      console.log(
        "Available roles:",
        window.kycRoles
      );

      return false;
    }

    const success =
      setCurrentRole(
        normalizedRole
      );

    if (!success) {
      console.error(
        "Unable to change role."
      );

      return false;
    }

    console.log(
      `Role changed to: ${normalizedRole}`
    );

    // Reload React so all menus/screens
    // recalculate their permissions.
    window.location.reload();

    return true;
  };

  window.getKycRole = () =>
    getCurrentRole();

  window.getKycPermissions = (
    role
  ) => {
    const targetRole =
      normalizeRole(role) ||
      getCurrentRole();

    const permissions =
      getRolePermissions(
        targetRole
      );

    console.log(
      `${targetRole} permissions:`,
      permissions
    );

    return permissions;
  };

  window.setKycRole = (role) =>
    window.kycRole(role);
}