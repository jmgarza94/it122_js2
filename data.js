"use strict"

let animals = [
    {
      "name": "cat",
      "type": "mammal",
      "breed": "domestic shorthair",
      "color": "orange",
      "age": 1,
    },
    {
      "name": "dog",
      "type": "mammal",
      "breed": "boxer",
      "color": "brown",
      "age": 4,
    },
    {
      "name": "goldfish",
      "type": "fish",
      "breed": "ryukin",
      "color": "orange",
      "age": 1,
    },
    {
      "name": "heron",
      "type": "bird",
      "breed": "spoonbill",
      "color": "grey",
      "age": 3,
    },
    {
      "name": "alligator",
      "type": "reptile",
      "breed": "american",
      "color": "olive",
      "age": 35,
    },
  ];

export const getAll = () => {
  console.log(animals);
  return animals;
};

export const getItem = (value) => {
  return animals.find((item) => {
    console.log(item);
    return item["name"] == value;
  });
};

export const deleteItem = (name) => {
  let currLength = animals.length;
  animals = animals.filter((item) => {
      return item.name !== name;
  });
  return {deleted: currLength !== animals.length, total: animals.length }; //compare arrays to see if item was successfully deleted
};

export const addItem = (newAnimal) => {
  const currLength = animals.length;
  let found = getItem(newAnimal.name); //Check if the item is already in our array
  if (!found) {
      animals.push(newAnimal);
  }
  
  return {added: currLength !== animals.length, total: animals.length }; //compare arrays to see if item was added
};