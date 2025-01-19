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

/**
 * Gets a user
 * @param {string} email The user's email
 */
const getUser = (email) => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM Users WHERE user_email='${email}'`, (error, results) => {
         if (error) {
            reject(error);
         } else {
            resolve(results.rows);
         }
      });
   });
}

/**
 * Gets all the store products
 */
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

/**
 * Gets the store products that match a search query
 * A product is considered a match if the product name contains all the words
 * in the search query
 * @param {string} searchQuery The search query
 */
const getProductsByQuery = (searchQuery) => {
   return new Promise((resolve, reject) => {
      const searchWords = searchQuery.split(/\s/);
      const conditionsList = searchWords.map(word => {
         return `LOWER(product_name) LIKE LOWER('%${word}%')`
      });
      const conditions = conditionsList.join(' AND ');
      pool.query(`SELECT * FROM Products WHERE ${conditions}`, (error, results) => {
         if (error) {
            reject(error);
         } else {
            resolve(results.rows);
         }
      });
   });
}

/**
 * Gets the store products with a category
 * @param {number} category_id The category id
 */
const getProductsByCategory = (category_id) => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM Products WHERE category_id=${category_id}`, (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
      });
   });
}

/**
 * Gets all the departments in the store
 */
const getAllDepartments = () => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM Departments`, (error, results) => {
         if (error) {
            reject(error);
         } else {
            resolve(results.rows);
         }
      });
   });
}

/**
 * Gets all the product categories in a department
 * @param {number} department_id The department id
 */
const getCategoriesInDepartment = (department_id) => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM Categories WHERE department_id=${department_id}`, (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
      });
   });
}

module.exports = {
   getUser,
   getAllProducts,
   getProductsByQuery,
   getProductsByCategory,
   getAllDepartments,
   getCategoriesInDepartment
};