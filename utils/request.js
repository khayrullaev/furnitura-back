const handlePromiseRequest = (promise) => {
  return promise
    .then((data) => [data, undefined])
    .catch((error) => Promise.resolve([undefined, error]));
};

module.exports = handlePromiseRequest;
