import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { loginUser } from "../../utils/auth";

import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, openRegisterModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password })
      .then((data) => {
        console.log("Login successful:", data);
        onClose();
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          id="login-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          id="login-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button
        type="button"
        className="modal__register-btn"
        onClick={() => {
          onClose();
          openRegisterModal();
        }}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
