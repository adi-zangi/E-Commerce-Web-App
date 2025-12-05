/**
 * Functions to request data from the server
 */

import { AxiosResponse } from 'axios';
import axios from './axiosConfig';
import { User } from './dataTypes';

type PromiseResponse = Promise<AxiosResponse<any, any>>;

/**
 * Adds a new user to the database
 * @param user The new user's User object
 * @returns A promise on the new user's User object
 */
const addUser = (user: User) : PromiseResponse => {
   return axios.post(`/users/create`, {
      email: user.user_email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.user_password
   });
}

/**
 * Updates the search history table with the given search query
 * If the query is in the table, increments the frequency column by 1
 * Otherwise, adds the query to the table with a frequency of 1
 * Expects a search query that is not URL encoded
 * @param query The search query to add, not URL encoded
 * @returns A promise on the SearchHistory object for the search query
 */
const updateSearchHistory = (query: string) : PromiseResponse => {
   return axios.post(`/search_history/add/${encodeURIComponent(query)}`);
}

/**
 * Returns true if a user with the given email exists and false otherwise
 * @param email The email
 * @returns A promise on a boolean
 */
const isExistingUser = (email: string) : PromiseResponse => {
   return axios.get(`/user_exists/${email}`);
}

/**
 * Gets a user from the database
 * @param email The user's email
 * @returns A promise on a User object
 */
const getUser = (email: string) : PromiseResponse => {
   return axios.get(`/users/${email}`);
}

/**
 * Gets all the store products from the database
 * @param sortOption An option from the SortOption enum to sort the products by
 * @returns A promise on an array of Product
 */
const getAllProducts = (sortOption: string) : PromiseResponse => {
   return axios.get(`/products/sort_by/${sortOption}`);
}

/**
 * Gets the store products that match a given search query from the database
 * Expects a search query that is not URL encoded
 * @param query The search query, not URL encoded
 * @param sortOption An option from the SortOption enum to sort the products by
 * @returns A promise on an array of Product
 */
const searchForProducts = (query: string, sortOption: string): PromiseResponse => {
   if (query.length === 0) {
      return getAllProducts(sortOption);
   }
   const encodedQuery = encodeURIComponent(query);
   return axios.get(`/products/search/${encodedQuery}/sort_by/${sortOption}`);
}

/**
 * Gets the store products with a given category from the database
 * @param categoryId The category id
 * @param sortOption An option from the SortOption enum to sort the products by
 * @returns A promise on an array of Product
 */
const getProductsByCategory = (categoryId: number, sortOption: string): PromiseResponse => {
   return axios.get(`/products/category/${categoryId}/sort_by/${sortOption}`);
}

/**
 * Gets all the product categories in the store from the database
 * @returns A promise on an array of Category
 */
const getAllCategories = (): PromiseResponse => {
   return axios.get(`/categories`);
}

/**
 * Gets all the departments in the store from the database
 * @returns A promise on an array of Department
 */
const getAllDepartments = () : PromiseResponse => {
   return axios.get(`/departments`);
}

/**
 * Gets all the product categories in a given department
 * @param departmentId The department id
 * @returns A promise on an array of Category
 */
const getCategoriesInDepartment = (departmentId: number) : PromiseResponse => {
   return axios.get(`/department/${departmentId}/categories`)
}

/**
 * Gets an array of past search queries that contain the given search query
 * Expects a search query that is not URL encoded
 * @param text The query to match to past search queries, not URL encoded
 * @returns A promise on an array of SearchHistory
 */
const getSimilarPastSearches = (query: string) : PromiseResponse => {
   return axios.get(`/search_history/search/${encodeURIComponent(query)}`);
}

export {addUser, getUser, isExistingUser, getAllProducts, searchForProducts,
         getAllCategories, getAllDepartments, getCategoriesInDepartment,
         getProductsByCategory, getSimilarPastSearches, updateSearchHistory};