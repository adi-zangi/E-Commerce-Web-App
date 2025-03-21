/**
 * Methods to request data from the server
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
 * Gets a user from the database
 * @param email The user's email
 * @returns A promise on a User object
 */
const getUser = (email: string) : PromiseResponse => {
   return axios.get(`/users/${email}`);
}

/**
 * Gets all the store products from the database
 * @returns A promise on an array of Product
 */
const getAllProducts = () : PromiseResponse => {
   return axios.get(`/products`);
}

/**
 * Gets the store products that match a given search query from the database
 * @param query The search query
 * @returns A promise on an array of Product
 */
const searchForProducts = (query: string): PromiseResponse => {
   if (query.length === 0) {
      return getAllProducts();
   }
   return axios.get(`/products/search/${query}`);
}

/**
 * Gets the store products with a given category from the database
 * @param categoryId The category id
 * @returns A promise on an array of Product
 */
const getProductsByCategory = (categoryId: number): PromiseResponse => {
   return axios.get(`/products/category/${categoryId}`);
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

export {addUser, getUser, getAllProducts, searchForProducts, getAllCategories,
         getAllDepartments, getCategoriesInDepartment, getProductsByCategory};