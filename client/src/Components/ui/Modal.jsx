import React from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'

const Modal = ({ closeModal, images, handleForward, handlePrevious, currentIndex }) => {

    const handleClick = (e) => {
        if (e.target.classList.contains('dismiss')) {
            closeModal()
        }
    }
    return (
        <div className="modal dismiss" onClick={
            handleClick
        }>
            <div className='overlay'>
                <div className="image-gallery">
                    {images.map((image, index) => (
                        <img  key={index} src={`upload/${image}`} alt=""  className={`image-modal  ${index === currentIndex ? 'active' : ''}`}/>
                    ))}
                </div>
                <button className='dismiss' onClick={handleClick}>X</button>
            </div>
            {/* <div className="overlay-buttons"> */}
                
                <span onClick={handlePrevious} className='overlay-arrow-left'>
                    <FiChevronLeft color='white' size={30} />
                </span>
                <span onClick={handleForward} className='overlay-arrow-right'>
                    <FiChevronRight color='white' size={30} />
                </span>
            {/* </div> */}
        </div>
    )
}

export default Modal
