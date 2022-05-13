"use strict"
import { expect } from "chai";
import * as data from "../data.js";

describe("Animal", function() {
    it("returns the requested animal", function() {  //test getItem function
        let result = data.getItem("cat");
        expect(result).to.deep.equal({name: "cat", type: "mammal", breed:"domestic shorthair", color:"orange", age:1});  //expected result
    });
    it("fails test when attempting to find invalid entry/animal", function() {   //test getItem with invalid entry
        let result = data.getItem("invalid");
        expect(result).to.be.undefined;  //expect to fail
    });


    it("Adds a new animal to the array", function() {  //test addItem function
        let result = data.addItem({name: "rattlesnake", type:"reptile", breed:"diamondback", color:"brown", age:2});
        expect(result.added).to.be.true;  //expected to add [rattlesnake] entry
    });
    it("fails to add an animal that already exists", function() {  //test with item that already exists
        let result = data.addItem({name: "dog", type: "mammal", breed:"boxer", color:"brown", age:4});
        expect(result.added).to.be.false;  //expect to fail since it exists
    });


    it("deletes an existing animal from the array", function() {  //test deleteItem function
        let result = data.deleteItem("rattlesnake");
        expect(result.deleted).to.be.true;  //expected true, since we added it in a previous test
        // console.log(data.getAll());
    });
    it("fails to delete if animal not in array", function() {  //test deleteItem with an entry that doesn't exist
        let result = data.deleteItem("panda");
        expect(result.deleted).to.be.false;  //expected to fail
    });
});