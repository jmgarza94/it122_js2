"use strict"

import express from 'express';
// import * as data from './data.js';
import { Animal } from "./models/Animal.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Parse JSON bodies

app.set("view engine", "ejs");

// app.get('/', (req,res) => {
//     res.render('home', {animals: data.getAll()});
// });

app.get('/', (req, res, next) => {
  Animal.find({}).lean()
    .then((animals) => {
      // respond to browser only after db query completes
      res.render('home', { animals });
    })
    .catch(err => next(err));
});

// send plain text response
app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('My about page');
});

// app.get('/detail', (req,res) => {
//   console.log(req.query)
//   let target = data.getItem(req.query.name);
//   res.render("details", {
//       name: req.query.name, 
//       target
//       }
//   );
// });

app.get('/detail', (req,res,next) => {
  // db query can use request parameters
  Animal.findOne({ name:req.query.name }).lean()
      .then((animal) => {
          res.render('details', {result: animal} );
      })
      .catch(err => next(err));
});

// app.post('/detail', (req,res) => {
//   console.log(req.body)
//   let found = data.getItem(req.body.name);
//   res.render("details", {name: req.body.name, target: found, animals: data.getAll()});
// });

app.post('/detail', (req,res,next) => {
  Animal.findOne({ name:req.body.name }).lean()
        .then((animal) => {
            res.render('details', {result: animal} );
        })
        .catch(err => next(err));
});

app.get('/delete', (req,res) => {
  Animal.deleteOne({ name:req.query.name }, (err, result) => {
      if (err) return next(err);
      // let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
      Animal.count((err, total) => {
          res.type('text/html');
          res.render('delete', {name: req.query.name, deleted: result.result.n !== 0, total: total } );    
      });
  });
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