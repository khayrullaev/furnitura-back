var response = require("../utils/response");
const uploader = require("../utils/uploader");

const uploadTest = async (req, res) => {
  console.log(req.file);
  //   const result = await uploader(req);
  //   console.log(result);

  return response.successWithData(res, "Success", {
    fileUrl: req.file.filename,
  });
};

module.exports = {
  uploadTest,
};
