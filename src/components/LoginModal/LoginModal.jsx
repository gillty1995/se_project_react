import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { loginUser } from "../../utils/auth";

const LoginModal = ({ isOpen, onClose }) => {
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
      <label htmlFor="login-email">
        Email
        <input
          type="email"
          id="login-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="login-password">
        Password
        <input
          type="password"
          id="login-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
