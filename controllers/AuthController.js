const login = (req, res, next) => {
  try {
    console.log("request to /login");
    return res.status(200).send({ code: 200, message: "nice man" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
