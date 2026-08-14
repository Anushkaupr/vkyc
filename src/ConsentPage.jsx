import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConsentPage.css";

export default function ConsentPage() {
  const navigate = useNavigate();

  const [agreed, setAgreed] = useState(false);
const handleContinue = () => {
  if (!agreed) return;

  navigate("/preparation");
};
  return (
    <div className="consent-page">
      <div className="consent-card">

        {/* HEADER */}
        <header className="consent-header">

          {/* BANK LOGO */}
          <div className="consent-bank">
            <img
              src="/bank-logo.png"
              alt="Your Bank"
              className="consent-bank-logo"
            />
          </div>

          {/* LANGUAGE */}
          <div className="consent-language">
            <span>English</span>

            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

        </header>


        {/* TITLE */}
        <section className="consent-title">

          <h1>Terms &amp; Consent</h1>

          <p>
            Please read and accept the terms to continue.
          </p>

        </section>


        {/* TERMS BOX */}
        <section className="terms-box">

          {/* RECORDING */}
          <div className="terms-section">

            <h2>Session Recording Consent</h2>

            <p>
              I understand and agree that this session will be video recorded
              and the recording along with documents and information shared
              during this session may be retained by the bank for KYC purposes
              and as per applicable laws and regulations.
            </p>

          </div>


          {/* PRIVACY */}
          <div className="terms-section">

            <h2>Privacy Notice</h2>

            <p>
              I understand that my personal data is collected, used and
              processed in accordance with the bank&apos;s privacy policy.
            </p>

          </div>


          {/* ACKNOWLEDGEMENT */}
          <div className="terms-section">

            <h2>Acknowledgement</h2>

            <p>
              I confirm that the information provided by me during this session
              is true and correct to the best of my knowledge.
            </p>

          </div>

        </section>


        {/* AGREEMENT CHECKBOX */}
        <label className="consent-checkbox-row">

          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />

          <span className="custom-checkbox">
            {agreed && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
              >
                <path
                  d="M5 12l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>

          <span className="checkbox-text">
            I have read and agree to the above terms and conditions.
          </span>

        </label>


        {/* CONTINUE BUTTON */}
        <button
          className="consent-button"
          onClick={handleContinue}
          disabled={!agreed}
        >
          I Agree &amp; Continue
        </button>

      </div>
    </div>
  );
}