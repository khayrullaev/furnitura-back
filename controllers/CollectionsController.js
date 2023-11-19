var response = require("../utils/response");
const Collections = require("../models/Collections");

const getList = async (req, res, next) => {
  try {
    const collections = await Collections.aggregate().sample(5);

    console.log(collections);

    return response.successWithData(res, "Success", {
      collections,
    });
  } catch (error) {
    return response.error(res, error.message);
  }
};

module.exports = {
  getList,
};
