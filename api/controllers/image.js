import fs from "fs";
import path from "path";


export const uploadedImages = async (req, res) => {
    
    try {
      const uploadDir = path.join(__dirname, '../client/public/upload');
      const files = fs.readdir(uploadDir);
  
      const imageFiles = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return whitelist.includes(`/image/${ext.substring(1)}`);
      })
     
      console.log(imageFiles);
  
      res.json({images: imageFiles});
    } catch (err) {
      console.error(err);
      res.status(500).json({err: 'Could not list images'});
    }
   
  }