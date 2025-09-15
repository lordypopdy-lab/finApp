import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import FadeLoader from "react-spinners/FadeLoader";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    fullname: "",
    password: "",
    confirm_password: "",
  });

  const createUser = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { email, password, fullname, confirm_password } = data;

      if (!fullname) {
        toast.error("FullName is required!");
        setLoading(false);
        return;
      }

      if (!email) {
        toast.error("Email is required!");
        setLoading(false);
        return;
      }

      if (!password || password.length < 6) {
        toast.error("Password is required and must be at least 6 characters!");
        setLoading(false);
        return;
      }

      if (!confirm_password || confirm_password !== password) {
        toast.error("Confirm password is required and must match password!");
        setLoading(false);
        return;
      }

      // ✅ avoid shadowing "data"
      const res = await axios.post("/createUser", {
        fullname,
        email,
        password,
      });

      if (res.data.error) {
        toast.error(res.data.error);
        setLoading(false);
        setData({
          fullname: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      }

      if (res.data.success) {
        toast.success(res.data.success);
        setLoading(false);
        setData({
          fullname: "",
          email: "",
          password: "",
          confirm_password: "",
        });
        localStorage.setItem("user", res.data.user.email);
        setTimeout(() => {
          location.href = "/dashboard";
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      // ✅ always stop loading, success or error
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="appHeader no-border transparent position-absolute">
        <div className="left">
          <a href="/login" className="headerButton goBack">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </a>
        </div>
        <div className="pageTitle"></div>
        <div className="right">
          <a href="/login" className="headerButton">
            {" "}
            Login{" "}
          </a>
        </div>
      </div>

      <div id="appCapsule">
        <div className="section mt-2 text-center">
          <h1>Register now</h1>
          <h4>Create an account</h4>
        </div>
        <div className="section mb-5 p-2">
          <form onSubmit={createUser}>
            <div className="card">
              <div className="card-body">
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label">Full-Name</label>
                    <input
                      type="text"
                      value={data.fullname}
                      onChange={(e) =>
                        setData({ ...data, fullname: e.target.value })
                      }
                      className="form-control"
                      id="fullname"
                      placeholder="Your full-name"
                    />
                    <i className="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>

                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label">E-mail</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      className="form-control"
                      id="email1"
                      placeholder="Your e-mail"
                    />
                    <i className="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>

                <FadeLoader
                  color="#36d7b7"
                  loading={loading}
                  speedMultiplier={3}
                  style={{
                    textAlign: "center",
                    position: "relative",
                    marginLeft: "48%",
                  }}
                />

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

                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label">Password Again</label>
                    <input
                      value={data.confirm_password}
                      onChange={(e) =>
                        setData({ ...data, confirm_password: e.target.value })
                      }
                      type="password"
                      className="form-control"
                      id="password2"
                      placeholder="Type password again"
                    />
                    <i className="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>

                <div className="custom-control custom-checkbox mt-2 mb-1">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customCheckb1"
                    />
                    <label className="form-check-label">
                      I agree
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#termsModal"
                      >
                        terms and conditions
                      </a>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-button-group transparent">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className="modal fade modalbox"
        id="termsModal"
        tabindex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Terms and Conditions</h5>
              <a href="#" data-bs-dismiss="modal">
                Close
              </a>
            </div>
            <div className="modal-body">
              <h4>Terms & Conditions</h4>
              <p>
                Welcome to Fin App. By downloading, accessing, or using this
                application, you agree to be bound by the following Terms &
                Conditions. Please read them carefully before proceeding.
              </p>

              <h5>1. Use of the App</h5>
              <p>
                Fin App is provided to help users manage and track financial
                activities. You agree to use the app only for lawful purposes
                and in compliance with all applicable laws and regulations.
              </p>

              <h5>2. Accounts & Security</h5>
              <p>
                You are responsible for maintaining the confidentiality of your
                login information and for all activities carried out under your
                account. Fin App is not liable for any unauthorized access
                resulting from your negligence in securing your account.
              </p>

              <h5>3. Financial Disclaimer</h5>
              <p>
                Fin App does not provide financial, investment, or legal advice.
                All information available through the app is for informational
                purposes only. You are solely responsible for any financial
                decisions you make.
              </p>

              <h5>4. Data & Privacy</h5>
              <p>
                We may collect and store certain information in accordance with
                our Privacy Policy. By using Fin App, you consent to such
                collection and usage. We will not share your personal data with
                third parties without your consent, except as required by law.
              </p>

              <h5>5. Limitations of Liability</h5>
              <p>
                Fin App and its developers shall not be held liable for any
                damages, losses, or expenses resulting from your use of the app,
                including but not limited to financial losses, data loss, or
                unauthorized access.
              </p>

              <h5>6. Intellectual Property</h5>
              <p>
                All content, logos, and designs within Fin App remain the
                property of the developers. You may not copy, modify, or
                distribute any part of the app without prior written consent.
              </p>

              <h5>7. Termination</h5>
              <p>
                We reserve the right to suspend or terminate your access to Fin
                App at any time if you violate these Terms & Conditions or
                engage in fraudulent, abusive, or unlawful activities.
              </p>

              <h5>8. Changes to Terms</h5>
              <p>
                We may update these Terms & Conditions from time to time.
                Continued use of Fin App after changes indicates your acceptance
                of the revised terms.
              </p>

              <h5>9. Contact Us</h5>
              <p>
                If you have any questions regarding these Terms & Conditions,
                please contact us at
                <a href="mailto:support@finapp.com">support@finapp.com</a>.
              </p>

              <p>
                By using Fin App, you acknowledge that you have read,
                understood, and agree to these Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
