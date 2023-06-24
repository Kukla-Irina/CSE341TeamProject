const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('bakery').collection('orders').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('bakery')
    .collection('orders')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createOrder = async (req, res) => {
    const order = {
      number: req.body.number,
      clientName: req.body.clientName,
      menuItem: req.body.menuItem,
      paymentData: req.body.paymentData,
      date: req.body.date
    };
    const response = await mongodb.getDb().db('bakery').collection('orders').insertOne(order);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the order.');
    }
  };
  
  const updateOrder = async (req, res) => {
    const orderId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const order = {
        number: req.body.number,
        clientName: req.body.clientName,
        menuItem: req.body.menuItem,
        paymentData: req.body.paymentData,
        date: req.body.date
    };
    const response = await mongodb
      .getDb()
      .db('bakery')
      .collection('orders')
      .replaceOne({ _id: orderId }, order);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the order.');
    }
  };
  
  const deleteOrder = async (req, res) => {
    const orderId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('bakery').collection('orders').remove({ _id: orderId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the order.');
    }
  };

module.exports = { getAll, getSingle, createOrder, updateOrder, deleteOrder };