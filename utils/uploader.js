const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploader = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.filepath,
      { folder: "furnitura/users" },
      (err, res) => {
        if (err) return reject(err);
        return resolve({ url: res.secure_url, publicId: res.public_id });
      }
    );
  });
};
