import React, { useState, useContext } from "react";

import { updateUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import "./Profile.css";

function Profile({
  handleCardClick,
  onAddItem,
  clothingItems,
  handleDeleteItem,
  handleAddClick,
  currentUser,
}) {
  const [activeModal, setActiveModal] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleProfileUpdate = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        console.log("Profile updated successfully:", updatedUser);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleLogout={handleLogout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          items={clothingItems}
          handleCardClick={handleCardClick}
          onAddItem={onAddItem}
          handleDeleteItem={handleDeleteItem}
          handleAddClick={handleAddClick}
          currentUser={currentUser}
        />
      </section>
      {activeModal === "edit-profile" && (
        <EditProfileModal
          isOpen={true}
          onClose={closeActiveModal}
          handleProfileUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
}

export default Profile;
