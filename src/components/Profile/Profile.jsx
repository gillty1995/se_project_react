import React, { useContext } from "react";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Profile.css";

function Profile({
  handleCardClick,
  onAddItem,
  clothingItems,
  handleDeleteItem,
  handleAddClick,
  onCardLike,
  handleProfileUpdate,
  handleLogout,
  activeModal,
  closeEditProfileModal,
  handleEditProfileClick,
}) {
  const currentUser = useContext(CurrentUserContext);

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
      <EditProfileModal
        isOpen={activeModal === "edit-profile"}
        onClose={closeEditProfileModal}
        handleProfileUpdate={handleProfileUpdate}
        currentUser={currentUser}
      />
    </div>
  );
}

export default Profile;
