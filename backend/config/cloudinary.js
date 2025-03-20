import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: "dhqklgrqc",
    api_key: "/* Api key*/",
    api_secret: "/* Api secret*/",
  });
};
export default connectCloudinary;
