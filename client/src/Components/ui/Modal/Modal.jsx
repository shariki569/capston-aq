import React from 'react'
import './modal.scss'

const Modal = ({ children, closeModal }) => {

  const handleClick = (e) => {
    if (e.target.classList.contains('dismiss')) {
      closeModal()
    }
  }
  return ( 
    <div className='modal dismiss' onClick={handleClick}>
      <div className='modal__content'>
        {children}
      </div>
    </div>
  )
}

export default Modal
