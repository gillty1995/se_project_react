import React, { useState, useContext } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUser } from "../../utils/api";

import "./Profile.css";

function Profile({
  handleCardClick,
  onAddItem,
  clothingItems,
  handleDeleteItem,
  handleAddClick,
}) {
  const [activeModal, setActiveModal] = useState("");

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

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditProfileClick={handleEditProfileClick} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          items={clothingItems}
          handleCardClick={handleCardClick}
          onAddItem={onAddItem}
          handleDeleteItem={handleDeleteItem}
          handleAddClick={handleAddClick}
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
