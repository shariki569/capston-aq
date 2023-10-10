import React from 'react';
import { FiXSquare } from 'react-icons/fi';
import placeholder from '../../img/placeholder-image.webp';
import ImageGalleryUploader from './ImageGalleryUploader';
// import { useImageUpload } from '../../Hooks/imageHandling';

// const ImageUploader = (props) => {
//   const {
//     file,
//     previewImage,
//     handleImageChange,
//     removeSelectedImage,
//     existingImage,
//     multiple,
//     isFeatured,
//     title,
//     galleryImages,
//     handleGalleryImage,
//     toggleFeatured,
//   } = props;

//   const addGalleryImage = (image) => {
//     handleGalleryImage([...galleryImages, image]);
//   }

//   const removeGalleryImage = (index) => {
//     const updateGallery = [...galleryImages];
//     updateGallery.splice(index, 1);
//     handleGalleryImage(updateGallery);
//   }



//   return (
//     <>
//       <span>{title}</span>
//       <div className="img-preview">
//         <div className="featured-image">
//           {isFeatured ? (
//             <div className="thumbnail">
//               <img src={file ? previewImage : `/upload/${existingImage}`} alt="thumb" />
//               <button onClick={removeSelectedImage}><FiXSquare size={20} /></button>
//             </div>
//           ) : (
//             <div className="thumbnail">
//               <img src={file ? previewImage : placeholder} alt="placeholder" />
//             </div>
//           )}
//         </div>

//         {multiple && (
//           <div className='gallery-images'>
//             {galleryImages.map((galleryImage, index) => (
//               <div className="thumbnail" key={index}>
//                 <img src={galleryImage.preview} alt="thumb" />
//                 <button onClick={() => removeGalleryImage(index)}><FiXSquare size={20} /></button>
//               </div>
//             ))}
//           </div>
//         )}

//         {multiple && (
//           <div className='img-button'>
//             <input multiple style={{ display: "none" }} type="file" id='file' onChange={(e) => {
//               handleImageChange(e);
//               addGalleryImage({ file: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) });
//             }} />
//             <label htmlFor="file" className='file' encType="multipart/form-data">
//               {existingImage ? "Change Images" : "Upload Images"}
//             </label>
//           </div>
//         )}

//         {isFeatured && !multiple && (
//           <div className="featured-checkbox">
//             <input
//               type="checkbox"
//               id="featured"
//               checked={isFeatured}
//               onChange={toggleFeatured}
//             />
//             <label htmlFor="featured">Set as Featured</label>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default ImageUploader;
const ImageUploader = (props) => {
  const {
    file,
    previewImage,
    handleImageChange,
    removeSelectedImage,
    existingImage,
    title
  } = props;


  // const galleryImagesArray = Array.isArray(galleryImages) ? galleryImages : [];
  return (
    <>
      <span>{title}</span>
      <div className="img-preview">
        {file ? (
          <div className="thumbnail">
            <img src={previewImage} alt="thumb" />
            <button onClick={removeSelectedImage}><FiXSquare size={20} /></button>
          </div>
        ) : (
          existingImage ? (
            <div className="thumbnail">
              <img src={`/upload/${existingImage}`} alt="thumb" />
            </div>
          ) : (
            <div className="thumbnail">
              <img src={placeholder} alt="placeholder" />
            </div>
          )
        )}

        <div className='img-button'>
          <input style={{ display: "none" }} type="file" id='file' onChange={handleImageChange} />
          <label htmlFor="file" className='file' encType="multipart/form-data">
            {existingImage ? "Change Image" : "Upload"}
          </label>
        </div>
      </div>
    </>
  );
}

export default ImageUploader;