import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

const MediaInfoMenu = ({selectedImages, onDelete}) => {
  // function handleDeleteClick {
  //   onDelete(selectedImages)
  // }

  function handleDeleteClick() {
    onDelete(selectedImages)
  }
  
  return (
    <div className='media-info-menu'>
      <p>{`${selectedImages.length} selected`}</p>
      {selectedImages.length > 0 && (
        <button className='delete-button' onClick={handleDeleteClick}>
            <BsFillTrashFill/>
        </button>
      )}
    </div>
  )
}

export default MediaInfoMenu
