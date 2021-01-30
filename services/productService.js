const Cube = require('../models/Cube')
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs/promises');
const productData=require('../data/productData');

function getAll(query) {
   // let products=productData.getAll();
   let products=Cube.getAll();
    if(query.search){
        products=products.filter(x=>x.name.toLowerCase().includes(query.search))
    }
    if(query.from){
        products=products.filter(x=>Number(x.level)>=query.from)
    }
    if(query.to){
        products=products.filter(x=>Number(x.level)<=query.to)
    }
    return products;
};

function getOne(id) {
    return Cube.getOne(id);
}


function create(data) {
    let cube = new Cube(
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

   // return productData.create(cube)
   return cube.save();
}

module.exports = {
    create,
    getAll,
    getOne

};