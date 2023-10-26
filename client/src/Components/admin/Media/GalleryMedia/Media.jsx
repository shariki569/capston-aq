import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediaInfoMenu from './MediaInfoMenu';
import ImageUploader from '../../../util/ImageUploader';


const Media = () => {
  const [imagePaths, setImagePaths] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images');
        setImagePaths(response.data);
        setTotalImages(response.data.length);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching image paths:', error);
      }
    };

    fetchImages();
  }, []);

  const toggleImageSelection = (path) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(path)) {
        return prevSelectedImages.filter(
          (selectedPath) => selectedPath !== path
        );
      } else {
        return [...prevSelectedImages, path];
      }
    });
  };

  const handleDelete = async (fileNames) => {
    try {
      const promises = fileNames.map(async (fileName) => {
        await axios.delete(`/api/images/${fileName}`);
      });
      await Promise.all(promises);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseImage = () => {
    setSelectedImages([]);
  };
  
  const isSelected = (path) => selectedImages.includes(path);

  return (
    <>
      <h2 className='dashboard-header'>Media Gallery</h2>

      <div className='add'>
        <div className='content'>
          <div className='media-grid-container'>
            <MediaInfoMenu
              totalImages={totalImages}
              selectedImages={selectedImages}
              onDelete={handleDelete}
              onClose={handleCloseImage}
            />
            <div className='media-grid'>
              {isLoading && <p>Loading...</p>}
              {imagePaths.map((path, index) => (
                <div
                  key={index}
                  className={`gallery-wrapper ${
                    isSelected(path) ? 'selected' : ''
                  }`}
                  onClick={() => toggleImageSelection(path)}
                >
                  <img
                    className='gallery-image'
                    src={`/upload/${path}`}
                    alt={`Image ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='menu'>
          <ImageUploader/>
        </div>
      </div>
    </>
  );
};
export default Media
