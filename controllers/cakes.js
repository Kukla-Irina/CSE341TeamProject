const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('cakes').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('cakes')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createCake = async (req, res) => {
  const cake = {
    flavor: req.body.flavor,
    frostingFlavor: req.body.frostingFlavor,
    toppings: req.body.toppings,
    numOfLayers: req.body.numOfLayers,
    calories: req.body.calories,
    gramsOfFat: req.body.gramsOfFat,
    gramsOfSugar: req.body.gramsOfSugar
  };
  const response = await mongodb.getDb().db('bakery').collection('cakes').insertOne(cake);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occurred while creating the cake.');
  }
};

const updateCake = async (req, res) => {
  const cakeId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const cake = {
    flavor: req.body.flavor,
    frostingFlavor: req.body.frostingFlavor,
    toppings: req.body.toppings,
    numOfLayers: req.body.numOfLayers,
    calories: req.body.calories,
    gramsOfFat: req.body.gramsOfFat,
    gramsOfSugar: req.body.gramsOfSugar
  };
  const response = await mongodb
    .getDb()
    .db('bakery')
    .collection('cakes')
    .replaceOne({ _id: cakeId }, cake);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the cake.');
  }
};

const deleteCake = async (req, res) => {
  const cakeId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('bakery').collection('cakes').deleteOne({ _id: cakeId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the cake.');
  }
};

module.exports = { getAll, getSingle, createCake, updateCake, deleteCake };