import React, { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, onClose, handleProfileUpdate }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      handleProfileUpdate({ name, avatar });
      closeModal();
    } else {
      alert("Please fill out all fields.");
    }
  };

  const isFormValid = true;

  const closeModal = () => {
    setName("");
    setAvatar("");
    onClose();
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={closeModal}
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
