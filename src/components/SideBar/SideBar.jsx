import { useContext } from "react";

import "./SideBar.css";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.svg";

function SideBar({ handleEditProfileClick }) {
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
        <button type="button" className="sidebar__log-out">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
