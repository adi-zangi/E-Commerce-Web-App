/**
 * Makes requests to the shop database
 */

import { Pool } from 'pg';
import env from '../../client/src/env.json';

const pool = new Pool ({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASS,
    port: env.DB_PORT,
});

const SortOption =
{
   Relevance: "Relevance",
   AscendingPrice: "Price, low to high",
   DescendingPrice: "Price, high to low",
};

/**
 * Converts the given sort criteria into an ORDER BY statement
 * @param sortBy An option from the SortOption enum
 * @returns An ORDER BY statement that sorts by the given criteria
 */
const getOrderByStatement = (sortBy: string) : string => {
   if (sortBy === SortOption.AscendingPrice) {
      return "ORDER BY price ASC";
   } else if (sortBy === SortOption.DescendingPrice) {
      return "ORDER BY price DESC";
   }
   return "";
}

/**
 * Inserts a new user
 * @param email The new user's email
 * @param firstName The new user's first name
 * @param lastName The new user's last name
 * @param password The new user's password 
 * @returns Array of rows from the Users table
 */
const addUser = (email: string, firstName: string, lastName: string, password: string) => {
   return new Promise<any[]>((resolve, reject) => {
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
 * @param query 
 * @returns Array of rows from the SearchHistory table
 */
const updateSearchHistory = (query: string) => {
   return new Promise<any[]>((resolve, reject) => {
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
 * Returns true if a user with the given email exists and false otherwise
 * @param email The email
 * @returns True if a user with the given email exists and false otherwise
 */
const isExistingUser = (email: string) => {
   return new Promise<boolean>((resolve, reject) => {
      pool.query(`SELECT user_email FROM Users WHERE user_email=$1`, [email], (error, results) => {
         if (error) {
            reject(error);
         } else {
            resolve(results.rows.length > 0);
         }
      });
   });
}

/**
 * Gets a user
 * @param email The user's email
 * @returns Array of rows from the Users table
 */
const getUser = (email: string) => {
   return new Promise<any[]>((resolve, reject) => {
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
 * @param sortOption An option from the SortOption enum to sort the products by
 * @returns Array of rows from the Products table
 */
const getAllProducts = (sortOption: string) => {
   return new Promise<any[]>((resolve, reject) => {
      const orderBy = getOrderByStatement(sortOption);
      pool.query(`SELECT * FROM Products
                  ${orderBy}`, (error, results) => {
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
 * @param searchQuery The search query
 * @param sortOption An option from the SortOption enum to sort the products by
 * @returns Array of rows from the Products table
 */
const getProductsByQuery = (searchQuery: string, sortOption: string) => {
   return new Promise<any[]>((resolve, reject) => {
      const orderBy = getOrderByStatement(sortOption);
      searchQuery = searchQuery.toLowerCase();
      const categoryCondition = `category_id IN
         (SELECT category_id FROM Categories WHERE '${searchQuery}' LIKE CONCAT('%', LOWER(category_keyword), '%'))`;
      const searchWords = searchQuery.split(/\s/);
      const conditionsList = searchWords.map(word => {
         return `LOWER(product_name) LIKE '%${word}%'`
      });
      const wordConditions = conditionsList.join(' AND ');
      pool.query(`SELECT * FROM Products WHERE (${categoryCondition}) OR (${wordConditions})
                  ${orderBy}`, (error, results) => {
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
 * @param categoryId The category id
 * @param sortOption An option from the SortOption enum to sort the products by
 * @returns Array of rows from the Products table
 */
const getProductsByCategory = (categoryId: string, sortOption: string) => {
   const orderBy = getOrderByStatement(sortOption);
   return new Promise<any[]>((resolve, reject) => {
      pool.query(`SELECT * FROM Products WHERE category_id=$1
                  ${orderBy}`, [categoryId], (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
      });
   });
}

/**
 * Gets all the categories in the store
 * @returns Array of rows from the Categories table
 */
const getAllCategories = () => {
   return new Promise<any[]>((resolve, reject) => {
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
 * @returns Array of rows from the Departments table
 */
const getAllDepartments = () => {
   return new Promise<any[]>((resolve, reject) => {
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
 * @param departmentId The department id
 * @returns Array of rows from the Categories table
 */
const getCategoriesInDepartment = (departmentId: string) => {
   return new Promise<any[]>((resolve, reject) => {
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
 * @param query The query to match to past search queries
 * @returns Array of rows from the SearchHistory table
 */
const getSimilarPastSearches = (query: string) => {
   const lowerCaseQuery = query.toLowerCase();
   return new Promise<any[]>((resolve, reject) => {
      pool.query(`SELECT * FROM SearchHistory WHERE query LIKE '%${lowerCaseQuery}%'`, (error, results) => {
         if (error) {
            reject(error);
         }
         resolve(results.rows);
      });
   });
}

export default {
   addUser,
   isExistingUser,
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