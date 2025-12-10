/**
 * API endpoints that process requests from the client
 */

import express from 'express';
import db from './db';
import env from '../../client/src/env.json';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

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

const loginLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 5, // Max 5 login attempts per window
   keyGenerator: (req, res) => {
      const email = req.params.email;
      return email || ipKeyGenerator(req.ip + ""); // Fallback to IP
   }
});

// Add a user
app.post('/users/create', (req, res) => {
   db.addUser(req.body.email, req.body.first_name, req.body.last_name, req.body.password)
   .then((val: any[]) => {
      res.status(200).send(val[0]);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

// Update the search history table with a given search query
app.post('/search_history/add/:query', (req, res) => {
   db.updateSearchHistory(req.params.query)
   .then((val: any[]) => {
      res.status(200).send(val[0]);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

// Check if a user with a given email exists
// Returns a boolean
app.get('/user_exists/:email', (req, res) => {
   db.isExistingUser(req.params.email)
   .then((val: boolean) => {
      res.status(200).send(val);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

// Get a user by email
app.get('/users/:email', loginLimiter, (req, res) => {
   db.getUser(req.params.email)
   .then((val: any[]) => {
      res.status(200).send(val[0]);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

// Get all products
app.get('/products/sort_by/:sort_option', (req, res) => {
   db.getAllProducts(req.params.sort_option)
   .then((val: any[]) => {
      res.status(200).send(val);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

// Get products by a search query
app.get('/products/search/:search_query/sort_by/:sort_option', (req, res) => {
   db.getProductsByQuery(req.params.search_query, req.params.sort_option)
   .then((val: any[]) => {
      res.status(200).send(val);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

// Get products by a category
app.get('/products/category/:category_id/sort_by/:sort_option', (req, res) => {
   db.getProductsByCategory(req.params.category_id, req.params.sort_option)
   .then((val: any[]) => {
      res.status(200).send(val);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

// Get all categories
app.get('/categories', (req, res) => {
   db.getAllCategories()
   .then((val: any[]) => {
      res.status(200).send(val);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

// Get all departments
app.get('/departments', (req, res) => {
   db.getAllDepartments()
   .then((val: any[]) => {
      res.status(200).send(val);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

// Get all categories in a department
app.get('/department/:department_id/categories', (req, res) => {
   db.getCategoriesInDepartment(req.params.department_id)
   .then((val: any[]) => {
      res.status(200).send(val);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

// Get past search queries that contain a given query
app.get('/search_history/search/:query', (req, res) => {
   db.getSimilarPastSearches(req.params.query)
   .then((val: any[]) => {
      res.status(200).send(val);
   })
   .catch((err: Error) => {
      res.status(500).send(err);
   })
});

app.listen(serverPort, () => {
   console.log(`Listening on port ${serverPort}`)
});