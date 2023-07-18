var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  // Simulate a real-time data source
  const intervalId = setInterval(() => {
    const data = {
      type: "message",
      message: "Notification Test",
      body: {
        isCritical: true,
      },
    };
    console.log("event sent");
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 5000);

  setTimeout(() => {
    const data = {
      type: "close",
    };
    console.log("server close");
    clearInterval(intervalId);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    res.end();
  }, 20000);
});

module.exports = router;
