import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Media = () => {
  const [imagePaths, setImagePaths] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get('/api/getUpload')
        setImagePaths(res.data.imagePaths)
        console.log(res.data.imagePaths)
      } catch (err) {
        console.error('Error fetching image paths:', err);
      }
    }
    fetchImage()
  }, []);
  const dummyImagePaths = ['/image1.jpg', '/image2.jpg'];

  return (

    <div className='gallery'>
       {imagePaths.map((path, index) => (
         <img key={index} src={`/upload/${path}` }  alt={`Image ${index}`} />
       ))}
    </div>

  )
}

export default Media
