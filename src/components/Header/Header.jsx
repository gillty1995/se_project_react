import "./Header.css";

import { Link } from "react-router-dom";

import avatar from "../../assets/avatar.svg";
import logo from "../../assets/logo.png";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__user-container">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Avatar" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
