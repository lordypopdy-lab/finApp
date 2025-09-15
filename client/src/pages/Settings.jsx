import React from 'react'

const Settings = () => {
  return (
    <div>

    <div className="appHeader">
        <div className="left">
            <a href="/dashboard" className="headerButton goBack">
                <ion-icon name="chevron-back-outline"></ion-icon>
            </a>
        </div>
        <div className="pageTitle">
            Settings
        </div>
        <div className="right">
            <a href="app-notifications.html" className="headerButton">
                <ion-icon className="icon" name="notifications-outline"></ion-icon>
                <span className="badge badge-danger">4</span>
            </a>
        </div>
    </div>

    <div id="appCapsule">

        <div className="section mt-3 text-center">
            <div className="avatar-section">
                <a href="#">
                    <img src="/main.jpg" alt="avatar" className="imaged w100 rounded" />
                    <span className="button">
                        <ion-icon name="camera-outline"></ion-icon>
                    </span>
                </a>
            </div>
        </div>


        <div className="listview-title mt-1">Notifications</div>
        <ul className="listview image-listview text inset">
            <li>
                <div className="item">
                    <div className="in">
                        <div>
                            Payment Alert
                            <div className="text-muted">
                                Send notification when new payment received
                            </div>
                        </div>
                        <div className="form-check form-switch  ms-2">
                            <input className="form-check-input" type="checkbox" id="SwitchCheckDefault1" checked />
                            <label className="form-check-label"></label>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a href="#" className="item">
                    <div className="in">
                        <div>Notification Sound</div>
                        <span className="text-primary">Beep</span>
                    </div>
                </a>
            </li>
        </ul>

        <div className="listview-title mt-1">Profile Settings</div>
        <ul className="listview image-listview text inset">
            <li>
                <a href="#" className="item">
                    <div className="in">
                        <div>Change Username</div>
                    </div>
                </a>
            </li>
            <li>
                <a href="#" className="item">
                    <div className="in">
                        <div>Update E-mail</div>
                    </div>
                </a>
            </li>
            <li>
                <a href="#" className="item">
                    <div className="in">
                        <div>Address</div>
                        <span className="text-primary">Edit</span>
                    </div>
                </a>
            </li>
            <li>
                <div className="item">
                    <div className="in">
                        <div>
                            Private Profile
                        </div>
                        <div className="form-check form-switch ms-2">
                            <input className="form-check-input" type="checkbox" id="SwitchCheckDefault2" />
                            <label className="form-check-label"></label>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

        <div className="listview-title mt-1">Security</div>
        <ul className="listview image-listview text mb-2 inset">
            <li>
                <a href="#" className="item">
                    <div className="in">
                        <div>Update Password</div>
                    </div>
                </a>
            </li>
            <li>
                <div className="item">
                    <div className="in">
                        <div>
                            2 Step Verification
                        </div>
                        <div className="form-check form-switch ms-2">
                            <input className="form-check-input" type="checkbox" id="SwitchCheckDefault3" checked />
                            <label className="form-check-label"></label>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a href="#" className="item">
                    <div className="in">
                        <div>Log out all devices</div>
                    </div>
                </a>
            </li>
        </ul>


    </div>

    <div className="appBottomMenu">
        <a href="/dashboard" className="item">
            <div className="col">
                <ion-icon name="pie-chart-outline"></ion-icon>
                <strong>Overview</strong>
            </div>
        </a>
        <a href="app-pages.html" className="item">
            <div className="col">
                <ion-icon name="document-text-outline"></ion-icon>
                <strong>Pages</strong>
            </div>
        </a>
        <a href="app-components.html" className="item">
            <div className="col">
                <ion-icon name="apps-outline"></ion-icon>
                <strong>Components</strong>
            </div>
        </a>
        <a href="app-cards.html" className="item">
            <div className="col">
                <ion-icon name="card-outline"></ion-icon>
                <strong>My Cards</strong>
            </div>
        </a>
        <a href="app-settings.html" className="item active">
            <div className="col">
                <ion-icon name="settings-outline"></ion-icon>
                <strong>Settings</strong>
            </div>
        </a>
    </div>

    </div>
  )
}

export default Settings
