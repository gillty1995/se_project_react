import { useContext } from "react";

import "./SideBar.css";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt="Default avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
      <div className="sidebar__options">
        <button
          type="button"
          className="sidebar__edit-profile"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__log-out"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
