// import fs from "fs/promises";
// import path from "path";


// const imageDirectory = "../client/public/upload";

// export const getUploadedImages = async (req, res) => {
//   try {
//     const files = await fs.readdir(imageDirectory);
//     res.json(files);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: "Could not list images" });
//   }
// };

// export const deleteImages = async (req, res) => {
//   const fileNames = req.params.fileNames.split(','); // Split the fileNames parameter into an array


//   try {
//     const deletePromises = fileNames.map(async (fileName) => {
//       const imgPath = path.join(imageDirectory, fileName);

//       try {
//         await fs.unlink(imgPath);
//         return fileName;
//       } catch (error) {
//         return Promise.reject(`Image not found or could not be deleted: ${fileName}`);
//       }
//     });

//     Promise.allSettled(deletePromises)
//       .then((results) => {
//         const deletedFileNames = results
//           .filter((result) => result.status === 'fulfilled')
//           .map((result) => result.value);

//         if (deletedFileNames.length > 0) {
//           res.status(200).json({ message: `Images deleted successfully: ${deletedFileNames.join(', ')}` });
//         } else {
//           res.status(404).json({ error: 'No images found for deletion.' });
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to delete images.' });
//       });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Could not delete images.' });
//   }
// };


// (req, res) => {
//   const fileName = req.params.fileName;

//   // Assuming that your images are stored in a directory called "uploads"
//   const imagePath = `./uploads/${fileName}`;

//   // Check if the file exists
//   if (fs.existsSync(imagePath)) {
//     // If the file exists, delete it
//     fs.unlinkSync(imagePath);
//     res.status(200).json({ message: 'Image deleted successfully' });
//   } else {
//     // If the file doesn't exist, return a 404 error
//     res.status(404).json({ error: 'Image not found' });
//   }
// });

// export const deleteImages = async (req, res) => {
//   const fileName = req.params.fileName;
//   const imgPath = `../client/public/upload/${fileName}`;

//   try {
//     if (fs.existsSync(imgPath)) {
//       fs.unlink(imgPath, (err) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ error: "Failed to delete image" });
//         } else {
//           res.status(200).json({ message: "Image deleted successfully" });
//         }
//       });
//     } else {
//       res.status(404).json({ error: "Image not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: "Could not delete image", err });
//   }
// };

// export const deleteImages = async (req, res ) => {
//   const imageDirectory = '../client/public/upload';
//   const filename = req.body.filename;

//   try {

//     const fileExists = await fs.access(`${imageDirectory}/${imageName}`)
//     .then(() => true)
//     .catch(() => false);

//     if (!fileExists) {
//       // Return an error response if the image file does not exist
//       return res.status(404).json({ error: 'Image not found' });
//     }

//     await fs.unlink(path.join(imageDirectory, imageName));
//     res.json('Image deleted');
//   }catch (err) {
//     console.error(err);
//     res.status(500).json({err: 'Could not delete image', err});
//   }

// }
