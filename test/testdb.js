import { Animal } from "../models/Animal.js";

// return all records
Animal.find({})
  .lean()
  .then((animals) => {
    console.log("----- Get all animals in db -----");
    console.log(animals);
  })
  .catch((err) => next(err));

// return all records that match a condition
Animal.find({ type: "mammal" })
  .lean()
  .then((animals) => {
    console.log("----- Return all mammals -----");
    console.log(animals);
  })
  .catch((err) => next(err));


// return a single record
Animal.findOne({ name: "alligator" })
  .lean()
  .then((animal) => {
    console.log("----- Get animal whose name matches 'alligator' -----");
    console.log(animal);
  })
  .catch((err) => next(err));


// insert if it doesn't exist or update a single record if it doesn't match
const newAnimal = { name: "monkey", type: "mammal", breed: "capuchin", color: "black/white", "age": 4};
Animal.updateOne({ name: "monkey" }, newAnimal, { upsert: true }, (err, result) => {
  if (err) return next(err);
  console.log("----- Insert 'monkey' entry if it doesn't exist -----")
  console.log(result);
});
