import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppointmentCalendarPage.css";

export default function AppointmentCalendarPage() {
  const navigate = useNavigate();
  
  const [appointmentView, setAppointmentView] = useState("calendar");

  const [office, setOffice] = useState("Head Office");
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 7, 1)
  );
  const [viewMode, setViewMode] = useState("Month");

  const [formData, setFormData] = useState({
    cif: "",
    customerName: "",
    mobile: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    purpose: "Account Opening",
    operator: "John Operator",
    branch: "Head Office",
    notes: "",
  });
  const menuItems = [
    {
      name: "Dashboard",
      icon: "/dashboard.png",
      route: "/dashboard",
    },
    {
      name: "Appointments",
      icon: "/appointment.png",
      route: "/appointments",
    },
    {
      name: "Instant Session",
      icon: "/instant-session.png",
      route: "/instant-session",
    },
    {
      name: "Customers",
      icon: "/customer.png",
      route: "/workflow",
    },
    {
      name: "Sessions",
      icon: "/session.png",
      route: "/session",
    },
    {
      name: "Reports",
      icon: "/report.png",
      route: "/report",
    },
    {
      name: "Administration",
      icon: "/administration.png",
      route: "/administration",
    },
  ];

  /* WEEK DAYS */
  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const monthLabel = useMemo(() => {
    return currentDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [currentDate]);

  /*  CREATE CALENDAR DAYS */
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const firstWeekday = firstDayOfMonth.getDay();

    const daysInCurrentMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const daysInPreviousMonth = new Date(
      year,
      month,
      0
    ).getDate();

    const totalCells = 42;
    const days = [];

  
    for (let i = 0; i < firstWeekday; i++) {
      days.push({
        day: daysInPreviousMonth - firstWeekday + i + 1,
        currentMonth: false,
      });
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
      });
    }
    let nextMonthDay = 1;

    while (days.length < totalCells) {
      days.push({
        day: nextMonthDay,
        currentMonth: false,
      });

      nextMonthDay += 1;
    }

    return days;
  }, [currentDate]);

  /* SIDEBAR NAVIGATION */
  const handleMenuClick = (item) => {
   
    if (item.name === "Appointments") {
      setAppointmentView("calendar");
      return;
    }

    navigate(item.route);
  };

  /* LOGOUT NAVIGATION*/
  const handleLogout = () => {
    navigate("/login");
  };

  const handleBrandClick = () => {
    navigate("/dashboard");
  };

  /* CALENDAR MONTH NAVIGATION*/
  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  const handleToday = () => {
    const today = new Date();

    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );
  };

  
  const handleScheduleAppointment = () => {
    setAppointmentView("schedule");
  };

 
  const handleBackToCalendar = () => {
    setAppointmentView("calendar");
  };

  /*  FORM HANDLERS*/
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmitAppointment = (event) => {
    event.preventDefault();

    console.log("Scheduled appointment:", formData);

    setAppointmentView("calendar");
  };

  /* SHARED SIDEBAR*/
  const renderSidebar = () => (
    <aside className="appointment-sidebar">
      <div className="appointment-sidebar-top">
        {/* BRAND */}
        <button
          type="button"
          className="appointment-brand appointment-brand-button"
          onClick={handleBrandClick}
        >
          <img
            src="/logo2.png"
            alt="Video KYC"
            className="appointment-sidebar-logo"
          />

          <span>Video KYC</span>
        </button>

        {/* MENU */}
        <nav className="appointment-menu">
          {menuItems.map((item) => {
            const isActive =
              item.name === "Appointments";

            return (
              <button
                key={item.name}
                type="button"
                className={
                  isActive
                    ? "appointment-menu-item active"
                    : "appointment-menu-item"
                }
                onClick={() =>
                  handleMenuClick(item)
                }
              >
                <span className="appointment-menu-icon">
                  <img
                    src={item.icon}
                    alt={`${item.name} icon`}
                  />
                </span>

                <span className="appointment-menu-label">
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* LOGOUT */}
      <button
        type="button"
        className="appointment-logout"
        onClick={handleLogout}
      >
        <span className="appointment-logout-icon">
          ◉
        </span>

        <span>Logout</span>
      </button>
    </aside>
  );

  const renderHeader = () => (
    <header className="appointment-top-header">
      {/* WELCOME */}
      <div className="appointment-welcome">
        <img
          src="/logo2.png"
          alt="Bank"
          className="appointment-header-logo"
        />

        <span>Welcome, John Operator</span>
      </div>

      {/* RIGHT HEADER */}
      <div className="appointment-header-actions">
        {/* OFFICE */}
        <select
          className="appointment-office-select"
          value={office}
          onChange={(event) =>
            setOffice(event.target.value)
          }
        >
          <option>Head Office</option>
          <option>Kathmandu Branch</option>
          <option>Pokhara Branch</option>
        </select>

        {/* NOTIFICATION */}
        <button
          type="button"
          className="appointment-notification-button"
          aria-label="5 notifications"
        >
          <img
            src="/bell.png"
            alt="Notifications"
            className="appointment-bell-image"
          />

          <span className="appointment-notification-badge">
            5
          </span>
        </button>

        {/* PROFILE */}
        <button
          type="button"
          className="appointment-avatar"
          aria-label="Operator profile"
        >
          JO
        </button>
      </div>
    </header>
  );

  /* APPOINTMENT CALENDAR VIEW */
  const renderCalendarView = () => (
    <div className="appointment-content">
      {/* PAGE TITLE */}
      <div className="appointment-page-title">
        <h1>Appointment Calendar</h1>

        <p>
          View and manage customer appointments
        </p>
      </div>

      {/* CALENDAR CONTROLS */}
      <div className="calendar-controls">
        <div className="calendar-left-controls">
          {/* MONTH SWITCHER */}
          <div className="month-switcher">
            <button
              type="button"
              className="month-arrow-button"
              onClick={handlePreviousMonth}
              aria-label="Previous month"
            >
              ‹
            </button>

            <span className="month-label">
              {monthLabel}
            </span>

            <button
              type="button"
              className="month-arrow-button"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          {/* TODAY */}
          <button
            type="button"
            className="today-button"
            onClick={handleToday}
          >
            Today
          </button>

          <div className="view-buttons">
            {["Day", "Week", "Month"].map(
              (mode) => (
                <button
                  key={mode}
                  type="button"
                  className={
                    viewMode === mode
                      ? "view-button active-view"
                      : "view-button"
                  }
                  onClick={() =>
                    setViewMode(mode)
                  }
                >
                  {mode}
                </button>
              )
            )}
          </div>
        </div>

        {/* SCHEDULE APPOINTMENT */}
        <button
          type="button"
          className="schedule-button"
          onClick={handleScheduleAppointment}
        >
          <span className="schedule-plus">
            +
          </span>

          Schedule Appointment
        </button>
      </div>

      {/* CALENDAR */}
      <section className="calendar-card">
        {/* WEEKDAYS */}
        <div className="calendar-weekdays">
          {weekDays.map((day) => (
            <div
              key={day}
              className="weekday-cell"
            >
              {day}
            </div>
          ))}
        </div>

        {/* DAYS */}
        <div className="calendar-grid">
          {calendarDays.map(
            (item, index) => (
              <div
                key={`${item.day}-${index}`}
                className={
                  item.currentMonth
                    ? "calendar-day-cell current-month"
                    : "calendar-day-cell other-month"
                }
              >
                <span className="calendar-day-number">
                  {item.day}
                </span>
              </div>
            )
          )}
        </div>
      </section>

      {/* LEGEND */}
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color upcoming-legend" />
          <span>Upcoming</span>
        </div>

        <div className="legend-item">
          <span className="legend-color completed-legend" />
          <span>Completed</span>
        </div>

        <div className="legend-item">
          <span className="legend-color cancelled-legend" />
          <span>Cancelled</span>
        </div>
      </div>
    </div>
  );
  const renderScheduleView = () => (
    <div className="appointment-content">
      {/* BACK + TITLE */}
      <div className="schedule-title-row">
        <button
          type="button"
          className="back-to-calendar-button"
          onClick={handleBackToCalendar}
          aria-label="Back to appointment calendar"
          title="Back to Appointment Calendar"
        >
          ←
        </button>

        <div>
          <h1>
            Schedule Appointment
          </h1>

          <p>
            Create a new Video KYC appointment
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        className="schedule-form-card"
        onSubmit={handleSubmitAppointment}
      >
        {/* CUSTOMER INFORMATION */}
        <div className="schedule-section-heading">
          <h2>
            Customer Information
          </h2>

          <p>
            Enter the customer details for this
            appointment.
          </p>
        </div>

        <div className="schedule-form-grid">
          {/* CIF */}
          <div className="schedule-field">
            <label htmlFor="cif">
              Client Code / CIF
            </label>

            <input
              id="cif"
              name="cif"
              value={formData.cif}
              onChange={handleFormChange}
              placeholder="Enter Client Code / CIF"
            />
          </div>

          {/* CUSTOMER NAME */}
          <div className="schedule-field">
            <label htmlFor="customerName">
              Customer Name
            </label>

            <input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleFormChange}
              placeholder="Enter customer name"
            />
          </div>

          {/* MOBILE */}
          <div className="schedule-field">
            <label htmlFor="mobile">
              Mobile Number
            </label>

            <input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleFormChange}
              placeholder="Enter mobile number"
            />
          </div>

          {/* EMAIL */}
          <div className="schedule-field">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div className="schedule-form-divider" />

        {/* APPOINTMENT DETAILS */}
        <div className="schedule-section-heading">
          <h2>
            Appointment Details
          </h2>

          <p>
            Select the date, time, purpose and
            operator.
          </p>
        </div>

        <div className="schedule-form-grid">
          {/* DATE */}
          <div className="schedule-field">
            <label htmlFor="appointmentDate">
              Appointment Date
            </label>

            <input
              id="appointmentDate"
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleFormChange}
              required
            />
          </div>

          {/* TIME */}
          <div className="schedule-field">
            <label htmlFor="appointmentTime">
              Appointment Time
            </label>

            <input
              id="appointmentTime"
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleFormChange}
              required
            />
          </div>

          {/* PURPOSE */}
          <div className="schedule-field">
            <label htmlFor="purpose">
              Purpose
            </label>

            <select
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleFormChange}
            >
              <option>
                Account Opening
              </option>

              <option>
                KYC Update
              </option>

              <option>
                Loan Application
              </option>

              <option>
                Card Services
              </option>

              <option>
                General Banking
              </option>
            </select>
          </div>

          {/* OPERATOR */}
          <div className="schedule-field">
            <label htmlFor="operator">
              Operator
            </label>

            <select
              id="operator"
              name="operator"
              value={formData.operator}
              onChange={handleFormChange}
            >
              <option>
                John Operator
              </option>

              <option>
                Sarah Operator
              </option>

              <option>
                David Operator
              </option>
            </select>
          </div>

          {/* BRANCH */}
          <div className="schedule-field schedule-full-field">
            <label htmlFor="branch">
              Branch
            </label>

            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleFormChange}
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
          </div>

          {/* NOTES */}
          <div className="schedule-field schedule-full-field">
            <label htmlFor="notes">
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleFormChange}
              placeholder="Add appointment notes"
              rows="4"
            />
          </div>
        </div>

        {/* FORM BUTTONS */}
        <div className="schedule-form-actions">
          <button
            type="button"
            className="schedule-cancel-button"
            onClick={handleBackToCalendar}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="schedule-submit-button"
          >
            Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  );

  
  return (
    <div className="appointment-page">
      {/* LEFT SIDE */}
      {renderSidebar()}

      {/* RIGHT SIDE */}
      <main className="appointment-main">
        {/* SHARED HEADER */}
        {renderHeader()}

        {/* SWITCH BETWEEN CALENDAR AND SCHEDULE */}
        {appointmentView === "calendar"
          ? renderCalendarView()
          : renderScheduleView()}
      </main>
    </div>
  );
}