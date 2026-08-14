import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PreparationPage.css";

export default function PreparationPage() {
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);

  const handleJoin = () => {
  if (!ready) return;

  navigate("/videocall");
};

  return (
    <div className="preparation-page">
      <div className="preparation-card">

        <header className="preparation-header">

          {/* BANK LOGO */}
          <div className="preparation-bank">
            <img
              src="/bank-logo.png"
              alt="Your Bank"
              className="preparation-bank-logo"
            />
          </div>

<div className="preparation-language">
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
        <section className="preparation-title">

          <h1>Get Ready for Your Video KYC</h1>

          <p>
            Please follow the instructions below for a smooth session.
          </p>

        </section>

<section className="preparation-content">
  <div className="instruction-list">
{/* 1. LIGHTING */}
    <div className="instruction-item">

      <div className="instruction-icon">
        <img
          src="/lighting.png"
          alt="Well-lit place"
          className="instruction-icon-image"
        />
      </div>

      <div className="instruction-text">
        <h2>Be in a well-lit place</h2>

        <p>
          Ensure your face is clearly visible
        </p>
      </div>

    </div>

{/* 2. ORIGINAL ID */}
    <div className="instruction-item">

      <div className="instruction-icon">
        <img
          src="/id-proof.png"
          alt="Original ID"
          className="instruction-icon-image"
        />
      </div>

      <div className="instruction-text">
        <h2>Keep your original ID proof ready</h2>

        <p>
          You will be asked to show it during the call
        </p>
      </div>

    </div>


    {/* 3. REMOVE MASK / SUNGLASSES */}
    <div className="instruction-item">

      <div className="instruction-icon">
        <img
          src="/no-mask.png"
          alt="Remove sunglasses hat or mask"
          className="instruction-icon-image"
        />
      </div>

      <div className="instruction-text">
        <h2>Remove sunglasses, hat or mask</h2>

        <p>
          Your face must be clearly visible
        </p>
      </div>

    </div>


    {/* 4. INTERNET */}
    <div className="instruction-item">

      <div className="instruction-icon">
        <img
          src="/internet.png"
          alt="Stable internet connection"
          className="instruction-icon-image"
        />
      </div>

      <div className="instruction-text">
        <h2>Ensure a stable internet connection</h2>

        <p>
          For the best video and audio quality
        </p>
      </div>

    </div>


    {/* 5. HEADPHONES */}
    <div className="instruction-item">

      <div className="instruction-icon">
        <img
          src="/no-headphones.png"
          alt="Do not use headphones"
          className="instruction-icon-image"
        />
      </div>

      <div className="instruction-text">
        <h2>Do not use headphones / earphones</h2>

        <p>
          Use your device&apos;s speaker and microphone
        </p>
      </div>

    </div>

  </div>
          <div className="preparation-image-wrapper">

            <img
              src="/preparation.png"
              alt="Customer preparing ID for Video KYC"
              className="preparation-image"
            />

          </div>

        </section>


        {/* DIVIDER */}
        <div className="preparation-divider"></div>


        {/* READY CHECKBOX */}
        <label className="ready-checkbox-row">

          <input
            type="checkbox"
            checked={ready}
            onChange={(e) => setReady(e.target.checked)}
          />

          <span className="ready-custom-checkbox">

            {ready && (
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


          <span className="ready-checkbox-text">
            I am ready and agree to proceed.
          </span>

        </label>


        {/* JOIN BUTTON */}
        <button
          className="video-session-button"
          onClick={handleJoin}
          disabled={!ready}
        >
          Join Video Session
        </button>

      </div>
    </div>
  );
}