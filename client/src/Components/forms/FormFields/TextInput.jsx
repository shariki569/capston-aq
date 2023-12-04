import React, { useEffect, useState } from "react";
import InlineError from "../FormValidation/InlineError";

const TextInput = ({  label, width, type, value, onChange, placeholder, min, max, containerClass, name, error }) => {

  const inputContainerClassName = `text-input ${containerClass || ''}`;

  const inputStyle = {
    width: width ? `${width}%` : "auto",
  }

  // Maintain local state for value and error
  const [localValue, setLocalValue] = useState(value);
  const [localError, setLocalError] = useState(error);
  const [inputClassname, setInputClassname] = useState('input');

  useEffect(() => {
    // Update local state when the value prop changes
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    // Update local state when the error prop changes
    setLocalError(error);

    error ? setInputClassname('input errorInput') : setInputClassname('input');

  }, [error]);

  // Handle input change
  const handleChange = (e) => {
    // Clear the local error when the input value changes
    if (localError) {
      setLocalError("");
    }
    setInputClassname("input");
    setLocalValue(e.target.value);
    onChange(e);
  };
  return (
    <div className={inputContainerClassName}>
      {label && <label className="label">{label}</label>}
      <input
        // required = {required}
        className={inputClassname}
        type={type}
        value={localValue}
        key={error}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
        maxLength={max}
        style={inputStyle}
   
      />
      {localError && <InlineError error={localError} />}
    </div>
  );
};

export default TextInput;
