import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Remember me:", rememberMe);

    navigate("/dashboard");
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="operator-login-page">
      <div className="operator-login-container">
        {/* LEFT BLUE SIDE */}
        <section className="login-left-panel">
          <img
            src="/logo3.png"
            alt="Kamana Sewa Bikas Bank"
            className="top-logo-image"
          />

          <div className="left-content">
            <img
              src="/logo2.png"
              alt="Kamana Sewa Bikas Bank"
              className="center-logo-image"
            />

            <h1>Video KYC</h1>
            <h2>Secure. Simple. Compliant.</h2>

            <p>
              AI-powered Video KYC
              <br />
              for a seamless
              <br />
              customer experience.
            </p>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="login-right-panel">
          <form
            className="login-form-card"
            onSubmit={handleLogin}
            autoComplete="off"
          >
            <div className="login-title">
              <h1>Welcome Back</h1>
              <p>Sign in to continue</p>
            </div>

            <div className="form-group">
              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                name="operator_username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                autoComplete="off"
                readOnly
                onFocus={(e) => {
                  e.target.removeAttribute(
                    "readonly"
                  );
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="operator_password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
                  readOnly
                  onFocus={(e) => {
                    e.target.removeAttribute(
                      "readonly"
                    );
                  }}
                  required
                />

                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={
                    handleShowPassword
                  }
                >
                  <img
                    src={
                      showPassword
                        ? "/eye-open.png"
                        : "/eye-closed.png"
                    }
                    alt=""
                    className="password-eye-image"
                  />
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                />

                <span>
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="operator-login-button"
            >
              Login
            </button>
          </form>

          <footer className="operator-login-footer">
            <span>
              © 2026 Kamana Sewa Bikas Bank
              Ltd. All rights reserved.
            </span>

            <span>
              v1.0.0
            </span>
          </footer>
        </section>
      </div>
    </div>
  );
}