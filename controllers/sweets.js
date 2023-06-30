const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('bakery').collection('sweets').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const sweetId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('bakery')
    .collection('sweets')
    .find({ _id: sweetId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createSweet = async (req, res) => {
    const sweet = {
      type: req.body.type,
      quantity: req.body.quantity
    };
    const response = await mongodb.getDb().db('bakery').collection('sweets').insertOne(sweet);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occurred while creating the sweet.');
    }
  };
  
  const updateSweet = async (req, res) => {
    const sweetId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const sweet = {
        type: req.body.type,
        quantity: req.body.quantity
      };
    const response = await mongodb
      .getDb()
      .db('bakery')
      .collection('sweets')
      .replaceOne({ _id: sweetId }, sweet);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while updating the sweet.');
    }
  };
  
  const deleteSweet = async (req, res) => {
    const sweetId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('bakery').collection('sweets').deleteOne({ _id: sweetId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while deleting the sweet.');
    }
  };

module.exports = { getAll, getSingle, createSweet, updateSweet, deleteSweet };