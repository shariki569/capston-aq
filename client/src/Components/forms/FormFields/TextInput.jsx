import React from "react";

const TextInput = ({ label, width, type, value, onChange, placeholder, min, max, containerClass, name }) => {
 
  const inputContainerClassName = `text-input ${containerClass|| ''}`;
  const inputStyle = {
    width: width ? `${width}%` : "auto"
  }

  return (
    <div className={inputContainerClassName}>
      {label && <label className="label">{label}</label>}
      <input
        className="input"
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        maxLength={max}
        style={inputStyle}
        />
    </div>
  );
};

export default TextInput;
