import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

import {
  PERMISSIONS,
  getCurrentRole,
  hasPermission,
} from "./role";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [currentRole] = useState(() => getCurrentRole());
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [office, setOffice] = useState("Head Office");
  const [notificationOpen, setNotificationOpen] = useState(false);

//Notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Customer joined waiting room",
      message:
        "Rahul Sharma is waiting to start the Video KYC session.",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Appointment starting soon",
      message:
        "Your appointment with Priya Singh starts in 15 minutes.",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 3,
      title: "New instant session request",
      message:
        "A new instant Video KYC request REF123459 has been received.",
      time: "12 min ago",
      unread: true,
    },
    {
      id: 4,
      title: "Document received",
      message:
        "Amit Kumar uploaded the requested identification document.",
      time: "25 min ago",
      unread: true,
    },
    {
      id: 5,
      title: "Session requires attention",
      message:
        "Session REF123458 requires additional KYC verification.",
      time: "40 min ago",
      unread: true,
    },
    {
      id: 6,
      title: "Session completed",
      message:
        "Session REF123451 with Sita Devi was successfully completed.",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 7,
      title: "Appointment rescheduled",
      message:
        "Neha Gupta rescheduled her Video KYC appointment.",
      time: "2 hours ago",
      unread: false,
    },
  ]);

  const notificationCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  //dashboard data
  const overviewCards = [
    {
      number: 12,
      label: "Total Sessions",
      className: "total-card",
    },
    {
      number: 8,
      label: "Completed",
      className: "completed-card",
    },
    {
      number: 3,
      label: "In Progress",
      className: "progress-card",
    },
    {
      number: 5,
      label: "Upcoming",
      className: "upcoming-card",
    },
    {
      number: 2,
      label: "Cancelled",
      className: "cancelled-card",
    },
  ];

  //Appointment data 
  const appointments = [
    {
      time: "10:00 AM",
      customer: "Rahul Sharma",
      purpose: "Account Opening",
      operator: "John Operator",
      status: "Upcoming",
    },
    {
      time: "11:30 AM",
      customer: "Priya Singh",
      purpose: "Loan Application",
      operator: "John Operator",
      status: "Upcoming",
    },
    {
      time: "02:00 PM",
      customer: "Amit Kumar",
      purpose: "KYC Update",
      operator: "John Operator",
      status: "Upcoming",
    },
  ];

  const pendingSessions = [
    {
      reference: "REF123456",
      time: "10:15 AM",
      status: "Waiting for customer",
    },
    {
      reference: "REF123457",
      time: "11:05 AM",
      status: "Email sent",
    },
    {
      reference: "REF123458",
      time: "11:20 AM",
      status: "Link expired",
    },
  ];

  const recentSessions = [
    {
      reference: "REF123450",
      customer: "Rahul Sharma",
      status: "Completed",
    },
    {
      reference: "REF123451",
      customer: "Sita Devi",
      status: "Completed",
    },
    {
      reference: "REF123452",
      customer: "Neha Gupta",
      status: "Completed",
    },
  ];

  //SIDEBAR MENU
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

  //sidebar navig
  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    navigate(item.route);
  };

  //logout
  const handleLogout = () => {
    navigate("/login");
  };

 //Viewing all button
  const handleViewAllAppointments = () => {
    navigate("/appointments");
  };

  const handleViewAllPending = () => {
    navigate("/session");
  };

  const handleViewAllRecent = () => {
    navigate("/session");
  };

  //notification function
  const handleNotifications = () => {
    setNotificationOpen(true);
  };

  const handleCloseNotifications = () => {
    setNotificationOpen(false);
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  //session reference click
  const handleSessionClick = (reference) => {
    console.log("Selected session:", reference);
    navigate("/session");
  };

  return (
    <div className="operator-dashboard-page">
      <div className="operator-dashboard-container">

        <aside className="dashboard-sidebar">
          <div className="sidebar-top">

            <div className="sidebar-brand">
              <img
                src="/logo2.png"
                alt="Video KYC"
                className="sidebar-logo"
              />

              <span>Video KYC</span>
            </div>

            <div
              style={{
                margin: "-14px 22px 18px",
                padding: "8px 10px",
                border: "1px solid rgba(255,255,255,.18)",
                borderRadius: "8px",
                background: "rgba(255,255,255,.07)",
                color: "#dce9f8",
                fontSize: "12px",
              }}
            >
              Signed in as:{" "}
              <strong style={{ color: "#ffffff" }}>
                {currentRole}
              </strong>
            </div>

            <nav className="sidebar-menu">
              {visibleMenuItems.map((item) => {
                const isActive =
                  activeMenu === item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    className={
                      isActive
                        ? "sidebar-menu-item active"
                        : "sidebar-menu-item"
                    }
                    onClick={() =>
                      handleMenuClick(item)
                    }
                  >
                    <span className="sidebar-menu-icon">
                      <img
                        src={item.icon}
                        alt={`${item.name} icon`}
                      />
                    </span>

                    <span className="sidebar-menu-label">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <span className="logout-icon">
              ◉
            </span>

            <span>Logout</span>
          </button>
        </aside>

        <main className="dashboard-main">
        
        <header className="dashboard-header">

            <div className="header-welcome">
              <img
                src="/logo2.png"
                alt="Bank"
                className="header-bank-logo"
              />

              <span>
                Welcome, John Operator
              </span>
            </div>

            <div className="header-actions">

              <select
                className="office-select"
                value={office}
                onChange={(event) =>
                  setOffice(event.target.value)
                }
              >
                <option>
                  Head Office
                </option>

                <option>
                  Kathmandu Branch
                </option>

                <option>
                  Pokhara Branch
                </option>
              </select>

              <button
                type="button"
                className="notification-button"
                onClick={handleNotifications}
                aria-label={`${notificationCount} notifications`}
              >
                <img
                  src="/bell.png"
                  alt="Notifications"
                  className="notification-bell-image"
                />

                {notificationCount > 0 && (
                  <span className="notification-badge">
                    {notificationCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                className="operator-avatar"
                aria-label="Operator profile"
              >
                JO
              </button>
            </div>
          </header>

          <div className="dashboard-content">
          <section className="overview-section">
              <h1>
                Overview
              </h1>

              <p>
                Today, 14 August 2026
              </p>
            </section>
            
            <section className="overview-cards">
              {overviewCards.map((card) => (
                <div
                  key={card.label}
                  className={`overview-card ${card.className}`}
                >
                  <strong>
                    {card.number}
                  </strong>

                  <span>
                    {card.label}
                  </span>
                </div>
              ))}
            </section>

            /*  TODAY'S APPOINTMENTS */

            <section className="dashboard-card appointments-card">

              <div className="dashboard-card-header">
                <h2>
                  Today's Appointments
                </h2>

                <button
                  type="button"
                  onClick={handleViewAllAppointments}
                >
                  View All
                </button>
              </div>

              <div className="appointments-table-wrapper">
                <table className="appointments-table">

                  <thead>
                    <tr>
                      <th>
                        Time
                      </th>

                      <th>
                        Customer
                      </th>

                      <th>
                        Purpose
                      </th>

                      <th>
                        Operator
                      </th>

                      <th>
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map(
                      (appointment, index) => (
                        <tr key={index}>

                          <td>
                            {appointment.time}
                          </td>

                          <td>
                            {appointment.customer}
                          </td>

                          <td>
                            {appointment.purpose}
                          </td>

                          <td>
                            {appointment.operator}
                          </td>

                          <td>
                            <span className="appointment-status">
                              {appointment.status}
                            </span>
                          </td>

                        </tr>
                      )
                    )}
                  </tbody>

                </table>
              </div>
            </section>

            <section className="bottom-dashboard-grid">

             //pending sessions
              <div className="dashboard-card pending-card">

                <div className="dashboard-card-header">
                  <h2>
                    Pending Sessions
                  </h2>

                  <button
                    type="button"
                    onClick={handleViewAllPending}
                  >
                    View All
                  </button>
                </div>

                <div className="session-list">
                  {pendingSessions.map(
                    (session) => (
                      <div
                        className="pending-session-row"
                        key={session.reference}
                      >

                        <button
                          type="button"
                          className="reference-button"
                          onClick={() =>
                            handleSessionClick(
                              session.reference
                            )
                          }
                        >
                          {session.reference}
                        </button>

                        <span className="session-time">
                          {session.time}
                        </span>

                        <span className="pending-status">
                          {session.status}
                        </span>

                      </div>
                    )
                  )}
                </div>
              </div>

  //recent sessions
              <div className="dashboard-card recent-card">

                <div className="dashboard-card-header">
                  <h2>
                    Recent Sessions
                  </h2>

                  <button
                    type="button"
                    onClick={handleViewAllRecent}
                  >
                    View All
                  </button>
                </div>

                <div className="session-list">
                  {recentSessions.map(
                    (session) => (
                      <div
                        className="recent-session-row"
                        key={session.reference}
                      >

                        <button
                          type="button"
                          className="reference-button"
                          onClick={() =>
                            handleSessionClick(
                              session.reference
                            )
                          }
                        >
                          {session.reference}
                        </button>

                        <span className="recent-customer">
                          {session.customer}
                        </span>

                        <span className="completed-status">
                          {session.status}
                        </span>

                      </div>
                    )
                  )}
                </div>

              </div>
            </section>

          </div>
        </main>
      </div>

    // NOTIFICATION OVERLAY
      <div
        className={
          notificationOpen
            ? "notification-overlay show"
            : "notification-overlay"
        }
        onClick={handleCloseNotifications}
      />

      <aside
        className={
          notificationOpen
            ? "notification-drawer open"
            : "notification-drawer"
        }
      >

        <div className="notification-drawer-header">

          <div>
            <h2>
              Notifications
            </h2>

            <p>
              {notificationCount} unread notifications
            </p>
          </div>

          <button
            type="button"
            className="notification-close-button"
            onClick={handleCloseNotifications}
          >
            ×
          </button>

        </div>

        <div className="notification-actions">

          <button
            type="button"
            className="mark-read-button"
            onClick={handleMarkAllRead}
          >
            Mark all as read
          </button>

        </div>

// NOTIFICATION LIST
        <div className="notification-list">

          {notifications.map(
            (notification) => (
              <button
                type="button"
                key={notification.id}
                className={
                  notification.unread
                    ? "notification-item unread"
                    : "notification-item"
                }
                onClick={() =>
                  handleNotificationClick(
                    notification.id
                  )
                }
              >

                {/* ICON */}

                <div className="notification-item-icon">
                  <img
                    src="/bell.png"
                    alt=""
                  />
                </div>

                {/* CONTENT */}

                <div className="notification-item-content">

                  <div className="notification-title-row">

                    <h3>
                      {notification.title}
                    </h3>

                    {notification.unread && (
                      <span className="unread-dot" />
                    )}

                  </div>

                  <p>
                    {notification.message}
                  </p>

                  <span className="notification-time">
                    {notification.time}
                  </span>

                </div>

              </button>
            )
          )}

        </div>

      </aside>

    </div>
  );
}