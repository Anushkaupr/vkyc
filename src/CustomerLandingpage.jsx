import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerLandingPage.css";

export default function CustomerLandingPage() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(4 * 60 + 32);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleJoin = () => {
    if (timeLeft <= 0) return;

    navigate("/permissions");
  };

  return (
    <div className="vkyc-page">
      <div className="vkyc-card">

     
        <header className="vkyc-header">

          
          <div className="bank-brand">
            <img
              src="/bank-logo.png"
              alt="Your Bank"
              className="bank-logo-image"
            />
          </div>

          <div className="language-selector">
  <span>English</span>

  <img
    src="/globe.png"
    alt="Language"
    className="globe-image"
  />
</div>

        </header>

       
        <main className="vkyc-main">

         
          <div className="title-section">

  <h1>
    Welcome to{" "}
    <span className="bank-name">
      Kamana Sewa Bikas Bank Ltd
    </span>
  </h1>

  <h3>Video KYC Session</h3>

  <p className="subtitle">
    You are invited to join a secure video call with our representative.
  </p>

</div>

          
          <div className="hero-wrapper">

            <img
              src="/landing.png"
              alt="Secure Video KYC"
              className="hero-image"
            />

          </div>

         {/* Security Information */}
<div className="security-list">

  {/* First Item */}
  <div className="security-row">
    <img
      src="/security.png"
      alt="Secure"
      className="security-icon-image"
    />

    <span>
      Secure and encrypted session
    </span>
  </div>

{/* Second Item */}
  <div className="security-row">
    <img
      src="/security.png"
      alt="Secure"
      className="security-icon-image"
    />

    <span>
      Your session link is valid for a limited time
    </span>
  </div>

{/* Third Item */}
  <div className="security-row">
    <img
      src="/security.png"
      alt="Secure"
      className="security-icon-image"
    />

    <span>
      Your information is kept private and protected
    </span>
  </div>

</div>

  {/* Join Button */}
          <button
            className="join-button"
            onClick={handleJoin}
            disabled={timeLeft <= 0}
          >
            {timeLeft > 0 ? "Join Session" : "Session Expired"}
          </button>

          {/* Countdown */}
          <p
            className={
              timeLeft > 0
                ? "expiry-text"
                : "expiry-text expired"
            }
          >
            {timeLeft > 0 ? (
              <>
                The link will expire in:{" "}
                <strong>{formatTime(timeLeft)}</strong>
              </>
            ) : (
              "This session link has expired."
            )}
          </p>

        </main>

        {/* Footer */}
        <footer className="vkyc-footer">
          © 2024 Kamana Sewa Bikas Bank Ltd . All rights reserved.
        </footer>

      </div>
    </div>
  );
}