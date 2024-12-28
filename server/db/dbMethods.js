/**
 * Makes requests to the shop database
 */

const { Pool } = require('pg');
const env = require('../../client/src/env');

const pool = new Pool ({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASS,
    port: env.DB_PORT,
});

const getAllProducts = () => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM Products`, (error, results) => {
         if (error) {
            reject(error);
         } else {
            resolve(results.rows);
         }
      });
   });
}

const getProductsByQuery = (query) => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM Products WHERE LOWER(product_name) LIKE LOWER('%${query}%')`, (error, results) => {
         if (error) {
            reject(error);
         } else {
            resolve(results.rows);
         }
      });
   });
}

const getDepartments = () => {
   return new Promise((resolve, reject) => {
      pool.query('query', (error, results) => {
         if (error) {
            reject(error);
         } else {
            resolve(results.rows);
         }
      });
   });
}

const getCategoriesForDepartment = (department) => {
   return new Promise((resolve, reject) => {
      pool.query('query', (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
      });
   });
}

module.exports = {
   getAllProducts,
   getProductsByQuery
};