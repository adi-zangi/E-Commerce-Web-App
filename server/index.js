/**
 * A web service that listens for database requests
 */

const express = require('express');
const db = require('./db/dbUtils');
const env = require('../client/src/env');

const app = express();
const serverPort = env.SERVER_PORT || 3001;
const clientPort = env.CLIENT_PORT || 3000;

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${clientPort}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// Add a user
app.post('/users/create', (req, res) => {
   db.addUser(req.body.email, req.body.first_name, req.body.last_name, req.body.password)
   .then(val => {
      res.status(200).send(val[0]);
   })
   .catch(err => {
      res.status(500).send(err);
   })
});

// Get a user by email
app.get('/users/:email', (req, res) => {
   db.getUser(req.params.email)
   .then(val => {
      res.status(200).send(val[0]);
   })
   .catch(err => {
      res.status(500).send(err);
   })
});

// Get all products
app.get('/products', (req, res) => {
   db.getAllProducts()
   .then(val => {
      res.status(200).send(val);
   })
   .catch(err => {
      res.status(500).send(err);
   })
});

// Get products by a search query
app.get('/products/search/:search_query', (req, res) => {
   db.getProductsByQuery(req.params.search_query)
   .then(val => {
      res.status(200).send(val);
   })
   .catch(err => {
      res.status(500).send(err);
   })
});

// Get products by a category
app.get('/products/category/:category_id', (req, res) => {
   db.getProductsByCategory(req.params.category_id)
   .then(val => {
      res.status(200).send(val);
   })
   .catch(err => {
      res.status(500).send(err);
   })
});

// Get all categories
app.get('/categories', (req, res) => {
   db.getAllCategories()
   .then(val => {
      res.status(200).send(val);
   })
   .catch(err => {
      res.status(500).send(err);
   })
});

// Get all departments
app.get('/departments', (req, res) => {
   db.getAllDepartments()
   .then(val => {
      res.status(200).send(val);
   })
   .catch(err => {
      res.status(500).send(err);
   })
});

// Get all categories in a department
app.get('/department/:department_id/categories', (req, res) => {
   db.getCategoriesInDepartment(req.params.department_id)
   .then(val => {
      res.status(200).send(val);
   })
   .catch(err => {
      res.status(500).send(err);
   })
});

app.listen(serverPort, () => {
   console.log(`Listening on port ${serverPort}`)
});