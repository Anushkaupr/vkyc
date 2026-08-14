import React, { useEffect, useState } from "react";
import "./QueuePage.css";

export default function QueuePage() {
  // 2 minutes 15 seconds = 135 seconds
  const [timeLeft, setTimeLeft] = useState(135);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Convert seconds into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="queue-page">

      <div className="queue-card">

        {/* =========================
            HEADER
        ========================== */}

        <header className="queue-header">

          {/* BANK LOGO */}
          <div className="queue-bank">
            <img
              src="/bank-logo.png"
              alt="Your Bank"
              className="queue-bank-logo"
            />
          </div>


          {/* LANGUAGE */}
          <div className="queue-language">
            <span>English</span>
            <span className="language-arrow">⌄</span>
          </div>

        </header>


        {/* =========================
            TITLE
        ========================== */}

        <section className="queue-title">

          <h1>
            You are in the Queue
          </h1>

          <p>
            Please wait while we connect you to our representative.
          </p>

        </section>


        {/* =========================
            WAITING CIRCLE
        ========================== */}

        <section className="queue-waiting-area">

          <div className="queue-circle">

            {/* Animated dotted ring */}
            <div className="queue-ring"></div>


            {/* Inside content */}
            <div className="queue-circle-content">

              <img
                src="/queue.png"
                alt="Waiting for representative"
                className="queue-people-image"
              />

              <p className="estimated-text">
                Estimated wait time
              </p>

              <h2 className="queue-time">
                {formatTime(timeLeft)}
              </h2>

            </div>

          </div>

        </section>


        {/* =========================
            INFORMATION BOX
        ========================== */}

        <div className="queue-information-box">

          <h3>
            Do not close this window
          </h3>

          <p>
            You will be automatically connected to the operator.
          </p>

        </div>


        {/* =========================
            SUPPORT MESSAGE
        ========================== */}

        <p className="queue-support">
          Need help? Contact our support center.
        </p>

      </div>

    </div>
  );
}