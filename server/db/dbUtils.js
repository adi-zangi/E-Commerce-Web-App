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
 * Inserts a new user
 * @param {string} email The new user's email
 * @param {string} firstName The new user's first name
 * @param {string} lastName The new user's last name
 * @param {string} password The new user's password 
 */
const addUser = (email, firstName, lastName, password) => {
   return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO Users (user_email, first_name, last_name, user_password) 
            VALUES($1, $2, $3, $4) RETURNING *`, [email, firstName, lastName, password], (error, results) => {
         if (error) {
            reject(error);
         } else {
            resolve(results.rows);
         }
      });
   });
}

/**
 * Updates the search history table with a given search query
 * If the query is in the table, increments the frequency column by 1
 * Otherwise, adds the query to the table with a frequency of 1
 * @param {string} query 
 */
const updateSearchHistory = (query) => {
   return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO SearchHistory (query) VALUES($1)
            ON CONFLICT (query) DO UPDATE
            SET frequency = SearchHistory.frequency + 1
            RETURNING *`, [query], (error, results) => {
         if (error) {
            reject(error);
         } else {
            resolve(results.rows);
         }
      });
   });
}

/**
 * Gets a user
 * @param {string} email The user's email
 */
const getUser = (email) => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM Users WHERE user_email=$1`, [email], (error, results) => {
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
 * A product is considered a match if the keyword of the product's category is
 * contained in the search query or if the product's name contains all the
 * words in the search query
 * @param {string} searchQuery The search query
 */
const getProductsByQuery = (searchQuery) => {
   return new Promise((resolve, reject) => {
      searchQuery = searchQuery.toLowerCase();
      const categoryCondition = `category_id IN
         (SELECT category_id FROM Categories WHERE '${searchQuery}' LIKE CONCAT('%', LOWER(category_keyword), '%'))`;
      const searchWords = searchQuery.split(/\s/);
      const conditionsList = searchWords.map(word => {
         return `LOWER(product_name) LIKE '%${word}%'`
      });
      const wordConditions = conditionsList.join(' AND ');
      pool.query(`SELECT * FROM Products WHERE (${categoryCondition}) OR (${wordConditions})`, (error, results) => {
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
 * @param {number} categoryId The category id
 */
const getProductsByCategory = (categoryId) => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM Products WHERE category_id=$1`, [categoryId], (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
      });
   });
}

/**
 * Gets all the categories in the store
 */
const getAllCategories = () => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM Categories`, (error, results) => {
         if (error) {
            reject(error);
         } else {
            resolve(results.rows);
         }
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
 * @param {number} departmentId The department id
 */
const getCategoriesInDepartment = (departmentId) => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM Categories WHERE department_id=$1`, [departmentId], (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
      });
   });
}

/**
 * Gets an array of past search queries that contain the given search query
 * @param {string} query The query to match to past search queries
 */
const getSimilarPastSearches = (query) => {
   lowerCaseQuery = query.toLowerCase();
   return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM SearchHistory WHERE query LIKE '%${lowerCaseQuery}%'`, (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
      });
   });
}

module.exports = {
   addUser,
   getUser,
   getAllProducts,
   getProductsByQuery,
   getProductsByCategory,
   getAllCategories,
   getAllDepartments,
   getCategoriesInDepartment,
   getSimilarPastSearches,
   updateSearchHistory
};