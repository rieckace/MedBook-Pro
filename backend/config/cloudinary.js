import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: "dhqklgrqc",
    api_key: "863363933837532",
    api_secret: "q_s1442kG4eMnYoHQuZfomfbDdI",
  });
};
export default connectCloudinary;
