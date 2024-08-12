import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, openRegisterModal, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");

    handleLogin({ email, password });
  };

  const isFormValid = email && password;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError("");
    }
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="login-email" className="modal__label">
        {emailError ? emailError : "Email"}
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
      <label
        htmlFor="login-password"
        className={`modal__label ${passwordError ? "modal__label_error" : ""}`}
      >
        {passwordError ? passwordError : "Password"}
        <input
          className={`modal__input ${
            passwordError ? "modal__input_error" : ""
          }`}
          type="password"
          id="login-password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
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
