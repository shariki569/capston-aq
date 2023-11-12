// import cloudinary from "../utils/cloudinary.js";

// export const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }
//     const result = await cloudinary.uploader.upload(
//       req.file.path,
//       {
//         public_id: req.file.filename,
//         overwrite: true,
//         invalidate: true,
//         resource_type: "auto",
//         folder: "images",
//         unique_filename: false,
//         use_filename: true,
//         tags: ["images"],
//         mode: "public",
//         signature: true,
//       },
//       function (error, result) {
//         if (error) {
//           console.log(error);
//         }
//         return res.status(200).json({
//           data: result,
//           success: true,
//           message: "Image uploaded successfully",
//         });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };
