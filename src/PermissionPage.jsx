import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PermissionPage.css";

export default function PermissionPage() {
  const navigate = useNavigate();

  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(false);


  // CHECK IF ALL PERMISSIONS ARE ALLOWED
  useEffect(() => {
    if (
      cameraAllowed &&
      microphoneAllowed &&
      locationAllowed
    ) {
      navigate("/consent");
    }
  }, [
    cameraAllowed,
    microphoneAllowed,
    locationAllowed,
    navigate,
  ]);


  // CAMERA PERMISSION
  const allowCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      setCameraAllowed(true);

      // Stop camera after checking permission
      stream
        .getTracks()
        .forEach((track) => track.stop());

    } catch (error) {
      console.log(
        "Camera permission denied:",
        error
      );
    }
  };


  // MICROPHONE PERMISSION
  const allowMicrophone = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      setMicrophoneAllowed(true);

      // Stop microphone after checking permission
      stream
        .getTracks()
        .forEach((track) => track.stop());

    } catch (error) {
      console.log(
        "Microphone permission denied:",
        error
      );
    }
  };


  // LOCATION PERMISSION
  const allowLocation = () => {

    if (!navigator.geolocation) {
      console.log(
        "Geolocation is not supported."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationAllowed(true);
      },

      (error) => {
        console.log(
          "Location permission denied:",
          error
        );
      }
    );
  };


  return (
    <div className="permission-page">

      <div className="permission-card">


        {/* =========================
            HEADER
        ========================== */}

        <header className="permission-header">

          {/* BANK LOGO */}
          <div className="permission-bank">

            <img
              src="/bank-logo.png"
              alt="Your Bank"
              className="permission-bank-logo"
            />

          </div>


          {/* LANGUAGE */}
          <div className="permission-language">

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


        {/* =========================
            TITLE
        ========================== */}

        <section className="permission-title">

          <h1>
            Allow Permissions
          </h1>

          <p>
            To proceed with the video session,
            please allow the following permissions.
          </p>

        </section>


        {/* =========================
            PERMISSION CARDS
        ========================== */}

        <section className="permission-list">


          {/* CAMERA */}

          <div className="permission-item">

            <div className="permission-icon">

              <img
                src="/camera.png"
                alt="Camera"
                className="permission-icon-image"
              />

            </div>


            <div className="permission-info">

              <h2>
                Camera
              </h2>

              <span className="required-label">
                Required
              </span>

              <p>
                Use camera for video
              </p>

            </div>


            <button
              className={
                cameraAllowed
                  ? "allow-button allowed"
                  : "allow-button"
              }
              onClick={allowCamera}
            >

              {cameraAllowed
                ? "Allowed"
                : "Allow"}

            </button>

          </div>



          {/* MICROPHONE */}

          <div className="permission-item">

            <div className="permission-icon">

              <img
                src="/microphone.png"
                alt="Microphone"
                className="permission-icon-image"
              />

            </div>


            <div className="permission-info">

              <h2>
                Microphone
              </h2>

              <span className="required-label">
                Required
              </span>

              <p>
                Use microphone for audio
              </p>

            </div>


            <button
              className={
                microphoneAllowed
                  ? "allow-button allowed"
                  : "allow-button"
              }
              onClick={allowMicrophone}
            >

              {microphoneAllowed
                ? "Allowed"
                : "Allow"}

            </button>

          </div>



          {/* LOCATION */}

          <div className="permission-item">

            <div className="permission-icon">

              <img
                src="/location.png"
                alt="Location"
                className="permission-icon-image"
              />

            </div>


            <div className="permission-info">

              <h2>
                Location
              </h2>

              <span className="required-label">
                Required
              </span>

              <p>
                Use location for verification
              </p>

            </div>


            <button
              className={
                locationAllowed
                  ? "allow-button allowed"
                  : "allow-button"
              }
              onClick={allowLocation}
            >

              {locationAllowed
                ? "Allowed"
                : "Allow"}

            </button>

          </div>

        </section>

{/* =========================
    PRIVACY INFORMATION
========================== */}

<div className="privacy-box">

  <div className="privacy-icon">

    <img
      src="/shield.png"
      alt="Privacy Shield"
      className="privacy-icon-image"
    />

  </div>


  <p>

    <strong>
      Your privacy is important to us. These permissions are used only
    for the KYC session.
    </strong>

  

  </p>

</div>


{/* =========================
    BOTTOM MESSAGE
========================== */}

<p className="permission-footer-text">

  You can change these permissions
  anytime from your browser settings.

</p>

      </div>

    </div>
  );
}