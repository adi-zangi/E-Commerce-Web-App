/**
 * A web service that listens for database requests
 */

const express = require('express');
const db = require('./db/dbClient');

const app = express();
const port = 3001;

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
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
app.get('/products/:search_query')

// Get all departments
app.get('/departments')

// Get categories for a department
app.get('/department/:department/categories')

app.listen(port, () => {
   console.log(`Listening on port ${port}`)
});