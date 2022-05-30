import { Animal } from "../models/Animal.js";

const cat = { name: "cat", type: "mammal", breed: "domestic shorthair", color: "orange", "age": 1};
Animal.updateOne({ name: "cat" }, cat, { upsert: true }, (err, result) => {
  if (err) return next(err);
  console.log("----- Insert 'cat' entry if it doesn't exist -----")
  console.log(result);
});

const dog = { name: "dog", type: "mammal", breed: "boxer", color: "brown", "age": 4};
Animal.updateOne({ name: "dog" }, dog, { upsert: true }, (err, result) => {
  if (err) return next(err);
  console.log("----- Insert 'dog' entry if it doesn't exist -----")
  console.log(result);
});

const goldfish = { name: "goldfish", type: "fish", breed: "ryukin", color: "orange", "age": 1};
Animal.updateOne({ name: "goldfish" }, goldfish, { upsert: true }, (err, result) => {
  if (err) return next(err);
  console.log("----- Insert 'goldfish' entry if it doesn't exist -----")
  console.log(result);
});

const heron = { name: "heron", type: "bird", breed: "spoonbill", color: "grey", "age": 3};
Animal.updateOne({ name: "heron" }, heron, { upsert: true }, (err, result) => {
  if (err) return next(err);
  console.log("----- Insert 'heron' entry if it doesn't exist -----")
  console.log(result);
});

const alligator = { name: "alligator", type: "reptile", breed: "american", color: "olive", "age": 35};
Animal.updateOne({ name: "alligator" }, alligator, { upsert: true }, (err, result) => {
  if (err) return next(err);
  console.log("----- Insert 'alligator' entry if it doesn't exist -----")
  console.log(result);
});

const monkey = { name: "monkey", type: "mammal", breed: "capuchin", color: "black/white", "age": 4};
Animal.updateOne({ name: "monkey" }, monkey, { upsert: true }, (err, result) => {
  if (err) return next(err);
  console.log("----- Insert 'monkey' entry if it doesn't exist -----")
  console.log(result);
});
