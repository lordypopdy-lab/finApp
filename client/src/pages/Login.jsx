import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import FadeLoader from "react-spinners/FadeLoader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { email, password } = data;

      // === Validation ===
      if (!email) {
        toast.error("Email is required!");
        setLoading(false);
        return;
      }

      // Simple email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address!");
        setLoading(false);
        return;
      }

      if (!password || password.length < 6) {
        toast.error("Password is required and must be at least 6 characters!");
        setLoading(false);
        return;
      }

      // === API Call ===
      const res = await axios.post("/loginUser", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.success);
        setData({
          email: "",
          password: "",
        });

        localStorage.setItem("user", res.data.user.email);
        setTimeout(() => {
          location.href = "/dashboard";
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Invalid credentials or server error!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="appHeader no-border transparent position-absolute">
        <div className="left">
          <a href="/register" className="headerButton goBack">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </a>
        </div>
        <div className="pageTitle"></div>
        <div className="right"></div>
      </div>

      <div id="appCapsule">
        <div className="section mt-2 text-center">
          <h1>Log in</h1>
          <h4>Fill the form to log in</h4>
        </div>

        <div className="section mb-5 p-2">
          <form onSubmit={loginUser}>
            <div className="card">
              <div className="card-body pb-1">
                {/* Email Field */}
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label">E-mail</label>
                    <input
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      type="email"
                      className="form-control"
                      id="email1"
                      placeholder="Your e-mail"
                    />
                    <i className="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>

                {/* Password Field */}
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label">Password</label>
                    <input
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      type="password"
                      className="form-control"
                      id="password1"
                      placeholder="Your password"
                    />
                    <i className="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="form-links mt-2">
              <div>
                <a href="/register">Register Now</a>
              </div>
              <div>
                <a href="/forgot-password" className="text-muted">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Submit button */}
            <div className="form-button-group transparent">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
                disabled={loading}
              >
                {loading ? <FadeLoader color="#fff" height={10} /> : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
