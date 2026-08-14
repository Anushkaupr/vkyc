import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoCallPage.css";

export default function VideoCallPage() {
  const navigate = useNavigate();

  // Customer's live video
  const localVideoRef = useRef(null);

  // Store camera + microphone stream
  const streamRef = useRef(null);

  // States
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [facingMode, setFacingMode] = useState("user");

  const [selectedFile, setSelectedFile] = useState(null);

  const [callTime, setCallTime] = useState(0);


  /* ==============================
     START CAMERA WHEN PAGE OPENS
  ============================== */

  useEffect(() => {
    startCamera();

    return () => {
      stopAllTracks();
    };
  }, []);


  /* ==============================
     CALL TIMER
  ============================== */

  useEffect(() => {
    const timer = setInterval(() => {
      setCallTime((previousTime) => previousTime + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);


  /* ==============================
     START CAMERA + MICROPHONE
  ============================== */

  const startCamera = async (cameraMode = "user") => {
    try {
      // Stop previous camera/microphone
      stopAllTracks();

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: cameraMode,
            },
          },

          audio: true,
        });

      // Store stream
      streamRef.current = stream;

      // Show stream in video element
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setMuted(false);
      setVideoOff(false);
    } catch (error) {
      console.log(
        "Camera or microphone error:",
        error
      );
    }
  };


  /* ==============================
     STOP ALL MEDIA
  ============================== */

  const stopAllTracks = () => {
    if (!streamRef.current) return;

    streamRef.current
      .getTracks()
      .forEach((track) => {
        track.stop();
      });

    streamRef.current = null;
  };


  /* ==============================
     MUTE / UNMUTE
  ============================== */

  const handleMute = () => {
    if (!streamRef.current) return;

    const audioTrack =
      streamRef.current.getAudioTracks()[0];

    if (!audioTrack) return;

    // Change microphone state
    audioTrack.enabled = !audioTrack.enabled;

    // React state
    setMuted(!audioTrack.enabled);
  };


  /* ==============================
     VIDEO ON / OFF
  ============================== */

  const handleVideo = () => {
    if (!streamRef.current) return;

    const videoTrack =
      streamRef.current.getVideoTracks()[0];

    if (!videoTrack) return;

    // Turn camera track on/off
    videoTrack.enabled = !videoTrack.enabled;

    // React state
    setVideoOff(!videoTrack.enabled);
  };


  /* ==============================
     SWITCH CAMERA
  ============================== */

  const handleSwitchCamera = async () => {
    const newMode =
      facingMode === "user"
        ? "environment"
        : "user";

    setFacingMode(newMode);

    await startCamera(newMode);
  };


  /* ==============================
     DOCUMENT SELECT
  ============================== */

  const handleDocument = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    console.log(
      "Selected document:",
      file
    );

    // Later you will send the file
    // to your backend here.
  };


  /* ==============================
     END CALL
  ============================== */

  const handleEndCall = () => {
    // Stop camera and microphone
    stopAllTracks();

    // Go back to landing page
    navigate("/");
  };


  /* ==============================
     FORMAT TIMER
  ============================== */

  const formatTime = (seconds) => {
    const hours =
      Math.floor(seconds / 3600);

    const minutes =
      Math.floor((seconds % 3600) / 60);

    const remainingSeconds =
      seconds % 60;

    return `${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };


  return (
    <div className="video-call-page">

      <div className="video-call-container">


        {/* =========================
            TOP BAR
        ========================== */}

        <div className="video-top-bar">

          <div className="session-heading">
            Video KYC Session
          </div>


          <div className="recording-info">

            <span className="recording-dot"></span>

            <span>
              Session
            </span>

            <strong>
              {formatTime(callTime)}
            </strong>

          </div>

        </div>


        {/* =========================
            VIDEO AREA
        ========================== */}

        <div className="video-area">


          {/* CUSTOMER LIVE CAMERA */}

          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="customer-video"
          />


          {/* CAMERA OFF MESSAGE */}

          {videoOff && (
            <div className="video-off-message">

              <img
                src="/video-off.png"
                alt="Camera Off"
                className="video-off-large-icon"
              />

              <span>
                Camera is off
              </span>

            </div>
          )}


          {/* =========================
              OPERATOR PLACEHOLDER
          ========================== */}

          <div className="operator-video-box">

            <img
              src="/operator.png"
              alt="Operator"
              className="operator-placeholder"
            />

          </div>

        </div>


        {/* =========================
            INFORMATION AREA
        ========================== */}

        <div className="information-grid">


          {/* SESSION INFORMATION */}

          <div className="information-card">

            <h3>
              Session Information
            </h3>


            <div className="session-row">

              <span>
                Reference No.
              </span>

              <strong>
                REF123456
              </strong>

            </div>


            <div className="session-row">

              <span>
                Session Type
              </span>

              <strong>
                Instant Session
              </strong>

            </div>


            <div className="session-row">

              <span>
                Operator
              </span>

              <strong>
                Waiting...
              </strong>

            </div>


            <div className="session-row">

              <span>
                Link Validity
              </span>

              <strong>
                30 Minutes
              </strong>

            </div>

          </div>


          {/* =========================
              DOCUMENTS
          ========================== */}

          <div className="information-card">

            <h3>
              Documents
            </h3>


            <p
              className={
                selectedFile
                  ? "document-status uploaded"
                  : "document-status"
              }
            >

              {selectedFile
                ? `✓ ${selectedFile.name}`
                : "No document uploaded"}

            </p>


            <label className="upload-document-button">

              Upload Document

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleDocument}
              />

            </label>

          </div>

        </div>


        {/* =========================
            CALL CONTROLS
        ========================== */}

        <div className="call-controls">


          {/* =========================
              MUTE
          ========================== */}

          <button
            className={
              muted
                ? "control-button active-control"
                : "control-button"
            }
            onClick={handleMute}
          >

            <span className="control-icon-wrapper">

              <img
                src={
                  muted
                    ? "/microphone-off.png"
                    : "/microphone-on.png"
                }
                alt={
                  muted
                    ? "Microphone Off"
                    : "Microphone On"
                }
                className="control-icon-image"
              />

            </span>

            <span className="control-text">
              {muted
                ? "Unmute"
                : "Mute"}
            </span>

          </button>


          {/* =========================
              VIDEO
          ========================== */}

          <button
            className={
              videoOff
                ? "control-button active-control"
                : "control-button"
            }
            onClick={handleVideo}
          >

            <span className="control-icon-wrapper">

              <img
                src={
                  videoOff
                    ? "/video-off.png"
                    : "/video-on.png"
                }
                alt={
                  videoOff
                    ? "Video Off"
                    : "Video On"
                }
                className="control-icon-image"
              />

            </span>

            <span className="control-text">
              {videoOff
                ? "Start Video"
                : "Stop Video"}
            </span>

          </button>

{/* =========================
    SWITCH CAMERA
========================== */}

<button
  className="control-button"
  onClick={handleSwitchCamera}
>

  <span className="control-icon-wrapper switch-icon">

    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path
        d="M20 7V3L16 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M4 17V21L8 17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M20 7C18.5 4.5 15.7 3 12.5 3C8.8 3 5.7 5.2 4.4 8.4"
        strokeLinecap="round"
      />

      <path
        d="M4 17C5.5 19.5 8.3 21 11.5 21C15.2 21 18.3 18.8 19.6 15.6"
        strokeLinecap="round"
      />
    </svg>

  </span>

  <span className="control-text">
    Switch Camera
  </span>

</button>


          {/* =========================
              UPLOAD
          ========================== */}

          <label className="control-button upload-control">

            <span className="control-icon-wrapper upload-icon">
              ↑
            </span>

            <span className="control-text">
              Upload
            </span>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleDocument}
            />

          </label>


          {/* =========================
              END CALL
          ========================== */}

          <button
            className="control-button end-call-button"
            onClick={handleEndCall}
          >

            <span className="end-call-icon-wrapper">

              <img
                src="/end-call.png"
                alt="End Call"
                className="end-call-icon-image"
              />

            </span>

            <span className="control-text">
              End Call
            </span>

          </button>


        </div>

      </div>

    </div>
  );
}