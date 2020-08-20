function log(req, res, next) {
  console.log("Logging");
  next(); // pass control to next mw function in the pipeline
}

module.exports = log;
