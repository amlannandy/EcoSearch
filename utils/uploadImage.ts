import { extname } from "path";
import DataUri from "datauri/parser";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const dUri = new DataUri();

const getUri = (file: any) =>
  dUri.format(extname(file.originalname).toString(), file.buffer);

const uploadImage = async (file: any) => {
  const imageUri = getUri(file);
  if (!imageUri) {
    return null;
  }
  const res = await cloudinary.uploader.upload((imageUri as any).content);
  const url = res.url;
  return url;
};

export default uploadImage;
