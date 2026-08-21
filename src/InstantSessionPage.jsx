import React from "react";
import { useNavigate } from "react-router-dom";
import "./InstantSessionPage.css";

import {
  PERMISSIONS,
  getCurrentRole,
  hasPermission,
} from "./role";

//navigation and sidebar 
export default function InstantSessionPage() {
  const navigate = useNavigate();
  const currentRole = getCurrentRole();

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

  const visibleMenuItems = menuItems.filter((item) =>
    hasPermission(currentRole, item.permission)
  );

  const handleMenuClick = (item) => {
    navigate(item.route);
  };

  const handleBrandClick = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleStartInstantSession = () => {
    navigate("/workflow?mode=instant");
  };

  const handleOpenCustomers = () => {
    navigate("/workflow");
  };

  const handleOpenSessions = () => {
    navigate("/session");
  };

  return (
    <div className="instant-page">
      <aside className="instant-sidebar">
        <div className="instant-sidebar-top">
          <button
            type="button"
            className="instant-brand"
            onClick={handleBrandClick}
          >
            <img
              src="/logo2.png"
              alt="Video KYC"
            />

            <span>Video KYC</span>
          </button>

          <div className="instant-role-badge">
            Signed in as <strong>{currentRole}</strong>
          </div>

          <nav className="instant-menu">
            {visibleMenuItems.map((item) => {
              const isActive =
                item.name === "Instant Session";

              return (
                <button
                  key={item.name}
                  type="button"
                  className={
                    isActive
                      ? "instant-menu-item active"
                      : "instant-menu-item"
                  }
                  onClick={() =>
                    handleMenuClick(item)
                  }
                >
                  <span className="instant-menu-icon">
                    <img
                      src={item.icon}
                      alt={`${item.name} icon`}
                    />
                  </span>

                  <span className="instant-menu-label">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <button
          type="button"
          className="instant-logout"
          onClick={handleLogout}
        >
          <span className="instant-logout-icon">
            ◉
          </span>

          <span>Logout</span>
        </button>
      </aside>

      <main className="instant-main">
        <div className="instant-content">
          <div className="instant-title">
            <h1>Instant Session</h1>

            <p>
              Start a Video KYC session with a customer immediately.
            </p>
          </div>

          <section className="instant-start-card">
            <div className="instant-start-copy">
              <span className="instant-status-pill">
                Ready to Start
              </span>

              <h2>
                Start a New Instant Session
              </h2>

              <p>
                Search for the customer, select the required
                banking service, review the session details,
                and send the secure Video KYC link.
              </p>

              <button
                type="button"
                className="instant-primary-button"
                onClick={handleStartInstantSession}
              >
                Start Instant Session
                <span>→</span>
              </button>
            </div>

            <div className="instant-process">
              <div className="instant-process-step">
                <span>1</span>

                <div>
                  <strong>Search Customer</strong>
                  <p>
                    Find the customer using CIF,
                    mobile number, or email.
                  </p>
                </div>
              </div>

              <div className="instant-process-line" />

              <div className="instant-process-step">
                <span>2</span>

                <div>
                  <strong>Select Services</strong>
                  <p>
                    Choose the banking services and
                    purpose of the session.
                  </p>
                </div>
              </div>

              <div className="instant-process-line" />

              <div className="instant-process-step">
                <span>3</span>

                <div>
                  <strong>Send Session Link</strong>
                  <p>
                    Review the details and send the
                    secure Video KYC link.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="instant-quick-grid">
            <button
              type="button"
              className="instant-quick-card"
              onClick={handleOpenCustomers}
            >
              <span className="instant-quick-icon">
                <img
                  src="/customer.png"
                  alt=""
                />
              </span>

              <div>
                <strong>Customers</strong>
                <p>
                  Search and view customer profiles.
                </p>
              </div>

              <span className="instant-card-arrow">
                →
              </span>
            </button>

            <button
              type="button"
              className="instant-quick-card"
              onClick={handleOpenSessions}
            >
              <span className="instant-quick-icon">
                <img
                  src="/session.png"
                  alt=""
                />
              </span>

              <div>
                <strong>Sessions</strong>
                <p>
                  View existing and recent sessions.
                </p>
              </div>

              <span className="instant-card-arrow">
                →
              </span>
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}