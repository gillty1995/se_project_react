import React, { useState } from "react";

import "./RegisterModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { registUser } from "../../utils/auth";

const RegisterModal = ({ isOpen, onClose, openLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    registUser({ email, password, name, avatar })
      .then((data) => {
        console.log("Registration successful:", data);
        onClose();
      })
      .catch((error) => {
        console.log("Registration error:", error);
      });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          type="text"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
      <button
        type="button"
        className="modal__login-btn"
        onClick={() => {
          onClose();
          openLoginModal();
        }}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
