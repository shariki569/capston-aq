// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config();

// var timestamp = Math.round(new Date().getTime() / 1000);

// var signature = cloudinary.utils.api_sign_request(
//   {
//     timestamp: timestamp,
//     eager: "w_400,h_300,c_pad|w_260,h_200,c_crop",
//     public_id: "sample_image",
//   },
//   process.env.CLOUDINARY_API_SECRET
// );

// var curl_command =
//   'curl -d "file=' +
//   file +
//   "&api_key=323127161127519&eager=w_400,h_300,c_pad|w_260,h_200,c_crop&public_id=sample_image" +
//   "&timestamp=" +
//   timestamp +
//   "&signature=" +
//   signature +
//   '" -X POST http://api.cloudinary.com/v1_1/carl/image/upload';
