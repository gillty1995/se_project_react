import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./AddItemModal.css";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !imageUrl || !weather) {
      alert("Please fill out all fields.");
      return;
    }

    onAddItem({ name, imageUrl, weather }, () => {
      setName("");
      setImageUrl("");
      setWeather("");
      closeActiveModal();
    });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      isFormValid={name && imageUrl && weather}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image URL{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
          required
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherTypeChange}
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherTypeChange}
            required
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherTypeChange}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
