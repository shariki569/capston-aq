import React from 'react'
import './modal.scss'
import { FiX } from 'react-icons/fi'

const Modal = ({ children, closeModal, dialogMsg, symbol, warning, error }) => {

  const handleClick = (e) => {
    if (e.target.classList.contains('dismiss')) {
      closeModal()
    }
  }
  return ( 
    <div className='modal dismiss' onClick={handleClick}>
      <div className='modal__content'>
        <button className='modal__close'><FiX className='dismiss'/></button>

        {dialogMsg && 
          <p className={'dialog-msg ' + (warning ? 'warning' : error ? 'error' : '')}>{symbol}{dialogMsg}</p>
        }
        {children}
      </div>
    </div>
  )
}

export default Modal
