import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

const EditProfileModal = ({
  isOpen,
  onClose,
  handleProfileUpdate,
  currentUser,
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name || avatar) {
      handleProfileUpdate({ name, avatar });
    } else {
      alert("Please fill out at least one field.");
    }
  };

  const isFormValid = name || avatar;

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="update-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="update-name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="update-avatar" className="modal__label">
        Avatar URL
        <input
          type="text"
          className="modal__input"
          id="update-avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
