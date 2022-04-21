const cloudinary = require("cloudinary").v2;
const path = require("path");
const Datauri = require("datauri");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploader = (req) => {
  return new Promise((resolve, reject) => {
    const dUri = new Datauri();
    // let image = dUri.format(
    //   path.extname(req.file.originalname || req.file.name).toString(),
    //   req.file.buffer
    // );

    // cloudinary.uploader.upload(image.content, (err, url) => {
    //   if (err) return reject(err);
    //   return resolve(url);
    // });
    resolve(1);
  });
};

module.exports = uploader;
