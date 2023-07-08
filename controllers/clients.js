const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('bakery').collection('clients').find();
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
    .collection('clients')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// const getByName = async (req, res) => {
//   try {
//   const lastName = req.params.id;
//   const result = await mongodb
//     .getDb()
//     .db('bakery')
//     .collection('clients')
//     .find({ lastName: lastName });
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists[0]);
//   });
// } catch (err) { 
//   res.status(500).json(err)
// }
// };

const createClient = async (req, res) => {
  const client = {
    firstName: req.body.firstName,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    lastName: req.body.lastName
  };
  const response = await mongodb.getDb().db('bakery').collection('clients').insertOne(client);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the client.');
  }
};

const updateClient = async (req, res) => {
  const clientId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const client = {
    firstName: req.body.firstName,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    lastName: req.body.lastName
  };
  const response = await mongodb
    .getDb()
    .db('bakery')
    .collection('clients')
    .replaceOne({ _id: clientId }, client);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the client.');
  }
};

const deleteClient = async (req, res) => {
  const clientId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('bakery').collection('clients').deleteOne({ _id: clientId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the client.');
  }
};

module.exports = { getAll, getSingle, createClient, updateClient, deleteClient };