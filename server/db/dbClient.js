/**
 * Makes requests to the shop database
 */

const { Pool } = require('pg');

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'e_commerce_shop',
    password: 'admin',
    port: 5432,
});

const getAllProducts = () => {
   return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM Products', (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
      });
   });
}

const getProductsByKeyword = (keyword) => {
   return new Promise((resolve, reject) => {
      pool.query('query', (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
      });
   });
}

const getDepartments = () => {
   return new Promise((resolve, reject) => {
      pool.query('query', (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
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
   getAllProducts
};