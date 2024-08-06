import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { registUser } from "../../utils/auth";

const RegisterModal = ({ isOpen, onClose }) => {
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
      title="Register"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email">
        Email
        <input
          type="email"
          id="register-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="register-password">
        Password
        <input
          type="password"
          id="register-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label htmlFor="register-avatar">
        Avatar URL
        <input
          type="text"
          id="register-avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
      <label htmlFor="register-name">
        Name
        <input
          type="text"
          id="register-name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
