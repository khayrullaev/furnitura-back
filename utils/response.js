exports.success = (res, msg) => {
  var data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
};

exports.successWithData = (res, msg, data) => {
  var resData = {
    status: 1,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

exports.error = (res, msg) => {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(500).json(data);
};

exports.notFound = (res, msg) => {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(404).json(data);
};

exports.validationErrorWithData = (res, msg, data) => {
  var resData = {
    status: 0,
    message: msg,
    data: data,
  };
  return res.status(400).json(resData);
};

exports.unauthorized = (res, msg) => {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(401).json(data);
};

exports.invalidInput = (res, msg) => {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(422).json(data);
};
