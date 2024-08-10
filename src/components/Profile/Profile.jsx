import React, { useState } from "react";

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
  onCardLike,
  handleProfileUpdate,
  handleLogout,
}) {
  const [activeModal, setActiveModal] = useState("");

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleLogout={handleLogoutClick}
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
          onCardLike={onCardLike}
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
