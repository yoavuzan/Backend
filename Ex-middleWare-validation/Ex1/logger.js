let requestCount = 1;

function returnCurrentTime(req, res, next) {
  req.currentTime = new Date().toISOString();
  req.requestCount = requestCount++;
  console.log(`[${req.currentTime}] ${req.method} ${req.url}`);
  next();
}

module.exports = {  returnCurrentTime };
