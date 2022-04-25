import http from "http";
import { parse } from "querystring";
import * as data from './data.js';
const server = http.createServer(function (req, res) {
  console.log(req.url);
  const path = req.url.toLowerCase();
  let url = req.url.split("?"); // separate route from query string
  let query = parse(url[1]); // convert query string to a JS object
  switch (path) {
    case "/":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("this is my home page");
        res.end(JSON.stringify(data.getAll()));
      break;
    case "/about":
        if (err) return console.error(err);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is my about page for IT122");
        // res.end(getAll());
      break;
    case "/detail?name=cat":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(JSON.stringify(data.getItem(query.name)))
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      break;
  }
});

server.listen(process.env.PORT || 3000);
