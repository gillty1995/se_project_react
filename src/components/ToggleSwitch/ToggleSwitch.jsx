import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          className="switch__box"
          checked={currentTemperatureUnit === "C"}
          onChange={handleToggleSwitchChange}
        />
        <span
          className={
            currentTemperatureUnit === "F"
              ? "switch__slider switch__slider-F"
              : "switch__slider switch__slider-C"
          }
        ></span>
        <p
          className={`switch__slider-F ${
            currentTemperatureUnit === "F" && "switch__active-F"
          }`}
        >
          F
        </p>
        <p
          className={`switch__slider-C ${
            currentTemperatureUnit === "C" && "switch__active-C"
          }`}
        >
          C
        </p>
      </label>
    </div>
  );
};

export default ToggleSwitch;
