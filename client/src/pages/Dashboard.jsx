import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      location.href = "/login";
      return;
    }

    // If you stored the whole user object
    const email = localStorage.getItem("user");

    const getUser = async () => {
      try {
        const res = await axios.post("/getUser", { email });
        console.log(res.data.user);
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("user"); // clear broken data
        location.href = "/login";
      }
    };

    getUser();
  }, []);

  const logout = async () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const frozenAccountToast = () => {
    toast.error("Your account is frozen. Please contact support.", {
      icon: "🔒",
    });
  };

  return (
    <div>
      <div className="appHeader bg-primary text-light">
        <div className="left">
          <a
            href="/register"
            className="headerButton"
            data-bs-toggle="modal"
            data-bs-target="#sidebarPanel"
          >
            <ion-icon name="menu-outline"></ion-icon>
          </a>
        </div>
        <div className="pageTitle">
          <img
            src="https://finapp.bragherstudio.com/view22/assets/img/logo.png"
            alt="logo"
            className="logo"
          />
        </div>
        <div className="right">
          <a href="#" className="headerButton">
            <ion-icon className="icon" name="notifications-outline"></ion-icon>
            <span className="badge badge-danger">4</span>
          </a>
          <a href="/settings" className="headerButton">
            <img src="/main.jpg" alt="image" className="imaged w32" />
            <span className="badge badge-danger">6</span>
          </a>
        </div>
      </div>
      
      <div id="appCapsule">
        <div className="section wallet-card-section pt-1">
          <div className="wallet-card">
            <div className="balance">
              <div className="left">
                <span className="title">Total Balance</span>
                <h1 className="total">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(user?.balance ?? 0)}
                </h1>
              </div>
              <div className="right">
                <a
                  href="#"
                  className="button"
                  data-bs-toggle="modal"
                  data-bs-target="#depositActionSheet"
                >
                  <ion-icon name="add-outline"></ion-icon>
                </a>
              </div>
            </div>

            <div className="wallet-footer">
              <div className="item">
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#withdrawActionSheet"
                >
                  <div className="icon-wrapper bg-danger">
                    <ion-icon name="arrow-down-outline"></ion-icon>
                  </div>
                  <strong>Withdraw</strong>
                </a>
              </div>
              <div className="item">
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#sendActionSheet"
                >
                  <div className="icon-wrapper">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
                  <strong>Send</strong>
                </a>
              </div>
              <div className="item">
                <a href="#">
                  <div className="icon-wrapper bg-success">
                    <ion-icon name="card-outline"></ion-icon>
                  </div>
                  <strong>Cards</strong>
                </a>
              </div>
              <div className="item">
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#exchangeActionSheet"
                >
                  <div className="icon-wrapper bg-warning">
                    <ion-icon name="swap-vertical"></ion-icon>
                  </div>
                  <strong>Exchange</strong>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade action-sheet"
          id="depositActionSheet"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Balance</h5>
              </div>
              <div className="modal-body">
                <div className="action-sheet-content">
                  <form>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">From</label>
                        <select
                          className="form-control custom-select"
                          id="account1"
                        >
                          <option value="0">Savings (*** 5019)</option>
                          <option value="1">Investment (*** 6212)</option>
                          <option value="2">Mortgage (*** 5021)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <label className="label">Enter Amount</label>
                      <div className="input-group mb-2">
                        <span className="input-group-text" id="basic-addona1">
                          $
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter an amount"
                        />
                      </div>
                    </div>

                    <div className="form-group basic">
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        data-bs-dismiss="modal"
                      >
                        Deposit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade action-sheet"
          id="withdrawActionSheet"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Withdraw Money</h5>
              </div>
              <div className="modal-body">
                <div className="action-sheet-content">
                  <form>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">From</label>
                        <select
                          className="form-control custom-select"
                          id="account2d"
                        >
                          <option value="0">Savings (*** 5019)</option>
                          <option value="1">Investment (*** 6212)</option>
                          <option value="2">Mortgage (*** 5021)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">To</label>
                        <input
                          type="email"
                          className="form-control"
                          id="text11d"
                          placeholder="Enter IBAN"
                        />
                        <i className="clear-input">
                          <ion-icon name="close-circle"></ion-icon>
                        </i>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <label className="label">Enter Amount</label>
                      <div className="input-group mb-2">
                        <span className="input-group-text" id="basic-addonb1">
                          $
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter an amount"
                        />
                      </div>
                    </div>

                    <div className="form-group basic">
                      <button
                      onClick={frozenAccountToast}
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        data-bs-dismiss="modal"
                      >
                        Withdraw
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade action-sheet"
          id="sendActionSheet"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Money</h5>
              </div>
              <div className="modal-body">
                <div className="action-sheet-content">
                  <form>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">From</label>
                        <select
                          className="form-control custom-select"
                          id="account2"
                        >
                          <option value="0">Savings (*** 5019)</option>
                          <option value="1">Investment (*** 6212)</option>
                          <option value="2">Mortgage (*** 5021)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label">To</label>
                        <input
                          type="email"
                          className="form-control"
                          id="text11"
                          placeholder="Enter bank ID"
                        />
                        <i className="clear-input">
                          <ion-icon name="close-circle"></ion-icon>
                        </i>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <label className="label">Enter Amount</label>
                      <div className="input-group mb-2">
                        <span className="input-group-text" id="basic-addon1">
                          $
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter an amount"
                        />
                      </div>
                    </div>

                    <div className="form-group basic">
                      <button
                        type="button"
                        onClick={frozenAccountToast}
                        className="btn btn-primary btn-block btn-lg"
                        data-bs-dismiss="modal"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade action-sheet"
          id="exchangeActionSheet"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Exchange Money</h5>
              </div>
              <div className="modal-body">
                <div className="action-sheet-content">
                  <form>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group basic">
                          <div className="input-wrapper">
                            <label className="label">From</label>
                            <select
                              className="form-control custom-select"
                              id="currency1"
                            >
                              <option value="1">EUR</option>
                              <option value="2">USD</option>
                              <option value="3">AUD</option>
                              <option value="4">CAD</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group basic">
                          <div className="input-wrapper">
                            <label className="label">To</label>
                            <select
                              className="form-control custom-select"
                              id="currency2"
                            >
                              <option value="1">USD</option>
                              <option value="1">EUR</option>
                              <option value="2">AUD</option>
                              <option value="3">CAD</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <label className="label">Enter Amount</label>
                      <div className="input-group mb-2">
                        <span className="input-group-text" id="basic-addon2">
                          $
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter an amount"
                        />
                      </div>
                    </div>

                    <div className="form-group basic">
                      <button
                      onClick={frozenAccountToast}
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        data-bs-dismiss="modal"
                      >
                        Exchange
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="row mt-2">
            <div className="col-6">
              <div className="stat-box">
                <div className="title">Income</div>
                <h1 className="value">
                  {" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(user?.income ?? 0)}
                </h1>
              </div>
            </div>
            <div className="col-6">
              <div className="stat-box">
                <div className="title">Expenses</div>
                <h1 className="value text-danger">
                  {" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(user?.expence ?? 0)}
                </h1>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <div className="stat-box">
                <div className="title">Total Bills</div>
                <h1 className="value">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(user?.total_bills ?? 0)}
                </h1>
              </div>
            </div>
            <div className="col-6">
              <div className="stat-box">
                <div className="title">Savings</div>
                <h1 className="value">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(user?.savings ?? 0)}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="section mt-4">
          <div className="section-heading">
            <h2 className="title">Transactions</h2>
            <a href="#" onClick={frozenAccountToast} className="link">
              View All
            </a>
          </div>
          <div className="transactions">
            <a href="#" className="item">
              <div className="detail">
                <img
                  src="https://finapp.bragherstudio.com/view22/assets/img/sample/brand/1.jpg"
                  alt="img"
                  className="image-block imaged w48"
                />
                <div>
                  <strong>Amazon</strong>
                  <p>Shopping</p>
                </div>
              </div>
              <div className="right">
                <div className="price text-danger"> - $ 1,508</div>
              </div>
            </a>

            <a href="#" className="item">
              <div className="detail">
                <img
                  src="https://finapp.bragherstudio.com/view22/assets/img/sample/brand/2.jpg"
                  alt="img"
                  className="image-block imaged w48"
                />
                <div>
                  <strong>Apple</strong>
                  <p>Appstore Purchase</p>
                </div>
              </div>
              <div className="right">
                <div className="price text-danger">- $ 23,209</div>
              </div>
            </a>

            <a href="#" className="item">
              <div className="detail">
                <img
                  src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar3.jpg"
                  alt="img"
                  className="image-block imaged w48"
                />
                <div>
                  <strong>Alex Ljung</strong>
                  <p>Transfer</p>
                </div>
              </div>
              <div className="right">
                <div className="price">+ $ 1,8900</div>
              </div>
            </a>

            <a href="#" className="item">
              <div className="detail">
                <img
                  src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar4.jpg"
                  alt="img"
                  className="image-block imaged w48"
                />
                <div>
                  <strong>Beatriz Brito</strong>
                  <p>Transfer</p>
                </div>
              </div>
              <div className="right">
                <div className="price text-danger">- $ 186</div>
              </div>
            </a>
          </div>
        </div>

        <div className="section full mt-4">
          <div className="section-heading padding">
            <h2 className="title">My Cards</h2>
            <a href="#" onClick={frozenAccountToast} className="link">
              View All
            </a>
          </div>

          <div className="carousel-single splide">
            <div className="splide__track">
              <ul className="splide__list">
                <li className="splide__slide">
                  <div className="card-block bg-primary">
                    <div className="card-main">
                      <div className="card-button dropdown">
                        <button
                          type="button"
                          className="btn btn-link btn-icon"
                          data-bs-toggle="dropdown"
                        >
                          <ion-icon name="ellipsis-horizontal"></ion-icon>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a className="dropdown-item" href="#">
                            <ion-icon name="pencil-outline"></ion-icon>Edit
                          </a>
                          <a className="dropdown-item" href="#">
                            <ion-icon name="close-outline"></ion-icon>Remove
                          </a>
                          <a className="dropdown-item" href="#">
                            <ion-icon name="arrow-up-circle-outline"></ion-icon>
                            Upgrade
                          </a>
                        </div>
                      </div>
                      <div className="balance">
                        <span className="label">BALANCE</span>
                        <h1 className="title">$ 1,256,90</h1>
                      </div>
                      <div className="in">
                        <div className="card-number">
                          <span className="label">Card Number</span>
                          •••• 9905
                        </div>
                        <div className="bottom">
                          <div className="card-expiry">
                            <span className="label">Expiry</span>
                            12 / 25
                          </div>
                          <div className="card-ccv">
                            <span className="label">CCV</span>
                            553
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="splide__slide">
                  <div className="card-block bg-dark">
                    <div className="card-main">
                      <div className="card-button dropdown">
                        <button
                          type="button"
                          className="btn btn-link btn-icon"
                          data-bs-toggle="dropdown"
                        >
                          <ion-icon name="ellipsis-horizontal"></ion-icon>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a className="dropdown-item" href="#">
                            <ion-icon name="pencil-outline"></ion-icon>Edit
                          </a>
                          <a className="dropdown-item" href="#">
                            <ion-icon name="close-outline"></ion-icon>Remove
                          </a>
                          <a className="dropdown-item" href="#">
                            <ion-icon name="arrow-up-circle-outline"></ion-icon>
                            Upgrade
                          </a>
                        </div>
                      </div>
                      <div className="balance">
                        <span className="label">BALANCE</span>
                        <h1 className="title">$ 1,256,90</h1>
                      </div>
                      <div className="in">
                        <div className="card-number">
                          <span className="label">Card Number</span>
                          •••• 9905
                        </div>
                        <div className="bottom">
                          <div className="card-expiry">
                            <span className="label">Expiry</span>
                            12 / 25
                          </div>
                          <div className="card-ccv">
                            <span className="label">CCV</span>
                            553
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="splide__slide">
                  <div className="card-block bg-secondary">
                    <div className="card-main">
                      <div className="card-button dropdown">
                        <button
                          type="button"
                          className="btn btn-link btn-icon"
                          data-bs-toggle="dropdown"
                        >
                          <ion-icon name="ellipsis-horizontal"></ion-icon>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a className="dropdown-item" href="#">
                            <ion-icon name="pencil-outline"></ion-icon>Edit
                          </a>
                          <a className="dropdown-item" href="#">
                            <ion-icon name="close-outline"></ion-icon>Remove
                          </a>
                          <a className="dropdown-item" href="#">
                            <ion-icon name="arrow-up-circle-outline"></ion-icon>
                            Upgrade
                          </a>
                        </div>
                      </div>
                      <div className="balance">
                        <span className="label">BALANCE</span>
                        <h1 className="title">$ 1,256,90</h1>
                      </div>
                      <div className="in">
                        <div className="card-number">
                          <span className="label">Card Number</span>
                          •••• 9905
                        </div>
                        <div className="bottom">
                          <div className="card-expiry">
                            <span className="label">Expiry</span>
                            12 / 25
                          </div>
                          <div className="card-ccv">
                            <span className="label">CCV</span>
                            553
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section full mt-4">
          <div className="section-heading padding">
            <h2 className="title">Send Money</h2>
            <a href="#" className="link">
              Add New
            </a>
          </div>

          <div className="carousel-small splide">
            <div className="splide__track">
              <ul className="splide__list">
                <li className="splide__slide">
                  <a href="#">
                    <div className="user-card">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar2.jpg"
                        alt="img"
                        className="imaged w-100"
                      />
                      <strong>Jurrien</strong>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a href="#">
                    <div className="user-card">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar3.jpg"
                        alt="img"
                        className="imaged w-100"
                      />
                      <strong>Elwin</strong>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a href="#">
                    <div className="user-card">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar4.jpg"
                        alt="img"
                        className="imaged w-100"
                      />
                      <strong>Alma</strong>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a href="#">
                    <div className="user-card">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar5.jpg"
                        alt="img"
                        className="imaged w-100"
                      />
                      <strong>Justine</strong>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a href="#">
                    <div className="user-card">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar6.jpg"
                        alt="img"
                        className="imaged w-100"
                      />
                      <strong>Maria</strong>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a href="#">
                    <div className="user-card">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar7.jpg"
                        alt="img"
                        className="imaged w-100"
                      />
                      <strong>Pamela</strong>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a href="#">
                    <div className="user-card">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar8.jpg"
                        alt="img"
                        className="imaged w-100"
                      />
                      <strong>Neville</strong>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a href="#">
                    <div className="user-card">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar9.jpg"
                        alt="img"
                        className="imaged w-100"
                      />
                      <strong>Alex</strong>
                    </div>
                  </a>
                </li>
                <li className="splide__slide">
                  <a href="#">
                    <div className="user-card">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar10.jpg"
                        alt="img"
                        className="imaged w-100"
                      />
                      <strong>Stina</strong>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section full mt-4">
          <div className="section-heading padding">
            <h2 className="title">Monthly Bills</h2>
            <a href="/settings" className="link">
              View All
            </a>
          </div>

          <div className="carousel-multiple splide">
            <div className="splide__track">
              <ul className="splide__list">
                <li className="splide__slide">
                  <div className="bill-box">
                    <div className="img-wrapper">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/brand/1.jpg"
                        alt="img"
                        className="image-block imaged w48"
                      />
                    </div>
                    <div className="price">$ 14</div>
                    <p>Prime Monthly Subscription</p>
                    <a href="#" className="btn btn-primary btn-block btn-sm">
                      PAY NOW
                    </a>
                  </div>
                </li>

                <li className="splide__slide">
                  <div className="bill-box">
                    <div className="img-wrapper">
                      <img
                        src="https://finapp.bragherstudio.com/view22/assets/img/sample/brand/2.jpg"
                        alt="img"
                        className="image-block imaged w48"
                      />
                    </div>
                    <div className="price">$ 9</div>
                    <p>Music Monthly Subscription</p>
                    <a href="#" className="btn btn-primary btn-block btn-sm">
                      PAY NOW
                    </a>
                  </div>
                </li>

                <li className="splide__slide">
                  <div className="bill-box">
                    <div className="img-wrapper">
                      <div className="iconbox bg-danger">
                        <ion-icon name="medkit-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="price">$ 299</div>
                    <p>Monthly Health Insurance</p>
                    <a href="#" className="btn btn-primary btn-block btn-sm">
                      PAY NOW
                    </a>
                  </div>
                </li>

                <li className="splide__slide">
                  <div className="bill-box">
                    <div className="img-wrapper">
                      <div className="iconbox">
                        <ion-icon name="card-outline"></ion-icon>
                      </div>
                    </div>
                    <div className="price">$ 962</div>
                    <p>Credit Card Statement</p>
                    <a href="#" className="btn btn-primary btn-block btn-sm">
                      PAY NOW
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "40px" }} className="section mt-4">
          <div className="section-heading">
            <h2 className="title">Saving Goals</h2>
            <a href="app-savings.html" className="link">
              View All
            </a>
          </div>
          <div className="goals">
            <div className="item">
              <div className="in">
                <div>
                  <h4>Gaming Console</h4>
                  <p>Gaming</p>
                </div>
                <div className="price">$ 499</div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "85%" }}
                  aria-valuenow="85"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  85%
                </div>
              </div>
            </div>

            <div className="item">
              <div className="in">
                <div>
                  <h4>New House</h4>
                  <p>Living</p>
                </div>
                <div className="price">$ 100,000</div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "55%" }}
                  aria-valuenow="55"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  55%
                </div>
              </div>
            </div>

            <div className="item">
              <div className="in">
                <div>
                  <h4>Sport Car</h4>
                  <p>Lifestyle</p>
                </div>
                <div className="price">$ 42,500</div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "15%" }}
                  aria-valuenow="15"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  15%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="appBottomMenu">
        <a href="/dashboard" className="item active">
          <div className="col">
            <ion-icon name="pie-chart-outline"></ion-icon>
            <strong>Overview</strong>
          </div>
        </a>
        <a href="#" onClick={frozenAccountToast} className="item">
          <div className="col">
            <ion-icon name="document-text-outline"></ion-icon>
            <strong>Pages</strong>
          </div>
        </a>
        <a href="#" onClick={frozenAccountToast} className="item">
          <div className="col">
            <ion-icon name="apps-outline"></ion-icon>
            <strong>Components</strong>
          </div>
        </a>
        <a href="#" className="item">
          <div className="col">
            <ion-icon name="card-outline"></ion-icon>
            <strong>My Cards</strong>
          </div>
        </a>
        <a href="/settings" className="item">
          <div className="col">
            <ion-icon name="settings-outline"></ion-icon>
            <strong>Settings</strong>
          </div>
        </a>
      </div>

      <div
        className="modal fade panelbox panelbox-left"
        id="sidebarPanel"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="profileBox pt-2 pb-2">
                <div className="image-wrapper">
                  <img src="/main.jpg" alt="image" className="imaged  w36" />
                </div>
                <div className="in">
                  <strong>{user?.fullname ?? ""}</strong>
                  <div className="text-muted">ID: 4029209</div>
                </div>
                <a
                  href="#"
                  className="btn btn-link btn-icon sidebar-close"
                  data-bs-dismiss="modal"
                >
                  <ion-icon name="close-outline"></ion-icon>
                </a>
              </div>

              <div className="sidebar-balance">
                <div className="listview-title">Balance</div>
                <div className="in">
                  <h1 className="amount">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(user?.balance ?? 0)}
                  </h1>
                </div>
              </div>

              <div className="action-group">
                <a href="/dashboard" className="action-button">
                  <div className="in">
                    <div className="iconbox">
                      <ion-icon name="add-outline"></ion-icon>
                    </div>
                    Deposit
                  </div>
                </a>
                <a href="/dashboard" className="action-button">
                  <div className="in">
                    <div className="iconbox">
                      <ion-icon name="arrow-down-outline"></ion-icon>
                    </div>
                    Withdraw
                  </div>
                </a>
                <a href="/dashboard" className="action-button">
                  <div className="in">
                    <div className="iconbox">
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    Send
                  </div>
                </a>
                <a href="#" className="action-button">
                  <div className="in">
                    <div className="iconbox">
                      <ion-icon name="card-outline"></ion-icon>
                    </div>
                    My Cards
                  </div>
                </a>
              </div>

              <div className="listview-title mt-1">Menu</div>
              <ul className="listview flush transparent no-line image-listview">
                <li>
                  <a href="/dashboard" className="item">
                    <div className="icon-box bg-primary">
                      <ion-icon name="pie-chart-outline"></ion-icon>
                    </div>
                    <div className="in">
                      Overview
                      <span className="badge badge-primary">10</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={frozenAccountToast} className="item">
                    <div className="icon-box bg-primary">
                      <ion-icon name="document-text-outline"></ion-icon>
                    </div>
                    <div className="in">Pages</div>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={frozenAccountToast} className="item">
                    <div className="icon-box bg-primary">
                      <ion-icon name="apps-outline"></ion-icon>
                    </div>
                    <div className="in">Components</div>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={frozenAccountToast} className="item">
                    <div className="icon-box bg-primary">
                      <ion-icon name="card-outline"></ion-icon>
                    </div>
                    <div className="in">My Cards</div>
                  </a>
                </li>
              </ul>

              <div className="listview-title mt-1">Others</div>
              <ul className="listview flush transparent no-line image-listview">
                <li>
                  <a href="/settings" className="item">
                    <div className="icon-box bg-primary">
                      <ion-icon name="settings-outline"></ion-icon>
                    </div>
                    <div className="in">Settings</div>
                  </a>
                </li>
                <li>
                  <a href="component-messages.html" className="item">
                    <div className="icon-box bg-primary">
                      <ion-icon name="chatbubble-outline"></ion-icon>
                    </div>
                    <div className="in">Support</div>
                  </a>
                </li>
                <li>
                  <a onClick={logout} className="item">
                    <div className="icon-box bg-primary">
                      <ion-icon name="log-out-outline"></ion-icon>
                    </div>
                    <div className="in text-danger">Log out</div>
                  </a>
                </li>
              </ul>

              <div className="listview-title mt-1">Send Money</div>
              <ul className="listview image-listview flush transparent no-line">
                <li>
                  <a href="#" className="item">
                    <img
                      src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar2.jpg"
                      alt="image"
                      className="image"
                    />
                    <div className="in">
                      <div>Artem Sazonov</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <img
                      src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar3.jpg"
                      alt="image"
                      className="image"
                    />
                    <div className="in">
                      <div>Sophie Asveld</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="item">
                    <img
                      src="https://finapp.bragherstudio.com/view22/assets/img/sample/avatar/avatar4.jpg"
                      alt="image"
                      className="image"
                    />
                    <div className="in">
                      <div>Kobus van de Vegte</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal inset fade action-sheet ios-add-to-home"
        id="ios-add-to-home-screen"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add to Home Screen</h5>
              <a href="#" className="close-button" data-bs-dismiss="modal">
                <ion-icon name="close"></ion-icon>
              </a>
            </div>
            <div className="modal-body">
              <div className="action-sheet-content text-center">
                <div className="mb-1">
                  <img
                    src="https://finapp.bragherstudio.com/view22/assets/img/icon/192x192.png"
                    alt="image"
                    className="imaged w64 mb-2"
                  />
                </div>
                <div>
                  Install <strong>Finapp</strong> on your iPhone's home screen.
                </div>
                <div>
                  Tap <ion-icon name="share-outline"></ion-icon> and Add to
                  homescreen.
                </div>
                <div className="mt-2">
                  <button
                    className="btn btn-primary btn-block"
                    data-bs-dismiss="modal"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal inset fade action-sheet android-add-to-home"
        id="android-add-to-home-screen"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add to Home Screen</h5>
              <a href="#" className="close-button" data-bs-dismiss="modal">
                <ion-icon name="close"></ion-icon>
              </a>
            </div>
            <div className="modal-body">
              <div className="action-sheet-content text-center">
                <div className="mb-1">
                  <img
                    src="https://finapp.bragherstudio.com/view22/assets/img/icon/192x192.png"
                    alt="image"
                    className="imaged w64 mb-2"
                  />
                </div>
                <div>
                  Install <strong>Finapp</strong> on your Android's home screen.
                </div>
                <div>
                  Tap <ion-icon name="ellipsis-vertical"></ion-icon> and Add to
                  homescreen.
                </div>
                <div className="mt-2">
                  <button
                    className="btn btn-primary btn-block"
                    data-bs-dismiss="modal"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
