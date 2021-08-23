const path = require('path');
const DataUri = require('datauri/parser');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const dUri = new DataUri();

const getUri = file =>
  dUri.format(path.extname(file.originalname).toString(), file.buffer);

const uploadImage = async file => {
  const imageUri = getUri(file);
  const res = await cloudinary.uploader.upload(imageUri.content);
  const url = res.url;
  return url;
};

module.exports = uploadImage;
