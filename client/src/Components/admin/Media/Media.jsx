import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediaInfoMenu from './MediaInfoMenu';

const Media = () => {
  const [imagePaths, setImagePaths] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get('/api/images')
        setImagePaths(res.data)
        console.log(res.data)
      } catch (err) {
        console.error('Error fetching image paths:', err);
      }
    }
    fetchImage()
  }, []);

  const toggleImageSelection = (path) => {
    if (selectedImages.includes(path)) {
      setSelectedImages(selectedImages.filter((selectedPath) => selectedPath !== path))
    } else {
      setSelectedImages([...selectedImages, path])
    }
  }

 
  const handleDelete = async (fileNames) => {
    try {
      const promises = fileNames.map(async (fileName) => {
        await axios.delete(`/api/images/${fileName}`);
      });

      await Promise.all(promises);

      // Update selectedImages state after all deletions are successful
      // setSelectedImages(selectedImages.filter((selectedPath) => !fileNames.includes(selectedPath)));
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };



  console.log(selectedImages);

  const isSelected = (path) => selectedImages.includes(path);
  const dummyImagePaths = ['/image1.jpg', '/image2.jpg'];

  return (
    <>
      <h2 className='dashboard-header'>Media Gallery</h2>
      <div className="add">
        <div className="content">
          <div className="media-grid-container">
            <MediaInfoMenu selectedImages={selectedImages} onDelete={handleDelete} />
            <div className='media-grid'>
              {imagePaths.map((path, index) => (
                <div
                  key={index}
                  className={`gallery-wrapper ${isSelected(path) ? 'selected' : ''}`}
                  onClick={() => toggleImageSelection(path)}
                >
                  <img
                    loading='lazy'
                    className='gallery-image'
                    src={`/upload/${path}`}
                    alt={`Image ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="menu">
          helo
        </div>
      </div>
    </>

  )
}

export default Media
