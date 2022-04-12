const http = require("http");
const server = http.createServer(function (req, res) {
  console.log(req.url);
  const path = req.url.toLowerCase();
  switch (path) {
    case "/":
      res.writeHead(200);
      res.end("Home Page");
      break;
    case "/about":
      res.writeHead(200);
      res.end("A little bit about me");
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      break;
  }
});

server.listen(process.env.PORT || 3000);
