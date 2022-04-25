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
