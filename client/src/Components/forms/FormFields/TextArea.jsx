import React, { useEffect, useState } from 'react'
import InlineError from '../FormValidation/InlineError';

const TextArea = ({ label, value, onChange, placeholder, rows, cols, error, onKeyUp, disabled, onKeyDown, }) => {

  const [localValue, setLocalValue] = useState(value);
  const [localError, setLocalError] = useState(error);
  const [inputClassname, setInputClassname] = useState('text-area-input');

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    setLocalError(error);
    error ? setInputClassname('text-area-input errorInput') : setInputClassname('text-area-input');
  }, [error])

  const handleChange = (e) => {
    // Clear the local error when the input value changes
    if (localError) {
      setLocalError("");
    }
    setInputClassname("text-area-input");
    setLocalValue(e.target.value);
    onChange(e);
  };

  return (
    <div className='text-area'>
      {label && <label className='label'>{label}</label>}
      <textarea
        className={inputClassname}
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        disabled={disabled}
         />
      {localError && <InlineError error={localError} />}
    </div>
  )
}

export default TextArea