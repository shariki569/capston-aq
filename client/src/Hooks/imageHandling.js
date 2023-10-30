import axios from "axios";
import { useEffect, useState } from "react";

export const upload = async (files) => {
  try {
    const formData = new FormData();
      formData.append('file', files);
    const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/upload`, formData);
    return res.data;
  } catch (error) {
    console.error("Error Uploading image: ", error);
    throw new Error("Image upload failed. Please try again later.");
  }
};


export const uploadGalleryFiles = async (files) => {
  return await Promise.all(
    files.map(async (image) => {
      if (image.file) {
        return await upload(image.file);
      }
      return image.url;
    })
  );
}

// export const uploadArray = async (file, index) => {
//   try {
//     const formData = new FormData();
//     formData.append(`file${index}`, file);
//     const res = await axios.post("/api/upload", formData);
//     return res.data;
//   } catch (error) {
//     console.error("Error Uploading image: ", error);
//     throw new Error("Image upload failed. Please try again later.");
//   }
// };





// export const useImageUpload = async () => {
//   const [file, setFile ] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);





//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0){
//       const selectedFiles = e.target.files[0];
//       setFile(selectedFiles)
//       setPreviewImage(URL.createObjectURL(selectedFiles))
//     }
//   }

//   const removeFile = () =>{
//     if (file) {
//       setFile(null)
//       setPreviewImage(null)
//     } else if (existingImage){
//       setPreviewImage(null)
//     }
//   }

//   return {
//     file,
//     previewImage,
//     existingImage,
//     handleFileChange,
//     removeFile,
//     setExistingImage,
//     upload
//   }



// }