import React from "react";
import { useNavigate } from "react-router-dom";

const nav = [
  {
    name: "Dashboard",
    path: "",
    icon: "/assets/images/nav/dashboard.svg",
  },
  {
    name: "Languages",
    path: "",
    icon: "/assets/images/nav/languages.svg",
  },
  {
    name: "Mentoring",
    path: "",
    icon: "/assets/images/nav/mentoring.svg",
  },
  {
    name: "Contribute",
    path: "",
    icon: "/assets/images/nav/contribute.svg",
  },
];

const logo = "/assets/images/logo.svg";
const messenger = "/assets/images/nav/messenger.svg";
const badgeIndicator = "/assets/images/nav/badge-indicator.svg";
const bell = "/assets/images/nav/bell.svg";
const badge = "/assets/images/nav/badge.svg";
const avatar = "/assets/images/avatar.svg";
const menu = "/assets/images/menu.svg";

function Header() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");
  return (
    <header>
      <nav>
        <div className="logo-container" onClick={() => goHome()}>
          <img src={logo} alt="logo" />
        </div>
        <div className="menu">
          <ul>
            {nav.map((item) => (
              <li key={item.name}>
                <img src={item.icon} alt={item.name} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="notification-section">
          <li className="badge">
            <img src={messenger} alt="messages" />
            <span className="dot"></span>
          </li>
          <li className="badge">
            <img src={badgeIndicator} alt="badge-indicator" />
            <span className="dot"></span>
          </li>
          <li className="notification">
            <img src={bell} alt="notification" />
            <span className="count-container">2</span>
          </li>
          <li className="tag">
            <div className="box">
              <img src={badge} alt="notification" />
              <span>300k</span>
              <span className="dot"></span>
            </div>
          </li>
        </ul>

        <ul className="profile-section">
          <li className="profile">
            <img src={avatar} alt="avatar" />
          </li>
          <li>
            <img src={menu} alt="menu" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
