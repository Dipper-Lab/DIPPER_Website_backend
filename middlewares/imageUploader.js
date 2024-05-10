const cloudinary = require("cloudinary").v2; //importing cloudinary
const { Public } = require("@prisma/client/runtime/library");
const { CloudinaryStorage } = require("multer-storage-cloudinary"); //importing cloudinary storage

require("dotenv").config(); //import .env

//setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//setup cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Dipper_Lab",
    allowedFormats: ["jpg", "png", "jpeg"],
    unique_filename: false,
    overwrite: true,
    public_id: (req, file) => {
      return `${file.originalname}`;
    },
  },
});

//export cloudinary storage
module.exports = { storage };
