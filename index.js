import express from 'express';
// import http from "http";
// import { parse } from "querystring";
import * as data from './data.js';

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Parse JSON bodies

app.set("view engine", "ejs");

app.get('/', (req,res) => {
    res.render('home', {animals: data.getAll()});
});

// send plain text response
app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('My about page');
});

app.get('/detail', (req,res) => {
  console.log(req.query)
  let target = data.getItem(req.query.name);
  res.render("details", {
      name: req.query.name, 
      target
      }
  );
});


// 404 handler - default case
app.use((req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');    
});



// const server = http.createServer(function (req, res) {
//   console.log(req.url);
//   const path = req.url.toLowerCase();
//   let url = req.url.split("?"); // separate route from query string
//   let query = parse(url[1]); // convert query string to a JS object
//   switch (path) {
//     case "/":
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.write("this is my home page");
//         res.end(JSON.stringify(data.getAll()));
//       break;
//     case "/about":
//         if (err) return console.error(err);
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end("This is my about page for IT122");
//         // res.end(getAll());
//       break;
//     case "/detail?name=cat":
//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end(JSON.stringify(data.getItem(query.name)))
//       break;
//     default:
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       res.end("404 Not Found");
//       break;
//   }
// });

// server.listen(process.env.PORT || 3000);
