"use strict"

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

app.post('/detail', (req,res) => {
  console.log(req.body)
  let found = data.getItem(req.body.name);
  res.render("details", {name: req.body.name, target: found, animals: data.getAll()});
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