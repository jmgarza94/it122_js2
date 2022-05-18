'use strict'

import mongoose from 'mongoose';
const { Schema } = mongoose;
import { connectionString } from "../credentials.js";

mongoose.connect(connectionString, {
    dbName: 'sccit122',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
  });
  
  
  const animalSchema = new Schema({
   name: { type: String, required: true },
   type: String,
   breed: String,
   color: String,
   age: Number
  });
  
//   export const Animal = mongoose.model('Animal', animalSchema, 'animals');
export const Animal = mongoose.model('Animal', animalSchema);