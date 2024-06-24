import React from "react";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

import "./Profile.css";

function Profile({
  handleCardClick,
  onAddItem,
  clothingItems,
  handleDeleteItem,
  handleAddClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
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
    </div>
  );
}

export default Profile;
