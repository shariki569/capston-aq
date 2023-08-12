import React from "react";

const TextInput = ({ label, type, value, onChange, placeholder, min, max }) => {
  return (
    <div className="text-input">
      {label && <label className="label">{label}</label>}
      <input
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        maxLength={max}
        />
    </div>
  );
};

export default TextInput;
