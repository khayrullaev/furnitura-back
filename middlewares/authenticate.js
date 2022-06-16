const { validateJWT } = require("../utils/token");
var response = require("../utils/response");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return response.unauthorized(res, "Not authenticated");
    }

    const decoded = validateJWT(token);
    if (!decoded) {
      return response.unauthorized(res, "Not authenticated");
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return response.unauthorized(res, "Not authenticated");
  }
};
