"use strict";

// import { name } from 'ejs';
import express from "express";
import { Animal } from "./models/Animal.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static("./public")); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Parse JSON bodies

import cors from "cors";
app.use("/api", cors()); // set Access-Control-Allow-Origin header for api route

//set the view engine to ejs
app.set("view engine", "ejs");

// HOME ROUTE FOR BASIC APP
app.get("/", (req, res, next) => {
  Animal.find({})
    .lean()
    .then((animals) => {
      // respond to browser only after db query completes
      res.render("home", { animals });
    })
    .catch((err) => next(err));
});

// HOME ROUTE FOR REACT
app.get("/react", (req, res, next) => {
  Animal.find({})
    .lean()
    .then((animals) => {
      // respond to browser only after db query completes
      res.render("home_react", {items: JSON.stringify(animals)});
    })
    .catch((err) => next(err));
});


// DETAIL ROUTE FOR REACT
app.get('/detail_react', (req,res,next) => {
  Animal.findOne({ name:req.query.name }).lean()
      .then((animal) => {
          res.render("detail_react", {result: animal});
      })
      .catch(err => next(err));
});


// ABOUT ROUTE FOR BASIC APP
app.get("/about", (req, res) => {
  res.type("text/html");
  res.render("about");
});

// ANIMAL DETAIL ROUTE FOR BASIC APP
app.get("/detail", (req, res, next) => {
  // db query can use request parameters
  Animal.findOne({ name: req.query.name })
    .lean()
    .then((animal) => {
      res.render("details", { result: animal });
    })
    .catch((err) => next(err));
});

app.post("/detail", (req, res, next) => {
  Animal.findOne({ name: req.body.name })
    .lean()
    .then((animal) => {
      res.render("details", { result: animal });
    })
    .catch((err) => next(err));
});

// DELETE ANIMAL ROUTE FOR BASIC APP
app.get("/delete", (req, res, next) => {
  Animal.deleteOne({ name: req.query.name })
    .then(() => {
      res.render("delete");
    })
    .catch((err) => next(err));
});

//---------- API START -----------//

// GET ALL ITEMS
app.get("/api/animals", (req, res, next) => {
  Animal.find({})
    .lean()
    .then((animals) => {
      res.json(animals);
    })
    .catch((err) => next(err));
});

// GET SINGLE ITEM/DETAIL
app.get("/api/animal/:name", (req, res) => {
  Animal.findOne({ name: req.params.name }, (err, animal) => {
    if (err || !animal) {
      res.status(404).json({ message: "Animal not found!" });
    } else {
      res.json(animal);
    }
  });
});

// DELETE ITEM BY NAME
// First look up animal by name, uses ID to delete it
app.get("/api/delete/:name", (req, res, next) => {
  Animal.findOne({ name: req.params.name }, (err, animal) => {
    if (err || !animal) {
      res.status(404).json({ message: "Animal not found!" });
    } else {
      Animal.deleteOne({ _id: animal._id }, (err, result) => {
        if (err) return next(err);
        res.json({ "successfully deleted": result });
      });
    }
  });
});


app.post('/api/add/:name/:type/:breed/:color/:age', (req,res) => {
  console.log(req.body)
  const newAnimal = {name: req.params.name, type: req.params.type, breed: req.params.breed, color: req.params.color, age: req.params.age };
    Animal.updateOne({name: req.params.name}, newAnimal, {upsert:true}, (err, result) => {
    if (err) {
      res.status(404).json({ message: "Animal not found!" });
    }
    else {
      res.json({"successfully added": result});
    }
    
    });
});


// ----------ERROR HANDLING-----------//
// 404 handler - default case
app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not found");
});

app.listen(app.get("port"), () => {
  console.log("Express started");
});
