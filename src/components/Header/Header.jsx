import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";

import logo from "../../assets/logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  openLoginModal,
  openRegisterModal,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext) || {};

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

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
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="Avatar"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {getInitials(currentUser.name)}
                </div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={openRegisterModal}
              type="button"
              className="header__register-btn"
            >
              Sign Up
            </button>
            <button
              onClick={openLoginModal}
              type="button"
              className="header__login-btn"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
