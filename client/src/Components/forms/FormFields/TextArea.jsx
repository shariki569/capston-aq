import React from 'react'

const TextArea = ({label, value, onChange, placeholder, rows, cols}) => {
  return (
    <div className='text-area'>
      {label && <label>{label}</label>}
      <textarea
        className='text-area-input'
        value={value}
        onChange={(e)=> onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
      />
    </div>
  )
}

export default TextArea
